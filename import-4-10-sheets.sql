-- Data from the 4.10 registration master and name-tag sheets.
-- Run after migrate-day-guests.sql. Safe to re-run: every insert is guarded.

-- Staff sheet: Jerusalem Foundation staff and board (name-tag sheet, "Israel Staff" and "Israel Board of Directors")
INSERT INTO team (name, role, org) SELECT 'Imry Ben Ami', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Imry Ben Ami'));
INSERT INTO team (name, role, org) SELECT 'Arik Grebelsky', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Arik Grebelsky'));
INSERT INTO team (name, role, org) SELECT 'Eden Adika', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Eden Adika'));
INSERT INTO team (name, role, org) SELECT 'Nomi Yeshua', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Nomi Yeshua'));
INSERT INTO team (name, role, org) SELECT 'Michal Ben Shlush', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Michal Ben Shlush'));
INSERT INTO team (name, role, org) SELECT 'Roi Singer', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Roi Singer'));
INSERT INTO team (name, role, org) SELECT 'Sagit Avitan', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Sagit Avitan'));
INSERT INTO team (name, role, org) SELECT 'Margarita Spichko Schein', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Margarita Spichko Schein'));
INSERT INTO team (name, role, org) SELECT 'Jana Vilensky', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Jana Vilensky'));
INSERT INTO team (name, role, org) SELECT 'Sarah Gila', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Sarah Gila'));
INSERT INTO team (name, role, org) SELECT 'Sarah Hogarth', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Sarah Hogarth'));
INSERT INTO team (name, role, org) SELECT 'Meron Guttel', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Meron Guttel'));
INSERT INTO team (name, role, org) SELECT 'Yael Scher', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Yael Scher'));
INSERT INTO team (name, role, org) SELECT 'Gaia Piperno', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Gaia Piperno'));
INSERT INTO team (name, role, org) SELECT 'Atara Yogev', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Atara Yogev'));
INSERT INTO team (name, role, org) SELECT 'Miriam Chalik', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Miriam Chalik'));
INSERT INTO team (name, role, org) SELECT 'Elsa Benichou', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Elsa Benichou'));
INSERT INTO team (name, role, org) SELECT 'David Ronen', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('David Ronen'));
INSERT INTO team (name, role, org) SELECT 'Niv Moraly', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Niv Moraly'));
INSERT INTO team (name, role, org) SELECT 'Mira Mahfouz', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Mira Mahfouz'));
INSERT INTO team (name, role, org) SELECT 'Tali Federman', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Tali Federman'));
INSERT INTO team (name, role, org) SELECT 'Hillie Wurtman Moyal', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Hillie Wurtman Moyal'));
INSERT INTO team (name, role, org) SELECT 'Naama Cohen Goldenberg', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Naama Cohen Goldenberg'));
INSERT INTO team (name, role, org) SELECT 'Sarah Baras', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Sarah Baras'));
INSERT INTO team (name, role, org) SELECT 'Shelly Tal', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Shelly Tal'));
INSERT INTO team (name, role, org) SELECT 'Sapir Eliyahu', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Sapir Eliyahu'));
INSERT INTO team (name, role, org) SELECT 'Eyal Lahav', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Eyal Lahav'));
INSERT INTO team (name, role, org) SELECT 'Alexa Neville', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Alexa Neville'));
INSERT INTO team (name, role, org) SELECT 'Esti Kremersky', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Esti Kremersky'));
INSERT INTO team (name, role, org) SELECT 'Bar Shimon', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Bar Shimon'));
INSERT INTO team (name, role, org) SELECT 'Chaya Derri', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Chaya Derri'));
INSERT INTO team (name, role, org) SELECT 'Nirel Ben Yeshar', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Nirel Ben Yeshar'));
INSERT INTO team (name, role, org) SELECT 'Adi Hadad Kablo', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Adi Hadad Kablo'));
INSERT INTO team (name, role, org) SELECT 'Kenny Borsykowsky', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Kenny Borsykowsky'));
INSERT INTO team (name, role, org) SELECT 'Rina Antar', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Rina Antar'));
INSERT INTO team (name, role, org) SELECT 'Shira Maslati', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Shira Maslati'));
INSERT INTO team (name, role, org) SELECT 'Shani Wurmbrand', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Shani Wurmbrand'));
INSERT INTO team (name, role, org) SELECT 'Tehila Alexander', 'Staff', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Tehila Alexander'));
INSERT INTO team (name, role, org) SELECT 'Ronit Abramson', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Ronit Abramson'));
INSERT INTO team (name, role, org) SELECT 'Zvi Agmon', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Zvi Agmon'));
INSERT INTO team (name, role, org) SELECT 'Yoram Belizovsky', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Yoram Belizovsky'));
INSERT INTO team (name, role, org) SELECT 'Tamar Ben-David', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Tamar Ben-David'));
INSERT INTO team (name, role, org) SELECT 'Ruth Cheshin', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Ruth Cheshin'));
INSERT INTO team (name, role, org) SELECT 'Prof. David Gliksberg', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Prof. David Gliksberg'));
INSERT INTO team (name, role, org) SELECT 'Stuart Hershkowitz', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Stuart Hershkowitz'));
INSERT INTO team (name, role, org) SELECT 'Gary Leibler', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Gary Leibler'));
INSERT INTO team (name, role, org) SELECT 'Dan Suesskind', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Dan Suesskind'));
INSERT INTO team (name, role, org) SELECT 'Ran Tuttnauer', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Ran Tuttnauer'));
INSERT INTO team (name, role, org) SELECT 'Moshe Vidman', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Moshe Vidman'));
INSERT INTO team (name, role, org) SELECT 'Alan Berkley', 'Board of directors', 'Jerusalem Foundation' WHERE NOT EXISTS (SELECT 1 FROM team WHERE lower(name)=lower('Alan Berkley'));

