-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 003: Skill Scores & User Analytics
-- Safe to re-run — uses IF NOT EXISTS and ADD COLUMN IF NOT EXISTS
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Per-category skill scores (updated after every accepted submission)
CREATE TABLE IF NOT EXISTS dsa_skill_scores (
  user_id       TEXT    NOT NULL,
  category      TEXT    NOT NULL,
  score         NUMERIC(6,2) NOT NULL DEFAULT 0,
  problems_solved INTEGER NOT NULL DEFAULT 0,
  last_updated  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, category)
);

-- 2. Aggregated user analytics snapshot (for dashboard)
CREATE TABLE IF NOT EXISTS dsa_user_analytics (
  user_id              TEXT    PRIMARY KEY,
  total_solved         INTEGER NOT NULL DEFAULT 0,
  easy_solved          INTEGER NOT NULL DEFAULT 0,
  medium_solved        INTEGER NOT NULL DEFAULT 0,
  hard_solved          INTEGER NOT NULL DEFAULT 0,
  total_submissions    INTEGER NOT NULL DEFAULT 0,
  acceptance_rate      NUMERIC(5,2) NOT NULL DEFAULT 0,
  current_streak_days  INTEGER NOT NULL DEFAULT 0,
  longest_streak_days  INTEGER NOT NULL DEFAULT 0,
  last_solved_at       TIMESTAMPTZ,
  interview_readiness  NUMERIC(5,2) NOT NULL DEFAULT 0,
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Daily activity log (powers the heatmap)
CREATE TABLE IF NOT EXISTS dsa_daily_activity (
  user_id      TEXT    NOT NULL,
  activity_date DATE   NOT NULL,
  problems_solved INTEGER NOT NULL DEFAULT 0,
  submissions  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, activity_date)
);

CREATE INDEX IF NOT EXISTS idx_dsa_daily_activity_user
  ON dsa_daily_activity (user_id, activity_date DESC);
