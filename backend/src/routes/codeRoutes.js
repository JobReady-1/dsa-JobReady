const express = require("express");
const router = express.Router();
const { executeCode, runTestCases } = require("../services/codeExecutor");
const { getProblem, getAllProblems } = require("../data/problems");
const UserCodeModel = require("../models/UserCodeModel");
const SubmissionHistoryModel = require("../models/SubmissionHistoryModel");

// Get all problems
router.get("/problems", (req, res) => {
  try {
    const problems = getAllProblems();
    res.json({ success: true, problems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get specific problem
router.get("/problems/:id", (req, res) => {
  try {
    const problem = getProblem(parseInt(req.params.id));
    if (!problem) {
      return res.status(404).json({ success: false, error: "Problem not found" });
    }
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Run code (without test cases - for testing)
router.post("/run", async (req, res) => {
  console.log("[API] /run endpoint called");
  try {
    const { code, language, input } = req.body;

    if (!code || !language) {
      console.log("[API] Missing code or language");
      return res.status(400).json({
        success: false,
        error: "Code and language are required",
      });
    }

    console.log(`[API] Running code - Language: ${language}, Input length: ${input?.length || 0}`);
    const result = await executeCode(code, language, input || "");
    console.log(`[API] Execution result:`, result.success ? "Success" : "Failed");
    res.json(result);
  } catch (error) {
    console.error("[API] Run error:", error);
    res.status(500).json({
      success: false,
      error: "Execution failed",
      details: error.message,
    });
  }
});

// Submit code (run against test cases)
router.post("/submit", async (req, res) => {
  console.log("[API] /submit endpoint called");
  try {
    const { code, language, problemId } = req.body;

    if (!code || !language || !problemId) {
      console.log("[API] Missing required fields");
      return res.status(400).json({
        success: false,
        error: "Code, language, and problemId are required",
      });
    }

    console.log(`[API] Submitting - Problem: ${problemId}, Language: ${language}`);
    const problem = getProblem(parseInt(problemId));
    if (!problem) {
      console.log("[API] Problem not found");
      return res.status(404).json({
        success: false,
        error: "Problem not found",
      });
    }

    console.log(`[API] Running ${problem.testCases.length} test cases`);
    const result = await runTestCases(code, language, problem.testCases);
    console.log(`[API] Submission result: ${result.passedCount}/${result.totalCount} passed`);
    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("[API] Submit error:", error);
    res.status(500).json({
      success: false,
      error: "Submission failed",
      details: error.message,
    });
  }
});

// Save user code for a problem/language
router.post("/code/save", (req, res) => {
  try {
    const { problemId, language, code } = req.body;
    if (!problemId || !language || code === undefined) {
      return res.status(400).json({ success: false, error: "problemId, language, and code are required" });
    }
    UserCodeModel.saveCode(Number(problemId), language, code);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get saved code for a problem/language
router.get("/code/:problemId/:language", (req, res) => {
  try {
    const saved = UserCodeModel.getCode(Number(req.params.problemId), req.params.language);
    res.json({ success: true, saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Save a submission result
router.post("/submissions/save", (req, res) => {
  try {
    const { problemId, ...data } = req.body;
    if (!problemId) {
      return res.status(400).json({ success: false, error: "problemId is required" });
    }
    SubmissionHistoryModel.saveSubmission(Number(problemId), data);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get submission history for a problem
router.get("/submissions/:problemId", (req, res) => {
  try {
    const history = SubmissionHistoryModel.getSubmissions(Number(req.params.problemId));
    res.json({ success: true, submissions: history });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
