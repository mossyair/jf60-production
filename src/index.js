import Anthropic from "@anthropic-ai/sdk";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var json = /* @__PURE__ */ __name2((data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json", "cache-control": "no-store" }
}), "json");
var GUEST_PII_FIELDS = ["email", "phone", "city", "country", "passport_no", "passport_country", "is_israeli"];
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
async function tokenLevel(token, env) {
  if (!token)
    return null;
  for (const [level, name] of LEVELS) {
    if (env[name] && await safeEqual(token, env[name]))
      return level;
  }
  const t = token.trim().toLowerCase().replace(/\s+/g, " ");
  if (await safeEqual(t, (env.DRIVER_TOKEN || "driver").toLowerCase()))
    return "driver";
  // field apps: one shared key per role; group leaders and crew also give their name, which picks what they see
  for (const [level, keys] of [["leader", [env.LEADER_TOKEN || "group leader"]], ["av", [env.AV_TOKEN || "shuster"]], ["crew", env.CREW_TOKEN ? [env.CREW_TOKEN] : ["site manager", "assistant producer"]]])
    for (const k of keys)
      if (await safeEqual(t, k.toLowerCase()))
        return level;
  return null;
}
async function makeSessionCookie(level, env) {
  const secret = env[LEVELS.find(([l]) => l === level)[1]];
  const exp = Math.floor(Date.now() / 1e3) + SESSION_TTL;
  const sig = await hmacHex(secret, `${level}.${exp}`);
  return `${SESSION_COOKIE}=${level}.${exp}.${sig}; Path=/api/files/download; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL}`;
}
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
async function authLevel(request, env, url) {
  const level = await tokenLevel(request.headers.get("x-token") || "", env);
  if (level)
    return level;
  if (url.pathname === "/api/files/download" && request.method === "GET")
    return await cookieLevel(request, env);
  return null;
}
__name(authLevel, "authLevel");
__name2(authLevel, "authLevel");
async function readBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
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
  const q = /* @__PURE__ */ __name(async (sql) => {
    try {
      return (await env.DB.prepare(sql).all()).results;
    } catch (e) {
      return [];
    }
  }, "q");
  const ctx = {};
  ctx.sessions = await q("SELECT id, day, time, end_time, title, title_he, venue, venue_he, descr, status, notes, brief_av, notes_speaker, notes_logistics FROM segments ORDER BY day, time, sort_order");
  ctx.transport_runs = await q("SELECT id, day, depart_time, arrive_time, title, destination, status, driver, company, vehicles, notes FROM transport_runs ORDER BY day, sort_order");
  if (level !== "view") {
    ctx.todos = await q("SELECT segment_id, text, done, owner FROM checklist");
    ctx.people_per_session = await q("SELECT segment_id, name, confirmed FROM people");
    ctx.milestones = await q("SELECT due_date, title, category, owner, done FROM timeline ORDER BY due_date");
    ctx.food = await q("SELECT id, day, time, end_time, title, venue, meal_type, status, caterer, headcount, dietary_note, notes FROM food_items ORDER BY day, sort_order");
    ctx.design_print = await q("SELECT title, category, status, deadline, qty, supplier, notes FROM design_items ORDER BY sort_order");
    ctx.gifts = await q("SELECT title, category, chosen, qty, status FROM gift_items ORDER BY sort_order");
    ctx.contacts = await q("SELECT name, role, venue FROM contacts");
    ctx.team = await q("SELECT name, role, org FROM team");
    ctx.day_guests = await q("SELECT first_name, last_name, desk, sessions, note FROM day_guests");
    ctx.crew_schedule = await q("SELECT day, start_min, end_min, title, site, kind, crew_json, flag, note, done FROM crew_shifts ORDER BY day, start_min");
    ctx.furniture = await q("SELECT setup, segment_ids, item, qty, qty_note, size, stays_until, notes FROM furniture_items ORDER BY sort_order");
    ctx.organizations_fair = await q("SELECT name, domain, note, contacted, confirmed, form_done, power FROM fair_orgs ORDER BY sort_order");
    if (level === "admin")
      ctx.talent_contracts = await q("SELECT title, stage, fee, notes FROM talent_items ORDER BY sort_order");
    if (level === "admin")
      ctx.catering_quotes = await q("SELECT food_id, supplier, menu, price, linens, dishes, note, chosen FROM catering_quotes ORDER BY sort_order");
    const g = await q("SELECT desk, hotel, dietary, dietary_severe, needs_review, passport_no FROM guests WHERE status='active'");
    const tally = /* @__PURE__ */ __name((key) => g.reduce((m, r) => {
      const k = (r[key] || "").toString().trim() || "(none recorded)";
      m[k] = (m[k] || 0) + 1;
      return m;
    }, {}), "tally");
    ctx.guest_summary = {
      total: g.length,
      by_hotel: tally("hotel"),
      by_desk: tally("desk"),
      by_dietary_need: tally("dietary"),
      severe_allergies: g.filter((r) => r.dietary_severe).length,
      flagged_for_review: g.filter((r) => r.needs_review).length
    };
    if (level === "admin")
      ctx.guest_summary.missing_passport_number = g.filter((r) => !r.passport_no).length;
  }
  return ctx;
}
__name(buildAskContext, "buildAskContext");
async function handleAsk(request, env, level) {
  if (!env.ANTHROPIC_API_KEY)
    return json({ error: "AI not configured — set ANTHROPIC_API_KEY secret" }, 500);
  const b = await readBody(request);
  const question = (b.question || "").toString().slice(0, 2e3).trim();
  if (!question)
    return json({ error: "empty question" }, 400);
  const messages = [];
  for (const turn of (Array.isArray(b.history) ? b.history : []).slice(-6)) {
    const tq = (turn && turn.q || "").toString().slice(0, 2e3).trim();
    const ta = (turn && turn.a || "").toString().slice(0, 6e3).trim();
    if (tq && ta)
      messages.push({ role: "user", content: tq }, { role: "assistant", content: ta });
  }
  messages.push({ role: "user", content: question });
  const ctx = await buildAskContext(env, level);
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  let msg;
  try {
    msg = await client.beta.messages.create({
      model: AI_ASK_MODEL,
      max_tokens: 16e3,
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
    if (e instanceof Anthropic.RateLimitError)
      return json({ error: "The assistant is busy. Try again in a minute." }, 429);
    if (e instanceof Anthropic.APIError) {
      console.error("ai ask", e.status, e.message);
      return json({ error: "The assistant couldn't answer right now." }, 502);
    }
    throw e;
  }
  if (msg.stop_reason === "refusal")
    return json({ answer: "", refused: true });
  const answer = msg.content.filter((c) => c.type === "text").map((c) => c.text).join("").trim();
  return json({ answer, truncated: msg.stop_reason === "max_tokens" });
}
__name(handleAsk, "handleAsk");
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
async function handleInboxRead(request, env, admin) {
  if (!env.ANTHROPIC_API_KEY)
    return json({ error: "AI not configured — set ANTHROPIC_API_KEY secret" }, 500);
  if (!env.BUCKET)
    return json({ error: "R2 bucket not bound" }, 500);
  const b = await readBody(request);
  const fileRow = await env.DB.prepare("SELECT * FROM files WHERE id=?").bind(b.file_id).first();
  if (!fileRow)
    return json({ error: "file not found" }, 404);
  const name = fileRow.filename || "file";
  const ext = ((name.match(/\.([a-z0-9]+)$/i) || [])[1] || "").toLowerCase();
  const ct = fileRow.content_type || "";
  const content = [];
  if (ct === "application/pdf" || /^image\/(png|jpeg|gif|webp)$/.test(ct)) {
    const obj = await env.BUCKET.get(fileRow.r2_key);
    if (!obj)
      return json({ error: "file missing in storage" }, 404);
    const bytes = await obj.arrayBuffer();
    if (bytes.byteLength > 20 * 1024 * 1024)
      return json({ error: "file too large to read (20MB limit)" }, 413);
    const data = arrayBufferToBase64(bytes);
    content.push(ct === "application/pdf" ? { type: "document", source: { type: "base64", media_type: "application/pdf", data } } : { type: "image", source: { type: "base64", media_type: ct, data } });
  } else if (ct === "text/csv" || ct === "text/plain") {
    const obj = await env.BUCKET.get(fileRow.r2_key);
    if (!obj)
      return json({ error: "file missing in storage" }, 404);
    content.push({ type: "text", text: "Document contents:\n" + (await obj.text()).slice(0, 2e5) });
  } else if (b.text) {
    content.push({ type: "text", text: "Document contents (converted to text in the browser):\n" + b.text.toString().slice(0, 2e5) });
  }
  const q = /* @__PURE__ */ __name(async (sql) => {
    try {
      return (await env.DB.prepare(sql).all()).results;
    } catch (e) {
      return [];
    }
  }, "q");
  const candidates = {
    sessions: await q("SELECT id, day, time, title, venue FROM segments ORDER BY day, time"),
    food: await q("SELECT id, day, time, title, venue FROM food_items ORDER BY day, sort_order"),
    design: await q("SELECT id, title, category FROM design_items ORDER BY sort_order"),
    talent: await q("SELECT id, title FROM talent_items ORDER BY sort_order")
  };
  content.push({ type: "text", text: `File name: ${name}${content.length ? "" : " (its contents could not be read; judge from the name)"}\n\nCandidate items (JSON):\n${JSON.stringify(candidates)}` });
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  let msg;
  try {
    msg = await client.beta.messages.create({
      model: AI_ASK_MODEL,
      max_tokens: 16e3,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      output_config: { effort: "low", format: { type: "json_schema", schema: INBOX_SCHEMA } },
      system: INBOX_SYSTEM,
      messages: [{ role: "user", content }]
    });
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError)
      return json({ error: "The assistant is busy. Try again in a minute." }, 429);
    if (e instanceof Anthropic.APIError) {
      console.error("inbox read", e.status, e.message);
      return json({ error: "The assistant couldn't read this file." }, 502);
    }
    throw e;
  }
  let out = { type: "other", confidence: 0, summary: "The assistant couldn't read this file. Pick a type, or keep it as a plain file.", fields: [], target_id: "" };
  if (msg.stop_reason !== "refusal") {
    try {
      const parsed = JSON.parse(msg.content.filter((c) => c.type === "text").map((c) => c.text).join(""));
      if (INBOX_TYPES.includes(parsed.type))
        out = parsed;
    } catch (e) {
    }
  }
  const ids = { menu: candidates.food, proof: candidates.design, contract: candidates.talent, rider: candidates.sessions, bio: candidates.sessions, map: candidates.sessions };
  const target = (ids[out.type] || []).some((x) => String(x.id) === String(out.target_id)) ? String(out.target_id) : "";
  const fields = (Array.isArray(out.fields) ? out.fields : []).slice(0, 6).map((f) => ({ label: String(f.label || "").slice(0, 60), value: String(f.value || "").slice(0, 200) }));
  const r = await env.DB.prepare(
    "INSERT INTO inbox_items (file_id, name, ext, state, type, confidence, summary, fields_json, target, created_by) VALUES (?,?,?,'review',?,?,?,?,?,?)"
  ).bind(fileRow.id, name, ext.toUpperCase().slice(0, 4), out.type, Math.max(0, Math.min(100, parseInt(out.confidence) || 0)), String(out.summary || "").slice(0, 600), JSON.stringify(fields), target, (b.by || "").toString().slice(0, 60)).run();
  return json({ ok: true, id: r.meta.last_row_id });
}
__name(handleInboxRead, "handleInboxRead");
async function handleInboxApply(request, env, admin) {
  const b = await readBody(request);
  const item = await env.DB.prepare("SELECT * FROM inbox_items WHERE id=?").bind(b.id).first();
  if (!item || item.state !== "review")
    return json({ error: "not found" }, 404);
  const type = b.plain ? "other" : INBOX_TYPES.includes(b.type) ? b.type : item.type;
  if (!b.plain && INBOX_ADMIN_TYPES.includes(type) && !admin)
    return json({ error: "admin required" }, 403);
  const target = (b.target ?? item.target ?? "").toString();
  const by = (b.by || "").toString().slice(0, 60);
  let filedTo = "Files";
  const file = /* @__PURE__ */ __name((section, segId) => env.DB.prepare("UPDATE files SET section=?, segment_id=? WHERE id=?").bind(section, segId, item.file_id).run(), "file");
  if (!b.plain) {
    if (type === "menu" && target) {
      const f = await env.DB.prepare("SELECT title FROM food_items WHERE id=?").bind(target).first();
      if (!f)
        return json({ error: "food item not found" }, 404);
      await file("menu", target);
      filedTo = "Food · " + f.title;
    } else if (type === "proof" && target) {
      const d = await env.DB.prepare("SELECT title FROM design_items WHERE id=?").bind(target).first();
      if (!d)
        return json({ error: "design item not found" }, 404);
      await file("proof", target);
      const last = await env.DB.prepare("SELECT COALESCE(MAX(version),0) AS v FROM design_proofs WHERE item_id=?").bind(target).first();
      const v = (last?.v || 0) + 1;
      await env.DB.prepare("INSERT INTO design_proofs (item_id, file_id, version, decision, uploaded_by) VALUES (?,?,?,'pending',?)").bind(target, item.file_id, v, by).run();
      await env.DB.prepare("UPDATE design_items SET status='awaiting_approval', updated_at=datetime('now') WHERE id=?").bind(target).run();
      filedTo = "Design · " + d.title + " · v" + v;
    } else if (type === "contract" && target) {
      const t = await env.DB.prepare("SELECT title FROM talent_items WHERE id=?").bind(target).first();
      if (!t)
        return json({ error: "talent item not found" }, 404);
      await env.DB.prepare("UPDATE talent_items SET stage='signed', updated_at=datetime('now') WHERE id=?").bind(target).run();
      await file("general", null);
      filedTo = "Contracts · " + t.title + " · signed";
    } else if (["rider", "bio", "map"].includes(type) && target) {
      const s2 = await env.DB.prepare("SELECT title, brief_av FROM segments WHERE id=?").bind(target).first();
      if (!s2)
        return json({ error: "session not found" }, 404);
      await file("content", target);
      if (type === "rider" && !s2.brief_av)
        await env.DB.prepare("UPDATE segments SET brief_av=? WHERE id=?").bind("See " + item.name + " (tech rider).", target).run();
      filedTo = "Session · " + s2.title;
    } else {
      filedTo = { quote: "Files · quotes", invoice: "Files · invoices", guests: "Files · guest lists (import them in the classic dashboard)", transport: "Files · transport", runsheet: "Files · run sheets", exhibitors: "Files · organizations fair" }[type] || "Files";
    }
  }
  await env.DB.prepare("UPDATE inbox_items SET state='filed', type=?, target=?, filed_to=?, filed_by=?, filed_at=datetime('now') WHERE id=?").bind(type, target, filedTo, by, item.id).run();
  return json({ ok: true, filed_to: filedTo });
}
__name(handleInboxApply, "handleInboxApply");
// ---- Driver app: bus runs, stops, passenger counts per hotel and production contacts. No guest names. ----
var DRIVER_DAYS = { 1: "2026-10-20", 2: "2026-10-21", 3: "2026-10-22" };
async function driverState(env) {
  const q = async (sql) => {
    try {
      return (await env.DB.prepare(sql).all()).results;
    } catch (e) {
      return [];
    }
  };
  const runs = (await q("SELECT * FROM transport_runs ORDER BY day, depart_time")).map((r) => ({
    id: r.id, day: r.day, depart_time: r.depart_time, arrive_time: r.arrive_time, title: r.title, title_he: r.title_he,
    destination: r.destination, destination_he: r.destination_he, linked_segment: r.linked_segment, vehicles: r.vehicles,
    capacity: r.capacity, driver: r.driver, driver_phone: r.driver_phone, company: r.company, escort: r.escort,
    driver_note: r.driver_note || "", dropoff: r.dropoff || "", dropoff_url: r.dropoff_url || ""
  }));
  const stops = await q("SELECT run_id, time, stop_label, hotel_match, sort_order FROM run_stops ORDER BY run_id, sort_order");
  const segments = await q("SELECT id, day, time, end_time, title, title_he, venue, venue_he FROM segments ORDER BY day, time");
  const contacts = await q("SELECT name, role, phone FROM team WHERE org='Production' AND phone<>'' AND (role LIKE 'Lead producer%' OR role LIKE '%site manager%' OR role LIKE 'Hotel group leader%') ORDER BY id");
  const stays = await q("SELECT hotel, checkin, checkout FROM guests WHERE status='active' AND hotel<>''");
  const counts = {};
  for (const [day, date] of Object.entries(DRIVER_DAYS)) {
    counts[day] = {};
    for (const g of stays)
      if (g.checkin && g.checkout && g.checkin <= date && g.checkout >= date)
        counts[day][g.hotel] = (counts[day][g.hotel] || 0) + 1;
  }
  return { level: "driver", runs, stops, segments, contacts, counts };
}
var FIELD_PAGES = { leader: "/leader", av: "/av", crew: "/crew" };
var normName = (x) => String(x || "").toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
// who is asking: the name typed at login must match a production team member (full name, or a first name only one person has)
async function fieldPerson(env, request, roleLike) {
  const want = normName(decodeURIComponent(request.headers.get("x-name") || ""));
  if (!want)
    return null;
  const rows = (await env.DB.prepare("SELECT id, name, role, phone FROM team WHERE org='Production'").all()).results.filter((r) => roleLike(r.role || ""));
  const full = rows.filter((r) => normName(r.name) === want);
  if (full.length === 1)
    return full[0];
  const first = rows.filter((r) => normName(r.name).split(" ")[0] === want);
  return first.length === 1 ? first[0] : null;
}
async function fieldCommon(env) {
  const q = async (sql) => {
    try {
      return (await env.DB.prepare(sql).all()).results;
    } catch (e) {
      return [];
    }
  };
  const d = await driverState(env);
  const team = await q("SELECT name, role, phone FROM team WHERE org='Production' AND phone<>'' ORDER BY id");
  return { q, runs: d.runs, stops: d.stops, segments: d.segments, counts: d.counts, team };
}
var isLeaderRole = (r) => /^Hotel group leader/i.test(r);
var isCrewRole = (r) => /site manager|assistant producer|lead producer|setup|strike|design/i.test(r);
async function leaderState(env, me) {
  const c = await fieldCommon(env);
  const hotelKey = normName((me.role.split("·")[1] || "").replace(/hotel/i, ""));
  const guests = (await c.q("SELECT id, party_id, first_name, last_name, ptype, country, phone, dietary, dietary_severe, hotel, room_type, checkin, checkout, early_late, guest_note FROM guests WHERE status='active' AND hotel<>'' ORDER BY last_name, first_name"))
    .filter((g) => hotelKey && normName(g.hotel).includes(hotelKey));
  const ids = new Set(guests.map((g) => g.id));
  const sessions = (await c.q("SELECT guest_id, segment_id FROM guest_sessions WHERE attending=1")).filter((x) => ids.has(x.guest_id));
  const hotels = [...new Set(guests.map((g) => g.hotel))];
  const runIds = new Set(c.stops.filter((s) => hotels.includes(s.hotel_match)).map((s) => s.run_id));
  const first = normName(me.name).split(" ")[0];
  const runs = c.runs.filter((r) => runIds.has(r.id) || normName(r.escort).includes(first));
  const boarded = (await c.q("SELECT guest_id, day FROM boarding")).filter((x) => ids.has(x.guest_id));
  const shifts = (await c.q("SELECT id, day, start_min, end_min, title, site, kind, crew_json, note FROM crew_shifts ORDER BY day, start_min, sort_order")).filter((x) => normName(x.crew_json).includes(normName(me.name)));
  return { level: "leader", me: { name: me.name, role: me.role }, hotels, guests, sessions, boarded, runs, stops: c.stops.filter((s) => runs.some((r) => r.id === s.run_id)), segments: c.segments, shifts, contacts: c.team.filter((t) => /Lead producer|site manager|Hotel group leader/i.test(t.role) && t.name !== me.name) };
}
var AV_SUPPLIER = /שוסטר|shuster|schuster/i;
async function avState(env) {
  const c = await fieldCommon(env);
  const segments = await c.q("SELECT id, day, time, end_time, title, title_he, venue, venue_he, brief_runsheet, brief_av, brief_staging, brief_location FROM segments ORDER BY day, time, sort_order");
  const needs = (await c.q("SELECT id, venue, area, item, qty, supplier, notes, segment_ids, kind, done FROM site_needs ORDER BY sort_order, id")).filter((n) => AV_SUPPLIER.test(n.supplier || "") || n.kind === "podium");
  const screens = await c.q("SELECT id, title, title_he, size, spec, brief, status, linked_segment FROM design_items WHERE id LIKE 'd-screen%' OR category LIKE '%screen%' OR category LIKE '%מסך%' ORDER BY sort_order, id");
  const files = await c.q("SELECT id, filename, size, segment_id FROM files WHERE section='content' AND segment_id IS NOT NULL ORDER BY uploaded_at");
  const shifts = (await c.q("SELECT id, day, start_min, end_min, title, site, kind, crew_json, note FROM crew_shifts ORDER BY day, start_min, sort_order")).filter((x) => /sound|av\b|tech|טכני|סאונד|הגברה|מסך|screen|stage|במה/i.test(x.title + " " + (x.note || "")));
  const venues = await c.q("SELECT name, role, phone, venue FROM contacts WHERE phone<>'' AND (role LIKE '%אתר%' OR role LIKE '%טכני%') ORDER BY venue");
  return { level: "av", segments, needs, screens, files, shifts, venues, contacts: c.team.filter((t) => /Lead producer|site manager/i.test(t.role)) };
}
async function crewState(env, me) {
  const c = await fieldCommon(env);
  const segments = await c.q("SELECT id, day, time, end_time, title, title_he, venue, venue_he, brief_runsheet, brief_location, brief_staging, brief_materials, notes_logistics FROM segments ORDER BY day, time, sort_order");
  const needs = await c.q("SELECT id, venue, area, item, qty, supplier, notes, segment_ids, kind, done FROM site_needs ORDER BY sort_order, id");
  const shifts = await c.q("SELECT id, day, start_min, end_min, title, site, kind, crew_json, flag, note, done FROM crew_shifts ORDER BY day, start_min, sort_order");
  const food = await c.q("SELECT id, segment_id, day, time, title, venue, meal_type, caterer, headcount, dietary_note FROM food_items ORDER BY day, time");
  const att = await c.q("SELECT segment_id, count(*) n FROM guest_sessions WHERE attending=1 GROUP BY segment_id");
  const venues = await c.q("SELECT name, role, phone, venue FROM contacts WHERE phone<>'' ORDER BY venue, name");
  return { level: "crew", me: { name: me.name, role: me.role }, segments, needs, shifts, food, attendance: att, runs: c.runs, stops: c.stops, counts: c.counts, venues, contacts: c.team.filter((t) => t.name !== me.name) };
}
var src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path.startsWith("/api/")) {
      let level = await authLevel(request, env, url);
      // the chief key is an admin key that also opens the budget sheet
      const chief = level === "chief";
      if (chief)
        level = "admin";
      if (!level)
        return json({ error: "unauthorized" }, 401);
      if (level === "driver") {
        if (path.startsWith("/api/access/")) {
          const res = await handleAccess(path, request, env, level);
          if (res)
            return res;
        }
        if (path === "/api/state" && request.method === "GET")
          return json({ level, redirect: "/driver" });
        if (path === "/api/driver/state" && request.method === "GET")
          return json(await driverState(env));
        if (path === "/api/driver/position" && request.method === "POST") {
          const b = await readBody(request);
          const device = (b.device || "").toString().replace(/[^\w-]/g, "").slice(0, 40);
          if (!device)
            return json({ error: "device required" }, 400);
          if (b.stop) {
            await env.DB.prepare("UPDATE driver_positions SET sharing=0, at=datetime('now') WHERE device=?").bind(device).run();
            return json({ ok: true });
          }
          const lat = Number(b.lat), lng = Number(b.lng), num = (v) => Number.isFinite(Number(v)) && v !== null && v !== "" ? Number(v) : null;
          // any real coordinate (0,0 is a failed reading)
          if (!(lat >= -90 && lat <= 90) || !(lng >= -180 && lng <= 180) || (lat === 0 && lng === 0))
            return json({ error: "position out of range" }, 400);
          await env.DB.prepare("INSERT OR REPLACE INTO driver_positions (device, name, run_id, lat, lng, accuracy, speed, heading, sharing, at) VALUES (?,?,?,?,?,?,?,?,1,datetime('now'))").bind(device, (b.name || "").toString().trim().slice(0, 80), (b.run_id || "").toString().slice(0, 40), lat, lng, num(b.accuracy), num(b.speed), num(b.heading)).run();
          await env.DB.prepare("DELETE FROM driver_positions WHERE at < datetime('now','-2 days')").run();
          return json({ ok: true });
        }
        return json({ error: "drivers only see the driver page" }, 403);
      }
      if (FIELD_PAGES[level]) {
        if (path.startsWith("/api/access/")) {
          const res = await handleAccess(path, request, env, level);
          if (res)
            return res;
        }
        if (path === "/api/state" && request.method === "GET")
          return json({ level, redirect: FIELD_PAGES[level] });
        const me = level === "leader" ? await fieldPerson(env, request, isLeaderRole) : level === "crew" ? await fieldPerson(env, request, isCrewRole) : null;
        if (level !== "av" && !me)
          return json({ error: "name not found" }, 403);
        if (path === `/api/${level}/state` && request.method === "GET")
          return json(level === "leader" ? await leaderState(env, me) : level === "crew" ? await crewState(env, me) : await avState(env));
        // group leader: mark a guest of her hotel as on board for the day
        if (level === "leader" && path === "/api/leader/board" && request.method === "POST") {
          const b = await readBody(request);
          const st = await leaderState(env, me);
          const gid = Number(b.guest_id), day = Number(b.day);
          if (!st.guests.some((g) => g.id === gid) || ![1, 2, 3].includes(day))
            return json({ error: "not your guest" }, 403);
          if (b.on)
            await env.DB.prepare("INSERT OR REPLACE INTO boarding (guest_id, day, by, at) VALUES (?,?,?,datetime('now'))").bind(gid, day, me.name).run();
          else
            await env.DB.prepare("DELETE FROM boarding WHERE guest_id=? AND day=?").bind(gid, day).run();
          return json({ ok: true });
        }
        // AV and crew tick off site needs (AV: only Shuster's); crew also tick off shifts
        if ((level === "av" || level === "crew") && path === "/api/field/done" && request.method === "POST") {
          const b = await readBody(request);
          const on = b.done ? 1 : 0;
          if (b.kind === "need") {
            const n = await env.DB.prepare("SELECT supplier, kind FROM site_needs WHERE id=?").bind(String(b.id || "")).first();
            if (!n || level === "av" && !(AV_SUPPLIER.test(n.supplier || "") || n.kind === "podium"))
              return json({ error: "not allowed" }, 403);
            await env.DB.prepare("UPDATE site_needs SET done=?, updated_at=datetime('now') WHERE id=?").bind(on, String(b.id)).run();
            return json({ ok: true });
          }
          if (b.kind === "shift" && level === "crew") {
            const r = await env.DB.prepare("UPDATE crew_shifts SET done=?, updated_at=datetime('now') WHERE id=?").bind(on, String(b.id || "")).run();
            return r.meta.changes ? json({ ok: true }) : json({ error: "not found" }, 404);
          }
          return json({ error: "bad kind" }, 400);
        }
        // presentations and run-sheet files linked to an event
        if ((level === "av" || level === "crew") && path === "/api/files/download" && request.method === "GET") {
          const row = await env.DB.prepare("SELECT r2_key, filename, content_type FROM files WHERE id=? AND section='content'").bind(url.searchParams.get("id")).first();
          if (!row || !env.BUCKET)
            return json({ error: "not found" }, 404);
          const obj = await env.BUCKET.get(row.r2_key);
          if (!obj)
            return json({ error: "not found" }, 404);
          return new Response(obj.body, { headers: { "content-type": row.content_type || "application/octet-stream", "content-disposition": `attachment; filename*=UTF-8''${encodeURIComponent(row.filename)}`, "cache-control": "private, no-store" } });
        }
        return json({ error: "this key only opens its own page" }, 403);
      }
      if (path === "/api/session" && request.method === "POST") {
        const res = json({ ok: true, level });
        res.headers.append("set-cookie", await makeSessionCookie(level, env));
        return res;
      }
      const admin = level === "admin";
      if (path.startsWith("/api/access/")) {
        const res = await handleAccess(path, request, env, level);
        if (res)
          return res;
      }
      if (level === "view") {
        if (path === "/api/state" && request.method === "GET") {
          try {
            const segs = await env.DB.prepare(
              "SELECT id, day, time, end_time, title, venue, descr, title_he, venue_he, descr_he FROM segments ORDER BY day, time, sort_order"
            ).all();
            let vRuns = { results: [] };
            try {
              vRuns = await env.DB.prepare(
                "SELECT id, day, depart_time, arrive_time, title, title_he, destination, destination_he, linked_segment, pdf_hide FROM transport_runs WHERE pdf_hide=0 ORDER BY day, sort_order"
              ).all();
            } catch (e) {
            }
            let vStops = { results: [] };
            try {
              vStops = await env.DB.prepare(
                "SELECT id, run_id, time, stop_label, hotel_match, sort_order FROM run_stops ORDER BY run_id, sort_order"
              ).all();
            } catch (e) {
            }
            return json({
              level: "view",
              segments: segs.results,
              people: [],
              checklist: [],
              venues: [],
              contacts: [],
              guests: [],
              transport_runs: vRuns.results,
              run_stops: vStops.results
            });
          } catch (e) {
            console.error("api error", path, e);
            return json({ error: "server error" }, 500);
          }
        }
        if (path === "/api/ai/ask" && request.method === "POST")
          return await handleAsk(request, env, "view");
        return json({ error: "forbidden" }, 403);
      }
      try {
        if (path === "/api/state" && request.method === "GET") {
          const segs = await env.DB.prepare(
            "SELECT * FROM segments ORDER BY day, time, sort_order"
          ).all();
          const ppl = await env.DB.prepare(
            "SELECT * FROM people ORDER BY id"
          ).all();
          const checks = await env.DB.prepare(
            "SELECT * FROM checklist ORDER BY segment_id, sort_order, id"
          ).all();
          let venues = { results: [] };
          try {
            venues = await env.DB.prepare("SELECT * FROM venue_contacts").all();
          } catch (e) {
          }
          let contacts = { results: [] };
          try {
            contacts = await env.DB.prepare("SELECT * FROM contacts ORDER BY name").all();
          } catch (e) {
          }
          let team = { results: [] };
          try {
            team = await env.DB.prepare("SELECT * FROM team ORDER BY name").all();
          } catch (e) {
          }
          let timeline = { results: [] };
          try {
            timeline = await env.DB.prepare("SELECT * FROM timeline ORDER BY due_date, sort_hint, id").all();
          } catch (e) {
          }
          let foodItems = { results: [] };
          try {
            foodItems = await env.DB.prepare(
              `SELECT f.*, mf.id AS file_id, mf.filename AS file_name, mf.content_type AS file_type
               FROM food_items f
               LEFT JOIN (
                 SELECT segment_id, id, filename, content_type,
                        ROW_NUMBER() OVER (PARTITION BY segment_id ORDER BY uploaded_at DESC, id DESC) AS rn
                 FROM files WHERE section='menu'
               ) mf ON mf.segment_id = f.id AND mf.rn = 1
               ORDER BY f.day, f.sort_order`
            ).all();
          } catch (e) {
          }
          let dietary = { results: [] };
          try {
            dietary = await env.DB.prepare("SELECT * FROM dietary ORDER BY id").all();
          } catch (e) {
          }
          let guests = { results: [] };
          try {
            const cols = admin ? "*" : GUEST_OPS_COLUMNS.join(", ");
            guests = await env.DB.prepare(`SELECT ${cols} FROM guests ORDER BY last_name, first_name`).all();
          } catch (e) {
          }
          let guestSessions = { results: [] };
          try {
            guestSessions = await env.DB.prepare("SELECT * FROM guest_sessions WHERE attending=1").all();
          } catch (e) {
          }
          let designItems = { results: [] };
          try {
            designItems = await env.DB.prepare("SELECT * FROM design_items ORDER BY sort_order").all();
          } catch (e) {
          }
          let designProofs = { results: [] };
          try {
            designProofs = await env.DB.prepare(
              `SELECT p.*, f.filename AS file_name, f.content_type AS file_type
               FROM design_proofs p LEFT JOIN files f ON f.id = p.file_id
               ORDER BY p.item_id, p.version DESC`
            ).all();
          } catch (e) {
          }
          let giftItems = { results: [] };
          try {
            giftItems = await env.DB.prepare("SELECT * FROM gift_items ORDER BY sort_order").all();
          } catch (e) {
          }
          let runs = { results: [] };
          try {
            runs = await env.DB.prepare("SELECT * FROM transport_runs ORDER BY day, sort_order").all();
          } catch (e) {
          }
          let runStops = { results: [] };
          try {
            runStops = await env.DB.prepare("SELECT * FROM run_stops ORDER BY run_id, sort_order").all();
          } catch (e) {
          }
          let crewShifts = { results: [] };
          try {
            crewShifts = await env.DB.prepare("SELECT * FROM crew_shifts ORDER BY day, start_min, sort_order").all();
          } catch (e) {
          }
          let inboxItems = { results: [] };
          try {
            inboxItems = await env.DB.prepare("SELECT * FROM inbox_items WHERE state IN ('review','filed') ORDER BY id DESC LIMIT 100").all();
          } catch (e) {
          }
          let furnitureItems = { results: [] };
          try {
            furnitureItems = await env.DB.prepare("SELECT * FROM furniture_items ORDER BY sort_order, id").all();
          } catch (e) {
          }
          let siteNeeds = { results: [] };
          try {
            siteNeeds = await env.DB.prepare("SELECT * FROM site_needs ORDER BY sort_order, id").all();
          } catch (e) {
          }
          let fairOrgs = { results: [] };
          try {
            fairOrgs = await env.DB.prepare("SELECT * FROM fair_orgs ORDER BY sort_order, name").all();
          } catch (e) {
          }
          let dayGuests = { results: [] };
          try {
            dayGuests = await env.DB.prepare(`SELECT ${admin ? "*" : "id, first_name, last_name, desk, sessions, note, updated_at"} FROM day_guests ORDER BY last_name, first_name`).all();
          } catch (e) {
          }
          let cateringQuotes = { results: [] };
          if (admin) {
            try {
              cateringQuotes = await env.DB.prepare("SELECT * FROM catering_quotes ORDER BY sort_order, id").all();
            } catch (e) {
            }
          }
          let talentItems = { results: [] };
          if (admin) {
            try {
              talentItems = await env.DB.prepare("SELECT * FROM talent_items ORDER BY sort_order").all();
            } catch (e) {
            }
          }
          return json({
            level,
            chief,
            segments: segs.results,
            people: ppl.results,
            checklist: checks.results,
            venues: venues.results,
            contacts: contacts.results,
            team: team.results,
            timeline: timeline.results,
            food_items: foodItems.results,
            dietary: dietary.results,
            guests: guests.results,
            guest_sessions: guestSessions.results,
            design_items: designItems.results,
            design_proofs: designProofs.results,
            transport_runs: runs.results,
            run_stops: runStops.results,
            gift_items: giftItems.results,
            crew_shifts: crewShifts.results,
            talent_items: talentItems.results,
            fair_orgs: fairOrgs.results,
            day_guests: dayGuests.results,
            catering_quotes: cateringQuotes.results,
            furniture_items: furnitureItems.results,
            site_needs: siteNeeds.results,
            inbox_items: inboxItems.results
          });
        }
        if (path === "/api/segment/status" && request.method === "POST") {
          const b = await readBody(request);
          if (!["open", "progress", "confirmed"].includes(b.status))
            return json({ error: "bad status" }, 400);
          await env.DB.prepare("UPDATE segments SET status=? WHERE id=?").bind(b.status, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/segment/notes" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("UPDATE segments SET notes=? WHERE id=?").bind(b.notes || "", b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/segment/desc" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("UPDATE segments SET descr=? WHERE id=?").bind((b.descr || "").slice(0, 2e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/segment/field" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["title", "venue", "descr", "title_he", "venue_he", "descr_he", "descr_long", "descr_long_he"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          await env.DB.prepare(`UPDATE segments SET ${b.field}=? WHERE id=?`).bind((b.value || "").slice(0, 5e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/segment/edit" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.id)
            return json({ error: "missing id" }, 400);
          await env.DB.prepare(
            "UPDATE segments SET day=?, time=?, end_time=?, title=?, venue=? WHERE id=?"
          ).bind(
            parseInt(b.day) || 1,
            (b.time || "").slice(0, 10),
            (b.end_time || "").slice(0, 10),
            (b.title || "Untitled").slice(0, 300),
            (b.venue || "").slice(0, 300),
            b.id
          ).run();
          return json({ ok: true });
        }
        if (path === "/api/segment/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const id = "seg-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
          const mx = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM segments").first();
          const order = (mx?.m || 0) + 1;
          await env.DB.prepare(
            "INSERT INTO segments (id, day, time, end_time, title, venue, descr, status, is_meal, sort_order) VALUES (?,?,?,?,?,?,?, 'open', 0, ?)"
          ).bind(
            id,
            parseInt(b.day) || 1,
            (b.time || "09:00").slice(0, 10),
            (b.end_time || "10:00").slice(0, 10),
            (b.title || "New event").slice(0, 300),
            (b.venue || "").slice(0, 300),
            (b.descr || "").slice(0, 2e3),
            order
          ).run();
          return json({ ok: true, id });
        }
        if (path === "/api/segment/duplicate" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const s = await env.DB.prepare("SELECT * FROM segments WHERE id=?").bind(b.id).first();
          if (!s)
            return json({ error: "not found" }, 404);
          const newId = "seg-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
          await env.DB.prepare(
            "UPDATE segments SET sort_order = sort_order + 1 WHERE sort_order > ?"
          ).bind(s.sort_order).run();
          await env.DB.prepare(
            "INSERT INTO segments (id, day, time, end_time, title, venue, descr, status, is_meal, notes, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
          ).bind(
            newId,
            s.day,
            s.time,
            s.end_time,
            s.title + " (copy)",
            s.venue,
            s.descr,
            "open",
            s.is_meal,
            "",
            s.sort_order + 1
          ).run();
          const ppl = await env.DB.prepare("SELECT name, confirmed FROM people WHERE segment_id=?").bind(b.id).all();
          for (const p of ppl.results) {
            await env.DB.prepare("INSERT INTO people (segment_id, name, confirmed) VALUES (?,?,?)").bind(newId, p.name, 0).run();
          }
          return json({ ok: true, id: newId });
        }
        if (path === "/api/segment/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM people WHERE segment_id=?").bind(b.id).run();
          await env.DB.prepare("DELETE FROM checklist WHERE segment_id=?").bind(b.id).run();
          await env.DB.prepare("DELETE FROM segments WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/venue/contacts" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.venue)
            return json({ error: "missing venue" }, 400);
          await env.DB.prepare(
            "INSERT INTO venue_contacts (venue, contacts) VALUES (?, ?) ON CONFLICT(venue) DO UPDATE SET contacts=excluded.contacts"
          ).bind(b.venue, (b.contacts || "").slice(0, 3e3)).run();
          return json({ ok: true });
        }
        if (path === "/api/person/toggle" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare(
            "UPDATE people SET confirmed = 1 - confirmed WHERE id=?"
          ).bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/person/add" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.name || !b.segment_id)
            return json({ error: "missing" }, 400);
          const r = await env.DB.prepare(
            "INSERT INTO people (segment_id,name,confirmed) VALUES (?,?,0)"
          ).bind(b.segment_id, b.name.slice(0, 200)).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/person/edit" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.id || !b.name || !b.name.trim())
            return json({ error: "missing" }, 400);
          await env.DB.prepare("UPDATE people SET name=? WHERE id=?").bind(b.name.trim().slice(0, 200), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/person/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM people WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/check/toggle" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare(
            "UPDATE checklist SET done = 1 - done WHERE id=?"
          ).bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/check/add" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.text || !b.text.trim())
            return json({ error: "empty" }, 400);
          const r = await env.DB.prepare(
            "INSERT INTO checklist (segment_id,text,done,seeded,created_by) VALUES (?,?,0,0,?)"
          ).bind(b.segment_id || null, b.text.trim().slice(0, 500), (b.by || "").slice(0, 60)).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/check/delete" && request.method === "POST") {
          const b = await readBody(request);
          const row = await env.DB.prepare("SELECT seeded FROM checklist WHERE id=?").bind(b.id).first();
          if (!row)
            return json({ error: "not found" }, 404);
          if (row.seeded === 1 && !admin)
            return json({ error: "admin required to delete seeded items" }, 403);
          await env.DB.prepare("DELETE FROM checklist WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/admin/reset" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          await env.DB.prepare("DELETE FROM checklist WHERE seeded=0").run();
          return json({ ok: true });
        }
        if (path === "/api/grid" && request.method === "GET") {
          if (!chief)
            return json({ error: "chief key required" }, 403);
          let row;
          try {
            row = await env.DB.prepare("SELECT columns, rows FROM admin_grid WHERE id=1").first();
          } catch (e) {
            return json({ error: "grid table missing \u2014 run migrate-files.sql" }, 500);
          }
          if (!row)
            return json({ tabs: [{ name: "Sheet 1", columns: ["Item", "Owner", "Status", "Notes"], rows: [] }] });
          if (row.columns === "__TABS__") {
            let tabs;
            try {
              tabs = JSON.parse(row.rows);
            } catch (e) {
              tabs = [];
            }
            if (!Array.isArray(tabs) || !tabs.length)
              tabs = [{ name: "Sheet 1", columns: ["Item", "Owner", "Status", "Notes"], rows: [] }];
            return json({ tabs });
          }
          return json({ tabs: [{ name: "Budget", columns: JSON.parse(row.columns), rows: JSON.parse(row.rows) }] });
        }
        if (path === "/api/grid" && request.method === "POST") {
          if (!chief)
            return json({ error: "chief key required" }, 403);
          const b = await readBody(request);
          const tabs = JSON.stringify(b.tabs || []);
          if (tabs.length > 3e6)
            return json({ error: "grid too large" }, 413);
          await env.DB.prepare(
            "UPDATE admin_grid SET columns='__TABS__', rows=?, updated_at=datetime('now'), updated_by=? WHERE id=1"
          ).bind(tabs, (b.by || "").slice(0, 60)).run();
          return json({ ok: true });
        }
        if (path === "/api/files" && request.method === "GET") {
          const section = url.searchParams.get("section");
          const segId = url.searchParams.get("segment_id");
          let q = "SELECT id, filename, content_type, size, section, segment_id, uploaded_by, uploaded_at FROM files";
          const clauses = [], binds = [];
          if (section) {
            clauses.push("section=?");
            binds.push(section);
          }
          if (segId) {
            clauses.push("segment_id=?");
            binds.push(segId);
          }
          if (clauses.length)
            q += " WHERE " + clauses.join(" AND ");
          q += " ORDER BY uploaded_at DESC";
          let res;
          try {
            res = await env.DB.prepare(q).bind(...binds).all();
          } catch (e) {
            return json({ error: "files table missing \u2014 run migrate-files.sql" }, 500);
          }
          return json({ files: res.results });
        }
        if (path === "/api/files/upload" && request.method === "POST") {
          if (!env.BUCKET)
            return json({ error: "R2 bucket not bound \u2014 see setup" }, 500);
          const form = await request.formData();
          const file = form.get("file");
          if (!file || typeof file === "string")
            return json({ error: "no file" }, 400);
          const section = (form.get("section") || "general").toString();
          if (!UPLOAD_SECTIONS.includes(section))
            return json({ error: "bad section" }, 400);
          if (!file.size || file.size > MAX_UPLOAD_BYTES)
            return json({ error: "file must be under 25 MB" }, 413);
          const name = (file.name || "upload").replace(/[\/\\\x00-\x1f\x7f]/g, "_").slice(0, 200);
          const ext = (name.match(/\.([a-z0-9]+)$/i) || [])[1]?.toLowerCase();
          const ctype = UPLOAD_TYPES[ext];
          if (!ctype)
            return json({ error: "file type not allowed (PDF, images, Office documents, CSV or text only)" }, 415);
          const segId = form.get("segment_id") ? form.get("segment_id").toString().slice(0, 100) : null;
          const by = (form.get("by") || "").toString().slice(0, 60);
          const key = `${section}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name}`;
          await env.BUCKET.put(key, file.stream(), {
            httpMetadata: { contentType: ctype }
          });
          const r = await env.DB.prepare(
            "INSERT INTO files (r2_key, filename, content_type, size, section, segment_id, uploaded_by) VALUES (?,?,?,?,?,?,?)"
          ).bind(key, name, ctype, file.size, section, segId, by).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/files/download" && request.method === "GET") {
          const id = url.searchParams.get("id");
          const inline = url.searchParams.get("inline") === "1";
          const row = await env.DB.prepare("SELECT r2_key, filename, content_type FROM files WHERE id=?").bind(id).first();
          if (!row)
            return json({ error: "not found" }, 404);
          if (!env.BUCKET)
            return json({ error: "R2 bucket not bound" }, 500);
          const obj = await env.BUCKET.get(row.r2_key);
          if (!obj)
            return json({ error: "file missing in storage" }, 404);
          const ctype = (row.content_type || "").toLowerCase();
          const safeInline = inline && INLINE_TYPES.includes(ctype);
          const headers = new Headers();
          headers.set("content-type", safeInline ? ctype : ctype || "application/octet-stream");
          headers.set("content-disposition", `${safeInline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(row.filename)}`);
          headers.set("x-content-type-options", "nosniff");
          headers.set("cache-control", "private, max-age=60");
          return new Response(obj.body, { headers });
        }
        if (path === "/api/files/delete" && request.method === "POST") {
          const b = await readBody(request);
          const row = await env.DB.prepare("SELECT r2_key FROM files WHERE id=?").bind(b.id).first();
          if (!row)
            return json({ error: "not found" }, 404);
          if (env.BUCKET) {
            try {
              await env.BUCKET.delete(row.r2_key);
            } catch (e) {
            }
          }
          await env.DB.prepare("DELETE FROM files WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/run/field" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["depart_time", "arrive_time", "title", "title_he", "destination", "destination_he", "linked_segment", "vehicles", "capacity", "driver", "driver_phone", "company", "escort", "notes", "status", "pdf_hide", "driver_note", "dropoff", "dropoff_url"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          if (b.field === "dropoff_url" && b.value && !/^https?:\/\//i.test(String(b.value).trim()))
            return json({ error: "map link must start with https://" }, 400);
          await env.DB.prepare(`UPDATE transport_runs SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind((b.value ?? "").toString().slice(0, 4e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/run/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.title || !b.title.trim())
            return json({ error: "title required" }, 400);
          const id = "r-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
          const mx = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM transport_runs").first();
          await env.DB.prepare(
            "INSERT INTO transport_runs (id,day,depart_time,title,title_he,destination,status,sort_order) VALUES (?,?,?,?,?,?,'no_driver',?)"
          ).bind(
            id,
            parseInt(b.day) || 1,
            (b.depart_time || "").slice(0, 10),
            b.title.trim().slice(0, 200),
            (b.title_he || "").slice(0, 200),
            (b.destination || "").slice(0, 200),
            (mx?.m || 0) + 1
          ).run();
          return json({ ok: true, id });
        }
        if (path === "/api/run/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM run_stops WHERE run_id=?").bind(b.id).run();
          await env.DB.prepare("DELETE FROM transport_runs WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/stop/add" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.run_id)
            return json({ error: "missing run_id" }, 400);
          const mx = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM run_stops WHERE run_id=?").bind(b.run_id).first();
          const r = await env.DB.prepare(
            "INSERT INTO run_stops (run_id,time,stop_label,hotel_match,sort_order) VALUES (?,?,?,?,?)"
          ).bind(
            b.run_id,
            (b.time || "").slice(0, 10),
            (b.stop_label || "").slice(0, 200),
            (b.hotel_match || "").slice(0, 200),
            (mx?.m || 0) + 1
          ).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/stop/field" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["time", "stop_label", "hotel_match"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          await env.DB.prepare(`UPDATE run_stops SET ${b.field}=? WHERE id=?`).bind((b.value ?? "").toString().slice(0, 200), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/stop/delete" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM run_stops WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/gift/field" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["category", "category_he", "title", "title_he", "qty", "supplier", "cost", "status", "notes", "notes_he", "deadline"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          await env.DB.prepare(`UPDATE gift_items SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind((b.value ?? "").toString().slice(0, 3e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/gift/chosen" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.id)
            return json({ error: "missing id" }, 400);
          await env.DB.prepare("UPDATE gift_items SET chosen=?, updated_at=datetime('now') WHERE id=?").bind(b.chosen ? 1 : 0, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/gift/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.title || !b.title.trim())
            return json({ error: "title required" }, 400);
          const id = "g-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
          const mx = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM gift_items").first();
          await env.DB.prepare(
            "INSERT INTO gift_items (id,category,category_he,title,title_he,qty,deadline,sort_order) VALUES (?,?,?,?,?,?,?,?)"
          ).bind(id, (b.category || "").slice(0, 60), (b.category_he || "").slice(0, 60), b.title.trim().slice(0, 200), (b.title_he || "").slice(0, 200), (b.qty || "").slice(0, 40), (b.deadline || "").slice(0, 20), (mx?.m || 0) + 1).run();
          return json({ ok: true, id });
        }
        if (path === "/api/gift/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM gift_items WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/design/field" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["title", "title_he", "category", "qty", "size", "spec", "status", "brief", "notes", "design_cost", "print_cost", "supplier", "deadline", "linked_segment"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          await env.DB.prepare(`UPDATE design_items SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind((b.value ?? "").toString().slice(0, 6e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/design/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.title || !b.title.trim())
            return json({ error: "title required" }, 400);
          const id = "d-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
          const mx = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM design_items").first();
          await env.DB.prepare(
            "INSERT INTO design_items (id,title,title_he,category,qty,size,spec,status,sort_order) VALUES (?,?,?,?,?,?,?,'content_missing',?)"
          ).bind(
            id,
            b.title.trim().slice(0, 200),
            (b.title_he || "").slice(0, 200),
            (b.category || "print").slice(0, 20),
            (b.qty || "").slice(0, 40),
            (b.size || "").slice(0, 60),
            (b.spec || "").slice(0, 200),
            (mx?.m || 0) + 1
          ).run();
          return json({ ok: true, id });
        }
        if (path === "/api/design/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM design_proofs WHERE item_id=?").bind(b.id).run();
          await env.DB.prepare("DELETE FROM design_items WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/design/proof" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.item_id || !b.file_id)
            return json({ error: "missing item_id or file_id" }, 400);
          const last = await env.DB.prepare("SELECT COALESCE(MAX(version),0) AS v FROM design_proofs WHERE item_id=?").bind(b.item_id).first();
          const v = (last?.v || 0) + 1;
          const r = await env.DB.prepare(
            "INSERT INTO design_proofs (item_id, file_id, version, decision, uploaded_by) VALUES (?,?,?,'pending',?)"
          ).bind(b.item_id, b.file_id, v, (b.by || "").slice(0, 60)).run();
          await env.DB.prepare("UPDATE design_items SET status='awaiting_approval', updated_at=datetime('now') WHERE id=?").bind(b.item_id).run();
          return json({ ok: true, id: r.meta.last_row_id, version: v });
        }
        if (path === "/api/design/decide" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.proof_id || !["approved", "changes"].includes(b.decision))
            return json({ error: "bad decision" }, 400);
          const proof = await env.DB.prepare("SELECT * FROM design_proofs WHERE id=?").bind(b.proof_id).first();
          if (!proof)
            return json({ error: "proof not found" }, 404);
          await env.DB.prepare(
            "UPDATE design_proofs SET decision=?, comment=?, decided_by=?, decided_at=datetime('now') WHERE id=?"
          ).bind(b.decision, (b.comment || "").slice(0, 2e3), (b.by || "").slice(0, 60), b.proof_id).run();
          const next = b.decision === "approved" ? "approved" : "in_design";
          await env.DB.prepare("UPDATE design_items SET status=?, updated_at=datetime('now') WHERE id=?").bind(next, proof.item_id).run();
          return json({ ok: true });
        }
        if (path === "/api/guest/field" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["first_name", "last_name", "desk", "ptype", "email", "phone", "city", "country", "passport_no", "passport_country", "dietary", "hotel", "room_type", "checkin", "checkout", "accommodation", "accommodation_note", "booking_conf", "early_late", "guest_note", "review_note", "status"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          if (!admin && GUEST_PII_FIELDS.includes(b.field))
            return json({ error: "admin required" }, 403);
          await env.DB.prepare(`UPDATE guests SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind((b.value ?? "").toString().slice(0, 4e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/guest/flag" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["note_handled", "needs_review", "dietary_severe", "is_israeli"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          if (!admin && GUEST_PII_FIELDS.includes(b.field))
            return json({ error: "admin required" }, 403);
          await env.DB.prepare(`UPDATE guests SET ${b.field}=? WHERE id=?`).bind(b.value ? 1 : 0, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/guest/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.first_name || !b.first_name.trim())
            return json({ error: "first name required" }, 400);
          const r = await env.DB.prepare(
            "INSERT INTO guests (party_id, first_name, last_name, desk, ptype, email, phone, hotel, dietary, is_lead) VALUES (?,?,?,?,?,?,?,?,?,1)"
          ).bind(
            (b.party_id || "").slice(0, 20),
            b.first_name.trim().slice(0, 120),
            (b.last_name || "").slice(0, 120),
            (b.desk || "").slice(0, 40),
            (b.ptype || "Donor/guest").slice(0, 40),
            (b.email || "").slice(0, 200),
            (b.phone || "").slice(0, 60),
            (b.hotel || "").slice(0, 120),
            (b.dietary || "").slice(0, 400)
          ).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/guest/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM guest_sessions WHERE guest_id=?").bind(b.id).run();
          await env.DB.prepare("DELETE FROM guests WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/guest/session" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.guest_id || !b.segment_id)
            return json({ error: "missing" }, 400);
          const att = b.attending ? 1 : 0;
          await env.DB.prepare(
            "INSERT INTO guest_sessions (guest_id, segment_id, attending) VALUES (?,?,?) ON CONFLICT(guest_id, segment_id) DO UPDATE SET attending=excluded.attending"
          ).bind(b.guest_id, b.segment_id, att).run();
          return json({ ok: true });
        }
        if (path === "/api/guest/import" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const rows = Array.isArray(b.rows) ? b.rows : [];
          if (!rows.length)
            return json({ error: "no rows parsed from the file" }, 400);
          const existing = (await env.DB.prepare("SELECT * FROM guests").all()).results;
          const key = /* @__PURE__ */ __name((f, l) => (String(f || "") + "|" + String(l || "")).toLowerCase().replace(/[^a-z|]/g, ""), "key");
          const byKey = new Map(existing.map((g) => [key(g.first_name, g.last_name), g]));
          const seen = /* @__PURE__ */ new Set();
          const cmp = ["desk", "ptype", "email", "phone", "city", "country", "passport_no", "passport_country", "dietary", "hotel", "room_type", "checkin", "checkout", "accommodation", "accommodation_note"];
          const changes = [];
          for (const r of rows) {
            const k = key(r.first_name, r.last_name);
            if (!k || k === "|")
              continue;
            seen.add(k);
            const cur = byKey.get(k);
            if (!cur) {
              changes.push({ kind: "new", name: `${r.first_name || ""} ${r.last_name || ""}`.trim(), row: r });
              continue;
            }
            const diffs = [];
            for (const f of cmp) {
              const nv = (r[f] ?? "").toString().trim();
              const ov = (cur[f] ?? "").toString().trim();
              if (nv && nv !== ov)
                diffs.push({ field: f, from: ov, to: nv });
            }
            if (diffs.length)
              changes.push({ kind: "edit", id: cur.id, name: `${cur.first_name} ${cur.last_name}`.trim(), diffs });
          }
          for (const g of existing) {
            if (g.status !== "active")
              continue;
            if (!seen.has(key(g.first_name, g.last_name)))
              changes.push({ kind: "gone", id: g.id, name: `${g.first_name} ${g.last_name}`.trim() });
          }
          return json({ ok: true, changes, counted: rows.length });
        }
        if (path === "/api/guest/import/apply" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const changes = Array.isArray(b.changes) ? b.changes : [];
          const allowed = ["desk", "ptype", "email", "phone", "city", "country", "passport_no", "passport_country", "dietary", "hotel", "room_type", "checkin", "checkout", "accommodation", "accommodation_note"];
          let applied = 0;
          for (const c of changes) {
            if (c.kind === "new" && c.row && c.row.first_name) {
              const r = c.row;
              const res = await env.DB.prepare(
                "INSERT INTO guests (party_id, first_name, last_name, desk, ptype, email, phone, city, country, passport_no, passport_country, dietary, hotel, room_type, checkin, checkout, accommodation, accommodation_note, guest_note, is_lead, needs_review, review_note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1,1,'Added by spreadsheet import \u2014 please review')"
              ).bind(
                (r.party_id || "").toString().slice(0, 20),
                r.first_name.toString().slice(0, 120),
                (r.last_name || "").toString().slice(0, 120),
                (r.desk || "").toString().slice(0, 40),
                (r.ptype || "").toString().slice(0, 40),
                (r.email || "").toString().slice(0, 200),
                (r.phone || "").toString().slice(0, 60),
                (r.city || "").toString().slice(0, 120),
                (r.country || "").toString().slice(0, 80),
                (r.passport_no || "").toString().slice(0, 60),
                (r.passport_country || "").toString().slice(0, 80),
                (r.dietary || "").toString().slice(0, 400),
                (r.hotel || "").toString().slice(0, 120),
                (r.room_type || "").toString().slice(0, 120),
                (r.checkin || "").toString().slice(0, 20),
                (r.checkout || "").toString().slice(0, 20),
                (r.accommodation || "").toString().slice(0, 200),
                (r.accommodation_note || "").toString().slice(0, 400),
                (r.guest_note || "").toString().slice(0, 4e3)
              ).run();
              const gid = res.meta.last_row_id;
              const segs2 = (await env.DB.prepare("SELECT id FROM segments WHERE id IN ('seg-ms6g3f67-uwl0','d1-opening','d2-leadership','d2-beithanina','d2-dinner','d3-morning','d3-thinktank','d3-gala')").all()).results;
              for (const s2 of segs2) {
                await env.DB.prepare("INSERT OR IGNORE INTO guest_sessions (guest_id, segment_id, attending) VALUES (?,?,1)").bind(gid, s2.id).run();
              }
              applied++;
            } else if (c.kind === "edit" && c.id && Array.isArray(c.diffs)) {
              for (const d of c.diffs) {
                if (!allowed.includes(d.field))
                  continue;
                await env.DB.prepare(`UPDATE guests SET ${d.field}=?, updated_at=datetime('now') WHERE id=?`).bind(String(d.to).slice(0, 4e3), c.id).run();
              }
              applied++;
            } else if (c.kind === "gone" && c.id) {
              await env.DB.prepare("UPDATE guests SET status='cancelled', updated_at=datetime('now') WHERE id=?").bind(c.id).run();
              applied++;
            }
          }
          return json({ ok: true, applied });
        }
        if (path === "/api/food/field" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["title", "venue", "title_he", "venue_he", "time", "end_time", "meal_type", "status", "notes", "menu_json", "menu_json_he", "beverages", "beverages_he", "caterer", "headcount", "dietary_note", "dietary_note_he"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          await env.DB.prepare(`UPDATE food_items SET ${b.field}=? WHERE id=?`).bind((b.value ?? "").toString().slice(0, 8e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/food/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const id = "food-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
          const mx = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM food_items").first();
          await env.DB.prepare(
            "INSERT INTO food_items (id, segment_id, day, time, end_time, title, venue, meal_type, status, sort_order) VALUES (?,?,?,?,?,?,?,?,'open',?)"
          ).bind(
            id,
            b.segment_id || null,
            parseInt(b.day) || 1,
            (b.time || "").slice(0, 10),
            (b.end_time || "").slice(0, 10),
            (b.title || "New food item").slice(0, 300),
            (b.venue || "").slice(0, 300),
            (b.meal_type || "drinks").slice(0, 20),
            (mx?.m || 0) + 1
          ).run();
          return json({ ok: true, id });
        }
        if (path === "/api/food/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM food_items WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/dietary/add" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.guest_name || !b.guest_name.trim())
            return json({ error: "name required" }, 400);
          const r = await env.DB.prepare(
            "INSERT INTO dietary (guest_name, restrictions, severity, notes, applies_to) VALUES (?,?,?,?,?)"
          ).bind(
            b.guest_name.trim().slice(0, 200),
            JSON.stringify(Array.isArray(b.restrictions) ? b.restrictions : []).slice(0, 1e3),
            (b.severity || "").slice(0, 40),
            (b.notes || "").slice(0, 500),
            (b.applies_to || "All meals").slice(0, 300)
          ).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/dietary/edit" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.id)
            return json({ error: "missing id" }, 400);
          await env.DB.prepare(
            "UPDATE dietary SET guest_name=?, restrictions=?, severity=?, notes=?, applies_to=? WHERE id=?"
          ).bind(
            (b.guest_name || "").slice(0, 200),
            JSON.stringify(Array.isArray(b.restrictions) ? b.restrictions : []).slice(0, 1e3),
            (b.severity || "").slice(0, 40),
            (b.notes || "").slice(0, 500),
            (b.applies_to || "All meals").slice(0, 300),
            b.id
          ).run();
          return json({ ok: true });
        }
        if (path === "/api/dietary/delete" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM dietary WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/food/process-menu" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          if (!env.ANTHROPIC_API_KEY)
            return json({ error: "AI not configured \u2014 set ANTHROPIC_API_KEY secret" }, 500);
          const b = await readBody(request);
          if (!b.food_id || !b.file_id)
            return json({ error: "missing food_id or file_id" }, 400);
          const fileRow = await env.DB.prepare("SELECT r2_key, content_type, filename FROM files WHERE id=?").bind(b.file_id).first();
          if (!fileRow)
            return json({ error: "file not found" }, 404);
          if (!env.BUCKET)
            return json({ error: "R2 bucket not bound" }, 500);
          const obj = await env.BUCKET.get(fileRow.r2_key);
          if (!obj)
            return json({ error: "file missing in storage" }, 404);
          const bytes = await obj.arrayBuffer();
          if (bytes.byteLength > 30 * 1024 * 1024)
            return json({ error: "file too large to process (30MB limit)" }, 413);
          const b64 = arrayBufferToBase64(bytes);
          const ct = (fileRow.content_type || "").toLowerCase();
          const isImage = ct.startsWith("image/") || /\.(png|jpe?g|gif|webp)$/i.test(fileRow.filename || "");
          let mediaType = ct;
          if (isImage) {
            if (!/^image\/(png|jpeg|gif|webp)$/.test(mediaType)) {
              const ext = (fileRow.filename || "").toLowerCase();
              mediaType = ext.endsWith(".png") ? "image/png" : ext.endsWith(".gif") ? "image/gif" : ext.endsWith(".webp") ? "image/webp" : "image/jpeg";
            }
          } else {
            mediaType = "application/pdf";
          }
          const fileBlock = isImage ? { type: "image", source: { type: "base64", media_type: mediaType, data: b64 } } : { type: "document", source: { type: "base64", media_type: mediaType, data: b64 } };
          let aiResp;
          try {
            const r = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "x-api-key": env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
              },
              body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 3e3,
                system: MENU_SYSTEM_PROMPT,
                messages: [{
                  role: "user",
                  content: [
                    fileBlock,
                    { type: "text", text: b.lang === "he" ? 'Extract this menu into the JSON schema from the system prompt. Write every "course" name and every item "name" in HEBREW \u2014 if the source menu is already in Hebrew, keep its exact wording; if it is in another language, translate it naturally into Hebrew. Respond with ONLY the JSON array.' : 'Extract this menu into the JSON schema from the system prompt. Write every "course" name and every item "name" in ENGLISH \u2014 if the source menu is in another language, translate it naturally into English. Respond with ONLY the JSON array.' }
                  ]
                }]
              })
            });
            aiResp = await r.json();
          } catch (e) {
            console.error("AI request failed", path, e);
            return json({ error: "AI request failed" }, 502);
          }
          if (aiResp.error)
            return json({ error: "AI error: " + (aiResp.error.message || JSON.stringify(aiResp.error)) }, 502);
          let text = "";
          if (Array.isArray(aiResp.content))
            text = aiResp.content.filter((c) => c.type === "text").map((c) => c.text).join("");
          text = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
          let parsed;
          try {
            parsed = JSON.parse(text);
          } catch (e) {
            return json({ error: "AI returned unparseable output", raw: text.slice(0, 500) }, 502);
          }
          if (!Array.isArray(parsed))
            return json({ error: "AI output was not a menu array" }, 502);
          const clean = [];
          for (const course of parsed) {
            if (!course || typeof course.course !== "string" || !Array.isArray(course.items))
              continue;
            const items = course.items.filter((it) => it && typeof it.name === "string").map((it) => {
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
          const menuJson = JSON.stringify(clean);
          const targetCol = b.lang === "he" ? "menu_json_he" : "menu_json";
          await env.DB.prepare(`UPDATE food_items SET ${targetCol}=? WHERE id=?`).bind(menuJson, b.food_id).run();
          return json({ ok: true, menu: clean });
        }
        if (path === "/api/ai/ask" && request.method === "POST") {
          return await handleAsk(request, env, level);
        }
        // editors may propose changes; applying them stays admin-only (/api/ai/apply)
        if (path === "/api/ai/propose" && request.method === "POST") {
          if (!env.ANTHROPIC_API_KEY)
            return json({ error: "AI not configured \u2014 set ANTHROPIC_API_KEY secret" }, 500);
          const b = await readBody(request);
          const instruction = (b.instruction || "").toString().slice(0, 2e3);
          if (!instruction.trim())
            return json({ error: "empty instruction" }, 400);
          const segs = (await env.DB.prepare("SELECT id, day, time, end_time, title, venue FROM segments ORDER BY sort_order").all()).results;
          const ppl = (await env.DB.prepare("SELECT id, segment_id, name FROM people").all()).results;
          const checks = (await env.DB.prepare("SELECT id, segment_id, text FROM checklist").all()).results;
          const DAYS = { 1: "Tue 20 Oct 2026", 2: "Wed 21 Oct 2026", 3: "Thu 22 Oct 2026" };
          const context = segs.map((s) => {
            const sp = ppl.filter((p) => p.segment_id === s.id).map((p) => `person#${p.id}:${p.name}`);
            const sc = checks.filter((c) => c.segment_id === s.id).map((c) => `check#${c.id}:${c.text}`);
            return `event ${s.id} | Day ${s.day} (${DAYS[s.day]}) ${s.time}-${s.end_time} | "${s.title}" @ ${s.venue}` + (sp.length ? `
   people: ${sp.join("; ")}` : "") + (sc.length ? `
   checklist: ${sc.join("; ")}` : "");
          }).join("\n");
          const system = `You are a production assistant for the Jerusalem Foundation 60th Anniversary Conference (3 days, Oct 20-22 2026). The user will give an instruction to modify the event schedule. You must respond with ONLY a JSON object, no prose, no markdown fences.

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
- If you cannot identify which event the user means, make your best guess from titles/venues and note it in the summary.

Current schedule context:
${context}`;
          let aiResp2;
          try {
            const r = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                "x-api-key": env.ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
              },
              body: JSON.stringify({
                model: "claude-sonnet-4-6",
                max_tokens: 2e3,
                system,
                messages: [{ role: "user", content: instruction }]
              })
            });
            aiResp2 = await r.json();
          } catch (e) {
            console.error("AI request failed", path, e);
            return json({ error: "AI request failed" }, 502);
          }
          if (aiResp2.error)
            return json({ error: "AI error: " + (aiResp2.error.message || JSON.stringify(aiResp2.error)) }, 502);
          let text2 = "";
          if (Array.isArray(aiResp2.content))
            text2 = aiResp2.content.filter((c) => c.type === "text").map((c) => c.text).join("");
          text2 = text2.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
          let parsed2;
          try {
            parsed2 = JSON.parse(text2);
          } catch (e) {
            return json({ error: "AI returned unparseable output", raw: text2.slice(0, 500) }, 502);
          }
          const segIds = new Set(segs.map((s) => s.id));
          const checkIds = new Set(checks.map((c) => c.id));
          const clean2 = [];
          for (const op of parsed2.ops || []) {
            if (op.type === "add_check" && segIds.has(op.segment_id) && op.text)
              clean2.push({ type: "add_check", segment_id: op.segment_id, text: String(op.text).slice(0, 500) });
            else if (op.type === "add_person" && segIds.has(op.segment_id) && op.name)
              clean2.push({ type: "add_person", segment_id: op.segment_id, name: String(op.name).slice(0, 200) });
            else if (op.type === "add_event" && op.title)
              clean2.push({ type: "add_event", day: [1, 2, 3].includes(+op.day) ? +op.day : 1, time: String(op.time || "09:00").slice(0, 10), end_time: String(op.end_time || "10:00").slice(0, 10), title: String(op.title).slice(0, 300), venue: String(op.venue || "").slice(0, 300), descr: String(op.descr || "").slice(0, 2e3) });
            else if (op.type === "edit_event" && segIds.has(op.segment_id)) {
              const o = { type: "edit_event", segment_id: op.segment_id };
              if (op.title != null)
                o.title = String(op.title).slice(0, 300);
              if (op.venue != null)
                o.venue = String(op.venue).slice(0, 300);
              if (op.time != null)
                o.time = String(op.time).slice(0, 10);
              if (op.end_time != null)
                o.end_time = String(op.end_time).slice(0, 10);
              if (op.day != null && [1, 2, 3].includes(+op.day))
                o.day = +op.day;
              clean2.push(o);
            } else if (op.type === "edit_check" && checkIds.has(+op.check_id) && op.text)
              clean2.push({ type: "edit_check", check_id: +op.check_id, text: String(op.text).slice(0, 500) });
          }
          return json({ summary: String(parsed2.summary || "Proposed changes").slice(0, 300), ops: clean2 });
        }
        if (path === "/api/ai/apply" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const ops = Array.isArray(b.ops) ? b.ops.slice(0, 100) : [];
          const segIds = new Set((await env.DB.prepare("SELECT id FROM segments").all()).results.map((s) => s.id));
          const checkIds = new Set((await env.DB.prepare("SELECT id FROM checklist").all()).results.map((c) => c.id));
          let applied = 0;
          for (const op of ops) {
            if (op.segment_id != null && !segIds.has(op.segment_id))
              continue;
            if (op.type === "edit_check" && !checkIds.has(+op.check_id))
              continue;
            if (op.type === "edit_event" && op.day != null && ![1, 2, 3].includes(+op.day))
              continue;
            if (op.type === "add_check" && op.segment_id && op.text) {
              await env.DB.prepare("INSERT INTO checklist (segment_id,text,done,seeded,created_by) VALUES (?,?,0,0,'AI')").bind(op.segment_id, String(op.text).slice(0, 500)).run();
              applied++;
            } else if (op.type === "add_person" && op.segment_id && op.name) {
              await env.DB.prepare("INSERT INTO people (segment_id,name,confirmed) VALUES (?,?,0)").bind(op.segment_id, String(op.name).slice(0, 200)).run();
              applied++;
            } else if (op.type === "add_event" && op.title) {
              const id = "seg-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
              const mx = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM segments").first();
              await env.DB.prepare("INSERT INTO segments (id,day,time,end_time,title,venue,descr,status,is_meal,sort_order) VALUES (?,?,?,?,?,?,?, 'open',0,?)").bind(id, [1, 2, 3].includes(+op.day) ? +op.day : 1, String(op.time || "09:00").slice(0, 10), String(op.end_time || "10:00").slice(0, 10), String(op.title).slice(0, 300), String(op.venue || "").slice(0, 300), String(op.descr || "").slice(0, 2e3), (mx?.m || 0) + 1).run();
              applied++;
            } else if (op.type === "edit_event" && op.segment_id) {
              const s = await env.DB.prepare("SELECT * FROM segments WHERE id=?").bind(op.segment_id).first();
              if (s) {
                await env.DB.prepare("UPDATE segments SET day=?, time=?, end_time=?, title=?, venue=? WHERE id=?").bind(op.day != null ? +op.day : s.day, op.time != null ? String(op.time).slice(0, 10) : s.time, op.end_time != null ? String(op.end_time).slice(0, 10) : s.end_time, op.title != null ? String(op.title).slice(0, 300) : s.title, op.venue != null ? String(op.venue).slice(0, 300) : s.venue, op.segment_id).run();
                applied++;
              }
            } else if (op.type === "edit_check" && op.check_id && op.text) {
              await env.DB.prepare("UPDATE checklist SET text=? WHERE id=?").bind(String(op.text).slice(0, 500), +op.check_id).run();
              applied++;
            }
          }
          return json({ ok: true, applied });
        }
        if (path === "/api/contact/add" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.name || !b.name.trim())
            return json({ error: "name required" }, 400);
          const r = await env.DB.prepare(
            "INSERT INTO contacts (name, phone, role, email, notes, venue, created_by) VALUES (?,?,?,?,?,?,?)"
          ).bind(
            b.name.trim().slice(0, 200),
            (b.phone || "").slice(0, 60),
            (b.role || "").slice(0, 200),
            (b.email || "").slice(0, 200),
            (b.notes || "").slice(0, 1e3),
            (b.venue || "").slice(0, 300),
            (b.by || "").slice(0, 60)
          ).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/contact/edit" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.id)
            return json({ error: "missing id" }, 400);
          await env.DB.prepare(
            "UPDATE contacts SET name=?, phone=?, role=?, email=?, notes=?, venue=? WHERE id=?"
          ).bind(
            (b.name || "").slice(0, 200),
            (b.phone || "").slice(0, 60),
            (b.role || "").slice(0, 200),
            (b.email || "").slice(0, 200),
            (b.notes || "").slice(0, 1e3),
            (b.venue || "").slice(0, 300),
            b.id
          ).run();
          return json({ ok: true });
        }
        if (path === "/api/contact/delete" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM contacts WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/notes" && request.method === "GET") {
          let row;
          try {
            row = await env.DB.prepare("SELECT body, updated_at, updated_by FROM general_notes WHERE id=1").first();
          } catch (e) {
            return json({ error: "notes table missing \u2014 run migrate-notes.sql" }, 500);
          }
          return json({ body: row ? row.body : "", updated_at: row ? row.updated_at : null, updated_by: row ? row.updated_by : "" });
        }
        if (path === "/api/notes" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare(
            "UPDATE general_notes SET body=?, updated_at=datetime('now'), updated_by=? WHERE id=1"
          ).bind((b.body || "").slice(0, 1e5), (b.by || "").slice(0, 60)).run();
          return json({ ok: true });
        }
        if (path === "/api/timeline/add" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.title || !b.title.trim())
            return json({ error: "title required" }, 400);
          const r = await env.DB.prepare(
            "INSERT INTO timeline (due_date, title, category, owner, done, seeded) VALUES (?,?,?,?,0,0)"
          ).bind((b.due_date || "").slice(0, 10), b.title.trim().slice(0, 300), (b.category || "General").slice(0, 40), (b.owner || "").slice(0, 80)).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/segment/brief" && request.method === "POST") {
          const b = await readBody(request);
          const allowed = ["brief_runsheet", "brief_location", "brief_av", "brief_staging", "brief_materials", "brief_catering", "brief_speakers", "content_status", "notes_speaker", "notes_logistics"];
          if (!b.id || !allowed.includes(b.field))
            return json({ error: "bad field" }, 400);
          await env.DB.prepare(`UPDATE segments SET ${b.field}=? WHERE id=?`).bind((b.value || "").slice(0, 5e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/team/add" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.name || !b.name.trim())
            return json({ error: "name required" }, 400);
          const org = ["Jerusalem Foundation", "Jerusalem Foundation board"].includes(b.org) ? b.org : "Production";
          const r = await env.DB.prepare("INSERT INTO team (name, role, org, phone) VALUES (?,?,?,?)").bind(b.name.trim().slice(0, 120), (b.role || "").slice(0, 120), org, (b.phone || "").toString().slice(0, 40)).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/team/field" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.id || !["name", "role", "org", "phone"].includes(b.field))
            return json({ error: "bad field" }, 400);
          let value = (b.value ?? "").toString().trim().slice(0, 120);
          if (b.field === "name" && !value)
            return json({ error: "name required" }, 400);
          if (b.field === "org" && !["Production", "Jerusalem Foundation", "Jerusalem Foundation board"].includes(value))
            return json({ error: "bad org" }, 400);
          await env.DB.prepare(`UPDATE team SET ${b.field}=? WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/team/delete" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM team WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/check/edit" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.id || !b.text || !b.text.trim())
            return json({ error: "missing" }, 400);
          await env.DB.prepare("UPDATE checklist SET text=? WHERE id=?").bind(b.text.trim().slice(0, 500), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/check/assign" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("UPDATE checklist SET owner=? WHERE id=?").bind((b.owner || "").slice(0, 120), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/timeline/assign" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("UPDATE timeline SET owner=? WHERE id=?").bind((b.owner || "").slice(0, 120), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/timeline/edit" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.id)
            return json({ error: "missing id" }, 400);
          await env.DB.prepare(
            "UPDATE timeline SET due_date=?, title=?, category=?, owner=?, notes=? WHERE id=?"
          ).bind((b.due_date || "").slice(0, 10), (b.title || "").slice(0, 300), (b.category || "General").slice(0, 40), (b.owner || "").slice(0, 80), (b.notes || "").slice(0, 1e3), b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/timeline/toggle" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("UPDATE timeline SET done = 1 - done WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/inbox/read" && request.method === "POST") {
          return await handleInboxRead(request, env, admin);
        }
        if (path === "/api/inbox/apply" && request.method === "POST") {
          return await handleInboxApply(request, env, admin);
        }
        if (path === "/api/inbox/dismiss" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("UPDATE inbox_items SET state='dismissed' WHERE id=? AND state='review'").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/crew/field" && request.method === "POST") {
          const b = await readBody(request);
          const anyEditor = ["done"];
          const adminOnly = ["crew_json", "flag", "note", "title", "site", "kind", "day", "start_min", "end_min"];
          if (!b.id || ![...anyEditor, ...adminOnly].includes(b.field))
            return json({ error: "bad field" }, 400);
          if (adminOnly.includes(b.field) && !admin)
            return json({ error: "admin required" }, 403);
          let value = b.value;
          if (b.field === "done")
            value = b.value ? 1 : 0;
          else if (b.field === "start_min" || b.field === "end_min")
            value = Math.max(0, Math.min(2880, parseInt(b.value) || 0));
          else if (b.field === "crew_json") {
            let arr;
            try {
              arr = JSON.parse(b.value);
            } catch (e) {
              arr = null;
            }
            if (!Array.isArray(arr))
              return json({ error: "crew must be a list" }, 400);
            value = JSON.stringify(arr.slice(0, 30).map((c) => ({ n: String(c && c.n || "?").slice(0, 60), r: String(c && c.r || "").slice(0, 60) })));
          } else
            value = (value ?? "").toString().slice(0, 1e3);
          await env.DB.prepare(`UPDATE crew_shifts SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/furniture/field" && request.method === "POST") {
          const b = await readBody(request);
          const anyEditor = ["qty", "qty_note", "notes"];
          const adminOnly = ["item", "size", "setup", "segment_ids", "stays_until"];
          if (!b.id || ![...anyEditor, ...adminOnly].includes(b.field))
            return json({ error: "bad field" }, 400);
          if (adminOnly.includes(b.field) && !admin)
            return json({ error: "admin required" }, 403);
          let value = (b.value ?? "").toString().slice(0, 1e3);
          if (b.field === "qty")
            value = value.trim() === "" ? null : Math.max(0, Math.min(1e5, parseInt(value.replace(/[^\d]/g, "")) || 0));
          if (b.field === "item" && !value.trim())
            return json({ error: "item required" }, 400);
          await env.DB.prepare(`UPDATE furniture_items SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/furniture/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const item = (b.item || "").toString().trim().slice(0, 200);
          const seg = (b.segment_id || "").toString().trim().slice(0, 80);
          if (!item || !seg)
            return json({ error: "item and session required" }, 400);
          const qtyRaw = (b.qty ?? "").toString().replace(/[^\d]/g, "");
          const id = "fu" + Date.now().toString(36);
          const max = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM furniture_items").first();
          await env.DB.prepare("INSERT INTO furniture_items (id, setup, segment_ids, item, qty, size, notes, sort_order) VALUES (?,?,?,?,?,?,?,?)").bind(id, (b.setup || "").toString().trim().slice(0, 200) || "Added in the app", seg, item, qtyRaw === "" ? null : Math.min(1e5, parseInt(qtyRaw)), (b.size || "").toString().slice(0, 100), (b.notes || "").toString().slice(0, 500), (max && max.m || 0) + 1).run();
          return json({ ok: true, id });
        }
        if (path === "/api/furniture/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM furniture_items WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/drivers/positions" && request.method === "GET") {
          let rows = { results: [] };
          try {
            rows = await env.DB.prepare("SELECT device, name, run_id, lat, lng, accuracy, speed, heading, sharing, at FROM driver_positions WHERE at > datetime('now','-12 hours') ORDER BY at DESC").all();
          } catch (e) {
          }
          return json({ positions: rows.results, now: new Date().toISOString() });
        }
        if (path === "/api/siteneed/field" && request.method === "POST") {
          const b = await readBody(request);
          if (!b.id || !["done", "qty", "supplier", "notes"].includes(b.field))
            return json({ error: "bad field" }, 400);
          const value = b.field === "done" ? (b.value ? 1 : 0) : (b.value ?? "").toString().slice(0, 1e3);
          await env.DB.prepare(`UPDATE site_needs SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/fair/field" && request.method === "POST") {
          const b = await readBody(request);
          const flags = ["contacted", "confirmed", "form_done", "power"];
          const text = ["contact", "phone", "email", "note"];
          const adminOnly = ["name", "domain"];
          if (!b.id || ![...flags, ...text, ...adminOnly].includes(b.field))
            return json({ error: "bad field" }, 400);
          if (adminOnly.includes(b.field) && !admin)
            return json({ error: "admin required" }, 403);
          let value = flags.includes(b.field) ? b.value ? 1 : 0 : (b.value ?? "").toString().slice(0, 1e3);
          if (b.field === "name" && !value.trim())
            return json({ error: "name required" }, 400);
          await env.DB.prepare(`UPDATE fair_orgs SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/fair/add" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const name = (b.name || "").toString().trim().slice(0, 200);
          if (!name)
            return json({ error: "name required" }, 400);
          const id = "f" + Date.now().toString(36);
          const max = await env.DB.prepare("SELECT COALESCE(MAX(sort_order),0) AS m FROM fair_orgs").first();
          await env.DB.prepare("INSERT INTO fair_orgs (id, name, domain, sort_order) VALUES (?,?,?,?)").bind(id, name, (b.domain || "").toString().slice(0, 100), (max && max.m || 0) + 1).run();
          return json({ ok: true, id });
        }
        if (path === "/api/fair/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM fair_orgs WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/quote/field" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.id || !["chosen", "note"].includes(b.field))
            return json({ error: "bad field" }, 400);
          const value = b.field === "chosen" ? b.value ? 1 : 0 : (b.value ?? "").toString().slice(0, 1e3);
          await env.DB.prepare(`UPDATE catering_quotes SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/dayguest/field" && request.method === "POST") {
          const b = await readBody(request);
          const text = ["first_name", "last_name", "desk", "sessions", "note"];
          const pii = ["email", "phone"];
          if (!b.id || ![...text, ...pii].includes(b.field))
            return json({ error: "bad field" }, 400);
          if (pii.includes(b.field) && !admin)
            return json({ error: "admin required" }, 403);
          const value = (b.value ?? "").toString().slice(0, 1e3);
          if (b.field === "first_name" && !value.trim())
            return json({ error: "name required" }, 400);
          await env.DB.prepare(`UPDATE day_guests SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/dayguest/add" && request.method === "POST") {
          const b = await readBody(request);
          const first = (b.first_name || "").toString().trim().slice(0, 120);
          if (!first)
            return json({ error: "first name required" }, 400);
          const r = await env.DB.prepare(
            "INSERT INTO day_guests (first_name, last_name, desk, email, phone, sessions, note) VALUES (?,?,?,?,?,?,?)"
          ).bind(
            first,
            (b.last_name || "").toString().slice(0, 120),
            (b.desk || "").toString().slice(0, 40),
            admin ? (b.email || "").toString().slice(0, 200) : "",
            admin ? (b.phone || "").toString().slice(0, 60) : "",
            (b.sessions || "").toString().slice(0, 1e3),
            (b.note || "").toString().slice(0, 1e3)
          ).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/dayguest/delete" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM day_guests WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/talent/field" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          if (!b.id || !["stage", "fee", "title", "notes"].includes(b.field))
            return json({ error: "bad field" }, 400);
          let value = (b.value ?? "").toString().slice(0, 1e3);
          if (b.field === "stage" && !["contacted", "quote", "signed", "invoiced"].includes(value))
            return json({ error: "bad stage" }, 400);
          if (b.field === "fee")
            value = value.trim() === "" ? null : parseInt(value.replace(/[^\d]/g, "")) || null;
          await env.DB.prepare(`UPDATE talent_items SET ${b.field}=?, updated_at=datetime('now') WHERE id=?`).bind(value, b.id).run();
          return json({ ok: true });
        }
        if (path === "/api/timeline/delete" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM timeline WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        return json({ error: "not found" }, 404);
      } catch (e) {
        console.error("api error", path, e);
        return json({ error: "server error" }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
