-- Migration: production timeline (back-office milestones) — v2
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./migrate-timeline.sql
-- Safe/idempotent: creates table if missing; only seeds when empty.

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
CREATE INDEX IF NOT EXISTS idx_timeline_date ON timeline(due_date);

-- Seed only if empty (guarded by a temp marker approach:
-- each INSERT is conditional on the table currently having no seeded rows).
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-08-15','Lock all venue bookings & confirm site access/permits','Venues',1 WHERE NOT EXISTS (SELECT 1 FROM timeline WHERE seeded=1);
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-08-15','Finalize speaker/panelist target list & begin invitations','Speakers',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=1;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-08-22','Confirm keynotes (Hagari, Herzog protocol, Mayor Lion)','Speakers',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=2;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-08-22','Send save-the-dates / invitations to donors','Invitations',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=3;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-08-29','Confirm all panel moderators (currently TBC)','Speakers',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=4;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-08-29','Lock catering vendors for all meals (Ein Yael, Gan Yael, gala, street food)','Catering',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=5;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-05','Curate Field-of-Action organizations (Day 3 market)','Content',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=6;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-05','Confirm 11 Shai Doron leadership-program speakers','Speakers',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=7;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-12','Finalize orchestra + conductor (Tom Cohen/Tahrir) & gala program','Content',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=8;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-12','Lock transport plan between all venues','Logistics',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=9;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-19','Curate artist studios stalls & donor purchase flow (Shipudei Ezra)','Content',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=10;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-19','Finalize RSVPs & headcount for catering/seating','Invitations',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=11;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-26','Design think-tank format & facilitation (Science Museum)','Content',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=12;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-09-26','Collect all speaker bios, headshots & panelist materials','Speakers',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=13;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-03','Finalize AV/tech, sound & staging for each venue','Tech',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=14;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-03','Close budget & confirm all vendor contracts signed','Budget',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=15;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-10','Produce printed run-of-show, signage & name badges','Content',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=16;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-10','Brief all moderators, hosts & on-site production crew','Speakers',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=17;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-16','Final walkthrough of every venue with site contacts','Venues',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=18;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-16','Confirm final guest movements, hotels & VIP logistics','Logistics',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=19;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-19','Load-in, setup & rehearsals; distribute crew contact sheet','Tech',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=20;
INSERT INTO timeline (due_date,title,category,seeded) SELECT '2026-10-20','Conference Day 1 — event begins','General',1 WHERE (SELECT COUNT(*) FROM timeline WHERE seeded=1)=21;
