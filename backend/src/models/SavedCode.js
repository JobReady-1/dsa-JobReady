const supabase = require('../config/supabase');

class SavedCodeModel {
  static async save(userId, problemId, language, code) {
    const { error } = await supabase
      .from('dsa_saved_code')
      .upsert(
        { user_id: userId, problem_id: problemId, language, code, saved_at: new Date().toISOString() },
        { onConflict: 'user_id,problem_id,language' }
      );
    if (error) throw error;
  }

  static async get(userId, problemId, language) {
    const { data, error } = await supabase
      .from('dsa_saved_code')
      .select('code, saved_at')
      .eq('user_id', userId)
      .eq('problem_id', problemId)
      .eq('language', language)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return null;
    return { code: data.code, savedAt: data.saved_at };
  }
}

module.exports = SavedCodeModel;
