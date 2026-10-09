const DAYS = { 1:{ date:'2026-10-20', name:'שלישי 20.10' }, 2:{ date:'2026-10-21', name:'רביעי 21.10' }, 3:{ date:'2026-10-22', name:'חמישי 22.10' } };
// Waze searches by place name; exact drop-off points come from each run's drop-off link once production adds them
const PLACES = { "Mishkenot Sha'ananim":"Mishkenot Sha'ananim Jerusalem", "King David Hotel":"King David Hotel Jerusalem", "Inbal Hotel":"Inbal Hotel Jerusalem", "Dan Panorama Hotel":"Dan Panorama Jerusalem", "Dan Panorama":"Dan Panorama Jerusalem",
  "Train Theater":"Train Theater Jerusalem", "Jerusalem Theater":"Jerusalem Theatre", "Botanical Gardens":"Jerusalem Botanical Gardens", "Gazelle Valley":"Gazelle Valley Park Jerusalem", "Ein Yael":"Ein Yael Jerusalem",
  "Beit Hanina Sports Complex":"Beit Hanina Sports Complex Jerusalem", "HaMiffal":"HaMiffal Jerusalem", "HaMazkeka":"HaMazkeka Jerusalem", "Cinematheque Jerusalem":"Jerusalem Cinematheque", "Cinematheque":"Jerusalem Cinematheque",
  "Bloomfield Science Museum":"Bloomfield Science Museum Jerusalem", "Science Museum":"Bloomfield Science Museum Jerusalem", "Tower of David":"Tower of David Museum Jerusalem" };
const HOTEL_HE = { "Mishkenot Sha'ananim":'משכנות שאננים', "King David Hotel":'מלון המלך דוד', "Inbal Hotel":'מלון ענבל', "Dan Panorama Hotel":'מלון דן פנורמה', "Dan Panorama":'מלון דן פנורמה' };
const ESCORT_KEY = { "Mishkenot Sha'ananim":'Mishkenot', "King David Hotel":'King David', "Inbal Hotel":'Inbal', "Dan Panorama Hotel":'Dan Panorama', "Dan Panorama":'Dan Panorama' };
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
let KEY = '', NAME = '', DATA = null, DAY = 1;
try { KEY = sessionStorage.getItem('jf60k') || ''; NAME = sessionStorage.getItem('jf60n') || ''; } catch(e){}

