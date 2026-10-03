-- Sign-in log: one row per visit (a browser tab opening the app with a key).
-- Safe to re-run (IF NOT EXISTS); never drops or deletes anything.
CREATE TABLE IF NOT EXISTS access_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at  TEXT DEFAULT (datetime('now')),   -- UTC
  last_at     TEXT DEFAULT (datetime('now')),   -- UTC, moved forward by pings while the tab is open
  name        TEXT DEFAULT '',                  -- the name typed at sign-in
  level       TEXT DEFAULT '',                  -- admin | edit | view
  ui          TEXT DEFAULT '',                  -- control | classic
  device      TEXT DEFAULT '',                  -- e.g. 'iPhone · Safari'
  country     TEXT DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_access_started ON access_log(started_at);
