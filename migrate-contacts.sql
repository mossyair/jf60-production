-- Migration: structured contacts / phone list
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-contacts.sql
-- Safe/idempotent: only creates a new table.

CREATE TABLE IF NOT EXISTS contacts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  phone       TEXT DEFAULT '',
  role        TEXT DEFAULT '',          -- role or company
  email       TEXT DEFAULT '',
  notes       TEXT DEFAULT '',
  venue       TEXT DEFAULT '',          -- optional link to a venue (empty = supplier / general)
  created_by  TEXT DEFAULT '',
  created_at  TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_contacts_venue ON contacts(venue);
