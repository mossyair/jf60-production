-- Load bilingual content (matched by English text)

UPDATE segments SET title='Welcome', title_he='קבלת פנים', venue='Mishkenot Sha''ananim', venue_he='משכנות שאננים', descr='', descr_he='' WHERE title LIKE '%Welcome%';
UPDATE segments SET title='Morning guided tours', title_he='סיורי בוקר מודרכים', venue='Emek HaTzvaim · Botanical Garden · Ein Yael', venue_he='עמק הצבאים · הגן הבוטני · עין יעל', descr='Double-decker bus tour of Jerusalem, with short visits to the Botanical Garden, Emek HaTzvaim (Gazelle Valley), ending at Ein Yael.

Planned schedule:
* 10:05 Depart Mishkenot Sha''ananim
* 10:20 Arrive Botanical Garden, visit with Hanna Rendel
* 11:00 Depart for Emek HaTzvaim
* 11:15 Arrive Emek HaTzvaim, visit with Amir Balaban
* 11:45 Depart for Ein Yael
* 11:55 Arrive Ein Yael, walk to resilience center, meeting with Dani Bar Gyora
* 12:30 Arrive at lunch', descr_he='סיור אוטובוס דו-קומתי בירושלים, ביקורים קצרים בגן הבוטני, בעמק הצבאים וסיום בעין יעל.

לו"ז מתוכנן:
* 10:05 יציאה ממשכנות שאננים
* 10:20 הגעה לגן הבוטני וסיור עם חנה רנדל; הסבר קצר
* 11:00 יציאה מהגן הבוטני לעמק הצבאים
* 11:15 הגעה לעמק הצבאים, סיור עם עמיר בלבן
* 11:45 יציאה מעמק הצבאים לעין יעל
* 11:55 הגעה לעין יעל, הליכה למרכז החוסן, פגישה עם דני בר גיורא
* 12:30 הגעה לארוחת הצהריים' WHERE title LIKE '%Morning guided tours%';
UPDATE segments SET title='Lunch at Ein Yael', title_he='ארוחת צהריים בעין יעל', venue='Ein Yael', venue_he='עין יעל', descr='Group lunch on site.', descr_he='ארוחת צהריים קבוצתית במקום.' WHERE title LIKE '%Lunch at Ein Yael%';
UPDATE segments SET title='Afternoon plenary — Jerusalem''s rich past', title_he='פאנל אחר הצהריים — העבר העשיר של ירושלים', venue='Train Theater', venue_he='תאטרון הקרון', descr='Opening remarks by Arik Grabelsky. 75-min panel on successful Jerusalem institutions — their work and journey from the start (with images). Moderated by Itay Mautner.

A conversation between four Jerusalem-based cultural institution leaders.', descr_he='דברי פתיחה של אריק גרבלסקי. פאנל בן 75 דקות על מוסדות ירושלמיים מצליחים — פועלם ומסעם מההתחלה (עם תמונות). מנחה: איתי מאוטנר.

שיחה בין ארבעה ראשי מוסדות תרבות ירושלמיים.' WHERE title LIKE '%Afternoon plenary%';
UPDATE segments SET title='Hotel break', title_he='הפסקה במלון', venue='Hotels', venue_he='מלונות', descr='Free / organizing time at hotels.', descr_he='זמן חופשי / התארגנות במלונות.' WHERE title LIKE '%Hotel settle-in time%' AND day=1;
UPDATE segments SET title='Opening event + show + chef dinner + keynote', title_he='אירוע פתיחה + מופע + ארוחת שף + נאום מרכזי', venue='Jerusalem Theatre', venue_he='תיאטרון ירושלים', descr='Opening ceremony with Mayumana, chef''s dinner, and central speaker (Daniel Hagari).

MAYUMANA INTERACTIVE!
Mayumana presents unique content combining beloved classic pieces to engage the audience. In an energetic session, the audience becomes an active participant, discovering the power of teamwork and how the whole is greater than the sum of its parts.', descr_he='טקס פתיחה עם מיומנה, ארוחת שף, ודובר מרכזי (דניאל הגרי).

