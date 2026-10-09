// Shared code for the field apps (group leaders, AV, site crew): login gate, data loading, day tabs and small helpers.
// Each page sets window.FIELD = { level, render } before loading this file.
const DAYS = { 0:{ date:'2026-10-19', name:'הקמה 19.10' }, 1:{ date:'2026-10-20', name:'שלישי 20.10' }, 2:{ date:'2026-10-21', name:'רביעי 21.10' }, 3:{ date:'2026-10-22', name:'חמישי 22.10' } };
const PLACES = { "Mishkenot Sha'ananim":"Mishkenot Sha'ananim Jerusalem", "King David Hotel":"King David Hotel Jerusalem", "Inbal Hotel":"Inbal Hotel Jerusalem", "Dan Panorama Hotel":"Dan Panorama Jerusalem", "Dan Panorama":"Dan Panorama Jerusalem",
  "Train Theater":"Train Theater Jerusalem", "Jerusalem Theater":"Jerusalem Theatre", "Botanical Gardens":"Jerusalem Botanical Gardens", "Gazelle Valley":"Gazelle Valley Park Jerusalem", "Ein Yael":"Ein Yael Jerusalem",
  "Beit Hanina Sports Complex":"Beit Hanina Sports Complex Jerusalem", "HaMiffal":"HaMiffal Jerusalem", "HaMazkeka":"HaMazkeka Jerusalem", "Cinematheque Jerusalem":"Jerusalem Cinematheque", "Cinematheque":"Jerusalem Cinematheque",
  "Bloomfield Science Museum":"Bloomfield Science Museum Jerusalem", "Science Museum":"Bloomfield Science Museum Jerusalem", "Tower of David":"Tower of David Museum Jerusalem", "Tower of David Museum":"Tower of David Museum Jerusalem" };
const HOTEL_HE = { "Mishkenot Sha'ananim":'משכנות שאננים', "King David Hotel":'מלון המלך דוד', "Inbal Hotel":'מלון ענבל', "Dan Panorama Hotel":'מלון דן פנורמה', "Dan Panorama":'מלון דן פנורמה' };
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
let KEY = '', NAME = '', DATA = null, DAY = 1;
try { KEY = sessionStorage.getItem('jf60k') || ''; NAME = sessionStorage.getItem('jf60n') || ''; } catch(e){}

