-- Furniture rental (brief by 2b Vibes) for the Control Room and the session drawers.
-- Safe to re-run (IF NOT EXISTS); never drops or deletes anything.
CREATE TABLE IF NOT EXISTS furniture_items (
  id           TEXT PRIMARY KEY,
  setup        TEXT NOT NULL,             -- the setup it belongs to, e.g. 'Morning event · Mishkenot'
  segment_ids  TEXT DEFAULT '',           -- comma-separated session ids whose drawers show it
  item         TEXT NOT NULL,
  qty          INTEGER,                   -- NULL when the brief gives no number
  qty_note     TEXT DEFAULT '',           -- e.g. 'one set of 3', 'one full ring'
  size         TEXT DEFAULT '',
  stays_until  TEXT DEFAULT '',           -- when it is struck
  notes        TEXT DEFAULT '',
  sort_order   INTEGER DEFAULT 0,
  updated_at   TEXT DEFAULT (datetime('now'))
);
