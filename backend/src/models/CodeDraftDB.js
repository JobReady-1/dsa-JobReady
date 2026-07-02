const pool = require("../config/db");

class CodeDraftDB {
  static async save(userId, problemId, language, code) {
    await pool.query(
      `INSERT INTO dsa_code_drafts (user_id, problem_id, language, code, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, problem_id, language)
       DO UPDATE SET code = EXCLUDED.code, updated_at = NOW()`,
      [userId, Number(problemId), language, code]
    );
  }

  static async get(userId, problemId, language) {
    const { rows } = await pool.query(
      `SELECT code, updated_at FROM dsa_code_drafts
       WHERE user_id = $1 AND problem_id = $2 AND language = $3`,
      [userId, Number(problemId), language]
    );
    return rows[0] || null;
  }
}

module.exports = CodeDraftDB;
