(function(){
/* ============================ i18n ============================ */
const T = {
 en:{ home:'Home', program:'Program', people:'People', logistics:'Logistics', production:'Production', inbox:'Inbox', print:'Print center', settings:'Access & activity',
   preview:'Preview as', lang:'Language', search:'Search or ask anything…', addFile:'Add file', days:'days to 20.10', sub:'Jerusalem Foundation', control:'Control Room', dayof:'Day-of mode', reset:'Reset demo', signedAs:'Signed in as', classic:'Classic dashboard', inboxNote:'Claude reads each file and suggests what it is and where it belongs. Nothing is filed until someone presses Apply; “Just keep the file” stores it with the event’s files. Files are sent to Claude to be read.', inboxFail:'Couldn’t read {f}', filedTo:'Filed to', dismissed:'Dismissed', addRow:'Add row', visits:'Usage', visitsNone:'No sign-ins recorded yet.', visitsFail:'Couldn’t load the sign-in log.', visitsNote:'Usage information, not an audit log: names are what people type when they sign in and are not verified; a shared key can be used by several people. Israel time.', noName:'(no name given)', under5:'under 5 min', min:'min', hr:'h', lvlAdmin:'Admin', lvlEdit:'Edit', lvlView:'View', lastDays:'Last {n} days', person:'Person', keyLvl:'Key', daysActive:'Days active', visitsN:'Visits', lastSeen:'Last seen', signedIn:'Signed in', appCol:'App', duration:'Time in app', deviceCol:'Device', furniture:'Furniture', mapTab:'Map', drvJustNow:'just now', drvMinAgo:'{n} min ago', drvNoneYet:'No driver is sharing a location yet. Drivers turn it on with the 📍 button on the driver page.', drvNoName:'Driver', drvSt_live:'Live', drvSt_late:'Delayed', drvSt_old:'Not updating', drvSt_stopped:'Stopped sharing', drvMapNote:'Positions come from the driver page while it is open on the phone, about every 20 seconds. When a driver switches to Waze, updates pause until they come back to the page. Only the latest position is kept, for 2 days.', drvMapFail:'The map could not load. The list below still shows every driver and how old each position is.', drvApp:'For the driver app', drvDriver:'Driver', drvNone:'Not assigned', drvNote:'Note for the driver', drvNotePh:'Access, parking, luggage…', drvDrop:'Exact drop-off point', drvDropPh:'e.g. bus bay on David Remez St', drvDropUrl:'Drop-off map link (Waze / Google Maps)', drvMap:'Map', drvHint:'Shown on the driver page as soon as it saves.', drvBadUrl:'The map link has to start with https://', siteNeeds:'Site needs', podium:'Podium', needsNote:'From the production needs sheet. Tick an item once it is arranged.', qty:'Quantity', furnNote:'From the furniture rental brief (2b Vibes). Change a quantity and it saves.', furnNone:'No furniture booked for this session.', tourBtn:'Take the tour', venueContacts:'Venue contacts', ctSpeaker:'Speaker', ctFoundation:'Foundation', ctVenue:'Venue', ctSupplier:'Supplier', ctCrew:'Crew', furnItem:'Item', furnSize:'Size', furnDel:'Remove “{i}” from the furniture list?', furnShared:'It is also listed under another session and will be removed there too.', yes:'Yes', remove:'Remove', organization:'Organization', contact:'Contact', form:'Form', newOrg:'New organization', removeOrg:'Remove from the fair:', fairLeft:'{n} still to answer.', fairFormNote:'Tick Form for each organization that has answered.', budgetNote:'The budget sheet from the classic dashboard. Click a cell to change it; Enter saves, Esc cancels. Only the chief key opens it; admin keys do not. Two people editing different cells is fine; the same cell changed by someone else comes back as a conflict.', ask:'Ask', askH:'Ask about the project', askPh:'e.g. What’s still open for day 2? Which transport runs have no driver?', askEmpty:'Ask anything about the program, logistics, design or guests. Answers come from the live data.', askThinking:'Looking through the data…', askClear:'Start a new conversation', askNote:'Answers can be wrong, so check before you act on them. Guests are included as numbers only, never names or contact details. Asking never changes anything; use Suggest changes for that.', askFail:'Couldn’t get an answer', askRefused:'The assistant declined to answer this one. Try rephrasing it.', askEmptyAnswer:'No answer came back. Try again.', aiAdminOnly:'Only admins can apply these. Ask an admin to suggest the same change.', suggest:'Suggest changes', aiH:'Describe a change, review it, then apply', aiAsk:'What should change?', aiPh:'e.g. Add production to-dos for the gala concert, or move the Beit Hanina visit to 16:00', aiGo:'Suggest', aiNote:'Nothing changes until you apply.', aiApply:'Apply selected', aiDiscard:'Discard', aiNone:'No changes were proposed. Try saying which session it is about.', aiFail:'Couldn’t get suggestions', aiPick:'Tick at least one change', aiDone:'Applied {n} changes', aiTodo:'To-do', aiPerson:'Person', aiNewSession:'New session', aiChange:'Change', aiReword:'Reword', aiTitle:'Title', accOps:'Team (ops)', accAdmin:'Admin only', accChief:'Chief only', accLabel:'Who can open it', acc_ops:'Team', acc_admin:'Admin only', acc_chief:'Chief only', saved:'Saved', qSaving:'Saving…', qFailed:'{n} change(s) not saved', qConflict:'Not saved: changed by someone else', qRetry:'Retry', qDiscard:'Discard and reload', qUseTheirs:'Use their version', qKeepMine:'Save mine anyway', qDiscardQ:'Discard {n} unsaved change(s) and reload the latest data?', offline:'Offline', dataFrom:'data from', updated:'Updated', keyGone:'Your key is no longer accepted. Sign in again.', unavail:'This section could not be loaded from the server. It is not empty; try again in a minute.', usageT:'Usage', permsT:'Who can do what', liveClock:'Israel time', viewDayL:'Day shown', saveFail:'Couldn’t save · showing the latest data again', sampleRo:'Example section · this change isn’t saved', ro:'Read-only for now · make this change in the classic dashboard',
   admin:'Admin', editor:'Editor', viewer:'Viewer', open:'Open', progress:'In progress', confirmed:'Confirmed', to_confirm:'To confirm', no_driver:'No driver', needs_decision:'Needs decision', booked:'Booked',
   homeH:'Good morning. Here’s what needs you.', liveH:'Live now', attention:'Needs attention', readiness:'Readiness', comingUp:'Coming up', review:'Review', allFiled:'All filed.',
   progH:'Three days of sessions', addSession:'Add session', openTodos:'open to-dos', transfers:'transfers', catering:'catering',
   progDocH:'Jerusalem Foundation 60th Anniversary Conference — Detailed Program', progDocSub:'20–22 October 2026 · Updated {d}', progDocFile:'Jerusalem Foundation 60th Anniversary Conference - Detailed Program', busT:'Bus',
   ros:'Run of show', rosNone:'No run of show yet', rosEdit:'Edit', rosDone:'Done', rosPh:'One line per item, starting with the time: 14:00 Doors open',
   popupBlocked:'Allow pop-ups for this site to download the PDF',
   quotesT:'Catering quotes', quotesNote:'From the catering supplier comparison. Admin only, like the budget. Tick the quote you go with.', qSupplier:'Supplier', qMenu:'Menu', qPrice:'Price', qLinens:'Tablecloths & napkins', qDishes:'Dishes & cutlery', qChosen:'Chosen', qUnlinked:'Not tied to one meal',
   dayGuests:'Day guests', dgNote:'People who come to single sessions without staying at a hotel, from the session RSVP tabs of the registration master.', dgAdd:'Add day guest', dgNone:'No day guests yet', dgDel:'Remove {n} from the day guests?', firstName:'First name', lastName:'Last name', deskT:'Desk', sessionsT:'Sessions', noSession:'No session picked', dgEv:'Day guests at this session',
   booking:'Hotel booking', conf:'Confirmation', confPh:'Number, or Sent', earlyLate:'Early check-in / late check-out', earlyPh:'e.g. Early check-in', checkIn:'Check-in', checkOut:'Check-out', roomT:'Room',
   byHotel:'Filter by hotel', staff:'Staff', phoneT:'Phone', callT:'Call', sfAll:'All', sfProd:'Production', sfJF:'Jerusalem Foundation', sfBoard:'Board of directors', noRole:'Add role', prodCrew:'Production staff', jfStaff:'Jerusalem Foundation staff', board:'Board of directors', hotelLeaders:'Hotel group leaders', addStaff:'Add to the staff sheet', staffRole:'Role', orgT:'Group', orgProd:'Production', orgJF:'Jerusalem Foundation', staffDel:'Remove {n} from the staff sheet?',
   peopleH:'Everyone in one directory', guests:'Guests', crew:'Crew', talent:'Talent & contracts', fair:'Organizations fair', contacts:'Contacts',
   logH:'Moving people, feeding people', ops:'Crew schedule', transport:'Transport', food:'Food & drink',
   prodH:'Everything being made, bought and scheduled', design:'Design & print', milestones:'Milestones', budget:'Budget', gifts:'Gifts',
   inboxH:'Drop any file. I’ll work out where it belongs.', dropHere:'Drop files here', choose:'Choose files', toReview:'To review', filed:'Filed', recognize:'What I recognize', apply:'Apply', keep:'Just keep the file', fileTo:'File to', reading:'Reading the document…', sure:'sure',
   printH:'Every document, ready to print', accessH:'Who can do what', access:'Access', perms:'Permissions', activity:'Activity',
   save:'Save', cancel:'Cancel', close:'Close', add:'Add', status:'Status', venue:'Venue', when:'When', notes:'Notes', files:'Files', todos:'To-dos', av:'AV brief', gettingThere:'Getting there', crewT:'Crew',
   runsheet:'Run sheet', sites:'Sites', timeline:'Timeline', myday:'My day', now:'Now', next:'Next', noLead:'No lead', done:'Done', live:'Live'
 },
 he:{ home:'בית', program:'תוכנית', people:'אנשים', logistics:'לוגיסטיקה', production:'הפקה', inbox:'תיבת קבצים', print:'מרכז הדפסה', settings:'הרשאות ופעילות',
   preview:'תצוגה כ', lang:'שפה', search:'חיפוש או שאלה…', addFile:'הוספת קובץ', days:'ימים ל-20.10', sub:'הקרן לירושלים', control:'חדר בקרה', dayof:'מצב יום אירוע', reset:'איפוס הדגמה', signedAs:'מחובר/ת כ', classic:'הדשבורד הקלאסי', inboxNote:'Claude קורא כל קובץ ומציע מה הוא ולאן הוא שייך. שום דבר לא מתויק עד שמישהו לוחץ על תיוק; “שמירה כקובץ בלבד” שומר אותו עם קבצי האירוע. הקבצים נשלחים ל-Claude לקריאה.', inboxFail:'לא ניתן לקרוא את {f}', filedTo:'תויק אל', dismissed:'הוסר', addRow:'הוספת שורה', visits:'שימוש', visitsNone:'עוד לא נרשמו כניסות.', visitsFail:'לא ניתן לטעון את יומן הכניסות.', visitsNote:'מידע על שימוש, לא יומן ביקורת: השמות הם מה שאנשים מקלידים בכניסה ואינם מאומתים; מפתח משותף יכול לשמש כמה אנשים. שעון ישראל.', noName:'(בלי שם)', under5:'פחות מ-5 דק׳', min:'דק׳', hr:'שע׳', lvlAdmin:'מנהל', lvlEdit:'עריכה', lvlView:'צפייה', lastDays:'{n} הימים האחרונים', person:'אדם', keyLvl:'מפתח', daysActive:'ימי פעילות', visitsN:'כניסות', lastSeen:'נראה לאחרונה', signedIn:'כניסה', appCol:'ממשק', duration:'זמן באפליקציה', deviceCol:'מכשיר', furniture:'ריהוט', mapTab:'מפה', drvJustNow:'עכשיו', drvMinAgo:'לפני {n} דק׳', drvNoneYet:'אף נהג לא משתף מיקום כרגע. הנהגים מפעילים את זה בכפתור 📍 בדף הנהג.', drvNoName:'נהג', drvSt_live:'פעיל', drvSt_late:'באיחור', drvSt_old:'לא מתעדכן', drvSt_stopped:'הפסיק לשתף', drvMapNote:'המיקומים מגיעים מדף הנהג כשהוא פתוח בטלפון, בערך כל 20 שניות. כשהנהג עובר ל-Waze העדכונים נעצרים עד שהוא חוזר לדף. נשמר רק המיקום האחרון, למשך יומיים.', drvMapFail:'המפה לא נטענה. הרשימה למטה עדיין מציגה את כל הנהגים ואת גיל כל מיקום.', drvApp:'לאפליקציית הנהגים', drvDriver:'נהג', drvNone:'לא שובץ', drvNote:'הערה לנהג', drvNotePh:'גישה, חניה, מזוודות…', drvDrop:'נקודת הורדה מדויקת', drvDropPh:'למשל מפרץ האוטובוסים ברחוב דוד רמז', drvDropUrl:'קישור מפה לנקודת ההורדה (Waze / גוגל מפות)', drvMap:'מפה', drvHint:'מופיע בדף הנהג מיד עם השמירה.', drvBadUrl:'קישור המפה צריך להתחיל ב-https://', siteNeeds:'צרכי אתר', podium:'פודיום', needsNote:'מתוך מפרט הצרכים של ההפקה. מסמנים פריט כשהוא מסודר.', qty:'כמות', furnNote:'מתוך מפרט הריהוט להשכרה (2b Vibes). שינוי כמות נשמר מיד.', furnNone:'לא הוזמן ריהוט למפגש הזה.', tourBtn:'סיור באפליקציה', venueContacts:'אנשי קשר במקום', ctSpeaker:'דובר/ת', ctFoundation:'צוות הקרן', ctVenue:'מקום', ctSupplier:'ספק', ctCrew:'צוות', furnItem:'פריט', furnSize:'מידות', furnDel:'להסיר את “{i}” מרשימת הריהוט?', furnShared:'הפריט מופיע גם במפגש אחר ויוסר גם משם.', yes:'כן', remove:'הסרה', organization:'ארגון', contact:'איש קשר', form:'טופס', newOrg:'ארגון חדש', removeOrg:'להסיר מהיריד את', fairLeft:'עוד {n} לא ענו.', fairFormNote:'מסמנים טופס לכל ארגון שענה.', budgetNote:'גיליון התקציב מהדשבורד הקלאסי. לוחצים על תא כדי לשנות; Enter שומר, Esc מבטל. נפתח רק עם מפתח chief, לא עם מפתח מנהל. שני אנשים בתאים שונים זה בסדר; תא ששונה בינתיים על ידי מישהו אחר יחזור כהתנגשות.', ask:'שאלה', askH:'שאלות על הפרויקט', askPh:'למשל: מה עוד פתוח ביום 2? לאילו הסעות אין נהג?', askEmpty:'אפשר לשאול כל דבר על התוכנית, הלוגיסטיקה, העיצוב או האורחים. התשובות מבוססות על הנתונים החיים.', askThinking:'עובר על הנתונים…', askClear:'שיחה חדשה', askNote:'תשובות יכולות לטעות, לכן כדאי לבדוק לפני שפועלים לפיהן. אורחים נכללים כמספרים בלבד, בלי שמות או פרטי קשר. שאלה לא משנה דבר; לשינויים יש את הצעת שינויים.', askFail:'לא התקבלה תשובה', askRefused:'העוזר סירב לענות על השאלה הזו. נסו לנסח אחרת.', askEmptyAnswer:'לא התקבלה תשובה. נסו שוב.', aiAdminOnly:'רק מנהלים יכולים להחיל את השינויים. בקשו ממנהל להציע את אותו שינוי.', suggest:'הצעת שינויים', aiH:'מתארים שינוי, בודקים ומאשרים', aiAsk:'מה לשנות?', aiPh:'למשל: להוסיף משימות הפקה לקונצרט הגאלה, או להזיז את הביקור בבית חנינא ל-16:00', aiGo:'הצעה', aiNote:'שום דבר לא משתנה עד האישור.', aiApply:'אישור הנבחרים', aiDiscard:'ביטול', aiNone:'לא הוצעו שינויים. נסו לציין על איזה מפגש מדובר.', aiFail:'לא התקבלו הצעות', aiPick:'סמנו לפחות שינוי אחד', aiDone:'הוחלו {n} שינויים', aiTodo:'משימה', aiPerson:'איש/אשת צוות', aiNewSession:'מפגש חדש', aiChange:'שינוי', aiReword:'ניסוח מחדש', aiTitle:'כותרת', accOps:'צוות (ops)', accAdmin:'מנהלים בלבד', accChief:'chief בלבד', accLabel:'מי יכול לפתוח', acc_ops:'צוות', acc_admin:'מנהלים בלבד', acc_chief:'chief בלבד', saved:'נשמר', qSaving:'שומר…', qFailed:'{n} שינויים לא נשמרו', qConflict:'לא נשמר: מישהו אחר שינה', qRetry:'לנסות שוב', qDiscard:'לבטל ולטעון מחדש', qUseTheirs:'להשתמש בגרסה שלהם', qKeepMine:'לשמור את שלי בכל זאת', qDiscardQ:'לבטל {n} שינויים שלא נשמרו ולטעון את הנתונים העדכניים?', offline:'אין חיבור', dataFrom:'נתונים מ', updated:'עודכן', keyGone:'הקוד כבר לא מתקבל. יש להתחבר מחדש.', unavail:'לא ניתן היה לטעון את האזור הזה מהשרת. הוא לא ריק; נסו שוב בעוד דקה.', usageT:'שימוש', permsT:'מי יכול לעשות מה', liveClock:'שעון ישראל', viewDayL:'היום המוצג', saveFail:'השמירה נכשלה · מוצגים שוב הנתונים העדכניים', sampleRo:'אזור דוגמה · השינוי לא נשמר', ro:'לקריאה בלבד בינתיים · את השינוי עושים בדשבורד הקלאסי',
   admin:'מנהל', editor:'עורך', viewer:'צופה', open:'פתוח', progress:'בתהליך', confirmed:'מאושר', to_confirm:'לאישור', no_driver:'אין נהג', needs_decision:'נדרשת החלטה', booked:'הוזמן',
   homeH:'בוקר טוב. זה מה שמחכה לך.', liveH:'עכשיו בשידור', attention:'דורש טיפול', readiness:'מוכנות', comingUp:'בקרוב', review:'לבדיקה', allFiled:'הכל תויק.',
   progH:'שלושה ימים של מפגשים', addSession:'הוספת מפגש', openTodos:'משימות פתוחות', transfers:'הסעות', catering:'כיבוד',
   progDocH:'הקרן לירושלים · כנס ה-60 — לו״ז מפורט', progDocSub:'20–22 באוקטובר 2026 · עודכן {d}', progDocFile:'הקרן לירושלים - כנס ה-60 - לו״ז מפורט', busT:'הסעה',
   ros:'לו״ז מפורט', rosNone:'עדיין אין לו״ז מפורט', rosEdit:'עריכה', rosDone:'סיום', rosPh:'שורה לכל פריט, מתחילה בשעה: 14:00 פתיחת דלתות',
   popupBlocked:'יש לאפשר חלונות קופצים לאתר כדי להוריד את ה-PDF',
   quotesT:'הצעות מחיר לקייטרינג', quotesNote:'מטבלת השוואת ספקי האוכל. למנהלים בלבד, כמו התקציב. סמנו את ההצעה שנבחרה.', qSupplier:'ספק', qMenu:'תפריט', qPrice:'מחיר', qLinens:'מפות ומפיות', qDishes:'כלים וסכו״ם', qChosen:'נבחרה', qUnlinked:'לא משויך לארוחה אחת',
   dayGuests:'אורחי יום', dgNote:'מי שמגיע למפגשים בודדים בלי לינה במלון, מלשוניות האישורים לכל מפגש בגיליון הרישום.', dgAdd:'הוספת אורח יום', dgNone:'עדיין אין אורחי יום', dgDel:'להסיר את {n} מאורחי היום?', firstName:'שם פרטי', lastName:'שם משפחה', deskT:'דסק', sessionsT:'מפגשים', noSession:'לא נבחר מפגש', dgEv:'אורחי יום במפגש הזה',
   booking:'הזמנת מלון', conf:'אישור הזמנה', confPh:'מספר, או Sent', earlyLate:'צ׳ק-אין מוקדם / צ׳ק-אאוט מאוחר', earlyPh:'למשל צ׳ק-אין מוקדם', checkIn:'צ׳ק-אין', checkOut:'צ׳ק-אאוט', roomT:'חדר',
   byHotel:'סינון לפי מלון', staff:'צוות', phoneT:'טלפון', callT:'חיוג', sfAll:'הכול', sfProd:'הפקה', sfJF:'הקרן לירושלים', sfBoard:'הנהלה', noRole:'הוספת תפקיד', prodCrew:'צוות הפקה', jfStaff:'צוות הקרן לירושלים', board:'הנהלת הקרן', hotelLeaders:'ראשי קבוצות במלונות', addStaff:'הוספה לרשימת הצוות', staffRole:'תפקיד', orgT:'קבוצה', orgProd:'הפקה', orgJF:'הקרן לירושלים', staffDel:'להסיר את {n} מרשימת הצוות?',
   peopleH:'כל האנשים במקום אחד', guests:'אורחים', crew:'צוות הפקה', talent:'תוכן וחוזים', fair:'יריד ארגונים', contacts:'אנשי קשר',
   logH:'להזיז אנשים, להאכיל אנשים', ops:'לו״ז צוות', transport:'הסעות', food:'אוכל ושתייה',
   prodH:'כל מה שמיוצר, נקנה ומתוזמן', design:'עיצוב ודפוס', milestones:'אבני דרך', budget:'תקציב', gifts:'מתנות',
   inboxH:'גררו כל קובץ. אני אמצא לו מקום.', dropHere:'גררו קבצים לכאן', choose:'בחירת קבצים', toReview:'לבדיקה', filed:'תויקו', recognize:'מה אני מזהה', apply:'תיוק', keep:'שמירה כקובץ בלבד', fileTo:'לתייק אל', reading:'קורא את המסמך…', sure:'ודאות',
   printH:'כל מסמך, מוכן להדפסה', accessH:'מי יכול לעשות מה', access:'גישה', perms:'הרשאות', activity:'פעילות',
   save:'שמירה', cancel:'ביטול', close:'סגירה', add:'הוספה', status:'סטטוס', venue:'מקום', when:'מתי', notes:'הערות', files:'קבצים', todos:'משימות', av:'בריף טכני', gettingThere:'הגעה', crewT:'צוות',
   runsheet:'לו״ז רץ', sites:'אתרים', timeline:'ציר זמן', myday:'היום שלי', now:'עכשיו', next:'הבא', noLead:'אין אחראי', done:'בוצע', live:'בשידור'
 }
};
const DAYS = { 1:{en:'Tue 20.10',he:'ג׳ 20.10'}, 2:{en:'Wed 21.10',he:'ד׳ 21.10'}, 3:{en:'Thu 22.10',he:'ה׳ 22.10'} };

/* ============================ empty state ============================ */
// The Control Room shows live data only. Before the first load, and for any section the server reports as
// unavailable, lists are empty: there is no sample or example data in this page.
const SMR = 'Site manager';
let CREW = [];    // [name, role, phone] of production staff, from the live team sheet
let LEADERS = []; // [hotel, name, phone] of hotel group leaders, from the live team sheet
let TEAM_ROWS = null; // live team rows: { id, name, role, org }
// hotel names come from the server's hotels table (the same ids the field credentials use)
let HOTELS = [];
// the same hotel is written several ways ("King David" / "King David Hotel"); compare on the first word
const hk = h => String(h||'').trim().split(/\s+/)[0].toLowerCase();
const atHotel = (g, h) => !!g.hotel && hk(g.hotel) === hk(h);
const MOODBOARD_URL = '__MOODBOARD_URL__';
const FAIR_FORM_URL = 'https://docs.google.com/forms/d/1Mfd1edYgeirD_Ivrauuh90O82OJjY3usXg4vtZVVHVY/edit#responses';
function seed(){
  return { ev:[], todos:[], runs:[], food:[], design:[], miles:[], ops:[], talent:[], budget:[], gifts:[], contacts:[], guests:[], day:[], fair:[], fairForm:0, inbox:[], unavailable:[] };
}

/* ============================ state ============================ */
const STORE = 'jf60-cr-live';
let D = seed();
let LIVE_VISITS = null, LIVE_FURN = [], LIVE_NEEDS = [], LIVE_QUOTES = [], LIVE = null, LIVE_GRID = null, LIVE_GRID_REV = 0, LIVE_FILES = [], KEY = '', NAME = '', SHEET = null;
// the last state the server confirmed, untouched by local edits: the source of each save's `expect` value
let BASE = null, LAST_LOAD = 0, LOAD_FAIL = false;
try { KEY = sessionStorage.getItem('jf60k') || ''; NAME = sessionStorage.getItem('jf60n') || ''; } catch(e){}
const S = { area:'home', tab:{ program:'1', people:'guests', logistics:'ops', production:'design', settings:'visits' }, role:'viewer', lang:'en', dayof:false, viewDay:null, opsView:'sheet', person:'', filter:{ staff:'all', guests:'all', contacts:'all', ops:'all' }, q:'' };
try { const u = JSON.parse(localStorage.getItem(STORE+'-ui')||'{}'); delete u.clock; delete u.role; Object.assign(S, u); } catch(e){}
S.role = 'viewer';
// The clock is the real event clock (Asia/Jerusalem, day runs to 05:00). S.clock.day is the day being viewed
// ('19'–'22'); S.clock.now is the real time when that day is today, otherwise all-past or all-upcoming.
Object.defineProperty(S, 'clock', { enumerable:false, get(){
  const n = EventClock.now(), today = n.day == null ? null : String(19 + n.day);
  const day = S.viewDay || today || '20';
  return { day, now: day === today ? n.min : today && day < today ? 3000 : 0, today, real:n };
} });

/* ---- live data: the same API and key as the classic dashboard ---- */
const api = (path, body, o) => apiRequest(path, Object.assign({ key:KEY, body }, o || {}));
const errText = e => apiErrorText(e, S.lang === 'he');

/* ---- save queue ----
   An edit changes the screen right away and adds an operation to this queue. Operations are sent one at a
   time, in order. The status line says Saving… until the server confirms each one; only then Saved.
   A failed or conflicting operation stays in the queue (and the ones after it wait) until it is retried
   or discarded. Field edits carry the value they started from, so a change made meanwhile by someone else
   comes back as a conflict instead of being overwritten. The queue survives a reload in this tab, except
   file uploads (a browser cannot keep a chosen file across a reload). */
const Q_STORE = 'jf60-cr-queue';
let QUEUE = [], Q_RUNNING = false, Q_STATE = 'idle', Q_ERR = null, Q_SAVED_AT = 0;
try { QUEUE = JSON.parse(sessionStorage.getItem(Q_STORE) || '[]').filter(o => o && o.path && !o.form).map(o => Object.assign(o, { state:'failed', err:o.err || 'Not sent before the page was closed' })); } catch(e){ QUEUE = []; }
if (QUEUE.length) { Q_STATE = 'failed'; Q_ERR = { kind:'network', message:'' }; }
const qSave = () => { try { sessionStorage.setItem(Q_STORE, JSON.stringify(QUEUE.filter(o => !o.form && !o.fn))); } catch(e){} };
// where each one-field endpoint keeps its row in the state, and which body key holds the value
const FIELD_SRC = {
  'segment/status':['segments','status','status'], 'segment/notes':['segments','notes','notes'], 'segment/brief':['segments'], 'segment/field':['segments'],
  'run/field':['transport_runs'], 'guest/field':['guests'], 'guest/flag':['guests'], 'design/field':['design_items'], 'crew/field':['crew_shifts'],
  'furniture/field':['furniture_items'], 'siteneed/field':['site_needs'], 'fair/field':['fair_orgs'], 'quote/field':['catering_quotes'],
  'dayguest/field':['day_guests'], 'talent/field':['talent_items'], 'team/field':['team'], 'food/field':['food_items'], 'gift/chosen':['gift_items','chosen','chosen'], 'gift/field':['gift_items']
};
const baseRow = (coll, id) => BASE && (BASE[coll] || []).find(r => String(r.id) === String(id));
const NEEDS_KEY = /\/(add|upload|proof|apply|read)$/;
function send(path, body){
  if (!LIVE) return;
  const op = { id:newIdemKey(), path, body, state:'queued', tries:0 };
  if (typeof path === 'function') { op.fn = path; op.path = 'custom'; op.body = null; }
  else if (body instanceof FormData) op.form = true;
  else {
    const src = FIELD_SRC[path];
    if (src && body && body.id != null) {
      const field = src[1] || body.field, row = baseRow(src[0], body.id);
      if (row && field in row) op.body = Object.assign({}, body, { expect:row[field] });
      op.ref = [src[0], body.id, field, src[2] ? body[src[2]] : body.value];
    }
    if (NEEDS_KEY.test(path)) op.idem = op.id;
  }
  QUEUE.push(op); qSave();
}
const qPending = () => QUEUE.length > 0;
async function runOp(op){
  if (op.fn) return op.fn();
  return api(op.path, op.body, { idem:op.idem, timeout: op.form ? 120000 : 20000 });
}
// after the server confirmed a field, it is the new base for the next edit of the same field
function confirmBase(op){ if (!op.ref || !BASE) return; const [coll, id, field, v] = op.ref; const row = baseRow(coll, id); if (row) row[field] = typeof v === 'boolean' ? (v ? 1 : 0) : v; }
function commit(rerender){
  persist(); if (rerender !== false) render(); else saveStatus();
  if (!LIVE) return;
  pump();
}
async function pump(){
  if (Q_RUNNING) return;
  Q_RUNNING = true;
  while (QUEUE.length) {
    const op = QUEUE[0];
    if (op.state === 'failed' || op.state === 'conflict') break; // waits for Retry or Discard
    op.state = 'saving'; Q_STATE = 'saving'; saveStatus();
    try { await runOp(op); confirmBase(op); QUEUE.shift(); qSave(); Q_SAVED_AT = Date.now(); }
    catch(err){
      op.tries++; op.err = errText(err); op.kind = err && err.kind;
      if (err && err.kind === 'auth') { Q_RUNNING = false; showGate(t('keyGone')); return; }
      op.state = err && err.kind === 'conflict' ? 'conflict' : 'failed'; op.current = err && err.data && err.data.current;
      Q_STATE = op.state; Q_ERR = err; qSave(); saveStatus(); break;
    }
  }
  Q_RUNNING = false;
  if (!QUEUE.length) { Q_STATE = 'saved'; Q_ERR = null; saveStatus(); try { await loadLive(); refreshView(); } catch(e){} }
}
function retryQueue(force){
  const op = QUEUE[0]; if (!op) return;
  if (force && op.body && 'expect' in op.body) { op.body = Object.assign({}, op.body); delete op.body.expect; }
  op.state = 'queued'; Q_STATE = 'saving'; pump();
}
async function discardQueue(){
  if (QUEUE.length && !confirm(t('qDiscardQ').replace('{n}', QUEUE.length))) return;
  QUEUE = []; qSave(); Q_STATE = 'idle'; Q_ERR = null;
  try { await loadLive(); } catch(e){}
  closeSheet(); render();
}
// the status line in the top bar: Saving / Saved / Failed / Conflict, and how fresh the data is
function saveStatus(){
  const el = $('saveSt'); if (!el) return;
  const he = S.lang === 'he', n = QUEUE.length, first = QUEUE[0];
  let html = '', cls = '';
  if (Q_STATE === 'saving' || (n && first && (first.state === 'queued' || first.state === 'saving'))) { cls = 'busy'; html = `<span class="spin" aria-hidden="true"></span>${t('qSaving')}${n > 1 ? ' · ' + n : ''}`; }
  else if (n && first && first.state === 'conflict') { cls = 'bad'; html = `${t('qConflict')} <span class="muted">(${esc(first.err || '')})</span> <button type="button" class="linkbtn" id="qReload">${t('qUseTheirs')}</button> <button type="button" class="linkbtn" id="qForce">${t('qKeepMine')}</button>`; }
  else if (n) { cls = 'bad'; html = `${t('qFailed').replace('{n}', n)} <span class="muted">(${esc((first && first.err) || '')})</span> <button type="button" class="linkbtn" id="qRetry">${t('qRetry')}</button> <button type="button" class="linkbtn" id="qDiscard">${t('qDiscard')}</button>`; }
  else if (Q_SAVED_AT && Date.now() - Q_SAVED_AT < 60000) { cls = 'good'; html = `✓ ${t('saved')} · ${new Date(Q_SAVED_AT).toLocaleTimeString(he ? 'he-IL' : 'en-GB', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Jerusalem' })}`; }
  const conn = LOAD_FAIL ? `<span class="bad">${t('offline')} · ${t('dataFrom')} ${LAST_LOAD ? EventClock.ago(LAST_LOAD, he) : '—'}</span>` : LAST_LOAD ? `<span class="muted">${t('updated')} ${EventClock.ago(LAST_LOAD, he)}</span>` : '';
  el.className = 'savest ' + cls;
  el.innerHTML = (html ? `<span>${html}</span>` : '') + conn;
  const b = id => el.querySelector('#' + id);
  if (b('qRetry')) b('qRetry').onclick = () => retryQueue(false);
  if (b('qDiscard')) b('qDiscard').onclick = discardQueue;
  if (b('qForce')) b('qForce').onclick = () => retryQueue(true);
  if (b('qReload')) b('qReload').onclick = discardQueue;
}
window.addEventListener('beforeunload', e => { if (QUEUE.length) { e.preventDefault(); e.returnValue = ''; } });
function typingInPage(){ const a = document.activeElement; return !!(a && ($('page').contains(a) || $('sheet').contains(a)) && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))); }
function reopenSheet(){
  const sh = $('sheet'); if (!SHEET || !sh.classList.contains('on')) return;
  const a = document.activeElement;
  if (a && sh.contains(a) && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && a.type !== 'checkbox' && (a.tagName === 'SELECT' || a.value)) return; // don't wipe what someone is typing
  const refocus = a && sh.contains(a) && a.id, top = sh.scrollTop;
  SHEET();
  sh.scrollTop = top;
  if (refocus && $(refocus)) $(refocus).focus();
}
// re-render after new data without losing the open drawer, the scroll position or the focused field
function refreshView(){
  if (typingInPage()) { saveStatus(); return; }
  const y = window.scrollY, a = document.activeElement, fid = a && a.id && $('page').contains(a) ? a.id : null;
  render(); reopenSheet();
  window.scrollTo(0, y);
  if (fid && $(fid)) try { $(fid).focus({ preventScroll:true }); } catch(e){}
}
async function loadLive(){
  let s;
  try { s = await api('state', undefined, { timeout:30000 }); }
  catch(e){ if (e.kind !== 'auth') { LOAD_FAIL = true; saveStatus(); } throw e; }
  if (s.redirect) { try { sessionStorage.setItem('jf60k', KEY); sessionStorage.setItem('jf60n', NAME); } catch(e){} location.replace(s.redirect); return new Promise(() => {}); }
  // keep the previous data if a save is waiting: the screen shows the edit until the server has it
  LIVE = s; BASE = JSON.parse(JSON.stringify(s)); LAST_LOAD = Date.now(); LOAD_FAIL = false;
  S.role = ({ admin:'admin', edit:'edit', view:'viewer' })[s.level] || 'viewer';
  if (s.level !== 'view') { try { LIVE_FILES = (await api('files')).files || []; } catch(e){ LIVE_FILES = []; s.unavailable = (s.unavailable || []).concat('files'); } }
  if (s.level === 'admin') { try { LIVE_VISITS = (await api('access/log?days=30')).rows || []; } catch(e){ LIVE_VISITS = null; } }
  if (s.chief) { try { const g = await api('grid'); LIVE_GRID = g.tabs || null; LIVE_GRID_REV = g.rev || 0; } catch(e){ LIVE_GRID = null; s.unavailable = (s.unavailable || []).concat('budget'); } } else LIVE_GRID = null;
  if (!QUEUE.length) applyLive();
  saveStatus();
}
function applyLive(){
  const base = seed(), s = LIVE;
  base.unavailable = s.unavailable || [];
  base.ev = (s.segments||[]).map(x => ({ id:x.id, day:+x.day, s:x.time, e:x.end_time==='00:00'?'24:00':x.end_time, title:x.title, title_he:x.title_he||'', venue:x.venue||'', venue_he:x.venue_he||'', status:x.status||'open', av:x.brief_av||'', ros:x.brief_runsheet||'', loc:x.brief_location||'', notes:x.notes||'',
    files: LIVE_FILES.filter(f => f.segment_id === x.id && f.section === 'content').map(f => ({ id:f.id, name:f.filename })) }));
  base.todos = (s.checklist||[]).map(c => ({ id:'c'+c.id, rid:c.id, ev:c.segment_id, text:c.text, text_he:c.text_he||'', done:!!c.done }));
  base.miles = (s.timeline||[]).filter(m => /^\d{4}-\d\d-\d\d$/.test(m.due_date||'')).map(m => ({ id:'m'+m.id, rid:m.id, due:m.due_date, title:m.title, cat:m.category||'General', done:!!m.done, owner:m.owner||'' }));
  const ctype = c => c.venue ? 'Venue' : /^דוברים/.test(c.role||'') ? 'Speaker' : /^צוות הקרן/.test(c.role||'') ? 'Foundation' : 'Supplier';
  base.contacts = (s.contacts||[]).map(c => ({ id:'k'+c.id, rid:c.id, name:c.name, type:ctype(c), role:(c.role||'').replace(/^(דוברים|צוות הקרן|ספקים) · /, '') || c.venue || '', phone:c.phone||'', email:c.email||'', venue:c.venue||'', notes:c.notes||'' }));
  // runs and meals after midnight (00:15) belong to the end of the day before
  const late = t => { const h = +(t||'0').slice(0,2); return h < 5 ? String(h+24) + (t||'00:00').slice(2) : (t||'00:00'); };
  base.food = (s.food_items||[]).map(f => ({ id:'f'+f.id, rid:f.id, day:+f.day, t:late(f.time), title:f.title, title_he:f.title_he||'', status:f.status||'open', menu:!!(f.file_id || (f.menu_json && f.menu_json !== '[]')) }));
  base.runs = (s.transport_runs||[]).map(r => ({ id:'r'+r.id, rid:r.id, day:+r.day, t:late(r.depart_time), title:r.title, title_he:r.title_he||'', status:r.status||'to_confirm', vehicles:r.vehicles||'', driver:r.driver||'', driver_phone:r.driver_phone||'', company:r.company||'', driver_note:r.driver_note||'', dropoff:r.dropoff||'', dropoff_url:r.dropoff_url||'' }));
  const proofs = s.design_proofs || [];
  base.design = (s.design_items||[]).map(d => ({ id:'d'+d.id, rid:d.id, title:d.title, title_he:d.title_he||'', cat:d.category||'print', status:d.status||'content_missing', due:d.deadline||'',
    proofs: proofs.filter(p => p.item_id === d.id).sort((a,b) => a.version - b.version).map(p => ({ rid:p.id, file:p.file_name ? p.file_id : null, v:p.version, by:p.uploaded_by||'', decision:p.decision||'pending', comment:p.comment||'' })) }));
  const sessByGuest = {}; (s.guest_sessions||[]).forEach(x => (sessByGuest[x.guest_id] = sessByGuest[x.guest_id] || []).push(x.segment_id));
  base.guests = (s.guests||[]).filter(g => (g.status||'active') === 'active').map(g => ({ id:'gu'+g.id, rid:g.id, name:[g.first_name, g.last_name].filter(Boolean).join(' '), desk:g.desk||'', hotel:g.hotel||'', dietary:g.dietary||'', severe:!!g.dietary_severe, passport:!!g.passport_no, review:!!g.needs_review, email:g.email||'', phone:g.phone||'', room:g.room_type||'', cin:g.checkin||'', cout:g.checkout||'', conf:g.booking_conf||'', early:g.early_late||'', sessions:sessByGuest[g.id] || [], status:'active' }));
  base.day = (s.day_guests||[]).map(x => ({ id:'dg'+x.id, rid:x.id, first:x.first_name||'', last:x.last_name||'', name:[x.first_name, x.last_name].filter(Boolean).join(' '), desk:x.desk||'', email:x.email||'', phone:x.phone||'', sessions:(x.sessions||'').split(',').map(v => v.trim()).filter(Boolean), note:x.note||'' }));
  LIVE_FURN = (s.furniture_items || []).map(x => Object.assign({}, x));
  LIVE_NEEDS = (s.site_needs || []).map(x => Object.assign({}, x));
  LIVE_QUOTES = (s.catering_quotes || []).map(x => Object.assign({}, x));
  if ((s.hotels||[]).length) HOTELS = s.hotels.map(h => h.name);
  base.ops = (s.crew_shifts||[]).map(x => { let crew = []; try { crew = JSON.parse(x.crew_json || '[]'); } catch(e){} return { id:x.id, rid:x.id, day:String(x.day), s:+x.start_min, e:+x.end_min, title:x.title, site:x.site||'', kind:x.kind||'setup', crew, flag:x.flag||'', note:x.note||'', done:!!x.done }; });
  base.talent = (s.talent_items||[]).map(x => ({ id:x.id, rid:x.id, title:x.title, stage:x.stage||'contacted', fee:x.fee == null ? null : +x.fee }));
  base.fair = (s.fair_orgs||[]).map(x => ({ id:x.id, rid:x.id, name:x.name, domain:x.domain||'', contact:x.contact||'', phone:x.phone||'', email:x.email||'', note:x.note||'', contacted:!!x.contacted, confirmed:!!x.confirmed, form:!!x.form_done, power:!!x.power }));
  base.fairForm = base.fair.filter(o => o.form).length;
  const lead = /^Hotel group leader · /, prod = (s.team||[]).filter(m => (m.org||'Production') === 'Production');
  CREW = prod.filter(m => !lead.test(m.role||'')).map(m => [m.name, m.role||'', m.phone||'']);
  LEADERS = prod.filter(m => lead.test(m.role||'')).map(m => [(m.role||'').replace(lead, ''), m.name, m.phone||'']);
  // older rows mark the board and staff in the role field; the group now lives in org
  TEAM_ROWS = (s.team||[]).map(m => { const board = m.org === 'Jerusalem Foundation' && /^board of directors$/i.test(m.role||''); return { id:m.id, name:m.name, phone:m.phone||'', role:/^(staff|board of directors)$/i.test(m.role||'') ? '' : (m.role||''), org:board ? 'Jerusalem Foundation board' : (m.org||'Production'), legacy:board }; });
  const toClient = (type, tg) => !tg ? '' : type === 'menu' ? 'f' + tg : type === 'proof' ? 'd' + tg : tg;
  base.inbox = (s.inbox_items||[]).map(x => { let f = []; try { f = JSON.parse(x.fields_json || '[]'); } catch(e){} return { id:'ib' + x.id, rid:x.id, name:x.name, ext:x.ext || 'FILE', state:x.state, type:x.type || 'other', conf:+x.confidence || 0, summary:x.summary || '', fields:f.map(v => [v.label, v.value]), target:toClient(x.type, x.target), filedTo:x.filed_to || '', access:x.access || 'admin' }; });
  (D && D.inbox || []).filter(x => x.state === 'reading').forEach(x => base.inbox.unshift(x));
  base.gifts = (s.gift_items||[]).map(g => ({ id:'g'+g.id, rid:g.id, cat:g.category||'', cat_he:g.category_he||'', title:g.title, title_he:g.title_he||'', chosen:!!g.chosen, qty:g.qty||'' }));
  D = base;
}
// a section the server could not load is shown as unavailable, never as empty or as sample data
const SECTION_OF = { 'program':['segments'], 'people:guests':['guests','guest_sessions'], 'people:day':['day_guests'], 'people:crew':['team'], 'people:talent':['talent_items'], 'people:fair':['fair_orgs'], 'people:contacts':['contacts'],
  'logistics:ops':['crew_shifts'], 'logistics:transport':['transport_runs','run_stops'], 'logistics:food':['food_items','catering_quotes'], 'production:design':['design_items','design_proofs'], 'production:milestones':['timeline'], 'production:budget':['budget'], 'production:gifts':['gift_items'], 'inbox':['inbox_items','files'] };
