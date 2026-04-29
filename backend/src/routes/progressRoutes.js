const express = require('express');
const router = express.Router();
const UserProgressModel = require('../models/UserProgressFile');

// Get user progress
router.get('/progress', (req, res) => {
  try {
    const progress = UserProgressModel.getProgress();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Mark problem as solved
router.post('/progress/solve', (req, res) => {
  try {
    const { problemId } = req.body;
    
    if (!problemId) {
      return res.status(400).json({ success: false, error: 'Problem ID is required' });
    }

    const progress = UserProgressModel.markProblemSolved(problemId);
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start session (for time tracking)
router.post('/progress/start-session', (req, res) => {
  try {
    const result = UserProgressModel.startSession();
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update time spent
router.post('/progress/update-time', (req, res) => {
  try {
    const progress = UserProgressModel.updateTimeSpent();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Reset progress (for testing)
router.post('/progress/reset', (req, res) => {
  try {
    const progress = UserProgressModel.reset();
    res.json({ success: true, progress, message: 'Progress reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get solved problems for a test
router.post('/progress/test-solved', (req, res) => {
  try {
    const { problemIds } = req.body;
    
    if (!problemIds || !Array.isArray(problemIds)) {
      return res.status(400).json({ success: false, error: 'Problem IDs array is required' });
    }

    const solvedProblems = UserProgressModel.getSolvedProblemsForTest(problemIds);
    res.json({ success: true, solvedProblems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
