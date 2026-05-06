const fs = require('fs');
const path = require('path');

const CODE_FILE = path.join(__dirname, '../../data/user-code.json');
const DATA_DIR = path.join(__dirname, '../../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadCode() {
  try {
    if (fs.existsSync(CODE_FILE)) {
      return JSON.parse(fs.readFileSync(CODE_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading user code:', error);
  }
  return {};
}

function persistCode(data) {
  try {
    fs.writeFileSync(CODE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving user code:', error);
  }
}

const userCode = loadCode();

class UserCodeModel {
  static saveCode(problemId, language, code) {
    const key = `${problemId}_${language}`;
    userCode[key] = { code, savedAt: new Date().toISOString() };
    persistCode(userCode);
  }

  static getCode(problemId, language) {
    const key = `${problemId}_${language}`;
    return userCode[key] || null;
  }
}

module.exports = UserCodeModel;