const unavailableHere = (area, tab) => (SECTION_OF[area + ':' + tab] || SECTION_OF[area] || []).filter(k => (D.unavailable || []).includes(k));
function persist(){ try { localStorage.setItem(STORE+'-ui', JSON.stringify({ area:S.area, tab:S.tab, lang:S.lang, dayof:S.dayof, viewDay:S.viewDay, opsView:S.opsView, person:S.person, filter:S.filter })); } catch(e){} }

/* ============================ helpers ============================ */
const $ = id => document.getElementById(id);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const t = k => (T[S.lang]||T.en)[k] || T.en[k] || k;
const L = (o, f) => (S.lang==='he' && o[f+'_he']) ? o[f+'_he'] : o[f];
const dayName = d => DAYS[d][S.lang] || DAYS[d].en;
const TODAY0 = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); })();
const daysTo = d => Math.round((new Date(d+'T00:00:00') - TODAY0)/864e5);
const ddmm = d => d.slice(8) + '.' + d.slice(5,7);
const ils = n => n==null ? '—' : '₪' + n.toLocaleString('en-US');
const mins = x => { const [h,m] = x.split(':').map(Number); return h*60+m; };
const fmt = m => { const d = ((m % 1440) + 1440) % 1440; return String(Math.floor(d/60)).padStart(2,'0') + ':' + String(d%60).padStart(2,'0'); };
const isAdmin = () => S.role === 'admin', isEdit = () => S.role !== 'viewer', isView = () => S.role === 'viewer';
const can = {
  budget: () => isAdmin() && (!LIVE || !!LIVE.chief),
  transport: () => isEdit(),
  delFiles: () => isEdit(),
  delContacts: () => isEdit(),
  approve: () => isEdit(),
  file: () => isEdit()
};
const who = () => ({ admin:'You (admin)', edit:'Editor preview', viewer:'Viewer preview' })[S.role];
// Changes are recorded on the server (who saved last and when, per row). There is no client-side activity log.
function log(){}
const near = (a, b) => Math.abs(mins(a) - mins(b)) <= 75;
const evTodos = id => D.todos.filter(x => x.ev === id);

