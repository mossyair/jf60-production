-- Migration: live driver positions for the Control Room map.
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-driver-positions.sql
-- One row per driver phone (latest position only, no history). Rows older than 2 days are purged on every write.
CREATE TABLE IF NOT EXISTS driver_positions (
  device TEXT PRIMARY KEY,       -- random id the driver page keeps on the phone
  name TEXT DEFAULT '',          -- the name typed at login
  run_id TEXT DEFAULT '',        -- the run the driver page showed as next, when sharing started
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  accuracy REAL,
  speed REAL,
  heading REAL,
  sharing INTEGER DEFAULT 1,     -- 0 once the driver taps stop
  at TEXT DEFAULT (datetime('now'))
);