// shared event clock: Asia/Jerusalem, and a run after midnight belongs to the evening before
const mins = t => EventClock.mins(t);
const nowIL = () => EventClock.now();
const waze = q => 'https://waze.com/ul?q=' + encodeURIComponent(q) + '&navigate=yes';
const tel = p => 'tel:' + String(p).replace(/[^\d+]/g, '');
const roleHe = r => String(r || '').replace(/Hotel group leader/g, 'מלווה קבוצה').replace(/Lead producer/g, 'מפיק ראשי').replace(/[Ss]ite manager/g, 'מנהל אתר').replace(/production coordination/g, 'תיאום הפקה').replace(/production/g, 'הפקה')
  .replace(/Mishkenot Sha’ananim|Mishkenot Sha'ananim/g, 'משכנות שאננים').replace(/King David/g, 'המלך דוד').replace(/Inbal/g, 'ענבל').replace(/Dan Panorama/g, 'דן פנורמה');

let LAST_OK = 0, LAST_FAIL = false;
async function load(){
  try { DATA = await apiRequest('driver/state', { key:KEY, timeout:20000 }); LAST_OK = Date.now(); LAST_FAIL = false; }
  catch(e){ LAST_FAIL = true; connLine(); throw e; }
  connLine();
}
function connLine(){ const el = $('conn'); if (!el) return; el.classList.toggle('bad', LAST_FAIL); const age = LAST_OK ? EventClock.ago(LAST_OK, true) : ''; el.textContent = LAST_FAIL ? `אין חיבור לשרת · הנתונים מ${age || 'הטעינה הקודמת'}` : (age ? `הנתונים מעודכנים · ${age}` : ''); }
const httpUrl = v => { try { const u = new URL(String(v || '')); return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : ''; } catch(e){ return ''; } };
function escortFor(label){ const k = ESCORT_KEY[label]; if (!k || !DATA) return null; return DATA.contacts.find(c => /Hotel group leader/.test(c.role) && c.role.includes(k)) || null; }
function placeButtons(dest){
  return String(dest || '').split(/\s*(?:·|\/| or )\s*/).map(x => x.trim()).filter(x => x && !/^hotels?$/i.test(x))
    .map(x => `<a class="btn nav" href="${waze(PLACES[x] || x + ' Jerusalem')}" target="_blank" rel="noopener">ניווט · ${esc(HOTEL_HE[x] || x)}</a>`).join(' ');
}
function runCard(r, state){
  const stops = DATA.stops.filter(s => s.run_id === r.id).sort((a, b) => a.sort_order - b.sort_order);
  const seg = DATA.segments.find(s => s.id === r.linked_segment);
  const counts = DATA.counts[r.day] || {};
  const late = (mins(r.depart_time) || 0) >= 1440;
  const stopRows = stops.map(s => {
    const n = counts[s.hotel_match], esc0 = escortFor(s.stop_label);
    return `<div class="row"><span class="t">${esc(s.time)}</span><span class="m"><div><b>${esc(HOTEL_HE[s.stop_label] || s.stop_label)}</b></div>
      <div class="s">${n ? `עד ${n} אורחים במלון` : ''}${n && esc0 ? ' · ' : ''}${esc0 ? `מלווה: <bdi>${esc(esc0.name)}</bdi>` : ''}</div></span>
      <span style="display:flex;gap:6px">${esc0 ? `<a class="btn call" href="${tel(esc0.phone)}" aria-label="להתקשר ל${esc(esc0.name)}">📞</a>` : ''}<a class="btn nav" href="${waze(PLACES[s.stop_label] || s.stop_label)}" target="_blank" rel="noopener" aria-label="ניווט">ניווט</a></span></div>`;
  }).join('');
  const url = httpUrl(r.dropoff_url);
  const drop = r.dropoff || url ? `<div class="sec">נקודת הורדה</div><div>${esc(r.dropoff)}</div>${url ? `<a class="btn nav" href="${esc(url)}" target="_blank" rel="noopener" style="margin-top:6px">ניווט לנקודת ההורדה</a>` : ''}` : '';
  const dest = r.destination_he || r.destination;
  const mine = (DATA.assigned_runs || []).includes(r.id);
  return `<div class="card ${state} ${mine ? 'mine' : ''}">${mine ? '<span class="badge">הנסיעה שלך</span> ' : ''}${state === 'now' ? '<span class="badge">הנסיעה הבאה</span>' : ''}
    <div class="time">${esc(r.depart_time)}${r.arrive_time ? ` <small>← ${esc(r.arrive_time)}</small>` : ''}${late ? ' <small>(אחרי חצות)</small>' : ''}</div>
    <div class="title">${esc(r.title_he || r.title)}</div>
    ${stopRows ? `<div class="sec">איסוף</div>${stopRows}` : ''}
    <div class="sec">יעד</div><div><b>${esc(dest)}</b>${seg ? `<div class="s muted">לאירוע: ${esc(seg.title_he || seg.title)} · ${esc(seg.time)}</div>` : ''}</div>
    ${drop || (placeButtons(r.destination) ? `<div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:6px">${placeButtons(r.destination)}</div>` : '')}
    ${r.vehicles || r.driver || r.company ? `<div class="sec">רכב</div><div>${[r.vehicles, r.company, r.driver, r.driver_phone].filter(Boolean).map(x => `<bdi>${esc(x)}</bdi>`).join(' · ')}</div>` : ''}
    ${r.escort ? `<div class="sec">מלווה מטעם הקרן</div><div>${esc(r.escort)}</div>` : ''}
    ${r.driver_note ? `<div class="note">${esc(r.driver_note)}</div>` : ''}
  </div>`;
}
function render(){
  $('tabs').innerHTML = Object.entries(DAYS).map(([d, x]) => `<button type="button" role="tab" data-day="${d}" aria-selected="${+d === DAY}">${x.name}</button>`).join('');
  $('tabs').querySelectorAll('[data-day]').forEach(b => b.onclick = () => { DAY = +b.dataset.day; render(); window.scrollTo(0, 0); });
  const runs = DATA.runs.filter(r => r.day === DAY).sort((a, b) => mins(a.depart_time) - mins(b.depart_time));
  const now = nowIL(), today = DAYS[DAY].date === now.date;
  const next = today ? runs.find(r => (mins(r.arrive_time) ?? mins(r.depart_time)) >= now.min) : null;
  const html = runs.map(r => runCard(r, r === next ? 'now' : today && (mins(r.arrive_time) ?? mins(r.depart_time)) < now.min ? 'past' : '')).join('');
  const contacts = DATA.contacts.map(c => `<div class="row"><span class="m"><div><b><bdi>${esc(c.name)}</bdi></b></div><div class="s">${esc(roleHe(c.role))}</div></span><a class="btn call" href="${tel(c.phone)}">📞 <bdi dir="ltr">${esc(c.phone)}</bdi></a></div>`).join('');
  $('main').innerHTML = (html || '<div class="empty">אין נסיעות ביום הזה</div>')
    + `<div class="card"><div class="title">אנשי קשר בהפקה</div>${contacts || '<div class="muted">—</div>'}</div>`
    + `<footer>הנתונים מתעדכנים אוטומטית · מספר האורחים הוא לפי רשימת הלינה במלון, לא אישור הגעה</footer>`;
}
// ---- location sharing: while this page is open, the phone's position goes to the Control Room map about every 20 seconds.
// Each position carries the time the phone measured it (fix_at); the server ignores fixes older than the one it has.
// Only one send is in flight at a time; a newer fix waits for it instead of piling up requests.
let WATCH = null, LAST_POS = null, LAST_SENT = 0, WAKE = null, DEVICE = '', INFLIGHT = false, LAST_ACK = 0;
try { DEVICE = localStorage.getItem('jf60dev') || ''; if (!DEVICE) { DEVICE = 'd' + Math.random().toString(36).slice(2, 12); localStorage.setItem('jf60dev', DEVICE); } } catch(e){ DEVICE = 'd' + Math.random().toString(36).slice(2, 12); }
const hm = ms => new Date(ms).toLocaleTimeString('he-IL', { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Jerusalem' });
function shareStatus(text, bad){ const el = $('shareSt'); el.textContent = text; el.classList.toggle('bad', !!bad); }
function postPos(p){
  if (INFLIGHT) return;
  INFLIGHT = true; LAST_SENT = Date.now();
  const c = p.coords, fix = p.timestamp || Date.now();
  apiRequest('driver/position', { key:KEY, timeout:15000, body:{ device:DEVICE, name:NAME, lat:c.latitude, lng:c.longitude, accuracy:c.accuracy, speed:c.speed, heading:c.heading, fix_at:fix } })
    .then(r => { LAST_ACK = Date.now(); const ageMin = (Date.now() - fix) / 60000;
      shareStatus(r.accepted === false ? 'מיקום ישן לא נשלח · ממתין למיקום חדש' : ageMin > 2 ? `נשלח מיקום מ-${hm(fix)} (ישן · הטלפון לא מעדכן מיקום)` : `נשלח · מיקום מ-${hm(fix)}`, ageMin > 2); })
    .catch(e => shareStatus(e.kind === 'network' || e.kind === 'timeout' ? 'אין חיבור · המיקום לא נשלח, מנסה שוב' : 'המיקום לא נשלח: ' + apiErrorText(e, true), true))
    .finally(() => { INFLIGHT = false; });
}
async function keepAwake(){ try { if ('wakeLock' in navigator && document.visibilityState === 'visible') WAKE = await navigator.wakeLock.request('screen'); } catch(e){} }
function shareUI(){ const on = WATCH !== null; const b = $('shareBtn'); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.textContent = on ? '📍 משתף מיקום · לעצירה' : '📍 שיתוף מיקום עם ההפקה'; if (!on) $('shareSt').textContent = ''; }
function startShare(){
  if (!navigator.geolocation) { $('shareSt').textContent = 'הטלפון לא תומך בשיתוף מיקום'; return; }
  WATCH = navigator.geolocation.watchPosition(p => { LAST_POS = p; if (Date.now() - LAST_SENT > 20000) postPos(p); },
    err => { $('shareSt').textContent = err.code === 1 ? 'צריך לאשר גישה למיקום בהגדרות הדפדפן' : 'מחפש מיקום…'; if (err.code === 1) stopShare(true); },
    { enableHighAccuracy:true, maximumAge:15000, timeout:30000 });
  try { localStorage.setItem('jf60share', '1'); } catch(e){}
  $('shareSt').textContent = 'מחפש מיקום…'; keepAwake(); shareUI();
}
function stopShare(silent){
  if (WATCH !== null) navigator.geolocation.clearWatch(WATCH); WATCH = null; LAST_POS = null;
  try { localStorage.removeItem('jf60share'); } catch(e){}
  if (WAKE) { WAKE.release().catch(() => {}); WAKE = null; }
  if (!silent) apiRequest('driver/position', { key:KEY, body:{ device:DEVICE, stop:true } }).catch(() => {});
  shareUI();
}
$('shareBtn').onclick = () => WATCH === null ? startShare() : stopShare();
// a parked bus may not move enough to fire an update: resend the last fix (with its original time) so the map
// knows the phone is still connected; the map shows how old the fix itself is
setInterval(() => { if (WATCH !== null && LAST_POS && Date.now() - LAST_SENT > 30000) postPos(LAST_POS); }, 10000);
setInterval(() => { connLine(); if (WATCH !== null && LAST_ACK && Date.now() - LAST_ACK > 90000) shareStatus('המיקום לא נשלח בדקה וחצי האחרונות · בדקו חיבור', true); }, 30000);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && WATCH !== null) keepAwake(); });
function pickDay(){ const d = nowIL().day; DAY = d >= 1 && d <= 3 ? d : 1; }
async function start(){
  try { await load(); } catch(e){ $('app').hidden = true; $('gate').hidden = false; $('gName').value = NAME; $('gErr').textContent = !KEY ? '' : e.kind === 'auth' || e.kind === 'forbidden' ? 'הקוד לא התקבל.' : apiErrorText(e, true); return; }
  $('gate').hidden = true; $('app').hidden = false; pickDay(); render(); hello();
  try { if (localStorage.getItem('jf60share') === '1' && WATCH === null) startShare(); } catch(e){}
}
function hello(){
  try { if (sessionStorage.getItem('jf60dv')) return; } catch(e){}
  apiRequest('access/hello', { key:KEY, body:{ name:NAME, ui:'driver' } }).then(() => { try { sessionStorage.setItem('jf60dv', '1'); } catch(e){} }).catch(() => {});
}
// a key for another mode goes to that mode's page
$('gateForm').onsubmit = async e => { e.preventDefault(); KEY = $('gKey').value.trim(); NAME = $('gName').value.trim(); try { sessionStorage.setItem('jf60k', KEY); sessionStorage.setItem('jf60n', NAME); sessionStorage.removeItem('jf60dv'); } catch(e){}
  try { const s = await apiRequest('state', { key:KEY }); if (s.redirect !== '/driver') { location.href = s.redirect || '/'; return; } } catch(err){}
  start(); };
// log out to the main sign-in screen, so any key (another mode included) can be used next
$('logout').onclick = () => { if (WATCH !== null) stopShare(); fetch('/api/logout', { method:'POST' }).catch(() => {}); try { Object.keys(sessionStorage).filter(k => k.startsWith('jf60')).forEach(k => sessionStorage.removeItem(k)); } catch(e){} KEY = ''; DATA = null; setTimeout(() => { location.href = '/'; }, 150); };
setInterval(() => { if (DATA && document.visibilityState === 'visible') load().then(render).catch(() => {}); }, 120000);
start();