const IC = {
  home:'<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/>',
  program:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
  people:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M16 14.6c2.6.2 4.6 1.9 5.2 5.4"/>',
  logistics:'<rect x="2" y="7" width="13" height="10" rx="1.5"/><path d="M15 10h4l3 3v4h-7"/><circle cx="7" cy="18.5" r="1.8"/><circle cx="18" cy="18.5" r="1.8"/>',
  production:'<path d="M4 20h16"/><path d="M6 16 16 6l2 2L8 18H6z"/>',
  inbox:'<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5 5h14l2 8v6H3v-6z"/>',
  print:'<path d="M7 8V3h10v5"/><rect x="3" y="8" width="18" height="9" rx="2"/><path d="M7 14h10v7H7z"/>',
  settings:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'
};
const icon = (k, s=18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;
const flagIcon = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>';

const stChip = s => ({ open:`<span class="chip plain">${t('open')}</span>`, progress:`<span class="chip warn">${t('progress')}</span>`, confirmed:`<span class="chip good">${t('confirmed')}</span>` })[s] || '';
const runChip = s => ({ booked:`<span class="chip good">${t('booked')}</span>`, to_confirm:`<span class="chip warn">${t('to_confirm')}</span>`, no_driver:`<span class="chip bad">${t('no_driver')}</span>`, needs_decision:`<span class="chip info">${t('needs_decision')}</span>` })[s];
const dChip = s => ({ content_missing:'<span class="chip bad">Content missing</span>', in_design:'<span class="chip warn">In design</span>', awaiting_approval:'<span class="chip info">Awaiting approval</span>', approved:'<span class="chip good">Approved</span>', changes:'<span class="chip warn">Changes requested</span>', no_design:'<span class="chip plain">No design line</span>', unresolved:'<span class="chip warn">Unresolved</span>' })[s] || s;
const pending = () => D.inbox.filter(d => d.state === 'review' || d.state === 'reading').length;

/* ============================ shell ============================ */
const AREAS = ['home','program','people','logistics','production','inbox','print','settings'];
const allowed = a => isView() ? (a==='home'||a==='program') : (a !== 'settings' || isAdmin());
function shell(){
  document.documentElement.lang = S.lang; document.documentElement.dir = S.lang === 'he' ? 'rtl' : 'ltr';
  const navHtml = (bottom) => AREAS.filter(allowed).map((a,i) => `${!bottom && a==='print' ? '<div class="nav-sep"></div>' : ''}<button type="button" class="${bottom?'':'nav-btn'}" data-area="${a}" ${S.area===a?'aria-current="page"':''}>${icon(a, bottom?20:18)}<span>${t(a)}</span>${a==='inbox'&&pending()?`<span class="badge num">${pending()}</span>`:''}</button>`).join('');
  $('navList').innerHTML = navHtml(false);
  $('bottomNav').innerHTML = navHtml(true);
  document.querySelectorAll('[data-area]').forEach(b => b.onclick = () => go(b.dataset.area));
  const seg = (el, opts, cur, fn) => { el.innerHTML = opts.map(([k,l]) => `<button type="button" aria-pressed="${k===cur}" data-k="${k}">${l}</button>`).join(''); el.querySelectorAll('button').forEach(b => b.onclick = () => fn(b.dataset.k)); };
  $('roleTxt').textContent = (NAME ? NAME + ' · ' : '') + t(S.role==='edit'?'editor':S.role);
  $('daysN').textContent = Math.max(0, daysTo('2026-10-20'));
  seg($('langSeg'), [['en','EN'],['he','עב']], S.lang, k => { if (k === S.lang) return; S.lang = k; closeSheet(); if (!$('pal').hidden) closePal(); render(); });
  $('tourBtn').textContent = t('tourBtn'); $('lblRole').textContent = t('signedAs'); $('lblLang').textContent = t('lang'); $('searchTxt').textContent = t('search'); $('addFileTxt').textContent = t('addFile');
  $('daysTxt').textContent = t('days'); $('markSub').textContent = t('sub'); $('markT').textContent = t('control'); $('dayofTxt').textContent = t('dayof'); $('classicLink').textContent = t('classic');
  $('palIn').placeholder = t('search');
  $('dropTop').hidden = !can.file();
  $('suggestTop').hidden = !(LIVE && isEdit()); $('suggestTxt').textContent = t('suggest');
  $('askTop').hidden = !LIVE; $('askTxt').textContent = t('ask');
  $('dayofBtn').setAttribute('aria-pressed', S.dayof);
  $('clockSlot').innerHTML = (S.dayof || (S.area==='logistics' && S.tab.logistics==='ops')) ? clockBar() : '';
  wireClock();
}
function go(area, tab){ if (!allowed(area)) return; S.area = area; if (tab) S.tab[area] = tab; closeSheet(); render(); window.scrollTo(0,0); }

/* ============================ clock (real event time) ============================ */
// Shows Israel time and lets you pick which day to look at. Nothing is simulated.
function clockBar(){
  const days = [['19','Mon 19.10'],['20',dayName(1)],['21',dayName(2)],['22',dayName(3)]], c = S.clock;
  return `<section class="clockbar" aria-label="${t('liveClock')}">
    <div><div class="t num" id="clockT">${esc(c.real.clock)}</div><div class="muted" style="font-size:12px">${t('liveClock')}${c.today ? '' : ' · ' + esc(c.real.date.slice(8) + '.' + c.real.date.slice(5, 7))}</div></div>
    <label class="fld" style="margin:0">${t('viewDayL')}<select id="clockDay">${days.map(([k,l]) => `<option value="${k}" ${k===c.day?'selected':''}>${esc(l)}${k===c.today?' ●':''}</option>`).join('')}</select></label>
  </section>`;
}
function wireClock(){
  const d = $('clockDay'); if (!d) return;
  d.onchange = e => { S.viewDay = e.target.value === S.clock.today ? null : e.target.value; persist(); render(); };
}
// keep "now" current: the clock line and live highlights move with real time
setInterval(() => { if (!LIVE || document.visibilityState !== 'visible') return; if (S.dayof || (S.area === 'logistics' && S.tab.logistics === 'ops')) { if (!typingInPage() && !$('sheet').classList.contains('on')) render(); } else saveStatus(); }, 30000);
const opStatus = x => x.done ? 'done' : (x.day !== S.clock.day) ? (x.day < S.clock.day ? 'past' : 'next') : x.e <= S.clock.now ? 'past' : x.s <= S.clock.now ? 'live' : 'next';
const evDayKey = e => String(e.day + 19);
const evStatusNow = e => evDayKey(e) !== S.clock.day ? (evDayKey(e) < S.clock.day ? 'past' : 'next') : mins(e.e) <= S.clock.now ? 'past' : mins(e.s) <= S.clock.now ? 'live' : 'next';

/* ============================ HOME ============================ */
function readiness(){
  const signed = D.talent.filter(x=>x.stage==='signed'||x.stage==='invoiced').length;
  const approved = D.design.filter(d=>d.status==='approved').length;
  return [
    ['Milestones', D.miles.filter(m=>m.done).length, D.miles.length, 'production','milestones'],
    ['Guests housed', D.guests.filter(g=>g.hotel).length, D.guests.length, 'people','guests'],
    ['To-dos done', D.todos.filter(x=>x.done).length, D.todos.length, 'program', null],
    ['Food confirmed', D.food.filter(f=>f.status==='confirmed').length, D.food.length, 'logistics','food'],
    ['Transport booked', D.runs.filter(r=>r.status==='booked').length, D.runs.length, 'logistics','transport'],
    ['Design approved', approved, D.design.length, 'production','design'],
    ['Contracts signed', signed, D.talent.length, 'people','talent']
  ].filter(r => r[3] !== 'people' || r[4] !== 'talent' || isAdmin());
}
function attention(){
  const a = [];
  const overdue = D.miles.filter(m => !m.done && daysTo(m.due) < 0);
  if (overdue.length) a.push(['bad', overdue.length + ' milestones overdue', 'Oldest: ' + overdue[0].title + ' (due ' + ddmm(overdue[0].due) + ')', 'production','milestones']);
  const uns = D.talent.filter(x=>x.stage==='contacted'||x.stage==='quote');
  if (uns.length && isAdmin()) a.push(['bad', uns.length + ' of ' + D.talent.length + ' talent contracts not signed', D.talent.filter(x=>x.stage==='quote').length + ' quotes received · ' + ils(D.talent.reduce((n,x) => n + (x.fee || 0), 0)) + ' in recorded fees', 'people','talent']);
  const nd = D.runs.filter(r => r.status==='no_driver').length, dec = D.runs.filter(r=>r.status==='needs_decision').length;
  if (nd || dec) a.push(['bad', nd + ' transport runs have no driver', dec + ' more need a decision', 'logistics','transport']);
  const gaps = D.ops.filter(o => o.crew.some(c => c.n === '?'));
  if (gaps.length) a.push(['warn', gaps.length + ' crew slots without a lead', gaps.map(o=>o.site).filter((v,i,s)=>s.indexOf(v)===i).join(', '), 'logistics','ops']);
  const aw = D.design.filter(d => d.status==='awaiting_approval');
  if (aw.length) a.push(['warn', aw.length + ' design proofs waiting for sign-off', aw.map(d=>L(d,'title')).join(' · '), 'production','design']);
  const late = D.design.filter(d => d.status !== 'approved' && daysTo(d.due) < 0);
  if (late.length) a.push(['warn', late.length + ' design items past deadline', late.map(d=>L(d,'title')).join(' · '), 'production','design']);
  const formLeft = D.fair.length - D.fairForm;
  if (formLeft > 0) a.push(['warn', formLeft + ' of ' + D.fair.length + ' organizations haven’t filled in the information form', 'Organizations fair · Cinematheque, 22.10', 'people','fair', true]);
  const noH = D.guests.filter(g => !g.hotel).length;
  if (noH) a.push(['warn', noH + ' guests have no hotel recorded', 'They are missing from every pickup manifest', 'people','guests']);
  const rv = D.guests.filter(g => g.review).length;
  if (rv) a.push(['info', rv + ' guests flagged for review', 'From the last registration import', 'people','guests']);
  if (isAdmin()) { const np = D.guests.filter(g => !g.passport).length; if (np) a.push(['info', np + ' guests missing a passport number', 'Needed for the hotel VAT exemption', 'people','guests']); }
  const sev = D.guests.filter(g => g.severe).length, diet = D.guests.filter(g=>g.dietary).length;
  a.push(['info', sev + ' severe allergy · ' + diet + ' dietary requirements', 'The caterer sheet in the Print center lists them per meal', 'print', null]);
  return a;
}
function fairTable(){
  const live = !!LIVE, tog = (o, f, on, yes) => isEdit() ? `<button type="button" class="chipbtn" data-ff="${f}" data-fo="${esc(o.id)}" aria-pressed="${on}">${on ? `<span class="chip good">${yes}</span>` : '<span class="chip plain">—</span>'}</button>` : (on ? yes : '—');
  const doms = D.fair.map(o => o.domain).filter((v,i,a) => a.indexOf(v) === i);
  const row = o => `<tr><td><div style="font-weight:500">${esc(o.name)}</div>${o.note ? `<div class="s muted" style="font-size:12px">${esc(o.note)}</div>` : ''}</td>
    ${live ? `<td style="font-size:12.5px">${esc(o.contact||'')}${o.phone ? `<div class="num"><a href="tel:${esc(o.phone.split('/')[0].replace(/[^\d+]/g,''))}">${esc(o.phone)}</a></div>` : ''}${o.email ? `<div style="word-break:break-all">${o.email.split(',').map(e => e.trim()).filter(Boolean).map(e => `<a href="mailto:${esc(e)}">${esc(e)}</a>`).join('<br>')}</div>` : ''}</td>` : `<td>${esc(o.domain)}</td>`}
    <td>${tog(o,'contacted',o.contacted,'✓')}</td><td>${tog(o,'confirmed',o.confirmed,t('yes'))}</td>${live ? `<td>${tog(o,'form_done',o.form,'✓')}</td>` : ''}<td>${tog(o,'power',o.power,'⚡')}</td>
    ${live && isAdmin() ? `<td><button type="button" class="btn ghost sm" data-fdel="${esc(o.id)}" aria-label="${t('remove')} ${esc(o.name)}">✕</button></td>` : ''}</tr>`;
  const head = `<thead><tr><th>${t('organization')}</th><th>${live ? t('contact') : 'Field'}</th><th>Contacted</th><th>Confirmed</th>${live ? `<th>${t('form')}</th>` : ''}<th>Power</th>${live && isAdmin() ? '<th></th>' : ''}</tr></thead>`;
  const cols = live ? (isAdmin() ? 7 : 6) : 5;
  const body = live ? doms.map(d => `<tr><th colspan="${cols}" class="lbl" style="text-align:start;padding-top:14px">${esc(d || '—')} · ${D.fair.filter(o => o.domain === d).length}</th></tr>` + D.fair.filter(o => o.domain === d).map(row).join('')).join('') : D.fair.map(row).join('');
  const add = live && isAdmin() ? `<form id="fairAdd" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><label class="sr" for="fairName">${t('organization')}</label><input id="fairName" placeholder="${t('newOrg')}" style="flex:1;min-width:160px" required><label class="sr" for="fairDom">Field</label><select id="fairDom">${doms.map(d => `<option>${esc(d)}</option>`).join('')}</select><button class="btn sm" type="submit">${t('add')}</button></form>` : '';
  return `<div class="panel tbl-wrap"><table class="tbl">${head}<tbody>${body}</tbody></table></div>${add}`;
}
function viewHome(){
  if (S.dayof) return viewLive();
  const r = readiness(), att = isView() ? [] : attention();
  const next = D.miles.filter(m => !m.done && daysTo(m.due) >= 0).slice(0,4);
  const rev = D.inbox.filter(d => d.state==='review').slice(0,3);
  return `<div class="page-h"><div><div class="lbl" data-notr>${esc(TODAY0.toLocaleDateString(S.lang==='he'?'he-IL':'en-GB', { weekday:'long', day:'numeric', month:'long' }))}</div><h1>${t('homeH')}</h1></div></div>
  <div class="hero">
    <section class="panel countdown">
      <div><div class="lbl">Conference</div><div style="font-size:15px;margin-top:4px">20–22 October · ${D.ev.length} sessions · ${D.guests.length} guests · ${new Set(D.ev.map(e => e.venue).filter(Boolean)).size} venues</div></div>
      <div class="big num">${Math.max(0, daysTo('2026-10-20'))}<small>days</small></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${[1,2,3].map(d => `<button class="btn ghost sm" type="button" data-go="program" data-tab="${d}">${dayName(d)}</button>`).join('')}</div>
    </section>
    <section class="panel ready" aria-label="${t('readiness')}"><div class="lbl">${t('readiness')}</div>
      ${(isView()?r.filter(x=>x[3]==='program'):r).map(([l,n,of,area,tab]) => { const p = of ? Math.round(n/of*100) : 0; const cls = p>=80?'good':p>=40?'warn':'bad'; return `<button type="button" class="bar-row" data-go="${area}" ${tab?`data-tab="${tab}"`:''}><span>${esc(l)}</span><span class="track"><span class="fill ${cls}" style="width:${Math.max(p,2)}%"></span></span><span class="num muted" style="text-align:end">${n}/${of}</span></button>`; }).join('')}
    </section>
  </div>
  <div class="cols">
    <section class="panel"><div class="sec-h"><h2>${t('attention')}</h2><span class="muted" style="font-size:12.5px">${att.length}</span></div>
      <div class="list">${att.length ? att.map(([sev,tt,s,area,tab,live]) => `<button type="button" class="att" data-go="${area}" ${tab?`data-tab="${tab}"`:''}><span class="rail ${sev}"></span><span><div class="t">${esc(tt)}</div><div class="s">${esc(s)}</div></span><span class="go">→</span></button>`).join('') : '<div class="empty">Viewers see the program only.</div>'}</div></section>
    <div style="display:flex;flex-direction:column;gap:16px">
      ${can.file() ? `<section class="panel"><div class="sec-h"><h2>${t('inbox')}</h2><button class="btn ghost sm" type="button" data-go="inbox">${t('review')}</button></div>
        <div class="list">${rev.length ? rev.map(d => `<button type="button" class="li" data-go="inbox" style="grid-template-columns:auto minmax(0,1fr)"><span class="fileic">${esc(d.ext)}</span><span style="min-width:0"><div class="t" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(d.name)}</div><div class="s">${TYPES[d.type].en} → ${TYPES[d.type].dest}</div></span></button>`).join('') : `<div class="empty">${t('allFiled')}</div>`}</div></section>` : ''}
      <section class="panel"><div class="sec-h"><h2>${t('comingUp')}</h2></div>
        <div class="list">${next.map(m => `<div class="li" style="grid-template-columns:52px minmax(0,1fr)"><span class="time num">${ddmm(m.due)}</span><span><div class="t">${esc(m.title)}</div><div class="s">${esc(m.cat)} · in ${daysTo(m.due)} days${m.owner?' · '+esc(m.owner):''}</div></span></div>`).join('')}</div></section>
    </div>
  </div>`;
}
function viewLive(){
  const dk = S.clock.day;
  const evLive = D.ev.filter(e => evDayKey(e)===dk && evStatusNow(e)==='live');
  const evNext = D.ev.filter(e => evDayKey(e)===dk && evStatusNow(e)==='next').slice(0,3);
  const runsSoon = D.runs.filter(r => String(r.day+19)===dk && mins(r.t) >= S.clock.now && mins(r.t) <= S.clock.now + 90);
  const opsLive = D.ops.filter(o => o.day===dk && opStatus(o)==='live');
  const issues = D.ops.filter(o => o.day===dk && o.flag && opStatus(o)!=='past');
  const leads = new Set(); opsLive.forEach(o => o.crew.forEach(c => { if (c.r===SMR && c.n!=='?') leads.add(c.n); }));
  return `<div class="page-h"><div><div class="lbl">${esc(dk==='19'?'Mon 19.10':dayName(+dk-19))} · ${fmt(S.clock.now)}</div><h1>${t('liveH')}</h1></div></div>
  <div class="cols">
    <div style="display:flex;flex-direction:column;gap:12px">
      ${evLive.length ? evLive.map(e => `<button type="button" class="livecard" data-ev="${esc(e.id)}" style="border:0;text-align:start"><span class="lbl" style="color:inherit;opacity:.85">NOW · UNTIL ${esc(e.e)}</span><span class="h">${esc(L(e,'title'))}</span><span>${esc(L(e,'venue')||'Hotels')}</span></button>`).join('') : `<div class="livecard idle"><span class="lbl">NOW</span><span class="h">No guest session right now</span><span>${evNext[0] ? 'Next at ' + esc(evNext[0].s) + ' · ' + esc(L(evNext[0],'title')) : 'Nothing else today'}</span></div>`}
      <section class="panel"><div class="sec-h"><h2>Crew on shift</h2><span class="muted" style="font-size:12.5px">${leads.size} leads</span></div><div class="list">${opsLive.length ? opsLive.map(o => `<button type="button" class="li" data-op="${esc(o.id)}"><span class="dot k-${o.kind}"></span><span><div class="t">${esc(o.title)}</div><div class="s">${esc(o.site)} · until ${fmt(o.e)}</div></span><span>${o.crew.filter(c=>c.r===SMR).map(c => c.n==='?'?`<span class="chip bad">${t('noLead')}</span>`:`<span class="chip plain">${esc(c.n)}</span>`).join(' ')}</span></button>`).join('') : '<div class="empty">No crew items running</div>'}</div></section>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <section class="panel"><div class="sec-h"><h2>Departing in the next 90 min</h2></div><div class="list">${runsSoon.length ? runsSoon.map(r => `<button type="button" class="li" data-run-open="${esc(r.id)}"><span class="time num">${fmt(mins(r.t))}</span><span class="t">${esc(L(r,'title'))}</span>${runChip(r.status)}</button>`).join('') : '<div class="empty">No departures</div>'}</div></section>
      <section class="panel"><div class="sec-h"><h2>${t('next')}</h2></div><div class="list">${evNext.map(e => `<button type="button" class="li" data-ev="${esc(e.id)}"><span class="time num">${esc(e.s)}</span><span class="t">${esc(L(e,'title'))}</span><span></span></button>`).join('') || '<div class="empty">—</div>'}</div></section>
      <section class="panel"><div class="sec-h"><h2>Open issues today</h2><span class="muted" style="font-size:12.5px">${issues.length}</span></div><div class="list">${issues.map(o => `<button type="button" class="att" data-op="${esc(o.id)}"><span class="rail bad"></span><span><div class="t">${esc(o.flag)}</div><div class="s">${fmt(o.s)} · ${esc(o.site)}</div></span><span class="go">→</span></button>`).join('') || '<div class="empty">None</div>'}</div></section>
    </div>
  </div>
  <p class="note">Day-of mode follows the real time in Israel: what is live, who is on shift, which buses leave soon. A day runs until 05:00 the next morning.</p>`;
}

/* ============================ PROGRAM ============================ */
function viewProgram(){
  const d = +S.tab.program || 1;
  const evs = D.ev.filter(e => e.day === d).sort((a,b) => mins(a.s) - mins(b.s));
  return `<div class="page-h"><div><div class="lbl">${t('program')}</div><h1>${t('progH')}</h1></div>${isAdmin()?`<button class="btn sm" type="button" id="addEv">${t('addSession')}</button>`:''}</div>
  <div class="tabs" role="tablist">${[1,2,3].map(k => `<button role="tab" type="button" data-ptab="${k}" aria-selected="${k===d}">${dayName(k)}<span class="c num">${D.ev.filter(e=>e.day===k).length}</span></button>`).join('')}</div>
  <div class="panel list">${evs.map(e => {
    const open = evTodos(e.id).filter(x=>!x.done).length;
    const runs = D.runs.filter(r => r.day === e.day && near(r.t, e.s)).length, food = D.food.filter(f => f.day === e.day && near(f.t, e.s)).length;
    const st = S.dayof ? evStatusNow(e) : '';
    return `<button type="button" class="li ${st==='past'?'past':''}" data-ev="${esc(e.id)}"><span class="time num">${esc(e.s)}</span><span style="min-width:0"><div class="t">${esc(L(e,'title'))}</div><div class="s">${esc(L(e,'venue')||'Hotels')} · until ${esc(e.e)}${!isView()&&open?` · <span style="color:var(--warn)">${open} ${t('openTodos')}</span>`:''}${!isView()&&runs?` · ${runs} ${t('transfers')}`:''}${!isView()&&food?` · ${t('catering')}`:''}${e.av?' · AV ✓':''}${e.files.length?' · '+e.files.length+' files':''}</div></span><span>${st==='live'?`<span class="chip good">● ${t('live')}</span>`:isView()?'':stChip(e.status)}</span></button>`;
  }).join('')}</div>
  <p class="note">Each session is one page: guest-facing details, transfers, catering, crew, AV brief, to-dos, notes and files.</p>`;
}
function venueBox(e){
  if (!LIVE) return '';
  const v = e.venue || '';
  const cs = v ? D.contacts.filter(c => c.type === 'Venue' && c.venue && v.includes(c.venue)).sort((a, b) => (/טכני/.test(a.role) ? 1 : 0) - (/טכני/.test(b.role) ? 1 : 0)) : [];
  const note = ((LIVE.venues || []).find(x => x.venue === v) || {}).contacts || '';
  if (!cs.length && !note.trim()) return '';
  return `<div class="box"><h3>${t('venueContacts')}</h3>${cs.map(c => `<div class="mini" dir="auto"><span><b>${esc(c.name)}</b> · ${esc(c.role)}${c.notes ? `<span class="muted" style="font-size:12px"> · ${esc(c.notes)}</span>` : ''}</span>${c.phone ? `<a class="num" href="tel:${esc(c.phone.replace(/[^\d+]/g,''))}" style="color:var(--info);white-space:nowrap">${esc(c.phone)}</a>` : ''}</div>`).join('')}${note.trim() ? `<div dir="auto" style="font-size:13px;white-space:pre-line;margin-top:6px">${esc(note.trim())}</div>` : ''}</div>`;
}
function needsBox(e){
  const items = LIVE_NEEDS.filter(n => (n.segment_ids || '').split(',').map(x => x.trim()).includes(e.id));
  if (!items.length) return '';
  const pod = items.find(n => n.kind === 'podium'), needs = items.filter(n => n.kind !== 'podium');
  const areas = needs.map(n => n.area || '').filter((v,i,a) => a.indexOf(v) === i);
  const extra = n => [n.qty, n.supplier].filter(Boolean).map(esc).join(' · ') + (n.notes ? `<span class="muted" style="font-size:12px"> · ${esc(n.notes)}</span>` : '');
  return `<div class="box" data-notr dir="auto"><h3>${t('siteNeeds')}${needs.length ? ` <span class="num">${needs.filter(n => n.done).length}/${needs.length}</span>` : ''}</h3>
    ${pod ? `<div class="mini"><span><b>${t('podium')}</b> · ${esc(pod.qty)}${pod.supplier ? ' · ' + esc(pod.supplier) : ''}${pod.notes ? `<span class="muted" style="font-size:12px"> · ${esc(pod.notes)}</span>` : ''}</span></div>` : ''}
    ${areas.map(a => (a ? `<div class="lbl" style="margin:8px 0 2px">${esc(a)}</div>` : '') + needs.filter(n => (n.area || '') === a).map(n => `<div class="todo"><input type="checkbox" id="sn-${esc(n.id)}" data-sn="${esc(n.id)}" ${n.done ? 'checked' : ''} ${isEdit() ? '' : 'disabled'}><label for="sn-${esc(n.id)}" style="${n.done ? 'text-decoration:line-through;color:var(--muted)' : ''}">${esc(n.item)}${n.qty || n.supplier || n.notes ? ' · ' : ''}${extra(n)}</label></div>`).join('')).join('')}
    ${needs.length ? `<div class="muted" style="font-size:12px;margin-top:6px">${t('needsNote')}</div>` : ''}</div>`;
}
function evFurn(e){ return LIVE_FURN.filter(f => (f.segment_ids || '').split(',').map(x => x.trim()).includes(e.id)); }
function furnBox(e){
  const items = evFurn(e);
  const add = isAdmin() ? `<form class="addrow" id="furnForm" style="margin-top:8px;flex-wrap:wrap"><label class="sr" for="fuItem">${t('furnItem')}</label><input id="fuItem" dir="auto" placeholder="${t('furnItem')}" style="flex:2;min-width:140px" required><label class="sr" for="fuQty">${t('qty')}</label><input id="fuQty" inputmode="numeric" placeholder="${t('qty')}" style="width:80px;flex:none"><label class="sr" for="fuSize">${t('furnSize')}</label><input id="fuSize" dir="auto" placeholder="${t('furnSize')}" style="flex:1;min-width:100px"><button class="btn sm" type="submit">${t('add')}</button></form>` : '';
  if (!items.length) return `<div class="box"><h3>${t('furniture')}</h3><div class="muted" style="font-size:13px">${t('furnNone')}</div>${add}</div>`;
  const setups = items.map(f => f.setup).filter((v,i,a) => a.indexOf(v) === i);
  return `<div class="box"><h3>${t('furniture')} <span class="num">${items.length}</span></h3>${setups.map(st => { const its = items.filter(f => f.setup === st), until = its[0].stays_until;
    return `<div class="lbl" style="margin:8px 0 2px" dir="auto">${esc(st)}${until ? ' · ' + esc(until) : ''}</div>` + its.map(f => `<div class="mini" dir="auto"><span>${esc(f.item)}${f.size ? ' · ' + esc(f.size) : ''}${f.notes ? `<span class="muted" style="font-size:12px"> · ${esc(f.notes)}</span>` : ''}</span>${isEdit() ? `<label class="sr" for="fq-${esc(f.id)}">${t('qty')} ${esc(f.item)}</label><input id="fq-${esc(f.id)}" data-fq="${esc(f.id)}" inputmode="numeric" value="${f.qty == null ? '' : f.qty}" placeholder="—" style="width:64px;min-height:30px;text-align:center">` : `<span class="num">${f.qty == null ? '—' : f.qty}</span>`}${f.qty_note ? `<span class="muted" style="font-size:12px">${esc(f.qty_note)}</span>` : ''}${isAdmin() && !String(f.id).startsWith('tmp') ? `<button class="del" type="button" data-fdelx="${esc(f.id)}" aria-label="${t('remove')} ${esc(f.item)}">✕</button>` : ''}</div>`).join(''); }).join('')}
    <div class="muted" style="font-size:12px;margin-top:6px">${t('furnNote')}</div>${add}</div>`;
}
let ROS_EDIT = null;
// "14:00 Doors" / "14:00-14:30 Panel" → [time, text]; lines without a time are notes
const rosRows = txt => (txt || '').split('\n').map(l => l.replace(/^[\s*•·-]+/, '').trim()).filter(Boolean).map(l => { const m = l.match(/^(\d{1,2}[:.]\d{2}(?:\s*[–-]\s*\d{1,2}[:.]\d{2})?)\s*(.*)$/); return m ? [m[1].replace(/\./g, ':').replace(/\s*[–-]\s*/, '–'), m[2]] : ['', l]; });
function rosBox(e){
  const editing = ROS_EDIT === e.id && isEdit(), rows = rosRows(e.ros);
  const btn = isEdit() ? `<button class="btn ghost sm" type="button" id="rosToggle">${editing ? t('rosDone') : t('rosEdit')}</button>` : '';
  const body = editing ? `<label class="sr" for="rosIn">${t('ros')}</label><textarea id="rosIn" dir="auto" style="min-height:220px" placeholder="${t('rosPh')}">${esc(e.ros)}</textarea>`
    : rows.length ? `<div class="ros" dir="${/[\u0590-\u05FF]/.test(e.ros) ? 'rtl' : 'ltr'}" data-notr>${rows.map(([tm, x]) => tm ? `<span class="tm" dir="ltr">${esc(tm)}</span><span>${esc(x)}</span>` : `<span class="full">${esc(x)}</span>`).join('')}</div>`
    : `<div class="muted" style="font-size:13px">${t('rosNone')}</div>`;
  return `<div class="box"><h3>${t('ros')} ${btn}</h3>${body}</div>`;
}
function openEvent(id){
  const e = D.ev.find(x => x.id === id); if (!e) return; SHEET = () => openEvent(id);
  const runs = D.runs.filter(r => r.day === e.day && near(r.t, e.s));
  const food = D.food.filter(f => f.day === e.day && near(f.t, e.s));
  const ops = D.ops.filter(o => o.day === evDayKey(e) && Math.abs(o.s - mins(e.s)) <= 90);
  const todos = evTodos(e.id);
  openSheet(`<div class="sh-h"><div><div class="lbl">${dayName(e.day)} · ${esc(e.s)}–${esc(e.e)}</div><h2>${esc(L(e,'title'))}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <div class="sh-b">
    <dl class="kv"><dt>${t('venue')}</dt><dd>${esc(L(e,'venue')||'Hotels')}${e.loc && !isView() ? `<div class="muted" style="font-size:12.5px;white-space:pre-line;margin-top:2px">${esc(e.loc)}</div>` : ''}</dd>
    ${!isView() ? `<dt>${t('status')}</dt><dd>${isEdit()?`<select id="evStatus">${['open','progress','confirmed'].map(s=>`<option value="${s}" ${s===e.status?'selected':''}>${t(s)}</option>`).join('')}</select>`:stChip(e.status)}</dd>` : ''}</dl>
    ${isView() ? `<div class="box"><h3>For guests</h3><div style="font-size:13.5px">Viewers see the public description, venue and times.</div></div>` : `
    ${rosBox(e)}
    <div class="box"><h3>${t('gettingThere')}</h3>${runs.length ? runs.map(r => `<div class="mini"><span>${fmt(mins(r.t))} · ${esc(L(r,'title'))}</span>${runChip(r.status)}</div>`).join('') : '<div class="muted" style="font-size:13px">No transfer around this time</div>'}</div>
    ${venueBox(e)}
    ${needsBox(e)}
    ${(() => { const dg = (D.day||[]).filter(g => g.sessions.includes(e.id)); return dg.length ? `<div class="box"><h3>${t('dgEv')} <span class="num">${dg.length}</span></h3>${dg.map(g => `<div class="mini"><span>${esc(g.name)}${g.desk ? ` <span class="muted" style="font-size:12px">· ${esc(g.desk)}</span>` : ''}</span>${g.note ? `<span class="muted" style="font-size:12px" dir="auto">${esc(g.note)}</span>` : ''}</div>`).join('')}</div>` : ''; })()}
    <div class="box"><h3>${t('food')}</h3>${food.length ? food.map(f => `<div class="mini"><span>${esc(f.t)} · ${esc(L(f,'title'))}${f.menu?' · menu ✓':''}</span>${stChip(f.status)}</div>` + (isAdmin() ? LIVE_QUOTES.filter(q => q.food_id === f.rid).map(q => `<div class="mini" data-notr dir="auto" style="font-size:12.5px"><span>${q.chosen ? '✓ ' : ''}<b>${esc(q.supplier)}</b> · ${esc(q.menu)}</span><span class="num muted">${esc(q.price)}</span></div>`).join('') : '')).join('') : '<div class="muted" style="font-size:13px">No catering linked</div>'}</div>
    <div class="box"><h3>${t('crewT')}</h3>${ops.length ? ops.map(o => `<div class="mini"><span>${fmt(o.s)} · ${esc(o.title)}</span>${o.crew.filter(c=>c.r===SMR||c.r==='Build lead').map(c => c.n==='?'?`<span class="chip bad">${t('noLead')}</span>`:`<span class="chip plain">${esc(c.n)}</span>`).join(' ')}</div>`).join('') : '<div class="muted" style="font-size:13px">No crew items linked</div>'}</div>
    <div class="box"><h3>${t('todos')} <span class="num">${todos.filter(x=>x.done).length}/${todos.length}</span></h3>
      ${todos.map(x => `<div class="todo"><input type="checkbox" id="td-${esc(x.id)}" data-todo="${esc(x.id)}" ${x.done?'checked':''} ${isEdit()?'':'disabled'}><label for="td-${esc(x.id)}" style="${x.done?'text-decoration:line-through;color:var(--muted)':''}">${esc(L(x,'text'))}</label>${isAdmin()?`<button class="del" type="button" data-deltodo="${esc(x.id)}" aria-label="Remove to-do">✕</button>`:''}</div>`).join('') || '<div class="muted" style="font-size:13px">No to-dos</div>'}
      ${isEdit()?`<form class="addrow" id="todoForm"><label class="sr" for="todoIn">New to-do</label><input id="todoIn" placeholder="Add a to-do"><button class="btn sm" type="submit">${t('add')}</button></form>`:''}</div>
    <div class="box"><h3>${t('av')}</h3>${isEdit()?`<label class="sr" for="avIn">AV brief</label><textarea id="avIn" dir="auto" style="min-height:180px" placeholder="Stage, sound, lighting, screens, welcome slide">${esc(e.av)}</textarea>`:`<div dir="auto" style="font-size:13.5px;white-space:pre-line">${esc(e.av)||'—'}</div>`}</div>
    ${furnBox(e)}
    <div class="box"><h3>${t('notes')}</h3>${isEdit()?`<label class="sr" for="noteIn">Notes</label><textarea id="noteIn" dir="auto" placeholder="Logistics or speaker notes">${esc(e.notes)}</textarea>`:`<div style="font-size:13.5px">${esc(e.notes)||'—'}</div>`}</div>
    <div class="box"><h3>${t('files')} ${isEdit()?`<button class="btn ghost sm" type="button" id="evAddFile">${t('addFile')}</button>`:''}</h3>${e.files.length ? e.files.map((f,i) => `<div class="mini"><span>${f.id ? `<a href="/api/files/download?id=${esc(f.id)}" target="_blank" rel="noopener" style="color:var(--info)">${esc(f.name)}</a>` : esc(f.name)}</span>${can.delFiles()?`<button class="linkbtn" type="button" data-delfile="${i}">Remove</button>`:''}</div>`).join('') : '<div class="muted" style="font-size:13px">No files yet. Dropped files that belong here are filed from the Inbox.</div>'}</div>`}
  </div>`);
  const sh = $('sheet');
  const st = sh.querySelector('#evStatus'); if (st) st.onchange = () => { e.status = st.value; send('segment/status', { id:e.id, status:st.value }); log('Set “' + e.title + '” to ' + st.value); commit(); };
  sh.querySelectorAll('[data-todo]').forEach(c => c.onchange = () => { const x = D.todos.find(y=>y.id===c.dataset.todo); x.done = c.checked; send('check/toggle', { id:x.rid, done:x.done }); log((c.checked?'Completed':'Reopened') + ' to-do “' + x.text + '”'); commit(); openEvent(id); });
  sh.querySelectorAll('[data-deltodo]').forEach(b => b.onclick = () => { const del = D.todos.find(y => y.id === b.dataset.deltodo); if (del && del.rid) send('check/delete', { id:del.rid }); D.todos = D.todos.filter(y => y.id !== b.dataset.deltodo); log('Removed a to-do from “' + e.title + '”'); commit(); openEvent(id); });
  const tf = sh.querySelector('#todoForm'); if (tf) tf.onsubmit = ev => { ev.preventDefault(); const v = $('todoIn').value.trim(); if (!v) return; D.todos.push({ id:'c'+Date.now(), ev:e.id, text:v, text_he:'', done:false }); send('check/add', { segment_id:e.id, text:v, by:NAME }); log('Added to-do “' + v + '”'); commit(); openEvent(id); setTimeout(() => $('todoIn') && $('todoIn').focus(), 0); };
  const rt = sh.querySelector('#rosToggle'); if (rt) rt.onclick = () => { const ta = sh.querySelector('#rosIn'); if (ta && ta.value !== e.ros) { e.ros = ta.value; send('segment/brief', { id:e.id, field:'brief_runsheet', value:ta.value }); log('Updated run of show for “' + e.title + '”'); commit(false); } ROS_EDIT = ROS_EDIT === e.id ? null : e.id; openEvent(id); if (ROS_EDIT) setTimeout(() => $('rosIn') && $('rosIn').focus(), 0); };
  const ri = sh.querySelector('#rosIn'); if (ri) ri.onchange = () => { e.ros = ri.value; send('segment/brief', { id:e.id, field:'brief_runsheet', value:ri.value }); log('Updated run of show for “' + e.title + '”'); commit(false); };
  const av = sh.querySelector('#avIn'); if (av) av.onchange = () => { e.av = av.value; send('segment/brief', { id:e.id, field:'brief_av', value:av.value }); log('Updated AV brief for “' + e.title + '”'); commit(false); };
  const ff = sh.querySelector('#furnForm'); if (ff) ff.onsubmit = ev => { ev.preventDefault(); const item = $('fuItem').value.trim(); if (!item) return; const qty = $('fuQty').value.replace(/[^\d]/g, ''), size = $('fuSize').value.trim(); const setup = (L(e,'venue') || '') + ' · ' + dayName(e.day);
    LIVE_FURN.push({ id:'tmp' + Date.now(), setup, segment_ids:e.id, item, qty:qty === '' ? null : +qty, size, notes:'', qty_note:'', stays_until:'' }); send('furniture/add', { segment_id:e.id, setup, item, qty, size }); log('Furniture · added ' + item + ' to “' + e.title + '”'); commit(); openEvent(id); setTimeout(() => $('fuItem') && $('fuItem').focus(), 0); };
  sh.querySelectorAll('[data-fdelx]').forEach(b => b.onclick = () => { const f = LIVE_FURN.find(x => x.id === b.dataset.fdelx); if (!f) return; const shared = (f.segment_ids || '').split(',').filter(Boolean).length > 1; if (!confirm(t('furnDel').replace('{i}', f.item) + (shared ? ' ' + t('furnShared') : ''))) return; LIVE_FURN = LIVE_FURN.filter(x => x !== f); send('furniture/delete', { id:f.id }); log('Furniture · removed ' + f.item); commit(); openEvent(id); });
  sh.querySelectorAll('[data-sn]').forEach(c => c.onchange = () => { const n = LIVE_NEEDS.find(x => x.id === c.dataset.sn); if (!n) return; n.done = c.checked ? 1 : 0; send('siteneed/field', { id:n.id, field:'done', value:n.done }); log('Site needs · ' + n.item + (n.done ? ' ✓' : ' ✗')); commit(false); openEvent(id); });
  sh.querySelectorAll('[data-fq]').forEach(inp => inp.onchange = () => { const f = LIVE_FURN.find(x => x.id === inp.dataset.fq); if (!f) return; const v = inp.value.replace(/[^\d]/g, ''); f.qty = v === '' ? null : +v; send('furniture/field', { id:f.id, field:'qty', value:v }); log('Furniture · ' + f.item + ': ' + (v || '—')); commit(false); });
  const nt = sh.querySelector('#noteIn'); if (nt) nt.onchange = () => { e.notes = nt.value; send('segment/notes', { id:e.id, notes:nt.value }); log('Updated notes for “' + e.title + '”'); commit(false); };
  const af = sh.querySelector('#evAddFile'); if (af) af.onclick = () => pickFiles(files => { [...files].forEach(f => { e.files.push({ name:f.name }); const fd = new FormData(); fd.append('file', f); fd.append('section', 'content'); fd.append('segment_id', e.id); fd.append('by', NAME); send('files/upload', fd); }); log('Attached ' + files.length + ' file(s) to “' + e.title + '”'); commit(); openEvent(id); });
  sh.querySelectorAll('[data-delfile]').forEach(b => b.onclick = () => { const fx = e.files[+b.dataset.delfile]; if (fx && fx.id) send('files/delete', { id:fx.id }); e.files.splice(+b.dataset.delfile, 1); log('Removed a file from “' + e.title + '”'); commit(); openEvent(id); });
}
function openAddSession(){
  openSheet(`<div class="sh-h"><div><div class="lbl">${t('program')}</div><h2>${t('addSession')}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <form class="sh-b" id="evForm">
    <label class="fld">Title<input id="nfTitle" required></label>
    <div class="row2"><label class="fld">Day<select id="nfDay">${[1,2,3].map(d=>`<option value="${d}" ${+S.tab.program===d?'selected':''}>${dayName(d)}</option>`).join('')}</select></label><label class="fld">${t('venue')}<input id="nfVenue"></label></div>
    <div class="row2"><label class="fld">Start<input id="nfS" type="time" value="10:00" required></label><label class="fld">End<input id="nfE" type="time" value="11:00" required></label></div>
    <div style="display:flex;gap:8px"><button class="btn" type="submit">${t('add')}</button><button class="btn ghost" type="button" data-close>${t('cancel')}</button></div>
  </form>`);
  $('evForm').onsubmit = ev => { ev.preventDefault(); const e = { id:'ev'+Date.now(), day:+$('nfDay').value, s:$('nfS').value, e:$('nfE').value, title:$('nfTitle').value.trim(), title_he:'', venue:$('nfVenue').value.trim(), venue_he:'', status:'open', av:'', notes:'', files:[] }; D.ev.push(e); send('segment/add', { day:e.day, time:e.s, end_time:e.e, title:e.title, venue:e.venue }); log('Added session “' + e.title + '”'); S.tab.program = String(e.day); closeSheet(); commit(); toast('Session added'); };
}

/* ============================ PEOPLE ============================ */
function viewPeople(){
  const tabs = [['guests',t('guests'),D.guests.length],...(LIVE?[['day',t('dayGuests'),D.day.length]]:[]),['crew',t('staff'),(TEAM_ROWS ? TEAM_ROWS.length : CREW.length+LEADERS.length)],['talent',t('talent'),D.talent.length],['fair',t('fair'),D.fair.length],['contacts',t('contacts'),D.contacts.length]].filter(x => isAdmin() || x[0] !== 'talent');
  if (!tabs.find(x=>x[0]===S.tab.people)) S.tab.people = 'guests';
  const tab = S.tab.people;
  let body = '';
  if (tab === 'guests') {
    const f = S.filter.guests;
    const list = D.guests.filter(g => f==='all' || (f.startsWith('h:') && atHotel(g, f.slice(2))) || (f==='nohotel' && !g.hotel) || (f==='diet' && g.dietary) || (f==='review' && g.review) || (f==='nopass' && !g.passport));
    const noH = D.guests.filter(g=>!g.hotel).length;
    body = `<div class="stats">
      <div class="panel stat"><div class="n num">${D.guests.length}</div><div class="s">Registered</div></div>
      <div class="panel stat"><div class="n num ${noH?'bad':''}">${noH}</div><div class="s">No hotel recorded</div></div>
      <div class="panel stat"><div class="n num">${D.guests.filter(g=>g.dietary).length}</div><div class="s">Dietary needs · ${D.guests.filter(g=>g.severe).length} severe</div></div>
      <div class="panel stat"><div class="n num">${isAdmin()?D.guests.filter(g=>!g.passport).length:'<span class="masked">•••</span>'}</div><div class="s">Missing passport${isAdmin()?'':' · admin only'}</div></div></div>
    <div class="bar"><div class="chips" role="group" aria-label="Filter guests">${[['all','All'],['nohotel','No hotel'],['diet','Dietary'],['review','Needs review'],...(isAdmin()?[['nopass','No passport']]:[])].map(([k,l]) => `<button type="button" class="fchip" data-gf="${k}" aria-pressed="${f===k}">${l}</button>`).join('')}</div>${isAdmin()?`<button class="btn ghost sm" type="button" data-go="inbox">Import spreadsheet</button>`:''}</div>
    <div class="chips" role="group" aria-label="${t('byHotel')}" style="margin:-4px 0 12px">${HOTELS.map(h => `<button type="button" class="fchip" data-gf="h:${esc(h)}" aria-pressed="${f==='h:'+h}">${esc(h)} <span class="num muted">${D.guests.filter(g => atHotel(g, h)).length}</span></button>`).join('')}</div>
    <div class="panel tbl-wrap"><table class="tbl"><thead><tr><th>Name</th><th>Desk</th><th>Hotel</th><th>Dietary</th>${isAdmin()?'<th>Passport</th>':''}<th></th></tr></thead><tbody>
      ${list.map(g => `<tr class="click" data-guest="${esc(g.id)}" tabindex="0"><td>${esc(g.name)}</td><td>${esc(g.desk)}</td><td>${g.hotel?esc(g.hotel):'<span style="color:var(--bad)">Not recorded</span>'}</td><td>${g.severe?`<span class="chip bad">${esc(g.dietary)}</span>`:esc(g.dietary)||'<span class="muted">—</span>'}</td>${isAdmin()?`<td>${g.passport?'<span class="chip good">On file</span>':'<span class="chip bad">Missing</span>'}</td>`:''}<td>${g.review?'<span class="chip info">Review</span>':''}</td></tr>`).join('')}
    </tbody></table></div>
    <p class="note">Editors see names, hotels and dietary needs. Passports, phones and emails stay admin only.</p>`;
  } else if (tab === 'day') {
    const evs = D.ev.filter(e => !/Break/i.test(e.title));
    body = `<div class="bar"><p class="note" style="margin:0;flex:1;min-width:220px">${t('dgNote')}</p>${isEdit()?`<button class="btn sm" type="button" id="addDay">${t('dgAdd')}</button>`:''}</div>
    <div class="panel tbl-wrap"><table class="tbl"><thead><tr><th>Name</th><th>${t('deskT')}</th><th>${t('sessionsT')}</th><th>${t('notes')}</th></tr></thead><tbody>
      ${D.day.map(g => `<tr class="click" data-dayg="${esc(g.id)}" tabindex="0"><td>${esc(g.name)}</td><td>${esc(g.desk)||'<span class="muted">—</span>'}</td><td>${g.sessions.length ? g.sessions.map(sid => { const e = evs.find(x => x.id === sid); return e ? `<span class="chip plain" style="margin:2px">${dayName(e.day).slice(0,3)} ${esc(e.s)} · ${esc(L(e,'title')).slice(0,34)}</span>` : ''; }).join('') : `<span class="chip bad">${t('noSession')}</span>`}</td><td dir="auto" style="font-size:13px">${esc(g.note)}</td></tr>`).join('') || `<tr><td colspan="4" class="muted">${t('dgNone')}</td></tr>`}
    </tbody></table></div>
    <p class="note">Editors see names and sessions. Emails and phones stay admin only.</p>`;
  } else if (tab === 'crew') {
    const f = S.filter.staff || 'all', lead = /^Hotel group leader · /;
    const rows = TEAM_ROWS || [...CREW.map(([n,r],i) => ({ id:'c'+i, name:n, role:r, org:'Production' })), ...LEADERS.map(([h,n],i) => ({ id:'l'+i, name:n, role:'Hotel group leader · ' + h, org:'Production' }))];
    const of = k => rows.filter(m => m.org === k);
    const groups = [['prod', t('prodCrew'), of('Production').filter(m => !lead.test(m.role))], ['prod', t('hotelLeaders'), of('Production').filter(m => lead.test(m.role))], ['jf', t('jfStaff'), of('Jerusalem Foundation')], ['board', t('board'), of('Jerusalem Foundation board')]];
    const canRole = !!LIVE && isAdmin();
    const row = (m, k) => { const shifts = k === 'prod' ? D.ops.filter(o => o.crew.some(c => c.n === m.name)).length : null;
      return `<div class="li" style="grid-template-columns:36px minmax(0,1fr) minmax(0,1.3fr) auto"><span class="av">${esc((m.name||'?')[0])}</span><span class="t">${k === 'prod' ? `<button type="button" class="linkbtn" data-crew="${esc(m.name)}" style="text-decoration:none;color:var(--ink);text-align:start;font:inherit">${esc(m.name)}</button>` : esc(m.name)}</span>${canRole ? `<label class="sr" for="role-${esc(m.id)}">${t('staffRole')} ${esc(m.name)}</label><input id="role-${esc(m.id)}" data-role="${esc(m.id)}" dir="auto" value="${esc(m.role)}" placeholder="${t('noRole')}" style="min-height:32px;padding:4px 8px;font-size:13px">` : `<span class="s" dir="auto">${esc(m.role) || '<span class="muted">—</span>'}</span>`}<span style="display:flex;gap:10px;align-items:center">${k === 'prod' && !!LIVE && isEdit() ? `<label class="sr" for="ph-${esc(m.id)}">${t('phoneT')} ${esc(m.name)}</label><input id="ph-${esc(m.id)}" data-tphone="${esc(m.id)}" type="tel" dir="ltr" value="${esc(m.phone)}" placeholder="${t('phoneT')}" style="width:130px;min-height:32px;padding:4px 8px;font-size:13px">${m.phone ? `<a href="tel:${esc(m.phone.replace(/[^\d+]/g,''))}" aria-label="${t('phoneT')} ${esc(m.name)}" style="color:var(--info);font-size:12.5px">${t('callT')}</a>` : ''}` : m.phone ? `<a class="num" href="tel:${esc(m.phone.replace(/[^\d+]/g,''))}" style="color:var(--info);font-size:12.5px;white-space:nowrap">${esc(m.phone)}</a>` : ''}${shifts !== null ? `<span class="muted num" style="font-size:12.5px;white-space:nowrap">${shifts} shifts</span>` : ''}${isAdmin() && LIVE ? `<button class="linkbtn" type="button" data-staffdel="${esc(m.id)}">${t('remove')}</button>` : ''}</span></div>`; };
    const chips = [['all', t('sfAll'), rows.length], ['prod', t('sfProd'), of('Production').length], ['jf', t('sfJF'), of('Jerusalem Foundation').length], ['board', t('sfBoard'), of('Jerusalem Foundation board').length]];
    const addForm = !!LIVE && isAdmin() ? `<section class="panel" style="padding:14px 16px;margin-top:14px"><div class="lbl" style="margin-bottom:8px">${t('addStaff')}</div><form id="staffForm" style="display:flex;gap:8px;flex-wrap:wrap"><label class="sr" for="stName">Name</label><input id="stName" placeholder="Name" style="flex:2;min-width:160px" required><label class="sr" for="stRole">${t('staffRole')}</label><input id="stRole" dir="auto" placeholder="${t('staffRole')}" style="flex:1;min-width:120px"><label class="sr" for="stOrg">${t('orgT')}</label><select id="stOrg">${[['Production', t('sfProd')], ['Jerusalem Foundation', t('sfJF')], ['Jerusalem Foundation board', t('sfBoard')]].map(([v,l]) => `<option value="${v}" ${(f==='jf'&&v==='Jerusalem Foundation')||(f==='board'&&v==='Jerusalem Foundation board')?'selected':''}>${l}</option>`).join('')}</select><button class="btn sm" type="submit">${t('add')}</button></form></section>` : '';
    body = `<div class="bar"><div class="chips" role="group" aria-label="${t('staff')}">${chips.map(([k,l,n]) => `<button type="button" class="fchip" data-sf="${k}" aria-pressed="${f===k}">${l} <span class="num muted">${n}</span></button>`).join('')}</div></div>
    ${groups.filter(([k,,xs]) => (f === 'all' || f === k) && (xs.length || k !== 'prod')).map(([k,h,xs]) => `<section class="panel" style="margin-bottom:14px"><div class="sec-h"><h2>${esc(h)} <span class="muted num" style="font-size:13px">${xs.length}</span></h2></div><div class="list">${xs.map(m => row(m, k)).join('') || '<div class="empty">—</div>'}</div></section>`).join('')}${addForm}`;
  } else if (tab === 'talent') {
    const lanes = [['contacted','Contacted'],['quote','Quote in'],['signed','Signed'],['invoiced','Invoiced']];
    const signed = D.talent.filter(x=>x.stage==='signed'||x.stage==='invoiced').length;
    body = `<div class="stats"><div class="panel stat"><div class="n num">${ils(D.talent.reduce((n,x) => n + (x.fee || 0), 0))}</div><div class="s">Total recorded fees</div></div><div class="panel stat"><div class="n num ${signed<D.talent.length?'bad':''}">${signed}/${D.talent.length}</div><div class="s">Contracts signed</div></div></div>
    <div class="kanban">${lanes.map(([k,l],li) => { const xs = D.talent.filter(x => x.stage === k); return `<div class="lane"><h3>${l}<span class="num">${xs.length}</span></h3>${xs.map(x => `<div class="kcard"><span>${esc(x.title)}</span><span class="s num">${ils(x.fee)}</span><div style="display:flex;gap:6px;flex-wrap:wrap">${li>0?`<button class="btn ghost sm" type="button" data-tmove="${esc(x.id)}" data-dir="-1" aria-label="Move back">←</button>`:''}${li<3?`<button class="btn ghost sm" type="button" data-tmove="${esc(x.id)}" data-dir="1">${lanes[li+1][1]} →</button>`:''}</div></div>`).join('')}</div>`; }).join('')}</div>
    <p class="note">Drop a quote, signed contract or invoice in the Inbox and the card moves by itself.</p>`;
  } else if (tab === 'fair') {
    body = `<div class="stats"><div class="panel stat"><div class="n num">${D.fair.length}</div><div class="s">Organizations</div></div><div class="panel stat"><div class="n num">${D.fair.filter(o=>o.contacted).length}</div><div class="s">Contacted</div></div><div class="panel stat"><div class="n num">${D.fair.filter(o=>o.confirmed).length}</div><div class="s">Confirmed · ${D.fair.length ? Math.round(D.fair.filter(o=>o.confirmed).length/D.fair.length*100) : 0}%</div></div><div class="panel stat"><div class="n num">${D.fair.filter(o=>o.power).length}</div><div class="s">Need a power point</div></div></div>
    ${(() => { const p = D.fair.length ? Math.round(D.fairForm / D.fair.length * 100) : 0; const cls = p>=80?'good':p>=40?'warn':'bad'; return `<section class="panel" style="padding:14px 16px;margin-bottom:14px;display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div style="min-width:0"><div class="lbl">Information form · Google Forms</div><div style="font-weight:500;margin-top:2px"><span class="num">${D.fairForm} of ${D.fair.length}</span> organizations have filled it in</div></div>
      <div style="display:flex;gap:8px;align-items:center">${isEdit() && !(!!LIVE)?`<label class="sr" for="formDone">Responses so far</label><input id="formDone" type="number" min="0" max="${D.fair.length}" value="${D.fairForm}" style="width:76px;min-height:34px">`:''}<a class="btn ghost sm" style="text-decoration:none" href="${FAIR_FORM_URL}" target="_blank" rel="noopener">Open responses ↗</a></div></div>
      <span class="track"><span class="fill ${cls}" style="width:${Math.max(p,2)}%"></span></span>
      <div class="s muted" style="font-size:12.5px"><span data-notr>${t('fairLeft').replace('{n}', D.fair.length - D.fairForm)}</span> <span>The form collects what we need from each organization for the fair at the Cinematheque.</span></div>${!!LIVE ? `<div class="s muted" style="font-size:12.5px">${t('fairFormNote')}</div>` : ''}</section>`; })()}
    ${fairTable()}`;
  } else {
    const f = S.filter.contacts;
    const list = D.contacts.filter(c => f==='all' || c.type===f);
    body = `<div class="bar"><div class="chips" role="group" aria-label="Filter contacts">${['all','Speaker','Foundation','Venue','Supplier','Crew'].filter(k => k === 'all' || k === 'Crew' || D.contacts.some(c => c.type === k)).map(k => `<button type="button" class="fchip" data-cf="${k}" aria-pressed="${f===k}">${k==='all'?'All':t('ct' + k)}</button>`).join('')}</div>${isEdit()?`<button class="btn sm" type="button" id="addContact">${t('add')}</button>`:''}</div>
    <div class="panel list">${list.map(c => `<div class="li" style="grid-template-columns:36px minmax(0,1fr) auto"><span class="av">${esc(c.name[0])}</span><span><div class="t">${esc(c.name)}</div><div class="s" dir="auto">${esc(t('ct' + c.type))} · ${esc(c.role)}${c.venue && c.type === 'Venue' ? ' · ' + esc(c.venue) : ''}${c.notes ? ' · ' + esc(c.notes) : ''}</div>${c.email ? `<div class="s" style="word-break:break-all"><a href="mailto:${esc(c.email.split(',')[0].trim())}" style="color:var(--muted)">${esc(c.email)}</a></div>` : ''}</span><span style="display:flex;gap:10px;align-items:center">${c.phone ? `<a class="muted num" style="font-size:12.5px;color:var(--muted)" href="tel:${esc(c.phone.replace(/[^\d+]/g,''))}">${esc(c.phone)}</a>` : ''}${can.delContacts()?`<button class="linkbtn" type="button" data-delc="${esc(c.id)}">Remove</button>`:''}</span></div>`).join('') || '<div class="empty">No contacts</div>'}</div>
    `;
  }
  return `<div class="page-h"><div><div class="lbl">${t('people')}</div><h1>${t('peopleH')}</h1></div></div>
  <div class="tabs" role="tablist">${tabs.map(([k,l,n]) => `<button role="tab" type="button" data-t="people" data-k="${k}" aria-selected="${tab===k}">${l}<span class="c num">${n}</span></button>`).join('')}</div>${body}`;
}
function openGuest(id){
  const g = D.guests.find(x => x.id === id); if (!g) return; SHEET = () => openGuest(id);
  const sess = D.ev.filter(e => !/Break|optional/i.test(e.title));
  openSheet(`<div class="sh-h"><div><div class="lbl">${esc(g.desk)} desk</div><h2>${esc(g.name)}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <div class="sh-b">
    <div class="row2"><label class="fld">Hotel<select id="gHotel" ${isEdit()?'':'disabled'}><option value="">Not recorded</option>${[...HOTELS,'Own arrangement'].map(h => `<option ${h===g.hotel || (h!=='Own arrangement' && atHotel(g, h))?'selected':''}>${esc(h)}</option>`).join('')}</select></label>
    <label class="fld">Dietary<input id="gDiet" value="${esc(g.dietary)}" ${isEdit()?'':'disabled'} placeholder="None recorded"></label></div>
    <label class="todo"><input type="checkbox" id="gSev" ${g.severe?'checked':''} ${isEdit()?'':'disabled'}> Severe allergy · tell every caterer</label>
    <div class="box"><h3>Contact & travel documents</h3>${isAdmin() ? `<dl class="kv"><dt>Email</dt><dd>${esc(g.email)||'<span class="muted">—</span>'}</dd><dt>Phone</dt><dd class="num">${esc(g.phone)||'<span class="muted">—</span>'}</dd><dt>Passport</dt><dd>${g.passport?'<span class="chip good">On file</span>':'<span class="chip bad">Missing · needed for VAT</span>'}</dd></dl>` : '<div class="ro">Admin only</div>'}</div>
    <div class="box"><h3>${t('booking')}</h3>${g.hotel || g.cin ? `<dl class="kv" style="margin-bottom:8px">${g.room?`<dt>${t('roomT')}</dt><dd dir="auto">${esc(g.room)}</dd>`:''}<dt>${t('checkIn')}</dt><dd class="num">${g.cin?ddmm(g.cin):'—'}</dd><dt>${t('checkOut')}</dt><dd class="num">${g.cout?ddmm(g.cout):'—'}</dd></dl>` : ''}
      <div class="row2"><label class="fld">${t('conf')}<input id="gConf" dir="auto" value="${esc(g.conf)}" placeholder="${t('confPh')}" ${isEdit()?'':'disabled'}></label><label class="fld">${t('earlyLate')}<input id="gEarly" dir="auto" value="${esc(g.early)}" placeholder="${t('earlyPh')}" ${isEdit()?'':'disabled'}></label></div></div>
    <div class="box"><h3>Sessions <span class="num">${g.sessions.length}</span></h3>${g.sessions.length ? g.sessions.map(id => sess.find(e => e.id === id) || D.ev.find(e => e.id === id)).filter(Boolean).sort((a,b) => a.day - b.day || mins(a.s) - mins(b.s)).map(e => `<div class="mini"><span>${esc(dayName(e.day))} ${esc(e.s)} · ${esc(L(e,'title'))}</span></div>`).join('') : '<div class="muted" style="font-size:13px">No sessions recorded for this guest.</div>'}<div class="muted" style="font-size:12px;margin-top:4px">Sessions are recorded per guest in the classic dashboard (Guests).</div></div>
    ${g.review ? `<div class="box" style="border-color:var(--info)"><h3>Flagged in the last import</h3><div style="font-size:13.5px">Details changed in the registration sheet.</div>${isEdit()?'<button class="btn ghost sm" type="button" id="gClear">Reviewed · clear flag</button>':''}</div>` : ''}
  </div>`);
  const sh = $('sheet');
  const hs = sh.querySelector('#gHotel'); hs.onchange = () => { g.hotel = hs.value; send('guest/field', { id:g.rid, field:'hotel', value:hs.value }); log('Set hotel for ' + g.name + ' to ' + (g.hotel||'none')); commit(); };
  const di = sh.querySelector('#gDiet'); di.onchange = () => { g.dietary = di.value.trim(); send('guest/field', { id:g.rid, field:'dietary', value:g.dietary }); log('Updated dietary needs for ' + g.name); commit(); };
  const gcf = sh.querySelector('#gConf'); gcf.onchange = () => { g.conf = gcf.value.trim(); send('guest/field', { id:g.rid, field:'booking_conf', value:g.conf }); log('Hotel confirmation for ' + g.name + ': ' + (g.conf||'—')); commit(false); };
  const gel = sh.querySelector('#gEarly'); gel.onchange = () => { g.early = gel.value.trim(); send('guest/field', { id:g.rid, field:'early_late', value:g.early }); log('Early/late check-in for ' + g.name + ': ' + (g.early||'—')); commit(false); };
  const sv = sh.querySelector('#gSev'); sv.onchange = () => { g.severe = sv.checked; send('guest/flag', { id:g.rid, field:'dietary_severe', value:sv.checked }); log((sv.checked?'Marked':'Unmarked') + ' severe allergy for ' + g.name); commit(); };
  const gc = sh.querySelector('#gClear'); if (gc) gc.onclick = () => { g.review = false; send('guest/flag', { id:g.rid, field:'needs_review', value:false }); log('Cleared review flag for ' + g.name); commit(); openGuest(id); };
}
function openDayGuest(id){
  const g = id ? D.day.find(x => x.id === id) : null; if (id && !g) return; SHEET = id ? () => openDayGuest(id) : null;
  const evs = D.ev.filter(e => !/Break/i.test(e.title)).slice().sort((a,b) => a.day - b.day || a.s.localeCompare(b.s));
  const sel = g ? g.sessions : [], ro = isEdit() ? '' : 'disabled';
  openSheet(`<div class="sh-h"><div><div class="lbl">${t('dayGuests')}</div><h2>${g ? esc(g.name) : t('dgAdd')}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <form class="sh-b" id="dgForm">
    <div class="row2"><label class="fld">${t('firstName')}<input id="dgFirst" value="${esc(g?g.first:'')}" required ${ro}></label><label class="fld">${t('lastName')}<input id="dgLast" value="${esc(g?g.last:'')}" ${ro}></label></div>
    <label class="fld">${t('deskT')}<input id="dgDesk" value="${esc(g?g.desk:'')}" ${ro}></label>
    ${isAdmin() ? `<div class="row2"><label class="fld">Email<input id="dgEmail" type="email" value="${esc(g?g.email:'')}"></label><label class="fld">Phone<input id="dgPhone" value="${esc(g?g.phone:'')}"></label></div>` : ''}
    <div class="box"><h3>${t('sessionsT')} <span class="num">${sel.length}</span></h3>${evs.map(e => `<div class="todo"><input type="checkbox" id="dgs-${esc(e.id)}" data-dgs="${esc(e.id)}" ${sel.includes(e.id)?'checked':''} ${ro}><label for="dgs-${esc(e.id)}">${dayName(e.day)} ${esc(e.s)} · ${esc(L(e,'title'))}</label></div>`).join('')}</div>
    <label class="fld">${t('notes')}<textarea id="dgNote" dir="auto" ${ro}>${esc(g?g.note:'')}</textarea></label>
    ${isEdit() ? `<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" type="submit">${g ? t('save') : t('add')}</button>${g && isAdmin() ? `<button class="btn ghost" type="button" id="dgDel" style="color:var(--bad)">${t('remove')}</button>` : ''}</div>` : ''}
  </form>`);
  const sh = $('sheet');
  sh.querySelector('#dgForm').onsubmit = ev => { ev.preventDefault(); if (!isEdit()) return;
    const v = { first_name:$('dgFirst').value.trim(), last_name:$('dgLast').value.trim(), desk:$('dgDesk').value.trim(), sessions:[...sh.querySelectorAll('[data-dgs]:checked')].map(c => c.dataset.dgs).join(','), note:$('dgNote').value.trim() };
    if (isAdmin()) { v.email = $('dgEmail').value.trim(); v.phone = $('dgPhone').value.trim(); }
    if (!v.first_name) return;
    const name = [v.first_name, v.last_name].filter(Boolean).join(' ');
    if (g) { Object.keys(v).forEach(k => { const old = { first_name:g.first, last_name:g.last, desk:g.desk, sessions:g.sessions.join(','), note:g.note, email:g.email, phone:g.phone }[k]; if (old !== v[k]) send('dayguest/field', { id:g.rid, field:k, value:v[k] }); });
      Object.assign(g, { first:v.first_name, last:v.last_name, name, desk:v.desk, sessions:v.sessions.split(',').filter(Boolean), note:v.note }); if (isAdmin()) Object.assign(g, { email:v.email, phone:v.phone }); log('Day guests · updated ' + name); }
    else { D.day.push({ id:'dgtmp' + Date.now(), first:v.first_name, last:v.last_name, name, desk:v.desk, email:v.email||'', phone:v.phone||'', sessions:v.sessions.split(',').filter(Boolean), note:v.note }); send('dayguest/add', v); log('Day guests · added ' + name); }
    closeSheet(); commit(); };
  const dd = sh.querySelector('#dgDel'); if (dd) dd.onclick = () => { if (!confirm(t('dgDel').replace('{n}', g.name))) return; D.day = D.day.filter(x => x !== g); send('dayguest/delete', { id:g.rid }); log('Day guests · removed ' + g.name); closeSheet(); commit(); };
}
function openAddContact(){
  openSheet(`<div class="sh-h"><div><div class="lbl">${t('contacts')}</div><h2>New contact</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <form class="sh-b" id="cForm"><label class="fld">Name<input id="cName" required></label><div class="row2"><label class="fld">Type<select id="cType"><option>Venue</option><option>Supplier</option><option>Crew</option></select></label><label class="fld">Role<input id="cRole"></label></div>
  <div style="display:flex;gap:8px"><button class="btn" type="submit">${t('add')}</button><button class="btn ghost" type="button" data-close>${t('cancel')}</button></div></form>`);
  $('cForm').onsubmit = ev => { ev.preventDefault(); { const nm = $('cName').value.trim(); send('contact/add', { name:nm, role:$('cRole').value.trim(), venue:$('cType').value === 'Venue' ? nm : '', by:NAME }); } D.contacts.push({ id:'k'+Date.now(), name:$('cName').value.trim(), type:$('cType').value, role:$('cRole').value.trim() }); log('Added contact ' + $('cName').value.trim()); closeSheet(); commit(); };
}

function quotesPanel(){
  if (!isAdmin() || !LIVE_QUOTES.length) return '';
  const linked = q => D.food.some(f => f.rid === q.food_id);
  const groups = D.food.map(f => [L(f,'title') + ' · ' + dayName(f.day) + ' ' + f.t, LIVE_QUOTES.filter(q => q.food_id === f.rid)]).concat([[t('qUnlinked'), LIVE_QUOTES.filter(q => !linked(q))]]).filter(g => g[1].length);
  return `<section class="panel" style="padding:14px 16px;margin-top:14px"><div class="sec-h" style="padding:0;margin-bottom:6px"><h2>${t('quotesT')} <span class="muted num" style="font-size:13px">${LIVE_QUOTES.length}</span></h2></div><p class="note" style="margin:0 0 10px">${t('quotesNote')}</p>
    ${groups.map(([label, qs]) => `<div class="lbl" style="margin:12px 0 6px">${esc(label)}</div><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${t('qChosen')}</th><th>${t('qSupplier')}</th><th>${t('qMenu')}</th><th>${t('qPrice')}</th><th>${t('qLinens')}</th><th>${t('qDishes')}</th></tr></thead><tbody data-notr>${qs.map(q => `<tr><td><input type="checkbox" data-qchosen="${esc(q.id)}" ${q.chosen?'checked':''} aria-label="${t('qChosen')} ${esc(q.supplier)}" style="width:18px;height:18px;min-height:0;accent-color:var(--good)"></td><td dir="auto"><b>${esc(q.supplier)}</b>${q.note?`<div class="muted" style="font-size:12px">${esc(q.note)}</div>`:''}</td><td dir="auto">${esc(q.menu)}</td><td dir="auto" class="num">${esc(q.price)}</td><td dir="auto" style="font-size:12.5px">${esc(q.linens)}</td><td dir="auto" style="font-size:12.5px">${esc(q.dishes)}</td></tr>`).join('')}</tbody></table></div>`).join('')}</section>`;
}
/* ---- live driver map (Logistics → Map): positions shared from the driver page ---- */
let DMAP = null, DMAP_EL = null, DRV_POS = [], DRV_MARK = {}, DRV_TIMER = null, DRV_FIT = false;
const drvAge = p => { const fix = p.fix_at ? Date.parse(p.fix_at) : NaN, at = Date.parse(String(p.at).replace(' ', 'T') + 'Z'); return Math.max(0, (Date.now() - (Number.isFinite(fix) ? fix : at)) / 60000); };
const drvActive = () => DRV_POS.filter(p => p.sharing && drvAge(p) < 10);
const drvRun = p => { const r = D.runs.find(x => x.rid === p.run_id); return r ? fmt(mins(r.t)) + ' · ' + L(r,'title') : ''; };
const drvWhen = m => m < 1 ? t('drvJustNow') : t('drvMinAgo').replace('{n}', Math.round(m));
function drvState(p){ const m = drvAge(p); return !p.sharing ? 'stopped' : m < 3 ? 'live' : m < 10 ? 'late' : 'old'; }
function drvListHtml(){
  if (!DRV_POS.length) return `<div class="li"><span class="muted" style="font-size:13px">${t('drvNoneYet')}</span></div>`;
  return DRV_POS.map(p => { const st = drvState(p); return `<button type="button" class="li" data-drvfocus="${esc(p.device)}" style="grid-template-columns:minmax(0,1fr) auto"><span style="min-width:0"><div class="t" dir="auto">${esc(p.name || t('drvNoName'))}</div><div class="s" dir="auto">${esc(drvRun(p) || '—')} · ${drvWhen(drvAge(p))}${p.speed != null && st === 'live' ? ' · ' + Math.round(p.speed * 3.6) + ' km/h' : ''}</div></span><span class="chip ${st === 'live' ? 'good' : st === 'late' ? 'warn' : 'plain'}">${t('drvSt_' + st)}</span></button>`; }).join('');
}
function viewDriverMap(){
  return `<div id="mapSlot" class="panel" style="height:62vh;min-height:340px;overflow:hidden;padding:0;margin-top:14px"></div>
  <div class="panel list" id="drvList" style="margin-top:12px">${drvListHtml()}</div>
  <p class="note">${t('drvMapNote')}</p>`;
}
function loadLeaflet(){
  if (window.L && window.L.map) return Promise.resolve();
  return new Promise((res, rej) => { const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = '/vendor/leaflet/leaflet.css'; document.head.appendChild(css);
    const sc = document.createElement('script'); sc.src = '/vendor/leaflet/leaflet.js'; sc.onload = res; sc.onerror = rej; document.head.appendChild(sc); });
}
async function mountMap(){
  const slot = $('mapSlot'); if (!slot) return;
  if (!DMAP_EL) { DMAP_EL = document.createElement('div'); DMAP_EL.style.cssText = 'width:100%;height:100%'; }
  slot.appendChild(DMAP_EL);
  if (!DRV_TIMER) DRV_TIMER = setInterval(() => { if (S.area === 'logistics' && S.tab.logistics === 'map' && document.visibilityState === 'visible') refreshDrivers(); }, 20000);
  refreshDrivers();
  try { await loadLeaflet(); } catch(e){ slot.innerHTML = `<div class="empty">${t('drvMapFail')}</div>`; return; }
  if (!$('mapSlot')) return;
  const LF = window.L;
  if (!DMAP) { DMAP = LF.map(DMAP_EL, { zoomControl:true }).setView([31.7767, 35.2234], 13);
    LF.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'&copy; OpenStreetMap' }).addTo(DMAP); }
  setTimeout(() => DMAP.invalidateSize(), 0);
  drawDrivers();
}
async function refreshDrivers(){ try { DRV_POS = (await api('drivers/positions')).positions || []; } catch(e){ return; } drawDrivers(); const l = $('drvList'); if (l) { l.innerHTML = drvListHtml(); bindDrvList(); } }
function bindDrvList(){ document.querySelectorAll('[data-drvfocus]').forEach(b => b.onclick = () => { const m = DRV_MARK[b.dataset.drvfocus]; if (m && DMAP) { DMAP.setView(m.getLatLng(), 16); m.openPopup(); } }); }
function drawDrivers(){
  if (!DMAP) return; const LF = window.L, seen = {};
  DRV_POS.forEach(p => { seen[p.device] = 1; const st = drvState(p);
    const icon = LF.divIcon({ className:'', iconSize:null, html:`<div class="drvpin ${st}"><span dir="auto">${esc(p.name || t('drvNoName'))}</span></div>` });
    const pop = `<b dir="auto">${esc(p.name || t('drvNoName'))}</b><br><span dir="auto">${esc(drvRun(p) || '')}</span><br>${drvWhen(drvAge(p))}${p.accuracy ? ' · ±' + Math.round(p.accuracy) + ' m' : ''}`;
    if (DRV_MARK[p.device]) { DRV_MARK[p.device].setLatLng([p.lat, p.lng]).setIcon(icon).setPopupContent(pop); }
    else DRV_MARK[p.device] = LF.marker([p.lat, p.lng], { icon }).addTo(DMAP).bindPopup(pop); });
  Object.keys(DRV_MARK).forEach(k => { if (!seen[k]) { DMAP.removeLayer(DRV_MARK[k]); delete DRV_MARK[k]; } });
  if (!DRV_FIT && DRV_POS.length) { DRV_FIT = true; DMAP.fitBounds(LF.latLngBounds(DRV_POS.map(p => [p.lat, p.lng])).pad(0.3), { maxZoom:15 }); }
}
/* ============================ LOGISTICS ============================ */
function viewLogistics(){
  const tab = S.tab.logistics;
  const tabs = [['ops',t('ops'),D.ops.length],['transport',t('transport'),D.runs.length],['food',t('food'),D.food.length]].concat(LIVE && !isView() ? [['map',t('mapTab'),DRV_POS.length ? drvActive().length : null]] : []);
  let body = '';
  if (tab === 'ops') body = viewOps();
  else if (tab === 'map' && LIVE && !isView()) body = viewDriverMap();
  else if (tab === 'transport') {
    body = [1,2,3].map(d => `<div class="lbl" style="margin:14px 0 8px">${dayName(d)}</div><div class="panel list">${D.runs.filter(r=>r.day===d).map(r => `<div class="li"><span class="time num">${fmt(mins(r.t))}</span><button type="button" class="linkbtn" style="text-decoration:none;color:var(--ink);text-align:start" data-run-open="${esc(r.id)}"><span class="t">${esc(L(r,'title'))}</span></button>${can.transport() ? `<button type="button" class="chipbtn" data-run="${esc(r.id)}" aria-label="Change status">${runChip(r.status)}</button>` : runChip(r.status)}</div>`).join('')}</div>`).join('') + `<p class="note">Click a status to cycle it; click a run to see pickups per hotel.</p>`;
  } else {
    const byNeed = {}; D.guests.filter(g=>g.dietary).forEach(g => { byNeed[g.dietary] = (byNeed[g.dietary]||0) + 1; });
    body = `<section class="panel" style="padding:14px 16px;margin-bottom:14px"><div class="lbl" style="margin-bottom:8px">Dietary · from the guest registry</div><div class="chips">${Object.keys(byNeed).sort().map(k => `<span class="chip ${D.guests.some(g=>g.dietary===k&&g.severe)?'bad':'plain'}">${esc(k)} · ${byNeed[k]}</span>`).join('')}</div></section>` +
      [1,2,3].map(d => `<div class="lbl" style="margin:14px 0 8px">${dayName(d)}</div><div class="panel list">${D.food.filter(f=>f.day===d).map(f => `<div class="li"><span class="time num">${esc(f.t)}</span><span><div class="t">${esc(L(f,'title'))}</div>${f.menu?'<div class="s" style="color:var(--good)">Menu on file · read by AI</div>':''}${isAdmin() && LIVE_QUOTES.some(q => q.food_id === f.rid) ? `<div class="s" data-notr dir="auto">${LIVE_QUOTES.filter(q => q.food_id === f.rid).map(q => (q.chosen ? '✓ ' : '') + esc(q.supplier)).join(' · ')}</div>` : ''}</span>${isEdit()?`<button type="button" class="chipbtn" data-food="${esc(f.id)}" aria-label="Change status">${stChip(f.status)}</button>`:stChip(f.status)}</div>`).join('')}</div>`).join('') + quotesPanel();
  }
  return `<div class="page-h"><div><div class="lbl">${t('logistics')}</div><h1>${t('logH')}</h1></div></div>
  <div class="tabs" role="tablist">${tabs.map(([k,l,n]) => `<button role="tab" type="button" data-t="logistics" data-k="${k}" aria-selected="${tab===k}">${l}${n == null ? '' : `<span class="c num">${n}</span>`}</button>`).join('')}</div>${body}`;
}
function openRun(id){
  const r = D.runs.find(x => x.id === id); if (!r) return; SHEET = () => openRun(id);
  const stops = (LIVE && LIVE.run_stops || []).filter(x => x.run_id === r.rid).sort((a,b) => a.sort_order - b.sort_order);
  const date = '2026-10-' + String(19 + r.day);
  const staying = h => D.guests.filter(g => atHotel(g, h) && g.cin && g.cout && g.cin <= date && g.cout >= date).length;
  const byHotel = stops.filter(x => x.hotel_match).map(x => [x.hotel_match, staying(x.hotel_match), (LEADERS.find(l => hk(l[0]) === hk(x.hotel_match))||[])[1], x.time]);
  const fromHotels = byHotel.length > 0;
  openSheet(`<div class="sh-h"><div><div class="lbl">${dayName(r.day)} · ${fmt(mins(r.t))}</div><h2>${esc(L(r,'title'))}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <div class="sh-b"><dl class="kv"><dt>${t('status')}</dt><dd>${runChip(r.status)}</dd><dt>${t('drvDriver')}</dt><dd class="${r.driver || r.vehicles ? '' : 'muted'}" dir="auto">${r.driver || r.vehicles || r.company ? esc([r.vehicles, r.company, r.driver, r.driver_phone].filter(Boolean).join(' · ')) : t('drvNone')}</dd></dl>
  ${fromHotels ? `<div class="box"><h3>Pickups by hotel</h3>${byHotel.map(([h,n,l,tm]) => `<div class="mini"><span>${esc(tm)} · ${esc(h)}${l?' · group leader '+esc(l):''}</span><span class="num">${n} staying</span></div>`).join('')}<div class="muted" style="font-size:12px">“Staying” = active guests registered at that hotel on ${esc(ddmm(date))} (check-in to check-out). It is not an RSVP for this ride.</div><div class="mini" style="color:var(--bad)"><span>No hotel recorded</span><span class="num">${D.guests.filter(g=>!g.hotel).length} not on any manifest</span></div></div>` : '<div class="box"><h3>Passengers</h3><div style="font-size:13.5px">This run has no hotel pickups recorded.</div></div>'}
  <div class="box"><h3>${t('drvApp')}</h3>${isEdit() ? `<label class="lbl" for="rdNote">${t('drvNote')}</label><textarea id="rdNote" dir="auto" data-rdf="driver_note" style="min-height:70px" placeholder="${t('drvNotePh')}">${esc(r.driver_note)}</textarea>
    <label class="lbl" for="rdDrop" style="margin-top:8px;display:block">${t('drvDrop')}</label><input id="rdDrop" dir="auto" data-rdf="dropoff" value="${esc(r.dropoff)}" placeholder="${t('drvDropPh')}">
    <label class="lbl" for="rdUrl" style="margin-top:8px;display:block">${t('drvDropUrl')}</label><input id="rdUrl" dir="ltr" inputmode="url" data-rdf="dropoff_url" value="${esc(r.dropoff_url)}" placeholder="https://waze.com/ul?ll=…">
    <div class="muted" style="font-size:12px;margin-top:6px">${t('drvHint')}</div>`
    : `<div dir="auto" style="font-size:13.5px;white-space:pre-line">${esc(r.driver_note) || '—'}</div>${r.dropoff || r.dropoff_url ? `<div class="mini" dir="auto"><span>${esc(r.dropoff)}</span>${/^https?:\/\//i.test(r.dropoff_url) ? `<a href="${esc(r.dropoff_url)}" target="_blank" rel="noopener" style="color:var(--info)">${t('drvMap')}</a>` : ''}</div>` : ''}`}</div>
  <button class="btn ghost" type="button" data-go="print">Driver sheet in the Print center</button></div>`);
  $('sheet').querySelector('[data-go]').onclick = () => go('print');
  $('sheet').querySelectorAll('[data-rdf]').forEach(el => el.onchange = () => { const f = el.dataset.rdf, v = el.value.trim(); if (f === 'dropoff_url' && v && !/^https?:\/\//i.test(v)) { toast(t('drvBadUrl')); return; } r[f] = v; send('run/field', { id:r.rid, field:f, value:v }); log('Transport ' + fmt(mins(r.t)) + ' · ' + t(f === 'driver_note' ? 'drvNote' : f === 'dropoff' ? 'drvDrop' : 'drvDropUrl')); commit(false); });
}
/* ---- crew schedule (the four Operations views) ---- */
function crewLabel(c){ return c.n === '?' ? c.r + ' ?' : /^\d/.test(c.n) ? c.n + ' ' + c.r : c.n; }
function viewOps(){
  const f = S.filter.ops;
  const dk = S.clock.day;
  const list = D.ops.filter(o => o.day === dk).filter(o => f==='all' || (f==='crew' && o.kind!=='guest') || (f==='guest' && o.kind==='guest') || (f==='open' && (o.flag || o.crew.some(c=>c.n==='?')))).sort((a,b)=>a.s-b.s);
  const views = [['sheet',t('runsheet')],['sites',t('sites')],['timeline',t('timeline')],['me',t('myday')]];
  let v = '';
  if (S.opsView === 'sheet') {
    v = list.length ? `<div class="panel list">${list.map(o => { const st = opStatus(o); return `<button type="button" class="li ${st==='past'||st==='done'?'past':''}" data-op="${esc(o.id)}" style="${st==='live'?'box-shadow:inset 3px 0 0 var(--good)':''}"><span class="time num">${fmt(o.s)}</span><span style="min-width:0"><div class="t" style="display:flex;gap:8px;align-items:center"><span class="dot k-${o.kind}"></span>${esc(o.title)}</div>${o.flag?`<div class="s" style="color:var(--bad);font-weight:500;display:flex;gap:5px;align-items:center">${flagIcon}${esc(o.flag)}</div>`:`<div class="s">${esc(o.site)} · until ${fmt(o.e)}</div>`}</span><span style="display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end;max-width:260px">${st==='live'?`<span class="chip good">● ${t('live')}</span>`:st==='done'?`<span class="chip plain">${t('done')}</span>`:''}${o.crew.map(c => `<span class="chip ${c.n==='?'?'bad':'plain'}">${esc(crewLabel(c))}</span>`).join('')}</span></button>`; }).join('')}</div>` : '<div class="panel empty">Nothing matches.</div>';
  } else if (S.opsView === 'sites') {
    const by = {}; list.forEach(o => (by[o.site] = by[o.site] || []).push(o));
    v = `<div class="cards">${Object.keys(by).map(site => { const xs = by[site]; const leads = [...new Set(xs.flatMap(o => o.crew.filter(c=>c.r===SMR&&c.n!=='?').map(c=>c.n)))]; const gap = xs.some(o => o.crew.some(c=>c.n==='?')); const runners = xs.reduce((s,o) => s + o.crew.filter(c=>/^\d/.test(c.n)&&/assistant producer/i.test(c.r)).reduce((a,c)=>a+ +c.n,0), 0); const live = xs.some(o => opStatus(o)==='live');
      return `<article class="panel card ${gap?'gap':''}"><div class="mini"><span class="muted num">${fmt(Math.min(...xs.map(o=>o.s)))}–${fmt(Math.max(...xs.map(o=>o.e)))}</span>${live?`<span class="chip good">● ${t('live')}</span>`:''}</div><h3>${esc(site)}</h3>
      <dl class="kv"><dt>${SMR}</dt><dd style="${leads.length?'font-weight:500':'color:var(--bad);font-weight:700'}">${leads.length?esc(leads.join(', ')):'Unassigned'}${leads.length&&gap?' <span style="color:var(--bad)">+ gap</span>':''}</dd><dt>Assistant producers</dt><dd class="num">${runners||'—'}</dd></dl>
      <div class="list" style="border-top:1px solid var(--line)">${xs.map(o => `<button type="button" class="li" data-op="${esc(o.id)}" style="padding:7px 0;grid-template-columns:54px minmax(0,1fr)"><span class="muted num" style="font-size:12.5px">${fmt(o.s)}</span><span style="font-size:13px">${esc(o.title)}${o.flag?' <span style="color:var(--bad)">•</span>':''}</span></button>`).join('')}</div></article>`; }).join('') || '<div class="panel empty">Nothing matches.</div>'}</div>`;
  } else if (S.opsView === 'timeline') {
    const START = 360, SPAN = 1440, pct = m => ((m - START) / SPAN * 100);
    const sites = [...new Set(list.map(o => o.site))];
    const col = { setup:'var(--setup)', guest:'var(--guest)', move:'var(--move)', strike:'var(--strike)' };
    const ticks = []; for (let m = START; m <= START + SPAN; m += 180) ticks.push(`<span class="tick num" style="left:${pct(m)}%">${fmt(m)}</span>`);
    const nowL = S.clock.now >= START ? `<div class="nowline" style="left:${pct(S.clock.now)}%"></div>` : '';
    const mid = `<div class="midnight" style="left:${pct(1440)}%"></div>`;
    v = sites.length ? `<div class="panel tl" dir="ltr"><div class="tl-in"><div class="tl-row tl-axis"><div class="tl-lab lbl">Site</div><div class="tl-track">${ticks.join('')}${mid}</div></div>${sites.map(site => { const xs = list.filter(o=>o.site===site); const lanes = []; const place = xs.map(o => { let i = lanes.findIndex(e => e <= o.s); if (i < 0) { i = lanes.length; lanes.push(0); } lanes[i] = o.e; return [o, i]; }); const n = lanes.length; const lead = [...new Set(xs.flatMap(o=>o.crew.filter(c=>c.r===SMR&&c.n!=='?').map(c=>c.n)))].join(', ');
      return `<div class="tl-row"><div class="tl-lab">${esc(site)}<small>${lead?esc(lead):`<span style="color:var(--bad)">${t('noLead')}</span>`}</small></div><div class="tl-track" style="height:${n>1?18+n*24:58}px">${mid}${nowL}${place.map(([o,i]) => { const st = opStatus(o); const gap = o.crew.some(c=>c.n==='?'); return `<button type="button" class="gbar ${gap?'unk':''} ${st==='past'||st==='done'?'past':''}" data-op="${esc(o.id)}" title="${esc(o.title)}" style="left:calc(${pct(o.s)}% + 2px);width:calc(${pct(o.e)-pct(o.s)}% - 4px);top:${9+i*(n>1?24:0)}px;height:${n>1?21:40}px;background:${col[o.kind]}"><b>${esc(o.title)}</b>${n>1?'':`<span class="num">${fmt(o.s)}–${fmt(o.e)}</span>`}</button>`; }).join('')}</div></div>`; }).join('')}</div></div>` : '<div class="panel empty">Nothing matches.</div>';
  } else {
    const mine = D.ops.filter(o => o.day === dk && o.crew.some(c => c.n === S.person)).sort((a,b)=>a.s-b.s);
    const live = mine.find(o => opStatus(o) === 'live'), up = mine.filter(o => opStatus(o) === 'next'), past = mine.filter(o => ['past','done'].includes(opStatus(o)));
    const li = o => `<button type="button" class="li ${o.flag?'iss':''}" data-op="${esc(o.id)}"><span class="time num">${fmt(o.s)}</span><span><div class="t" style="font-size:14px">${esc(o.title)}</div><div class="s" style="${o.flag?'color:var(--bad);font-weight:500':''}">${esc(o.flag||o.site)}</div></span></button>`;
    v = `<div style="display:flex;gap:28px;flex-wrap:wrap;align-items:flex-start"><div class="phone" aria-label="Phone preview"><div class="screen">
      <div class="ph-head"><div class="lbl" style="color:inherit;opacity:.7">${t('myday').toUpperCase()} · ${dk}.10</div><div class="n">${esc(S.person)}</div><div style="font-size:12.5px;opacity:.75">${mine.length} assignments</div></div>
      <div class="ph-body">${live ? `<div class="livecard" style="border-radius:14px"><span class="lbl" style="color:inherit;opacity:.85">NOW · UNTIL ${fmt(live.e)}</span><span class="h" style="font-size:20px">${esc(live.title)}</span><span style="font-size:13px">${esc(live.site)}</span>${isEdit()?`<button class="btn sm" type="button" data-opdone="${esc(live.id)}" style="background:rgba(255,255,255,.2);margin-top:6px">${live.done?'Undo':'Mark done'}</button>`:''}</div>` : `<div class="livecard idle" style="border-radius:14px"><span class="lbl">NOW</span><span class="h" style="font-size:20px">Free right now</span><span style="font-size:13px">${up[0]?'Next at '+fmt(up[0].s)+' · '+esc(up[0].site):'Nothing else today'}</span></div>`}
      ${up.length?`<div class="lbl" style="margin-top:4px">${t('next')}</div>${up.map(li).join('')}`:''}${past.length?`<div class="lbl" style="margin-top:4px">Earlier</div><div style="opacity:.55;display:flex;flex-direction:column;gap:9px">${past.map(li).join('')}</div>`:''}${!mine.length?'<p class="muted">No assignments this day.</p>':''}</div></div></div>
      <div style="flex:1;min-width:220px;max-width:360px"><label class="fld">Preview as<select id="personSel">${CREW.map(c=>c[0]).map(p => `<option ${p===S.person?'selected':''}>${esc(p)}</option>`).join('')}</select></label><p class="note">What each crew member sees on their phone. It follows the clock above; assigning someone as lead adds the item to their day.</p></div></div>`;
  }
  return `<div class="bar"><div class="tiny-seg" role="group" aria-label="View" style="min-width:320px">${views.map(([k,l]) => `<button type="button" data-opsv="${k}" aria-pressed="${S.opsView===k}">${l}</button>`).join('')}</div>
    ${S.opsView!=='me'?`<div class="chips" role="group" aria-label="Filter">${[['all','All'],['crew','Setup & strike'],['guest','Guest program'],['open','Open issues']].map(([k,l]) => `<button type="button" class="fchip" data-of="${k}" aria-pressed="${f===k}">${l}</button>`).join('')}</div>`:''}</div>${v}`;
}
function openOp(id){
  const o = D.ops.find(x => x.id === id); if (!o) return; SHEET = () => openOp(id);
  const lead = o.crew.find(c => c.r === SMR || c.r === 'Build lead');
  openSheet(`<div class="sh-h"><div><div class="lbl"><span class="dot k-${o.kind}" style="margin-inline-end:6px"></span>${esc(o.day)}.10 · ${fmt(o.s)}–${fmt(o.e)}${o.e>1440?' · overnight':''}</div><h2>${esc(o.title)}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <div class="sh-b"><dl class="kv"><dt>Site</dt><dd>${esc(o.site)}</dd><dt>${t('status')}</dt><dd>${({live:t('live'),past:'Finished',next:'Upcoming',done:t('done')})[opStatus(o)]}</dd></dl>
  ${o.flag?`<div class="box" style="border-color:var(--bad)"><h3 style="color:var(--bad)">Open issue</h3><div style="font-size:13.5px;color:var(--bad);font-weight:500">${esc(o.flag)}</div>${isAdmin()?'<button class="btn good sm" type="button" id="opResolve">Mark resolved</button>':'<div class="ro">Admins resolve issues</div>'}</div>`:''}
  <div class="box"><h3>${t('crewT')}</h3><div class="chips">${o.crew.map(c => `<span class="chip ${c.n==='?'?'bad':'plain'}">${esc(crewLabel(c))}${!/^\d/.test(c.n)&&c.n!=='?'?' · '+esc(c.r):''}</span>`).join('')}</div>
  ${lead ? (isAdmin() ? `<label class="fld">${esc(lead.r)}<select id="opLead"><option value="?" ${lead.n==='?'?'selected':''}>Unassigned</option>${CREW.map(c=>c[0]).map(p => `<option ${p===lead.n?'selected':''}>${esc(p)}</option>`).join('')}</select></label>` : `<div class="ro">${lead.n==='?'?'Unassigned':esc(lead.n)} · admins assign leads</div>`) : ''}</div>
  ${o.note?`<div class="box"><h3>From the sheet</h3><div style="font-size:13.5px">${esc(o.note)}</div></div>`:''}
  ${isEdit()?`<button class="btn" type="button" id="opDone">${o.done?'Mark not done':'Mark done'}</button>`:''}</div>`);
  const sh = $('sheet');
  const r = sh.querySelector('#opResolve'); if (r) r.onclick = () => { log('Resolved: ' + o.flag); o.flag = ''; send('crew/field', { id:o.rid, field:'flag', value:'' }); commit(); openOp(id); };
  const l = sh.querySelector('#opLead'); if (l) l.onchange = () => { lead.n = l.value; if (lead.n !== '?' && /unconfirmed|not named/i.test(o.flag)) o.flag = ''; if (lead.n === '?' && !o.flag) o.flag = lead.r + ' unassigned'; send('crew/field', { id:o.rid, field:'crew_json', value:JSON.stringify(o.crew) }); send('crew/field', { id:o.rid, field:'flag', value:o.flag }); log((lead.n==='?'?'Cleared lead for ':'Assigned ' + lead.n + ' to ') + '“' + o.title + '”'); commit(); openOp(id); };
  const d = sh.querySelector('#opDone'); if (d) d.onclick = () => { o.done = !o.done; send('crew/field', { id:o.rid, field:'done', value:o.done }); log((o.done?'Marked done: ':'Reopened: ') + o.title); commit(); openOp(id); };
}

/* ============================ PRODUCTION ============================ */
function viewProduction(){
  const tabs = [['design',t('design'),D.design.length],['milestones',t('milestones'),D.miles.length],['budget',t('budget'),LIVE_GRID ? LIVE_GRID.reduce((n,g) => n + (g.rows||[]).length, 0) : 56],['gifts',t('gifts'),D.gifts.length]].filter(x => x[0] !== 'budget' || can.budget());
  if (!tabs.find(x=>x[0]===S.tab.production)) S.tab.production = 'design';
  const tab = S.tab.production;
  let body = '';
  if (tab === 'design') {
    body = `${MOODBOARD_URL.startsWith('__') ? '' : `<section class="panel" style="padding:14px 16px;margin-bottom:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span class="fileic">PDF</span><span style="flex:1;min-width:180px"><div style="font-weight:500">JF60 design moodboard</div><div class="muted" style="font-size:12.5px">Look and feel per venue and day · 23 pages · the reference for every design & print item</div></span><a class="btn ghost sm" style="text-decoration:none" href="${MOODBOARD_URL}" target="_blank" rel="noopener">Open PDF ↗</a></section>`}<div class="panel list">${D.design.slice().sort((a,b)=>a.due.localeCompare(b.due)).map(d => { const n = daysTo(d.due); const late = n < 0 && d.status !== 'approved'; return `<button type="button" class="li" data-design="${esc(d.id)}"><span class="num" style="min-width:66px;font-size:12.5px;${late?'color:var(--bad);font-weight:700':'color:var(--muted)'}">${d.status==='approved'?'✓':late?Math.abs(n)+'d late':n+'d left'}</span><span><div class="t">${esc(L(d,'title'))}</div><div class="s">${esc(d.cat)}${d.proofs.length?` · proof v${d.proofs.length}`:''}</div></span>${dChip(d.status)}</button>`; }).join('')}</div>`;
  } else if (tab === 'milestones') {
    body = `${isEdit()?`<form class="addrow" id="mileForm" style="margin-bottom:12px"><label class="sr" for="mileIn">New milestone</label><input id="mileIn" placeholder="New milestone"><label class="sr" for="mileDue">Due</label><input id="mileDue" type="date" value="2026-10-12" style="flex:none"><button class="btn sm" type="submit">${t('add')}</button></form>`:''}
    <div class="panel list">${D.miles.slice().sort((a,b)=>a.due.localeCompare(b.due)).map(m => { const n = daysTo(m.due); const late = !m.done && n < 0; return `<div class="li"><input type="checkbox" data-mile="${esc(m.id)}" ${m.done?'checked':''} ${isEdit()?'':'disabled'} aria-label="Done" style="width:18px;height:18px;min-height:0;accent-color:var(--good)"><span><div class="t" style="${m.done?'text-decoration:line-through;color:var(--muted)':''}">${esc(m.title)}</div><div class="s">${esc(m.cat)} · due ${ddmm(m.due)}</div></span><span style="display:flex;gap:8px;align-items:center">${isEdit()?`<label class="sr" for="own-${esc(m.id)}">Owner</label><select id="own-${esc(m.id)}" data-owner="${esc(m.id)}" style="min-height:32px;padding:3px 6px;font-size:12.5px"><option value="">Owner</option>${CREW.map(c=>c[0]).map(p => `<option ${p===m.owner?'selected':''}>${esc(p)}</option>`).join('')}</select>`:''}${m.done?`<span class="chip good">${t('done')}</span>`:late?`<span class="chip bad">${-n}d overdue</span>`:`<span class="chip plain">in ${n}d</span>`}</span></div>`; }).join('')}</div>`;
  } else if (tab === 'budget') {
    const tabs = LIVE_GRID || [];
    const bi = Math.min(+S.tab.budgetTab || 0, Math.max(0, tabs.length - 1)), g = tabs[bi];
    body = !g ? '<div class="panel empty">No budget sheet yet.</div>' : `<div class="bar"><div class="chips" role="group" aria-label="${t('budget')}">${tabs.map((x,i) => `<button type="button" class="fchip" data-btab="${i}" aria-pressed="${i===bi}">${esc(x.name)} <span class="num" style="opacity:.7">${(x.rows||[]).length}</span></button>`).join('')}</div>
      ${isAdmin() ? `<button class="btn ghost sm" type="button" id="bAddRow">${t('addRow')}</button>` : ''}</div>
    <div class="panel tbl-wrap"><table class="tbl" dir="auto"><thead><tr>${(g.columns||[]).map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>
      ${(g.rows||[]).map((r,ri) => `<tr>${(g.columns||[]).map((c,ci) => { const v = r[ci] == null ? '' : String(r[ci]); return `<td dir="auto" class="${/^[\d₪,.\s-]+$/.test(v) ? 'num' : ''}" ${isAdmin() ? `contenteditable="plaintext-only" data-cell="${ri}:${ci}" spellcheck="false"` : ''}>${esc(v)}</td>`; }).join('')}</tr>`).join('')}
    </tbody></table></div>
    <p class="note">${t('budgetNote')}</p>`;
  } else {
    const cats = [...new Set(D.gifts.map(g=>g.cat))];
    body = `<div class="stats"><div class="panel stat"><div class="n num">${D.gifts.filter(g=>g.chosen).length}/${D.gifts.length}</div><div class="s">Gifts chosen</div></div></div>` + cats.map(c => `<div class="lbl" style="margin:14px 0 8px">${esc(S.lang==='he'?(D.gifts.find(g=>g.cat===c).cat_he||c):c)}</div><div class="panel list">${D.gifts.filter(g=>g.cat===c).map(g => `<label class="li" style="cursor:pointer"><input type="checkbox" data-gift="${esc(g.id)}" ${g.chosen?'checked':''} ${isEdit()?'':'disabled'} style="width:18px;height:18px;min-height:0;accent-color:var(--good)"><span class="t">${esc(L(g,'title'))}</span><span class="muted num" style="font-size:12.5px">${g.qty?'× '+esc(g.qty):''}</span></label>`).join('')}</div>`).join('');
  }
  return `<div class="page-h"><div><div class="lbl">${t('production')}</div><h1>${t('prodH')}</h1></div></div>
  <div class="tabs" role="tablist">${tabs.map(([k,l,n]) => `<button role="tab" type="button" data-t="production" data-k="${k}" aria-selected="${tab===k}">${l}<span class="c num">${n}</span></button>`).join('')}</div>${body}`;
}
function openDesign(id){
  const d = D.design.find(x => x.id === id); if (!d) return; SHEET = () => openDesign(id);
  const latest = d.proofs[d.proofs.length-1];
  openSheet(`<div class="sh-h"><div><div class="lbl">${esc(d.cat)} · due ${ddmm(d.due)}</div><h2>${esc(L(d,'title'))}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <div class="sh-b"><dl class="kv"><dt>${t('status')}</dt><dd>${isEdit()?`<select id="dStatus">${['content_missing','in_design','awaiting_approval','approved','changes','no_design','unresolved'].map(s=>`<option value="${s}" ${s===d.status?'selected':''}>${s.replace('_',' ')}</option>`).join('')}</select>`:dChip(d.status)}</dd></dl>
  <div class="box"><h3>Proofs <span class="num">${d.proofs.length}</span></h3>${d.proofs.length ? d.proofs.slice().reverse().map(p => `<div class="mini"><span>${p.file ? `<a href="/api/files/download?id=${esc(p.file)}" target="_blank" rel="noopener" style="color:var(--info)">v${p.v}</a>` : 'v' + p.v} · ${esc(p.by)}${p.comment?' · “'+esc(p.comment)+'”':''}</span>${p.decision==='approved'?'<span class="chip good">Approved</span>':p.decision==='changes'?'<span class="chip warn">Changes</span>':'<span class="chip info">Pending</span>'}</div>`).join('') : '<div class="muted" style="font-size:13px">No proofs yet. Drop one in the Inbox or add it here.</div>'}
  ${isEdit()?`<button class="btn ghost sm" type="button" id="dAddProof">Upload a proof</button>`:''}</div>
  ${latest && latest.decision==='pending' && can.approve() ? `<div class="box" style="border-color:var(--info)"><h3>Foundation sign-off · v${latest.v}</h3><label class="sr" for="dComment">Comment</label><textarea id="dComment" placeholder="Comments for the designer (optional)"></textarea><div style="display:flex;gap:8px"><button class="btn good" type="button" id="dApprove">Approve for print</button><button class="btn bad" type="button" id="dChanges">Request changes</button></div></div>` : ''}</div>`);
  const sh = $('sheet');
  const ds = sh.querySelector('#dStatus'); if (ds) ds.onchange = () => { d.status = ds.value; send('design/field', { id:d.rid, field:'status', value:ds.value }); log('Set “' + d.title + '” to ' + ds.value.replace('_',' ')); commit(); openDesign(id); };
  const ap = sh.querySelector('#dAddProof'); if (ap) ap.onclick = () => pickFiles(files => { const pf = files[0]; send(async () => { const fd = new FormData(); fd.append('file', pf); fd.append('section', 'proof'); fd.append('segment_id', d.rid); fd.append('by', NAME); const u = await api('files/upload', fd); await api('design/proof', { item_id:d.rid, file_id:u.id, by:NAME }); }); d.proofs.push({ v:d.proofs.length+1, by:who(), decision:'pending' }); d.status = 'awaiting_approval'; log('Uploaded proof v' + d.proofs.length + ' for “' + d.title + '”'); commit(); openDesign(id); });
  const dec = (k) => { const c = $('dComment').value.trim(); if (k==='changes' && !c) { toast('Say what needs changing'); return; } latest.decision = k; latest.comment = c; send('design/decide', { proof_id:latest.rid, decision:k, comment:c, by:NAME }); d.status = k==='approved' ? 'approved' : 'changes'; log((k==='approved'?'Approved ':'Requested changes on ') + '“' + d.title + '” v' + latest.v); commit(); openDesign(id); toast(k==='approved'?'Approved for print':'Changes requested'); };
  const a = sh.querySelector('#dApprove'); if (a) a.onclick = () => dec('approved');
  const ch = sh.querySelector('#dChanges'); if (ch) ch.onclick = () => dec('changes');
}

/* ============================ INBOX ============================ */
const TYPES = {
  quote:{ en:'Quote', dest:'Budget line' }, invoice:{ en:'Invoice / receipt', dest:'Budget line' }, contract:{ en:'Signed contract', dest:'Talent & contracts' },
  menu:{ en:'Menu', dest:'Food & drink item' }, proof:{ en:'Design proof', dest:'Design & print item' }, guests:{ en:'Guest registration export', dest:'Guests · review changes' },
  rider:{ en:'Tech rider / AV brief', dest:'Session · AV brief' }, transport:{ en:'Driver / vehicle list', dest:'Transport runs' }, runsheet:{ en:'Run sheet / crew schedule', dest:'Crew schedule' },
  exhibitors:{ en:'Exhibitor list', dest:'Organizations fair' }, bio:{ en:'Speaker bio / headshot', dest:'Session · files' }, map:{ en:'Floor plan / site map', dest:'Session · files' }, other:{ en:'Other document', dest:'Files' }
};
const ADMIN_TYPES = ['guests','invoice','contract'];
function targets(type){
  if (type==='menu') return D.food.map(f=>[f.id,dayName(f.day)+' · '+L(f,'title')]);
  if (type==='proof') return D.design.map(x=>[x.id,L(x,'title')]);
  if (type==='contract') return D.talent.map(x=>[x.id,x.title]);
  if (type==='rider'||type==='bio'||type==='map') return D.ev.map(e=>[e.id,dayName(e.day)+' · '+L(e,'title')]);
  return null;
}
function viewInbox(){
  const review = D.inbox.filter(d => d.state === 'review' || d.state === 'reading');
  const filed = D.inbox.filter(d => d.state === 'filed');
  return `<div class="page-h"><div><div class="lbl">${t('inbox')}</div><h1>${t('inboxH')}</h1></div></div>
  <label class="drop" id="drop" for="fileIn2">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 16V4M6 10l6-6 6 6M4 20h16"/></svg>
    <span class="big">${t('dropHere')}</span><span class="muted">PDF, images, Word, Excel, CSV · quotes, invoices, menus, proofs, riders, guest lists…</span>
    <span class="btn ghost sm" style="margin-top:6px">${t('choose')}</span><input type="file" id="fileIn2" multiple></label>
  <div class="cols" style="margin-top:16px">
    <div style="display:flex;flex-direction:column;gap:12px"><div class="lbl">${t('toReview')} · ${review.length}</div>${review.length ? review.map(docCard).join('') : '<div class="panel empty">Nothing waiting.</div>'}</div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <section class="panel"><div class="sec-h"><h2>${t('filed')}</h2><span class="muted" style="font-size:12.5px">${filed.length}</span></div>
        <div class="list">${filed.length ? filed.map(d => `<div class="li" style="grid-template-columns:auto minmax(0,1fr)"><span class="fileic">${esc(d.ext)}</span><span style="min-width:0"><div class="t" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(d.name)}</div><div class="s">→ ${esc(d.filedTo)}</div></span></div>`).join('') : '<div class="empty" style="padding:18px">Nothing filed yet.</div>'}</div></section>
      <section class="panel" style="padding:14px 16px"><div class="lbl" style="margin-bottom:6px">${t('recognize')}</div><div class="types">${Object.keys(TYPES).map(k => `<div><span>${TYPES[k].en}</span><span class="muted">→ ${TYPES[k].dest}</span></div>`).join('')}</div></section>
    </div></div>
  <p class="note">${t('inboxNote')}</p><p class="note" hidden>Prototype: the sample documents are pre-read; files you drop are sorted by name and type, and spreadsheets are opened to count rows. In the app, Claude reads each file, extracts the details and suggests where it goes. Nothing is filed until someone presses Apply.</p>`;
}
function docCard(d){
  if (d.state === 'reading') return `<div class="panel doc"><div class="doc-top"><span class="fileic">${esc(d.ext)}</span><div style="min-width:0;flex:1"><div class="name">${esc(d.name)}</div><div class="reading"><span class="spin"></span>${t('reading')}</div></div></div></div>`;
  const ty = TYPES[d.type], blocked = ADMIN_TYPES.includes(d.type) && !isAdmin();
  const opts = targets(d.type);
  const accOpts = [['ops', t('accOps')], ['admin', t('accAdmin')]].concat(LIVE && LIVE.chief ? [['chief', t('accChief')]] : []);
  return `<article class="panel doc"><div class="doc-top"><span class="fileic">${esc(d.ext)}</span><div style="min-width:0;flex:1"><div class="name">${esc(d.name)}</div>
    <div class="chips" style="margin-top:4px"><span class="chip info">${ty.en}</span><span class="chip ${d.conf>=90?'good':d.conf>=70?'warn':'plain'} num">${d.conf}% ${t('sure')}</span>${ADMIN_TYPES.includes(d.type)?'<span class="chip plain">Admin</span>':''}<span class="chip plain">${esc(t('acc_' + (d.access || 'admin')))}</span></div></div>
    <button class="x" type="button" aria-label="Dismiss" data-dismiss="${esc(d.id)}">✕</button></div>
    <div style="font-size:13.5px">${esc(d.summary)}</div>
    ${d.fields && d.fields.length ? `<div class="fields">${d.fields.map(([k,v]) => `<div class="field"><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`).join('')}</div>` : ''}
    <div class="dest"><span class="muted">${t('fileTo')}</span><label class="sr" for="ty-${esc(d.id)}">Type</label><select id="ty-${esc(d.id)}" data-type="${esc(d.id)}">${Object.keys(TYPES).map(k => `<option value="${k}" ${k===d.type?'selected':''}>${TYPES[k].en}</option>`).join('')}</select>
      ${isAdmin() ? `<label class="sr" for="ac-${esc(d.id)}">${t('accLabel')}</label><select id="ac-${esc(d.id)}" data-acc="${esc(d.id)}" title="${t('accLabel')}">${accOpts.map(([v,l]) => `<option value="${v}" ${v===(d.accessPick || d.access)?'selected':''}>${esc(l)}</option>`).join('')}</select>` : ''}
      ${opts ? `<label class="sr" for="tg-${esc(d.id)}">Destination</label><select id="tg-${esc(d.id)}" data-target="${esc(d.id)}">${opts.map(([v,l]) => `<option value="${esc(v)}" ${v===d.target?'selected':''}>${esc(l)}</option>`).join('')}</select>` : `<span>${esc(ty.dest)}</span>`}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">${blocked ? '<span class="muted" style="font-size:13px">An admin files this one.</span>' : `<button class="btn good sm" type="button" data-apply="${esc(d.id)}" ${d.busy?'disabled':''}>${t('apply')}</button>`}<button class="btn ghost sm" type="button" data-plain="${esc(d.id)}" ${d.busy?'disabled':''}>${t('keep')}</button></div></article>`;
}
// spreadsheets go to the assistant as text: only the one sheet that matters (the registration sheet, or the
// first sheet), capped, so the rest of a workbook (budgets, other tabs) is never sent
async function sheetText(file, ext){
  try {
    if (!/^(XLSX|XLS)$/.test(ext)) return '';
    await loadXlsx();
    const wb = XLSX.read(await file.arrayBuffer());
    const name = wb.SheetNames.find(n => /registration|רישום/i.test(n)) || wb.SheetNames[0];
    return ('## Sheet: ' + name + ' (1 of ' + wb.SheetNames.length + ')\n' + XLSX.utils.sheet_to_csv(wb.Sheets[name])).slice(0, 60000);
  } catch(e){ return ''; }
}
function loadXlsx(){
  if (window.XLSX) return Promise.resolve();
  return new Promise((res, rej) => { const sc = document.createElement('script'); sc.src = '/vendor/xlsx/xlsx.full.min.js'; sc.onload = res; sc.onerror = () => rej(new Error('spreadsheet reader not available')); document.head.appendChild(sc); });
}
// dropped files are uploaded and read one at a time; each upload carries an idempotency key so a retry
// never creates a second copy
let INBOX_CHAIN = Promise.resolve();
function addFilesLive(list){
  const files = [...list];
  files.forEach((f, i) => {
    const id = 'up' + Date.now() + i, ext = (f.name.split('.').pop() || 'FILE').toUpperCase().slice(0, 4), key = newIdemKey();
    D.inbox.unshift({ id, name:f.name, ext, state:'reading' });
    INBOX_CHAIN = INBOX_CHAIN.then(async () => {
      try {
        const fd = new FormData(); fd.append('file', f); fd.append('section', 'general'); fd.append('by', NAME);
        const up = await api('files/upload', fd, { idem:key, timeout:120000 });
        await api('inbox/read', { file_id:up.id, text:await sheetText(f, ext), by:NAME }, { idem:key + '-r', timeout:90000 });
      } catch(err){ toast(t('inboxFail').replace('{f}', f.name) + ' · ' + errText(err)); }
      D.inbox = D.inbox.filter(x => x.id !== id);
      try { await loadLive(); refreshView(); } catch(e){}
    });
  });
  if (S.area !== 'inbox') go('inbox'); else render();
  toast(files.length + ' file' + (files.length > 1 ? 's' : '') + ' added');
}
function addFiles(list){
  if (!can.file() || !LIVE) return;
  return addFilesLive(list);
}
async function fileInboxLive(d, plain){
  if (d.busy) return;
  const all = [...D.food, ...D.design, ...D.talent, ...D.ev];
  const o = all.find(x => x.id === d.target);
  d.busy = true; d.key = d.key || newIdemKey(); render();
  try {
    const body = { id:d.rid, type:d.type, target:o ? (o.rid || o.id) : '', plain:!!plain, by:NAME };
    if (isAdmin() && d.accessPick && d.accessPick !== d.access) body.access = d.accessPick;
    const r = await api('inbox/apply', body, { idem:d.key });
    toast(t('filedTo') + ' ' + r.filed_to);
  } catch(err){ toast(t('saveFail') + ' · ' + errText(err)); }
  d.busy = false;
  try { await loadLive(); refreshView(); } catch(e){}
}
function apply(id, plain){
  const d = D.inbox.find(x => x.id === id);
  if (d && d.rid) return fileInboxLive(d, plain);
}

/* ============================ PRINT CENTER ============================ */
const DOCS = [
  ['program','Guest program','Bilingual, one page per day','all'],
  ['ros','Detailed program','Sessions, run-of-show lines and transport by time · for the Foundation','edit'],
  ['drivers','Driver sheets','One per run: time, route, pickups per hotel','edit'],
  ['caterer','Caterer dietary sheet','Counts per requirement, severe allergies highlighted','edit'],
  ['hotels','Hotel manifests','Guests per hotel with group leader','edit'],
  ['supplier','Supplier brief · Schuster','AV needs per session, from the AV briefs','edit'],
  ['crew','Crew contact sheet','Crew, roles, sites and group leaders','edit']
];
function viewPrint(){
  return `<div class="page-h"><div><div class="lbl">${t('print')}</div><h1>${t('printH')}</h1></div></div>
  <div class="panel list">${DOCS.filter(d => d[3]==='all' || isEdit()).map(([k,l,s]) => `<button type="button" class="docrow" data-doc="${k}"><span class="fileic">PDF</span><span><div style="font-weight:500">${l}</div><div class="muted" style="font-size:12.5px">${s}</div></span><span class="go">Preview →</span></button>`).join('')}</div>
  <p class="note">Every document is built from the live data as it was last loaded.</p>`;
}
function paper(k){
  const dayBlocks = fn => [1,2,3].map(d => `<section class="pday"><h2>${dayName(d)}</h2><table>${fn(d)}</table></section>`).join('');
  if (k==='program') return `<h1>Jerusalem — Yesterday, Today and Tomorrow</h1><div>20–22 October 2026 · The Jerusalem Foundation at 60</div>` + dayBlocks(d => D.ev.filter(e=>e.day===d).map(e => `<tr><td>${esc(e.s)}–${esc(e.e)}</td><td><b>${esc(L(e,'title'))}</b><br><span data-notr>${esc(S.lang==='he' ? e.title : e.title_he)}</span><br><span style="color:#6D685F">${esc(L(e,'venue'))}</span></td></tr>`).join(''));
  if (k==='ros') return `<h1>${t('progDocH')}</h1><div>${t('progDocSub').replace('{d}', ddmm(new Date().toISOString().slice(0,10)))}</div>` + dayBlocks(d => [...D.ev.filter(e=>e.day===d).map(e=>[mins(e.s), `<b>${esc(e.title)}</b> · ${esc(e.venue)}${e.ros ? `<div class="ros" dir="auto">${esc(e.ros)}</div>` : ''}`]), ...D.runs.filter(r=>r.day===d).map(r=>[mins(r.t), `${t('busT')}: ${esc(r.title)}`])].sort((a,b)=>a[0]-b[0]).map(([m,x]) => `<tr><td>${fmt(m)}</td><td>${x}</td></tr>`).join(''));
  if (k==='drivers') { const date = d => '2026-10-' + String(19 + d); const stay = (h, d) => D.guests.filter(g => atHotel(g, h) && g.cin && g.cout && g.cin <= date(d) && g.cout >= date(d)).length;
    return `<h1>Driver sheets</h1><div>Numbers per stop are guests registered at that hotel that night, not confirmed riders.</div>` + dayBlocks(d => D.runs.filter(r=>r.day===d).map(r => { const st = (LIVE && LIVE.run_stops || []).filter(x => x.run_id === r.rid && x.hotel_match).sort((a,b) => a.sort_order - b.sort_order);
      return `<tr><td>${fmt(mins(r.t))}</td><td><b>${esc(r.title)}</b> · ${esc(t(r.status))}${st.length ? '<br>' + st.map(x => esc(x.time) + ' ' + esc(x.hotel_match) + ' ' + stay(x.hotel_match, d)).join(' · ') : ''}</td></tr>`; }).join('')); }
  if (k==='caterer') { const by = {}; D.guests.filter(g=>g.dietary).forEach(g => by[g.dietary] = (by[g.dietary]||[]).concat(g)); return `<h1>Dietary requirements</h1><div>${D.guests.filter(g=>g.dietary).length} guests · for every caterer</div><h2>Summary</h2><table>${Object.keys(by).sort().map(k => `<tr><td>${by[k].length}</td><td class="${by[k].some(g=>g.severe)?'sev':''}">${esc(k)}${by[k].some(g=>g.severe)?' · SEVERE':''}</td></tr>`).join('')}</table><h2>Meals</h2><table>${D.food.filter(f=>/lunch|dinner|Lunch|Dinner/.test(f.title)).map(f => `<tr><td>${dayName(f.day)}</td><td>${esc(f.title)}</td></tr>`).join('')}</table>`; }
  if (k==='hotels') return `<h1>Hotel manifests</h1>` + HOTELS.map(h => `<h2>${esc(h)} · ${D.guests.filter(g=>atHotel(g, h)).length} guests · leader ${esc((LEADERS.find(l => hk(l[0]) === hk(h))||['',''])[1])}</h2><table>${D.guests.filter(g=>atHotel(g, h)).map(g => `<tr><td>${esc(g.desk)}</td><td>${esc(g.name)}${g.dietary?' · '+esc(g.dietary):''}${g.cin?' · '+ddmm(g.cin)+'–'+(g.cout?ddmm(g.cout):'?'):''}${g.early?' · <b>'+esc(g.early)+'</b>':''}${g.conf?' · conf. '+esc(g.conf):''}</td></tr>`).join('')}</table>`).join('') + `<h2 class="sev">No hotel recorded · ${D.guests.filter(g=>!g.hotel).length}</h2>`;
  if (k==='supplier') return `<h1>Brief for Schuster</h1><div>Sound, AV and lighting per session</div>` + dayBlocks(d => D.ev.filter(e=>e.day===d && !/Break/.test(e.title)).map(e => `<tr><td>${esc(e.s)}</td><td><b>${esc(e.title)}</b> · ${esc(e.venue)}<br>${e.av?esc(e.av):'<span style="color:#B63E2A">AV brief missing</span>'}</td></tr>`).join(''));
  const phone = (n, p) => { const c = p || ((D.contacts.find(x => x.phone && x.name === n) || {}).phone); return c ? ' · ' + esc(c) : ''; };
  return `<h1>Crew contact sheet</h1><h2>Production crew</h2><table>${CREW.map(([n,r,ph]) => `<tr><td>${esc(n)}</td><td>${esc(r)}${phone(n, ph)}</td></tr>`).join('')}</table><h2>Hotel group leaders</h2><table>${LEADERS.map(([h,n,ph]) => `<tr><td>${esc(n)}</td><td>${esc(h)}${phone(n, ph)}</td></tr>`).join('')}</table>`;
}
function openDoc(k){
  const d = DOCS.find(x => x[0] === k);
  openSheet(`<div class="sh-h"><div><div class="lbl">${t('print')}</div><h2>${d[1]}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
  <div class="sh-b"><div class="paper">${paper(k)}</div><button class="btn" type="button" id="dlPdf">Download PDF</button></div>`, true);
  $('dlPdf').onclick = () => { if (printPaper(k === 'ros' ? t('progDocFile') : 'JF60 · ' + d[1], paper(k))) log('Generated “' + d[1] + '”'); };
}
// Opens the document in a print window; the browser's print dialog saves it as a PDF
function printPaper(title, html){
  const rtl = S.lang === 'he', stamp = new Date().toISOString().slice(0, 10);
  const w = window.open('', '_blank');
  if (!w) { toast(t('popupBlocked')); return false; }
  w.document.open();
  w.document.write(`<!DOCTYPE html><html dir="${rtl ? 'rtl' : 'ltr'}" lang="${rtl ? 'he' : 'en'}"><head><meta charset="utf-8"><title>${esc(title)} · ${stamp}</title><style>
    @page { margin: 14mm; }
    * { box-sizing: border-box; }
    body { font-family: Georgia, 'Frank Ruhl Libre', serif; color: #22201B; font-size: 12px; line-height: 1.45; margin: 0; }
    h1 { font-weight: 400; font-size: 24px; margin: 0 0 2px; }
    h2 { font-size: 10.5px; letter-spacing: .14em; text-transform: uppercase; margin: 18px 0 6px; color: #6D685F; page-break-after: avoid; }
    table { width: 100%; border-collapse: collapse; }
    tr { page-break-inside: avoid; }
    td { padding: 5px 0; border-top: 1px solid #E4E0D7; vertical-align: top; }
    td:first-child { width: 82px; font-variant-numeric: tabular-nums; }
    .sev { color: #B63E2A; font-weight: 700; }
    .pday + .pday { page-break-before: always; break-before: page; }
    .pday + .pday > h2:first-child { margin-top: 0; }
    .ros { color: #4A463D; font-size: 11px; white-space: pre-line; margin-top: 3px; text-align: ${rtl ? 'right' : 'left'}; }
  </style></head><body>${html}</body></html>`);
  w.document.close();
  setTimeout(() => { w.focus(); w.print(); }, 350);
  return true;
}

/* ============================ ACCESS & ACTIVITY ============================ */
const ilTime = (utc, o) => { try { return new Date(String(utc).replace(' ', 'T') + 'Z').toLocaleString(S.lang === 'he' ? 'he-IL' : 'en-GB', Object.assign({ timeZone:'Asia/Jerusalem' }, o)); } catch(e){ return utc; } };
function visitsView(){
  if (!LIVE) return `<div class="empty">${t('visitsNone')}</div>`;
  if (LIVE_VISITS === null) return `<div class="empty">${t('visitsFail')}</div>`;
  const days = +(S.visitsDays || 7), since = Date.now() - days * 864e5;
  const rows = LIVE_VISITS.filter(r => new Date(String(r.started_at).replace(' ', 'T') + 'Z').getTime() >= since);
  const nm = r => (r.name || '').trim() || t('noName');
  const dur = r => { const m = Math.round((new Date(String(r.last_at).replace(' ','T')+'Z') - new Date(String(r.started_at).replace(' ','T')+'Z')) / 6e4); return m < 5 ? t('under5') : m < 60 ? m + ' ' + t('min') : Math.floor(m/60) + ' ' + t('hr') + ' ' + (m % 60) + ' ' + t('min'); };
  const lvl = l => ({ admin:t('lvlAdmin'), edit:t('lvlEdit'), view:t('lvlView') })[l] || l;
  const people = {}; rows.forEach(r => { const k = nm(r) + '|' + r.level; const p = people[k] || (people[k] = { name:nm(r), level:r.level, visits:0, days:new Set(), last:r.last_at }); p.visits++; p.days.add(ilTime(r.started_at, { dateStyle:'short' })); if (r.last_at > p.last) p.last = r.last_at; });
  const byDay = {}; rows.forEach(r => { const d = ilTime(r.started_at, { weekday:'short', day:'numeric', month:'numeric' }); (byDay[d] = byDay[d] || []).push(r); });
  const pick = `<div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap">${[7,30].map(d => `<button type="button" class="btn ${days===d?'':'ghost'} sm" data-vdays="${d}">${t('lastDays').replace('{n}', d)}</button>`).join('')}<span class="muted" style="font-size:12.5px">${t('visitsNote')}</span></div>`;
  if (!rows.length) return pick + `<div class="empty">${t('visitsNone')}</div>`;
  return pick + `<div class="panel tbl-wrap" style="margin-bottom:16px"><table class="tbl"><thead><tr><th>${t('person')}</th><th>${t('keyLvl')}</th><th>${t('daysActive')}</th><th>${t('visitsN')}</th><th>${t('lastSeen')}</th></tr></thead><tbody>
    ${Object.values(people).sort((a,b) => b.last.localeCompare(a.last)).map(p => `<tr><td dir="auto" data-notr>${esc(p.name)}</td><td>${lvl(p.level)}</td><td class="num">${p.days.size}</td><td class="num">${p.visits}</td><td class="num">${ilTime(p.last, { dateStyle:'short', timeStyle:'short' })}</td></tr>`).join('')}</tbody></table></div>
  <div class="panel tbl-wrap"><table class="tbl"><thead><tr><th>${t('signedIn')}</th><th>${t('person')}</th><th>${t('keyLvl')}</th><th>${t('appCol')}</th><th>${t('lastSeen')}</th><th>${t('duration')}</th><th>${t('deviceCol')}</th></tr></thead><tbody>
    ${Object.entries(byDay).map(([d, rs]) => `<tr><th colspan="7" class="lbl" style="text-align:start;padding-top:14px">${esc(d)} · ${rs.length}</th></tr>` + rs.map(r => `<tr><td class="num">${ilTime(r.started_at, { timeStyle:'short' })}</td><td dir="auto" data-notr>${esc(nm(r))}</td><td>${lvl(r.level)}</td><td>${r.ui === 'classic' ? t('classic') : t('control')}</td><td class="num">${ilTime(r.last_at, { timeStyle:'short' })}</td><td class="num">${dur(r)}</td><td>${esc(r.device || '')}${r.country && r.country !== 'IL' ? ' · ' + esc(r.country) : ''}</td></tr>`).join('')).join('')}</tbody></table></div>`;
}
// What each key can do. This mirrors the server's rules (src/index.js); it is information, not a control.
const PERM_ROWS = [
  ['See the program (public details)', 1, 1, 1, 1],
  ['Ask questions (read-only assistant)', 1, 1, 1, 1],
  ['Edit sessions, transport, food, design, to-dos, contacts, site needs', 0, 1, 1, 1],
  ['Upload files and file inbox documents (except guest lists, invoices, contracts)', 0, 1, 1, 1],
  ['Open files marked “team” (ops)', 0, 1, 1, 1],
  ['Open files marked “admin”; file guest lists, invoices, contracts', 0, 0, 1, 1],
  ['Guest passports, phones and emails; talent fees; catering quotes', 0, 0, 1, 1],
  ['Add or remove sessions, runs, guests; change staff names and roles; apply AI suggestions; import guests', 0, 0, 1, 1],
  ['Usage information', 0, 0, 1, 1],
  ['Budget sheet; files marked “chief”', 0, 0, 0, 1]
];
function viewSettings(){
  const tab = S.tab.settings === 'perms' ? 'perms' : 'visits';
  const tabs = [['visits',t('visits')],['perms',t('permsT')]];
  const yes = '<span class="chip good" aria-label="yes">✓</span>', no = '<span class="muted" aria-label="no">—</span>';
  const body = tab === 'visits' ? visitsView() : `<div class="panel tbl-wrap"><table class="tbl"><thead><tr><th></th><th>View</th><th>Edit</th><th>Admin</th><th>Chief</th></tr></thead><tbody>
    ${PERM_ROWS.map(([l, ...c]) => `<tr><td>${esc(l)}</td>${c.map(v => `<td>${v ? yes : no}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="note">Field apps (drivers, group leaders, AV, crew) use separate keys that open only their own page. During the event the shared field words still work; group leaders and crew are then identified by the name they type. Keys are issued and revoked by an admin with the credential script described in the README; there is no key management screen.</p>`;
  return `<div class="page-h"><div><div class="lbl">${t('settings')}</div><h1>${t('accessH')}</h1></div></div>
  <div class="tabs" role="tablist">${tabs.map(([k,l]) => `<button role="tab" type="button" data-t="settings" data-k="${k}" aria-selected="${tab===k}">${esc(l)}</button>`).join('')}</div>${body}`;
}

/* ============================ PALETTE / ASK ============================ */
function palItems(q){
  q = q.trim().toLowerCase(); const out = [];
  if (q) out.push({ k:'Ask', l:'Ask: “' + q + '”', fn:() => (LIVE ? openAsk(q) : answer(q)) });
  if (q && LIVE && isEdit()) out.push({ k:'Suggest', l:'Suggest changes: “' + q + '”', fn:() => openSuggest(q) });
  const add = (k, l, fn) => { if (!q || l.toLowerCase().includes(q)) out.push({ k, l, fn }); };
  AREAS.filter(allowed).forEach(a => add('Go to', t(a), () => go(a)));
  add('Help', t('tourBtn'), () => tourStart());
  D.ev.forEach(e => add('Session', dayName(e.day) + ' · ' + e.s + ' ' + L(e,'title'), () => { go('program', String(e.day)); openEvent(e.id); }));
  if (!isView()) {
    D.runs.forEach(r => add('Transport', dayName(r.day) + ' · ' + fmt(mins(r.t)) + ' ' + L(r,'title'), () => { go('logistics','transport'); openRun(r.id); }));
    D.design.forEach(d => add('Design', L(d,'title'), () => { go('production','design'); openDesign(d.id); }));
    D.miles.forEach(m => add('Milestone', m.title, () => go('production','milestones')));
    D.ops.forEach(o => add('Crew', o.day + '.10 · ' + fmt(o.s) + ' ' + o.title + ' · ' + o.site, () => { go('logistics','ops'); S.viewDay = o.day === S.clock.today ? null : o.day; openOp(o.id); }));
    D.guests.forEach(g => add('Guest', g.name + ' · ' + g.desk, () => { go('people','guests'); openGuest(g.id); }));
    DOCS.forEach(d => add('Print', d[1], () => { go('print'); openDoc(d[0]); }));
  }
  return out.slice(0, 50);
}
let palSel = 0;
function openPal(){ $('pal').hidden = false; $('palIn').value = ''; palSel = 0; drawPal(); $('palIn').focus(); }
function closePal(){ $('pal').hidden = true; }
function drawPal(extra){
  const items = palItems($('palIn').value);
  $('palRes').innerHTML = items.map((x, i) => `<button type="button" role="option" aria-selected="${i===palSel}" data-i="${i}"><span>${esc(x.l)}</span><span class="k">${x.k}</span></button>`).join('') + (extra ? `<div class="ai-ans">${extra}</div>` : '');
  $('palRes').querySelectorAll('button').forEach(b => b.onclick = () => { const it = items[+b.dataset.i]; if (it.k !== 'Ask' || LIVE) closePal(); it.fn(); });
}
function answer(q){
  const he = S.lang === 'he', H = (en, h) => he ? h : en, tk = s => he ? trk(s) : s;
  let a; const dm = q.match(/day ?([123])|יום ?([123])|2([012])\.10/);
  if (dm) { const d = +(dm[1] || dm[2] || dm[3]); const evs = D.ev.filter(e=>e.day===d); const todo = evs.reduce((s,e)=>s+evTodos(e.id).filter(x=>!x.done).length,0); const nd = D.runs.filter(r=>r.day===d&&r.status==='no_driver'); const gaps = D.ops.filter(o=>o.day===String(d+19)&&o.crew.some(c=>c.n==='?'));
    const ndList = nd.map(r=>fmt(mins(r.t))+' '+L(r,'title')).join('; '), gList = gaps.map(o=>tk(o.site)).join(', ');
    a = H(`${dayName(d)}: ${evs.length} sessions, ${todo} open to-dos. ${nd.length} runs without a driver${nd.length?' ('+ndList+')':''}. ${gaps.length} crew slots without a lead${gaps.length?' ('+gList+')':''}.`,
          `${dayName(d)}: ${evs.length} מפגשים, ${todo} משימות פתוחות. ${nd.length} הסעות בלי נהג${nd.length?' ('+ndList+')':''}. ${gaps.length} משמרות צוות בלי אחראי${gaps.length?' ('+gList+')':''}.`); }
  else if (/driver|transport|bus|run|נהג|הסע|אוטובוס/.test(q)) { const nd = D.runs.filter(r=>r.status==='no_driver'), dec = D.runs.filter(r=>r.status==='needs_decision'), bk = D.runs.filter(r=>r.status==='booked').length; const list = nd.map(r=>dayName(r.day)+' '+fmt(mins(r.t))).join(', ');
    a = H(`${nd.length} runs have no driver: ${list}. ${dec.length} need a decision. ${bk} of ${D.runs.length} are booked.`, `ל-${nd.length} הסעות אין נהג: ${list}. ${dec.length} דורשות החלטה. ${bk} מתוך ${D.runs.length} הוזמנו.`); }
  else if (/hotel|guest|manifest|מלון|אורח/.test(q)) { const nh = D.guests.filter(g=>!g.hotel).length, list = HOTELS.map(h => tk(h) + ' ' + D.guests.filter(g=>atHotel(g, h)).length).join(', ');
    a = H(`${nh} of ${D.guests.length} guests have no hotel recorded, so they are on no pickup list. ${list}.`, `ל-${nh} מתוך ${D.guests.length} אורחים לא רשום מלון, ולכן הם לא באף רשימת איסוף. ${list}.`); }
  else if (/contract|talent|sign|fee|חוז|תוכן|שכר/.test(q)) { const s = D.talent.filter(x=>x.stage==='signed'||x.stage==='invoiced').length, qn = D.talent.filter(x=>x.stage==='quote').length;
    a = !isAdmin() ? H('Contracts are admin only.', 'חוזים זמינים למנהלים בלבד.') : H(`${s} of ${D.talent.length} talent contracts are signed; ${qn} have a quote. Recorded fees total ${ils(D.talent.reduce((n,x) => n + (x.fee || 0), 0))}.`, `${s} מתוך ${D.talent.length} חוזי תוכן חתומים; ל-${qn} יש הצעת מחיר. סך השכר הרשום ${ils(D.talent.reduce((n,x) => n + (x.fee || 0), 0))}.`); }
  else if (/diet|allerg|food|menu|תזונ|אלרג|אוכל|תפריט/.test(q)) { const dn = D.guests.filter(g=>g.dietary).length, sv = D.guests.filter(g=>g.severe).length, fc = D.food.filter(f=>f.status==='confirmed').length, mn = D.food.filter(f=>f.menu).length;
    a = H(`${dn} guests have dietary needs, ${sv} severe. ${fc} of ${D.food.length} food items are confirmed; ${mn} menus are on file.`, `ל-${dn} אורחים יש צרכים תזונתיים, ${sv} חמורים. ${fc} מתוך ${D.food.length} פריטי אוכל מאושרים; ${mn} תפריטים קיימים.`); }
  else if (/design|proof|print|badge|עיצוב|הגה|דפוס|תג/.test(q)) { const ap = D.design.filter(d=>d.status==='approved').length, aw = D.design.filter(d=>d.status==='awaiting_approval').length, cm = D.design.filter(d=>d.status==='content_missing').length, lt = D.design.filter(d=>d.status!=='approved'&&daysTo(d.due)<0).length;
    a = H(`${ap} of ${D.design.length} design items approved, ${aw} waiting for sign-off, ${cm} missing content. ${lt} past deadline.`, `${ap} מתוך ${D.design.length} פריטי עיצוב מאושרים, ${aw} ממתינים לאישור, ל-${cm} חסר תוכן. ${lt} עברו את הדדליין.`); }
  else if (/overdue|late|milestone|behind|איחור|באיחור|אבני/.test(q)) { const o = D.miles.filter(m=>!m.done&&daysTo(m.due)<0); const list = o.slice(0,4).map(m=>tk(m.title)).join('; ') + (o.length>4?'…':'.');
    a = H(`${o.length} milestones are overdue: ${list}`, `${o.length} אבני דרך באיחור: ${list}`); }
  else if (/who|crew|lead|manager|צוות|אחראי|מנהל/.test(q)) { const g = D.ops.filter(o=>o.crew.some(c=>c.n==='?')), list = g.map(o=>o.day+'.10 '+tk(o.site)).join(', ');
    const per = {}; D.ops.forEach(o => o.crew.forEach(c => { if (c.n !== '?' && !/^\d/.test(c.n)) per[c.n] = (per[c.n] || 0) + 1; }));
    const top = Object.entries(per).sort((a,b) => b[1] - a[1]).slice(0, 3).map(([n, k]) => n + ' ' + k).join(', ');
    a = H(`${g.length} crew items have no lead: ${list}.${top ? ' Most shifts: ' + top + '.' : ''}`, `ל-${g.length} משמרות צוות אין אחראי: ${list}.${top ? ' הכי הרבה משמרות: ' + top + '.' : ''}`); }
  else a = H('In the app this question goes to Claude with the event’s data. Try “what’s missing for day 1?”, “which runs have no driver?” or “what’s overdue?”.', 'באפליקציה השאלה נשלחת ל-Claude עם נתוני האירוע. נסו “מה חסר ביום 1?”, “לאילו הסעות אין נהג?” או “מה באיחור?”.');
  drawPal(`<span data-notr>${esc(a)}</span>`);
}

/* ============================ ASK (everyone signed in) ============================
   Questions about the project, answered from the live data by /api/ai/ask.
   Read-only: it never changes anything. The thread lives in this page until it reloads. */
const ASK = { thread: [], busy: false };
function openAsk(prefill){
  if (!LIVE) return;
  closePal();
  const draw = () => {
    openSheet(`<div class="sh-h"><div><div class="lbl">${t('ask')}</div><h2>${t('askH')}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
    <div class="sh-b">
      ${ASK.thread.length ? ASK.thread.map(m => `<div class="box" style="gap:6px"><div style="font-weight:500" data-notr>${esc(m.q)}</div>${m.a == null ? `<div class="reading"><span class="spin"></span>${t('askThinking')}</div>` : `<div style="font-size:14px;line-height:1.55" data-notr>${esc(m.a).replace(/\n/g,'<br>')}</div>`}</div>`).join('')
        : `<div class="muted" style="font-size:13.5px">${t('askEmpty')}</div>`}
      <form id="askForm" class="addrow" style="align-items:flex-end"><label class="sr" for="askIn">${t('ask')}</label><textarea id="askIn" maxlength="2000" style="min-height:64px" placeholder="${esc(t('askPh'))}">${esc(prefill)}</textarea><button class="btn" type="submit" ${ASK.busy?'disabled':''}>${t('ask')}</button></form>
      ${ASK.thread.length ? `<button class="linkbtn" type="button" id="askClear" style="font-size:12.5px;align-self:flex-start">${t('askClear')}</button>` : ''}
      <p class="note" style="padding-top:0">${t('askNote')}</p>
    </div>`, true);
    SHEET = null; prefill = '';
    const inp = $('askIn'); setTimeout(() => inp.focus(), 0);
    inp.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); $('askForm').requestSubmit(); } };
    $('askForm').onsubmit = async ev => {
      ev.preventDefault(); const q = inp.value.trim(); if (!q || ASK.busy) return;
      const history = ASK.thread.filter(m => m.a).slice(-6).map(m => ({ q:m.q, a:m.a }));
      const turn = { q, a:null }; ASK.thread.push(turn); ASK.busy = true; draw();
      try { const r = await api('ai/ask', { question:q, history }); turn.a = r.refused ? t('askRefused') : (r.answer || t('askEmptyAnswer')) + (r.truncated ? ' …' : ''); }
      catch(err){ turn.a = t('askFail') + (err && err.message ? ' (' + err.message + ')' : ''); }
      ASK.busy = false; if ($('sheet').classList.contains('on') && $('askForm')) draw();
    };
    const cl = $('askClear'); if (cl) cl.onclick = () => { ASK.thread = []; draw(); };
  };
  draw();
}

/* ============================ SUGGEST CHANGES (admins) ============================
   A request in plain words becomes a list of proposed changes (/api/ai/propose).
   Nothing is written until an admin ticks the changes and presses Apply (/api/ai/apply). */
function opLabel(op){
  const ev = id => D.ev.find(e => e.id === id);
  const evT = id => { const e = ev(id); return e ? '“' + L(e,'title') + '”' : id; };
  if (op.type === 'add_check') return { k:t('aiTodo'), v:evT(op.segment_id) + ': ' + op.text };
  if (op.type === 'add_person') return { k:t('aiPerson'), v:evT(op.segment_id) + ': ' + op.name };
  if (op.type === 'add_event') return { k:t('aiNewSession'), v:dayName(op.day) + ' ' + op.time + '–' + op.end_time + ' · ' + op.title + (op.venue ? ' · ' + op.venue : '') };
  if (op.type === 'edit_event') {
    const e = ev(op.segment_id), ch = [];
    if (op.title != null) ch.push(t('aiTitle') + ' → ' + op.title);
    if (op.venue != null) ch.push(t('venue') + ' → ' + op.venue);
    if (op.day != null) ch.push(dayName(op.day));
    if (op.time != null || op.end_time != null) ch.push((op.time || (e && e.s) || '') + '–' + (op.end_time || (e && e.e) || ''));
    return { k:t('aiChange'), v:evT(op.segment_id) + ': ' + ch.join(' · ') };
  }
  if (op.type === 'edit_check') { const c = D.todos.find(x => x.rid === op.check_id); return { k:t('aiReword'), v:(c ? '“' + L(c,'text') + '” → ' : '') + op.text }; }
  return { k:op.type, v:JSON.stringify(op) };
}
function openSuggest(prefill){
  if (!LIVE || !isEdit()) return;
  closePal();
  let proposal = null, busy = false;
  const draw = () => {
    openSheet(`<div class="sh-h"><div><div class="lbl">${t('suggest')}</div><h2>${t('aiH')}</h2></div><button class="x" type="button" aria-label="${t('close')}" data-close>✕</button></div>
    <div class="sh-b">
      <form id="aiForm" class="box" style="gap:10px"><label class="fld">${t('aiAsk')}<textarea id="aiIn" maxlength="2000" placeholder="${esc(t('aiPh'))}">${esc(prefill)}</textarea></label>
        <div style="display:flex;gap:8px;align-items:center"><button class="btn" type="submit" id="aiGo" ${busy?'disabled':''}>${busy && !proposal ? '<span class="spin" aria-hidden="true"></span>' : ''}${t('aiGo')}</button><span class="muted" style="font-size:12.5px">${t('aiNote')}</span></div></form>
      ${proposal ? (proposal.ops.length ? `<div class="box"><h3>${esc(proposal.summary)} <span class="num">${proposal.ops.length}</span></h3>
        ${proposal.ops.map((op,i) => { const l = opLabel(op); return `<label class="todo" style="align-items:flex-start"><input type="checkbox" data-aiop="${i}" checked style="margin-top:3px"><span><span class="chip plain" style="margin-inline-end:6px">${esc(l.k)}</span>${esc(l.v)}</span></label>`; }).join('')}
        <div style="display:flex;gap:8px;margin-top:4px;align-items:center;flex-wrap:wrap">${isAdmin() ? `<button class="btn good" type="button" id="aiApply" ${busy?'disabled':''}>${t('aiApply')}</button>` : `<span class="ro" style="flex:1">${t('aiAdminOnly')}</span>`}<button class="btn ghost" type="button" id="aiDiscard">${t('aiDiscard')}</button></div></div>`
        : `<div class="box"><div style="font-size:13.5px">${esc(proposal.summary)}</div><div class="muted" style="font-size:13px">${t('aiNone')}</div></div>`) : ''}
    </div>`, true);
    SHEET = null;
    const ta = $('aiIn'); if (!proposal) setTimeout(() => ta.focus(), 0);
    $('aiForm').onsubmit = async ev => {
      ev.preventDefault(); const v = ta.value.trim(); if (!v || busy) return;
      prefill = v; busy = true; proposal = null; draw();
      try { const r = await api('ai/propose', { instruction:v }); proposal = { summary:r.summary || '', ops:Array.isArray(r.ops) ? r.ops : [] }; }
      catch(err){ toast(t('aiFail') + (err && err.message ? ' (' + err.message + ')' : '')); }
      busy = false; draw();
    };
    const ap = $('aiApply'); if (ap) ap.onclick = async () => {
      const pick = [...document.querySelectorAll('[data-aiop]')].filter(c => c.checked).map(c => proposal.ops[+c.dataset.aiop]);
      if (!pick.length) { toast(t('aiPick')); return; }
      busy = true; draw();
      try { const r = await api('ai/apply', { ops:pick }); toast(t('aiDone').replace('{n}', r.applied != null ? r.applied : pick.length)); closeSheet(); await loadLive(); render(); }
      catch(err){ busy = false; toast(t('saveFail') + (err && err.message ? ' (' + err.message + ')' : '')); draw(); }
    };
    const dc = $('aiDiscard'); if (dc) dc.onclick = () => { proposal = null; draw(); };
  };
  draw();
}

/* ============================ sheet / toast / files ============================ */
let lastFocus = null;
function openSheet(html, wide){ lastFocus = lastFocus || document.activeElement; const s = $('sheet'); s.innerHTML = html; s.classList.toggle('wide', !!wide); s.classList.add('on'); s.setAttribute('aria-hidden','false'); $('scrim').classList.add('on'); s.querySelectorAll('[data-close]').forEach(b => b.onclick = closeSheet); const x = s.querySelector('.x'); if (x) x.focus({ preventScroll:true }); }
function closeSheet(){ SHEET = null; const s = $('sheet'); if (!s.classList.contains('on')) return; s.classList.remove('on'); s.setAttribute('aria-hidden','true'); $('scrim').classList.remove('on'); if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll:true }); } catch(e){} lastFocus = null; }
let tt; function toast(m){ const el = $('toast'); el.textContent = m; el.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => el.classList.remove('on'), 2000); }
function pickFiles(cb){ const inp = $('fileIn'); inp.onchange = e => { if (e.target.files.length) cb(e.target.files); e.target.value = ''; inp.onchange = defaultPick; }; inp.click(); }
function defaultPick(e){ if (e.target.files.length) addFiles(e.target.files); e.target.value = ''; }
/* ============================ render ============================ */
function render(){
  if (!allowed(S.area)) S.area = 'home';
  shell();
  const V = { home:viewHome, program:viewProgram, people:viewPeople, logistics:viewLogistics, production:viewProduction, inbox:viewInbox, print:viewPrint, settings:viewSettings };
  const p = $('page'); p.innerHTML = V[S.area]();
  if (S.area === 'logistics' && S.tab.logistics === 'map' && $('mapSlot')) { mountMap(); bindDrvList(); }
  if (unavailableHere(S.area, S.tab[S.area]).length) { const h = p.querySelector('.page-h'); if (h) h.insertAdjacentHTML('afterend', `<div class="chip bad" role="alert" style="margin:0 0 12px;white-space:normal">${t('unavail')}</div>`); }
  saveStatus();
  const on = (sel, ev, fn) => p.querySelectorAll(sel).forEach(el => el[ev] = () => fn(el));
  on('[data-go]', 'onclick', b => go(b.dataset.go, b.dataset.tab || undefined));
  on('[data-ptab]', 'onclick', b => { S.tab.program = b.dataset.ptab; render(); });
  on('[data-t]', 'onclick', b => { S.tab[b.dataset.t] = b.dataset.k; render(); });
  on('[data-ev]', 'onclick', b => openEvent(b.dataset.ev));
  on('[data-op]', 'onclick', b => openOp(b.dataset.op));
  on('[data-opdone]', 'onclick', b => { const o = D.ops.find(x=>x.id===b.dataset.opdone); o.done = !o.done; send('crew/field', { id:o.rid, field:'done', value:o.done }); log((o.done?'Marked done: ':'Reopened: ') + o.title); commit(); });
  on('[data-opsv]', 'onclick', b => { S.opsView = b.dataset.opsv; render(); });
  on('[data-of]', 'onclick', b => { S.filter.ops = b.dataset.of; render(); });
  on('[data-gf]', 'onclick', b => { S.filter.guests = b.dataset.gf; render(); });
  on('[data-cf]', 'onclick', b => { S.filter.contacts = b.dataset.cf; render(); });
  on('[data-guest]', 'onclick', b => openGuest(b.dataset.guest));
  p.querySelectorAll('[data-guest]').forEach(r => r.onkeydown = e => { if (e.key === 'Enter') openGuest(r.dataset.guest); });
  on('[data-dayg]', 'onclick', b => openDayGuest(b.dataset.dayg));
  p.querySelectorAll('[data-dayg]').forEach(r => r.onkeydown = e => { if (e.key === 'Enter') openDayGuest(r.dataset.dayg); });
  const ad = $('addDay'); if (ad) ad.onclick = () => openDayGuest(null);
  on('[data-sf]', 'onclick', b => { S.filter.staff = b.dataset.sf; render(); });
  on('[data-role]', 'onchange', inp => { const m = (TEAM_ROWS||[]).find(x => String(x.id) === inp.dataset.role); if (!m) return; m.role = inp.value.trim(); send('team/field', { id:m.id, field:'role', value:m.role }); if (m.legacy) { send('team/field', { id:m.id, field:'org', value:m.org }); m.legacy = false; } log('Staff · ' + m.name + ': ' + (m.role || '—')); commit(false); });
  on('[data-tphone]', 'onchange', inp => { const m = (TEAM_ROWS||[]).find(x => String(x.id) === inp.dataset.tphone); if (!m) return; m.phone = inp.value.trim(); send('team/field', { id:m.id, field:'phone', value:m.phone }); log('Staff · ' + m.name + ' phone'); commit(false); });
  on('[data-staffdel]', 'onclick', b => { const m = (TEAM_ROWS||[]).find(x => String(x.id) === b.dataset.staffdel); if (!m || !confirm(t('staffDel').replace('{n}', m.name))) return; TEAM_ROWS = TEAM_ROWS.filter(x => x !== m); send('team/delete', { id:m.id }); log('Staff · removed ' + m.name); commit(); });
  const sf = $('staffForm'); if (sf) sf.onsubmit = e => { e.preventDefault(); const name = $('stName').value.trim(), role = $('stRole').value.trim(), org = $('stOrg').value; if (!name) return; TEAM_ROWS = TEAM_ROWS || []; TEAM_ROWS.push({ id:'tmp' + Date.now(), name, role, org }); send('team/add', { name, role, org }); log('Staff · added ' + name + ' (' + org + ')'); commit(); };
  on('[data-crew]', 'onclick', b => { S.person = b.dataset.crew; S.opsView = 'me'; go('logistics','ops'); });
  on('[data-tmove]', 'onclick', b => { const x = D.talent.find(y=>y.id===b.dataset.tmove); const o = ['contacted','quote','signed','invoiced']; x.stage = o[Math.max(0, Math.min(3, o.indexOf(x.stage) + +b.dataset.dir))]; send('talent/field', { id:x.rid, field:'stage', value:x.stage }); log('Moved “' + x.title + '” to ' + x.stage); commit(); });
  on('[data-vdays]', 'onclick', b => { S.visitsDays = +b.dataset.vdays; render(); });
  on('[data-ff]', 'onclick', b => { const o = D.fair.find(x=>x.id===b.dataset.fo), f = b.dataset.ff, k = f === 'form_done' ? 'form' : f; o[k] = !o[k]; const extra = f === 'confirmed' && o.confirmed && !o.contacted; if (extra) o.contacted = true;
    if (o.rid) { send('fair/field', { id:o.rid, field:f, value:o[k] }); if (extra) send('fair/field', { id:o.rid, field:'contacted', value:true }); }
    if (f === 'form_done') D.fairForm = D.fair.filter(x => x.form).length;
    log(o.name + ' · ' + ({ contacted:'contacted', confirmed:'confirmed', form_done:'information form', power:'power point' })[f] + ': ' + (o[k] ? 'yes' : 'no')); commit(); });
  on('[data-fdel]', 'onclick', b => { const o = D.fair.find(x=>x.id===b.dataset.fdel); if (!o || !confirm(t('removeOrg') + ' ' + o.name + '?')) return; D.fair = D.fair.filter(x => x !== o); send('fair/delete', { id:o.rid }); log('Removed ' + o.name + ' from the fair'); commit(); });
  const fa = $('fairAdd'); if (fa) fa.onsubmit = e => { e.preventDefault(); const name = $('fairName').value.trim(), domain = $('fairDom').value; if (!name) return; D.fair.push({ id:'new' + Date.now(), name, domain, contacted:false, confirmed:false, form:false, power:false }); send('fair/add', { name, domain }); log('Added ' + name + ' to the fair'); commit(); };
  on('[data-delc]', 'onclick', b => { const c = D.contacts.find(x=>x.id===b.dataset.delc); if (c && c.rid) send('contact/delete', { id:c.rid }); D.contacts = D.contacts.filter(x=>x!==c); log('Removed contact ' + c.name); commit(); });
  on('[data-run]', 'onclick', b => { const r = D.runs.find(x=>x.id===b.dataset.run); const o = ['no_driver','to_confirm','booked','needs_decision']; r.status = o[(o.indexOf(r.status)+1)%o.length]; send('run/field', { id:r.rid, field:'status', value:r.status }); log('Transport ' + fmt(mins(r.t)) + ' ' + r.title + ' → ' + r.status.replace('_',' ')); commit(); });
  on('[data-run-open]', 'onclick', b => openRun(b.dataset.runOpen));
  on('[data-qchosen]', 'onchange', c => { const q = LIVE_QUOTES.find(x => String(x.id) === c.dataset.qchosen); if (!q) return; q.chosen = c.checked ? 1 : 0; send('quote/field', { id:q.id, field:'chosen', value:c.checked }); log('Catering quote · ' + q.supplier + (c.checked ? ' chosen' : ' unchosen')); commit(); });
  on('[data-food]', 'onclick', b => { const f = D.food.find(x=>x.id===b.dataset.food); const o = ['open','progress','confirmed']; f.status = o[(o.indexOf(f.status)+1)%3]; send('food/field', { id:f.rid, field:'status', value:f.status }); log('Food “' + f.title + '” → ' + f.status); commit(); });
  on('[data-design]', 'onclick', b => openDesign(b.dataset.design));
  on('[data-btab]', 'onclick', b => { S.tab.budgetTab = b.dataset.btab; render(); });
  p.querySelectorAll('[data-cell]').forEach(td => {
    const before = td.textContent;
    td.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); td.blur(); } else if (e.key === 'Escape') { td.textContent = before; td.blur(); } };
    td.onblur = () => {
      const v = td.textContent.trim(); if (v === before.trim() || !LIVE_GRID) return;
      const [ri, ci] = td.dataset.cell.split(':').map(Number), g = LIVE_GRID[+S.tab.budgetTab || 0];
      const row = g.rows[ri]; while (row.length <= ci) row.push(''); const from = row[ci] == null ? '' : String(row[ci]); row[ci] = v;
      send('grid/cells', { edits:[{ tab:+S.tab.budgetTab || 0, r:ri, c:ci, from, to:v }], by:NAME }); log('Budget · ' + g.name + ' · ' + (g.columns[ci]||'') + ' → ' + v); commit(false);
    };
  });
  const bar = $('bAddRow'); if (bar) bar.onclick = () => { const g = LIVE_GRID[+S.tab.budgetTab || 0]; g.rows.push((g.columns||[]).map(() => '')); const tabs = JSON.parse(JSON.stringify(LIVE_GRID)); send(async () => { const r = await api('grid', { tabs, rev:LIVE_GRID_REV, by:NAME }); LIVE_GRID_REV = r.rev; }); log('Budget · ' + g.name + ' · new row'); commit(); };
  on('[data-mile]', 'onchange', b => { const m = D.miles.find(x=>x.id===b.dataset.mile); m.done = b.checked; send('timeline/toggle', { id:m.rid, done:m.done }); log((m.done?'Completed milestone ':'Reopened milestone ') + '“' + m.title + '”'); commit(); });
  on('[data-owner]', 'onchange', s => { const m = D.miles.find(x=>x.id===s.dataset.owner); m.owner = s.value; send('timeline/assign', { id:m.rid, owner:s.value }); log('Assigned ' + (m.owner||'nobody') + ' to “' + m.title + '”'); commit(); });
  on('[data-gift]', 'onchange', b => { const g = D.gifts.find(x=>x.id===b.dataset.gift); g.chosen = b.checked; send('gift/chosen', { id:g.rid, chosen:b.checked }); log((g.chosen?'Chose gift ':'Unchose gift ') + g.title); commit(); });
  on('[data-apply]', 'onclick', b => apply(b.dataset.apply));
  on('[data-plain]', 'onclick', b => apply(b.dataset.plain, true));
  on('[data-dismiss]', 'onclick', b => { const d = D.inbox.find(x => x.id === b.dataset.dismiss); if (!d || !d.rid) return; b.disabled = true; api('inbox/dismiss', { id:d.rid }).then(() => { toast(t('dismissed')); return loadLive(); }).then(refreshView).catch(err => { b.disabled = false; toast(t('saveFail') + ' · ' + errText(err)); }); });
  on('[data-type]', 'onchange', s => { const d = D.inbox.find(x=>x.id===s.dataset.type); d.type = s.value; const o = targets(d.type); d.target = o ? o[0][0] : null; if (LIVE && d.rid) render(); else commit(); });
  on('[data-target]', 'onchange', s => { D.inbox.find(x=>x.id===s.dataset.target).target = s.value; persist(); });
  on('[data-acc]', 'onchange', s => { D.inbox.find(x=>x.id===s.dataset.acc).accessPick = s.value; });
  on('[data-doc]', 'onclick', b => openDoc(b.dataset.doc));
  const ps = $('personSel'); if (ps) ps.onchange = () => { S.person = ps.value; render(); };
  const ae = $('addEv'); if (ae) ae.onclick = openAddSession;
  const ac = $('addContact'); if (ac) ac.onclick = openAddContact;
  const mf = $('mileForm'); if (mf) mf.onsubmit = e => { e.preventDefault(); const v = $('mileIn').value.trim(); if (!v) return; D.miles.push({ id:'m'+Date.now(), due:$('mileDue').value, title:v, cat:'General', done:false, owner:'' }); send('timeline/add', { due_date:$('mileDue').value, title:v, category:'General' }); log('Added milestone “' + v + '”'); commit(); };
  const drop = $('drop');
  if (drop) {
    ['dragenter','dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
    ['dragleave','drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
    drop.addEventListener('drop', e => { if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files); });
    $('fileIn2').onchange = e => { if (e.target.files.length) addFiles(e.target.files); e.target.value = ''; };
  }
  persist();
}

