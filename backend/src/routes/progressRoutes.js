const express = require("express");
const router = express.Router();
const UserProgressDB = require("../models/UserProgressDB");
const { requireAuth } = require("../middleware/auth");
const { getAnalytics, updateSkillScores, updateUserAnalytics } = require("../services/skillScoreService");

// All progress routes require auth; userId comes from req.userId (set by middleware)

router.get("/progress", requireAuth, async (req, res) => {
  try {
    const progress = await UserProgressDB.getProgress(req.userId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error("[Progress] getProgress error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/progress/solve", requireAuth, async (req, res) => {
  try {
    const { problemId } = req.body;
    if (!problemId) {
      return res.status(400).json({ success: false, error: "problemId is required" });
    }
    const progress = await UserProgressDB.markProblemSolved(req.userId, problemId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error("[Progress] markProblemSolved error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/progress/start-session", requireAuth, async (req, res) => {
  try {
    const result = await UserProgressDB.startSession(req.userId);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("[Progress] startSession error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/progress/update-time", requireAuth, async (req, res) => {
  try {
    const progress = await UserProgressDB.updateTimeSpent(req.userId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error("[Progress] updateTimeSpent error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/progress/reset", requireAuth, async (req, res) => {
  try {
    const progress = await UserProgressDB.reset(req.userId);
    res.json({ success: true, progress, message: "Progress reset successfully" });
  } catch (error) {
    console.error("[Progress] reset error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/progress/test-solved", requireAuth, async (req, res) => {
  try {
    const { problemIds } = req.body;
    if (!problemIds || !Array.isArray(problemIds)) {
      return res.status(400).json({ success: false, error: "problemIds array is required" });
    }
    const solvedProblems = await UserProgressDB.getSolvedProblemsForTest(req.userId, problemIds);
    res.json({ success: true, solvedProblems });
  } catch (error) {
    console.error("[Progress] getSolvedProblemsForTest error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── Analytics (skill scores, heatmap, IRS) ──────────────────────────────────

router.get("/analytics", requireAuth, async (req, res) => {
  try {
    const data = await getAnalytics(req.userId);
    res.json({ success: true, ...data });
  } catch (error) {
    console.error("[Analytics] getAnalytics error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Force-recompute scores (useful after back-filling data)
router.post("/analytics/recompute", requireAuth, async (req, res) => {
  try {
    const scores = await updateSkillScores(req.userId);
    const analytics = await updateUserAnalytics(req.userId, null, null);
    res.json({ success: true, scores, analytics });
  } catch (error) {
    console.error("[Analytics] recompute error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
