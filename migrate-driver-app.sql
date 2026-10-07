-- Migration: driver app fields on each bus run.
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-driver-app.sql
-- Run ONCE (ALTER TABLE errors harmlessly if the columns already exist).
ALTER TABLE transport_runs ADD COLUMN driver_note TEXT DEFAULT '';  -- shown to drivers (the "notes" field stays internal)
ALTER TABLE transport_runs ADD COLUMN dropoff TEXT DEFAULT '';      -- exact drop-off point, in words
ALTER TABLE transport_runs ADD COLUMN dropoff_url TEXT DEFAULT '';  -- map link for the drop-off point
