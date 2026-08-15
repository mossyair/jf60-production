-- Migration: general notes (single shared freeform text doc)
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-notes.sql
-- Safe/idempotent.

CREATE TABLE IF NOT EXISTS general_notes (
  id          INTEGER PRIMARY KEY,
  body        TEXT DEFAULT '',
  updated_at  TEXT DEFAULT (datetime('now')),
  updated_by  TEXT DEFAULT ''
);
INSERT OR IGNORE INTO general_notes (id, body) VALUES (1, '');
