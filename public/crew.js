// Site managers and assistant producers: my shifts, each event's run sheet, site needs to tick off, catering, buses arriving and contacts.
window.FIELD = { level:'crew', render };
const shiftRow = (s, check) => { const crew = crewOf(s).map(c => /^\d+$/.test(c.n) ? `${c.n} ${c.r}` : `${c.n}${c.r ? ' (' + c.r + ')' : ''}`).join(', ');
  const body = `<span class="t">${hhmm(s.start_min)}${s.end_min ? `<div class="s">${hhmm(s.end_min)}</div>` : ''}</span><span class="m"><b>${esc(s.title)}</b><div class="s">${esc(s.site || '')}${crew ? ' · ' + esc(crew) : ''}</div>${s.note ? `<div class="s">${esc(s.note)}</div>` : ''}${s.flag ? `<div class="s" style="color:var(--accent)">⚠ ${esc(s.flag)}</div>` : ''}</span>`;
  return check && s.can_tick !== false ? `<label class="chk ${s.done ? 'done' : ''}"><input type="checkbox" data-shift="${esc(s.id)}" ${s.done ? 'checked' : ''}>${body}</label>` : `<div class="row">${body}</div>`; };
const needRow = n => `<label class="chk ${n.done ? 'done' : ''}"><input type="checkbox" data-need="${esc(n.id)}" ${n.done ? 'checked' : ''} ${n.can_tick === false ? 'disabled title="לא באחריותך"' : ''}>
  <span class="m"><b>${esc(n.item)}</b>${n.qty ? ` <span class="tag">${esc(n.qty)}</span>` : ''}<div class="s">${[n.area, n.supplier, n.notes].filter(Boolean).map(esc).join(' · ')}</div></span></label>`;
function segCard(s, mySites){
  const needs = DATA.needs.filter(n => segDays(n.segment_ids).includes(s.id));
  const food = DATA.food.filter(f => f.segment_id === s.id);
  const runs = DATA.runs.filter(r => r.linked_segment === s.id).sort((a, b) => mins(a.depart_time) - mins(b.depart_time));
  const att = (DATA.attendance.find(a => a.segment_id === s.id) || {}).n;
  const venue = DATA.venues.filter(v => sameVenue(v.venue, s.venue));
  const mine = mySites.some(x => sameVenue(x, s.venue));
  const notes = [s.brief_location, s.brief_staging, s.brief_materials, s.notes_logistics].filter(Boolean).join('\n\n');
  return `<div class="card ${mine ? 'now' : ''}">${mine ? '<span class="badge">האתר שלי</span>' : ''}<div class="time">${esc(s.time)}${s.end_time ? ` <small>– ${esc(s.end_time)}</small>` : ''}</div>
    <div class="title">${esc(segName(s))}</div><div class="s muted">${esc(s.venue_he || s.venue || '')}${att ? ` · ${att} אורחים רשומים לאירוע` : ''}</div>
    <div class="btns">${String(s.venue || '').split(/\s*[·\/]\s*/).filter(Boolean).map(v => navBtn(v, v)).join('')}</div>
    ${s.brief_runsheet ? `<div class="sec">לו״ז</div><div class="pre">${esc(s.brief_runsheet)}</div>` : ''}
    ${needs.length ? `<div class="sec">צרכי אתר · ${needs.filter(n => n.done).length}/${needs.length}</div>${needs.map(needRow).join('')}` : ''}
    ${food.length ? `<div class="sec">אוכל ושתייה</div>${food.map(f => `<div class="row"><span class="t">${esc(f.time || '')}</span><span class="m"><b>${esc(f.title)}</b><div class="s">${[f.caterer, f.headcount, f.dietary_note].filter(Boolean).map(esc).join(' · ')}</div></span></div>`).join('')}` : ''}
    ${runs.length ? `<div class="sec">הסעות לאירוע</div>${runs.map(r => `<div class="row"><span class="t">${esc(r.depart_time)}</span><span class="m"><b>${esc(r.title_he || r.title)}</b><div class="s">${[r.arrive_time ? 'מגיעים ' + r.arrive_time : '', r.vehicles, r.driver].filter(Boolean).map(esc).join(' · ')}</div></span>${callBtn(r.driver, r.driver_phone)}</div>`).join('')}` : ''}
    ${notes ? `<details><summary>מיקום, במה וחומרים</summary><div class="pre">${esc(notes)}</div></details>` : ''}
    ${venue.length ? `<div class="sec">אנשי קשר במקום</div>${venue.map(personRow).join('')}` : ''}</div>`;
}
function dayView(day){
  const shifts = DATA.shifts.filter(s => shiftDay(s.day) === day);
  const mine = shifts.filter(isMine), others = shifts.filter(s => !isMine(s));
  const mySites = mine.map(s => s.site).filter(Boolean);
  const segs = DATA.segments.filter(s => s.day === day).sort((a, b) => mins(a.time) - mins(b.time));
  return `<div class="card"><div class="title">המשמרות שלי</div>${mine.map(s => shiftRow(s, true)).join('') || '<div class="muted">אין לך משמרות ביום הזה</div>'}
      ${others.length ? `<details><summary>כל המשמרות היום (${others.length})</summary>${others.map(s => shiftRow(s, false)).join('')}</details>` : ''}</div>`
    + segs.map(s => segCard(s, mySites)).join('');
}
function contactsView(){
  const byVenue = {};
  DATA.venues.forEach(v => (byVenue[v.venue || 'אחר'] ||= []).push(v));
  return `<div class="card"><div class="title">צוות ההפקה</div>${DATA.contacts.map(personRow).join('')}</div>`
    + Object.entries(byVenue).map(([v, list]) => `<div class="card"><div class="title">${esc(v)}</div>${list.map(personRow).join('')}</div>`).join('');
}
function render(){
  $('who').innerHTML = `<bdi>${esc(DATA.me.name)}</bdi> · ${esc(roleHe(DATA.me.role))}`;
  tabs([0, 1, 2, 3].map(d => [d, DAYS[d].name]).concat([['c', 'אנשי קשר']]));
  $('main').innerHTML = DAY === 'c' ? contactsView() : dayView(DAY);
  $('main').querySelectorAll('[data-need]').forEach(el => el.onchange = async () => { if (!await toggle(el, 'field/done', { kind:'need', id:el.dataset.need, done:el.checked })) return; const n = DATA.needs.find(x => x.id === el.dataset.need); if (n) n.done = el.checked ? 1 : 0; });
  $('main').querySelectorAll('[data-shift]').forEach(el => el.onchange = async () => { if (!await toggle(el, 'field/done', { kind:'shift', id:el.dataset.shift, done:el.checked })) return; const n = DATA.shifts.find(x => x.id === el.dataset.shift); if (n) n.done = el.checked ? 1 : 0; });
}
