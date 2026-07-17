const supabase = require('../config/supabase');
const fs = require('fs');
const path = require('path');

const LOCAL_DATA_PATH = path.join(__dirname, '../../data/submissions.json');

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function loadLocal() {
  try {
    if (fs.existsSync(LOCAL_DATA_PATH)) {
      return JSON.parse(fs.readFileSync(LOCAL_DATA_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Failed to parse local submissions file:', e.message);
  }
  return {};
}

function saveLocal(data) {
  try {
    ensureDirectoryExistence(LOCAL_DATA_PATH);
    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write local submissions file:', e.message);
  }
}

class SubmissionsModel {
  static async save(userId, problemId, language, allPassed, passedCount, totalCount, results) {
    if (supabase) {
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
    } else {
      const local = loadLocal();
      const key = `${userId}_${problemId}`;
      if (!local[key]) local[key] = [];
      local[key].push({
        allPassed,
        passedCount,
        totalCount,
        results,
        language,
        timestamp: new Date().toISOString()
      });
      saveLocal(local);
    }
  }

  static async createQueued(id, userId, problemId, language) {
    if (supabase) {
      const { error } = await supabase
        .from('dsa_submissions')
        .insert({
          id,
          user_id: userId,
          problem_id: problemId,
          language,
          all_passed: false,
          passed_count: 0,
          total_count: 0,
          results: { status: 'queued', current: 0, total: 0 },
        });
      if (error) throw error;
    } else {
      const local = loadLocal();
      const key = `${userId}_${problemId}`;
      if (!local[key]) local[key] = [];
      local[key].push({
        id,
        allPassed: false,
        passedCount: 0,
        totalCount: 0,
        results: { status: 'queued', current: 0, total: 0 },
        language,
        timestamp: new Date().toISOString()
      });
      saveLocal(local);
    }
  }

  static async update(id, userId, problemId, allPassed, passedCount, totalCount, results) {
    if (supabase) {
      const { error } = await supabase
        .from('dsa_submissions')
        .update({
          all_passed: allPassed,
          passed_count: passedCount,
          total_count: totalCount,
          results,
        })
        .eq('id', id);
      if (error) throw error;
    } else {
      const local = loadLocal();
      const key = `${userId}_${problemId}`;
      const list = local[key] || [];
      const item = list.find(s => s.id === id);
      if (item) {
        item.allPassed = allPassed;
        item.passedCount = passedCount;
        item.totalCount = totalCount;
        item.results = results;
      }
      saveLocal(local);
    }
  }

  static async getForProblem(userId, problemId, limit = 10) {
    if (supabase) {
      const { data, error } = await supabase
        .from('dsa_submissions')
        .select('*')
        .eq('user_id', userId)
        .eq('problem_id', problemId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return (data || [])
        // Only return finalized submissions — results must be an array of test cases
        .filter((row) => Array.isArray(row.results))
        .map((row) => ({
          id: row.id,
          allPassed: row.all_passed,
          passedCount: row.passed_count,
          totalCount: row.total_count,
          results: row.results,
          language: row.language,
          timestamp: row.created_at,
        }));
    } else {
      const local = loadLocal();
      const key = `${userId}_${problemId}`;
      const list = local[key] || [];
      return list
        .slice()
        .reverse()
        .slice(0, limit)
        // Only return finalized submissions — results must be an array of test cases
        .filter((row) => Array.isArray(row.results))
        .map(row => ({
          id: row.id,
          allPassed: row.allPassed,
          passedCount: row.passedCount,
          totalCount: row.totalCount,
          results: row.results,
          language: row.language,
          timestamp: row.timestamp
        }));
    }
  }

  static async getById(id) {
    if (supabase) {
      const { data, error } = await supabase
        .from('dsa_submissions')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error || !data) return null;

      return {
        id: data.id,
        userId: data.user_id,
        problemId: data.problem_id,
        allPassed: data.all_passed,
        passedCount: data.passed_count,
        totalCount: data.total_count,
        results: data.results,
        language: data.language,
        timestamp: data.created_at,
      };
    } else {
      const local = loadLocal();
      for (const list of Object.values(local)) {
        const item = list.find(s => s.id === id);
        if (item) {
          return {
            id: item.id,
            allPassed: item.allPassed,
            passedCount: item.passedCount,
            totalCount: item.totalCount,
            results: item.results,
            language: item.language,
            timestamp: item.timestamp,
          };
        }
      }
      return null;
    }
  }
}

module.exports = SubmissionsModel;
