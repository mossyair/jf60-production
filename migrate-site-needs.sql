-- Migration: site needs per venue / session (design, equipment, catering kit) and the podium decision per session.
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-site-needs.sql
-- Data is loaded from the production "needs spec" sheet straight into D1 (it holds supplier phone numbers).
CREATE TABLE IF NOT EXISTS site_needs (
  id TEXT PRIMARY KEY,
  venue TEXT DEFAULT '',
  area TEXT DEFAULT '',          -- where on site (entrance, toilets, hall…)
  item TEXT NOT NULL,
  qty TEXT DEFAULT '',           -- free text: "1", "100 איש", "?"
  supplier TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  segment_ids TEXT DEFAULT '',   -- comma-separated segment ids; empty = general / hotels
  kind TEXT DEFAULT 'need',      -- need | podium
  done INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);
