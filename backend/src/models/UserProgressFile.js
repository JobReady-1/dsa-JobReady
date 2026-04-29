const fs = require('fs');
const path = require('path');

// Path to store progress data
const PROGRESS_FILE = path.join(__dirname, '../../data/user-progress.json');

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, '../../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load progress from file or create default
function loadProgress() {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      // Convert solvedProblems array back to Set
      parsed.solvedProblems = new Set(parsed.solvedProblems || []);
      return parsed;
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  
  // Return default progress if file doesn't exist or error
  return {
    userId: 'user_001',
    solvedProblems: new Set(),
    totalProblems: 75,
    streak: {
      current: 0,
      lastSolvedDate: null,
    },
    timeSpent: {
      total: 0, // in seconds
      sessions: [],
    },
    startTime: null,
  };
}

// Save progress to file
function saveProgress() {
  try {
    const dataToSave = {
      ...userProgress,
      solvedProblems: Array.from(userProgress.solvedProblems), // Convert Set to Array for JSON
    };
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(dataToSave, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

// Initialize progress from file
const userProgress = loadProgress();

class UserProgressModel {
  // Get user progress
  static getProgress() {
    return {
      userId: userProgress.userId,
      solvedProblems: Array.from(userProgress.solvedProblems),
      totalProblems: userProgress.totalProblems,
      completionPercentage: this.calculateCompletionPercentage(),
      streak: userProgress.streak.current,
      timeSpent: this.formatTimeSpent(userProgress.timeSpent.total),
      timeSpentSeconds: userProgress.timeSpent.total,
    };
  }

  // Mark problem as solved
  static markProblemSolved(problemId) {
    const wasNew = !userProgress.solvedProblems.has(problemId);
    userProgress.solvedProblems.add(problemId);
    
    if (wasNew) {
      this.updateStreak();
    }
    
    saveProgress(); // Save to file
    return this.getProgress();
  }

  // Start tracking time
  static startSession() {
    if (!userProgress.startTime) {
      userProgress.startTime = Date.now();
    }
    return { success: true, startTime: userProgress.startTime };
  }

  // Update time spent
  static updateTimeSpent() {
    if (userProgress.startTime) {
      const elapsed = Math.floor((Date.now() - userProgress.startTime) / 1000);
      userProgress.timeSpent.total += elapsed;
      userProgress.startTime = Date.now(); // Reset for next interval
    }
    saveProgress(); // Save to file
    return this.getProgress();
  }

  // Calculate completion percentage
  static calculateCompletionPercentage() {
    const solved = userProgress.solvedProblems.size;
    const total = userProgress.totalProblems;
    return Math.round((solved / total) * 100);
  }

  // Update streak
  static updateStreak() {
    const today = new Date().toDateString();
    const lastSolved = userProgress.streak.lastSolvedDate;

    if (!lastSolved) {
      // First problem solved
      userProgress.streak.current = 1;
      userProgress.streak.lastSolvedDate = today;
    } else if (lastSolved !== today) {
      const lastDate = new Date(lastSolved);
      const currentDate = new Date(today);
      const diffTime = currentDate - lastDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day
        userProgress.streak.current += 1;
      } else if (diffDays > 1) {
        // Streak broken
        userProgress.streak.current = 1;
      }
      // If same day, don't change streak

      userProgress.streak.lastSolvedDate = today;
    }
  }

  // Format time spent
  static formatTimeSpent(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}.${Math.floor((minutes / 60) * 10)}h`;
  }

  // Reset progress (for testing)
  static reset() {
    userProgress.solvedProblems.clear();
    userProgress.streak.current = 0;
    userProgress.streak.lastSolvedDate = null;
    userProgress.timeSpent.total = 0;
    userProgress.startTime = null;
    saveProgress(); // Save to file
    return this.getProgress();
  }

  // Get solved problems for a specific test
  static getSolvedProblemsForTest(problemIds) {
    return problemIds.filter(id => userProgress.solvedProblems.has(id));
  }
}

module.exports = UserProgressModel;
