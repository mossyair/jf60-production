-- 0002 hardening (October 2026). Additive only: new columns and tables, no rows deleted.
-- Apply once with `wrangler d1 migrations apply jf60-db` (Wrangler records it in d1_migrations).

-- Optimistic concurrency: budget sheet and general notes carry a revision number.
ALTER TABLE admin_grid ADD COLUMN rev INTEGER NOT NULL DEFAULT 0;
ALTER TABLE general_notes ADD COLUMN rev INTEGER NOT NULL DEFAULT 0;

-- Document access classification, independent of section, filename or AI type.
--   ops   = editors and admins; field apps only for event-linked content files
--   admin = admins (and chief) only
--   chief = chief key only
-- Existing files: event content, menus and proofs start as 'ops' (that is who sees them today);
-- general files start as 'admin' (conservative). access_reviewed = 0 marks every existing file
-- for an admin to confirm (see README → "Reviewing file access").
ALTER TABLE files ADD COLUMN access TEXT NOT NULL DEFAULT 'admin';
ALTER TABLE files ADD COLUMN access_reviewed INTEGER NOT NULL DEFAULT 0;
UPDATE files SET access = 'ops' WHERE section IN ('content', 'menu', 'proof');
CREATE INDEX IF NOT EXISTS idx_files_access ON files(access);

-- Inbox items inherit the access of their source document.
ALTER TABLE inbox_items ADD COLUMN access TEXT NOT NULL DEFAULT 'admin';
UPDATE inbox_items SET access = COALESCE((SELECT f.access FROM files f WHERE f.id = inbox_items.file_id), 'admin');

-- Stable hotel identifiers. name must match guests.hotel and run_stops.hotel_match exactly.
CREATE TABLE IF NOT EXISTS hotels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0
);
INSERT OR IGNORE INTO hotels (id, name, sort_order) VALUES
  ('mishkenot', 'Mishkenot Sha''ananim', 1),
  ('king-david', 'King David Hotel', 2),
  ('inbal', 'Inbal Hotel', 3),
  ('dan-panorama', 'Dan Panorama', 4);

-- Individual field credentials. Only a SHA-256 hash of each token is stored.
-- person_id links to team.id (the identity). Scope (JSON arrays of ids): hotel_ids for group leaders,
-- run_ids for drivers, segment_ids for crew (all_scope = 1 lets a lead producer/site manager act on every event).
CREATE TABLE IF NOT EXISTS field_credentials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_hash TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('driver', 'leader', 'av', 'crew')),
  person_id INTEGER,
  label TEXT NOT NULL DEFAULT '',
  hotel_ids TEXT NOT NULL DEFAULT '[]',
  run_ids TEXT NOT NULL DEFAULT '[]',
  segment_ids TEXT NOT NULL DEFAULT '[]',
  all_scope INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  revoked_at TEXT DEFAULT ''
);

-- Driver location freshness: the GPS fix time is stored separately from the time the server received it.
ALTER TABLE driver_positions ADD COLUMN fix_at TEXT NOT NULL DEFAULT '';
ALTER TABLE driver_positions ADD COLUMN cred_id INTEGER;

-- Stable registration id for imports (optional; matched before names when present).
ALTER TABLE guests ADD COLUMN reg_id TEXT NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_guests_reg ON guests(reg_id);

-- Proof versions are unique per design item. Renumber any duplicates first (by upload order; no rows removed).
UPDATE design_proofs SET version = (
  SELECT COUNT(*) FROM design_proofs p2 WHERE p2.item_id = design_proofs.item_id AND p2.id <= design_proofs.id
) WHERE item_id IN (SELECT item_id FROM design_proofs GROUP BY item_id, version HAVING COUNT(*) > 1);
CREATE UNIQUE INDEX IF NOT EXISTS idx_proofs_item_version ON design_proofs(item_id, version);

-- Server-side AI quotas (counters per time bucket) and concurrency leases.
CREATE TABLE IF NOT EXISTS ai_usage (
  bucket TEXT PRIMARY KEY,
  n INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS ai_leases (
  id TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL
);

-- Idempotency keys for non-idempotent actions (imports, AI apply, inbox filing).
CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  scope TEXT NOT NULL,
  response TEXT NOT NULL DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);
