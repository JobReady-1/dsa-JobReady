-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 002: DSA Submissions, Code Drafts, Problem Attempts
-- Safe to re-run — uses IF NOT EXISTS and ADD COLUMN IF NOT EXISTS
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Submissions table
CREATE TABLE IF NOT EXISTS dsa_submissions (
  id           BIGSERIAL PRIMARY KEY,
  user_id      TEXT        NOT NULL,
  problem_id   INTEGER     NOT NULL,
  language     TEXT        NOT NULL,
  verdict      TEXT        NOT NULL,
  passed_count INTEGER     NOT NULL DEFAULT 0,
  total_count  INTEGER     NOT NULL DEFAULT 0,
  runtime_ms   INTEGER,
  code         TEXT
);

-- Add submitted_at if the table already existed without it
ALTER TABLE dsa_submissions
  ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_dsa_submissions_user_problem
  ON dsa_submissions (user_id, problem_id, submitted_at DESC);

-- 2. Code drafts
CREATE TABLE IF NOT EXISTS dsa_code_drafts (
  user_id    TEXT    NOT NULL,
  problem_id INTEGER NOT NULL,
  language   TEXT    NOT NULL,
  code       TEXT    NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, problem_id, language)
);

-- 3. Attempt tracking
CREATE TABLE IF NOT EXISTS dsa_problem_attempts (
  user_id            TEXT    NOT NULL,
  problem_id         INTEGER NOT NULL,
  attempt_count      INTEGER NOT NULL DEFAULT 1,
  first_attempted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_attempted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, problem_id)
);
