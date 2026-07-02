/**
 * Skill Score Engine
 *
 * score(category) = Σ [ difficulty_weight × (1 / attempt_number) × recency_decay ]
 *
 * difficulty_weight : Easy=1, Medium=2, Hard=4
 * attempt_number    : how many attempts it took to get ACCEPTED (first try = 1.0, second = 0.5, …)
 * recency_decay     : e^(-λ × days_since_solved), λ=0.005 → half-life ≈ 139 days
 *
 * Interview Readiness Score (0-100):
 *   weighted average of category scores, normalised against a "perfect" baseline.
 */

const pool = require("../config/db");
const { getAllProblems } = require("../data/problems");

const DIFFICULTY_WEIGHT = { Easy: 1, Medium: 2, Hard: 4 };
const DECAY_LAMBDA = 0.005; // e^(-λt), t in days

// Category weights for IRS (must sum to 1.0)
const CATEGORY_WEIGHT = {
  Array: 0.15,
  "Dynamic Programming": 0.20,
  Graph: 0.15,
  Tree: 0.15,
  String: 0.10,
  "Linked List": 0.08,
  "Binary Search": 0.07,
  Matrix: 0.04,
  Interval: 0.03,
  Heap: 0.02,
  Trie: 0.01,
};

// Max possible score per category (all problems solved on first try, today)
const _PROBLEM_MAP = {};
function getProblemMeta(problemId) {
  if (!_PROBLEM_MAP[problemId]) {
    const all = getAllProblems();
    all.forEach((p) => (_PROBLEM_MAP[p.id] = p));
  }
  return _PROBLEM_MAP[problemId];
}

async function updateSkillScores(userId) {
  // Fetch all ACCEPTED submissions for this user, joined with attempt counts
  const { rows: accepted } = await pool.query(
    `SELECT
       s.problem_id,
       s.submitted_at,
       pa.attempt_count
     FROM dsa_submissions s
     JOIN dsa_problem_attempts pa
       ON pa.user_id = s.user_id AND pa.problem_id = s.problem_id
     WHERE s.user_id = $1
       AND s.verdict = 'ACCEPTED'
     ORDER BY s.submitted_at ASC`,
    [userId]
  );

  // For each problem keep only the first ACCEPTED submission (the actual solve)
  const firstAccept = {};
  for (const row of accepted) {
    if (!firstAccept[row.problem_id]) {
      firstAccept[row.problem_id] = row;
    }
  }

  // Aggregate scores by category
  const categoryScores = {};
  const categoryCounts = {};
  const now = Date.now();

  for (const row of Object.values(firstAccept)) {
    const meta = getProblemMeta(row.problem_id);
    if (!meta) continue;

    const diffWeight = DIFFICULTY_WEIGHT[meta.difficulty] ?? 1;
    const attemptFactor = 1 / Math.max(1, row.attempt_count);
    const daysSince = (now - new Date(row.submitted_at).getTime()) / 86_400_000;
    const decay = Math.exp(-DECAY_LAMBDA * daysSince);
    const contribution = diffWeight * attemptFactor * decay;

    const cat = meta.category;
    categoryScores[cat] = (categoryScores[cat] ?? 0) + contribution;
    categoryCounts[cat] = (categoryCounts[cat] ?? 0) + 1;
  }

  // Normalise each category score to 0-100
  // "perfect" for a category: all hard problems solved on first try today = Σ(4×1×1) per problem
  const allProblems = getAllProblems();
  const maxPerCategory = {};
  for (const p of allProblems) {
    const w = DIFFICULTY_WEIGHT[p.difficulty] ?? 1;
    maxPerCategory[p.category] = (maxPerCategory[p.category] ?? 0) + w;
  }

  const normalised = {};
  for (const [cat, raw] of Object.entries(categoryScores)) {
    const max = maxPerCategory[cat] ?? 1;
    normalised[cat] = Math.min(100, (raw / max) * 100);
  }

  // Upsert category scores
  for (const [category, score] of Object.entries(normalised)) {
    await pool.query(
      `INSERT INTO dsa_skill_scores (user_id, category, score, problems_solved, last_updated)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, category) DO UPDATE
         SET score           = EXCLUDED.score,
             problems_solved = EXCLUDED.problems_solved,
             last_updated    = NOW()`,
      [userId, category, score.toFixed(2), categoryCounts[category] ?? 0]
    );
  }

  // Compute IRS
  let irs = 0;
  let totalWeight = 0;
  for (const [cat, weight] of Object.entries(CATEGORY_WEIGHT)) {
    irs += (normalised[cat] ?? 0) * weight;
    totalWeight += weight;
  }
  irs = totalWeight > 0 ? irs / totalWeight : 0;

  return { categoryScores: normalised, categoryCounts, irs: Math.min(100, irs) };
}

