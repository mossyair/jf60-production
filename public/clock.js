// Shared event clock for every screen. Wall time is always Asia/Jerusalem, whatever the device's own
// time zone. An event day runs from 05:00 to 04:59 the next morning: at 00:10 on 21.10 it is still the
// evening of 20.10, shown on that day's scale as 24:10.
(function (g) {
  const TZ = 'Asia/Jerusalem';
  const CUTOFF = 300; // 05:00, in minutes
  const DAYS = { '2026-10-19': 0, '2026-10-20': 1, '2026-10-21': 2, '2026-10-22': 3 };
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
  const prevDate = (iso) => { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); };
  // Jerusalem wall time for an instant, on the event-day scale
  function now(at) {
    const d = at instanceof Date ? at : new Date(at == null ? Date.now() : at);
    const p = Object.fromEntries(fmt.formatToParts(d).map((x) => [x.type, x.value]));
    let date = `${p.year}-${p.month}-${p.day}`, min = (+p.hour % 24) * 60 + +p.minute;
    if (min < CUTOFF) { date = prevDate(date); min += 1440; }
    return { date, min, day: DAYS[date] == null ? null : DAYS[date], dom: date.slice(8, 10), clock: hhmm(min) };
  }
  // "HH:MM" (also "24:15") → minutes on the event-day scale; anything before 05:00 counts as after midnight
  function mins(t) {
    const m = /^(\d{1,2}):(\d{2})/.exec(String(t || ''));
    if (!m) return null;
    const v = +m[1] * 60 + +m[2];
    return v < CUTOFF ? v + 1440 : v;
  }
  const hhmm = (m) => m == null ? '' : String(Math.floor(m / 60) % 24).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  // "5 min ago" style age, for "last updated" labels
  function ago(ms, he) {
    const s = Math.max(0, Math.round((Date.now() - ms) / 1000));
    if (s < 45) return he ? 'עכשיו' : 'just now';
    const m = Math.round(s / 60);
    if (m < 60) return he ? `לפני ${m} דק׳` : `${m} min ago`;
    const h = Math.round(m / 60);
    return he ? `לפני ${h} שע׳` : `${h} h ago`;
  }
  g.EventClock = { TZ, CUTOFF, DAYS, now, mins, hhmm, ago };
})(typeof window !== 'undefined' ? window : globalThis);
