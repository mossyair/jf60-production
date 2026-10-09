-- Synthetic test data only. Every name, phone, email, passport and price here is invented.
INSERT INTO segments (id, day, time, end_time, title, venue, descr, status, sort_order, title_he, venue_he, notes) VALUES
  ('s1-tour', 1, '09:00', '12:00', 'Garden tour', 'Test Garden', 'Morning walk', 'open', 0, 'סיור בגן', 'גן הבדיקה', 'internal note'),
  ('s1-dinner', 1, '19:00', '23:30', 'Opening dinner', 'Test Theater', 'Dinner', 'progress', 1, 'ארוחת פתיחה', 'תיאטרון הבדיקה', ''),
  ('s1-night', 1, '23:45', '01:30', 'Night gathering', 'Test Hotel A', '', 'open', 2, 'מפגש לילה', 'מלון א', ''),
  ('s2-panel', 2, '10:00', '12:00', 'Panel', 'Test Theater', '', 'confirmed', 0, 'פאנל', 'תיאטרון הבדיקה', '');
INSERT INTO team (id, name, role, org, phone) VALUES
  (1, 'Lea Leader', 'Hotel group leader', 'Production', '+972-50-000-0001'),
  (2, 'Sam Site', 'Site manager', 'Production', '+972-50-000-0002'),
  (3, 'Pat Producer', 'Lead producer', 'Production', '+972-50-000-0003'),
  (4, 'Other Leader', 'Hotel group leader', 'Production', '+972-50-000-0004');
UPDATE hotels SET name = 'Test Hotel A' WHERE id = 'mishkenot';
UPDATE hotels SET name = 'Test Hotel B' WHERE id = 'king-david';
INSERT INTO guests (id, first_name, last_name, email, phone, passport_no, hotel, checkin, checkout, status, reg_id) VALUES
  (1, 'Ada', 'Alpha', 'ada@example.test', '+1-555-0101', 'P0000001', 'Test Hotel A', '2026-10-19', '2026-10-22', 'active', 'R-1'),
  (2, 'Bo', 'Beta', 'bo@example.test', '+1-555-0102', 'P0000002', 'Test Hotel A', '2026-10-21', '2026-10-22', 'active', 'R-2'),
  (3, 'Cy', 'Gamma', 'cy@example.test', '', '', 'Test Hotel B', '2026-10-19', '2026-10-22', 'active', 'R-3'),
  (4, 'José', 'Núñez', '', '', '', 'Test Hotel A', '2026-10-19', '2026-10-22', 'active', ''),
  (5, 'Dana', 'Cancelled', '', '', '', 'Test Hotel A', '2026-10-19', '2026-10-22', 'cancelled', 'R-5');
INSERT INTO guest_sessions (guest_id, segment_id, attending) VALUES (1, 's1-dinner', 1), (2, 's1-dinner', 1), (5, 's1-dinner', 1);
INSERT INTO transport_runs (id, day, depart_time, arrive_time, title, destination, status, sort_order, pdf_hide, driver, driver_phone) VALUES
  ('r1', 1, '08:30', '09:00', 'Hotels to garden', 'Test Garden', 'to_confirm', 0, 0, 'Dov Driver', '+972-50-000-0009'),
  ('r2', 1, '18:30', '19:00', 'Hotels to dinner', 'Test Theater', 'no_driver', 1, 0, '', ''),
  ('r-hidden', 1, '07:00', '07:30', 'Internal staff shuttle', 'Test Theater', 'booked', 2, 1, '', '');
INSERT INTO run_stops (run_id, time, stop_label, hotel_match, sort_order) VALUES
  ('r1', '08:30', 'Hotel A lobby', 'Test Hotel A', 0), ('r1', '08:40', 'Hotel B lobby', 'Test Hotel B', 1),
  ('r2', '18:30', 'Hotel B lobby', 'Test Hotel B', 0), ('r-hidden', '07:00', 'Staff gate', '', 0);
INSERT INTO crew_shifts (id, day, start_min, end_min, title, site, kind, crew_json, note) VALUES
  ('sh1', '20', 480, 600, 'Garden setup', 'Test Garden', 'setup', '[{"n":"Sam Site"}]', ''),
  ('sh2', '20', 1080, 1200, 'Theater sound check', 'Test Theater', 'setup', '[{"n":"Pat Producer"}]', 'sound');
INSERT INTO site_needs (id, venue, item, qty, supplier, segment_ids, kind) VALUES
  ('n1', 'Test Garden', 'Water bottles', '100', 'Test Catering', 's1-tour', 'need'),
  ('n2', 'Test Theater', 'Stage mic', '2', 'Shuster', 's1-dinner', 'need'),
  ('n3', 'Test Theater', 'Chairs', '50', 'Test Rentals', 's2-panel', 'need');
INSERT INTO food_items (id, segment_id, day, time, title, venue, meal_type, status) VALUES
  ('f1', 's1-dinner', 1, '19:00', 'Dinner', 'Test Theater', 'dinner', 'open');
INSERT INTO design_items (id, title, category, status, sort_order) VALUES ('d1', 'Badge', 'badge', 'in_design', 0);
INSERT INTO talent_items (id, title, stage, fee) VALUES ('t1', 'Test Band', 'quote', 1000);
INSERT INTO catering_quotes (food_id, supplier, menu, price) VALUES ('f1', 'Test Caterer', 'Test menu', '100');
INSERT INTO contacts (name, phone, role, venue) VALUES ('Vera Venue', '+972-2-000-0000', 'מנהלת אתר', 'Test Theater');
INSERT INTO files (id, r2_key, filename, content_type, size, section, segment_id, access) VALUES
  (1, 'test/content-1.pdf', 'run-sheet.pdf', 'application/pdf', 10, 'content', 's1-dinner', 'ops'),
  (2, 'test/general-2.pdf', 'contract.pdf', 'application/pdf', 10, 'general', NULL, 'admin'),
  (3, 'test/general-3.xlsx', 'budget.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 10, 'general', NULL, 'chief'),
  (4, 'test/content-4.pdf', 'panel-slides.pdf', 'application/pdf', 10, 'content', 's2-panel', 'ops'),
  (5, 'test/content-5.html', 'evil.html', 'text/html', 10, 'content', 's1-dinner', 'ops');
INSERT INTO inbox_items (id, file_id, name, ext, state, type, summary, access) VALUES
  (1, 2, 'contract.pdf', 'pdf', 'review', 'contract', 'A contract', 'admin'),
  (2, 1, 'run-sheet.pdf', 'pdf', 'review', 'runsheet', 'A run sheet', 'ops');
UPDATE admin_grid SET columns = '["Item","Cost"]', rows = '[["Stage","100"],["Sound","200"]]' WHERE id = 1;
UPDATE general_notes SET body = '<b>hello</b>' WHERE id = 1;
