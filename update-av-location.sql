-- AV and location details from the production sheet "60 שנה לקרן לירושלים 20-22.10" (tabs: בריף טכני 30.9, לוז מגדל דוד, לוז הקמות ופירוקים).
-- Appends to what is already in each box; skips a session that already has this block. Never overwrites.
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: מסך (ניצב) + סטנד, מחשב למצגת, טכני אודיטוריום (2 מיק.)
סאונד: הגברה לאולם, מיקרופון אלחוטי לאריק ועוד אחד לצוות, וחיבור למחשב המצגת.
מסך: ברוכים הבאים למשכנות שאננים / Welcome to Mishkenot Sha''ananim
מצגת: כן: מצגת פתיחה, הלו"ז והתכנית של שלושת ימי הכנס.' WHERE id='d1-welcome' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
· גן בוטני
ציוד: הגברה לדובר (זוג בוסים ניידים), מסך בכניסה?
סאונד: 2 רמקולים ומיקרופון דוברים
· עמק הצבאים
ציוד: הגברה לדובר (זוג בוסים ניידים), מסך בכניסה?
סאונד: 2 רמקולים ומיקרופון דוברים' WHERE id='seg-ms6g3f67-uwl0' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: הגברה לדובר (זוג בוסים ניידים), מסך בכניסה?
סאונד: לוודא שההגברה שלהם מותאמת לנו לאיזורי הדיבור' WHERE id='d1-lunch' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: מסך (ניצב) + סטנד, מחשב למצגת, טכני אודיטוריום
סאונד: מיקרופון לכל אחד מ-5 האנשים על הבמה, ועוד מיקרופון לדברי הפתיחה והסיום של אריק (אפשר להעביר אחד מהם). בדיקת קול עם הבמה מלאה.
תאורה: הארה ייעודית · להאיר 5 אנשים על הבמה: מנחה וארבעה משתתפי הפאנל. לוודא סט-אפ טוב באולם, ולבדוק מראש מה קיים.
מסך: ברוכים הבאים לתאטרון הקרון / Welcome to Train Theater
מצגת: כן: מצגת לפאנל, תמונות מהמסע של המוסדות. איסוף חומרי הרקע נמצא ברשימת המשימות.' WHERE id='d1-plenary' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
· אולם הנרי קראון
ציוד: מסך (ניצב) + סטנד, מחשב למצגת, טכני אולם, תאורת אווירה לארוחת ערב (מזנונים? גרילנדות?)
סאונד: מפרט מופע וסדנא לפי הרכב המופע (טרם נקבע), מיקרופון לאריק, מיקרופון לדובר, ומיקרופון נייד לשאלות מהקהל.
תאורה: תאורה סטטית · תאורה סטטית למופע. קהל קטן ואינטימי, והמופע משתף את הקהל. הפעלה מינימלית: מצב אחד קבוע, בלי תסריט תאורה.
מסך: ברוכים הבאים לתיאטרון ירושלים / Welcome to Jerusalem Theater
מצגת: לא
· ארוחת הערב
ציוד: תאורת מזנונים, תאורת אווירה, תאורת שולחנות ?, פריסות חשמל (חשמל מאיפה?)
סאונד: 2 רמקולים ומיקרופון אלחוטי לאופציות דיבור
תאורה: תאורה סטטית · גרילנדות עם אופציות דימור' WHERE id='d1-opening' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: תאורת אווירה, סאונד אווירה, פלייליסט סליזי
סאונד: 2 מוגברים עם מחשב עם ספוטיפיי למוזיקת רקע - פלייליסט?
תאורה: סטטית · גרילנדות קיימות במקום - להביא דימר' WHERE id='d1-night' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: מסך (ניצב) + סטנד, מחשב למצגת, טכני אודיטוריום
סאונד: הגברה לאולם וגוזניקים לראש העיר, לאריק ולשרית זוסמן. בכל אחת משלוש התחנות הגברה קטנה ומיקרופון, כדי שגם אורחים מבוגרים ישמעו.
מסך: אותה שקופית כמו ביום 1
מצגת: לא' WHERE id='d2-leadership' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: הגברה לדוברים, פריסת רמקולים היקפית, סאונד אווירה, פלייליסט סליזי' WHERE id='d2-lunch' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: הגברה לדוברים, פריסת רמקולים היקפית, סאונד אווירה, פלייליסט סליזי' WHERE id='d2-election-briefing' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: מסך (ניצב) + סטנד, מחשב למצגת+ מקרן/מסך?, הגברה לפאנל, תאורה לפאנל, כסאות, ריהוט לפאנל
סאונד: מיקרופונים לפאנל ולשיעור. לבדוק אם יש הגברה קיימת במבנה. לסיור, לשקול מערכת הדרכה ניידת עם אוזניות.
תאורה: בדיקה בלבד · לוודא שיש תאורה מספקת לפאנל. אפשר להשתמש בתאורה הקיימת של המבנה, ורק לוודא שיש.
מסך: ברוכים הבאים למתחם הספורט בית חנינא / Welcome to Beit Hanina Sports Complex
מצגת: לא' WHERE id='d2-beithanina' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: מסך (ניצב) + סטנד, הגברה לדוברים, תאורה (אווירה), סאונד אווירה, פלייליסט סליזי
סאונד: מיקרופון לאריק ולשני הדוברים, הגברה שמכסה את קומת הארוחה, והכרזה שנשמעת גם בקומת שוק האמנות.
תאורה: תאורת אווירה · תאורה נוספת קלה לאווירה. מעל התאורה הקיימת, ובלי להחשיך את שולחנות האוכל.
מסך: ברוכים הבאים להמפעל / Welcome to HaMiffal
מצגת: לא' WHERE id='d2-toast' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
· הרמת כוסית וערב
ציוד: מסך (ניצב) + סטנד, הגברה לדוברים, תאורה (אווירה), סאונד אווירה, פלייליסט סליזי
סאונד: מיקרופון לאריק ולשני הדוברים, הגברה שמכסה את קומת הארוחה, והכרזה שנשמעת גם בקומת שוק האמנות.
תאורה: תאורת אווירה · תאורה נוספת קלה לאווירה. מעל התאורה הקיימת, ובלי להחשיך את שולחנות האוכל.
מסך: ברוכים הבאים להמפעל / Welcome to HaMiffal
מצגת: לא
· ארוחת הערב
ציוד: הגברה לדוברים' WHERE id='d2-dinner' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: תאורת אווירה, סאונד אווירה, פלייליסט סליזי
סאונד: 2 מוגברים עם מחשב עם ספוטיפיי למוזיקת רקע - פלייליסט?
תאורה: סטטית · גרילנדות קיימות במקום - להביא דימר' WHERE id='d2-night' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: לדוכנים: פריסות חשמל, תאורת מזנונים, הגברה לא. צהריים, טכני אולם, שימוש במסכים קיימים
סאונד: מיקרופון לדוברים באולם. מיקרופון נייד והגברה קטנה להכרזות בשוק ובחצר, למשל על מעבר השלב ב-12:00 ועל היציאה לארוחת צהריים.
תאורה: הארה ייעודית · להאיר את הדוברים באחד האולמות. רק ההתכנסות המרכזית (09:30–10:15).
מסך: ברוכים הבאים לסינמטק ירושלים / Welcome to Jerusalem Cinematheque
מצגת: לא' WHERE id='d3-morning' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
ציוד: הגברה לארוחת הצהריים (מתוך צרכי הסינמטק בבריף)' WHERE id='d3-lunch' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מהבריף הטכני של שוסטר (30.9):
סאונד: מיקרופון להצגה ולסיכום, וסימן קולי ברור למעברים בין הסבבים (בערך ב-15:50, 16:15 ו-16:40). בזמן הסבבים רמת רעש נמוכה, כדי שאפשר יהיה לשוחח בשולחנות.
תאורה: סטטית · לפי מפרט האודיטוריום
מסך: ברוכים הבאים למוזיאון המדע / Welcome to Science Museum
מצגת: לא' WHERE id='d3-thinktank' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_av = CASE WHEN COALESCE(TRIM(brief_av),'')='' THEN '' ELSE brief_av || char(10) || char(10) END || 'מגיליון ההפקה, לשונית "לוז מגדל דוד" (הבריף הטכני של שוסטר עדיין ריק לגאלה):
במה מרכזית, כולל אישור מהנדס בסיום
פתרון לרמקולים, במת מוניטורים, קונסולה, במה בדשא
טראס ותכנות תאורה
שאלה פתוחה: האם יש מספיק חשמל?' WHERE id='d3-gala' AND COALESCE(brief_av,'') NOT LIKE '%בריף הטכני של שוסטר%';
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'קפה ומאפה בגלריה' WHERE id='d1-welcome' AND instr(COALESCE(brief_location,''), 'קפה ומאפה בגלריה')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'עין יעל · תוכנית ב׳ עדיין לא נקבעה' WHERE id='d1-lunch' AND instr(COALESCE(brief_location,''), 'עין יעל · תוכנית ב׳ עדיין לא נקבעה')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'תאטרון הקרון · האולם' WHERE id='d1-plenary' AND instr(COALESCE(brief_location,''), 'תאטרון הקרון · האולם')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'תיאטרון ירושלים · אולם הנרי קראון למופע ולהרצאה
ארוחת הערב בשיש · לוודא שאפשר להגיש אוכל במרפסת הפואייה' WHERE id='d1-opening' AND instr(COALESCE(brief_location,''), 'תיאטרון ירושלים · אולם הנרי קראון למופע ולהרצאה
ארוחת הערב בשיש · לוודא שאפשר להגיש אוכל במרפסת הפואייה')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'משכנות שאננים · לייט נייט, סיגרים וויסקי · גרילנדות קיימות במקום' WHERE id='d1-night' AND instr(COALESCE(brief_location,''), 'משכנות שאננים · לייט נייט, סיגרים וויסקי · גרילנדות קיימות במקום')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'משכנות שאננים · אודיטוריום
מ-10:00 פיצול לאודיטוריום, גלריה, בר וחדר בספרייה (שלוש תחנות, כ-20 אורחים בתחנה)' WHERE id='d2-leadership' AND instr(COALESCE(brief_location,''), 'משכנות שאננים · אודיטוריום
מ-10:00 פיצול לאודיטוריום, גלריה, בר וחדר בספרייה (שלוש תחנות, כ-20 אורחים בתחנה)')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'גן יעל, משכנות שאננים' WHERE id='d2-lunch' AND instr(COALESCE(brief_location,''), 'גן יעל, משכנות שאננים')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'גן יעל, משכנות שאננים (במהלך ארוחת הצהריים)' WHERE id='d2-election-briefing' AND instr(COALESCE(brief_location,''), 'גן יעל, משכנות שאננים (במהלך ארוחת הצהריים)')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'מתחם הספורט בית חנינא (קאנטרי קלאב) · סיור במתחם, ואחריו פאנל ושיעור ערבית' WHERE id='d2-beithanina' AND instr(COALESCE(brief_location,''), 'מתחם הספורט בית חנינא (קאנטרי קלאב) · סיור במתחם, ואחריו פאנל ושיעור ערבית')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'המפעל · הגינה' WHERE id='d2-toast' AND instr(COALESCE(brief_location,''), 'המפעל · הגינה')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'המפעל · קומת הארוחה וקומת שוק האמנות' WHERE id='d2-dinner' AND instr(COALESCE(brief_location,''), 'המפעל · קומת הארוחה וקומת שוק האמנות')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'משכנות שאננים · לייט נייט, סיגרים ואלכוהול' WHERE id='d2-night' AND instr(COALESCE(brief_location,''), 'משכנות שאננים · לייט נייט, סיגרים ואלכוהול')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'סינמטק ירושלים · התכנסות באחד האולמות (09:30–10:15), שוק כ-40 ארגונים בחלל הפתוח ובחצר' WHERE id='d3-morning' AND instr(COALESCE(brief_location,''), 'סינמטק ירושלים · התכנסות באחד האולמות (09:30–10:15), שוק כ-40 ארגונים בחלל הפתוח ובחצר')=0;
UPDATE segments SET brief_location = CASE WHEN COALESCE(TRIM(brief_location),'')='' THEN '' ELSE brief_location || char(10) END || 'מוזיאון המדע · אודיטוריום ושולחנות לשלושה סבבים' WHERE id='d3-thinktank' AND instr(COALESCE(brief_location,''), 'מוזיאון המדע · אודיטוריום ושולחנות לשלושה סבבים')=0;
