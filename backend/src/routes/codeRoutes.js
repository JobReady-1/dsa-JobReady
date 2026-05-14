const express = require("express");
const router = express.Router();
const { executeCode, runTestCases, isConfigured } = require("../services/codeExecutorJudge0");
const { getProblem, getAllProblems } = require("../data/problems");

// Check if Judge0 is configured
if (!isConfigured()) {
  console.warn('⚠️  WARNING: Judge0 is not configured. Add JUDGE0_API_KEY to .env');
  console.warn('⚠️  Get your API key from: https://rapidapi.com/judge0-official/api/judge0-ce');
}

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

    // Use ALL test cases (both visible and hidden)
    // This prevents users from hardcoding solutions
    const allTestCases = problem.testCases || [];
    console.log(`[API] Running ${allTestCases.length} test cases (including hidden ones)`);
    
    const result = await runTestCases(code, language, allTestCases);
    console.log(`[API] Submission result: ${result.passedCount}/${result.totalCount} passed`);

    // Strip input/output from hidden test cases so they can't be reverse-engineered
    const sanitizedResults = result.results.map((r, i) => {
      if (allTestCases[i]?.hidden) {
        const { input, expectedOutput, actualOutput, normalizedActual, normalizedExpected, ...safe } = r;
        return safe;
      }
      return r;
    });

    res.json({
      success: true,
      ...result,
      results: sanitizedResults,
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

module.exports = router;
