const express = require('express');
const router = express.Router();
const SavedCodeModel = require('../models/SavedCode');
const SubmissionsModel = require('../models/Submissions');

// Save code for a problem
router.post('/code/save', async (req, res) => {
  try {
    const { userId, problemId, language, code } = req.body;
    if (!userId || !problemId || !language || code === undefined) {
      return res.status(400).json({ success: false, error: 'userId, problemId, language and code are required' });
    }
    await SavedCodeModel.save(userId, problemId, language, code);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get saved code for a problem + language
router.get('/code/:problemId/:language', async (req, res) => {
  try {
    const { userId } = req.query;
    const { problemId, language } = req.params;
    if (!userId) return res.status(400).json({ success: false, error: 'userId is required' });

    const saved = await SavedCodeModel.get(userId, parseInt(problemId), language);
    res.json({ success: true, saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Save a submission result
router.post('/submissions/save', async (req, res) => {
  try {
    const { userId, problemId, language, allPassed, passedCount, totalCount, results } = req.body;
    if (!userId || !problemId || !language) {
      return res.status(400).json({ success: false, error: 'userId, problemId and language are required' });
    }
    await SubmissionsModel.save(userId, problemId, language, allPassed, passedCount, totalCount, results || []);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get submission history for a problem
router.get('/submissions/:problemId', async (req, res) => {
  try {
    const { userId } = req.query;
    const { problemId } = req.params;
    if (!userId) return res.status(400).json({ success: false, error: 'userId is required' });

    const submissions = await SubmissionsModel.getForProblem(userId, parseInt(problemId));
    res.json({ success: true, submissions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
