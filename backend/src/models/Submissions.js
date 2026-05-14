const supabase = require('../config/supabase');

class SubmissionsModel {
  static async save(userId, problemId, language, allPassed, passedCount, totalCount, results) {
    const { error } = await supabase
      .from('dsa_submissions')
      .insert({
        user_id: userId,
        problem_id: problemId,
        language,
        all_passed: allPassed,
        passed_count: passedCount,
        total_count: totalCount,
        results,
      });
    if (error) throw error;
  }

  static async getForProblem(userId, problemId, limit = 10) {
    const { data, error } = await supabase
      .from('dsa_submissions')
      .select('*')
      .eq('user_id', userId)
      .eq('problem_id', problemId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map((row) => ({
      allPassed: row.all_passed,
      passedCount: row.passed_count,
      totalCount: row.total_count,
      results: row.results,
      language: row.language,
      timestamp: row.created_at,
    }));
  }
}

module.exports = SubmissionsModel;
