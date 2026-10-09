// Shared server helpers: errors, input validation, HTML sanitizing, safe URLs, AI quotas, idempotency.

export class HttpError extends Error {
  constructor(status, message, extra) {
    super(message);
    this.status = status;
    this.extra = extra || null;
  }
}

export const json = (data, status = 200, headers = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "private, no-store", "x-content-type-options": "nosniff", ...headers }
});

const enc = new TextEncoder();
export const utf8Bytes = (s) => enc.encode(String(s ?? "")).length;

// Read a JSON body with a byte limit. Invalid JSON is a 400, an oversized body a 413.
export async function readJson(request, maxBytes = 1024 * 1024) {
  const len = +(request.headers.get("content-length") || 0);
  if (len > maxBytes) throw new HttpError(413, "request too large");
  const text = await request.text();
  if (utf8Bytes(text) > maxBytes) throw new HttpError(413, "request too large");
  if (!text.trim()) return {};
  try {
    const v = JSON.parse(text);
    return v && typeof v === "object" && !Array.isArray(v) ? v : {};
  } catch {
    throw new HttpError(400, "invalid JSON");
  }
}

// ---- value validation ----
export const ENUMS = {
  segment_status: ["open", "progress", "confirmed"],
  content_status: ["draft", "review", "locked"],
  run_status: ["no_driver", "to_confirm", "booked", "needs_decision"],
  food_status: ["open", "progress", "confirmed", "not_started"],
  meal_type: ["drinks", "snack", "lunch", "dinner", "breakfast"],
  design_status: ["content_missing", "in_design", "awaiting_approval", "approved", "changes", "at_printer", "delivered", "no_design", "unresolved"],
  crew_kind: ["setup", "guest", "move", "strike"],
  talent_stage: ["contacted", "quote", "signed", "invoiced"],
  guest_status: ["active", "cancelled"],
  file_access: ["ops", "admin", "chief"]
};
export function oneOf(kind, v) {
  if (!ENUMS[kind].includes(v)) throw new HttpError(400, `invalid ${kind.replace("_", " ")}`);
  return v;
}
// Free-ish categories (design category, gift status): short lowercase identifiers only.
export function ident(v, what = "value") {
  const s = String(v ?? "").trim();
  if (!/^[a-z][a-z0-9_]{0,23}$/.test(s)) throw new HttpError(400, `invalid ${what}`);
  return s;
}
// "HH:MM"; hours up to 29 so that runs after midnight ("24:15", "00:15") stay valid. Empty allowed.
export function timeHM(v, { allowEmpty = true } = {}) {
  const s = String(v ?? "").trim();
  if (!s && allowEmpty) return "";
  if (!/^([01]\d|2[0-9]):[0-5]\d$/.test(s)) throw new HttpError(400, "time must be HH:MM");
  return s;
}
export function dateISO(v, { allowEmpty = true } = {}) {
  const s = String(v ?? "").trim();
  if (!s && allowEmpty) return "";
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) throw new HttpError(400, "date must be YYYY-MM-DD");
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) throw new HttpError(400, "not a real date");
  return s;
}
export function dayNum(v) {
  const n = parseInt(v);
  if (![1, 2, 3].includes(n)) throw new HttpError(400, "day must be 1, 2 or 3");
  return n;
}
export const str = (v, max) => String(v ?? "").slice(0, max);

// Navigation links: only http(s), parsed properly (no javascript:, data:, or protocol tricks).
export function safeHttpUrl(v, { allowEmpty = true } = {}) {
  const s = String(v ?? "").trim();
  if (!s && allowEmpty) return "";
  let u;
  try { u = new URL(s); } catch { throw new HttpError(400, "link must be a full https:// address"); }
  if (u.protocol !== "https:" && u.protocol !== "http:") throw new HttpError(400, "link must start with https://");
  if (!u.hostname) throw new HttpError(400, "link has no host");
  return u.toString().slice(0, 2000);
}