// times on the event-day scale (shared clock: Asia/Jerusalem, a day runs until 05:00 the next morning)
const mins = t => EventClock.mins(t);
const hhmm = m => EventClock.hhmm(m);
const waze = q => 'https://waze.com/ul?q=' + encodeURIComponent(q) + '&navigate=yes';
const tel = p => 'tel:' + String(p).replace(/[^\d+]/g, '');
const norm = s => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
// crew shifts store the day of the month (19–22)
const shiftDay = d => ({ '19':0, '20':1, '21':2, '22':3 })[String(d)] ?? -1;
const crewOf = s => { try { return JSON.parse(s.crew_json || '[]'); } catch(e){ return []; } };
const isMine = s => crewOf(s).some(c => norm(c.n) === norm(DATA.me && DATA.me.name));
// venue names differ a little between sheets ("Cinematheque" / "Cinematheque Jerusalem")
const sameVenue = (a, b) => { a = norm(a); b = norm(b); return !!a && !!b && (a.includes(b) || b.includes(a)); };
const roleHe = r => String(r || '').replace(/Hotel group leader/g, 'מלווה קבוצה').replace(/Lead producer/g, 'מפיק ראשי').replace(/[Ss]ite manager/g, 'מנהל אתר').replace(/Assistant producer/g, 'עוזר הפקה')
  .replace(/production coordination/g, 'תיאום הפקה').replace(/production/g, 'הפקה').replace(/Designer/g, 'מעצבת').replace(/strike/g, 'פירוק').replace(/ushering/g, 'סדרנות')
  .replace(/Mishkenot Sha’ananim|Mishkenot Sha'ananim/g, 'משכנות שאננים').replace(/King David/g, 'המלך דוד').replace(/Inbal/g, 'ענבל').replace(/Dan Panorama/g, 'דן פנורמה');
const navBtn = (place, label) => place ? `<a class="btn nav" href="${waze(PLACES[place] || place + ' Jerusalem')}" target="_blank" rel="noopener">ניווט${label ? ' · ' + esc(label) : ''}</a>` : '';
const callBtn = (name, phone) => phone ? `<a class="btn call" href="${tel(phone)}" aria-label="להתקשר ל${esc(name)}">📞</a>` : '';
const personRow = c => `<div class="row"><span class="m"><div><b><bdi>${esc(c.name)}</bdi></b></div><div class="s">${esc(roleHe(c.role))}${c.venue ? ' · ' + esc(c.venue) : ''}</div></span>${c.phone ? `<a class="btn call" href="${tel(c.phone)}">📞 <bdi dir="ltr">${esc(c.phone)}</bdi></a>` : ''}</div>`;
const segName = s => s ? (s.title_he || s.title) : '';
const segDays = ids => String(ids || '').split(',').map(x => x.trim()).filter(Boolean);

// identity comes from the key alone; the name typed at sign-in is only shown in the usage log
function api(path, body){
  return apiRequest(path, { key:KEY, body, timeout:20000 });
}
// connection line under the header: when the data was last loaded and whether the last attempt worked
let LAST_OK = 0, LAST_FAIL = false;
function connLine(){
  let el = $('conn');
  if (!el) { el = document.createElement('div'); el.id = 'conn'; el.className = 'conn'; el.setAttribute('role', 'status'); const h = document.querySelector('#app header'); if (h) h.appendChild(el); }
  const age = LAST_OK ? EventClock.ago(LAST_OK, true) : '';
  el.classList.toggle('bad', LAST_FAIL);
  el.textContent = LAST_FAIL ? `אין חיבור לשרת · הנתונים מ${age ? age : 'הטעינה הקודמת'}` : `מעודכן · ${age}`;
}
async function load(){
  try { DATA = await api(FIELD.level + '/state'); LAST_OK = Date.now(); LAST_FAIL = false; }
  catch(e){ LAST_FAIL = true; if (DATA) connLine(); throw e; }
  if (DATA) connLine();
}
// files come through the API (they need the key), then save as a normal download
async function download(id, name){
  let r;
  try { r = await fetch('/api/files/download?id=' + encodeURIComponent(id), { headers:{ 'x-token':KEY }, cache:'no-store' }); } catch(e){ alert('אין חיבור, ההורדה נכשלה'); return; }
  if (!r.ok) { alert(r.status === 404 ? 'הקובץ לא זמין לקוד הזה' : 'ההורדה נכשלה'); return; }
  const url = URL.createObjectURL(await r.blob()), a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
}
// tick boxes: the box shows "saving" until the server confirms; on failure it goes back and says why.
// Returns true only when the server saved it.
async function toggle(el, path, body){
  const row = el.closest('.chk');
  el.disabled = true; row?.classList.add('saving'); row?.setAttribute('aria-busy', 'true');
  let ok = false;
  try { await api(path, body); ok = true; }
  catch(e){ el.checked = !el.checked; alert('לא נשמר: ' + apiErrorText(e, true)); }
  el.disabled = false; row?.classList.remove('saving'); row?.removeAttribute('aria-busy');
  row?.classList.toggle('done', el.checked);
  return ok;
}
function tabs(list){
  $('tabs').innerHTML = list.map(([k, label]) => `<button type="button" role="tab" data-k="${esc(k)}" aria-selected="${String(k) === String(DAY)}">${esc(label)}</button>`).join('');
  $('tabs').querySelectorAll('[data-k]').forEach(b => b.onclick = () => { DAY = isNaN(+b.dataset.k) ? b.dataset.k : +b.dataset.k; FIELD.render(); window.scrollTo(0, 0); });
}
function pickDay(){ const d = EventClock.now().day; DAY = d != null && d > 0 ? d : 1; }
async function start(){
  try { await load(); }
  catch(e){ $('app').hidden = true; $('gate').hidden = false; $('gName').value = NAME; $('gErr').textContent = !KEY ? '' : e.kind === 'auth' || e.kind === 'forbidden' ? 'הקוד לא התקבל.' : apiErrorText(e, true); return; }
  $('gate').hidden = true; $('app').hidden = false; pickDay(); FIELD.render(); connLine(); hello();
}
function hello(){
  try { if (sessionStorage.getItem('jf60dv')) return; } catch(e){}
  api('access/hello', { name:NAME, ui:FIELD.level }).then(() => { try { sessionStorage.setItem('jf60dv', '1'); } catch(e){} }).catch(() => {});
}
// a key for another mode goes to that mode's page
$('gateForm').onsubmit = async e => { e.preventDefault(); KEY = $('gKey').value.trim(); NAME = $('gName').value.trim(); try { sessionStorage.setItem('jf60k', KEY); sessionStorage.setItem('jf60n', NAME); sessionStorage.removeItem('jf60dv'); } catch(e){}
  try { const s = await api('state'); if (s.redirect && s.redirect !== location.pathname) { location.href = s.redirect; return; } if (!s.redirect) { location.href = '/'; return; } } catch(err){}
  start(); };
// log out to the main sign-in screen, so any key (another mode included) can be used next
$('logout').onclick = () => { fetch('/api/logout', { method:'POST' }).catch(() => {}); try { Object.keys(sessionStorage).filter(k => k.startsWith('jf60')).forEach(k => sessionStorage.removeItem(k)); } catch(e){} KEY = ''; DATA = null; location.href = '/'; };
// refresh every 2 minutes (not while a box is being saved); the connection line ages every 30 seconds
setInterval(() => { if (DATA && document.visibilityState === 'visible' && !document.querySelector('input:focus, .chk.saving')) load().then(FIELD.render).catch(() => {}); }, 120000);
setInterval(() => { if (DATA) connLine(); }, 30000);
start();
