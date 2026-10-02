-- Control Room inbox: files dropped in, read by Claude, filed once someone presses Apply.
-- Safe to re-run (IF NOT EXISTS); never drops or deletes anything.
CREATE TABLE IF NOT EXISTS inbox_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  file_id     INTEGER NOT NULL,          -- files.id (the stored upload)
  name        TEXT NOT NULL,
  ext         TEXT DEFAULT '',
  state       TEXT DEFAULT 'review',     -- review | filed | dismissed
  type        TEXT DEFAULT 'other',      -- what Claude thinks it is
  confidence  INTEGER DEFAULT 0,
  summary     TEXT DEFAULT '',
  fields_json TEXT DEFAULT '[]',         -- [{"label":"Supplier","value":"Schuster"}]
  target      TEXT DEFAULT '',           -- suggested item id (food, design, talent or session)
  filed_to    TEXT DEFAULT '',
  created_by  TEXT DEFAULT '',
  created_at  TEXT DEFAULT (datetime('now')),
  filed_by    TEXT DEFAULT '',
  filed_at    TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_inbox_state ON inbox_items(state);