/* ============================ full Hebrew layer ============================
   Every visible string goes through here in Hebrew mode: exact phrases, patterns for
   generated text, the database's own Hebrew titles, and right-to-left arrows. */
const HE = {
 // shell, dates, generic
 'Thursday 1 October':'יום חמישי, 1 באוקטובר','Conference':'הכנס','20–22 October':'20–22 באוקטובר','days':'ימים','simulated':'הדמיה','Night':'לילה','Mon 19.10':'ב׳ 19.10','Search':'חיפוש','Day':'יום','Time':'שעה','View':'תצוגה','Filter':'סינון',
 'Main':'ראשי','Simulated clock':'שעון הדמיה','Done':'בוצע','Notes':'הערות','Preview':'תצוגה מקדימה','Foundation sign-off':'אישור הקרן','Botanical Gardens':'הגנים הבוטניים','Beit Hanina Sports Complex':'מתחם הספורט בית חנינא','Mishkenot / HaMazkeka':'משכנות / המזקקה','Play the day':'הפעלת היום','Pause':'השהיה','Hotels':'מלונות','—':'—','All':'הכל','Yes':'כן','Not yet':'עוד לא','Remove':'הסרה','Admin':'מנהל','Admin only':'למנהלים בלבד','admin only':'למנהלים בלבד','None':'אין','Status':'סטטוס','Site':'אתר','Name':'שם','Type':'סוג','Role':'תפקיד','Title':'כותרת','Start':'התחלה','End':'סיום','Due':'יעד','Owner':'אחראי','Dismiss':'התעלמות','Destination':'יעד','Close':'סגירה',
 // readiness + home
 'Milestones':'אבני דרך','Guests housed':'אורחים עם מלון','To-dos done':'משימות שבוצעו','Food confirmed':'אוכל מאושר','Transport booked':'הסעות שהוזמנו','Design approved':'עיצוב מאושר','Contracts signed':'חוזים חתומים',
 'They are missing from every pickup manifest':'הם לא מופיעים באף רשימת איסוף','From the last registration import':'מהייבוא האחרון של גיליון הרישום','Needed for the hotel VAT exemption':'נדרש לפטור ממע״מ במלון','The caterer sheet in the Print center lists them per meal':'דף הקייטרינג במרכז ההדפסה מפרט אותן לפי ארוחה','Viewers see the program only.':'צופים רואים רק את התוכנית.','₪395,800 incl. VAT in total':'₪395,800 כולל מע״מ בסך הכל',
 'NOW':'עכשיו','No guest session right now':'אין מפגש אורחים כרגע','Nothing else today':'אין עוד משהו היום','Crew on shift':'צוות במשמרת','No crew items running':'אין משמרות פעילות','Departing in the next 90 min':'יוצאות ב-90 הדקות הקרובות','No departures':'אין יציאות','Open issues today':'בעיות פתוחות היום',
 'Day-of mode: drag the clock or press play. Home follows the clock: what is live, who is on shift, which buses leave soon.':'מצב יום אירוע: גררו את השעון או לחצו הפעלה. דף הבית עוקב אחרי השעון: מה מתרחש, מי במשמרת ואילו אוטובוסים יוצאים בקרוב.',
 // program
 'Each session is one page: guest-facing details, transfers, catering, crew, AV brief, to-dos, notes and files.':'כל מפגש הוא עמוד אחד: פרטים לאורחים, הסעות, כיבוד, צוות, בריף טכני, משימות, הערות וקבצים.',
 'AV ✓':'בריף טכני ✓','menu ✓':'תפריט ✓','For guests':'לאורחים','Viewers see the public description, venue and times.':'צופים רואים את התיאור הציבורי, המקום והשעות.','No transfer around this time':'אין הסעה סביב השעה הזו','No catering linked':'אין כיבוד מקושר','No crew items linked':'אין משמרות צוות מקושרות','No to-dos':'אין משימות','Add a to-do':'הוספת משימה','New to-do':'משימה חדשה','Remove to-do':'הסרת משימה',
 'Stage, sound, lighting, screens, welcome slide':'במה, סאונד, תאורה, מסכים, שקופית פתיחה','Logistics or speaker notes':'הערות לוגיסטיקה או דוברים','No files yet. Dropped files that belong here are filed from the Inbox.':'אין קבצים עדיין. קבצים שנגררים לתיבה ושייכים לכאן יתויקו כאן.','Session added':'המפגש נוסף','Build lead':'אחראי הקמה','Site manager':'מנהל אתר',
 // people
 'Registered':'רשומים','No hotel recorded':'לא רשום מלון','Dietary needs':'צרכים תזונתיים','Missing passport':'חסר דרכון','No hotel':'ללא מלון','Dietary':'תזונה','Needs review':'לבדיקה','No passport':'ללא דרכון','Filter guests':'סינון אורחים','Import spreadsheet':'ייבוא גיליון','Desk':'דסק','Hotel':'מלון','Passport':'דרכון','Not recorded':'לא רשום','On file':'קיים','Missing':'חסר','Review':'לבדיקה',
 'Guest names are placeholders in this prototype; the counts match the live registry. Editors see names, hotels and dietary needs. Passports, phones and emails stay admin only.':'שמות האורחים באב־טיפוס הם דוגמה; המספרים תואמים את המרשם החי. עורכים רואים שמות, מלונות וצרכים תזונתיים. דרכונים, טלפונים ומיילים למנהלים בלבד.',
 'Canada':'קנדה','UK':'בריטניה','USA':'ארה״ב','Germany':'גרמניה','Italy':'איטליה','Switzerland':'שווייץ','Israel':'ישראל',
 'Mishkenot Sha’ananim':'משכנות שאננים',"Mishkenot Sha'ananim":'משכנות שאננים','Mishkenot':'משכנות','Inbal':'ענבל','King David':'המלך דוד','Dan Panorama':'דן פנורמה','Own arrangement':'הסדר עצמי',
 'Vegetarian':'צמחוני','Vegan':'טבעוני','Gluten-free':'ללא גלוטן','Kosher (strict)':'כשר (מהדרין)','No fish':'ללא דגים','Lactose-free':'ללא לקטוז','Nut allergy':'אלרגיה לאגוזים','None recorded':'לא נרשם',
 'Severe allergy':'אלרגיה חמורה','tell every caterer':'לעדכן כל ספק קייטרינג','Contact & travel documents':'פרטי קשר ומסמכי נסיעה','Email':'אימייל','Phone':'טלפון','[email]':'[אימייל]','[phone]':'[טלפון]','needed for VAT':'נדרש למע״מ','Sessions':'מפגשים',
 'Attending all main sessions. RSVPs per session feed the headcount for catering and transport.':'משתתף בכל המפגשים המרכזיים. אישורי ההגעה לכל מפגש מזינים את ספירת הכיבוד וההסעות.','Flagged in the last import':'סומן בייבוא האחרון','Details changed in the registration sheet.':'הפרטים השתנו בגיליון הרישום.','Reviewed':'נבדק','clear flag':'הסרת הסימון',
 'Production crew':'צוות הפקה','Hotel group leaders':'ראשי קבוצות במלונות',
 'Sound':'סאונד','site manager':'מנהל אתר','Transport':'הסעות','Tower of David':'מגדל דוד','Furniture':'ריהוט','Food':'אוכל','producer':'מפיק','Design & print':'עיצוב ודפוס','Ein Yael':'עין יעל','Cinematheque':'סינמטק','unconfirmed':'לא מאושר',
 'Schuster':'שוסטר','Designer':'מעצבת','Design':'עיצוב','AV':'הגברה',
 'Contacted':'נוצר קשר','Quote in':'התקבלה הצעה','Signed':'נחתם','Invoiced':'חשבונית','Total fees incl. VAT':'סך שכר כולל מע״מ','Move back':'החזרה',
 'Drop a quote, signed contract or invoice in the Inbox and the card moves by itself.':'גררו הצעת מחיר, חוזה חתום או חשבונית לתיבה והכרטיס יתקדם לבד.',
 'Panel host':'הנחיית פאנל','Train Theater':'תיאטרון הקרון','Performance + workshop':'מופע + סדנה','Jerusalem Theater':'תיאטרון ירושלים','Keynote speaker':'דובר מרכזי','Yoga':'יוגה','day 2':'יום 2','day 3':'יום 3','Run tour':'סיור ריצה','Round-table keynote':'דובר מרכזי לשולחנות עגולים','Arabic lesson for donors':'שיעור ערבית לתורמים','British Trail run':'ריצה במסלול הבריטי','TED-style build':'בניית טד','Science Museum':'מוזיאון המדע','Main performance':'הופעה מרכזית','gala':'גאלה','Additional booking':'הזמנה נוספת',
 'Organizations':'ארגונים','Confirmed':'אישרו','Need a power point':'צריכים נקודת חשמל','Organization':'ארגון','Field':'תחום','Power':'חשמל','Community':'קהילה','Education':'חינוך','Environment':'סביבה','Culture':'תרבות','Welfare':'רווחה','Sport':'ספורט',
 'Information form':'טופס מידע','Suggest':'הצעה','Signed in as':'מחובר/ת כ','Classic dashboard':'הדשבורד הקלאסי','Open classic dashboard':'פתיחת הדשבורד הקלאסי','Use the classic dashboard':'מעבר לדשבורד הקלאסי','Control Room':'חדר בקרה','Your name':'השם שלך','Access key':'מפתח גישה','Open':'פתיחה','Loading live data…':'טוען נתונים חיים…','sample':'דוגמה','Sample data':'נתוני דוגמה','not connected yet':'עוד לא מחובר','Live: changes here save to the same data as the classic dashboard. “Saved” appears only after the server confirms.':'חי: שינויים כאן נשמרים באותם נתונים של הדשבורד הקלאסי. ״נשמר״ מופיע רק אחרי שהשרת אישר.','Google Forms':'Google Forms','Open responses ↗':'פתיחת התשובות ↗','Responses so far':'תשובות עד עכשיו','organizations have filled it in':'ארגונים מילאו אותו','Community & welfare':'קהילה ורווחה','Education, sport & shared life':'חינוך, ספורט וחיים משותפים','East Jerusalem':'מזרח העיר','Culture & arts':'תרבות ואמנות','Special programs':'תוכניות מיוחדות','Organizations fair':'יריד ארגונים','Cinematheque, 22.10':'סינמטק, 22.10','The form collects what we need from each organization for the fair at the Cinematheque.':'הטופס אוסף את מה שאנחנו צריכים מכל ארגון ליריד בסינמטק.',
 'JF60 design moodboard':'מודבורד עיצוב JF60','Look and feel per venue and day':'שפה עיצובית לכל אתר ויום','23 pages':'23 עמודים','the reference for every design & print item':'הרפרנס לכל פריטי העיצוב והדפוס','Open PDF ↗':'פתיחת PDF ↗',
 'Totals match the “יריד דוכנים” tab (42 · 40 · 37). Organization names are placeholders here.':'המספרים תואמים ללשונית “יריד דוכנים” (42 · 40 · 37). שמות הארגונים כאן הם דוגמה.',
 'Venue':'אתר','Supplier':'ספק','Crew':'צוות','Filter contacts':'סינון אנשי קשר','Sound, AV & lighting':'סאונד, הגברה ותאורה','Coffee & pastries':'קפה ומאפה','Catering':'קייטרינג','Days 1–3 base':'בסיס ימים 1–3','Day 1 plenary':'מליאה יום 1','Opening evening':'ערב פתיחה','Art fair & dinner':'יריד אמנות וארוחת ערב','Day 3 morning':'בוקר יום 3','Think tank':'חשיבה משותפת','Closing gala':'גאלת סיום',
 'Peacock':'פיקוק','Talbiye':'טלבייה','HaMiffal':'המפעל','Cinematheque Jerusalem':'סינמטק ירושלים','Bloomfield Science Museum':'מוזיאון המדע בלומפילד','No contacts':'אין אנשי קשר','New contact':'איש קשר חדש',
 'Suppliers and venues from the production sheet; phone numbers are left out of the prototype.':'ספקים ואתרים מגיליון ההפקה; מספרי הטלפון הושמטו מאב־הטיפוס.',
 // logistics
 'Click a status to cycle it; click a run to see pickups per hotel.':'לחצו על סטטוס כדי לשנות אותו; לחצו על הסעה כדי לראות איסוף לפי מלון.','Change status':'שינוי סטטוס','Driver':'נהג','[driver · phone]':'[נהג · טלפון]','Not assigned':'לא שובץ','Pickups by hotel':'איסוף לפי מלון','Passengers':'נוסעים','Everyone attending the previous session.':'כל המשתתפים במפגש הקודם.','Driver sheet in the Print center':'דף נהג במרכז ההדפסה',
 'from the guest registry':'ממרשם האורחים','Menu on file':'תפריט קיים','read by AI':'נקרא על ידי AI',
 'Setup & strike':'הקמה ופירוק','Guest program':'תוכנית לאורחים','Open issues':'בעיות פתוחות','Nothing matches.':'אין תוצאות.',
 'Furniture & design install':'הקמת ריהוט ועיצוב','Crew arrival':'הגעת צוות','coffee station':'עמדת קפה','sound check':'בדיקת סאונד','Hotel pickups':'איסוף מהמלונות','Registration desk for walk-ins':'עמדת רישום למגיעים עצמאית','Advance vehicle':'רכב מקדים','sound setup, restrooms check':'הקמת סאונד ובדיקת שירותים','Board the double-decker':'עלייה לאוטובוס הקומתיים','Show (15 min) + tour':'הצגה (15 דק׳) + סיור','Tables, furniture, signage':'שולחנות, ריהוט, שילוט','Lunch + show':'ארוחת צהריים + הצגה','Panel':'פאנל','Jerusalem women leaders':'מובילות ירושלמיות','Round tables setup':'הקמת שולחנות עגולים','Morning program':'תוכנית בוקר','Setup for tomorrow':'הקמה למחר','Visit':'ביקור','Evening venue':'הקמת אתר הערב','Overnight build #1':'הקמת לילה #1','Build #2':'הקמה #2','engineer sign-off':'אישור מהנדס','Main gathering + organizations fair':'כינוס מרכזי + יריד ארגונים','Gala evening':'ערב גאלה','Overnight strike':'פירוק לילה',
 'Botanical Garden':'הגן הבוטני','Gazelle Valley':'עמק הצבאים','Gan Yael':'גן יעל','Beit Hanina':'בית חנינא','Hotels (4)':'מלונות (4)',
 'Desk location not decided':'מיקום העמדה לא הוחלט','Can the bus stand at Mishkenot?':'האם האוטובוס יכול לעמוד במשכנות?','Plan B needed':'נדרשת תוכנית ב׳','site manager unconfirmed':'מנהל אתר לא מאושר','Site manager unconfirmed':'מנהל אתר לא מאושר','Setup & strike lead not named':'אחראי הקמה ופירוק לא נקבע','Strike lead not named':'אחראי פירוק לא נקבע','Each vehicle: cooler with ice, water, soda.':'על כל רכב: צידנית עם קרח, מים וסודה.',
 'Unassigned':'לא שובץ','+ gap':'+ חוסר','Assistant producers':'עוזרי הפקה','Assistant producer':'עוזר הפקה','Free right now':'פנוי כרגע','Mark done':'סימון כבוצע','Mark not done':'ביטול ביצוע','Undo':'ביטול','Earlier':'מוקדם יותר','No assignments this day.':'אין משימות ביום הזה.','Preview as':'תצוגה כ',
 'What each crew member sees on their phone. It follows the clock above; assigning someone as lead adds the item to their day.':'מה שכל איש צוות רואה בטלפון. זה עוקב אחרי השעון למעלה; שיבוץ מישהו כאחראי מוסיף את המשימה ליום שלו.',
 'Phone preview':'תצוגת טלפון','overnight':'לילה','Finished':'הסתיים','Upcoming':'בקרוב','Open issue':'בעיה פתוחה','Mark resolved':'סימון כפתור','Admins resolve issues':'מנהלים פותרים בעיות','admins assign leads':'מנהלים משבצים אחראים','From the sheet':'מהגיליון','Upload a proof':'העלאת הגהה',
 // production
 'badge':'תג','print':'דפוס','signage':'שילוט','screen':'מסך','Content missing':'חסר תוכן','In design':'בעיצוב','Awaiting approval':'ממתין לאישור','Approved':'מאושר','Changes requested':'התבקשו שינויים','No design line':'ללא שורת עיצוב','Unresolved':'לא הוכרע',
 'content missing':'חסר תוכן','in design':'בעיצוב','awaiting approval':'ממתין לאישור','approved':'מאושר','changes':'שינויים','no design':'ללא עיצוב','unresolved':'לא הוכרע',
 'Proofs':'הגהות','No proofs yet. Drop one in the Inbox or add it here.':'אין הגהות עדיין. גררו אחת לתיבה או הוסיפו כאן.','Comments for the designer (optional)':'הערות למעצב (לא חובה)','Comment':'הערה','Approve for print':'אישור להדפסה','Request changes':'בקשת שינויים','Pending':'ממתין','Changes':'שינויים','Say what needs changing':'פרטו מה צריך לשנות','Approved for print':'אושר להדפסה','Inbox':'תיבת קבצים',
 'New milestone':'אבן דרך חדשה',
 'Venues':'אתרים','Speakers':'דוברים','Invitations':'הזמנות','Content':'תוכן','Logistics':'לוגיסטיקה','Tech':'טכני','Budget':'תקציב','General':'כללי',
 'Lock all venue bookings & site permits':'נעילת כל הזמנות האתרים והיתרי הגישה','Finalize speaker target list & invitations':'סגירת רשימת הדוברים ושליחת הזמנות','Confirm keynotes':'אישור דוברים מרכזיים','Send save-the-dates to donors':'שליחת Save the Date לתורמים','Confirm all panel moderators':'אישור כל מנחי הפאנלים','Lock catering vendors for all meals':'נעילת ספקי הקייטרינג לכל הארוחות','Curate Field-of-Action organizations':'אוצרות ארגוני שדה הפעולה','Confirm 11 Shai Doron leadership speakers':'אישור 11 דוברי תוכנית המנהיגות של שי דורון','Finalize orchestra, conductor & gala program':'סגירת התזמורת, המנצח ותוכנית הגאלה','Lock transport plan between venues':'נעילת תוכנית ההסעות בין האתרים','Curate artist studio stalls & purchase flow':'אוצרות דוכני סטודיו האמנים ותהליך הרכישה','Finalize RSVPs & headcount':'סגירת אישורי הגעה ומספר משתתפים','Design think-tank format & facilitation':'עיצוב מתכונת החשיבה המשותפת וההנחיה','Collect speaker bios, headshots & materials':'איסוף ביוגרפיות, תמונות וחומרי דוברים','Finalize AV, sound & staging per venue':'סגירת הגברה, סאונד ובמה לכל אתר','Close budget & sign all vendor contracts':'סגירת התקציב וחתימה על חוזי הספקים','Produce run-of-show, signage & badges':'הפקת לו״ז מפורט, שילוט ותגים','Brief moderators, hosts & crew':'תדריך למנחים, מארחים וצוות','Final walkthrough of every venue':'סיור סופי בכל אתר','Confirm guest movements, hotels & VIPs':'אישור תנועות אורחים, מלונות ואח״מים','Load-in, setup & rehearsals':'הכנסת ציוד, הקמה וחזרות','Conference Day 1':'יום הכנס הראשון',
 'Lines in the sheet':'שורות בגיליון','With a quote on file':'עם הצעת מחיר','No quote':'אין הצעה','Quote on file':'הצעה קיימת','excl. VAT':'לפני מע״מ','Sound technician':'טכנאי סאונד','3 days':'3 ימים','Double-decker bus':'אוטובוס קומתיים','Dedicated cleaner':'מנקה צמוד','Water & soda for rides':'מים וסודה לנסיעות','TBC':'טרם נקבע','Peacock + Talbiye':'פיקוק + טלבייה','Gifts chosen':'מתנות שנבחרו',
 'Six real lines shown; the other 50 import from the “תקציב” tab. Quotes and invoices dropped in the Inbox attach here.':'מוצגות שש שורות אמיתיות; 50 הנוספות ייובאו מלשונית “תקציב”. הצעות וחשבוניות שנגררות לתיבה מצורפות כאן.',
 // inbox
 'PDF, images, Word, Excel, CSV':'PDF, תמונות, Word, Excel, CSV','quotes, invoices, menus, proofs, riders, guest lists…':'הצעות מחיר, חשבוניות, תפריטים, הגהות, ריידרים, רשימות אורחים…','Nothing waiting.':'אין מה לבדוק.','Nothing filed yet.':'עוד לא תויק דבר.','An admin files this one.':'מנהל מתייק את זה.',
 'Quote':'הצעת מחיר','Budget line':'שורת תקציב','Invoice / receipt':'חשבונית / קבלה','Signed contract':'חוזה חתום','Talent & contracts':'תוכן וחוזים','Menu':'תפריט','Food & drink item':'פריט אוכל ושתייה','Design proof':'הגהת עיצוב','Design & print item':'פריט עיצוב ודפוס','Guest registration export':'גיליון רישום אורחים','Guests':'אורחים','review changes':'בדיקת שינויים','Tech rider / AV brief':'ריידר טכני / בריף','Session':'מפגש','AV brief':'בריף טכני','Driver / vehicle list':'רשימת נהגים / רכבים','Transport runs':'הסעות','Run sheet / crew schedule':'לו״ז רץ / לו״ז צוות','Crew schedule':'לו״ז צוות','Exhibitor list':'רשימת מציגים','Organizations fair':'יריד ארגונים','Speaker bio / headshot':'ביוגרפיה / תמונת דובר','files':'קבצים','Files':'קבצים','Floor plan / site map':'תוכנית קומה / מפת אתר','Other document':'מסמך אחר','Contracts':'חוזים',
 'Price quote from Schuster for sound across all three days.':'הצעת מחיר משוסטר לסאונד בכל שלושת הימים.','Amount':'סכום','Covers':'כולל','PA and wireless mics, 3 days':'הגברה ומיקרופונים אלחוטיים, 3 ימים','Valid until':'בתוקף עד',
 'Final lunch menu from Ein Yael: 3 courses, a choice of two mains. Prices were removed.':'תפריט צהריים סופי מעין יעל: 3 מנות, בחירה בין שתי עיקריות. המחירים הוסרו.','Courses':'מנות','Choice':'בחירה','Main course':'מנה עיקרית','2 options':'2 אפשרויות',
 'Second version of the bus window sign artwork, ready for sign-off.':'גרסה שנייה של שלט חלון האוטובוס, מוכנה לאישור.','Item':'פריט','Bus window sign':'שלט לחלון האוטובוס','Version':'גרסה','Size':'גודל','A3 landscape':'A3 לרוחב',
 'Technical rider for the opening-evening performance: stage, sound and lighting needs.':'ריידר טכני למופע ערב הפתיחה: דרישות במה, סאונד ותאורה.','Performance':'מופע','Needs':'דרישות','Stage, sound, lighting':'במה, סאונד, תאורה','Contact':'איש קשר','Production manager':'מנהל הפקה',
 'Registration spreadsheet. Compared with the registry: 3 new guests, 7 changed, 1 no longer listed.':'גיליון רישום. בהשוואה למרשם: 3 אורחים חדשים, 7 שינויים, 1 כבר לא ברשימה.','Rows':'שורות','New':'חדשים','Changed':'שונו','Gone':'הוסרו','Sheets':'גיליונות',
 'Invoice for the coffee station at Mishkenot on 20.10.':'חשבונית עבור עמדת הקפה במשכנות ב-20.10.','For':'עבור',
 'I could not tell what this is from its name. Pick a type, or keep it as a plain file.':'לא הצלחתי לזהות מה זה לפי השם. בחרו סוג, או שמרו כקובץ רגיל.',
 'Prototype: the sample documents are pre-read; files you drop are sorted by name and type, and spreadsheets are opened to count rows. In the app, Claude reads each file, extracts the details and suggests where it goes. Nothing is filed until someone presses Apply.':'אב־טיפוס: מסמכי הדוגמה כבר נקראו; קבצים שתגררו ממוינים לפי שם וסוג, וגיליונות נפתחים לספירת שורות. באפליקציה Claude קורא כל קובץ, מחלץ את הפרטים ומציע לאן לתייק. שום דבר לא מתויק עד שמישהו לוחץ על תיוק.',
 'Dismissed':'הוסר',
 // print
 'Guest program':'תוכנית לאורחים','Bilingual, one page per day':'דו־לשונית, עמוד לכל יום','Run of show':'לו״ז מפורט','Detailed program':'לו״ז מפורט','Sessions, run-of-show lines and transport by time · for the Foundation':'מפגשים, לו״ז מפורט והסעות לפי שעה · לקרן','Internal: sessions, crew, transport, catering by time':'פנימי: מפגשים, צוות, הסעות וכיבוד לפי שעה','Driver sheets':'דפי נהגים','One per run: time, route, pickups per hotel':'אחד לכל הסעה: שעה, מסלול, איסוף לפי מלון','Caterer dietary sheet':'דף תזונה לקייטרינג','Counts per requirement, severe allergies highlighted':'ספירה לפי דרישה, אלרגיות חמורות מודגשות','Hotel manifests':'רשימות מלון','Guests per hotel with group leader':'אורחים לפי מלון עם ראש הקבוצה','Supplier brief':'בריף לספק','AV needs per session, from the AV briefs':'צרכי הגברה לכל מפגש, מתוך הבריפים','Crew contact sheet':'דף קשר לצוות','Crew, roles, sites and group leaders':'צוות, תפקידים, אתרים וראשי קבוצות',
 'Every document is built from the live data, so it is always current. Today these are three separate buttons spread across tabs.':'כל מסמך נבנה מהנתונים החיים, ולכן תמיד מעודכן. היום אלה שלושה כפתורים נפרדים בלשוניות שונות.',
 'Jerusalem — Yesterday, Today and Tomorrow':'ירושלים — אתמול, היום ומחר','20–22 October 2026':'20–22 באוקטובר 2026','The Jerusalem Foundation at 60':'הקרן לירושלים בת 60','Internal':'פנימי','Dietary requirements':'דרישות תזונה','for every caterer':'לכל ספק קייטרינג','Summary':'סיכום','SEVERE':'חמור','Meals':'ארוחות','Brief for Schuster':'בריף לשוסטר','Sound, AV and lighting per session':'סאונד, הגברה ותאורה לכל מפגש','AV brief missing':'חסר בריף טכני','Download PDF':'הורדת PDF','In the app this downloads the PDF':'באפליקציה זה מוריד את ה-PDF',
 // settings
 'Person':'אדם','Last active':'פעילות אחרונה','Personal key':'מפתח אישי','Active':'פעיל','Revoked':'בוטל','New key':'מפתח חדש','Revoke':'ביטול גישה','Restore':'שחזור','Today':'היום','Yesterday':'אתמול','2 days ago':'לפני יומיים','Never':'אף פעם','Last week':'בשבוע שעבר','Board preview':'תצוגת הנהלה',
 'Shared keys (admin · edit · view) still work until they are rotated.':'המפתחות המשותפים (מנהל · עורך · צופה) עובדים עד שיוחלפו.','Plan rotation':'תכנון החלפה','Invite someone by name':'הזמנת אדם לפי שם','Create key':'יצירת מפתח',
 'Everyone gets their own key: one person can be removed without changing everyone’s, and every change in the log has a real name.':'לכל אחד מפתח משלו: אפשר להסיר אדם אחד בלי להחליף לכולם, ולכל שינוי ביומן יש שם אמיתי.',
 'Editors can':'עורכים יכולים','Always admin only':'תמיד למנהלים בלבד','Delete files (also removes them from storage)':'מחיקת קבצים (מוחקת גם מהאחסון)','Delete contacts':'מחיקת אנשי קשר','Change transport status':'שינוי סטטוס הסעות','See the budget':'צפייה בתקציב','Approve design proofs':'אישור הגהות עיצוב','File documents from the Inbox':'תיוק מסמכים מהתיבה',
 'Guest passports, phones and emails':'דרכונים, טלפונים ומיילים של אורחים','Talent fees and contracts':'שכר ותוכן וחוזים','Access & activity':'הרשאות ופעילות','Resolve issues and assign leads':'פתרון בעיות ושיבוץ אחראים',
 'Switch the role to Editor in the sidebar to see a change take effect immediately.':'החליפו תפקיד לעורך בסרגל הצד כדי לראות את השינוי מיד.',
 'System':'מערכת','You (admin)':'את/ה (מנהל)','Editor preview':'תצוגת עורך','Viewer preview':'תצוגת צופה','Imported the production sheet (crew schedule, talent, budget)':'יובא גיליון ההפקה (לו״ז צוות, תוכן, תקציב)',
 // palette + toasts
 'Ask':'שאלה','Go to':'מעבר אל','Transport ':'הסעה','Milestone':'אבן דרך','Guest':'אורח','Print':'הדפסה',
 'Demo reset':'ההדגמה אופסה','Day-of mode on · Home follows the clock':'מצב יום אירוע פעיל · דף הבית עוקב אחרי השעון','Day-of mode off':'מצב יום אירוע כבוי','Rotating shared keys logs everyone out; plan it with the team':'החלפת המפתחות המשותפים מנתקת את כולם; תאמו עם הצוות'
};
const HX = [
 [/^(\d+) sessions$/,'$1 מפגשים'],[/^(\d+) guests$/,'$1 אורחים'],[/^(\d+) venues$/,'$1 אתרים'],
 [/^(\d+) milestones overdue$/,'$1 אבני דרך באיחור'],[/^Oldest: (.+) \(due (\S+)\)$/,(m,a,b)=>'הוותיקה: '+trk(a)+' (יעד '+b+')'],
 [/^(\d+) of (\d+) talent contracts not signed$/,'$1 מתוך $2 חוזי תוכן לא חתומים'],[/^(\d+) quotes received$/,'התקבלו $1 הצעות מחיר'],
 [/^(\d+) transport runs have no driver$/,'ל-$1 הסעות אין נהג'],[/^(\d+) more need a decision$/,'$1 נוספות דורשות החלטה'],
 [/^(\d+) crew slots without a lead$/,'$1 משמרות צוות ללא אחראי'],[/^(\d+) design proofs waiting for sign-off$/,'$1 הגהות ממתינות לאישור'],[/^(\d+) design items past deadline$/,'$1 פריטי עיצוב עברו את הדדליין'],
 [/^(\d+) guests have no hotel recorded$/,'ל-$1 אורחים לא רשום מלון'],[/^(\d+) guests flagged for review$/,'$1 אורחים מסומנים לבדיקה'],[/^(\d+) guests missing a passport number$/,'ל-$1 אורחים חסר מספר דרכון'],
 [/^(\d+) severe allergy$/,'$1 אלרגיה חמורה'],[/^(\d+) dietary requirements$/,'$1 דרישות תזונה'],[/^(\d+) severe$/,'$1 חמורים'],
 [/^in (\d+) days$/,'בעוד $1 ימים'],[/^in (\d+)d$/,'בעוד $1 ימים'],[/^(\d+)d late$/,'באיחור $1 ימים'],[/^(\d+)d left$/,'נותרו $1 ימים'],[/^(\d+)d overdue$/,'באיחור $1 ימים'],
 [/^until (\S+)$/,'עד $1'],[/^UNTIL (\S+)$/,'עד $1'],[/^due (\S+)$/,'יעד $1'],[/^Next at (\S+)$/,'הבא ב-$1'],[/^(\d+) leads$/,'$1 אחראים'],[/^(\d+) files$/,'$1 קבצים'],[/^(\d+) shifts$/,'$1 משמרות'],[/^(\d+) assignments$/,'$1 משימות'],[/^(\d+) pax$/,'$1 נוסעים'],
 [/^(\d+) not on any manifest$/,'$1 לא באף רשימה'],[/^group leader (.+)$/,(m,a)=>'ראש קבוצה '+trk(a)],[/^leader (.+)$/,(m,a)=>'ראש קבוצה '+trk(a)],
 [/^(\d+) (assistant producer|assistant producers|escorts|ushers|crew|table heads)$/,(m,n,r)=>n+' '+({'assistant producer':'עוזר הפקה','assistant producers':'עוזרי הפקה',escorts:'מלווים',ushers:'סדרנים',crew:'אנשי צוות','table heads':'ראשי שולחן'})[r]],
 [/^(.+) \?$/,(m,a)=>trk(a)+' ?'],[/^(.+) unassigned$/,(m,a)=>trk(a)+' לא שובץ'],[/^(.+) desk$/,(m,a)=>'דסק '+trk(a)],
 [/^Guest (\d+)$/,'אורח $1'],[/^Organization (\d+)$/,'ארגון $1'],[/^proof v(\d+)$/,'הגהה v$1'],[/^v(\d+)$/,'v$1'],
 [/^These (\d+) lines, excl\. VAT$/,'$1 השורות האלה, לפני מע״מ'],[/^(₪[\d,]+) excl\. VAT$/,'$1 לפני מע״מ'],
 [/^(\d+) changes flagged for review$/,'$1 שינויים סומנו לבדיקה'],
 [/^(\d+) of (\d+) organizations haven’t filled in the information form$/,'$1 מתוך $2 ארגונים עוד לא מילאו את טופס המידע'],[/^(\d+) still to answer\.$/,'עוד $1 לא ענו.'],[/^(\d+) of (\d+)$/,'$1 מתוך $2'],[/^Information form: (\d+) of (\d+) organizations answered$/,'טופס מידע: $1 מתוך $2 ארגונים ענו'],
 [/^Looks like a (.+)\. The app would read the contents to confirm and pull out the details\.$/,(m,a)=>'נראה כמו '+trk(a.charAt(0).toUpperCase()+a.slice(1))+'. באפליקציה המסמך ייקרא כדי לאשר ולחלץ את הפרטים.'],
 [/^printed (.+)$/,'הודפס $1'],[/^Bus: (.+)$/,(m,a)=>'הסעה: '+trk(a)],[/^Crew: (.+)$/,(m,a)=>'צוות: '+trk(a)],
 [/^Today (\S+)$/,'היום $1'],[/^Ask: (.+)$/,'שאלה: $1'],[/^(\d\d:\d\d) (.+)$/,(m,a,b)=>a+' '+trk(b)],[/^(.+) →$/,(m,a)=>trk(a)+' →'],[/^→ (.+)$/,(m,a)=>'→ '+trk(a)],
 [/^(\d+) files? added$/,'נוספו $1 קבצים'],[/^Filed to (.+)$/,(m,a)=>'תויק אל '+trk(a)],[/^New key created for (.+) · the old one stopped working$/,(m,a)=>'נוצר מפתח חדש עבור '+trk(a)+' · הישן הפסיק לעבוד'],[/^Key created · send it to (.+) privately$/,(m,a)=>'המפתח נוצר · שלחו אותו ל'+trk(a)+' באופן פרטי'],
 [/^Filed “(.+)” → (.+)$/,(m,a,b)=>'תויק “'+a+'” → '+trk(b)],[/^Completed to-do “(.+)”$/,(m,a)=>'בוצעה המשימה “'+trk(a)+'”'],[/^Reopened to-do “(.+)”$/,(m,a)=>'נפתחה מחדש המשימה “'+trk(a)+'”'],[/^Added to-do “(.+)”$/,'נוספה המשימה “$1”'],
 [/^Completed milestone “(.+)”$/,(m,a)=>'הושלמה אבן הדרך “'+trk(a)+'”'],[/^Reopened milestone “(.+)”$/,(m,a)=>'נפתחה מחדש אבן הדרך “'+trk(a)+'”'],[/^Approved “(.+)” v(\d+)$/,(m,a,b)=>'אושר “'+trk(a)+'” v'+b],[/^Requested changes on “(.+)” v(\d+)$/,(m,a,b)=>'התבקשו שינויים ב“'+trk(a)+'” v'+b],
 [/^Assigned (\S+) to “(.+)”$/,(m,a,b)=>'שובץ '+trk(a)+' ל“'+trk(b)+'”'],[/^Marked done: (.+)$/,(m,a)=>'סומן כבוצע: '+trk(a)],[/^Reopened: (.+)$/,(m,a)=>'נפתח מחדש: '+trk(a)],[/^Resolved: (.+)$/,(m,a)=>'נפתר: '+trk(a)],
 [/^Moved “(.+)” to (\S+)$/,(m,a,b)=>'הועבר “'+trk(a)+'” ל'+({contacted:'נוצר קשר',quote:'הצעה',signed:'נחתם',invoiced:'חשבונית'})[b]],[/^Revoked access for (.+)$/,(m,a)=>'בוטלה הגישה של '+trk(a)],[/^Restored access for (.+)$/,(m,a)=>'שוחזרה הגישה של '+trk(a)],[/^Issued a new key for (.+)$/,(m,a)=>'הונפק מפתח חדש ל'+trk(a)],[/^Created a key for (.+)$/,(m,a)=>'נוצר מפתח ל'+trk(a)],
 [/^(.+): locked$/,(m,a)=>trk(a)+': נעול'],
 [/^([A-Za-z’' ]+) (\d+)$/,(m,a,n)=>{ const r = trk(a); return r === a.trim() ? m : r + ' ' + n; }],
 [/^Generated “(.+)”$/,(m,a)=>'הופק “'+trk(a)+'”'],[/^Set hotel for (.+) to (.+)$/,(m,a,b)=>'עודכן מלון ל'+trk(a)+': '+trk(b)]
];
let HE_DYN = {};
function buildDyn(){
  HE_DYN = {};
  const put = (en, he) => { if (en && he) HE_DYN[en] = he; };
  D.ev.forEach(e => { put(e.title, e.title_he); put(e.venue, e.venue_he); });
  D.food.forEach(f => put(f.title, f.title_he)); D.runs.forEach(r => put(r.title, r.title_he));
  D.design.forEach(d => put(d.title, d.title_he)); D.gifts.forEach(g => { put(g.title, g.title_he); put(g.cat, g.cat_he); });
  D.todos.forEach(x => put(x.text, x.text_he));
}
function trk(k){
  k = k.trim();
  const edge = k.match(/^([·→←,\s]*)([\s\S]*?)([·→←,\s]*)$/);
  if (edge && (edge[1] || edge[3]) && edge[2]) return edge[1] + trkCore(edge[2]) + edge[3];
  return trkCore(k);
}
function trkCore(k){
  if (!k || !/[A-Za-z]/.test(k)) return k;
  if (HE[k] != null) return HE[k];
  if (HE_DYN[k] != null) return HE_DYN[k];
  for (const [re, fn] of HX) { const m = k.match(re); if (m) return typeof fn === 'string' ? k.replace(re, fn) : fn(...m); }
  for (const sep of [' · ', ' → ', ' — ', ', ', ' + ']) if (k.includes(sep)) {
    const parts = k.split(sep), out = parts.map(p => trk(p));
    if (out.some((o, i) => o !== parts[i].trim())) return out.join(sep);
  }
  return k;
}
const heDone = new WeakSet();
function heWalk(){
  if (S.lang !== 'he') return;
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    if (heDone.has(n)) continue;
    const p = n.parentElement;
    if (!p || /^(SCRIPT|STYLE)$/.test(p.tagName) || p.closest('[data-notr]')) continue;
    let v = n.nodeValue;
    if (/[A-Za-z]/.test(v)) { const k = v.trim(); const r = trk(k); if (r !== k) v = v.replace(k, r); }
    v = v.replace(/[→←]/g, c => c === '→' ? '←' : '→');
    heDone.add(n);
    if (v !== n.nodeValue) n.nodeValue = v;
  }
  document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(el => ['placeholder','aria-label','title'].forEach(a => { const v = el.getAttribute(a); if (v && /[A-Za-z]/.test(v)) { const r = trk(v); if (r !== v.trim()) el.setAttribute(a, r); } }));
}
let heQueued = false;
new MutationObserver(() => { if (S.lang !== 'he' || heQueued) return; heQueued = true; queueMicrotask(() => { heQueued = false; buildDyn(); heWalk(); }); }).observe(document.body, { childList:true, subtree:true });

/* ============================ global wiring ============================ */
$('scrim').onclick = closeSheet;
$('openPal').onclick = openPal;
$('pal').onclick = e => { if (e.target.id === 'pal') closePal(); };
$('palIn').oninput = () => { palSel = 0; drawPal(); };
$('palIn').onkeydown = e => { const items = palItems($('palIn').value);
  if (e.key === 'ArrowDown') { palSel = Math.min(palSel+1, items.length-1); drawPal(); e.preventDefault(); }
  else if (e.key === 'ArrowUp') { palSel = Math.max(palSel-1, 0); drawPal(); e.preventDefault(); }
  else if (e.key === 'Enter' && items[palSel]) { const it = items[palSel]; if (it.k !== 'Ask' || LIVE) closePal(); it.fn(); } };
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('pal').hidden ? openPal() : closePal(); }
  else if (e.key === 'Escape') { if (!$('pal').hidden) closePal(); else closeSheet(); } });