async function updateUserAnalytics(userId, newVerdict, newDifficulty) {
  // Fetch aggregate counts from submissions table (source of truth)
  const { rows: stats } = await pool.query(
    `SELECT
       COUNT(*) FILTER (WHERE verdict = 'ACCEPTED') AS total_solved,
       COUNT(*) AS total_submissions,
       COUNT(*) FILTER (WHERE verdict = 'ACCEPTED' AND difficulty = 'Easy') AS easy_solved,
       COUNT(*) FILTER (WHERE verdict = 'ACCEPTED' AND difficulty = 'Medium') AS medium_solved,
       COUNT(*) FILTER (WHERE verdict = 'ACCEPTED' AND difficulty = 'Hard') AS hard_solved
     FROM (
       SELECT DISTINCT ON (problem_id) s.*, p.difficulty
       FROM dsa_submissions s
       -- difficulty comes from our problem bank; join via a subquery since problems live in code
       -- We'll handle difficulty counting differently below
       WHERE s.user_id = $1
       ORDER BY problem_id, submitted_at ASC
     ) sub`,
    [userId]
  );

  // Simpler: count distinct solved problems per difficulty by querying submissions + problems in JS
  const { rows: solvedRows } = await pool.query(
    `SELECT DISTINCT problem_id FROM dsa_submissions
     WHERE user_id = $1 AND verdict = 'ACCEPTED'`,
    [userId]
  );

  const { rows: totalRows } = await pool.query(
    `SELECT COUNT(*) AS cnt FROM dsa_submissions WHERE user_id = $1`,
    [userId]
  );

  const allProblems = getAllProblems();
  const problemDiff = {};
  allProblems.forEach((p) => (problemDiff[p.id] = p.difficulty));

  let easySolved = 0,
    mediumSolved = 0,
    hardSolved = 0;
  for (const { problem_id } of solvedRows) {
    const diff = problemDiff[problem_id];
    if (diff === "Easy") easySolved++;
    else if (diff === "Medium") mediumSolved++;
    else if (diff === "Hard") hardSolved++;
  }

  const totalSolved = solvedRows.length;
  const totalSubmissions = parseInt(totalRows[0].cnt);
  const acceptanceRate =
    totalSubmissions > 0 ? (totalSolved / totalSubmissions) * 100 : 0;

  // Streak: count consecutive days with at least one accepted submission up to today
  const { rows: activityRows } = await pool.query(
    `SELECT DISTINCT DATE(submitted_at AT TIME ZONE 'UTC') AS day
     FROM dsa_submissions
     WHERE user_id = $1 AND verdict = 'ACCEPTED'
     ORDER BY day DESC`,
    [userId]
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  for (let i = 0; i < activityRows.length; i++) {
    const day = new Date(activityRows[i].day);
    const expected = new Date(today);
    expected.setUTCDate(today.getUTCDate() - i);
    if (day.getTime() === expected.getTime()) {
      streak++;
      if (i === 0) currentStreak = streak;
    } else {
      break;
    }
    longestStreak = Math.max(longestStreak, streak);
  }

  // Get IRS from skill scores table (already updated)
  const { rows: irsRow } = await pool.query(
    `SELECT COALESCE(AVG(score), 0) AS avg_score FROM dsa_skill_scores WHERE user_id = $1`,
    [userId]
  );
  const irs = parseFloat(irsRow[0].avg_score);

  const lastSolvedAt =
    newVerdict === "ACCEPTED" ? new Date().toISOString() : undefined;

  await pool.query(
    `INSERT INTO dsa_user_analytics
       (user_id, total_solved, easy_solved, medium_solved, hard_solved,
        total_submissions, acceptance_rate, current_streak_days,
        longest_streak_days, last_solved_at, interview_readiness, updated_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())
     ON CONFLICT (user_id) DO UPDATE SET
       total_solved         = EXCLUDED.total_solved,
       easy_solved          = EXCLUDED.easy_solved,
       medium_solved        = EXCLUDED.medium_solved,
       hard_solved          = EXCLUDED.hard_solved,
       total_submissions    = EXCLUDED.total_submissions,
       acceptance_rate      = EXCLUDED.acceptance_rate,
       current_streak_days  = EXCLUDED.current_streak_days,
       longest_streak_days  = GREATEST(dsa_user_analytics.longest_streak_days, EXCLUDED.longest_streak_days),
       last_solved_at       = COALESCE(EXCLUDED.last_solved_at, dsa_user_analytics.last_solved_at),
       interview_readiness  = EXCLUDED.interview_readiness,
       updated_at           = NOW()`,
    [
      userId,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalSubmissions,
      acceptanceRate.toFixed(2),
      currentStreak,
      longestStreak,
      lastSolvedAt ?? null,
      irs.toFixed(2),
    ]
  );

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalSubmissions,
    acceptanceRate: +acceptanceRate.toFixed(2),
    currentStreak,
    longestStreak,
    interviewReadiness: +irs.toFixed(2),
  };
}

async function recordDailyActivity(userId, verdict) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const solved = verdict === "ACCEPTED" ? 1 : 0;

  await pool.query(
    `INSERT INTO dsa_daily_activity (user_id, activity_date, problems_solved, submissions)
     VALUES ($1, $2, $3, 1)
     ON CONFLICT (user_id, activity_date) DO UPDATE SET
       problems_solved = dsa_daily_activity.problems_solved + EXCLUDED.problems_solved,
       submissions     = dsa_daily_activity.submissions + 1`,
    [userId, today, solved]
  );
}

async function getAnalytics(userId) {
  const [analyticsResult, skillResult, activityResult] = await Promise.all([
    pool.query(`SELECT * FROM dsa_user_analytics WHERE user_id = $1`, [userId]),
    pool.query(
      `SELECT category, score, problems_solved FROM dsa_skill_scores
       WHERE user_id = $1 ORDER BY score DESC`,
      [userId]
    ),
    pool.query(
      `SELECT activity_date, problems_solved, submissions
       FROM dsa_daily_activity
       WHERE user_id = $1 AND activity_date >= NOW() - INTERVAL '365 days'
       ORDER BY activity_date ASC`,
      [userId]
    ),
  ]);

  const analytics = analyticsResult.rows[0] ?? {
    total_solved: 0,
    easy_solved: 0,
    medium_solved: 0,
    hard_solved: 0,
    total_submissions: 0,
    acceptance_rate: 0,
    current_streak_days: 0,
    longest_streak_days: 0,
    interview_readiness: 0,
  };

  return {
    overview: analytics,
    skillScores: skillResult.rows,
    heatmap: activityResult.rows,
  };
}

module.exports = { updateSkillScores, updateUserAnalytics, recordDailyActivity, getAnalytics };
