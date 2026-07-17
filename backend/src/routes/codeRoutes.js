const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { executeCode } = require("../services/codeExecutor");
const { getProblem, getAllProblems, getFullProblem } = require("../data/problems");
const CodeDraftDB = require("../models/CodeDraftDB");
const SubmissionDB = require("../models/SubmissionDB");
const { requireAuth } = require("../middleware/auth");
const { submissionQueue, connection } = require("../services/submissionQueue");

// ─── Problem catalogue (public) ──────────────────────────────────────────────

router.get("/problems", (req, res) => {
  try {
    const problems = getAllProblems();
    res.json({ success: true, problems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/problems/:id", (req, res) => {
  try {
    const problem = getFullProblem(parseInt(req.params.id));
    if (!problem) {
      return res.status(404).json({ success: false, error: "Problem not found" });
    }
    // Strip hidden test cases before sending to client
    const { hiddenCases, ...safeProblem } = problem;
    res.json({ success: true, problem: safeProblem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── Code execution ──────────────────────────────────────────────────────────

// POST /api/run  — custom test input, no grading
router.post("/run", requireAuth, async (req, res) => {
  try {
    const { code, language, input } = req.body;
    if (!code || !language) {
      return res.status(400).json({ success: false, error: "code and language are required" });
    }
    const result = await executeCode(code, language, input || "");
    res.json(result);
  } catch (error) {
    console.error("[API] /run error:", error.message);
    res.status(500).json({ success: false, error: "Execution failed", details: error.message });
  }
});

// POST /api/submit  — run against all test cases (async enqueuing)
router.post("/submit", requireAuth, async (req, res) => {
  try {
    const { code, language, problemId } = req.body;
    if (!code || !language || !problemId) {
      return res.status(400).json({ success: false, error: "code, language, and problemId are required" });
    }

    const problem = getProblem(parseInt(problemId));
    if (!problem) {
      return res.status(404).json({ success: false, error: "Problem not found" });
    }

    const submissionId = uuidv4();

    // Record attempt before running (so count is correct even if execution fails)
    await SubmissionDB.recordAttempt(req.userId, problemId);

    // 1. Pre-insert record into database durably (status: queued)
    await SubmissionDB.createQueued(submissionId, req.userId, parseInt(problemId), language);

    // 2. Write initial queued state to Redis cache
    const initialStatus = {
      status: 'queued',
      current: 0,
      total: problem.testCases?.length || 0
    };
    await connection.setex(`submission:status:${submissionId}`, 3600, JSON.stringify(initialStatus));

    // 3. Enqueue in BullMQ, unifying job ID to matching submissionId UUID
    await submissionQueue.add(
      'submission',
      { submissionId, userId: req.userId, problemId: parseInt(problemId), language, code },
      { jobId: submissionId }
    );

    res.json({
      success: true,
      submissionId,
    });
  } catch (error) {
    console.error("[API] /submit error:", error.message);
    res.status(500).json({ success: false, error: "Submission failed", details: error.message });
  }
});

// GET /api/submissions/status/:id — Fetch evaluation status
router.get("/submissions/status/:id", requireAuth, async (req, res) => {
  const submissionId = req.params.id;
  try {
    // 1. Check Redis cache first (Fast Path)
    const cachedData = await connection.get(`submission:status:${submissionId}`);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      return res.json({
        success: true,
        ...parsed,
      });
    }

    // 2. Fall back to PostgreSQL Database (Cold Path)
    console.log(`[API] Redis cache cold. Querying DB for submission ${submissionId}`);
    const submission = await SubmissionDB.getById(submissionId);
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found",
      });
    }

    const resultsObj = submission.results || {};
    if (resultsObj.status === 'queued' || resultsObj.status === 'running') {
      return res.json({
        success: true,
        status: resultsObj.status,
        current: resultsObj.current || 0,
        total: resultsObj.total || 0,
      });
    }

    // Default to completed if metrics exist
    res.json({
      success: true,
      status: resultsObj.status || 'completed',
      allPassed: submission.allPassed,
      passedCount: submission.passedCount,
      totalCount: submission.totalCount,
      results: resultsObj.results || [],
      metrics: resultsObj.metrics || {},
    });

  } catch (error) {
    console.error("[API] Status polling error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load submission status",
      details: error.message,
    });
  }
});

// ─── Code drafts ─────────────────────────────────────────────────────────────

router.post("/code/save", requireAuth, async (req, res) => {
  try {
    // 1. Check Redis cache first (Fast Path)
    const cachedData = await connection.get(`submission:status:${submissionId}`);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      return res.json({
        success: true,
        ...parsed,
      });
    }
    await CodeDraftDB.save(req.userId, problemId, language, code);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/code/:problemId/:language", requireAuth, async (req, res) => {
  try {
    const saved = await CodeDraftDB.get(req.userId, req.params.problemId, req.params.language);
    res.json({ success: true, saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── Submission history ───────────────────────────────────────────────────────

router.get("/submissions/:problemId", requireAuth, async (req, res) => {
  try {
    const history = await SubmissionDB.getByProblem(req.userId, req.params.problemId);
    res.json({ success: true, submissions: history });
  } catch (error) {
    console.error("[API] Status polling error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load submission status",
      details: error.message,
    });
  }
});

module.exports = router;
