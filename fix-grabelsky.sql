-- Unify the spelling of Arik Grabelsky across the database.
-- Run with: npx wrangler d1 execute jf60-db --remote --file=./fix-grabelsky.sql
-- Safe to run more than once.

-- 1. People entries: normalise every variant to "Arik Grabelsky",
--    preserving any role in brackets, e.g. "(opening)" / "(closing)".
UPDATE people SET name = REPLACE(name, 'Erik Grabelsky',  'Arik Grabelsky') WHERE name LIKE '%Erik Grabelsky%';
UPDATE people SET name = REPLACE(name, 'Arik Gerbelsky',  'Arik Grabelsky') WHERE name LIKE '%Arik Gerbelsky%';
UPDATE people SET name = REPLACE(name, 'Erik Gerbelsky',  'Arik Grabelsky') WHERE name LIKE '%Erik Gerbelsky%';
UPDATE people SET name = REPLACE(name, 'Arik Gravelsky',  'Arik Grabelsky') WHERE name LIKE '%Arik Gravelsky%';
UPDATE people SET name = REPLACE(name, 'Erik Gravelsky',  'Arik Grabelsky') WHERE name LIKE '%Erik Gravelsky%';

-- 2. Event descriptions (English and Hebrew).
UPDATE segments SET descr    = REPLACE(descr,    'Erik Grabelsky', 'Arik Grabelsky') WHERE descr    LIKE '%Erik Grabelsky%';
UPDATE segments SET descr    = REPLACE(descr,    'Arik Gerbelsky', 'Arik Grabelsky') WHERE descr    LIKE '%Arik Gerbelsky%';
UPDATE segments SET descr    = REPLACE(descr,    'Arik Gravelsky', 'Arik Grabelsky') WHERE descr    LIKE '%Arik Gravelsky%';
UPDATE segments SET descr_he = REPLACE(descr_he, 'אריק גרבלסקי',  'אריק גרבלסקי')  WHERE descr_he LIKE '%גרבלסקי%';

-- 3. Any mention inside the content brief fields and notes.
UPDATE segments SET brief_speakers = REPLACE(brief_speakers, 'Erik Grabelsky', 'Arik Grabelsky') WHERE brief_speakers LIKE '%Erik Grabelsky%';
UPDATE segments SET notes          = REPLACE(notes,          'Erik Grabelsky', 'Arik Grabelsky') WHERE notes          LIKE '%Erik Grabelsky%';
UPDATE segments SET notes_speaker  = REPLACE(notes_speaker,  'Erik Grabelsky', 'Arik Grabelsky') WHERE notes_speaker  LIKE '%Erik Grabelsky%';

-- 4. Checklist items.
UPDATE checklist SET text = REPLACE(text, 'Erik Grabelsky', 'Arik Grabelsky') WHERE text LIKE '%Erik Grabelsky%';
UPDATE checklist SET text = REPLACE(text, 'Arik Gerbelsky', 'Arik Grabelsky') WHERE text LIKE '%Arik Gerbelsky%';

-- 5. Remove exact duplicate people rows created by the spelling variants,
--    keeping the lowest id for each name/segment pair.
DELETE FROM people
WHERE id NOT IN (SELECT MIN(id) FROM people GROUP BY segment_id, name);
