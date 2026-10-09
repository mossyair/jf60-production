// Shared API client. Every request has a timeout, and every failure becomes an ApiError with a kind:
// auth, forbidden, notfound, conflict, validation, busy, timeout, network or server. Nothing counts as
// saved unless the server answered 2xx with a JSON body that has no error.
(function (g) {
  class ApiError extends Error {
    constructor(message, status, kind, data) {
      super(message);
      this.status = status;
      this.kind = kind;
      this.data = data || null;
    }
  }
  const kindOf = (s) => s === 401 ? 'auth' : s === 403 ? 'forbidden' : s === 404 ? 'notfound' : s === 409 ? 'conflict'
    : s === 400 || s === 413 || s === 415 || s === 422 || s === 405 ? 'validation' : s === 429 ? 'busy' : s === 504 ? 'timeout' : 'server';
  async function apiRequest(path, opts) {
    const o = opts || {};
    const headers = Object.assign({}, o.headers);
    if (o.key) headers['x-token'] = o.key;
    if (o.idem) headers['idempotency-key'] = o.idem;
    let body;
    if (o.body instanceof FormData) body = o.body;
    else if (o.body !== undefined) { headers['content-type'] = 'application/json'; body = JSON.stringify(o.body); }
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), o.timeout || 20000);
    let r, text = '';
    try {
      r = await fetch('/api/' + path, { method: o.method || (o.body !== undefined ? 'POST' : 'GET'), headers, body, signal: ctl.signal, cache: 'no-store', credentials: 'same-origin' });
      text = await r.text();
    } catch (e) {
      throw ctl.signal.aborted ? new ApiError('The server did not answer in time', 0, 'timeout') : new ApiError('No connection to the server', 0, 'network');
    } finally {
      clearTimeout(timer);
    }
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = null; }
    if (!r.ok) throw new ApiError((data && data.error) || ('HTTP ' + r.status), r.status, kindOf(r.status), data);
    if (!data || typeof data !== 'object' || data.error) throw new ApiError((data && data.error) || 'Unexpected answer from the server', r.status, 'server', data);
    return data;
  }
  const newIdemKey = () => (g.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  // a short message for people, by kind (English and Hebrew)
  function errorText(e, he) {
    const k = e && e.kind;
    const M = {
      auth: ['Your key is no longer accepted. Sign in again.', 'הקוד כבר לא מתקבל. יש להתחבר מחדש.'],
      forbidden: ['Your key does not allow this.', 'הקוד שלך לא מאפשר את זה.'],
      notfound: ['This item no longer exists (someone may have deleted it).', 'הפריט כבר לא קיים (אולי מישהו מחק אותו).'],
      conflict: ['Someone else changed this meanwhile.', 'מישהו אחר שינה את זה בינתיים.'],
      validation: ['The server did not accept this value', 'השרת לא קיבל את הערך'],
      busy: ['The server is busy. Try again in a minute.', 'השרת עמוס. נסו שוב בעוד דקה.'],
      timeout: ['The server did not answer in time. It may or may not have saved.', 'השרת לא ענה בזמן. ייתכן שנשמר וייתכן שלא.'],
      network: ['No connection. Nothing was saved.', 'אין חיבור. שום דבר לא נשמר.'],
      server: ['Server error. Nothing was saved.', 'שגיאת שרת. שום דבר לא נשמר.']
    };
    const m = M[k] || M.server;
    const base = m[he ? 1 : 0];
    return k === 'validation' && e.message ? base + ': ' + e.message : base;
  }
  g.ApiError = ApiError;
  g.apiRequest = apiRequest;
  g.newIdemKey = newIdemKey;
  g.apiErrorText = errorText;
})(window);