מיומנה אינטראקטיב!
מיומנה מציגה תוכן ייחודי המשלב קטעים קלאסיים ואהובים להפעלת הקהל בהשראתם. במפגש אנרגטי הקהל יהפוך להיות משתתף פעיל, יגלה את עוצמתה של עבודת צוות וכיצד השלם גדול מסך חלקיו.' WHERE title LIKE '%Opening event%';
UPDATE segments SET title='Night gathering at Mishkenot Sha''ananim', title_he='מפגש לילה במשכנות שאננים', venue='Mishkenot Sha''ananim', venue_he='משכנות שאננים', descr='Whisky and music — relaxed networking under the open sky.', descr_he='ויסקי ומוזיקה — נטוורקינג רגוע תחת כיפת השמיים.' WHERE title LIKE '%Night gathering%';
UPDATE segments SET title='Yoga or Run (optional)', title_he='יוגה או ריצה (אופציונלי)', venue='Mishkenot Sha''ananim', venue_he='משכנות שאננים', descr='Optional morning activity.', descr_he='פעילות בוקר אופציונלית.' WHERE title LIKE '%Yoga%';
UPDATE segments SET title='Morning — Shai Doron Leadership Program', title_he='בוקר — תוכנית המנהיגות ע"ש שי דורון', venue='Mishkenot Sha''ananim', venue_he='משכנות שאננים', descr='Greetings by Mayor Moshe Lion. Keynote: Zussman / Goldberg-Polin family. Donors rotate across three stations meeting three leaders each for intimate dialogue + Q&A.', descr_he='ברכות מראש העיר משה ליאון. נאום מרכזי: משפחת זוסמן / גולדברג-פולין. התורמים עוברים בין שלוש תחנות, בכל אחת פוגשים שלושה מנהיגים לשיח אישי + שאלות ותשובות.' WHERE title LIKE '%Shai Doron%';
UPDATE segments SET title='Lunch at Gan Yael', title_he='ארוחת צהריים בגן יעל', venue='Gan Yael', venue_he='גן יעל', descr='Group lunch.', descr_he='ארוחת צהריים קבוצתית.' WHERE title LIKE '%Lunch at Gan Yael%';
UPDATE segments SET title='Site tour — Beit Hanina community center + Arabic lesson', title_he='סיור אתר — מרכז קהילתי בית חנינא + שיעור ערבית', venue='Beit Hanina Sports Complex', venue_he='מתחם הספורט בית חנינא', descr='Guided tour of the new sports complex, then a panel on the social/civic/economic challenges facing East Jerusalem communities. Ends with an Arabic lesson by Gilad Sevitt with an East Jerusalem partner. Moderator: someone from the Foundation.', descr_he='סיור מודרך במתחם הספורט החדש, ולאחריו פאנל על האתגרים החברתיים, האזרחיים והכלכליים העומדים בפני קהילות מזרח ירושלים. מסתיים בשיעור ערבית של גלעד סוויט עם שותף ממזרח ירושלים. מנחה: נציג/ה מהקרן.' WHERE title LIKE '%Beit Hanina%';
UPDATE segments SET title='Hotel break', title_he='הפסקה במלון', venue='Hotels', venue_he='מלונות', descr='Free / organizing time.', descr_he='זמן חופשי / התארגנות.' WHERE title LIKE '%Hotel%' AND day=2;
UPDATE segments SET title='Art event and dinner at Hamiffal', title_he='אירוע אמנות וארוחת ערב במפעל', venue='Hamiffal rooftop', venue_he='גג המפעל', descr='Dinner + tour at Hamiffal, meeting a cluster of artists and 7-8 art/design stalls for donors to purchase pieces.', descr_he='ארוחה + סיור במפעל, מפגש עם מקבץ אמנים ו-7-8 דוכני אמנות / עיצוב לרכישת פריטים על ידי התורמים.' WHERE title LIKE '%Art event and dinner%';
UPDATE segments SET title='Night at Mishkenot / alt. Distillery music option', title_he='לילה במשכנות / אופציית מוזיקה חלופית במזקקה', venue='Mishkenot Sha''ananim / HaMazkeka', venue_he='משכנות שאננים / המזקקה', descr='Whisky and music networking, or an alternative culture/music experience at the Distillery as part of the Zikuk Festival happening the same date.', descr_he='נטוורקינג עם ויסקי ומוזיקה, או חוויית תרבות/מוזיקה חלופית במזקקה במסגרת פסטיבל הזיקוק המתקיים באותו תאריך.' WHERE title LIKE '%Night at Mishkenot%';
UPDATE segments SET title='Running tour (optional)', title_he='סיור ריצה (אופציונלי)', venue='TBC', venue_he='טרם נקבע', descr='Optional morning activity.', descr_he='פעילות בוקר אופציונלית.' WHERE title LIKE '%Running tour%';
UPDATE segments SET title='Morning: Map of Jerusalem''s activity future — at the Cinemateque', title_he='בוקר: מפת עתיד הפעילות בירושלים — בסינמטק', venue='Cinemateque Jerusalem', venue_he='סינמטק ירושלים', descr='Opening words by Arik Grabelsky. ''Field of Action / Activities Market'' — donors meet tables & stands of Jerusalem organizations, learn their impact, build future partnerships.', descr_he='דברי פתיחה של אריק גרבלסקי. "שדה הפעולה / שוק הפעילויות" — התורמים פוגשים שולחנות ודוכנים של ארגונים ירושלמיים, לומדים על השפעתם ובונים שותפויות עתידיות.' WHERE title LIKE '%Map of Jerusalem%';
UPDATE segments SET title='Lunch at the Cinemateque (street food stalls)', title_he='ארוחת צהריים בסינמטק (דוכני אוכל רחוב)', venue='Cinemateque Jerusalem', venue_he='הסינמטק ירושלים', descr='Street food stalls lunch.', descr_he='ארוחת צהריים בדוכני אוכל רחוב.' WHERE title LIKE '%street food%';
UPDATE segments SET title='Think tank at Science Museum: ''Manifest Future Jerusalem''', title_he='צוות חשיבה במוזיאון המדע: "Manifest Future Jerusalem"', venue='Science Museum', venue_he='מוזיאון המדע', descr='Interactive collaborative process bringing Jerusalem leaders and donors together to generate ideas, share strategies and shape the city''s next chapter.', descr_he='תהליך אינטראקטיבי ומשותף המפגיש מנהיגי ירושלים ותורמים ליצירת רעיונות, שיתוף אסטרטגיות ועיצוב הפרק הבא של העיר.' WHERE title LIKE '%Think tank%';
UPDATE segments SET title='Hotel break', title_he='הפסקה במלון', venue='Hotels', venue_he='מלונות', descr='Free / organizing time.', descr_he='זמן חופשי / התארגנות.' WHERE title LIKE '%Hotel settle%' AND day=3;
UPDATE segments SET title='Closing gala dinner at Tower of David', title_he='ארוחת גאלה מסכמת במגדל דוד', venue='Tower of David', venue_he='מגדל דוד', descr='Closing remarks by Arik Grabelsky. Greeting by President (Isaac "Bougie" Herzog). Concert by TBD.', descr_he='דברי סיכום של אריק גרבלסקי. ברכה מהנשיא (בוז''י הרצוג). קונצרט של TBD.' WHERE title LIKE '%gala%';

