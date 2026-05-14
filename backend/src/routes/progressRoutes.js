const express = require('express');
const router = express.Router();
const UserProgressModel = require('../models/UserProgress');

// Get user progress
router.get('/progress', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ success: false, error: 'userId is required' });

    const progress = await UserProgressModel.getProgress(userId);
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mark problem as solved
router.post('/progress/solve', async (req, res) => {
  try {
    const { problemId, userId } = req.body;
    if (!problemId || !userId) {
      return res.status(400).json({ success: false, error: 'problemId and userId are required' });
    }

    const progress = await UserProgressModel.markProblemSolved(problemId, userId);
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start session — stamps session_start_ms so elapsed time can be computed on next tick
router.post('/progress/start-session', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: 'userId is required' });

    // Ensure row exists, then stamp session start
    await UserProgressModel.getProgress(userId);
    await UserProgressModel.startSession(userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update time spent — computes elapsed from session_start_ms in DB
router.post('/progress/update-time', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: 'userId is required' });

    const progress = await UserProgressModel.updateTimeSpent(userId);
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset progress
router.post('/progress/reset', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ success: false, error: 'userId is required' });

    const progress = await UserProgressModel.reset(userId);
    res.json({ success: true, progress, message: 'Progress reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
