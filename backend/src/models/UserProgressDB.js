const pool = require('../config/db');

const TOTAL_PROBLEMS = 75;

class UserProgressDB {
  // Ensure a row exists for this user (upsert on first access)
  static async ensureUser(userId) {
    await pool.query(
      `INSERT INTO dsa_user_progress (user_id)
       VALUES ($1)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    );
  }

  static async getProgress(userId) {
    await this.ensureUser(userId);
    const { rows } = await pool.query(
      'SELECT * FROM dsa_user_progress WHERE user_id = $1',
      [userId]
    );
    return this._format(rows[0]);
  }

  static async markProblemSolved(userId, problemId) {
    await this.ensureUser(userId);

    const { rows } = await pool.query(
      'SELECT solved_problems, streak_current, last_solved_date FROM dsa_user_progress WHERE user_id = $1',
      [userId]
    );
    const row = rows[0];

    const solved = new Set(row.solved_problems || []);
    const wasNew = !solved.has(problemId);
    solved.add(problemId);

    if (wasNew) {
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const lastSolved = row.last_solved_date
        ? new Date(row.last_solved_date).toISOString().split('T')[0]
        : null;

      let streak = row.streak_current || 0;
      if (!lastSolved) {
        streak = 1;
      } else if (lastSolved !== today) {
        const diffDays = Math.round(
          (new Date(today) - new Date(lastSolved)) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) streak += 1;
        else if (diffDays > 1) streak = 1;
        // same day: no change
      }

      await pool.query(
        `UPDATE dsa_user_progress
         SET solved_problems = $2, streak_current = $3, last_solved_date = $4
         WHERE user_id = $1`,
        [userId, Array.from(solved), streak, today]
      );
    }

    return this.getProgress(userId);
  }

  static async startSession(userId) {
    await this.ensureUser(userId);
    // Only set session_start_ms if it isn't already set (don't reset an active session)
    await pool.query(
      `UPDATE dsa_user_progress
       SET session_start_ms = COALESCE(session_start_ms, $2)
       WHERE user_id = $1`,
      [userId, Date.now()]
    );
    return { success: true };
  }

  static async updateTimeSpent(userId) {
    await this.ensureUser(userId);

    const { rows } = await pool.query(
      'SELECT session_start_ms, time_spent_seconds FROM dsa_user_progress WHERE user_id = $1',
      [userId]
    );
    const row = rows[0];

    if (row.session_start_ms) {
      const elapsed = Math.floor((Date.now() - Number(row.session_start_ms)) / 1000);
      await pool.query(
        `UPDATE dsa_user_progress
         SET time_spent_seconds = time_spent_seconds + $2,
             session_start_ms   = $3
         WHERE user_id = $1`,
        [userId, elapsed, Date.now()]
      );
    }

    return this.getProgress(userId);
  }

  static async reset(userId) {
    await this.ensureUser(userId);
    await pool.query(
      `UPDATE dsa_user_progress
       SET solved_problems    = '{}',
           streak_current     = 0,
           last_solved_date   = NULL,
           time_spent_seconds = 0,
           session_start_ms   = NULL
       WHERE user_id = $1`,
      [userId]
    );
    return this.getProgress(userId);
  }

  static async getSolvedProblemsForTest(userId, problemIds) {
    await this.ensureUser(userId);
    const { rows } = await pool.query(
      'SELECT solved_problems FROM dsa_user_progress WHERE user_id = $1',
      [userId]
    );
    const solved = new Set(rows[0]?.solved_problems || []);
    return problemIds.filter(id => solved.has(id));
  }

  static _format(row) {
    const solved = row.solved_problems || [];
    const total = row.total_problems || TOTAL_PROBLEMS;
    const completionPercentage = Math.round((solved.length / total) * 100);
    const totalSeconds = row.time_spent_seconds || 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const timeSpent = `${hours}.${Math.floor((minutes / 60) * 10)}h`;

    return {
      userId: row.user_id,
      solvedProblems: solved,
      totalProblems: total,
      completionPercentage,
      streak: row.streak_current || 0,
      timeSpent,
      timeSpentSeconds: totalSeconds,
    };
  }
}

module.exports = UserProgressDB;