$('dropTop').onclick = () => $('fileIn').click();
$('suggestTop').onclick = () => openSuggest('');
$('askTop').onclick = () => openAsk('');
$('fileIn').onchange = defaultPick;
$('dayofBtn').onclick = () => { S.dayof = !S.dayof; if (S.dayof) { S.area = 'home'; S.viewDay = null; } render(); toast(S.dayof ? 'Day-of mode on · Home follows the clock' : 'Day-of mode off'); };
document.querySelectorAll('#classicLink,[data-classic]').forEach(a => a.addEventListener('click', () => { try { localStorage.setItem('jf60-ui', 'classic'); } catch(e){} }));
function showGate(msg){ $('gate').hidden = false; $('gErr').textContent = msg || ''; $('gName').value = NAME; setTimeout(() => $('gKey').focus(), 0); }
$('gateForm').onsubmit = async e => {
  e.preventDefault(); KEY = $('gKey').value.trim(); NAME = $('gName').value.trim(); if (!KEY) return; try { sessionStorage.removeItem('jf60v'); } catch(e){}
  try { await loadLive(); try { sessionStorage.setItem('jf60k', KEY); sessionStorage.setItem('jf60n', NAME); } catch(e){} $('gate').hidden = true; afterLogin(); }
  catch(err){ $('gErr').textContent = String(err && err.message) === 'unauthorized' ? 'That key wasn’t accepted.' : 'Couldn’t load the live data. Try again.'; }
};
try { localStorage.setItem('jf60-ui', 'control'); } catch(e){}
document.addEventListener('dragover', e => { if (can.file() && e.dataTransfer && [...(e.dataTransfer.types||[])].includes('Files')) e.preventDefault(); });
document.addEventListener('drop', e => { if (e.target.closest && e.target.closest('#drop')) return; if (can.file() && e.dataTransfer && e.dataTransfer.files.length) { e.preventDefault(); addFiles(e.dataTransfer.files); } });

