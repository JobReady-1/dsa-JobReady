const express = require('express');
const router = express.Router();
const UserProgressDB = require('../models/UserProgressDB');

// Helper – extract userId from request (body for POST, query for GET)
function getUserId(req) {
  return req.body?.userId || req.query?.userId || null;
}

function requireUserId(req, res) {
  const userId = getUserId(req);
  if (!userId) {
    res.status(400).json({ success: false, error: 'userId is required' });
    return null;
  }
  return userId;
}

// GET /api/progress?userId=...
router.get('/progress', async (req, res) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) return;
    const progress = await UserProgressDB.getProgress(userId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error('[Progress] getProgress error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/progress/solve  { userId, problemId }
router.post('/progress/solve', async (req, res) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) return;
    const { problemId } = req.body;
    if (!problemId) {
      return res.status(400).json({ success: false, error: 'problemId is required' });
    }
    const progress = await UserProgressDB.markProblemSolved(userId, problemId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error('[Progress] markProblemSolved error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/progress/start-session  { userId }
router.post('/progress/start-session', async (req, res) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) return;
    const result = await UserProgressDB.startSession(userId);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('[Progress] startSession error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/progress/update-time  { userId }
router.post('/progress/update-time', async (req, res) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) return;
    const progress = await UserProgressDB.updateTimeSpent(userId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error('[Progress] updateTimeSpent error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/progress/reset  { userId }
router.post('/progress/reset', async (req, res) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) return;
    const progress = await UserProgressDB.reset(userId);
    res.json({ success: true, progress, message: 'Progress reset successfully' });
  } catch (error) {
    console.error('[Progress] reset error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/progress/test-solved  { userId, problemIds[] }
router.post('/progress/test-solved', async (req, res) => {
  try {
    const userId = requireUserId(req, res);
    if (!userId) return;
    const { problemIds } = req.body;
    if (!problemIds || !Array.isArray(problemIds)) {
      return res.status(400).json({ success: false, error: 'problemIds array is required' });
    }
    const solvedProblems = await UserProgressDB.getSolvedProblemsForTest(userId, problemIds);
    res.json({ success: true, solvedProblems });
  } catch (error) {
    console.error('[Progress] getSolvedProblemsForTest error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
