-- Snapshot of the live jf60-db schema (all 19 tables + indexes), taken 2026-09-30
-- from D1 database 65d05fd1-4647-4998-82fd-d260cf30b5a0 via sqlite_master.
-- Reference only: safe to re-run (IF NOT EXISTS), never drops or deletes anything.
-- Covers the tables that were created outside git: food_items, dietary,
-- design_items, design_proofs, guests, guest_sessions, transport_runs,
-- run_stops, gift_items.

CREATE TABLE IF NOT EXISTS admin_grid (
  id          INTEGER PRIMARY KEY,
  columns     TEXT NOT NULL DEFAULT '["Item","Owner","Status","Notes"]',
  rows        TEXT NOT NULL DEFAULT '[]',
  updated_at  TEXT DEFAULT (datetime('now')),
  updated_by  TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS checklist (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  segment_id  TEXT,                            -- nullable: general items not tied to a segment
  text        TEXT NOT NULL,
  done        INTEGER DEFAULT 0,
  seeded      INTEGER DEFAULT 0,
  created_by  TEXT DEFAULT '',
  created_at  TEXT DEFAULT (datetime('now')),
  sort_order  INTEGER DEFAULT 0,
  text_he     TEXT DEFAULT '',
  owner       TEXT DEFAULT ''
);

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

CREATE TABLE IF NOT EXISTS design_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_he TEXT DEFAULT '',
  category TEXT DEFAULT 'print',
  qty TEXT DEFAULT '',
  size TEXT DEFAULT '',
  spec TEXT DEFAULT '',
  status TEXT DEFAULT 'content_missing',
  brief TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  design_cost TEXT DEFAULT '',
  print_cost TEXT DEFAULT '',
  supplier TEXT DEFAULT '',
  deadline TEXT DEFAULT '',
  linked_segment TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS design_proofs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id TEXT NOT NULL,
  file_id INTEGER,
  version INTEGER DEFAULT 1,
  decision TEXT DEFAULT 'pending',
  comment TEXT DEFAULT '',
  decided_by TEXT DEFAULT '',
  uploaded_by TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  decided_at TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS dietary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_name TEXT NOT NULL,
  restrictions TEXT DEFAULT '[]',
  severity TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  applies_to TEXT DEFAULT 'All meals',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS files (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  r2_key      TEXT NOT NULL,              -- object key in the R2 bucket
  filename    TEXT NOT NULL,              -- original display name
  content_type TEXT DEFAULT '',
  size        INTEGER DEFAULT 0,
  section     TEXT NOT NULL DEFAULT 'general',  -- 'content' | 'general'
  segment_id  TEXT,                        -- optional link to a segment (content files)
  uploaded_by TEXT DEFAULT '',
  uploaded_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS food_items (
  id TEXT PRIMARY KEY,
  segment_id TEXT,
  day INTEGER NOT NULL,
  time TEXT,
  end_time TEXT,
  title TEXT NOT NULL,
  venue TEXT DEFAULT '',
  meal_type TEXT DEFAULT 'drinks',
  status TEXT DEFAULT 'not_started',
  notes TEXT DEFAULT '',
  menu_json TEXT DEFAULT '[]',
  beverages TEXT DEFAULT '',
  caterer TEXT DEFAULT '',
  headcount TEXT DEFAULT '',
  dietary_note TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  title_he TEXT DEFAULT '',
  venue_he TEXT DEFAULT '',
  menu_json_he TEXT DEFAULT '',
  beverages_he TEXT DEFAULT '',
  dietary_note_he TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS general_notes (
  id          INTEGER PRIMARY KEY,
  body        TEXT DEFAULT '',
  updated_at  TEXT DEFAULT (datetime('now')),
  updated_by  TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS gift_items (
  id TEXT PRIMARY KEY,
  category TEXT DEFAULT '',
  category_he TEXT DEFAULT '',
  title TEXT NOT NULL,
  title_he TEXT DEFAULT '',
  chosen INTEGER DEFAULT 0,
  qty TEXT DEFAULT '',
  supplier TEXT DEFAULT '',
  cost TEXT DEFAULT '',
  status TEXT DEFAULT 'to_choose',
  notes TEXT DEFAULT '',
  notes_he TEXT DEFAULT '',
  deadline TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS guest_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_id INTEGER NOT NULL,
  segment_id TEXT NOT NULL,
  attending INTEGER DEFAULT 1,
  UNIQUE(guest_id, segment_id)
);

CREATE TABLE IF NOT EXISTS guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  party_id TEXT DEFAULT '',
  first_name TEXT NOT NULL,
  last_name TEXT DEFAULT '',
  desk TEXT DEFAULT '',
  ptype TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  city TEXT DEFAULT '',
  country TEXT DEFAULT '',
  passport_no TEXT DEFAULT '',
  passport_country TEXT DEFAULT '',
  is_israeli INTEGER DEFAULT 0,
  dietary TEXT DEFAULT '',
  dietary_severe INTEGER DEFAULT 0,
  hotel TEXT DEFAULT '',
  room_type TEXT DEFAULT '',
  checkin TEXT DEFAULT '',
  checkout TEXT DEFAULT '',
  accommodation TEXT DEFAULT '',
  accommodation_note TEXT DEFAULT '',
  guest_note TEXT DEFAULT '',
  note_handled INTEGER DEFAULT 0,
  is_lead INTEGER DEFAULT 1,
  needs_review INTEGER DEFAULT 0,
  review_note TEXT DEFAULT '',
  status TEXT DEFAULT 'active',
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS people (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  segment_id  TEXT NOT NULL,
  name        TEXT NOT NULL,
  confirmed   INTEGER DEFAULT 0,
  FOREIGN KEY (segment_id) REFERENCES segments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS run_stops (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id TEXT NOT NULL,
  time TEXT DEFAULT '',
  stop_label TEXT DEFAULT '',
  hotel_match TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0
);

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
  sort_order  INTEGER NOT NULL,
  title_he TEXT DEFAULT '',
  venue_he TEXT DEFAULT '',
  descr_he TEXT DEFAULT '',
  brief_runsheet TEXT DEFAULT '',
  brief_location TEXT DEFAULT '',
  brief_av TEXT DEFAULT '',
  brief_staging TEXT DEFAULT '',
  brief_materials TEXT DEFAULT '',
  brief_catering TEXT DEFAULT '',
  brief_speakers TEXT DEFAULT '',
  content_status TEXT DEFAULT 'draft',
  notes_speaker TEXT DEFAULT '',
  notes_logistics TEXT DEFAULT '',
  descr_long TEXT DEFAULT '',
  descr_long_he TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS team (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  role   TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS timeline (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  due_date    TEXT NOT NULL,
  title       TEXT NOT NULL,
  category    TEXT DEFAULT 'General',
  owner       TEXT DEFAULT '',
  done        INTEGER DEFAULT 0,
  notes       TEXT DEFAULT '',
  seeded      INTEGER DEFAULT 0,
  sort_hint   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS transport_runs (
  id TEXT PRIMARY KEY,
  day INTEGER NOT NULL,
  depart_time TEXT DEFAULT '',
  arrive_time TEXT DEFAULT '',
  title TEXT NOT NULL,
  title_he TEXT DEFAULT '',
  destination TEXT DEFAULT '',
  destination_he TEXT DEFAULT '',
  linked_segment TEXT DEFAULT '',
  vehicles TEXT DEFAULT '',
  capacity TEXT DEFAULT '',
  driver TEXT DEFAULT '',
  driver_phone TEXT DEFAULT '',
  company TEXT DEFAULT '',
  escort TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'no_driver',
  sort_order INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now')),
  pdf_hide INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS venue_contacts (
  venue       TEXT PRIMARY KEY,
  contacts    TEXT DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_check_seg ON checklist(segment_id);
CREATE INDEX IF NOT EXISTS idx_contacts_venue ON contacts(venue);
CREATE INDEX IF NOT EXISTS idx_files_section ON files(section);
CREATE INDEX IF NOT EXISTS idx_files_segment ON files(segment_id);
CREATE INDEX IF NOT EXISTS idx_people_seg ON people(segment_id);
CREATE INDEX IF NOT EXISTS idx_timeline_date ON timeline(due_date);
