-- Starting data for the crew schedule, talent & contracts and the production team,
-- copied from the Control Room prototype (typed in from the production sheet).
-- Safe to re-run: existing rows are left alone.

INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o0', '19', 480, 1080, 'Furniture & design install', 'Mishkenot Sha’ananim', 'setup', '[{"n":"Hagai","r":"Site manager"},{"n":"Designer","r":"Design"}]', '', '', 0, 0);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o1', '20', 420, 660, 'Crew arrival · coffee station · sound check', 'Mishkenot Sha’ananim', 'setup', '[{"n":"Hagai","r":"Site manager"},{"n":"Natali","r":"Site manager"},{"n":"1","r":"runner"}]', '', '', 0, 1);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o2', '20', 480, 510, 'Hotel pickups', 'Hotels (4)', 'move', '[{"n":"3","r":"escorts"}]', '', 'Each vehicle: cooler with ice, water, soda.', 0, 2);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o3', '20', 510, 550, 'Registration desk for walk-ins', 'Mishkenot Sha’ananim', 'guest', '[{"n":"2","r":"ushers"}]', 'Desk location not decided', '', 0, 3);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o4', '20', 585, 630, 'Advance vehicle · sound setup, restrooms check', 'Botanical Garden', 'setup', '[{"n":"Uri","r":"Site manager"},{"n":"Natali","r":"Site manager"},{"n":"Schuster","r":"AV"}]', '', '', 0, 4);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o5', '20', 585, 600, 'Board the double-decker', 'Mishkenot Sha’ananim', 'move', '[{"n":"4","r":"escorts"}]', 'Can the bus stand at Mishkenot?', '', 0, 5);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o6', '20', 630, 660, 'Show (15 min) + tour', 'Botanical Garden', 'guest', '[{"n":"Uri","r":"Site manager"},{"n":"1","r":"runner"}]', '', '', 0, 6);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o7', '20', 630, 750, 'Tables, furniture, signage', 'Ein Yael', 'setup', '[{"n":"Kosta","r":"Site manager"},{"n":"Natali","r":"Site manager"},{"n":"1","r":"crew"}]', '', '', 0, 7);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o8', '20', 675, 735, 'Show (15 min) + tour', 'Gazelle Valley', 'guest', '[{"n":"Hagai","r":"Site manager"},{"n":"1","r":"runner"}]', '', '', 0, 8);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o9', '20', 765, 840, 'Lunch + show', 'Ein Yael', 'guest', '[{"n":"?","r":"Site manager"},{"n":"1","r":"runner"}]', 'Plan B needed · site manager unconfirmed', '', 0, 9);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o10', '20', 870, 990, 'Panel · Jerusalem women leaders', 'Train Theater', 'guest', '[{"n":"Uri","r":"Site manager"},{"n":"1","r":"runner"}]', '', '', 0, 10);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o11', '20', 1140, 1320, 'Opening evening', 'Jerusalem Theater', 'guest', '[{"n":"Hagai","r":"Site manager"},{"n":"2","r":"runners"}]', '', '', 0, 11);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o12', '21', 420, 540, 'Round tables setup', 'Mishkenot Sha’ananim', 'setup', '[{"n":"Hagai","r":"Site manager"},{"n":"2","r":"runners"},{"n":"4","r":"table heads"}]', '', '', 0, 12);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o13', '21', 540, 840, 'Morning program', 'Gan Yael', 'guest', '[{"n":"?","r":"Site manager"}]', 'Site manager unconfirmed', '', 0, 13);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o14', '21', 600, 780, 'Setup for tomorrow', 'Cinematheque', 'setup', '[{"n":"Hagai","r":"Site manager"}]', '', '', 0, 14);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o15', '21', 870, 1020, 'Visit', 'Beit Hanina', 'guest', '[{"n":"Uri","r":"Site manager"},{"n":"1","r":"runner"}]', '', '', 0, 15);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o16', '21', 900, 1320, 'Evening venue', 'HaMiffal', 'setup', '[{"n":"Hagai","r":"Site manager"},{"n":"2","r":"runners"}]', '', '', 0, 16);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o17', '21', 1380, 1740, 'Overnight build #1', 'Tower of David', 'setup', '[{"n":"?","r":"Build lead"}]', 'Setup & strike lead not named', '', 0, 17);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o18', '22', 420, 720, 'Build #2 · engineer sign-off', 'Tower of David', 'setup', '[{"n":"Uri","r":"Site manager"},{"n":"2","r":"runners"}]', '', '', 0, 18);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o19', '22', 570, 750, 'Main gathering + organizations fair', 'Cinematheque', 'guest', '[{"n":"Hagai","r":"Site manager"},{"n":"Yarden","r":"Site manager"},{"n":"2","r":"runners"}]', '', '', 0, 19);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o20', '22', 900, 1050, 'TED-style build', 'Science Museum', 'guest', '[{"n":"?","r":"Site manager"},{"n":"1","r":"runner"}]', 'Site manager unconfirmed', '', 0, 20);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o21', '22', 1080, 1440, 'Gala evening', 'Tower of David', 'guest', '[{"n":"Uri","r":"Site manager"},{"n":"3","r":"runners"}]', '', '', 0, 21);
INSERT OR IGNORE INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done, sort_order) VALUES ('o22', '22', 1410, 1740, 'Overnight strike', 'Tower of David', 'strike', '[{"n":"?","r":"Build lead"}]', 'Strike lead not named', '', 0, 22);

INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t0', 'Panel host · Train Theater', 'quote', 8000, 0);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t1', 'Performance + workshop · Jerusalem Theater', 'contacted', 28000, 1);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t2', 'Keynote speaker · Jerusalem Theater', 'quote', 25000, 2);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t3', 'Yoga · day 2', 'contacted', 400, 3);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t4', 'Run tour · day 2', 'contacted', 2000, 4);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t5', 'Round-table keynote', 'contacted', 3000, 5);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t6', 'Arabic lesson for donors', 'contacted', 600, 6);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t7', 'Yoga · day 3', 'contacted', 400, 7);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t8', 'British Trail run', 'contacted', 2000, 8);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t9', 'TED-style build · Science Museum', 'quote', NULL, 9);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t10', 'Main performance · gala', 'quote', NULL, 10);
INSERT OR IGNORE INTO talent_items (id, title, stage, fee, sort_order) VALUES ('t11', 'Additional booking', 'contacted', NULL, 11);

-- team: only when it is still empty
INSERT INTO team (name, role) SELECT 'Hagai', 'Sound · site manager' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Hagai');
INSERT INTO team (name, role) SELECT 'Uri', 'Transport · Tower of David' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Uri');
INSERT INTO team (name, role) SELECT 'Natali', 'Furniture' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Natali');
INSERT INTO team (name, role) SELECT 'Carmi', 'Food' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Carmi');
INSERT INTO team (name, role) SELECT 'Moss', 'Food · producer' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Moss');
INSERT INTO team (name, role) SELECT 'Yair', 'Design & print' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Yair');
INSERT INTO team (name, role) SELECT 'Kosta', 'Site manager · Ein Yael' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Kosta');
INSERT INTO team (name, role) SELECT 'Yarden', 'Site manager · Cinematheque' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Yarden');
INSERT INTO team (name, role) SELECT 'Elnatan', 'Site manager · unconfirmed' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Elnatan');
INSERT INTO team (name, role) SELECT 'Yaara', 'Hotel group leader · Mishkenot Sha’ananim' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Yaara');
INSERT INTO team (name, role) SELECT 'Maichuk', 'Hotel group leader · King David' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Maichuk');
INSERT INTO team (name, role) SELECT 'Tali Sasson', 'Hotel group leader · Inbal' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Tali Sasson');
INSERT INTO team (name, role) SELECT 'Si Agai', 'Hotel group leader · Dan Panorama' WHERE NOT EXISTS (SELECT 1 FROM team WHERE name = 'Si Agai');
