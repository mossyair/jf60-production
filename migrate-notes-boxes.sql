-- Migration: per-event speaker notes + logistics notes
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-notes-boxes.sql
-- Run ONCE (ALTER TABLE errors harmlessly if the columns already exist).

ALTER TABLE segments ADD COLUMN notes_speaker TEXT DEFAULT '';
ALTER TABLE segments ADD COLUMN notes_logistics TEXT DEFAULT '';
