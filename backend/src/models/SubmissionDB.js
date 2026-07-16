const pool = require("../config/db");

const MAX_PER_PROBLEM = 20;

class SubmissionDB {
  /**
   * Insert a queued submission record using the enqueued UUID.
   */
  static async createQueued(id, userId, problemId, language) {
    const { rows } = await pool.query(
      `INSERT INTO dsa_submissions
         (id, user_id, problem_id, language, all_passed, passed_count, total_count, results)
       VALUES ($1, $2, $3, $4, false, 0, 0, $5)
       RETURNING id, submitted_at`,
      [id, userId, Number(problemId), language, JSON.stringify({ status: 'queued', current: 0, total: 0 })]
    );
    return rows[0];
  }

  /**
   * Update a submission record with evaluation results.
   */
  static async update(id, userId, problemId, allPassed, passedCount, totalCount, results) {
    const { rows } = await pool.query(
      `UPDATE dsa_submissions
       SET all_passed = $1, passed_count = $2, total_count = $3, results = $4, submitted_at = NOW()
       WHERE id = $5
       RETURNING id, submitted_at`,
      [allPassed, passedCount, totalCount, JSON.stringify(results), id]
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

  /**
   * Retrieve a submission by its UUID.
   */
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT id, user_id, problem_id, language, all_passed, passed_count, total_count, results, submitted_at
       FROM dsa_submissions
       WHERE id = $1`,
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      userId: row.user_id,
      problemId: row.problem_id,
      language: row.language,
      allPassed: row.all_passed,
      passedCount: row.passed_count,
      totalCount: row.total_count,
      results: row.results,
      timestamp: row.submitted_at,
    };
  }

  /**
   * Get submission history for a user and problem.
   */
  static async getByProblem(userId, problemId) {
    const { rows } = await pool.query(
      `SELECT id, language, all_passed AS allPassed, passed_count AS passedCount, total_count AS totalCount, results, submitted_at AS timestamp
       FROM dsa_submissions
       WHERE user_id = $1 AND problem_id = $2
       ORDER BY submitted_at DESC
       LIMIT $3`,
      [userId, Number(problemId), MAX_PER_PROBLEM]
    );
    // Format JSON results
    return rows.map(row => ({
      id: row.id,
      language: row.language,
      allPassed: row.allpassed,
      passedCount: row.passedcount,
      totalCount: row.totalcount,
      results: Array.isArray(row.results?.results) ? row.results.results : (Array.isArray(row.results) ? row.results : []),
      timestamp: row.timestamp,
    }));
  }

  /**
   * Increment attempt counter in dsa_problem_attempts.
   */
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

  /**
   * Get count of attempts.
   */
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
