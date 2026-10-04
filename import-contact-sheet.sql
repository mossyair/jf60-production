-- Contact sheet (דף קשר 60 שנה לקרן, 4.10): speakers, Foundation, suppliers, venue and technical contacts.
-- Insert-only: skips anyone already in contacts with the same name and phone.
INSERT INTO contacts (name, phone, role, email, notes, venue, created_by)
SELECT * FROM (VALUES
('Daniella Zeltser','058-515-9555','דוברים · תכנית מנהיגות','Daniella@foodrescuers.org.il','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Daoud Alian','052-899-7000','דוברים · תכנית מנהיגות','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Fadi Dukaidek','054-630-2816','דוברים · תכנית מנהיגות','Fadid@mda.org.il, Dekaidek@gmail.com','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Keren Applebaum-Reef','052-293-0284','דוברים · תכנית מנהיגות','kerenapl@gmail.com','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Meirav Maor','054-427-0745','דוברים · תכנית מנהיגות','Merav@mots.org.il','יום 1 · פאנל אחר הצהריים (תאטרון הקרון)','','contact sheet 4.10'),
('Meredith Rothbart','054-592-2773','דוברים · תכנית מנהיגות','Meredith@amal-tikva.org','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Mishy Harman','050-632-0445','דוברים · תכנית מנהיגות','mishyharman@gmail.com','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Mohmoud Thaher','054-731-2893','דוברים · תכנית מנהיגות','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Neta Meisels','054-555-2176','דוברים · תכנית מנהיגות','neta.meisels@gmail.com','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Uri Tzadok','054-692-6204','דוברים · תכנית מנהיגות','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Yehuda Cohen','052-386-5118','דוברים · תכנית מנהיגות','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('Yaffa Buso','','דוברים · תכנית מנהיגות','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים) · חסרים פרטי קשר','','contact sheet 4.10'),
('Sharon Abramovich Yardeni','050-628-3811','דוברים · מנכ״לית תאטרון ירושלים','Sharon@jer-theatre.co.il','יום 1 · פאנל אחר הצהריים (תאטרון הקרון)','','contact sheet 4.10'),
('Sigalit Hertz','050-666-1855','דוברים · גן החיות','Sigalit@jerusalemzoo.org.il','יום 1 · פאנל אחר הצהריים (תאטרון הקרון) · מזכירה: אורלי 02-675-0120','','contact sheet 4.10'),
('Itay Mautner','052-433-9999','דוברים · מנחה','','יום 1 · פאנל אחר הצהריים (תאטרון הקרון)','','contact sheet 4.10'),
('Gilad Sevitt','050-731-2698','דוברים · שיעור ערבית','','יום 2 · בית חנינא','','contact sheet 4.10'),
('Sarit Zussman','050-710-8114','דוברים · נואמת מרכזית','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים) · בפרטי המפגש רשומה כ-Zussman family','','contact sheet 4.10'),
('עמיר בלבן','052-386-9454','דוברים · מנחה בעמק הצבאים','','יום 1 · סיור אתרי הטבע','Gazelle Valley','contact sheet 4.10'),
('חנה רנדל','054-654-6811','דוברים · מנחה בגן הבוטני','','יום 1 · סיור אתרי הטבע','Botanical Gardens','contact sheet 4.10'),
('דני בר גיורא','050-351-5191','דוברים · עין יעל','','יום 1 · ארוחת הצהריים בעין יעל','Ein Yael','contact sheet 4.10'),
('איתן','','מנכ״ל עין יעל','','יום 1 · סיור אתרי הטבע · חסרים פרטי קשר','Ein Yael','contact sheet 4.10'),
('יואב רוטשילד','054-482-8362','צוות הקרן · מנהל תוכנית המנהיגות ע״ש שי דורון','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים)','','contact sheet 4.10'),
('ניב מורלי','','צוות הקרן','niv@jfjlm.org','מרכזת את רשימת הארגונים ליריד · חסר טלפון','','contact sheet 4.10'),
('נעמי','','צוות הקרן','','חסרים פרטי קשר','','contact sheet 4.10'),
('יעל גודמן','052-837-2333','ספקים · מסלול ריצה — איסוף ופיזור מהמלונות','','יום 2 · יוגה או ריצה','','contact sheet 4.10'),
('ליאור שוהם','','ספקים · סדנת הכנה למשתתפי תוכנית המנהיגות','','יום 2 · תכנית המנהיגות ע״ש שי דורון (משכנות שאננים) · חסרים פרטי קשר','','contact sheet 4.10'),
('מאיה רימר','','ספקים · מעבירה את הסדנה במוזיאון המדע','','יום 3 · חשיבה משותפת · חסרים פרטי קשר · ממתין להחלטה','','contact sheet 4.10'),
('ריטה','052-458-1777','איש קשר באתר','','','Mishkenot Sha''ananim','contact sheet 4.10'),
('בני גורן','050-332-2290','איש קשר טכני · מנהל אחזקה','','','Mishkenot Sha''ananim','contact sheet 4.10'),
('ענבל','052-478-5538','איש קשר באתר','','','Botanical Gardens','contact sheet 4.10'),
('מאיר ועקנין','054-635-3020','איש קשר טכני','','','Botanical Gardens','contact sheet 4.10'),
('אמנדה לינד','052-368-9676','איש קשר באתר · מנהלת','','','Gazelle Valley','contact sheet 4.10'),
('ענבל (מרכז התצפיות)','054-773-4950','איש קשר טכני · מנהלת מרכז התצפיות','','הכי קרובה לאיש טכני במקום','Gazelle Valley','contact sheet 4.10'),
('ינאי','052-799-6917','איש קשר באתר וטכני · מנהל אתר עין יעל','','','Ein Yael','contact sheet 4.10'),
('ואסים אלחאג׳','052-420-2840','איש קשר באתר · מנכ״ל מתחם בית חנינא','','גם דובר בביקור ביום 2','Beit Hanina Sports Complex','contact sheet 4.10'),
('פאדי','054-528-1976','איש קשר טכני','','','Beit Hanina Sports Complex','contact sheet 4.10'),
('דורון גליה-קינד','052-959-7212','איש קשר באתר','','','HaMiffal','contact sheet 4.10'),
('עמרי רותם','058-455-4548','איש קשר טכני · מנהל טכני המפעל','','','HaMiffal','contact sheet 4.10'),
('קרול','054-592-3880','איש קשר באתר','','','Cinematheque Jerusalem','contact sheet 4.10'),
('שכי','054-451-7484','איש קשר טכני · מנהל התפעול','','','Cinematheque Jerusalem','contact sheet 4.10'),
('אתי ברינד','050-623-4865','איש קשר באתר · אחראית אירועים','','','Science Museum','contact sheet 4.10'),
('סאמר','050-909-0512','איש קשר טכני','','','Science Museum','contact sheet 4.10'),
('עינת אשדות','054-311-9018','איש קשר באתר','','','Tower of David','contact sheet 4.10'),
('עמאר','054-628-5753','איש קשר טכני','','','Tower of David','contact sheet 4.10')
) v WHERE NOT EXISTS (SELECT 1 FROM contacts c WHERE c.name = v.column1 AND c.phone = v.column2);
-- Podium notes per venue (venue notes). Appends once; never overwrites.
INSERT INTO venue_contacts (venue, contacts) VALUES ('Mishkenot Sha''ananim', 'פודיום: יש פודיום אבל גדול מאוד · עדיף להביא את הפודיום של הקרן לירושלים') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
INSERT INTO venue_contacts (venue, contacts) VALUES ('Botanical Gardens · Gazelle Valley · Ein Yael', 'פודיום · גן בוטני: לא ידוע (??)
פודיום · עמק הצבאים: יש פודיום והגברה, 90×80
פודיום · עין יעל: אין פודיום') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
INSERT INTO venue_contacts (venue, contacts) VALUES ('Ein Yael', 'פודיום: אין פודיום') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
INSERT INTO venue_contacts (venue, contacts) VALUES ('Beit Hanina Sports Complex', 'פודיום: לא ידוע (??) · במפרט הריהוט הוזמן דוכן נואמים שקוף') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
INSERT INTO venue_contacts (venue, contacts) VALUES ('HaMiffal', 'פודיום: אין פודיום') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
INSERT INTO venue_contacts (venue, contacts) VALUES ('Cinematheque Jerusalem', 'פודיום: קיים, 49.5×94 ס״מ') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
INSERT INTO venue_contacts (venue, contacts) VALUES ('Science Museum', 'פודיום: יש פודיום, אי אפשר להדביק עליו (באודיטוריום זה מגנט) · המשך ההערה חתוך בקובץ') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
INSERT INTO venue_contacts (venue, contacts) VALUES ('Tower of David', 'פודיום: קיים, 110×60×35') ON CONFLICT(venue) DO UPDATE SET contacts = CASE WHEN instr(contacts, 'פודיום')=0 THEN TRIM(contacts || char(10) || excluded.contacts, char(10)) ELSE contacts END;
