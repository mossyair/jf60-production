-- Organizations fair (Cinematheque, 22.10) for the Control Room.
-- Safe to re-run (IF NOT EXISTS); never drops or deletes anything.
CREATE TABLE IF NOT EXISTS fair_orgs (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  domain      TEXT DEFAULT '',           -- Community & welfare | Education, sport & shared life | East Jerusalem | Culture & arts | Special programs
  contact     TEXT DEFAULT '',           -- contact person(s)
  phone       TEXT DEFAULT '',
  email       TEXT DEFAULT '',           -- one or more, comma separated
  note        TEXT DEFAULT '',
  contacted   INTEGER DEFAULT 0,         -- invitation sent
  confirmed   INTEGER DEFAULT 0,         -- coming to the fair
  form_done   INTEGER DEFAULT 0,         -- filled in the Google information form
  power       INTEGER DEFAULT 0,         -- needs a power point at the stand
  sort_order  INTEGER DEFAULT 0,
  updated_at  TEXT DEFAULT (datetime('now'))
);
