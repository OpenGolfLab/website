-- Feedback inbox for /api/feedback (website form + desktop app dialog).
-- Idempotent: safe to re-run. Apply with
--   npx wrangler d1 execute opengolflab-feedback --remote --file db/feedback-schema.sql
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  ts TEXT NOT NULL,            -- ISO 8601, server clock
  kind TEXT NOT NULL,          -- 'bug' | 'idea'
  message TEXT NOT NULL,
  contact TEXT,                -- optional email/handle, only if the sender offered one
  source TEXT NOT NULL,        -- 'website' | 'app'
  app_version TEXT,            -- app submissions only
  page TEXT,                   -- website submissions: the page the form was opened from
  ua TEXT                      -- User-Agent, for triaging platform-specific bugs
);
CREATE INDEX IF NOT EXISTS feedback_ts ON feedback (ts);
