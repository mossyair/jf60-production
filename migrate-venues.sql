-- Migration: add venue contacts (free-text, keyed by venue name)
-- Safe to run on the live DB; does not touch existing tables.
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-venues.sql

CREATE TABLE IF NOT EXISTS venue_contacts (
  venue       TEXT PRIMARY KEY,
  contacts    TEXT DEFAULT ''
);
