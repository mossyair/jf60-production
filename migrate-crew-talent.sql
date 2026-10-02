-- Crew schedule and talent & contracts for the Control Room.
-- Safe to re-run (IF NOT EXISTS); never drops or deletes anything.
CREATE TABLE IF NOT EXISTS crew_shifts (
  id          TEXT PRIMARY KEY,
  day         TEXT NOT NULL,             -- '19'..'22' (October)
  start_min   INTEGER NOT NULL,          -- minutes from midnight; past 1440 = after midnight
  end_min     INTEGER NOT NULL,
  title       TEXT NOT NULL,
  site        TEXT DEFAULT '',
  kind        TEXT DEFAULT 'setup',      -- setup | guest | move | strike
  crew_json   TEXT DEFAULT '[]',         -- [{"n":"Hagai","r":"Site manager"}, {"n":"2","r":"runners"}]; n "?" = unassigned
  flag        TEXT DEFAULT '',           -- open issue
  note        TEXT DEFAULT '',
  done        INTEGER DEFAULT 0,
  sort_order  INTEGER DEFAULT 0,
  updated_at  TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS talent_items (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  stage       TEXT DEFAULT 'contacted',  -- contacted | quote | signed | invoiced
  fee         INTEGER,                   -- ILS incl. VAT, NULL if unknown
  notes       TEXT DEFAULT '',
  sort_order  INTEGER DEFAULT 0,
  updated_at  TEXT DEFAULT (datetime('now'))
);
