-- Migration: day guests, hotel booking fields, staff groups (4.10 registration sheets)
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-day-guests.sql
-- Run ONCE (ALTER TABLE errors harmlessly if the columns already exist).

-- People who come to single sessions without staying at a hotel (session RSVP tabs)
CREATE TABLE IF NOT EXISTS day_guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT DEFAULT '',
  desk TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  sessions TEXT DEFAULT '',   -- comma-separated segment ids
  note TEXT DEFAULT '',
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Hotel booking: confirmation (number or "Sent") and early check-in / late check-out
ALTER TABLE guests ADD COLUMN booking_conf TEXT DEFAULT '';
ALTER TABLE guests ADD COLUMN early_late TEXT DEFAULT '';

-- Staff sheet: Production or Jerusalem Foundation
ALTER TABLE team ADD COLUMN org TEXT DEFAULT 'Production';