$('page').innerHTML = '<div class="empty">Loading live data…</div>';
setInterval(() => { if (LIVE && document.visibilityState === 'visible' && !$('sheet').classList.contains('on') && $('pal').hidden && !typingInPage()) loadLive().then(render).catch(() => {}); }, 60000);
function accessHello(){
  let v = null; try { v = JSON.parse(sessionStorage.getItem('jf60v') || 'null'); } catch(e){}
  if (v && v.id && v.name === NAME && v.level === LIVE.level) return;
  api('access/hello', { name:NAME, ui:'control' }).then(r => { if (r && r.id) try { sessionStorage.setItem('jf60v', JSON.stringify({ id:r.id, name:NAME, level:LIVE.level })); } catch(e){} }).catch(() => {});
}
setInterval(() => { if (!LIVE || document.visibilityState !== 'visible') return; let v = null; try { v = JSON.parse(sessionStorage.getItem('jf60v') || 'null'); } catch(e){} if (v && v.id) api('access/ping', { id:v.id }).catch(() => {}); }, 300000);
/* ---- first-visit guided tour ---- */
const TOUR = [
  { en:['Welcome to the Control Room','One live place for the whole conference: program, people, logistics, production and files. It uses the same data as the classic dashboard, so a change here is saved for everyone once the server confirms it: the line under the top bar says Saving…, Saved or what went wrong.','Use Next, or the arrow keys. Esc closes the tour.'],
    he:['ברוכים הבאים לחדר הבקרה','מקום אחד חי לכל הכנס: תוכנית, אנשים, לוגיסטיקה, הפקה וקבצים. הנתונים משותפים עם הדשבורד הקלאסי, כך ששינוי כאן נשמר לכולם ברגע שהשרת מאשר: השורה מתחת לסרגל העליון מראה שומר…, נשמר או מה השתבש.','ממשיכים בכפתור הבא או בחיצים. Esc סוגר את הסיור.'] },
  { sel:'#navList', en:['The sections','Home shows what needs attention. Program has every session. People covers guests, crew, talent, the organizations fair and contacts. Logistics is crew schedule, transport and food. Production is design, milestones, budget and gifts.',''],
    he:['האזורים','בית מראה מה דורש טיפול. בתוכנית כל המפגשים. באנשים: אורחים, צוות, תוכן, יריד הארגונים ואנשי קשר. בלוגיסטיקה: לו״ז צוות, הסעות ואוכל. בהפקה: עיצוב, אבני דרך, תקציב ומתנות.',''] },
  { sel:'#page .ready', go:['home'], en:['Readiness at a glance','Each bar is how far one part of the production has come, for example transport runs with a driver or design items approved. Click a bar to jump to it.',''],
    he:['מוכנות במבט אחד','כל פס מראה כמה התקדם תחום אחד בהפקה, למשל הסעות עם נהג או פריטי עיצוב שאושרו. לחיצה על פס מובילה אליו.',''] },
  { sel:'#page section:has(.att)', role:'edit', go:['home'], en:['Needs attention','The open problems, worst first: runs without a driver, crew slots without a lead, proofs waiting for sign-off. Start your day here and click a line to fix it.',''],
    he:['דורש טיפול','הבעיות הפתוחות, החמורות קודם: הסעות בלי נהג, משמרות בלי אחראי, הגהות שמחכות לאישור. כדאי להתחיל כאן כל יום וללחוץ על שורה כדי לטפל בה.',''] },
  { sel:'#page [data-ev]', go:['program','1'], en:['Every session has a page','The program is split by day. Click any session to open its drawer.',''],
    he:['לכל מפגש יש דף','התוכנית מחולקת לפי ימים. לחיצה על מפגש פותחת את המגירה שלו.',''] },
  { sel:'#sheet', drawer:true, en:['The session drawer','Everything about one session in one place: transport, food, crew, to-dos, the AV brief, furniture, venue contacts, notes and files. Edits save as you go; you will see “Saved”.',''],
    he:['מגירת המפגש','כל מה שקשור למפגש אחד במקום אחד: הסעות, אוכל, צוות, משימות, בריף טכני, ריהוט, אנשי קשר במקום, הערות וקבצים. כל שינוי נשמר מיד, ומופיע “נשמר”.',''],
    view:{ en:['The session page','Viewers see the guest-facing details: time, venue and description.',''], he:['דף המפגש','בצפייה רואים את הפרטים לאורחים: שעה, מקום ותיאור.',''] } },
  { sel:'#openPal', en:['Search or jump','Type a session, a person or a section to jump straight there. ⌘K (Ctrl+K) opens it from anywhere.',''],
    he:['חיפוש וקפיצה','מקלידים מפגש, אדם או אזור וקופצים ישר אליו. ⌘K (או Ctrl+K) פותח את החיפוש מכל מקום.',''] },
  { sel:'#askTop', en:['Ask','Ask a question about the project in plain words, in English or Hebrew. The answer comes from the live data. Asking never changes anything.','Guests are included as numbers only, never names.'],
    he:['שאלה','שואלים שאלה על הפרויקט במילים פשוטות, בעברית או באנגלית. התשובה מבוססת על הנתונים החיים. שאלה לא משנה כלום.','אורחים נכללים כמספרים בלבד, בלי שמות.'] },
  { sel:'#suggestTop', role:'edit', en:['Suggest changes','Describe a change, like “move the Beit Hanina visit to 16:00”. Claude turns it into concrete edits you review before anything happens.','Only admins can apply suggestions.'],
    he:['הצעת שינויים','מתארים שינוי, למשל “להזיז את הביקור בבית חנינא ל-16:00”. Claude הופך אותו לשינויים מוגדרים שבודקים לפני שמשהו קורה.','רק מנהלים יכולים לאשר הצעות.'] },
  { sel:'#dropTop', role:'edit', en:['Add a file','Drop a quote, menu, proof, contract or list here (or anywhere on the page). Claude reads it and suggests where it belongs; it waits in the Inbox until someone presses Apply.',''],
    he:['הוספת קובץ','גוררים לכאן הצעת מחיר, תפריט, הגהה, חוזה או רשימה (או לכל מקום בעמוד). Claude קורא ומציע לאן הקובץ שייך, והוא מחכה בתיבת הקבצים עד שמישהו מאשר.',''] },
  { sel:'nav.side [data-area=print]', role:'edit', en:['Print center','Run of show, driver sheets, hotel lists, the caterer sheet and the AV brief for Schuster, built from the live data so they are always current.',''],
    he:['מרכז הדפסה','לו״ז רץ, דפי נהגים, רשימות מלונות, דף לקייטרינג ובריף טכני לשוסטר, נבנים מהנתונים החיים ולכן תמיד מעודכנים.',''] },
  { sel:'#dayofBtn', en:['Day-of mode','During 20–22.10, switch this on and Home follows the clock: what is happening now, what is next and what is running late.',''],
    he:['מצב יום אירוע','ב-20–22.10 מדליקים את זה, והבית עוקב אחרי השעון: מה קורה עכשיו, מה הבא ומה מתעכב.',''] },
  { sel:'nav.side [data-area=settings]', role:'admin', en:['Access & activity','Sign-ins shows who opened the app, when and for how long. Only admins see this section.',''],
    he:['הרשאות ופעילות','בכניסות רואים מי נכנס לאפליקציה, מתי ולכמה זמן. רק מנהלים רואים את האזור הזה.',''] },
  { sel:'nav.side .foot', en:['Language and the classic dashboard','Switch between English and Hebrew here. The classic dashboard is still available; both show the same data. This tour is here too, whenever you want it again.',''],
    he:['שפה והדשבורד הקלאסי','כאן מחליפים בין עברית לאנגלית. הדשבורד הקלאסי עדיין זמין, ושניהם מציגים את אותם נתונים. גם הסיור הזה נמצא כאן, אם תרצו לעבור עליו שוב.',''] },
  { end:true }
];
const TOUR_END = { view:{ en:['You are all set','Your key is view-only: you can browse the program and ask questions. To make changes, ask an admin for an edit key.',''], he:['הכול מוכן','המפתח שלך לצפייה בלבד: אפשר לעיין בתוכנית ולשאול שאלות. לשינויים צריך מפתח עריכה ממנהל.',''] },
  edit:{ en:['You are all set','Your key can edit: tick to-dos, change statuses, fill briefs, add files and suggest changes. A few things, like applying suggestions, are admin-only, and the budget opens only with the chief key.',''], he:['הכול מוכן','המפתח שלך מאפשר עריכה: לסמן משימות, לשנות סטטוסים, למלא בריפים, להוסיף קבצים ולהציע שינויים. כמה דברים, כמו אישור הצעות, שמורים למנהלים, והתקציב נפתח רק עם מפתח chief.',''] },
  admin:{ en:['You are all set','You have admin access: talent, applying suggestions and usage information. The budget sheet and chief-only files open only with the chief key.',''], he:['הכול מוכן','יש לך גישת מנהל: תוכן וחוזים, אישור הצעות ומידע על שימוש. גיליון התקציב וקבצי chief נפתחים רק עם מפתח chief.',''] } };