UPDATE checklist SET text_he='לאשר הקמת ויסקי ומוזיקה' WHERE text='Confirm whisky & music setup';
UPDATE checklist SET text_he='לסגור את המופע / ההופעה' WHERE text='Lock performance / show act';
UPDATE checklist SET text_he='לאשר תפריט ארוחת השף והקייטרינג' WHERE text='Confirm chef dinner menu & catering';
UPDATE checklist SET text_he='לאשר מנחה פאנל (טרם נקבע)' WHERE text='Confirm panel moderator (TBC)';
UPDATE checklist SET text_he='לאסוף תמונות משתתפי הפאנל / חומרי רקע' WHERE text='Collect panelist images / journey materials';
UPDATE checklist SET text_he='מנחה אופציונלי - יעל אבקסיס' WHERE text='Optional moderator - Yael Abeksis';
UPDATE checklist SET text_he='לאשר תוכנית קבלת פנים, ישיבה ומערך הגברה/תצוגה במשכנות שאננים' WHERE text='Confirm welcome program, seating, and AV setup at Mishkenot Sha''ananim';
UPDATE checklist SET text_he='להכין דברי פתיחה וסדר יום למשתתפים' WHERE text='Prepare welcome remarks and opening agenda for participants';
UPDATE checklist SET text_he='לארגן כיבוד / עמדת קפה לקבלת האורחים' WHERE text='Arrange refreshments / coffee station for arrival';
UPDATE checklist SET text_he='לתאם עם גלעד סוויט' WHERE text='Coordinate Gilad Sevitt';
UPDATE checklist SET text_he='לתאם דוברים ולחבר אותם עם הצוות של ליאור שוהם' WHERE text='Coordinate speakers and connect them with Lior Shoham people';
UPDATE checklist SET text_he='לאשר קייטרינג לגג המפעל' WHERE text='Confirm Hamiffal rooftop catering';
UPDATE checklist SET text_he='לאצור 4-5 דוכני אמנות/עיצוב + אמנים' WHERE text='Curate 4-5 art/design stalls + artists';
UPDATE checklist SET text_he='להקים מנגנון רכישה / תשלום לתורמים' WHERE text='Set up purchase / payment flow for donors';
UPDATE checklist SET text_he='לאשר מנחה (טרם נקבע)' WHERE text='Confirm moderator (TBC)';
UPDATE checklist SET text_he='לתכנן לוגיסטיקה של רוטציית 3 תחנות' WHERE text='Design 3-station rotation logistics';
UPDATE checklist SET text_he='להחליט בין משכנות לבין אופציית המזקקה/פסטיבל הזיקוק' WHERE text='Decide Mishkenot vs. Distillery/Zikuk Festival option';
UPDATE checklist SET text_he='להחליט על מסלול ריצה / ספק יוגה ומיקום' WHERE text='Decide running route / yoga provider & venue';
UPDATE checklist SET text_he='לאשר את השתתפות הנשיא הרצוג ואת הפרוטוקול' WHERE text='Confirm President Herzog attendance & protocol';
UPDATE checklist SET text_he='לאשר תזמורת + מנצח (תום כהן או תחריר)' WHERE text='Confirm orchestra + conductor (Tom Cohen or Tahrir)';
UPDATE checklist SET text_he='לסגור קייטרינג לגאלה במגדל דוד' WHERE text='Lock gala catering at Tower of David';
UPDATE checklist SET text_he='להזמין דוכני אוכל רחוב' WHERE text='Book street food vendors';
UPDATE checklist SET text_he='לאצור את הארגונים הירושלמיים המשתתפים' WHERE text='Curate participating Jerusalem organizations';
UPDATE checklist SET text_he='לתכנן את פריסת השולחנות של "שדה הפעולה"' WHERE text='Design ''Field of Action'' table layout';
UPDATE checklist SET text_he='לתכנן פורמט אינטראקטיבי והנחיה לצוות החשיבה' WHERE text='Design interactive think-tank format & facilitation';
UPDATE checklist SET text_he='לעיין במסמך הפירוט המצורף (גוגל דרייב)' WHERE text='Review attached detail doc (Google Drive)';
UPDATE checklist SET text_he='לתאם אוטובוס ולוח זמנים ומסלול מדויקים' WHERE text='Coordinate bus and exact timetable and route';
UPDATE checklist SET text_he='להכין את מדריכי הקרן' WHERE text='Prepare JF guides';
UPDATE checklist SET text_he='לתאם כיבוד לאורך הדרך' WHERE text='Coordinate refreshments on the way';
