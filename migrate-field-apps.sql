-- Migration: group-leader boarding check (field apps).
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-field-apps.sql
-- One row per guest per conference day once their group leader marks them on board.
CREATE TABLE IF NOT EXISTS boarding (
  guest_id INTEGER NOT NULL,
  day INTEGER NOT NULL,
  by TEXT DEFAULT '',
  at TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (guest_id, day)
);