let tourI = -1, tourSteps = [];
const tourRank = { viewer:0, edit:1, admin:2 };
const tourVisible = sel => { const el = sel && document.querySelector(sel); if (!el || el.hidden) return null; const r = el.getBoundingClientRect(); return r.width && r.height ? el : null; };
function tourStart(){
  tourSteps = TOUR.filter(st => !st.role || tourRank[S.role] >= tourRank[st.role === 'edit' ? 'edit' : st.role]);
  tourI = 0; if (!$('tour')) { const d = document.createElement('div'); d.id = 'tour'; d.setAttribute('data-notr', ''); d.innerHTML = '<div class="spot none"></div><div class="card" role="dialog" aria-modal="true" aria-labelledby="tourH"></div>'; document.body.appendChild(d); }
  $('tour').hidden = false; tourShow();
}
function tourClose(done){ if ($('tour')) $('tour').hidden = true; tourI = -1; closeSheet(); if (done) try { localStorage.setItem('jf60-tour', 'done'); } catch(e){} }
function tourShow(dir){
  dir = dir || 1; if (tourI < 0) tourI = 0;
  const st = tourSteps[tourI]; if (!st) return tourClose(true);
  if (st.go) go(st.go[0], st.go[1]); else if (!st.drawer && $('sheet').classList.contains('on')) closeSheet();
  if (st.drawer) { const first = D.ev.find(e => e.day === 1) || D.ev[0]; if (first) { if (S.area !== 'program') go('program', String(first.day)); openEvent(first.id); } }
  setTimeout(() => {
    const lang = S.lang === 'he' ? 'he' : 'en';
    let txt = st.end ? TOUR_END[S.role === 'viewer' ? 'view' : S.role][lang] : (isView() && st.view ? st.view[lang] : st[lang]);
    const el = st.end ? null : tourVisible(st.sel);
    if (!st.end && st.sel && !el) { tourI += dir; return tourShow(dir); } // skip a step whose element isn't on screen (e.g. phone layout)
    const spot = $('tour').querySelector('.spot'), card = $('tour').querySelector('.card');
    const n = tourSteps.length, last = tourI === n - 1;
    card.dir = lang === 'he' ? 'rtl' : 'ltr';
    card.innerHTML = `<h3 id="tourH">${esc(txt[0])}</h3><p>${esc(txt[1])}</p>${txt[2] ? `<p class="tip">${esc(txt[2])}</p>` : ''}
      <div class="row"><span class="dots">${tourI + 1} / ${n}</span>${last ? '' : `<button type="button" class="skip" id="tourSkip">${lang === 'he' ? 'דילוג' : 'Skip tour'}</button>`}${tourI > 0 ? `<button type="button" class="btn ghost sm" id="tourBack">${lang === 'he' ? 'הקודם' : 'Back'}</button>` : ''}<button type="button" class="btn sm" id="tourNext">${last ? (lang === 'he' ? 'סיום' : 'Done') : (lang === 'he' ? 'הבא' : 'Next')}</button></div>`;
    const vw = innerWidth, vh = innerHeight, cw = card.offsetWidth, ch = card.offsetHeight;
    if (el) {
      el.scrollIntoView({ block:'nearest' });
      const r = el.getBoundingClientRect(), pad = 6;
      const h = Math.min(r.height, vh * 0.7);
      spot.className = 'spot'; Object.assign(spot.style, { left:(r.left - pad) + 'px', top:(r.top - pad) + 'px', width:(r.width + pad * 2) + 'px', height:(h + pad * 2) + 'px' });
      let top = r.top + h + 14, left = r.left;
      if (top + ch > vh - 12) top = r.top - ch - 14;
      if (top < 12) { top = Math.max(12, Math.min(vh - ch - 12, r.top)); left = r.right + 14 + cw < vw ? r.right + 14 : r.left - cw - 14; }
      card.style.top = Math.max(12, Math.min(vh - ch - 12, top)) + 'px'; card.style.left = Math.max(12, Math.min(vw - cw - 12, left)) + 'px';
    } else {
      spot.className = 'spot none'; spot.removeAttribute('style');
      card.style.top = Math.max(12, (vh - ch) / 2 - 40) + 'px'; card.style.left = Math.max(12, (vw - cw) / 2) + 'px';
    }
    $('tourNext').onclick = () => { tourI++; tourShow(1); };
    if ($('tourBack')) $('tourBack').onclick = () => { tourI--; tourShow(-1); };
    if ($('tourSkip')) $('tourSkip').onclick = () => tourClose(true);
    $('tourNext').focus();
  }, st.go || st.drawer ? 260 : 30);
}
document.addEventListener('keydown', e => { if (tourI < 0) return; if (e.key === 'Escape') { e.stopPropagation(); tourClose(true); } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const fwd = (e.key === 'ArrowRight') !== (S.lang === 'he'); if (fwd) { tourI++; tourShow(1); } else if (tourI > 0) { tourI--; tourShow(-1); } } }, true);
addEventListener('resize', () => { if (tourI >= 0) tourShow(1); });
$('tourBtn').onclick = () => tourStart();
const tourDone = () => { try { return localStorage.getItem('jf60-tour') === 'done'; } catch(e){ return true; } };
const afterLogin = () => { api('session', {}).catch(() => {}); accessHello(); render(); if (!tourDone()) setTimeout(() => { if (tourI < 0) tourStart(); }, 700); };
if (!KEY) showGate();
else loadLive().then(afterLogin).catch(err => showGate(String(err && err.message) === 'unauthorized' ? 'That key wasn’t accepted.' : 'Couldn’t load the live data. Try again.'));
})();
