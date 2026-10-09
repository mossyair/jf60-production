// Group leader: her hotel's guests, the buses that pick them up, a boarding check per day, and the day's program.
window.FIELD = { level:'leader', render };
const onDay = (g, date) => g.checkin && g.checkout && g.checkin <= date && g.checkout >= date;
const gname = g => `${g.first_name || ''} ${g.last_name || ''}`.trim();
function guestTags(g){
  return (g.dietary ? `<span class="tag ${g.dietary_severe ? 'warn' : ''}">${esc(g.dietary)}</span>` : '') + (g.early_late ? `<span class="tag">${esc(g.early_late)}</span>` : '');
}
function runCard(r){
  const stops = DATA.stops.filter(s => s.run_id === r.id).sort((a, b) => a.sort_order - b.sort_order);
  const seg = DATA.segments.find(s => s.id === r.linked_segment);
  const rows = stops.map(s => { const mine = DATA.hotels.includes(s.hotel_match);
    return `<div class="row"><span class="t">${esc(s.time)}</span><span class="m"><b>${esc(HOTEL_HE[s.stop_label] || s.stop_label)}</b>${mine ? '<span class="tag ok">המלון שלי</span>' : ''}</span>${mine ? navBtn(s.stop_label) : ''}</div>`; }).join('');
  return `<div class="card"><div class="time">${esc(r.depart_time)}${r.arrive_time ? ` <small>← ${esc(r.arrive_time)}</small>` : ''}</div>
    <div class="title">${esc(r.title_he || r.title)}</div>
    ${rows ? `<div class="sec">איסוף</div>${rows}` : ''}
    <div class="sec">יעד</div><div><b>${esc(r.destination_he || r.destination)}</b>${seg ? `<div class="s muted">לאירוע: ${esc(segName(seg))} · ${esc(seg.time)}</div>` : ''}</div>
    ${r.dropoff ? `<div class="sec">נקודת הורדה</div><div>${esc(r.dropoff)}</div>` : ''}
    ${r.vehicles || r.driver ? `<div class="sec">רכב ונהג</div><div class="row" style="border:0"><span class="m">${[r.vehicles, r.company, r.driver].filter(Boolean).map(x => `<bdi>${esc(x)}</bdi>`).join(' · ')}</span>${callBtn(r.driver, r.driver_phone)}</div>` : ''}
    ${r.escort ? `<div class="sec">מלווה</div><div>${esc(r.escort)}</div>` : ''}
    ${r.driver_note ? `<div class="note">${esc(r.driver_note)}</div>` : ''}</div>`;
}
function boardList(day){
  const date = DAYS[day].date, list = DATA.guests.filter(g => onDay(g, date));
  // the count is "marked on board" out of the guests listed below (staying at the hotel that night)
  const ids = new Set(list.map(g => g.id));
  const on = new Set(DATA.boarded.filter(b => b.day === day && ids.has(b.guest_id)).map(b => b.guest_id));
  const rows = list.map(g => `<label class="chk ${on.has(g.id) ? 'done' : ''}"><input type="checkbox" data-board="${g.id}" ${on.has(g.id) ? 'checked' : ''}>
    <span class="m"><b><bdi>${esc(gname(g))}</bdi></b>${guestTags(g)}<div class="s">${esc(g.room_type || '')}${g.guest_note ? ' · ' + esc(g.guest_note) : ''}</div></span>${callBtn(gname(g), g.phone)}</label>`).join('');
  return `<div class="card" id="board"><div class="title">צ׳ק-אין לאוטובוס · <span id="bcount">${on.size}/${list.length}</span> עלו</div>
    <div class="s muted">סמני כל אורח שעלה. הסימון נשמר בשרת ומוצג כאן, בדף מלווי הקבוצה של המלון; הוא לא מוצג כרגע בחדר הבקרה או בדשבורד.</div>${rows || '<div class="empty">אין אורחים במלון ביום הזה</div>'}</div>`;
}
function dayView(day){
  const date = DAYS[day].date, n = DATA.guests.filter(g => onDay(g, date)).length;
  const shifts = DATA.shifts.filter(s => shiftDay(s.day) === day);
  const runs = DATA.runs.filter(r => r.day === day).sort((a, b) => mins(a.depart_time) - mins(b.depart_time));
  const mine = new Set(DATA.guests.map(g => g.id));
  const segs = DATA.segments.filter(s => s.day === day).map(s => { const c = DATA.sessions.filter(x => x.segment_id === s.id && mine.has(x.guest_id)).length;
    return `<div class="row"><span class="t">${esc(s.time)}</span><span class="m"><b>${esc(segName(s))}</b><div class="s">${esc(s.venue_he || s.venue || '')}${c ? ` · ${c} מהאורחים שלי` : ''}</div></span></div>`; }).join('');
  return `<div class="card"><div class="big">${n}</div><div class="muted">אורחים ב${esc(DATA.hotels.map(h => HOTEL_HE[h] || h).join(' / '))} בלילה הזה</div><div class="btns"><a class="btn" href="#board">לצ׳ק-אין ↓</a></div></div>
    ${shifts.length ? `<div class="card"><div class="title">המשמרות שלי</div>${shifts.map(s => `<div class="row"><span class="t">${hhmm(s.start_min)}</span><span class="m"><b>${esc(s.title)}</b><div class="s">${esc(s.site || '')}${s.note ? ' · ' + esc(s.note) : ''}</div></span></div>`).join('')}</div>` : ''}
    ${runs.map(runCard).join('') || '<div class="empty">אין הסעות מהמלון ביום הזה</div>'}
    ${boardList(day)}
    ${segs ? `<div class="card"><div class="title">התוכנית היום</div>${segs}</div>` : ''}`;
}
function guestsView(){
  const parties = {};
  DATA.guests.forEach(g => (parties[g.party_id || 'g' + g.id] ||= []).push(g));
  const segById = Object.fromEntries(DATA.segments.map(s => [s.id, s]));
  return `<div class="card"><div class="title">${DATA.guests.length} אורחים · ${Object.keys(parties).length} הזמנות</div><div class="s muted">כל מי שלן ב${esc(DATA.hotels.map(h => HOTEL_HE[h] || h).join(' / '))}</div></div>` +
    Object.values(parties).map(ps => `<div class="card">${ps.map(g => { const ev = DATA.sessions.filter(x => x.guest_id === g.id).map(x => segById[x.segment_id]).filter(Boolean).sort((a, b) => a.day - b.day || mins(a.time) - mins(b.time));
      return `<div class="row"><span class="m"><b><bdi>${esc(gname(g))}</bdi></b>${guestTags(g)}
        <div class="s"><bdi>${esc(g.country || '')}</bdi> · ${esc(g.room_type || '')} · <bdi dir="ltr">${esc((g.checkin || '').slice(5))} → ${esc((g.checkout || '').slice(5))}</bdi></div>
        ${g.guest_note ? `<div class="s">${esc(g.guest_note)}</div>` : ''}
        ${ev.length ? `<details><summary>${ev.length} אירועים</summary><div class="s">${ev.map(s => `יום ${s.day} ${esc(s.time)} · ${esc(segName(s))}`).join('<br>')}</div></details>` : ''}</span>${callBtn(gname(g), g.phone)}</div>`; }).join('')}</div>`).join('');
}
function render(){
  $('who').innerHTML = `<bdi>${esc(DATA.me.name)}</bdi> · ${esc(roleHe(DATA.me.role))}`;
  const days = [1, 2, 3].concat(DATA.shifts.some(s => shiftDay(s.day) === 0) ? [0] : []).sort();
  tabs(days.map(d => [d, DAYS[d].name]).concat([['g', 'האורחים שלי']]));
  const contacts = `<div class="card"><div class="title">אנשי קשר בהפקה</div>${DATA.contacts.map(personRow).join('') || '<div class="muted">—</div>'}</div>`;
  $('main').innerHTML = (DAY === 'g' ? guestsView() : dayView(DAY)) + contacts;
  $('main').querySelectorAll('[data-board]').forEach(el => el.onchange = async () => {
    if (!await toggle(el, 'leader/board', { guest_id:+el.dataset.board, day:DAY, on:el.checked })) return;
    DATA.boarded = DATA.boarded.filter(b => !(b.guest_id === +el.dataset.board && b.day === DAY)).concat(el.checked ? [{ guest_id:+el.dataset.board, day:DAY }] : []);
    const list = DATA.guests.filter(g => onDay(g, DAYS[DAY].date)); $('bcount').textContent = `${DATA.boarded.filter(b => b.day === DAY && list.some(g => g.id === b.guest_id)).length}/${list.length}`;
  });
}