// ---- HTML sanitizing for rich-text notes (allowlist, built on the Workers HTMLRewriter parser) ----
// Kept: basic formatting the notes editor produces. Removed with their content: active or embedding elements.
// Anything else is unwrapped (its text is kept). Attributes are dropped except a vetted few.
const KEEP = new Set(["p", "div", "br", "b", "strong", "i", "em", "u", "s", "strike", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "span", "font", "a", "hr", "sub", "sup", "pre", "code", "table", "thead", "tbody", "tr", "th", "td"]);
const DROP = new Set(["script", "style", "iframe", "frame", "frameset", "object", "embed", "applet", "svg", "math", "template", "noscript", "link", "meta", "base", "form", "input", "button", "textarea", "select", "option", "img", "video", "audio", "source", "track", "canvas", "picture", "portal", "title", "head", "xml", "plaintext", "xmp", "noembed", "noframes"]);
const COLOR = /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*(0|1|0?\.\d+)\s*)?\)|[a-z]{3,20})$/i;
const FONT_SIZE = /^[1-7]$/;
const CSS_SIZE = /^(x{0,3}-?(small|large)|medium|\d{1,2}(\.\d)?(px|pt|em|rem|%))$/i;
export function safeHref(v) {
  const s = String(v || "").trim();
  if (/^mailto:[^\s"'<>]+$/i.test(s) || /^tel:[+\d\s().-]+$/i.test(s)) return s;
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : null;
  } catch { return null; }
}
function cleanStyle(style) {
  const out = [];
  for (const decl of String(style || "").split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim().toLowerCase(), val = decl.slice(i + 1).trim();
    if ((prop === "color" || prop === "background-color") && COLOR.test(val)) out.push(`${prop}: ${val}`);
    else if (prop === "font-size" && CSS_SIZE.test(val)) out.push(`${prop}: ${val}`);
    else if (prop === "font-weight" && /^(bold|normal|[1-9]00)$/.test(val)) out.push(`${prop}: ${val}`);
    else if (prop === "font-style" && /^(italic|normal)$/.test(val)) out.push(`${prop}: ${val}`);
    else if (prop === "text-decoration" && /^(underline|line-through|none)$/.test(val)) out.push(`${prop}: ${val}`);
    else if (prop === "text-align" && /^(left|right|center|justify|start|end)$/.test(val)) out.push(`${prop}: ${val}`);
  }
  return out.join("; ");
}
async function sanitizeOnce(html) {
  const rw = new HTMLRewriter()
    .on("*", {
      element(el) {
        const tag = el.tagName.toLowerCase();
        if (DROP.has(tag)) { el.remove(); return; }
        if (!KEEP.has(tag)) { el.removeAndKeepContent(); return; }
        const attrs = [...el.attributes];
        for (const [name] of attrs) el.removeAttribute(name);
        for (const [name, value] of attrs) {
          const n = name.toLowerCase();
          if (tag === "a" && n === "href") { const h = safeHref(value); if (h) el.setAttribute("href", h); }
          else if (tag === "font" && n === "color" && COLOR.test(value.trim())) el.setAttribute("color", value.trim());
          else if (tag === "font" && n === "size" && FONT_SIZE.test(value.trim())) el.setAttribute("size", value.trim());
          else if (n === "style") { const st = cleanStyle(value); if (st) el.setAttribute("style", st); }
          else if ((tag === "td" || tag === "th") && (n === "colspan" || n === "rowspan") && /^\d{1,2}$/.test(value)) el.setAttribute(n, value);
          else if (n === "dir" && /^(rtl|ltr|auto)$/i.test(value)) el.setAttribute("dir", value.toLowerCase());
        }
        if (tag === "a") { el.setAttribute("rel", "noopener noreferrer"); el.setAttribute("target", "_blank"); }
      },
      comments(c) { c.remove(); }
    })
    .onDocument({ doctype(d) { d.remove(); } });
  return await rw.transform(new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } })).text();
}
// Run until stable (at most 4 passes) so that markup reassembled by one pass is cleaned by the next.
export async function sanitizeHtml(html) {
  let cur = String(html ?? "");
  for (let i = 0; i < 4; i++) {
    const next = await sanitizeOnce(cur);
    if (next === cur) return next;
    cur = next;
  }
  return cur;
}

