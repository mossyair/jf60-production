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

// minutes from midnight; anything before 05:00 belongs to the evening before
const mins = t => { const m = /^(\d{1,2}):(\d{2})/.exec(t || ''); if (!m) return null; const v = +m[1] * 60 + +m[2]; return v < 300 ? v + 1440 : v; };
const hhmm = m => m == null ? '' : String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
const nowIL = () => { const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Jerusalem', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', hourCycle:'h23' }).formatToParts(new Date()).map(x => [x.type, x.value])); return { date:`${p.year}-${p.month}-${p.day}`, min:+p.hour * 60 + +p.minute }; };
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

function api(path, body){
  return fetch('/api/' + path, { method: body ? 'POST' : 'GET', headers: Object.assign({ 'x-token':KEY, 'x-name':encodeURIComponent(NAME) }, body ? { 'content-type':'application/json' } : {}), body: body ? JSON.stringify(body) : undefined })
    .then(async r => { let j = {}; try { j = await r.json(); } catch(e){} if (!r.ok || j.error) { const e = new Error(j.error || 'HTTP ' + r.status); e.status = r.status; throw e; } return j; });
}
async function load(){ DATA = await api(FIELD.level + '/state'); }
// files come through the API (they need the key), then save as a normal download
async function download(id, name){
  const r = await fetch('/api/files/download?id=' + encodeURIComponent(id), { headers:{ 'x-token':KEY, 'x-name':encodeURIComponent(NAME) } });
  if (!r.ok) { alert('ההורדה נכשלה'); return; }
  const url = URL.createObjectURL(await r.blob()), a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
}
// tick boxes: change the screen right away, undo if the server says no
async function toggle(el, path, body){
  el.disabled = true;
  try { await api(path, body); } catch(e){ el.checked = !el.checked; alert('לא נשמר: ' + e.message); }
  el.disabled = false; el.closest('.chk')?.classList.toggle('done', el.checked);
}
function tabs(list){
  $('tabs').innerHTML = list.map(([k, label]) => `<button type="button" role="tab" data-k="${k}" aria-selected="${String(k) === String(DAY)}">${label}</button>`).join('');
  $('tabs').querySelectorAll('[data-k]').forEach(b => b.onclick = () => { DAY = isNaN(+b.dataset.k) ? b.dataset.k : +b.dataset.k; FIELD.render(); window.scrollTo(0, 0); });
}
function pickDay(){ const d = nowIL().date; const hit = Object.entries(DAYS).find(([, x]) => x.date === d); DAY = hit && +hit[0] > 0 ? +hit[0] : 1; }
async function start(){
  try { await load(); }
  catch(e){ $('app').hidden = true; $('gate').hidden = false; $('gName').value = NAME; $('gErr').textContent = !KEY ? '' : e.message === 'name not found' ? 'השם לא נמצא ברשימת הצוות. כתבו שם מלא באנגלית, כמו ברשימה.' : 'הקוד לא התקבל.'; return; }
  $('gate').hidden = true; $('app').hidden = false; pickDay(); FIELD.render(); hello();
}
function hello(){
  try { if (sessionStorage.getItem('jf60dv')) return; } catch(e){}
  api('access/hello', { name:NAME, ui:FIELD.level }).then(() => { try { sessionStorage.setItem('jf60dv', '1'); } catch(e){} }).catch(() => {});
}
// a key for another mode goes to that mode's page
$('gateForm').onsubmit = async e => { e.preventDefault(); KEY = $('gKey').value.trim(); NAME = $('gName').value.trim(); try { sessionStorage.setItem('jf60k', KEY); sessionStorage.setItem('jf60n', NAME); sessionStorage.removeItem('jf60dv'); } catch(e){}
  try { const s = await api('state'); if (s.redirect !== location.pathname) { location.href = s.redirect || '/'; return; } } catch(err){}
  start(); };
// log out to the main sign-in screen, so any key (another mode included) can be used next
$('logout').onclick = () => { try { Object.keys(sessionStorage).filter(k => k.startsWith('jf60')).forEach(k => sessionStorage.removeItem(k)); } catch(e){} KEY = ''; DATA = null; location.href = '/'; };
setInterval(() => { if (DATA && document.visibilityState === 'visible' && !document.querySelector('input:focus')) load().then(FIELD.render).catch(() => {}); }, 120000);
