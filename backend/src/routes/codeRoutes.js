const express = require("express");
const router = express.Router();
const { executeCode, runTestCases } = require("../services/codeExecutor");
const { getProblem, getAllProblems, getFullProblem, getTestCasesForSubmit } = require("../data/problems");
const CodeDraftDB = require("../models/CodeDraftDB");
const SubmissionDB = require("../models/SubmissionDB");
const { requireAuth } = require("../middleware/auth");
const { updateSkillScores, updateUserAnalytics, recordDailyActivity } = require("../services/skillScoreService");

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

// POST /api/submit  — run against all test cases, save result
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

    // Record attempt before running (so count is correct even if execution fails)
    await SubmissionDB.recordAttempt(req.userId, problemId);

    const testCases = getTestCasesForSubmit(parseInt(problemId));
    const result = await runTestCases(code, language, testCases);

    // Determine verdict
    let verdict = "WRONG_ANSWER";
    if (result.allPassed) verdict = "ACCEPTED";
    else if (result.results.some((r) => r.error === "Time Limit Exceeded")) verdict = "TLE";
    else if (result.results.some((r) => r.error === "Runtime Error")) verdict = "RUNTIME_ERROR";
    else if (result.results.some((r) => r.error === "Compilation Error")) verdict = "COMPILE_ERROR";

    // Save to Supabase
    const submission = await SubmissionDB.save(req.userId, problemId, {
      language,
      verdict,
      passed_count: result.passedCount,
      total_count: result.totalCount,
      runtime_ms: result.avgRuntime_ms,
      code,
    });

    // Update skill scores asynchronously (don't block the response)
    const problemMeta = problem;
    Promise.all([
      recordDailyActivity(req.userId, verdict),
      updateSkillScores(req.userId).then((scores) =>
        updateUserAnalytics(req.userId, verdict, problemMeta.difficulty).then((analytics) => ({
          skillScores: scores,
          analytics,
        }))
      ),
    ]).catch((err) => console.error("[SkillScore] update failed:", err.message));

    res.json({
      success: true,
      verdict,
      submissionId: submission.id,
      submittedAt: submission.submitted_at,
      ...result,
    });
  } catch (error) {
    console.error("[API] /submit error:", error.message);
    res.status(500).json({ success: false, error: "Submission failed", details: error.message });
  }
});

// ─── Code drafts ─────────────────────────────────────────────────────────────

router.post("/code/save", requireAuth, async (req, res) => {
  try {
    const { problemId, language, code } = req.body;
    if (!problemId || !language || code === undefined) {
      return res.status(400).json({ success: false, error: "problemId, language, and code are required" });
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
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
