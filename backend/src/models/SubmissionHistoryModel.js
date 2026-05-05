const fs = require('fs');
const path = require('path');

const SUBMISSIONS_FILE = path.join(__dirname, '../../data/submissions.json');
const DATA_DIR = path.join(__dirname, '../../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadSubmissions() {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading submissions:', error);
  }
  return {};
}

function persistSubmissions(data) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving submissions:', error);
  }
}

const submissions = loadSubmissions();

const MAX_PER_PROBLEM = 10;

class SubmissionHistoryModel {
  static saveSubmission(problemId, data) {
    const key = String(problemId);
    if (!submissions[key]) submissions[key] = [];
    submissions[key].unshift({ ...data, timestamp: new Date().toISOString() });
    if (submissions[key].length > MAX_PER_PROBLEM) {
      submissions[key] = submissions[key].slice(0, MAX_PER_PROBLEM);
    }
    persistSubmissions(submissions);
  }

  static getSubmissions(problemId) {
    return submissions[String(problemId)] || [];
  }
}

module.exports = SubmissionHistoryModel;
