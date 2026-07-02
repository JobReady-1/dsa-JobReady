const pool = require("../config/db");

const MAX_PER_PROBLEM = 20;

class SubmissionDB {
  /**
   * Save a submission record.
   * verdict: 'ACCEPTED' | 'WRONG_ANSWER' | 'TLE' | 'RUNTIME_ERROR' | 'COMPILE_ERROR'
   */
  static async save(userId, problemId, { language, verdict, passed_count, total_count, runtime_ms, code }) {
    const { rows } = await pool.query(
      `INSERT INTO dsa_submissions
         (user_id, problem_id, language, verdict, passed_count, total_count, runtime_ms, code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, submitted_at`,
      [userId, Number(problemId), language, verdict, passed_count, total_count, runtime_ms, code]
    );

    // Keep only the latest MAX_PER_PROBLEM per user/problem
    await pool.query(
      `DELETE FROM dsa_submissions
       WHERE user_id = $1 AND problem_id = $2
         AND id NOT IN (
           SELECT id FROM dsa_submissions
           WHERE user_id = $1 AND problem_id = $2
           ORDER BY submitted_at DESC
           LIMIT $3
         )`,
      [userId, Number(problemId), MAX_PER_PROBLEM]
    );

    return rows[0];
  }

  static async getByProblem(userId, problemId) {
    const { rows } = await pool.query(
      `SELECT id, language, verdict, passed_count, total_count, runtime_ms, submitted_at
       FROM dsa_submissions
       WHERE user_id = $1 AND problem_id = $2
       ORDER BY submitted_at DESC
       LIMIT $3`,
      [userId, Number(problemId), MAX_PER_PROBLEM]
    );
    return rows;
  }

  // Increment attempt counter in dsa_problem_attempts
  static async recordAttempt(userId, problemId) {
    await pool.query(
      `INSERT INTO dsa_problem_attempts (user_id, problem_id, attempt_count, first_attempted_at, last_attempted_at)
       VALUES ($1, $2, 1, NOW(), NOW())
       ON CONFLICT (user_id, problem_id)
       DO UPDATE SET
         attempt_count = dsa_problem_attempts.attempt_count + 1,
         last_attempted_at = NOW()`,
      [userId, Number(problemId)]
    );
  }

  static async getAttemptCount(userId, problemId) {
    const { rows } = await pool.query(
      `SELECT attempt_count FROM dsa_problem_attempts
       WHERE user_id = $1 AND problem_id = $2`,
      [userId, Number(problemId)]
    );
    return rows[0]?.attempt_count || 0;
  }
}

module.exports = SubmissionDB;
