-- Migration: files + admin grid
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-files.sql
-- Safe/idempotent: only creates new tables, touches nothing existing.

-- File metadata. Actual bytes live in R2; this row points to the R2 key.
CREATE TABLE IF NOT EXISTS files (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  r2_key      TEXT NOT NULL,              -- object key in the R2 bucket
  filename    TEXT NOT NULL,              -- original display name
  content_type TEXT DEFAULT '',
  size        INTEGER DEFAULT 0,
  section     TEXT NOT NULL DEFAULT 'general',  -- 'content' | 'general'
  segment_id  TEXT,                        -- optional link to a segment (content files)
  uploaded_by TEXT DEFAULT '',
  uploaded_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_files_section ON files(section);
CREATE INDEX IF NOT EXISTS idx_files_segment ON files(segment_id);

-- Admin grid: a single editable spreadsheet-like table stored as JSON.
-- One row holds the whole grid (id=1). columns = JSON array of headers,
-- rows = JSON array of row-arrays.
CREATE TABLE IF NOT EXISTS admin_grid (
  id          INTEGER PRIMARY KEY,
  columns     TEXT NOT NULL DEFAULT '["Item","Owner","Status","Notes"]',
  rows        TEXT NOT NULL DEFAULT '[]',
  updated_at  TEXT DEFAULT (datetime('now')),
  updated_by  TEXT DEFAULT ''
);
INSERT OR IGNORE INTO admin_grid (id, columns, rows) VALUES (1, '["Item","Owner","Status","Notes"]', '[]');
