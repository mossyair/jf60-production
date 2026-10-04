-- Migration: catering quotes (price comparison per meal). Admin only, like the budget.
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-catering-quotes.sql
CREATE TABLE IF NOT EXISTS catering_quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  food_id TEXT DEFAULT '',     -- food_items.id, empty when the quote is not tied to one meal
  supplier TEXT NOT NULL,
  menu TEXT DEFAULT '',
  price TEXT DEFAULT '',
  linens TEXT DEFAULT '',
  dishes TEXT DEFAULT '',
  note TEXT DEFAULT '',
  chosen INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);
