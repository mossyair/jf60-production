-- Migration: add Hebrew (bilingual) columns
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-bilingual.sql
-- Safe/idempotent: ADD COLUMN fails harmlessly if already present (run once).

ALTER TABLE segments ADD COLUMN title_he TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN venue_he TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN descr_he TEXT DEFAULT '';
ALTER TABLE checklist ADD COLUMN text_he TEXT DEFAULT '';
