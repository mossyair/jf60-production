import Anthropic from "@anthropic-ai/sdk";
import { HttpError, json as jsonResp, readJson, oneOf, ident, timeHM, dateISO, dayNum, str, safeHttpUrl, sanitizeHtml, aiAcquire, idempotent, sha256Hex, utf8Bytes } from "./lib.js";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var json = jsonResp;
var GUEST_OPS_COLUMNS = ["id", "party_id", "first_name", "last_name", "desk", "ptype", "dietary", "dietary_severe", "hotel", "room_type", "checkin", "checkout", "accommodation", "accommodation_note", "booking_conf", "early_late", "guest_note", "note_handled", "is_lead", "needs_review", "review_note", "status", "updated_at"];
var UPLOAD_SECTIONS = ["content", "general", "proof", "menu"];
var MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
var UPLOAD_TYPES = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  csv: "text/csv",
  txt: "text/plain"
};
var INLINE_TYPES = ["application/pdf", "image/png", "image/jpeg", "image/webp", "image/gif"];
var LEVELS = [["chief", "CHIEF_TOKEN"], ["admin", "ADMIN_TOKEN"], ["edit", "EDIT_TOKEN"], ["view", "VIEW_TOKEN"]];
var SESSION_COOKIE = "jf60_dl";
var SESSION_TTL = 12 * 3600;
var enc = new TextEncoder();
async function sha256(s) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(s)));
}
async function safeEqual(a, b) {
  const [ha, hb] = await Promise.all([sha256(String(a)), sha256(String(b))]);
  return crypto.subtle.timingSafeEqual(ha, hb);
}
async function hmacHex(secret, msg) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(msg)));
  return [...sig].map((x) => x.toString(16).padStart(2, "0")).join("");
}
// ---- authentication ----
// Dashboard keys (chief/admin/edit/view) are Worker secrets. Field access needs either an individual
// credential (field_credentials: hashed token -> role, person and authorized scope) or, for drivers and
// the AV supplier only, an optional shared secret. Nothing has a built-in default: a role whose secret
// or credentials are missing is simply disabled. Tokens are exact and case-sensitive.
var SHARED_FIELD_MIN = 16;
async function authenticate(request, env, url) {
  const token = request.headers.get("x-token") || "";
  if (token) {
    for (const [level, name] of LEVELS)
      if (env[name] && await safeEqual(token, env[name]))
        return { level, cred: null };
    for (const [level, name] of [["driver", "DRIVER_TOKEN"], ["av", "AV_TOKEN"]])
      if (env[name] && env[name].length >= SHARED_FIELD_MIN && await safeEqual(token, env[name]))
        return { level, cred: null };
    if (/^[A-Za-z0-9_-]{20,128}$/.test(token)) {
      let c = null;
      try {
        c = await env.DB.prepare("SELECT * FROM field_credentials WHERE token_hash=? AND active=1").bind(await sha256Hex(token)).first();
      } catch (e) {
        c = null;
      }
      if (c) {
        const arr = (v) => { try { const a = JSON.parse(v || "[]"); return Array.isArray(a) ? a.map(String) : []; } catch { return []; } };
        let person = null;
        if (c.person_id != null)
          person = await env.DB.prepare("SELECT id, name, role, phone FROM team WHERE id=?").bind(c.person_id).first();
        // leaders and crew are always a named person; without one the credential does nothing
        if ((c.role === "leader" || c.role === "crew") && !person)
          return null;
        return { level: c.role, cred: { id: c.id, role: c.role, label: c.label || "", person, hotel_ids: arr(c.hotel_ids), run_ids: arr(c.run_ids), segment_ids: arr(c.segment_ids), all_scope: !!c.all_scope } };
      }
    }
    return null;
  }
  if (url.pathname === "/api/files/download" && request.method === "GET") {
    const level = await cookieLevel(request, env);
    return level ? { level, cred: null } : null;
  }
  return null;
}
async function makeSessionCookie(level, env) {
  const secret = env[LEVELS.find(([l]) => l === level)[1]];
  const exp = Math.floor(Date.now() / 1e3) + SESSION_TTL;
  const sig = await hmacHex(secret, `${level}.${exp}`);
  return `${SESSION_COOKIE}=${level}.${exp}.${sig}; Path=/api/files/download; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL}`;
}
var CLEAR_COOKIE = `${SESSION_COOKIE}=; Path=/api/files/download; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
async function cookieLevel(request, env) {
  const m = (request.headers.get("cookie") || "").match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([a-z]+)\\.(\\d+)\\.([0-9a-f]{64})`));
  if (!m)
    return null;
  const [, level, exp, sig] = m;
  const entry = LEVELS.find(([l]) => l === level);
  if (!entry || !env[entry[1]] || +exp < Date.now() / 1e3)
    return null;
  return await safeEqual(sig, await hmacHex(env[entry[1]], `${level}.${exp}`)) ? level : null;
}
async function readBody(request, maxBytes) {
  return await readJson(request, maxBytes);
}
__name(readBody, "readBody");
__name2(readBody, "readBody");
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 32768;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}
__name(arrayBufferToBase64, "arrayBufferToBase64");
__name2(arrayBufferToBase64, "arrayBufferToBase64");
var MENU_SYSTEM_PROMPT = `You read a catering menu (PDF or photo) and extract it into structured JSON, nothing else.

Respond with ONLY a JSON array, no prose, no markdown fences. Shape:
[
  {"course": "Starter", "choice": false, "items": [{"name": "Dish name, short description"}]},
  {"course": "Main course", "choice": true, "locked": false, "items": [
    {"name": "Option A", "selected": true},
    {"name": "Option B", "selected": false}
  ]}
]

Rules:
- "choice": true only when the menu explicitly offers alternatives the client must pick between for that course (e.g. "choice of X or Y"). Otherwise "choice": false and each course is one or more fixed items with no "selected" key.
- When "choice" is true, mark exactly one item "selected": true as a default (the first listed), all others "selected": false. Always include "locked": false for choice courses.
- Group naturally by course/section as the menu presents them (e.g. Starters, Salads, Mains, Dessert, Drinks) \u2014 use the menu's own section names where given.
- NEVER include any price, currency amount, or per-person cost anywhere in the output.
- NEVER include payment terms, cancellation policy, minimum spend, service fees, or tip/gratuity information \u2014 menu content only.
- Keep each item's "name" to the dish name plus a short description if the source gives one. The user message specifies which language to write the output in.
- If the document is not a menu, or has no readable menu content, respond with exactly: []`;
// ---- AI questions (Control Room): answers from the live data, never changes it ----
// Guests are sent as counts only: no names, emails, phones or passport details.
var AI_ASK_MODEL = "claude-opus-5-5";
var AI_ASK_SYSTEM = `You answer questions from the production team of the Jerusalem Foundation's 60th anniversary conference ("Jerusalem — Yesterday, Today and Tomorrow"), held 20–22 October 2026 in Jerusalem. The current production data is attached as JSON.

Answer from that data only. If it doesn't contain the answer, say so plainly and, if useful, say where in the Control Room it would be recorded. Reply in the language of the question (Hebrew or English).

How to read the data:
- day 1 = Tue 20.10, day 2 = Wed 21.10, day 3 = Thu 22.10. A time after midnight (00:15) belongs to the evening before.
- Session, food and to-do status: open, progress (in progress), confirmed. Transport status: no_driver, to_confirm, booked, needs_decision. Design status: content_missing, in_design, awaiting_approval, approved, changes, no_design, unresolved.
- todos and people_per_session link to sessions by segment_id. done = 1 means done.
- crew_schedule: day is the date in October (19-22); start_min/end_min are minutes from midnight (past 1440 means after midnight); crew_json lists people as n (name, or a number for a headcount like "2" assistant producers) and r (role), with n "?" meaning nobody is assigned yet; flag is an open issue.
- talent_contracts (admins only): stage is contacted, quote, signed or invoiced; fee is in ILS including VAT.
- guest_summary has counts only. Individual guests aren't included, so for questions about a named guest, point to People → Guests.

Keep answers short and easy to scan: a sentence or two, or a short list using "- " bullets. Plain text only, no headings, tables or bold. Name sessions, times and venues as the data does.

You can't change anything. If someone asks you to make a change, tell them to use "Suggest changes", which turns a request into changes an admin can review and apply.`;
function deviceLabel(ua) {
  ua = ua || "";
  const os = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /Mac OS X|Macintosh/.test(ua) ? "Mac" : /Windows/.test(ua) ? "Windows" : /Linux/.test(ua) ? "Linux" : "Other";
  const br = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /CriOS|Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "";
  return br ? os + " \xB7 " + br : os;
}
__name(deviceLabel, "deviceLabel");
async function handleAccess(path, request, env, level) {
  try {
    if (path === "/api/access/hello" && request.method === "POST") {
      const b = await readBody(request);
      const ui = ["classic", "driver", "leader", "av", "crew"].includes(b.ui) ? b.ui : "control";
      const country = request.cf && request.cf.country || "";
      const r = await env.DB.prepare("INSERT INTO access_log (name, level, ui, device, country) VALUES (?,?,?,?,?)").bind((b.name || "").toString().trim().slice(0, 80), level, ui, deviceLabel(request.headers.get("user-agent")), country).run();
      await env.DB.prepare("DELETE FROM access_log WHERE started_at < datetime('now','-180 days')").run();
      return json({ ok: true, id: r.meta && r.meta.last_row_id });
    }
    if (path === "/api/access/ping" && request.method === "POST") {
      const b = await readBody(request);
      await env.DB.prepare("UPDATE access_log SET last_at=datetime('now') WHERE id=? AND level=? AND started_at > datetime('now','-1 day')").bind(parseInt(b.id) || 0, level).run();
      return json({ ok: true });
    }
    if (path === "/api/access/log" && request.method === "GET") {
      if (level !== "admin")
        return json({ error: "admin required" }, 403);
      const days = Math.max(1, Math.min(180, parseInt(new URL(request.url).searchParams.get("days")) || 7));
      const rows = await env.DB.prepare("SELECT id, started_at, last_at, name, level, ui, device, country FROM access_log WHERE started_at >= datetime('now', ?) ORDER BY started_at DESC LIMIT 2000").bind("-" + days + " days").all();
      return json({ rows: rows.results });
    }
  } catch (e) {
    console.error("access log", e);
    return json({ ok: false });
  }
  return null;
}
__name(handleAccess, "handleAccess");
async function buildAskContext(env, level) {
  // a view key's Ask sees exactly what its own screen sees
  if (level === "view") {
    const p = await publicProjection(env);
    return { sessions: p.segments, transport_runs: p.transport_runs, transport_stops: p.run_stops };
  }
  const q = async (sql) => (await env.DB.prepare(sql).all()).results;
  const ctx = {};
  ctx.sessions = await q("SELECT id, day, time, end_time, title, title_he, venue, venue_he, descr, status, notes, brief_av, notes_speaker, notes_logistics FROM segments ORDER BY day, time, sort_order");
  ctx.transport_runs = await q("SELECT id, day, depart_time, arrive_time, title, destination, status, driver, company, vehicles, notes FROM transport_runs ORDER BY day, sort_order");
  ctx.todos = await q("SELECT segment_id, text, done, owner FROM checklist");
  ctx.people_per_session = await q("SELECT segment_id, name, confirmed FROM people");
  ctx.milestones = await q("SELECT due_date, title, category, owner, done FROM timeline ORDER BY due_date");
  ctx.food = await q("SELECT id, day, time, end_time, title, venue, meal_type, status, caterer, headcount, dietary_note, notes FROM food_items ORDER BY day, sort_order");
  ctx.design_print = await q("SELECT title, category, status, deadline, qty, supplier, notes FROM design_items ORDER BY sort_order");
  ctx.gifts = await q("SELECT title, category, chosen, qty, status FROM gift_items ORDER BY sort_order");
  ctx.contacts = await q("SELECT name, role, venue FROM contacts");
  ctx.team = await q("SELECT name, role, org FROM team");
  ctx.day_guests = await q("SELECT desk, sessions FROM day_guests");
  ctx.crew_schedule = await q("SELECT day, start_min, end_min, title, site, kind, crew_json, flag, note, done FROM crew_shifts ORDER BY day, start_min");
  ctx.furniture = await q("SELECT setup, segment_ids, item, qty, qty_note, size, stays_until, notes FROM furniture_items ORDER BY sort_order");
  ctx.organizations_fair = await q("SELECT name, domain, note, contacted, confirmed, form_done, power FROM fair_orgs ORDER BY sort_order");
  if (level === "admin") {
    ctx.talent_contracts = await q("SELECT title, stage, fee, notes FROM talent_items ORDER BY sort_order");
    ctx.catering_quotes = await q("SELECT food_id, supplier, menu, price, linens, dishes, note, chosen FROM catering_quotes ORDER BY sort_order");
  }
  // guests as counts only: no names, emails, phones or passport details
  const g = await q("SELECT desk, hotel, dietary, dietary_severe, needs_review, passport_no FROM guests WHERE status='active'");
  const tally = (key) => g.reduce((m, r) => {
    const k = (r[key] || "").toString().trim() || "(none recorded)";
    m[k] = (m[k] || 0) + 1;
    return m;
  }, {});
  ctx.guest_summary = { total: g.length, by_hotel: tally("hotel"), by_desk: tally("desk"), by_dietary_need: tally("dietary"), severe_allergies: g.filter((r) => r.dietary_severe).length, flagged_for_review: g.filter((r) => r.needs_review).length };
  if (level === "admin")
    ctx.guest_summary.missing_passport_number = g.filter((r) => !r.passport_no).length;
  return ctx;
}
__name(buildAskContext, "buildAskContext");
async function handleAsk(request, env, level) {
  const b = await readBody(request, 64e3);
  const question = str(b.question, 2e3).trim();
  if (!question)
    throw new HttpError(400, "empty question");
  const messages = [];
  for (const turn of (Array.isArray(b.history) ? b.history : []).slice(-6)) {
    const tq = str(turn && turn.q, 2e3).trim(), ta = str(turn && turn.a, 6e3).trim();
    if (tq && ta)
      messages.push({ role: "user", content: tq }, { role: "assistant", content: ta });
  }
  messages.push({ role: "user", content: question });
  const ctx = await buildAskContext(env, level);
  const msg = await withAi(env, "ask", level, async () => {
    try {
      return await anthropicClient(env).beta.messages.create({
        model: AI_ASK_MODEL,
        max_tokens: 8e3,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        thinking: { type: "adaptive" },
        output_config: { effort: "medium" },
        system: [
          { type: "text", text: AI_ASK_SYSTEM },
          { type: "text", text: "Current production data (JSON):\n" + JSON.stringify(ctx), cache_control: { type: "ephemeral" } }
        ],
        messages
      });
    } catch (e) {
      throw aiError(e, "ai ask");
    }
  });
  if (msg.stop_reason === "refusal")
    return json({ answer: "", refused: true });
  const answer = msg.content.filter((c) => c.type === "text").map((c) => c.text).join("").trim();
  return json({ answer, truncated: msg.stop_reason === "max_tokens" });
}
__name(handleAsk, "handleAsk");
function aiError(e, where) {
  if (e instanceof HttpError)
    return e;
  if (e instanceof Anthropic.APIConnectionTimeoutError)
    return new HttpError(504, "The assistant took too long. Try again.", { kind: "timeout" });
  if (e instanceof Anthropic.RateLimitError)
    return new HttpError(429, "The assistant is busy. Try again in a minute.");
  if (e instanceof Anthropic.APIError) {
    console.error(where, e.status);
    return new HttpError(502, "The assistant couldn't answer right now.");
  }
  return e;
}
// ---- Inbox (Control Room): Claude reads a dropped file and suggests where it belongs ----
var INBOX_TYPES = ["quote", "invoice", "contract", "menu", "proof", "guests", "rider", "transport", "runsheet", "exhibitors", "bio", "map", "other"];
var INBOX_ADMIN_TYPES = ["guests", "invoice", "contract"];
var INBOX_SYSTEM = `You sort documents that the production team of the Jerusalem Foundation's 60th anniversary conference (20–22 October 2026, Jerusalem) drops into their Control Room inbox. Read the document, say what it is and what it contains, and pick the item it belongs to.

Types: quote (supplier price quote), invoice (invoice or receipt), contract (signed talent or supplier contract), menu (catering menu), proof (design artwork for sign-off), guests (guest registration list), rider (tech rider or AV brief for a session), transport (driver or vehicle list), runsheet (run sheet or crew schedule), exhibitors (organizations fair list), bio (speaker bio or headshot), map (floor plan or site map), other.

target_id: the id of the matching item from the candidate lists (menu: food; proof: design; contract: talent; rider, bio, map: sessions), or "" when nothing fits or the type has no list.
fields: up to 6 key facts as label/value pairs (supplier, amount, date, item, version, rows), values in the document's language.
summary: one or two plain sentences in English saying what the document is.
confidence: 0-100, how sure you are of the type.`;
var INBOX_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["type", "confidence", "summary", "fields", "target_id"],
  properties: {
    type: { type: "string", enum: INBOX_TYPES },
    confidence: { type: "integer" },
    summary: { type: "string" },
    fields: { type: "array", items: { type: "object", additionalProperties: false, required: ["label", "value"], properties: { label: { type: "string" }, value: { type: "string" } } } },
    target_id: { type: "string" }
  }
};
// The inbox item inherits the access class of the file it was read from; only people who may open that
// file see the item, and filing never lowers it (filing as a guest list, invoice or contract raises it to admin).
async function handleInboxRead(request, env, auth, level) {
  if (!env.BUCKET)
    throw new HttpError(500, "file storage is not configured");
  const b = await readBody(request, 3e5);
  const fileRow = await env.DB.prepare("SELECT * FROM files WHERE id=?").bind(b.file_id ?? null).first();
  if (!fileReadable(auth, fileRow))
    throw new HttpError(404, "file not found");
  const name = fileRow.filename || "file";
  const ext = ((name.match(/\.([a-z0-9]+)$/i) || [])[1] || "").toLowerCase();
  const ct = fileRow.content_type || "";
  const content = [];
  if (ct === "application/pdf" || /^image\/(png|jpeg|gif|webp)$/.test(ct)) {
    const obj = await env.BUCKET.get(fileRow.r2_key);
    if (!obj)
      throw new HttpError(404, "file missing in storage");
    const bytes = await obj.arrayBuffer();
    if (bytes.byteLength > 20 * 1024 * 1024)
      throw new HttpError(413, "file too large to read (20MB limit)");
    const data = arrayBufferToBase64(bytes);
    content.push(ct === "application/pdf" ? { type: "document", source: { type: "base64", media_type: "application/pdf", data } } : { type: "image", source: { type: "base64", media_type: ct, data } });
  } else if (ct === "text/csv" || ct === "text/plain") {
    const obj = await env.BUCKET.get(fileRow.r2_key);
    if (!obj)
      throw new HttpError(404, "file missing in storage");
    content.push({ type: "text", text: "Document contents (first part):\n" + (await obj.text()).slice(0, 6e4) });
  } else if (b.text) {
    // spreadsheets: the browser sends only the one sheet needed, capped
    content.push({ type: "text", text: "Document contents (converted to text in the browser):\n" + str(b.text, 6e4) });
  }
  const q = async (sql) => (await env.DB.prepare(sql).all()).results;
  const candidates = {
    sessions: await q("SELECT id, day, time, title, venue FROM segments ORDER BY day, time"),
    food: await q("SELECT id, day, time, title, venue FROM food_items ORDER BY day, sort_order"),
    design: await q("SELECT id, title, category FROM design_items ORDER BY sort_order"),
    talent: level === "admin" ? await q("SELECT id, title FROM talent_items ORDER BY sort_order") : []
  };
  content.push({ type: "text", text: `File name: ${name}${content.length ? "" : " (its contents could not be read; judge from the name)"}\n\nCandidate items (JSON):\n${JSON.stringify(candidates)}` });
  const msg = await withAi(env, "inbox", level, async () => {
    try {
      return await anthropicClient(env).beta.messages.create({
        model: AI_ASK_MODEL,
        max_tokens: 4e3,
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        thinking: { type: "adaptive" },
        output_config: { effort: "low", format: { type: "json_schema", schema: INBOX_SCHEMA } },
        system: INBOX_SYSTEM,
        messages: [{ role: "user", content }]
      });
    } catch (e) {
      throw aiError(e, "inbox read");
    }
  });
  let out = { type: "other", confidence: 0, summary: "The assistant couldn't read this file. Pick a type, or keep it as a plain file.", fields: [], target_id: "" };
  if (msg.stop_reason !== "refusal") {
    try {
      const parsed = JSON.parse(msg.content.filter((c) => c.type === "text").map((c) => c.text).join(""));
      if (INBOX_TYPES.includes(parsed.type))
        out = parsed;
    } catch {
    }
  }
  const ids = { menu: candidates.food, proof: candidates.design, contract: candidates.talent, rider: candidates.sessions, bio: candidates.sessions, map: candidates.sessions };
  const target = (ids[out.type] || []).some((x) => String(x.id) === String(out.target_id)) ? String(out.target_id) : "";
  const fields = (Array.isArray(out.fields) ? out.fields : []).slice(0, 6).map((f) => ({ label: str(f.label, 60), value: str(f.value, 200) }));
  const r = await env.DB.prepare(
    "INSERT INTO inbox_items (file_id, name, ext, state, type, confidence, summary, fields_json, target, created_by, access) VALUES (?,?,?,'review',?,?,?,?,?,?,?)"
  ).bind(fileRow.id, name, ext.toUpperCase().slice(0, 4), out.type, Math.max(0, Math.min(100, parseInt(out.confidence) || 0)), str(out.summary, 600), JSON.stringify(fields), target, str(b.by, 60), fileRow.access).run();
  return json({ ok: true, id: r.meta.last_row_id });
}
__name(handleInboxRead, "handleInboxRead");
async function handleInboxApply(request, env, auth, admin) {
  const b = await readBody(request);
  const item = await env.DB.prepare("SELECT * FROM inbox_items WHERE id=?").bind(b.id ?? null).first();
  if (!item || item.state !== "review" || !readableAccess(auth).includes(item.access))
    throw new HttpError(404, "not found");
  const type = b.plain ? "other" : INBOX_TYPES.includes(b.type) ? b.type : item.type;
  if (!b.plain && INBOX_ADMIN_TYPES.includes(type) && !admin)
    throw new HttpError(403, "admin required");
  const target = str(b.target ?? item.target ?? "", 100);
  const by = str(b.by, 60);
  const fid = item.file_id;
  // access after filing: never lower than now; admin-only kinds become at least admin; an admin may
  // set it explicitly (chief only by the chief key)
  const rank = { ops: 0, admin: 1, chief: 2 };
  let access = item.access;
  if (!b.plain && INBOX_ADMIN_TYPES.includes(type) && rank[access] < 1)
    access = "admin";
  if (b.access && admin) {
    const want = oneOf("file_access", b.access);
    if (want === "chief" && auth.level !== "chief")
      throw new HttpError(403, "only the chief key can mark a file chief-only");
    access = want;
  }
  const stmts = [];
  let proofAt = -1;
  const fileTo = (section, segId) => stmts.push(env.DB.prepare("UPDATE files SET section=?, segment_id=? WHERE id=?").bind(section, segId, fid));
  let filedTo = "Files";
  if (!b.plain) {
    if (type === "menu" && target) {
      const f = await env.DB.prepare("SELECT title FROM food_items WHERE id=?").bind(target).first();
      if (!f)
        throw new HttpError(404, "food item not found");
      fileTo("menu", target);
      filedTo = "Food · " + f.title;
    } else if (type === "proof" && target) {
      const d = await env.DB.prepare("SELECT title FROM design_items WHERE id=?").bind(target).first();
      if (!d)
        throw new HttpError(404, "design item not found");
      proofAt = stmts.length;
      stmts.push(...proofStatements(env, target, fid, by));
      filedTo = "Design · " + d.title;
    } else if (type === "contract" && target) {
      const t = await env.DB.prepare("SELECT title FROM talent_items WHERE id=?").bind(target).first();
      if (!t)
        throw new HttpError(404, "talent item not found");
      stmts.push(env.DB.prepare("UPDATE talent_items SET stage='signed', updated_at=datetime('now') WHERE id=?").bind(target));
      fileTo("general", null);
      filedTo = "Contracts · " + t.title + " · signed";
    } else if (["rider", "bio", "map"].includes(type) && target) {
      const s2 = await env.DB.prepare("SELECT title, brief_av FROM segments WHERE id=?").bind(target).first();
      if (!s2)
        throw new HttpError(404, "session not found");
      fileTo("content", target);
      if (type === "rider" && !s2.brief_av)
        stmts.push(env.DB.prepare("UPDATE segments SET brief_av=? WHERE id=? AND IFNULL(brief_av,'')=''").bind("See " + item.name + " (tech rider).", target));
      filedTo = "Session · " + s2.title;
    } else {
      filedTo = { quote: "Files · quotes", invoice: "Files · invoices", guests: "Files · guest lists (import them in the classic dashboard)", transport: "Files · transport", runsheet: "Files · run sheets", exhibitors: "Files · organizations fair" }[type] || "Files";
    }
  }
  stmts.push(env.DB.prepare("UPDATE files SET access=? WHERE id=?").bind(access, fid));
  stmts.push(env.DB.prepare("UPDATE inbox_items SET access=? WHERE file_id=?").bind(access, fid));
  stmts.push(env.DB.prepare("UPDATE inbox_items SET state='filed', type=?, target=?, filed_to=?, filed_by=?, filed_at=datetime('now') WHERE id=? AND state='review'").bind(type, target, filedTo, by, item.id));
  let res;
  try {
    res = await env.DB.batch(stmts);
  } catch (e) {
    if (/UNIQUE/i.test(String(e && e.message)))
      throw new HttpError(409, "another proof was uploaded at the same moment; try again", { kind: "conflict" });
    throw e;
  }
  if (!res[res.length - 1].meta.changes)
    throw new HttpError(409, "this item was already filed", { kind: "conflict" });
  if (proofAt >= 0) {
    // the whole batch is one transaction, so the version is final; record it on the inbox item
    const v = res[proofAt].results[0].version;
    filedTo += " · v" + v;
    await env.DB.prepare("UPDATE inbox_items SET filed_to=? WHERE id=?").bind(filedTo, item.id).run();
  }
  return json({ ok: true, filed_to: filedTo, access });
}
__name(handleInboxApply, "handleInboxApply");
// ---- Field apps (driver, group leader, AV, crew). Each sees only what its credential's scope allows. ----
var DRIVER_DAYS = { 1: "2026-10-20", 2: "2026-10-21", 3: "2026-10-22" };
// "Registered at the hotel on this date": active guests with check-in <= date <= check-out. These are
// the people a pickup may carry that day; it is not an RSVP or a boarded count.
function stayCounts(stays) {
  const counts = {};
  for (const [day, date] of Object.entries(DRIVER_DAYS)) {
    counts[day] = {};
    for (const g of stays)
      if (g.checkin && g.checkout && g.checkin <= date && g.checkout >= date)
        counts[day][g.hotel] = (counts[day][g.hotel] || 0) + 1;
  }
  return counts;
}
async function q(env, sql, ...binds) {
  return (await env.DB.prepare(sql).bind(...binds).all()).results;
}
async function driverState(env, cred) {
  const runs = (await q(env, "SELECT * FROM transport_runs ORDER BY day, depart_time")).map((r) => ({
    id: r.id, day: r.day, depart_time: r.depart_time, arrive_time: r.arrive_time, title: r.title, title_he: r.title_he,
    destination: r.destination, destination_he: r.destination_he, linked_segment: r.linked_segment, vehicles: r.vehicles,
    capacity: r.capacity, driver: r.driver, driver_phone: r.driver_phone, company: r.company, escort: r.escort,
    driver_note: r.driver_note || "", dropoff: r.dropoff || "", dropoff_url: r.dropoff_url || ""
  }));
  const stops = await q(env, "SELECT run_id, time, stop_label, hotel_match, sort_order FROM run_stops ORDER BY run_id, sort_order");
  const segments = await q(env, "SELECT id, day, time, end_time, title, title_he, venue, venue_he FROM segments ORDER BY day, time");
  const contacts = await q(env, "SELECT name, role, phone FROM team WHERE org='Production' AND phone<>'' AND (role LIKE 'Lead producer%' OR role LIKE '%site manager%' OR role LIKE 'Hotel group leader%') ORDER BY id");
  const counts = stayCounts(await q(env, "SELECT hotel, checkin, checkout FROM guests WHERE status='active' AND hotel<>''"));
  // the runs this driver is assigned to (from the credential); none means "unassigned"
  const assigned = cred ? cred.run_ids : [];
  return { level: "driver", runs, stops, segments, contacts, counts, assigned_runs: assigned, counts_meaning: "registered at the hotel on that date (check-in to check-out)" };
}
var FIELD_PAGES = { leader: "/leader", av: "/av", crew: "/crew" };
var normName = (x) => String(x || "").toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
async function fieldCommon(env) {
  const d = await driverState(env, null);
  const team = await q(env, "SELECT name, role, phone FROM team WHERE org='Production' AND phone<>'' ORDER BY id");
  return { runs: d.runs, stops: d.stops, segments: d.segments, counts: d.counts, team };
}
async function hotelNames(env, ids) {
  if (!ids.length)
    return [];
  const rows = await q(env, `SELECT id, name FROM hotels WHERE id IN (${ids.map(() => "?").join(",")})`, ...ids);
  return rows.map((r) => r.name);
}
async function leaderGuests(env, cred) {
  const hotels = await hotelNames(env, cred.hotel_ids);
  if (!hotels.length)
    return { hotels, guests: [] };
  const guests = await q(env, `SELECT id, party_id, first_name, last_name, ptype, country, phone, dietary, dietary_severe, hotel, room_type, checkin, checkout, early_late, guest_note FROM guests WHERE status='active' AND hotel IN (${hotels.map(() => "?").join(",")}) ORDER BY last_name, first_name`, ...hotels);
  return { hotels, guests };
}
async function leaderState(env, cred) {
  const me = cred.person;
  const c = await fieldCommon(env);
  const { hotels, guests } = await leaderGuests(env, cred);
  const ids = new Set(guests.map((g) => g.id));
  const sessions = (await q(env, "SELECT guest_id, segment_id FROM guest_sessions WHERE attending=1")).filter((x) => ids.has(x.guest_id));
  const runIds = new Set(c.stops.filter((s) => hotels.includes(s.hotel_match)).map((s) => s.run_id));
  const runs = c.runs.filter((r) => runIds.has(r.id));
  const boarded = (await q(env, "SELECT guest_id, day FROM boarding")).filter((x) => ids.has(x.guest_id));
  const shifts = (await q(env, "SELECT id, day, start_min, end_min, title, site, kind, crew_json, note FROM crew_shifts ORDER BY day, start_min, sort_order")).filter((x) => normName(x.crew_json).includes(normName(me.name)));
  return { level: "leader", me: { name: me.name, role: me.role }, hotels, guests, sessions, boarded, runs, stops: c.stops.filter((s) => runIds.has(s.run_id)), segments: c.segments, shifts, contacts: c.team.filter((t) => /Lead producer|site manager|Hotel group leader/i.test(t.role) && t.name !== me.name) };
}
var AV_SUPPLIER = /שוסטר|shuster|schuster/i;
var isAvNeed = (n) => AV_SUPPLIER.test(n.supplier || "") || n.kind === "podium";
async function avState(env) {
  const c = await fieldCommon(env);
  const segments = await q(env, "SELECT id, day, time, end_time, title, title_he, venue, venue_he, brief_runsheet, brief_av, brief_staging, brief_location FROM segments ORDER BY day, time, sort_order");
  const needs = (await q(env, "SELECT id, venue, area, item, qty, supplier, notes, segment_ids, kind, done FROM site_needs ORDER BY sort_order, id")).filter(isAvNeed);
  const screens = await q(env, "SELECT id, title, title_he, size, spec, brief, status, linked_segment FROM design_items WHERE id LIKE 'd-screen%' OR category LIKE '%screen%' OR category LIKE '%מסך%' ORDER BY sort_order, id");
  const files = await q(env, "SELECT id, filename, size, segment_id FROM files WHERE section='content' AND access='ops' AND segment_id IS NOT NULL ORDER BY uploaded_at");
  const shifts = (await q(env, "SELECT id, day, start_min, end_min, title, site, kind, crew_json, note FROM crew_shifts ORDER BY day, start_min, sort_order")).filter((x) => /sound|av\b|tech|טכני|סאונד|הגברה|מסך|screen|stage|במה/i.test(x.title + " " + (x.note || "")));
  const venues = await q(env, "SELECT name, role, phone, venue FROM contacts WHERE phone<>'' AND (role LIKE '%אתר%' OR role LIKE '%טכני%') ORDER BY venue");
  return { level: "av", segments, needs, screens, files, shifts, venues, contacts: c.team.filter((t) => /Lead producer|site manager/i.test(t.role)) };
}
// crew scope: all events (all_scope) or the credential's segment_ids; shifts they are named on
var crewSeg = (cred, segIds) => cred.all_scope || String(segIds || "").split(",").map((x) => x.trim()).some((id) => cred.segment_ids.includes(id));
var onShift = (cred, shift) => cred.all_scope || (() => { try { return JSON.parse(shift.crew_json || "[]").some((m) => normName(m.n) === normName(cred.person.name)); } catch { return false; } })();
async function crewState(env, cred) {
  const me = cred.person;
  const c = await fieldCommon(env);
  const segments = await q(env, "SELECT id, day, time, end_time, title, title_he, venue, venue_he, brief_runsheet, brief_location, brief_staging, brief_materials, notes_logistics FROM segments ORDER BY day, time, sort_order");
  const needs = (await q(env, "SELECT id, venue, area, item, qty, supplier, notes, segment_ids, kind, done FROM site_needs ORDER BY sort_order, id")).map((n) => ({ ...n, can_tick: crewSeg(cred, n.segment_ids) }));
  const shifts = (await q(env, "SELECT id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done FROM crew_shifts ORDER BY day, start_min, sort_order")).map((x) => ({ ...x, can_tick: onShift(cred, x) }));
  const food = await q(env, "SELECT id, segment_id, day, time, title, venue, meal_type, caterer, headcount, dietary_note FROM food_items ORDER BY day, time");
  const att = await q(env, "SELECT gs.segment_id, count(*) n FROM guest_sessions gs JOIN guests g ON g.id = gs.guest_id AND g.status='active' WHERE gs.attending=1 GROUP BY gs.segment_id");
  const venues = await q(env, "SELECT name, role, phone, venue FROM contacts WHERE phone<>'' ORDER BY venue, name");
  const files = (await q(env, "SELECT id, filename, size, segment_id FROM files WHERE section='content' AND access='ops' AND segment_id IS NOT NULL ORDER BY uploaded_at")).filter((f) => crewSeg(cred, f.segment_id));
  return { level: "crew", me: { name: me.name, role: me.role }, scope: { all: cred.all_scope, segment_ids: cred.segment_ids }, segments, needs, shifts, food, attendance: att, files, runs: c.runs, stops: c.stops, counts: c.counts, venues, contacts: c.team.filter((t) => t.name !== me.name) };
}
// The public projection: exactly what a view key sees, used by view /api/state and by view Ask.
async function publicProjection(env) {
  const segments = await q(env, "SELECT id, day, time, end_time, title, venue, descr, title_he, venue_he, descr_he FROM segments ORDER BY day, time, sort_order");
  const runs = await q(env, "SELECT id, day, depart_time, arrive_time, title, title_he, destination, destination_he, linked_segment FROM transport_runs WHERE pdf_hide=0 ORDER BY day, sort_order");
  const visible = new Set(runs.map((r) => r.id));
  const stops = (await q(env, "SELECT id, run_id, time, stop_label, hotel_match, sort_order FROM run_stops ORDER BY run_id, sort_order")).filter((x) => visible.has(x.run_id));
  return { segments, transport_runs: runs, run_stops: stops };
}
// Files: who may read a file, by its explicit access class (never by section, name or AI type).
function fileReadable(auth, row) {
  if (!row)
    return false;
  const a = row.access || "admin";
  if (auth.level === "chief")
    return true;
  if (auth.level === "admin")
    return a === "ops" || a === "admin";
  if (auth.level === "edit")
    return a === "ops";
  if (auth.level === "av")
    return a === "ops" && row.section === "content" && !!row.segment_id;
  if (auth.level === "crew")
    return a === "ops" && row.section === "content" && !!row.segment_id && crewSeg(auth.cred, row.segment_id);
  return false;
}
function readableAccess(auth) {
  return auth.level === "chief" ? ["ops", "admin", "chief"] : auth.level === "admin" ? ["ops", "admin"] : auth.level === "edit" ? ["ops"] : [];
}
function downloadResponse(obj, row, inline) {
  const ctype = (row.content_type || "").toLowerCase();
  const safeInline = inline && INLINE_TYPES.includes(ctype);
  const headers = new Headers();
  headers.set("content-type", safeInline ? ctype : "application/octet-stream");
  headers.set("content-disposition", `${safeInline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(row.filename)}`);
  headers.set("x-content-type-options", "nosniff");
  headers.set("content-security-policy", "default-src 'none'; sandbox");
  headers.set("cache-control", "private, no-store");
  return new Response(obj.body, { headers });
}
async function handleField(request, env, url, path, auth) {
  const level = auth.level, cred = auth.cred;
  if (path.startsWith("/api/access/")) {
    const res = await handleAccess(path, request, env, level);
    if (res)
      return res;
  }
  if (path === "/api/state" && request.method === "GET")
    return json({ level, redirect: level === "driver" ? "/driver" : FIELD_PAGES[level] });
  if (level === "driver") {
    if (path === "/api/driver/state" && request.method === "GET")
      return json(await driverState(env, cred));
    if (path === "/api/driver/position" && request.method === "POST")
      return await driverPosition(request, env, cred);
    throw new HttpError(403, "drivers only see the driver page");
  }
  if (path === `/api/${level}/state` && request.method === "GET")
    return json(level === "leader" ? await leaderState(env, cred) : level === "crew" ? await crewState(env, cred) : await avState(env));
  // group leader: mark one of her own hotel's guests, staying that day, as on board for the day
  if (level === "leader" && path === "/api/leader/board" && request.method === "POST") {
    const b = await readBody(request);
    const day = dayNum(b.day), gid = Number(b.guest_id), date = DRIVER_DAYS[day];
    const { guests } = await leaderGuests(env, cred);
    const g = guests.find((x) => x.id === gid);
    if (!g)
      throw new HttpError(403, "not your guest");
    if (!(g.checkin && g.checkout && g.checkin <= date && g.checkout >= date))
      throw new HttpError(400, "this guest is not at the hotel on that day");
    if (b.on)
      await env.DB.prepare("INSERT OR REPLACE INTO boarding (guest_id, day, by, at) VALUES (?,?,?,datetime('now'))").bind(gid, day, cred.person.name).run();
    else
      await env.DB.prepare("DELETE FROM boarding WHERE guest_id=? AND day=?").bind(gid, day).run();
    return json({ ok: true });
  }
  // AV ticks off Shuster/podium needs; crew ticks needs of events in their scope and shifts they are on
  if ((level === "av" || level === "crew") && path === "/api/field/done" && request.method === "POST") {
    const b = await readBody(request);
    const on = b.done ? 1 : 0;
    if (b.kind === "need") {
      const n = await env.DB.prepare("SELECT supplier, kind, segment_ids FROM site_needs WHERE id=?").bind(String(b.id || "")).first();
      if (!n)
        throw new HttpError(404, "not found");
      if (level === "av" ? !isAvNeed(n) : !crewSeg(cred, n.segment_ids))
        throw new HttpError(403, "not in your scope");
      await env.DB.prepare("UPDATE site_needs SET done=?, updated_at=datetime('now') WHERE id=?").bind(on, String(b.id)).run();
      return json({ ok: true });
    }
    if (b.kind === "shift" && level === "crew") {
      const sh = await env.DB.prepare("SELECT id, crew_json FROM crew_shifts WHERE id=?").bind(String(b.id || "")).first();
      if (!sh)
        throw new HttpError(404, "not found");
      if (!onShift(cred, sh))
        throw new HttpError(403, "not your shift");
      await env.DB.prepare("UPDATE crew_shifts SET done=?, updated_at=datetime('now') WHERE id=?").bind(on, sh.id).run();
      return json({ ok: true });
    }
    throw new HttpError(400, "bad kind");
  }
  // presentations and run-sheet files linked to an event, only when the file's own policy allows it
  if ((level === "av" || level === "crew") && path === "/api/files/download" && request.method === "GET") {
    const row = await env.DB.prepare("SELECT r2_key, filename, content_type, section, segment_id, access FROM files WHERE id=?").bind(url.searchParams.get("id")).first();
    if (!fileReadable(auth, row) || !env.BUCKET)
      throw new HttpError(404, "not found");
    const obj = await env.BUCKET.get(row.r2_key);
    if (!obj)
      throw new HttpError(404, "not found");
    return downloadResponse(obj, row, false);
  }
  throw new HttpError(403, "this key only opens its own page");
}
// Driver location. fix_at is when the phone measured the position; the server's own receipt time is `at`.
// Re-sending an old fix keeps its old fix_at, and anything older than what is stored is ignored.
async function driverPosition(request, env, cred) {
  const b = await readBody(request);
  const raw = (b.device || "").toString().replace(/[^\w-]/g, "").slice(0, 40);
  if (!raw)
    throw new HttpError(400, "device required");
  const device = cred ? `c${cred.id}-${raw}` : `s-${raw}`;
  if (b.stop) {
    await env.DB.prepare("UPDATE driver_positions SET sharing=0, at=datetime('now') WHERE device=?").bind(device).run();
    return json({ ok: true });
  }
  const lat = Number(b.lat), lng = Number(b.lng), num = (v) => v !== null && v !== "" && v !== undefined && Number.isFinite(Number(v)) ? Number(v) : null;
  if (!(lat >= -90 && lat <= 90) || !(lng >= -180 && lng <= 180) || lat === 0 && lng === 0)
    throw new HttpError(400, "position out of range");
  const fixMs = Number(b.fix_at);
  if (!Number.isFinite(fixMs) || fixMs > Date.now() + 120000 || fixMs < Date.now() - 6 * 3600e3)
    throw new HttpError(400, "fix time missing or out of range");
  const fixAt = new Date(fixMs).toISOString();
  const runId = cred && cred.run_ids.length === 1 ? cred.run_ids[0] : "";
  const name = cred ? cred.label || (cred.person && cred.person.name) || "" : (b.name || "").toString().trim().slice(0, 80);
  const r = await env.DB.prepare(
    `INSERT INTO driver_positions (device, name, run_id, lat, lng, accuracy, speed, heading, sharing, at, fix_at, cred_id) VALUES (?,?,?,?,?,?,?,?,1,datetime('now'),?,?)
     ON CONFLICT(device) DO UPDATE SET name=excluded.name, run_id=excluded.run_id, lat=excluded.lat, lng=excluded.lng, accuracy=excluded.accuracy, speed=excluded.speed, heading=excluded.heading, sharing=1, at=excluded.at, fix_at=excluded.fix_at, cred_id=excluded.cred_id
     WHERE excluded.fix_at >= driver_positions.fix_at`
  ).bind(device, name, runId, lat, lng, num(b.accuracy), num(b.speed), num(b.heading), fixAt, cred ? cred.id : null).run();
  await env.DB.prepare("DELETE FROM driver_positions WHERE at < datetime('now','-2 days')").run();
  return json({ ok: true, accepted: !!r.meta.changes });
}
// ---- dashboard write helpers: validation rules, conflict-checked updates, atomic batches ----
var has = (o, k) => o != null && Object.prototype.hasOwnProperty.call(o, k);
var T = (max, { required = false, what = "value" } = {}) => (v) => {
  const s = str(v, max);
  if (required && !s.trim())
    throw new HttpError(400, `${what} required`);
  return s;
};
var B01 = (v) => v === true || v === 1 || v === "1" || v === "true" ? 1 : 0;
var ENUM = (kind) => (v) => oneOf(kind, String(v ?? ""));
var TIME = (v) => timeHM(v);
var DATE = (v) => dateISO(v);
var INTN = (lo, hi) => (v) => {
  const s = String(v ?? "").trim();
  if (s === "")
    return null;
  const n = parseInt(s.replace(/[^\d-]/g, ""), 10);
  if (!Number.isFinite(n) || n < lo || n > hi)
    throw new HttpError(400, "number out of range");
  return n;
};
var JSON_ARRAY = (max) => (v) => {
  const s = String(v ?? "[]");
  if (utf8Bytes(s) > max)
    throw new HttpError(413, "value too large");
  let a;
  try {
    a = JSON.parse(s || "[]");
  } catch {
    throw new HttpError(400, "invalid list");
  }
  if (!Array.isArray(a))
    throw new HttpError(400, "invalid list");
  return JSON.stringify(a);
};
var CREW_JSON = (v) => {
  let arr;
  try {
    arr = typeof v === "string" ? JSON.parse(v) : v;
  } catch {
    arr = null;
  }
  if (!Array.isArray(arr))
    throw new HttpError(400, "crew must be a list");
  return JSON.stringify(arr.slice(0, 30).map((c) => ({ n: String(c && c.n || "?").slice(0, 60), r: String(c && c.r || "").slice(0, 60) })));
};
var CREW_DAY = (v) => {
  const s = String(v ?? "").trim();
  if (!["19", "20", "21", "22"].includes(s))
    throw new HttpError(400, "day must be 19-22");
  return s;
};
var ORG = (v) => {
  if (!["Production", "Jerusalem Foundation", "Jerusalem Foundation board"].includes(v))
    throw new HttpError(400, "bad org");
  return v;
};
var ADMIN = (fn) => ({ fn, admin: true });
var expectText = (v) => v === null || v === undefined ? "" : typeof v === "boolean" ? v ? "1" : "0" : String(v);
// Update only the given columns of one row. With `expect` ({col: value the client last saw}) the update only
// happens if those columns still hold those values; otherwise 409 with the current values. 404 if no row.
async function setFields(env, table, id, values, expect, stamp) {
  const cols = Object.keys(values);
  if (!cols.length)
    throw new HttpError(400, "nothing to change");
  const sets = cols.map((c) => `${c}=?`).concat(stamp ? ["updated_at=datetime('now')"] : []);
  const where = ["id=?"], binds = [...cols.map((c) => values[c]), id];
  const exp = expect && typeof expect === "object" ? Object.keys(expect).filter((c) => cols.includes(c)) : [];
  for (const c of exp) {
    where.push(`IFNULL(CAST(${c} AS TEXT),'')=?`);
    binds.push(expectText(expect[c]));
  }
  const r = await env.DB.prepare(`UPDATE ${table} SET ${sets.join(", ")} WHERE ${where.join(" AND ")}`).bind(...binds).run();
  if (r.meta.changes)
    return;
  const cur = await env.DB.prepare(`SELECT ${cols.join(", ")} FROM ${table} WHERE id=?`).bind(id).first();
  if (!cur)
    throw new HttpError(404, "not found");
  // somebody else already saved exactly these values: nothing to do
  if (cols.every((c) => expectText(cur[c]) === expectText(values[c])))
    return;
  throw new HttpError(409, "changed by someone else", { kind: "conflict", current: cur });
}
// expect may be sent as a bare value (for single-field endpoints) or as {field: value}
function expectFor(b, field) {
  if (!has(b, "expect"))
    return void 0;
  return b.expect && typeof b.expect === "object" ? b.expect : { [field]: b.expect };
}
// /api/<thing>/field endpoints: one column at a time, validated per column, optionally conflict-checked
var FIELD_ENDPOINTS = {
  "/api/segment/field": { table: "segments", stamp: false, fields: { title: T(300, { required: true, what: "title" }), venue: T(300), descr: T(5e3), title_he: T(300), venue_he: T(300), descr_he: T(5e3), descr_long: T(2e4), descr_long_he: T(2e4) } },
  "/api/segment/brief": { table: "segments", stamp: false, fields: { brief_runsheet: T(2e4), brief_location: T(5e3), brief_av: T(5e3), brief_staging: T(5e3), brief_materials: T(5e3), brief_catering: T(5e3), brief_speakers: T(5e3), content_status: ENUM("content_status"), notes_speaker: T(5e3), notes_logistics: T(5e3) } },
  "/api/run/field": { table: "transport_runs", stamp: true, fields: { depart_time: TIME, arrive_time: TIME, title: T(200, { required: true, what: "title" }), title_he: T(200), destination: T(200), destination_he: T(200), linked_segment: T(80), vehicles: T(200), capacity: T(100), driver: T(200), driver_phone: T(60), company: T(200), escort: T(300), notes: T(4e3), status: ENUM("run_status"), pdf_hide: B01, driver_note: T(4e3), dropoff: T(300), dropoff_url: (v) => safeHttpUrl(v) } },
  "/api/stop/field": { table: "run_stops", stamp: false, fields: { time: TIME, stop_label: T(200), hotel_match: T(200) } },
  "/api/gift/field": { table: "gift_items", stamp: true, fields: { category: T(60), category_he: T(60), title: T(200, { required: true, what: "title" }), title_he: T(200), qty: T(40), supplier: T(200), cost: T(100), status: (v) => ident(v, "status"), notes: T(3e3), notes_he: T(3e3), deadline: DATE } },
  "/api/design/field": { table: "design_items", stamp: true, fields: { title: T(200, { required: true, what: "title" }), title_he: T(200), category: (v) => ident(v, "category"), qty: T(40), size: T(60), spec: T(500), status: ENUM("design_status"), brief: T(6e3), notes: T(6e3), design_cost: T(100), print_cost: T(100), supplier: T(200), deadline: DATE, linked_segment: T(80) } },
  "/api/guest/field": { table: "guests", stamp: true, fields: { first_name: T(120, { required: true, what: "first name" }), last_name: T(120), desk: T(40), ptype: T(40), email: ADMIN(T(200)), phone: ADMIN(T(60)), city: ADMIN(T(120)), country: ADMIN(T(80)), passport_no: ADMIN(T(60)), passport_country: ADMIN(T(80)), dietary: T(400), hotel: T(120), room_type: T(120), checkin: DATE, checkout: DATE, accommodation: T(200), accommodation_note: T(400), booking_conf: T(100), early_late: T(400), guest_note: T(4e3), review_note: T(1e3), status: ENUM("guest_status") } },
  "/api/guest/flag": { table: "guests", stamp: true, fields: { note_handled: B01, needs_review: B01, dietary_severe: B01, is_israeli: ADMIN(B01) } },
  "/api/food/field": { table: "food_items", stamp: false, fields: { title: T(300, { required: true, what: "title" }), venue: T(300), title_he: T(300), venue_he: T(300), time: TIME, end_time: TIME, meal_type: ENUM("meal_type"), status: ENUM("food_status"), notes: T(8e3), menu_json: JSON_ARRAY(2e4), menu_json_he: JSON_ARRAY(2e4), beverages: T(4e3), beverages_he: T(4e3), caterer: T(200), headcount: T(100), dietary_note: T(4e3), dietary_note_he: T(4e3) } },
  "/api/crew/field": { table: "crew_shifts", stamp: true, fields: { done: B01, crew_json: ADMIN(CREW_JSON), flag: ADMIN(T(1e3)), note: ADMIN(T(1e3)), title: ADMIN(T(300, { required: true, what: "title" })), site: ADMIN(T(300)), kind: ADMIN(ENUM("crew_kind")), day: ADMIN(CREW_DAY), start_min: ADMIN(INTN(0, 2880)), end_min: ADMIN(INTN(0, 2880)) } },
  "/api/furniture/field": { table: "furniture_items", stamp: true, fields: { qty: INTN(0, 1e5), qty_note: T(1e3), notes: T(1e3), item: ADMIN(T(200, { required: true, what: "item" })), size: ADMIN(T(100)), setup: ADMIN(T(200)), segment_ids: ADMIN(T(500)), stays_until: ADMIN(T(200)) } },
  "/api/siteneed/field": { table: "site_needs", stamp: true, fields: { done: B01, qty: T(100), supplier: T(200), notes: T(1e3) } },
  "/api/fair/field": { table: "fair_orgs", stamp: true, fields: { contacted: B01, confirmed: B01, form_done: B01, power: B01, contact: T(200), phone: T(60), email: T(200), note: T(1e3), name: ADMIN(T(200, { required: true, what: "name" })), domain: ADMIN(T(100)) } },
  "/api/quote/field": { table: "catering_quotes", stamp: true, admin: true, fields: { chosen: B01, note: T(1e3) } },
  "/api/dayguest/field": { table: "day_guests", stamp: true, fields: { first_name: T(120, { required: true, what: "name" }), last_name: T(120), desk: T(40), sessions: T(1e3), note: T(1e3), email: ADMIN(T(200)), phone: ADMIN(T(60)) } },
  "/api/talent/field": { table: "talent_items", stamp: true, admin: true, fields: { stage: ENUM("talent_stage"), fee: INTN(0, 1e8), title: T(300, { required: true, what: "title" }), notes: T(1e3) } },
  // team names and roles identify people in the field apps, so only admins change them
  "/api/team/field": { table: "team", stamp: false, fields: { name: ADMIN(T(120, { required: true, what: "name" })), role: ADMIN(T(120)), org: ADMIN(ORG), phone: T(40) } }
};
// single-purpose endpoints that are really one-field updates
var FIELD_ALIASES = {
  "/api/segment/status": { table: "segments", stamp: false, field: "status", from: "status", fn: ENUM("segment_status") },
  "/api/segment/notes": { table: "segments", stamp: false, field: "notes", from: "notes", fn: T(2e4) },
  "/api/segment/desc": { table: "segments", stamp: false, field: "descr", from: "descr", fn: T(5e3) },
  "/api/gift/chosen": { table: "gift_items", stamp: true, field: "chosen", from: "chosen", fn: B01 },
  "/api/check/assign": { table: "checklist", stamp: false, field: "owner", from: "owner", fn: T(120) },
  "/api/timeline/assign": { table: "timeline", stamp: false, field: "owner", from: "owner", fn: T(120) }
};
var newId = (prefix) => prefix + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
var needId = (b) => {
  if (b.id === undefined || b.id === null || b.id === "")
    throw new HttpError(400, "missing id");
  return b.id;
};
var needAdmin = (admin) => {
  if (!admin)
    throw new HttpError(403, "admin required");
};
// run statements as one D1 transaction (all succeed or none do); the last statement's row count is checked
async function atomic(env, stmts, { mustChangeLast = false } = {}) {
  const res = await env.DB.batch(stmts);
  if (mustChangeLast && !res[res.length - 1].meta.changes)
    throw new HttpError(404, "not found");
  return res;
}
async function deleteRow(env, table, id) {
  const r = await env.DB.prepare(`DELETE FROM ${table} WHERE id=?`).bind(id).run();
  if (!r.meta.changes)
    throw new HttpError(404, "not found");
  return json({ ok: true });
}
// ---- budget sheet (chief only): whole-sheet saves carry a revision; cell edits merge ----
function gridTabs(row) {
  if (!row)
    return [{ name: "Sheet 1", columns: ["Item", "Owner", "Status", "Notes"], rows: [] }];
  if (row.columns === "__TABS__") {
    let tabs;
    try {
      tabs = JSON.parse(row.rows);
    } catch {
      tabs = [];
    }
    return Array.isArray(tabs) && tabs.length ? tabs : [{ name: "Sheet 1", columns: ["Item", "Owner", "Status", "Notes"], rows: [] }];
  }
  let columns = [], rows = [];
  try {
    columns = JSON.parse(row.columns);
    rows = JSON.parse(row.rows);
  } catch {
  }
  return [{ name: "Budget", columns, rows }];
}
function validTabs(tabs) {
  if (!Array.isArray(tabs) || !tabs.length || tabs.length > 30)
    throw new HttpError(400, "invalid sheet");
  return tabs.map((t) => {
    if (!t || !Array.isArray(t.columns) || !Array.isArray(t.rows))
      throw new HttpError(400, "invalid sheet");
    return { ...t, name: str(t.name || "Sheet", 60), columns: t.columns.slice(0, 60).map((c) => str(c, 200)), rows: t.rows.slice(0, 3e3).map((r) => (Array.isArray(r) ? r : []).slice(0, 60).map((c) => c == null ? "" : typeof c === "number" ? c : str(c, 2e3))) };
  });
}
var GRID_MAX_BYTES = 19e5; // D1 rows are limited to 2 MB
async function writeGrid(env, tabs, rev, by) {
  const body = JSON.stringify(tabs);
  if (utf8Bytes(body) > GRID_MAX_BYTES)
    throw new HttpError(413, "the budget sheet is too large to save");
  const r = await env.DB.prepare("UPDATE admin_grid SET columns='__TABS__', rows=?, rev=rev+1, updated_at=datetime('now'), updated_by=? WHERE id=1 AND rev=? RETURNING rev").bind(body, str(by, 60), rev).first();
  return r ? r.rev : null;
}
// ---- dashboard state. A section whose query fails is listed in `unavailable` (never silently empty). ----
async function dashboardState(env, auth, level, chief) {
  const admin = level === "admin";
  const unavailable = [];
  const sec = async (name, sql, ...binds) => {
    try {
      return (await env.DB.prepare(sql).bind(...binds).all()).results;
    } catch (e) {
      console.error("state section failed", name, e && e.message);
      unavailable.push(name);
      return [];
    }
  };
  const acc = readableAccess(auth);
  const accIn = `(${acc.map(() => "?").join(",")})`;
  const out = {
    level,
    chief,
    segments: await sec("segments", "SELECT * FROM segments ORDER BY day, time, sort_order"),
    people: await sec("people", "SELECT * FROM people ORDER BY id"),
    checklist: await sec("checklist", "SELECT * FROM checklist ORDER BY segment_id, sort_order, id"),
    venues: await sec("venues", "SELECT * FROM venue_contacts"),
    contacts: await sec("contacts", "SELECT * FROM contacts ORDER BY name"),
    team: await sec("team", "SELECT * FROM team ORDER BY name"),
    timeline: await sec("timeline", "SELECT * FROM timeline ORDER BY due_date, sort_hint, id"),
    // the newest menu file per food item, only among files this key may open
    food_items: await sec("food_items", `SELECT f.*, mf.id AS file_id, mf.filename AS file_name, mf.content_type AS file_type
      FROM food_items f
      LEFT JOIN (SELECT segment_id, id, filename, content_type, ROW_NUMBER() OVER (PARTITION BY segment_id ORDER BY uploaded_at DESC, id DESC) AS rn
                 FROM files WHERE section='menu' AND access IN ${accIn}) mf ON mf.segment_id = f.id AND mf.rn = 1
      ORDER BY f.day, f.sort_order`, ...acc),
    dietary: await sec("dietary", "SELECT * FROM dietary ORDER BY id"),
    guests: await sec("guests", `SELECT ${admin ? "*" : GUEST_OPS_COLUMNS.join(", ")} FROM guests ORDER BY last_name, first_name`),
    guest_sessions: await sec("guest_sessions", "SELECT * FROM guest_sessions WHERE attending=1"),
    design_items: await sec("design_items", "SELECT * FROM design_items ORDER BY sort_order"),
    design_proofs: await sec("design_proofs", `SELECT p.*, CASE WHEN f.access IN ${accIn} THEN f.filename END AS file_name, CASE WHEN f.access IN ${accIn} THEN f.content_type END AS file_type
      FROM design_proofs p LEFT JOIN files f ON f.id = p.file_id ORDER BY p.item_id, p.version DESC`, ...acc, ...acc),
    transport_runs: await sec("transport_runs", "SELECT * FROM transport_runs ORDER BY day, sort_order"),
    run_stops: await sec("run_stops", "SELECT * FROM run_stops ORDER BY run_id, sort_order"),
    gift_items: await sec("gift_items", "SELECT * FROM gift_items ORDER BY sort_order"),
    crew_shifts: await sec("crew_shifts", "SELECT * FROM crew_shifts ORDER BY day, start_min, sort_order"),
    talent_items: admin ? await sec("talent_items", "SELECT * FROM talent_items ORDER BY sort_order") : [],
    fair_orgs: await sec("fair_orgs", "SELECT * FROM fair_orgs ORDER BY sort_order, name"),
    day_guests: await sec("day_guests", `SELECT ${admin ? "*" : "id, first_name, last_name, desk, sessions, note, updated_at"} FROM day_guests ORDER BY last_name, first_name`),
    catering_quotes: admin ? await sec("catering_quotes", "SELECT * FROM catering_quotes ORDER BY sort_order, id") : [],
    furniture_items: await sec("furniture_items", "SELECT * FROM furniture_items ORDER BY sort_order, id"),
    site_needs: await sec("site_needs", "SELECT * FROM site_needs ORDER BY sort_order, id"),
    inbox_items: await sec("inbox_items", `SELECT * FROM inbox_items WHERE state IN ('review','filed') AND access IN ${accIn} ORDER BY id DESC LIMIT 100`, ...acc),
    hotels: await sec("hotels", "SELECT id, name FROM hotels ORDER BY sort_order")
  };
  out.unavailable = unavailable;
  out.server_time = new Date().toISOString();
  return out;
}
// Access class for a new upload: editors can only create 'ops' files; admins default general files to
// 'admin' and the rest to 'ops'; only the chief can create 'chief' files.
function uploadAccess(auth, section, requested) {
  const want = requested ? oneOf("file_access", String(requested)) : null;
  if (auth.level === "edit") {
    if (want && want !== "ops")
      throw new HttpError(403, "editors can only upload files open to the whole team");
    return "ops";
  }
  if (want === "chief" && auth.level !== "chief")
    throw new HttpError(403, "only the chief key can upload chief-only files");
  return want || (section === "general" ? "admin" : "ops");
}
// New proof version: version number and status change in one transaction; the unique (item, version)
// index turns a simultaneous upload into a retry instead of a duplicate.
function proofStatements(env, itemId, fileId, by) {
  return [
    env.DB.prepare("INSERT INTO design_proofs (item_id, file_id, version, decision, uploaded_by) SELECT ?, ?, COALESCE(MAX(version),0)+1, 'pending', ? FROM design_proofs WHERE item_id=? RETURNING id, version").bind(itemId, fileId, by, itemId),
    env.DB.prepare("UPDATE files SET section='proof', segment_id=? WHERE id=?").bind(itemId, fileId),
    env.DB.prepare("UPDATE design_items SET status='awaiting_approval', updated_at=datetime('now') WHERE id=?").bind(itemId)
  ];
}
async function addProof(env, itemId, fileId, by) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await env.DB.batch(proofStatements(env, itemId, fileId, by));
      return res[0].results[0];
    } catch (e) {
      if (!/UNIQUE/i.test(String(e && e.message)))
        throw e;
    }
  }
  throw new HttpError(409, "another proof was uploaded at the same moment; try again", { kind: "conflict" });
}
// ---- guest import ----
// Names are compared after Unicode normalization (accents and non-Latin letters are kept, case and
// punctuation ignored). A registration id, when present on both sides, wins over the name.
var IMPORT_FIELDS = ["desk", "ptype", "email", "phone", "city", "country", "passport_no", "passport_country", "dietary", "hotel", "room_type", "checkin", "checkout", "accommodation", "accommodation_note"];
var IMPORT_MAX = { desk: 40, ptype: 40, email: 200, phone: 60, city: 120, country: 80, passport_no: 60, passport_country: 80, dietary: 400, hotel: 120, room_type: 120, checkin: 10, checkout: 10, accommodation: 200, accommodation_note: 400, guest_note: 4e3, party_id: 20, first_name: 120, last_name: 120, reg_id: 60 };
var normNameKey = (f, l) => (String(f || "") + " " + String(l || "")).normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
// Accepts YYYY-MM-DD, day-first D/M/YYYY or D.M.YYYY, and spreadsheet serial numbers. Anything else is an error.
function importDate(v) {
  const s = String(v ?? "").trim();
  if (!s)
    return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(s))
    return dateISO(s);
  let m = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(s);
  if (m)
    return dateISO(`${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`);
  if (/^\d{5}(\.\d+)?$/.test(s)) {
    const d = new Date(Date.UTC(1899, 11, 30) + Math.floor(+s) * 864e5);
    return d.toISOString().slice(0, 10);
  }
  throw new HttpError(400, "unreadable date");
}
function cleanImportRow(r) {
  const out = {}, problems = [];
  for (const [k, max] of Object.entries(IMPORT_MAX))
    out[k] = str(r && r[k], max).trim();
  for (const k of ["checkin", "checkout"]) {
    try {
      out[k] = importDate(r && r[k]);
    } catch {
      problems.push(`${k}: "${str(r && r[k], 30)}" is not a date`);
      out[k] = "";
    }
  }
  if (out.checkin && out.checkout && out.checkout < out.checkin)
    problems.push("check-out is before check-in");
  return { row: out, problems };
}
async function importPreview(env, b) {
  const rows = Array.isArray(b.rows) ? b.rows.slice(0, 3e3) : [];
  if (!rows.length)
    throw new HttpError(400, "no rows parsed from the file");
  const fullRoster = !!b.full_roster;
  const existing = (await env.DB.prepare("SELECT * FROM guests").all()).results;
  const byReg = new Map(), byName = new Map();
  for (const g of existing) {
    if (g.reg_id)
      byReg.set(g.reg_id, g);
    const k = normNameKey(g.first_name, g.last_name);
    byName.set(k, [...byName.get(k) || [], g]);
  }
  const changes = [], seenIds = new Set(), seenKeys = new Map();
  for (const raw of rows) {
    const { row: r, problems } = cleanImportRow(raw);
    const key = normNameKey(r.first_name, r.last_name);
    if (!key)
      continue;
    const name = `${r.first_name} ${r.last_name}`.trim();
    const dupKey = r.reg_id ? "reg:" + r.reg_id : "name:" + key;
    if (seenKeys.has(dupKey)) {
      changes.push({ kind: "duplicate", name, note: "appears more than once in the sheet; only the first row is used" });
      continue;
    }
    seenKeys.set(dupKey, true);
    let cur = r.reg_id ? byReg.get(r.reg_id) : null;
    if (!cur) {
      const hits = byName.get(key) || [];
      if (hits.length > 1) {
        changes.push({ kind: "ambiguous", name, ids: hits.map((g) => g.id), note: "matches more than one guest; edit by hand" });
        hits.forEach((g) => seenIds.add(g.id));
        continue;
      }
      cur = hits[0] || null;
    }
    if (!cur) {
      changes.push({ kind: "new", name, row: r, problems });
      continue;
    }
    seenIds.add(cur.id);
    const diffs = [];
    for (const f of IMPORT_FIELDS) {
      const nv = r[f], ov = String(cur[f] ?? "").trim();
      if (nv && nv !== ov)
        diffs.push({ field: f, from: ov, to: nv });
    }
    if (r.reg_id && !cur.reg_id)
      diffs.push({ field: "reg_id", from: "", to: r.reg_id });
    if (diffs.length || problems.length)
      changes.push({ kind: "edit", id: cur.id, name: `${cur.first_name} ${cur.last_name}`.trim(), diffs, problems });
  }
  // cancellations only when the sheet is declared to be the complete roster, and never pre-selected
  if (fullRoster)
    for (const g of existing)
      if (g.status === "active" && !seenIds.has(g.id))
        changes.push({ kind: "gone", id: g.id, name: `${g.first_name} ${g.last_name}`.trim(), checked: false });
  return { ok: true, changes, counted: rows.length, full_roster: fullRoster };
}
// Applies the reviewed changes in one transaction, after re-checking every change against the current data.
// Running the same apply twice changes nothing the second time (and the Idempotency-Key replays the answer).
async function importApply(env, b) {
  const changes = Array.isArray(b.changes) ? b.changes.slice(0, 3e3) : [];
  if (!changes.length)
    throw new HttpError(400, "nothing selected");
  const existing = (await env.DB.prepare("SELECT * FROM guests").all()).results;
  const byId = new Map(existing.map((g) => [g.id, g]));
  const names = new Set(existing.map((g) => normNameKey(g.first_name, g.last_name)));
  const regs = new Set(existing.filter((g) => g.reg_id).map((g) => g.reg_id));
  const stmts = [], conflicts = [];
  let skipped = 0;
  for (const c of changes) {
    if (c.kind === "new" && c.row) {
      const { row: r } = cleanImportRow(c.row);
      if (!r.first_name) continue;
      const key = normNameKey(r.first_name, r.last_name);
      if (names.has(key) || r.reg_id && regs.has(r.reg_id)) {
        skipped++;
        continue;
      }
      names.add(key);
      if (r.reg_id) regs.add(r.reg_id);
      stmts.push(env.DB.prepare(
        "INSERT INTO guests (party_id, first_name, last_name, desk, ptype, email, phone, city, country, passport_no, passport_country, dietary, hotel, room_type, checkin, checkout, accommodation, accommodation_note, guest_note, reg_id, is_lead, needs_review, review_note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,1,'Added by spreadsheet import — please review, including which sessions they attend')"
      ).bind(r.party_id, r.first_name, r.last_name, r.desk, r.ptype, r.email, r.phone, r.city, r.country, r.passport_no, r.passport_country, r.dietary, r.hotel, r.room_type, r.checkin, r.checkout, r.accommodation, r.accommodation_note, r.guest_note, r.reg_id));
    } else if (c.kind === "edit" && Array.isArray(c.diffs)) {
      const g = byId.get(Number(c.id));
      if (!g) {
        conflicts.push({ name: c.name, note: "guest no longer exists" });
        continue;
      }
      for (const d of c.diffs) {
        if (!IMPORT_FIELDS.includes(d.field) && d.field !== "reg_id")
          continue;
        const now = String(g[d.field] ?? "").trim();
        let to = str(d.to, IMPORT_MAX[d.field] || 400).trim();
        if (d.field === "checkin" || d.field === "checkout")
          to = importDate(to);
        if (now === to)
          continue;
        if (now !== String(d.from ?? "").trim()) {
          conflicts.push({ name: c.name, field: d.field, note: `changed since the preview (now "${now}")` });
          continue;
        }
        stmts.push(env.DB.prepare(`UPDATE guests SET ${d.field}=?, updated_at=datetime('now') WHERE id=? AND IFNULL(${d.field},'')=?`).bind(to, g.id, g[d.field] ?? ""));
      }
    } else if (c.kind === "gone") {
      const g = byId.get(Number(c.id));
      if (!g || g.status !== "active") {
        skipped++;
        continue;
      }
      stmts.push(env.DB.prepare("UPDATE guests SET status='cancelled', updated_at=datetime('now') WHERE id=? AND status='active'").bind(g.id));
    }
  }
  if (conflicts.length)
    throw new HttpError(409, "the guest list changed since the preview; run the comparison again", { kind: "conflict", conflicts });
  if (stmts.length)
    await env.DB.batch(stmts);
  return { ok: true, applied: stmts.length, skipped };
}
// ---- AI helpers: quotas, minimal context, timeouts ----
var AI_TIMEOUT_MS = 6e4;
function anthropicClient(env) {
  return new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, timeout: AI_TIMEOUT_MS, maxRetries: 1 });
}
async function anthropicFetch(env, body) {
  let r;
  try {
    r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(AI_TIMEOUT_MS)
    });
  } catch (e) {
    throw new HttpError(504, "The assistant took too long. Try again.", { kind: "timeout" });
  }
  const j = await r.json().catch(() => ({}));
  if (r.status === 429)
    throw new HttpError(429, "The assistant is busy. Try again in a minute.");
  if (!r.ok || j.error) {
    console.error("anthropic error", r.status);
    throw new HttpError(502, "The assistant couldn't answer right now.");
  }
  return (Array.isArray(j.content) ? j.content : []).filter((c) => c.type === "text").map((c) => c.text).join("").trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
}
async function withAi(env, feature, level, fn) {
  if (!env.ANTHROPIC_API_KEY)
    throw new HttpError(503, "AI not configured — set ANTHROPIC_API_KEY secret");
  const release = await aiAcquire(env, feature, level);
  try {
    return await fn();
  } finally {
    await release();
  }
}
async function processMenu(env, auth, b, level) {
  if (!b.food_id || !b.file_id)
    throw new HttpError(400, "missing food_id or file_id");
  const food = await env.DB.prepare("SELECT id FROM food_items WHERE id=?").bind(String(b.food_id)).first();
  const fileRow = await env.DB.prepare("SELECT r2_key, content_type, filename, section, segment_id, access FROM files WHERE id=?").bind(b.file_id).first();
  if (!food || !fileReadable(auth, fileRow))
    throw new HttpError(404, "food item or file not found");
  if (!env.BUCKET)
    throw new HttpError(500, "file storage is not configured");
  const ct = (fileRow.content_type || "").toLowerCase();
  const isImage = /^image\/(png|jpeg|gif|webp)$/.test(ct);
  if (!isImage && ct !== "application/pdf")
    throw new HttpError(415, "menus must be a PDF or an image");
  const obj = await env.BUCKET.get(fileRow.r2_key);
  if (!obj)
    throw new HttpError(404, "file missing in storage");
  const bytes = await obj.arrayBuffer();
  if (bytes.byteLength > 20 * 1024 * 1024)
    throw new HttpError(413, "file too large to process (20MB limit)");
  const data = arrayBufferToBase64(bytes);
  const fileBlock = isImage ? { type: "image", source: { type: "base64", media_type: ct, data } } : { type: "document", source: { type: "base64", media_type: "application/pdf", data } };
  const lang = b.lang === "he" ? "he" : "en";
  const text = await withAi(env, "menu", level, () => anthropicFetch(env, {
    model: "claude-sonnet-4-6",
    max_tokens: 3e3,
    system: MENU_SYSTEM_PROMPT,
    messages: [{ role: "user", content: [fileBlock, { type: "text", text: lang === "he" ? 'Extract this menu into the JSON schema from the system prompt. Write every "course" name and every item "name" in HEBREW — if the source menu is already in Hebrew, keep its exact wording; if it is in another language, translate it naturally into Hebrew. Respond with ONLY the JSON array.' : 'Extract this menu into the JSON schema from the system prompt. Write every "course" name and every item "name" in ENGLISH — if the source menu is in another language, translate it naturally into English. Respond with ONLY the JSON array.' }] }]
  }));
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new HttpError(502, "The assistant's answer couldn't be read. Try again.");
  }
  if (!Array.isArray(parsed))
    throw new HttpError(502, "The assistant's answer was not a menu.");
  const clean = [];
  for (const course of parsed.slice(0, 30)) {
    if (!course || typeof course.course !== "string" || !Array.isArray(course.items))
      continue;
    const items = course.items.filter((it) => it && typeof it.name === "string").slice(0, 40).map((it) => {
      const o = { name: String(it.name).slice(0, 300) };
      if (course.choice)
        o.selected = !!it.selected;
      return o;
    });
    if (!items.length)
      continue;
    const c = { course: String(course.course).slice(0, 80), choice: !!course.choice, items };
    if (c.choice) {
      if (!items.some((it) => it.selected))
        items[0].selected = true;
      c.locked = false;
    }
    clean.push(c);
  }
  const col = lang === "he" ? "menu_json_he" : "menu_json";
  const r = await env.DB.prepare(`UPDATE food_items SET ${col}=? WHERE id=?`).bind(JSON.stringify(clean), food.id).run();
  if (!r.meta.changes)
    throw new HttpError(404, "food item not found");
  return json({ ok: true, menu: clean });
}
var AI_OP_TYPES = ["add_check", "add_person", "add_event", "edit_event", "edit_check"];
// validate one proposed operation against the current data; returns the cleaned op or null
function cleanAiOp(op, segIds, checkIds) {
  if (!op || !AI_OP_TYPES.includes(op.type))
    return null;
  try {
    if (op.type === "add_check" && segIds.has(op.segment_id) && op.text)
      return { type: "add_check", segment_id: op.segment_id, text: str(op.text, 500) };
    if (op.type === "add_person" && segIds.has(op.segment_id) && op.name)
      return { type: "add_person", segment_id: op.segment_id, name: str(op.name, 200) };
    if (op.type === "add_event" && op.title)
      return { type: "add_event", day: dayNum(op.day ?? 1), time: timeHM(op.time || "09:00"), end_time: timeHM(op.end_time || "10:00"), title: str(op.title, 300), venue: str(op.venue, 300), descr: str(op.descr, 2e3) };
    if (op.type === "edit_event" && segIds.has(op.segment_id)) {
      const o = { type: "edit_event", segment_id: op.segment_id };
      if (op.title != null) o.title = str(op.title, 300);
      if (op.venue != null) o.venue = str(op.venue, 300);
      if (op.time != null) o.time = timeHM(op.time, { allowEmpty: false });
      if (op.end_time != null) o.end_time = timeHM(op.end_time);
      if (op.day != null) o.day = dayNum(op.day);
      return Object.keys(o).length > 2 ? o : null;
    }
    if (op.type === "edit_check" && checkIds.has(+op.check_id) && op.text)
      return { type: "edit_check", check_id: +op.check_id, text: str(op.text, 500) };
  } catch {
    return null;
  }
  return null;
}
async function handlePropose(request, env, level) {
  const b = await readBody(request);
  const instruction = str(b.instruction, 2e3).trim();
  if (!instruction)
    throw new HttpError(400, "empty instruction");
  const segs = (await env.DB.prepare("SELECT id, day, time, end_time, title, venue FROM segments ORDER BY sort_order").all()).results;
  const ppl = (await env.DB.prepare("SELECT id, segment_id, name FROM people").all()).results;
  const checks = (await env.DB.prepare("SELECT id, segment_id, text FROM checklist").all()).results;
  const DAYS = { 1: "Tue 20 Oct 2026", 2: "Wed 21 Oct 2026", 3: "Thu 22 Oct 2026" };
  const context = segs.map((s) => {
    const sp = ppl.filter((p) => p.segment_id === s.id).map((p) => `person#${p.id}:${p.name}`);
    const sc = checks.filter((c) => c.segment_id === s.id).map((c) => `check#${c.id}:${c.text}`);
    return `event ${s.id} | Day ${s.day} (${DAYS[s.day]}) ${s.time}-${s.end_time} | "${s.title}" @ ${s.venue}` + (sp.length ? `\n   people: ${sp.join("; ")}` : "") + (sc.length ? `\n   checklist: ${sc.join("; ")}` : "");
  }).join("\n");
  const text = await withAi(env, "propose", level, () => anthropicFetch(env, { model: "claude-sonnet-4-6", max_tokens: 2e3, system: PROPOSE_SYSTEM + "\n\nCurrent schedule context:\n" + context, messages: [{ role: "user", content: instruction }] }));
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new HttpError(502, "The assistant's answer couldn't be read. Try again.");
  }
  const segIds = new Set(segs.map((s) => s.id)), checkIds = new Set(checks.map((c) => c.id));
  const ops = (Array.isArray(parsed.ops) ? parsed.ops : []).slice(0, 100).map((op) => cleanAiOp(op, segIds, checkIds)).filter(Boolean);
  return json({ summary: str(parsed.summary || "Proposed changes", 300), ops });
}
// Applying proposals: every op is validated again, then all are written in one transaction.
async function applyAiOps(env, b) {
  const ops = Array.isArray(b.ops) ? b.ops.slice(0, 100) : [];
  const segIds = new Set((await env.DB.prepare("SELECT id FROM segments").all()).results.map((s) => s.id));
  const checkIds = new Set((await env.DB.prepare("SELECT id FROM checklist").all()).results.map((c) => c.id));
  const stmts = [];
  let rejected = 0;
  for (const raw of ops) {
    const op = cleanAiOp(raw, segIds, checkIds);
    if (!op) {
      rejected++;
      continue;
    }
    if (op.type === "add_check")
      stmts.push(env.DB.prepare("INSERT INTO checklist (segment_id,text,done,seeded,created_by) VALUES (?,?,0,0,'AI')").bind(op.segment_id, op.text));
    else if (op.type === "add_person")
      stmts.push(env.DB.prepare("INSERT INTO people (segment_id,name,confirmed) VALUES (?,?,0)").bind(op.segment_id, op.name));
    else if (op.type === "add_event")
      stmts.push(env.DB.prepare("INSERT INTO segments (id,day,time,end_time,title,venue,descr,status,is_meal,sort_order) SELECT ?,?,?,?,?,?,?,'open',0, COALESCE(MAX(sort_order),0)+1 FROM segments").bind(newId("seg-"), op.day, op.time, op.end_time, op.title, op.venue, op.descr));
    else if (op.type === "edit_event") {
      const cols = ["day", "time", "end_time", "title", "venue"].filter((k) => op[k] !== void 0);
      stmts.push(env.DB.prepare(`UPDATE segments SET ${cols.map((k) => `${k}=?`).join(", ")} WHERE id=?`).bind(...cols.map((k) => op[k]), op.segment_id));
    } else if (op.type === "edit_check")
      stmts.push(env.DB.prepare("UPDATE checklist SET text=? WHERE id=?").bind(op.text, op.check_id));
  }
  if (stmts.length)
    await env.DB.batch(stmts);
  return { ok: true, applied: stmts.length, rejected };
}
var PROPOSE_SYSTEM = `You are a production assistant for the Jerusalem Foundation 60th Anniversary Conference (3 days, Oct 20-22 2026). The user will give an instruction to modify the event schedule. You must respond with ONLY a JSON object, no prose, no markdown fences.

The JSON shape is: {"summary": "one-line plain-English summary", "ops": [ ... ]}

Each op is one of these types ONLY:
- {"type":"add_check","segment_id":"<existing event id>","text":"..."}   // add a checklist item to an event
- {"type":"add_person","segment_id":"<existing event id>","name":"..."}   // add a person to an event
- {"type":"add_event","day":1|2|3,"time":"HH:MM","end_time":"HH:MM","title":"...","venue":"...","descr":"..."}
- {"type":"edit_event","segment_id":"<existing event id>","title":"...","venue":"...","time":"HH:MM","end_time":"HH:MM","day":1|2|3}  // include only fields to change
- {"type":"edit_check","check_id":<number>,"text":"..."}   // change an existing checklist item's text

Rules:
- NEVER produce delete operations. You cannot delete anything.
- Only reference event ids and check ids that appear in the provided context.
- For a request like "add production items for a concert", produce multiple add_check ops with concrete, specific items (sound check, backline, mic plot, monitor mix, conductor riser, stage plot, load-in time, etc.) attached to the correct event.
- Keep each item concise. Produce a focused set (typically 4-12 items), not an overwhelming list.
- If you cannot identify which event the user means, make your best guess from titles/venues and note it in the summary.`;
// ---- pages: security headers on every HTML/asset response ----
var CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org",
  "connect-src 'self'",
  "frame-src 'self' blob:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'"
].join("; ");
function withPageHeaders(res) {
  const out = new Response(res.body, res);
  const h = out.headers;
  h.set("x-content-type-options", "nosniff");
  h.set("referrer-policy", "same-origin");
  h.set("x-frame-options", "DENY");
  h.set("permissions-policy", "camera=(), microphone=(), geolocation=(self)");
  if ((h.get("content-type") || "").includes("text/html")) {
    h.set("content-security-policy", CSP);
    h.set("cache-control", "no-cache");
  }
  return out;
}
var src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (!path.startsWith("/api/"))
      return withPageHeaders(await env.ASSETS.fetch(request));
    try {
      return await handleApi(request, env, url, path);
    } catch (e) {
      if (e instanceof HttpError)
        return json({ error: e.message, ...e.extra || {} }, e.status);
      // log the failing route and error type only, never the request body
      console.error("api error", path, e && e.name, e && e.message);
      return json({ error: "server error" }, 500);
    }
  }
};
async function handleApi(request, env, url, path) {
      // sign out: drop the file-download cookie (the key itself lives in the browser tab)
      if (path === "/api/logout" && request.method === "POST")
        return json({ ok: true }, 200, { "set-cookie": CLEAR_COOKIE });
      const auth = await authenticate(request, env, url);
      if (!auth)
        return json({ error: "unauthorized" }, 401, { "set-cookie": CLEAR_COOKIE });
      if (auth.level === "driver" || FIELD_PAGES[auth.level])
        return await handleField(request, env, url, path, auth);
      // the download cookie carries the real level, chief included, so the budget files stay chief-only
      if (path === "/api/session" && request.method === "POST") {
        const res = json({ ok: true, level: auth.level });
        res.headers.append("set-cookie", await makeSessionCookie(auth.level, env));
        return res;
      }
      // the chief key is an admin key that also opens the budget sheet
      const chief = auth.level === "chief";
      const level = chief ? "admin" : auth.level;
      const admin = level === "admin";
      if (path.startsWith("/api/access/")) {
        const res = await handleAccess(path, request, env, level);
        if (res)
          return res;
      }
      if (level === "view") {
        if (path === "/api/state" && request.method === "GET")
          return json({ level: "view", ...await publicProjection(env), people: [], checklist: [], venues: [], contacts: [], guests: [] });
        if (path === "/api/ai/ask" && request.method === "POST")
          return await handleAsk(request, env, "view");
        throw new HttpError(403, "forbidden");
      }
      // ---- dashboard keys (edit / admin / chief). The permission matrix is in README → "Who can do what". ----
      const m = request.method;
      if (path === "/api/state" && m === "GET")
        return json(await dashboardState(env, auth, level, chief));
      // one-column updates (validated per column; `expect` makes them conflict-checked)
      if (FIELD_ENDPOINTS[path] && m === "POST") {
        const spec = FIELD_ENDPOINTS[path];
        if (spec.admin)
          needAdmin(admin);
        const b = await readBody(request);
        const id = needId(b);
        const rule = spec.fields[b.field];
        if (!rule)
          throw new HttpError(400, "bad field");
        if (rule.admin)
          needAdmin(admin);
        const value = (rule.fn || rule)(b.value);
        await setFields(env, spec.table, id, { [b.field]: value }, expectFor(b, b.field), spec.stamp);
        return json({ ok: true, value });
      }
      if (FIELD_ALIASES[path] && m === "POST") {
        const spec = FIELD_ALIASES[path];
        const b = await readBody(request);
        const value = spec.fn(b[spec.from]);
        await setFields(env, spec.table, needId(b), { [spec.field]: value }, expectFor(b, spec.field), spec.stamp);
        return json({ ok: true, value });
      }
      if (m !== "POST" && !["/api/grid", "/api/files", "/api/files/download", "/api/notes", "/api/drivers/positions"].includes(path))
        throw new HttpError(405, "method not allowed");
      // ---- sessions (segments) ----
      if (path === "/api/segment/edit") {
        needAdmin(admin);
        const b = await readBody(request);
        const v = {};
        if (has(b, "day")) v.day = dayNum(b.day);
        if (has(b, "time")) v.time = timeHM(b.time, { allowEmpty: false });
        if (has(b, "end_time")) v.end_time = timeHM(b.end_time);
        if (has(b, "title")) v.title = T(300, { required: true, what: "title" })(b.title);
        if (has(b, "venue")) v.venue = str(b.venue, 300);
        await setFields(env, "segments", needId(b), v, b.expect, false);
        return json({ ok: true });
      }
      if (path === "/api/segment/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const id = newId("seg-");
        await env.DB.prepare(
          "INSERT INTO segments (id, day, time, end_time, title, venue, descr, status, is_meal, sort_order) SELECT ?,?,?,?,?,?,?,'open',0, COALESCE(MAX(sort_order),0)+1 FROM segments"
        ).bind(id, dayNum(b.day ?? 1), timeHM(b.time || "09:00"), timeHM(b.end_time || "10:00"), str(b.title || "New event", 300), str(b.venue, 300), str(b.descr, 5e3)).run();
        return json({ ok: true, id });
      }
      if (path === "/api/segment/duplicate") {
        needAdmin(admin);
        const b = await readBody(request);
        const s = await env.DB.prepare("SELECT * FROM segments WHERE id=?").bind(needId(b)).first();
        if (!s)
          throw new HttpError(404, "not found");
        const id = newId("seg-");
        await atomic(env, [
          env.DB.prepare("UPDATE segments SET sort_order = sort_order + 1 WHERE sort_order > ?").bind(s.sort_order),
          env.DB.prepare("INSERT INTO segments (id, day, time, end_time, title, venue, descr, status, is_meal, notes, sort_order, title_he, venue_he, descr_he) VALUES (?,?,?,?,?,?,?,'open',?,'',?,?,?,?)").bind(id, s.day, s.time, s.end_time, s.title + " (copy)", s.venue, s.descr, s.is_meal, s.sort_order + 1, s.title_he || "", s.venue_he || "", s.descr_he || ""),
          env.DB.prepare("INSERT INTO people (segment_id, name, confirmed) SELECT ?, name, 0 FROM people WHERE segment_id=?").bind(id, s.id)
        ]);
        return json({ ok: true, id });
      }
      if (path === "/api/segment/delete") {
        needAdmin(admin);
        const b = await readBody(request);
        const id = needId(b);
        await atomic(env, [
          env.DB.prepare("DELETE FROM people WHERE segment_id=?").bind(id),
          env.DB.prepare("DELETE FROM checklist WHERE segment_id=?").bind(id),
          env.DB.prepare("DELETE FROM guest_sessions WHERE segment_id=?").bind(id),
          env.DB.prepare("DELETE FROM segments WHERE id=?").bind(id)
        ], { mustChangeLast: true });
        return json({ ok: true });
      }
      if (path === "/api/venue/contacts") {
        const b = await readBody(request);
        const venue = T(300, { required: true, what: "venue" })(b.venue);
        await env.DB.prepare("INSERT INTO venue_contacts (venue, contacts) VALUES (?, ?) ON CONFLICT(venue) DO UPDATE SET contacts=excluded.contacts").bind(venue, str(b.contacts, 3e3)).run();
        return json({ ok: true });
      }
      // ---- people on a session ----
      if (path === "/api/person/toggle") {
        const b = await readBody(request);
        const id = needId(b);
        // an explicit target value is idempotent; without one it flips
        const r = has(b, "confirmed") ? await env.DB.prepare("UPDATE people SET confirmed=? WHERE id=?").bind(B01(b.confirmed), id).run() : await env.DB.prepare("UPDATE people SET confirmed = 1 - confirmed WHERE id=?").bind(id).run();
        if (!r.meta.changes)
          throw new HttpError(404, "not found");
        return json({ ok: true });
      }
      if (path === "/api/person/add") {
        const b = await readBody(request);
        const name = T(200, { required: true, what: "name" })(b.name);
        const seg = await env.DB.prepare("SELECT id FROM segments WHERE id=?").bind(String(b.segment_id || "")).first();
        if (!seg)
          throw new HttpError(404, "session not found");
        const r = await env.DB.prepare("INSERT INTO people (segment_id,name,confirmed) VALUES (?,?,0)").bind(seg.id, name.trim()).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/person/edit") {
        needAdmin(admin);
        const b = await readBody(request);
        await setFields(env, "people", needId(b), { name: T(200, { required: true, what: "name" })(b.name).trim() }, expectFor(b, "name"), false);
        return json({ ok: true });
      }
      if (path === "/api/person/delete") {
        needAdmin(admin);
        return deleteRow(env, "people", needId(await readBody(request)));
      }
      // ---- to-dos ----
      if (path === "/api/check/toggle") {
        const b = await readBody(request);
        const id = needId(b);
        const r = has(b, "done") ? await env.DB.prepare("UPDATE checklist SET done=? WHERE id=?").bind(B01(b.done), id).run() : await env.DB.prepare("UPDATE checklist SET done = 1 - done WHERE id=?").bind(id).run();
        if (!r.meta.changes)
          throw new HttpError(404, "not found");
        return json({ ok: true });
      }
      if (path === "/api/check/add") {
        const b = await readBody(request);
        const text = T(500, { required: true, what: "text" })(b.text).trim();
        const r = await env.DB.prepare("INSERT INTO checklist (segment_id,text,done,seeded,created_by) VALUES (?,?,0,0,?)").bind(b.segment_id ? str(b.segment_id, 80) : null, text, str(b.by, 60)).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/check/edit") {
        needAdmin(admin);
        const b = await readBody(request);
        await setFields(env, "checklist", needId(b), { text: T(500, { required: true, what: "text" })(b.text).trim() }, expectFor(b, "text"), false);
        return json({ ok: true });
      }
      if (path === "/api/check/delete") {
        const b = await readBody(request);
        const row = await env.DB.prepare("SELECT seeded FROM checklist WHERE id=?").bind(needId(b)).first();
        if (!row)
          throw new HttpError(404, "not found");
        if (row.seeded === 1 && !admin)
          throw new HttpError(403, "admin required to delete seeded items");
        return deleteRow(env, "checklist", b.id);
      }
      if (path === "/api/admin/reset") {
        needAdmin(admin);
        await env.DB.prepare("DELETE FROM checklist WHERE seeded=0").run();
        return json({ ok: true });
      }
      // ---- budget sheet: chief key only ----
      if (path === "/api/grid" && m === "GET") {
        if (!chief)
          throw new HttpError(403, "chief key required");
        const row = await env.DB.prepare("SELECT columns, rows, rev, updated_at, updated_by FROM admin_grid WHERE id=1").first();
        return json({ tabs: gridTabs(row), rev: row ? row.rev : 0, updated_at: row && row.updated_at, updated_by: row && row.updated_by });
      }
      if (path === "/api/grid" && m === "POST") {
        if (!chief)
          throw new HttpError(403, "chief key required");
        const b = await readBody(request, 2e6);
        if (!Number.isInteger(b.rev))
          throw new HttpError(400, "rev required");
        const rev = await writeGrid(env, validTabs(b.tabs), b.rev, b.by);
        if (rev === null) {
          const row = await env.DB.prepare("SELECT columns, rows, rev, updated_by FROM admin_grid WHERE id=1").first();
          throw new HttpError(409, "the budget was changed by someone else", { kind: "conflict", rev: row.rev, tabs: gridTabs(row), updated_by: row.updated_by });
        }
        return json({ ok: true, rev });
      }
      // cell edits merge with other people's edits: each edit applies only if the cell still holds `from`
      if (path === "/api/grid/cells") {
        if (!chief)
          throw new HttpError(403, "chief key required");
        const b = await readBody(request);
        const edits = Array.isArray(b.edits) ? b.edits.slice(0, 500) : [];
        if (!edits.length)
          throw new HttpError(400, "no edits");
        for (let attempt = 0; attempt < 3; attempt++) {
          const row = await env.DB.prepare("SELECT columns, rows, rev FROM admin_grid WHERE id=1").first();
          const tabs = gridTabs(row);
          const conflicts = [];
          for (const e of edits) {
            const t = tabs[e.tab | 0], r = e.r | 0, c = e.c | 0;
            if (!t || r < 0 || c < 0 || c >= 60 || r >= 3e3) {
              conflicts.push({ ...e, current: null });
              continue;
            }
            while (t.rows.length <= r)
              t.rows.push([]);
            const cur = t.rows[r][c] ?? "";
            if (String(cur) !== String(e.from ?? "") && String(cur) !== String(e.to ?? "")) {
              conflicts.push({ ...e, current: cur });
              continue;
            }
            while (t.rows[r].length <= c)
              t.rows[r].push("");
            t.rows[r][c] = typeof e.to === "number" ? e.to : str(e.to, 2e3);
          }
          if (conflicts.length)
            throw new HttpError(409, "some cells were changed by someone else", { kind: "conflict", conflicts, rev: row.rev, tabs: gridTabs(row) });
          const rev = await writeGrid(env, tabs, row.rev, b.by);
          if (rev !== null)
            return json({ ok: true, rev });
        }
        throw new HttpError(409, "the budget is being edited heavily; reload and try again", { kind: "conflict" });
      }
      // ---- files (access class enforced on list, upload, download, delete, relabel) ----
      if (path === "/api/files" && m === "GET") {
        const acc = readableAccess(auth);
        const clauses = [`access IN (${acc.map(() => "?").join(",")})`], binds = [...acc];
        const section = url.searchParams.get("section"), segId = url.searchParams.get("segment_id");
        if (section) {
          clauses.push("section=?");
          binds.push(section);
        }
        if (segId) {
          clauses.push("segment_id=?");
          binds.push(segId);
        }
        const res = await env.DB.prepare(`SELECT id, filename, content_type, size, section, segment_id, uploaded_by, uploaded_at, access, access_reviewed FROM files WHERE ${clauses.join(" AND ")} ORDER BY uploaded_at DESC`).bind(...binds).all();
        return json({ files: res.results });
      }
      if (path === "/api/files/upload") {
        if (!env.BUCKET)
          throw new HttpError(500, "file storage is not configured");
        const len = +(request.headers.get("content-length") || 0);
        if (len > MAX_UPLOAD_BYTES + 1e5)
          throw new HttpError(413, "file must be under 25 MB");
        const form = await request.formData();
        const file = form.get("file");
        if (!file || typeof file === "string")
          throw new HttpError(400, "no file");
        const section = (form.get("section") || "general").toString();
        if (!UPLOAD_SECTIONS.includes(section))
          throw new HttpError(400, "bad section");
        if (!file.size || file.size > MAX_UPLOAD_BYTES)
          throw new HttpError(413, "file must be under 25 MB");
        const name = (file.name || "upload").replace(/[\/\\\x00-\x1f\x7f]/g, "_").slice(0, 200);
        const ext = (name.match(/\.([a-z0-9]+)$/i) || [])[1]?.toLowerCase();
        const ctype = UPLOAD_TYPES[ext];
        if (!ctype)
          throw new HttpError(415, "file type not allowed (PDF, images, Office documents, CSV or text only)");
        const access = uploadAccess(auth, section, form.get("access"));
        const segId = form.get("segment_id") ? form.get("segment_id").toString().slice(0, 100) : null;
        const key = `${section}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name}`;
        await env.BUCKET.put(key, file.stream(), { httpMetadata: { contentType: ctype } });
        try {
          const r = await env.DB.prepare("INSERT INTO files (r2_key, filename, content_type, size, section, segment_id, uploaded_by, access, access_reviewed) VALUES (?,?,?,?,?,?,?,?,1)").bind(key, name, ctype, file.size, section, segId, str(form.get("by"), 60), access).run();
          return json({ ok: true, id: r.meta.last_row_id, access });
        } catch (e) {
          // the database row failed: remove the stored object so nothing is left orphaned
          try {
            await env.BUCKET.delete(key);
          } catch {
          }
          throw e;
        }
      }
      if (path === "/api/files/download" && m === "GET") {
        const row = await env.DB.prepare("SELECT r2_key, filename, content_type, section, segment_id, access FROM files WHERE id=?").bind(url.searchParams.get("id")).first();
        if (!fileReadable(auth, row))
          throw new HttpError(404, "not found");
        if (!env.BUCKET)
          throw new HttpError(500, "file storage is not configured");
        const obj = await env.BUCKET.get(row.r2_key);
        if (!obj)
          throw new HttpError(404, "file missing in storage");
        return downloadResponse(obj, row, url.searchParams.get("inline") === "1");
      }
      if (path === "/api/files/delete") {
        const b = await readBody(request);
        const row = await env.DB.prepare("SELECT id, r2_key, section, segment_id, access FROM files WHERE id=?").bind(needId(b)).first();
        if (!fileReadable(auth, row))
          throw new HttpError(404, "not found");
        // database first (atomically with anything pointing at the file), storage after: a failed storage
        // delete leaves an unreachable object, never a listed file without content
        await atomic(env, [
          env.DB.prepare("DELETE FROM inbox_items WHERE file_id=? AND state='review'").bind(row.id),
          env.DB.prepare("UPDATE design_proofs SET file_id=NULL WHERE file_id=?").bind(row.id),
          env.DB.prepare("DELETE FROM files WHERE id=?").bind(row.id)
        ], { mustChangeLast: true });
        if (env.BUCKET) {
          try {
            await env.BUCKET.delete(row.r2_key);
          } catch (e) {
            console.error("r2 delete failed", row.id);
          }
        }
        return json({ ok: true });
      }
      if (path === "/api/files/access") {
        needAdmin(admin);
        const b = await readBody(request);
        const access = oneOf("file_access", b.access);
        const row = await env.DB.prepare("SELECT id, access FROM files WHERE id=?").bind(needId(b)).first();
        if (!row || row.access === "chief" && !chief)
          throw new HttpError(404, "not found");
        if (access === "chief" && !chief)
          throw new HttpError(403, "only the chief key can mark a file chief-only");
        await atomic(env, [
          env.DB.prepare("UPDATE inbox_items SET access=? WHERE file_id=?").bind(access, row.id),
          env.DB.prepare("UPDATE files SET access=?, access_reviewed=1 WHERE id=?").bind(access, row.id)
        ], { mustChangeLast: true });
        return json({ ok: true, access });
      }
      // ---- transport ----
      if (path === "/api/run/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const id = newId("r-");
        await env.DB.prepare("INSERT INTO transport_runs (id,day,depart_time,title,title_he,destination,status,sort_order) SELECT ?,?,?,?,?,?,'no_driver', COALESCE(MAX(sort_order),0)+1 FROM transport_runs").bind(id, dayNum(b.day ?? 1), timeHM(b.depart_time), T(200, { required: true, what: "title" })(b.title).trim(), str(b.title_he, 200), str(b.destination, 200)).run();
        return json({ ok: true, id });
      }
      if (path === "/api/run/delete") {
        needAdmin(admin);
        const id = needId(await readBody(request));
        await atomic(env, [env.DB.prepare("DELETE FROM run_stops WHERE run_id=?").bind(id), env.DB.prepare("DELETE FROM transport_runs WHERE id=?").bind(id)], { mustChangeLast: true });
        return json({ ok: true });
      }
      if (path === "/api/stop/add") {
        const b = await readBody(request);
        const run = await env.DB.prepare("SELECT id FROM transport_runs WHERE id=?").bind(String(b.run_id || "")).first();
        if (!run)
          throw new HttpError(404, "run not found");
        const r = await env.DB.prepare("INSERT INTO run_stops (run_id,time,stop_label,hotel_match,sort_order) SELECT ?,?,?,?, COALESCE(MAX(sort_order),0)+1 FROM run_stops WHERE run_id=?").bind(run.id, timeHM(b.time), str(b.stop_label, 200), str(b.hotel_match, 200), run.id).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/stop/delete")
        return deleteRow(env, "run_stops", needId(await readBody(request)));
      if (path === "/api/drivers/positions" && m === "GET") {
        const rows = await env.DB.prepare("SELECT device, name, run_id, lat, lng, accuracy, speed, heading, sharing, at, fix_at FROM driver_positions WHERE at > datetime('now','-12 hours') ORDER BY at DESC").all();
        return json({ positions: rows.results, now: new Date().toISOString() });
      }
      // ---- gifts and design ----
      if (path === "/api/gift/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const id = newId("g-");
        await env.DB.prepare("INSERT INTO gift_items (id,category,category_he,title,title_he,qty,deadline,sort_order) SELECT ?,?,?,?,?,?,?, COALESCE(MAX(sort_order),0)+1 FROM gift_items").bind(id, str(b.category, 60), str(b.category_he, 60), T(200, { required: true, what: "title" })(b.title).trim(), str(b.title_he, 200), str(b.qty, 40), dateISO(b.deadline)).run();
        return json({ ok: true, id });
      }
      if (path === "/api/gift/delete") {
        needAdmin(admin);
        return deleteRow(env, "gift_items", needId(await readBody(request)));
      }
      if (path === "/api/design/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const id = newId("d-");
        await env.DB.prepare("INSERT INTO design_items (id,title,title_he,category,qty,size,spec,status,sort_order) SELECT ?,?,?,?,?,?,?,'content_missing', COALESCE(MAX(sort_order),0)+1 FROM design_items").bind(id, T(200, { required: true, what: "title" })(b.title).trim(), str(b.title_he, 200), ident(b.category || "print", "category"), str(b.qty, 40), str(b.size, 60), str(b.spec, 500)).run();
        return json({ ok: true, id });
      }
      if (path === "/api/design/delete") {
        needAdmin(admin);
        const id = needId(await readBody(request));
        await atomic(env, [env.DB.prepare("DELETE FROM design_proofs WHERE item_id=?").bind(id), env.DB.prepare("DELETE FROM design_items WHERE id=?").bind(id)], { mustChangeLast: true });
        return json({ ok: true });
      }
      if (path === "/api/design/proof") {
        const b = await readBody(request);
        const item = await env.DB.prepare("SELECT id FROM design_items WHERE id=?").bind(String(b.item_id || "")).first();
        const file = await env.DB.prepare("SELECT id, section, segment_id, access FROM files WHERE id=?").bind(b.file_id ?? null).first();
        if (!item || !fileReadable(auth, file))
          throw new HttpError(404, "design item or file not found");
        const res = await addProof(env, item.id, file.id, str(b.by, 60));
        return json({ ok: true, id: res.id, version: res.version });
      }
      // a decision on an old version is recorded on that version but never changes the item's status
      if (path === "/api/design/decide") {
        const b = await readBody(request);
        if (!b.proof_id || !["approved", "changes"].includes(b.decision))
          throw new HttpError(400, "bad decision");
        const proof = await env.DB.prepare("SELECT p.id, p.item_id, p.version, (SELECT MAX(version) FROM design_proofs WHERE item_id=p.item_id) AS latest FROM design_proofs p WHERE p.id=?").bind(b.proof_id).first();
        if (!proof)
          throw new HttpError(404, "proof not found");
        const isLatest = proof.version === proof.latest;
        const stmts = [env.DB.prepare("UPDATE design_proofs SET decision=?, comment=?, decided_by=?, decided_at=datetime('now') WHERE id=?").bind(b.decision, str(b.comment, 2e3), str(b.by, 60), proof.id)];
        if (isLatest)
          stmts.push(env.DB.prepare("UPDATE design_items SET status=?, updated_at=datetime('now') WHERE id=? AND (SELECT MAX(version) FROM design_proofs WHERE item_id=?)=?").bind(b.decision, proof.item_id, proof.item_id, proof.version));
        const res = await atomic(env, stmts);
        const applied = isLatest && !!res[1].meta.changes;
        return json({ ok: true, latest: applied, item_status: applied ? b.decision : void 0 });
      }
      // ---- guests ----
      if (path === "/api/guest/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const r = await env.DB.prepare("INSERT INTO guests (party_id, first_name, last_name, desk, ptype, email, phone, hotel, dietary, is_lead, reg_id) VALUES (?,?,?,?,?,?,?,?,?,1,?)").bind(str(b.party_id, 20), T(120, { required: true, what: "first name" })(b.first_name).trim(), str(b.last_name, 120), str(b.desk, 40), str(b.ptype || "Donor/guest", 40), str(b.email, 200), str(b.phone, 60), str(b.hotel, 120), str(b.dietary, 400), str(b.reg_id, 60)).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/guest/delete") {
        needAdmin(admin);
        const id = needId(await readBody(request));
        await atomic(env, [env.DB.prepare("DELETE FROM guest_sessions WHERE guest_id=?").bind(id), env.DB.prepare("DELETE FROM boarding WHERE guest_id=?").bind(id), env.DB.prepare("DELETE FROM guests WHERE id=?").bind(id)], { mustChangeLast: true });
        return json({ ok: true });
      }
      if (path === "/api/guest/session") {
        const b = await readBody(request);
        const g = await env.DB.prepare("SELECT id FROM guests WHERE id=?").bind(b.guest_id ?? null).first();
        const s = await env.DB.prepare("SELECT id FROM segments WHERE id=?").bind(String(b.segment_id || "")).first();
        if (!g || !s)
          throw new HttpError(404, "guest or session not found");
        await env.DB.prepare("INSERT INTO guest_sessions (guest_id, segment_id, attending) VALUES (?,?,?) ON CONFLICT(guest_id, segment_id) DO UPDATE SET attending=excluded.attending").bind(g.id, s.id, B01(b.attending)).run();
        return json({ ok: true });
      }
      if (path === "/api/guest/import") {
        needAdmin(admin);
        return json(await importPreview(env, await readBody(request, 4e6)));
      }
      if (path === "/api/guest/import/apply") {
        needAdmin(admin);
        return await idempotent(env, request, "import", async () => json(await importApply(env, await readBody(request, 4e6))));
      }
      if (path === "/api/dayguest/add") {
        const b = await readBody(request);
        const r = await env.DB.prepare("INSERT INTO day_guests (first_name, last_name, desk, email, phone, sessions, note) VALUES (?,?,?,?,?,?,?)").bind(T(120, { required: true, what: "first name" })(b.first_name).trim(), str(b.last_name, 120), str(b.desk, 40), admin ? str(b.email, 200) : "", admin ? str(b.phone, 60) : "", str(b.sessions, 1e3), str(b.note, 1e3)).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/dayguest/delete") {
        needAdmin(admin);
        return deleteRow(env, "day_guests", needId(await readBody(request)));
      }
      // ---- food ----
      if (path === "/api/food/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const id = newId("food-");
        await env.DB.prepare("INSERT INTO food_items (id, segment_id, day, time, end_time, title, venue, meal_type, status, sort_order) SELECT ?,?,?,?,?,?,?,?,'open', COALESCE(MAX(sort_order),0)+1 FROM food_items").bind(id, b.segment_id ? str(b.segment_id, 80) : null, dayNum(b.day ?? 1), timeHM(b.time), timeHM(b.end_time), str(b.title || "New food item", 300), str(b.venue, 300), oneOf("meal_type", b.meal_type || "drinks")).run();
        return json({ ok: true, id });
      }
      if (path === "/api/food/delete") {
        needAdmin(admin);
        return deleteRow(env, "food_items", needId(await readBody(request)));
      }
      if (path === "/api/dietary/add") {
        const b = await readBody(request);
        const r = await env.DB.prepare("INSERT INTO dietary (guest_name, restrictions, severity, notes, applies_to) VALUES (?,?,?,?,?)").bind(T(200, { required: true, what: "name" })(b.guest_name).trim(), JSON.stringify((Array.isArray(b.restrictions) ? b.restrictions : []).slice(0, 30).map((x) => str(x, 60))), str(b.severity, 40), str(b.notes, 500), str(b.applies_to || "All meals", 300)).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/dietary/edit") {
        const b = await readBody(request);
        const v = {};
        if (has(b, "guest_name")) v.guest_name = T(200, { required: true, what: "name" })(b.guest_name).trim();
        if (has(b, "restrictions")) v.restrictions = JSON.stringify((Array.isArray(b.restrictions) ? b.restrictions : []).slice(0, 30).map((x) => str(x, 60)));
        if (has(b, "severity")) v.severity = str(b.severity, 40);
        if (has(b, "notes")) v.notes = str(b.notes, 500);
        if (has(b, "applies_to")) v.applies_to = str(b.applies_to, 300);
        await setFields(env, "dietary", needId(b), v, b.expect, false);
        return json({ ok: true });
      }
      if (path === "/api/dietary/delete")
        return deleteRow(env, "dietary", needId(await readBody(request)));
      if (path === "/api/food/process-menu") {
        needAdmin(admin);
        return await processMenu(env, auth, await readBody(request), level);
      }
      // ---- AI: Ask is read-only for everyone; proposals for editors; applying is admin-only ----
      if (path === "/api/ai/ask")
        return await handleAsk(request, env, level);
      if (path === "/api/ai/propose")
        return await handlePropose(request, env, level);
      if (path === "/api/ai/apply") {
        needAdmin(admin);
        return await idempotent(env, request, "ai-apply", async () => json(await applyAiOps(env, await readBody(request))));
      }
      // ---- contacts, notes, timeline, team ----
      if (path === "/api/contact/add") {
        const b = await readBody(request);
        const r = await env.DB.prepare("INSERT INTO contacts (name, phone, role, email, notes, venue, created_by) VALUES (?,?,?,?,?,?,?)").bind(T(200, { required: true, what: "name" })(b.name).trim(), str(b.phone, 60), str(b.role, 200), str(b.email, 200), str(b.notes, 1e3), str(b.venue, 300), str(b.by, 60)).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/contact/edit") {
        const b = await readBody(request);
        const v = {};
        if (has(b, "name")) v.name = T(200, { required: true, what: "name" })(b.name).trim();
        for (const [k, max] of [["phone", 60], ["role", 200], ["email", 200], ["notes", 1e3], ["venue", 300]])
          if (has(b, k)) v[k] = str(b[k], max);
        await setFields(env, "contacts", needId(b), v, b.expect, false);
        return json({ ok: true });
      }
      if (path === "/api/contact/delete")
        return deleteRow(env, "contacts", needId(await readBody(request)));
      if (path === "/api/notes" && m === "GET") {
        const row = await env.DB.prepare("SELECT body, rev, updated_at, updated_by FROM general_notes WHERE id=1").first();
        // stored notes are cleaned again on the way out, so anything saved before this release is safe too
        return json({ body: row ? await sanitizeHtml(row.body || "") : "", rev: row ? row.rev : 0, updated_at: row ? row.updated_at : null, updated_by: row ? row.updated_by : "" });
      }
      if (path === "/api/notes" && m === "POST") {
        const b = await readBody(request);
        if (!Number.isInteger(b.rev))
          throw new HttpError(400, "rev required");
        const body = await sanitizeHtml(String(b.body ?? ""));
        if (utf8Bytes(body) > 5e5)
          throw new HttpError(413, "notes are too long");
        const r = await env.DB.prepare("UPDATE general_notes SET body=?, rev=rev+1, updated_at=datetime('now'), updated_by=? WHERE id=1 AND rev=? RETURNING rev").bind(body, str(b.by, 60), b.rev).first();
        if (!r) {
          const cur = await env.DB.prepare("SELECT body, rev, updated_by, updated_at FROM general_notes WHERE id=1").first();
          throw new HttpError(409, "the notes were changed by someone else", { kind: "conflict", rev: cur.rev, body: await sanitizeHtml(cur.body || ""), updated_by: cur.updated_by, updated_at: cur.updated_at });
        }
        return json({ ok: true, rev: r.rev, body });
      }
      // admin: clean HTML stored before sanitizing existed. Dry run by default; see README → "Cleaning stored notes".
      if (path === "/api/admin/sanitize-notes") {
        needAdmin(admin);
        const b = await readBody(request);
        const row = await env.DB.prepare("SELECT body, rev FROM general_notes WHERE id=1").first();
        const clean = await sanitizeHtml(row.body || "");
        const changed = clean !== (row.body || "");
        if (b.apply && changed) {
          const r = await env.DB.prepare("UPDATE general_notes SET body=?, rev=rev+1, updated_at=datetime('now'), updated_by='sanitize' WHERE id=1 AND rev=?").bind(clean, row.rev).run();
          if (!r.meta.changes)
            throw new HttpError(409, "the notes changed meanwhile; run again", { kind: "conflict" });
        }
        return json({ ok: true, changed, applied: !!(b.apply && changed), bytes_before: utf8Bytes(row.body || ""), bytes_after: utf8Bytes(clean) });
      }
      if (path === "/api/timeline/add") {
        const b = await readBody(request);
        const r = await env.DB.prepare("INSERT INTO timeline (due_date, title, category, owner, done, seeded) VALUES (?,?,?,?,0,0)").bind(dateISO(b.due_date), T(300, { required: true, what: "title" })(b.title).trim(), str(b.category || "General", 40), str(b.owner, 80)).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/timeline/edit") {
        const b = await readBody(request);
        const v = {};
        if (has(b, "due_date")) v.due_date = dateISO(b.due_date);
        if (has(b, "title")) v.title = T(300, { required: true, what: "title" })(b.title).trim();
        if (has(b, "category")) v.category = str(b.category || "General", 40);
        if (has(b, "owner")) v.owner = str(b.owner, 80);
        if (has(b, "notes")) v.notes = str(b.notes, 1e3);
        await setFields(env, "timeline", needId(b), v, b.expect, false);
        return json({ ok: true });
      }
      if (path === "/api/timeline/toggle") {
        const b = await readBody(request);
        const id = needId(b);
        const r = has(b, "done") ? await env.DB.prepare("UPDATE timeline SET done=? WHERE id=?").bind(B01(b.done), id).run() : await env.DB.prepare("UPDATE timeline SET done = 1 - done WHERE id=?").bind(id).run();
        if (!r.meta.changes)
          throw new HttpError(404, "not found");
        return json({ ok: true });
      }
      if (path === "/api/timeline/delete")
        return deleteRow(env, "timeline", needId(await readBody(request)));
      if (path === "/api/team/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const org = ["Jerusalem Foundation", "Jerusalem Foundation board"].includes(b.org) ? b.org : "Production";
        const r = await env.DB.prepare("INSERT INTO team (name, role, org, phone) VALUES (?,?,?,?)").bind(T(120, { required: true, what: "name" })(b.name).trim(), str(b.role, 120), org, str(b.phone, 40)).run();
        return json({ ok: true, id: r.meta.last_row_id });
      }
      if (path === "/api/team/delete") {
        needAdmin(admin);
        const id = needId(await readBody(request));
        // a person with an active field credential keeps it until it is revoked; refuse to orphan it silently
        const cred = await env.DB.prepare("SELECT COUNT(*) AS n FROM field_credentials WHERE person_id=? AND active=1").bind(id).first();
        if (cred && cred.n)
          throw new HttpError(409, "this person has an active field-app credential; revoke it first", { kind: "conflict" });
        return deleteRow(env, "team", id);
      }
      // ---- inbox ----
      if (path === "/api/inbox/read")
        return await handleInboxRead(request, env, auth, level);
      if (path === "/api/inbox/apply")
        return await idempotent(env, request, "inbox", () => handleInboxApply(request, env, auth, admin));
      if (path === "/api/inbox/dismiss") {
        const b = await readBody(request);
        const item = await env.DB.prepare("SELECT id, access FROM inbox_items WHERE id=? AND state='review'").bind(needId(b)).first();
        if (!item || !readableAccess(auth).includes(item.access))
          throw new HttpError(404, "not found");
        await env.DB.prepare("UPDATE inbox_items SET state='dismissed' WHERE id=? AND state='review'").bind(item.id).run();
        return json({ ok: true });
      }
      // ---- furniture and organizations fair ----
      if (path === "/api/furniture/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const item = T(200, { required: true, what: "item" })(b.item).trim();
        const seg = T(80, { required: true, what: "session" })(b.segment_id).trim();
        const id = newId("fu");
        await env.DB.prepare("INSERT INTO furniture_items (id, setup, segment_ids, item, qty, size, notes, sort_order) SELECT ?,?,?,?,?,?,?, COALESCE(MAX(sort_order),0)+1 FROM furniture_items").bind(id, str(b.setup, 200).trim() || "Added in the app", seg, item, INTN(0, 1e5)(b.qty), str(b.size, 100), str(b.notes, 500)).run();
        return json({ ok: true, id });
      }
      if (path === "/api/furniture/delete") {
        needAdmin(admin);
        return deleteRow(env, "furniture_items", needId(await readBody(request)));
      }
      if (path === "/api/fair/add") {
        needAdmin(admin);
        const b = await readBody(request);
        const id = newId("f");
        await env.DB.prepare("INSERT INTO fair_orgs (id, name, domain, sort_order) SELECT ?,?,?, COALESCE(MAX(sort_order),0)+1 FROM fair_orgs").bind(id, T(200, { required: true, what: "name" })(b.name).trim(), str(b.domain, 100)).run();
        return json({ ok: true, id });
      }
      if (path === "/api/fair/delete") {
        needAdmin(admin);
        return deleteRow(env, "fair_orgs", needId(await readBody(request)));
      }
      throw new HttpError(404, "not found");
}
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
