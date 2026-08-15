-- JF60 Production DB schema
-- Run with: wrangler d1 execute jf60-db --remote --file=./schema.sql

CREATE TABLE IF NOT EXISTS segments (
  id          TEXT PRIMARY KEY,
  day         INTEGER NOT NULL,
  time        TEXT NOT NULL,
  end_time    TEXT NOT NULL,
  title       TEXT NOT NULL,
  venue       TEXT NOT NULL,
  descr       TEXT DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'open',   -- open | progress | confirmed
  is_meal     INTEGER DEFAULT 0,
  notes       TEXT DEFAULT '',
  sort_order  INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS people (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  segment_id  TEXT NOT NULL,
  name        TEXT NOT NULL,
  confirmed   INTEGER DEFAULT 0,
  FOREIGN KEY (segment_id) REFERENCES segments(id) ON DELETE CASCADE
);

-- Checklist items. seeded=1 rows come from the original schedule;
-- anyone with the edit link can INSERT new rows (seeded=0).
CREATE TABLE IF NOT EXISTS checklist (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  segment_id  TEXT,                            -- nullable: general items not tied to a segment
  text        TEXT NOT NULL,
  done        INTEGER DEFAULT 0,
  seeded      INTEGER DEFAULT 0,
  created_by  TEXT DEFAULT '',
  created_at  TEXT DEFAULT (datetime('now')),
  sort_order  INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_people_seg ON people(segment_id);
CREATE INDEX IF NOT EXISTS idx_check_seg ON checklist(segment_id);