-- Hotel booking: confirmations marked "Sent" on the hotel tabs
UPDATE guests SET booking_conf='Sent', updated_at=datetime('now') WHERE booking_conf='' AND id IN (19,25,26,23,24,20,32,33,63,64,84,72,73);

-- Early check-in / late check-out
UPDATE guests SET early_late='Early check-in requested', updated_at=datetime('now') WHERE early_late='' AND id IN (46,47,48);
UPDATE guests SET early_late='Late check-out', updated_at=datetime('now') WHERE early_late='' AND id=37;

-- Day guests from the session RSVP tabs (emails added separately)
INSERT INTO day_guests (first_name, last_name, desk, sessions, note) SELECT 'Sharon', 'Moncarz', 'Canada', 'd1-opening,d2-leadership', '' WHERE NOT EXISTS (SELECT 1 FROM day_guests WHERE lower(first_name)=lower('Sharon') AND lower(last_name)=lower('Moncarz'));
INSERT INTO day_guests (first_name, last_name, desk, sessions, note) SELECT 'Victor', 'Moncarz', 'Canada', 'd1-opening,d2-leadership', '' WHERE NOT EXISTS (SELECT 1 FROM day_guests WHERE lower(first_name)=lower('Victor') AND lower(last_name)=lower('Moncarz'));
INSERT INTO day_guests (first_name, last_name, desk, sessions, note) SELECT 'Millicent', 'Cohen', '', 'd1-opening', 'c/o Jonny Manson' WHERE NOT EXISTS (SELECT 1 FROM day_guests WHERE lower(first_name)=lower('Millicent') AND lower(last_name)=lower('Cohen'));
INSERT INTO day_guests (first_name, last_name, desk, sessions, note) SELECT 'Ronit', 'Abramson', 'Israel', 'd1-plenary,d3-gala', 'Jerusalem Foundation board' WHERE NOT EXISTS (SELECT 1 FROM day_guests WHERE lower(first_name)=lower('Ronit') AND lower(last_name)=lower('Abramson'));
