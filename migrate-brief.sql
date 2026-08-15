-- Migration: content brief fields + task assignment + team members
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-brief.sql
-- Run ONCE (ALTER TABLE errors harmlessly if columns already exist).

-- Content brief fields on each event
ALTER TABLE segments ADD COLUMN brief_runsheet TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN brief_location TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN brief_av TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN brief_staging TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN brief_materials TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN brief_catering TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN brief_speakers TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN content_status TEXT DEFAULT 'draft';

-- Task assignment
ALTER TABLE checklist ADD COLUMN owner TEXT DEFAULT '';
-- timeline already has an `owner` column from the timeline migration.

-- Team members list
CREATE TABLE IF NOT EXISTS team (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  role   TEXT DEFAULT ''
);