// ---- AI quotas and concurrency (D1-backed, not in-memory) ----
const AI_LIMITS = {
  day: { ask: { view: 40, edit: 300, admin: 400 }, propose: { edit: 60, admin: 100 }, inbox: { edit: 150, admin: 200 }, menu: { admin: 60 } },
  perMinute: 20,
  concurrent: 4,
  leaseMs: 120000
};
export async function aiAcquire(env, feature, level) {
  const now = Date.now();
  const day = new Date(now + 3 * 3600e3).toISOString().slice(0, 10); // Israel-ish calendar day
  const minute = Math.floor(now / 60000);
  const dayLimit = ((AI_LIMITS.day[feature] || {})[level]) ?? 0;
  if (!dayLimit) throw new HttpError(403, "AI not available for this key");
  const bump = async (bucket) => {
    const r = await env.DB.prepare("INSERT INTO ai_usage (bucket, n, updated_at) VALUES (?, 1, datetime('now')) ON CONFLICT(bucket) DO UPDATE SET n = n + 1, updated_at = datetime('now') RETURNING n").bind(bucket).first();
    return r ? r.n : 0;
  };
  if (await bump(`m:${minute}`) > AI_LIMITS.perMinute) throw new HttpError(429, "The assistant is busy. Try again in a minute.");
  if (await bump(`d:${day}:${feature}:${level}`) > dayLimit) throw new HttpError(429, "Today's limit for the assistant has been reached.");
  const id = crypto.randomUUID();
  await env.DB.prepare("DELETE FROM ai_leases WHERE expires_at < ?").bind(now).run();
  const got = await env.DB.prepare("INSERT INTO ai_leases (id, expires_at) SELECT ?, ? WHERE (SELECT COUNT(*) FROM ai_leases WHERE expires_at >= ?) < ?").bind(id, now + AI_LIMITS.leaseMs, now, AI_LIMITS.concurrent).run();
  if (!got.meta.changes) throw new HttpError(429, "The assistant is handling other requests. Try again shortly.");
  if (Math.random() < 0.02) await env.DB.prepare("DELETE FROM ai_usage WHERE updated_at < datetime('now','-3 days')").run();
  return async () => { try { await env.DB.prepare("DELETE FROM ai_leases WHERE id=?").bind(id).run(); } catch {} };
}

// ---- idempotency for non-idempotent actions ----
export async function idempotent(env, request, scope, fn) {
  const key = (request.headers.get("idempotency-key") || "").slice(0, 100);
  if (!key) return await fn();
  const k = scope + ":" + key;
  const prev = await env.DB.prepare("SELECT response FROM idempotency_keys WHERE key=?").bind(k).first();
  if (prev) {
    if (!prev.response) throw new HttpError(409, "this request is already being processed");
    return json(JSON.parse(prev.response));
  }
  const ins = await env.DB.prepare("INSERT OR IGNORE INTO idempotency_keys (key, scope, response) VALUES (?, ?, '')").bind(k, scope).run();
  if (!ins.meta.changes) throw new HttpError(409, "this request is already being processed");
  try {
    const res = await fn();
    if (res.status < 300) {
      const body = await res.clone().text();
      await env.DB.prepare("UPDATE idempotency_keys SET response=? WHERE key=?").bind(body, k).run();
    } else {
      await env.DB.prepare("DELETE FROM idempotency_keys WHERE key=?").bind(k).run();
    }
    return res;
  } catch (e) {
    await env.DB.prepare("DELETE FROM idempotency_keys WHERE key=?").bind(k).run();
    throw e;
  }
}

// ---- token hashing for individual field credentials ----
export async function sha256Hex(s) {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(String(s))));
  return [...d].map((x) => x.toString(16).padStart(2, "0")).join("");
}
