var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var json = /* @__PURE__ */ __name((data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json", "cache-control": "no-store" }
}), "json");
function authLevel(request, env, url) {
  const token = request.headers.get("x-token") || url.searchParams.get("k") || "";
  if (env.ADMIN_TOKEN && token === env.ADMIN_TOKEN)
    return "admin";
  if (env.EDIT_TOKEN && token === env.EDIT_TOKEN)
    return "edit";
  if (env.VIEW_TOKEN && token === env.VIEW_TOKEN)
    return "view";
  return null;
}
__name(authLevel, "authLevel");
async function readBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
__name(readBody, "readBody");
var src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path.startsWith("/api/")) {
      const level = authLevel(request, env, url);
      if (!level)
        return json({ error: "unauthorized" }, 401);
      const admin = level === "admin";
      if (level === "view") {
        if (path === "/api/state" && request.method === "GET") {
          try {
            const segs = await env.DB.prepare(
              "SELECT id, day, time, end_time, title, venue, descr, title_he, venue_he, descr_he FROM segments ORDER BY day, time, sort_order"
            ).all();
            return json({
              level: "view",
              segments: segs.results,
              people: [],
              checklist: [],
              venues: [],
              contacts: []
            });
          } catch (e) {
            return json({ error: String(e) }, 500);
          }
        }
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
          return json({
            level,
            segments: segs.results,
            people: ppl.results,
            checklist: checks.results,
            venues: venues.results,
            contacts: contacts.results,
            team: team.results,
            timeline: timeline.results
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
          if (!admin)
            return json({ error: "admin required" }, 403);
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
          if (!admin)
            return json({ error: "admin required" }, 403);
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
          const segId = form.get("segment_id") ? form.get("segment_id").toString() : null;
          const by = (form.get("by") || "").toString().slice(0, 60);
          const name = (file.name || "upload").slice(0, 200);
          const key = `${section}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${name}`;
          await env.BUCKET.put(key, file.stream(), {
            httpMetadata: { contentType: file.type || "application/octet-stream" }
          });
          const r = await env.DB.prepare(
            "INSERT INTO files (r2_key, filename, content_type, size, section, segment_id, uploaded_by) VALUES (?,?,?,?,?,?,?)"
          ).bind(key, name, file.type || "", file.size || 0, section, segId, by).run();
          return json({ ok: true, id: r.meta.last_row_id });
        }
        if (path === "/api/files/download" && request.method === "GET") {
          const id = url.searchParams.get("id");
          const row = await env.DB.prepare("SELECT r2_key, filename, content_type FROM files WHERE id=?").bind(id).first();
          if (!row)
            return json({ error: "not found" }, 404);
          if (!env.BUCKET)
            return json({ error: "R2 bucket not bound" }, 500);
          const obj = await env.BUCKET.get(row.r2_key);
          if (!obj)
            return json({ error: "file missing in storage" }, 404);
          const headers = new Headers();
          headers.set("content-type", row.content_type || "application/octet-stream");
          headers.set("content-disposition", `attachment; filename="${row.filename.replace(/"/g, "")}"`);
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
        if (path === "/api/ai/propose" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
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
                max_tokens: 2e3,
                system,
                messages: [{ role: "user", content: instruction }]
              })
            });
            aiResp = await r.json();
          } catch (e) {
            return json({ error: "AI request failed: " + String(e) }, 502);
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
          const segIds = new Set(segs.map((s) => s.id));
          const checkIds = new Set(checks.map((c) => c.id));
          const clean = [];
          for (const op of parsed.ops || []) {
            if (op.type === "add_check" && segIds.has(op.segment_id) && op.text)
              clean.push({ type: "add_check", segment_id: op.segment_id, text: String(op.text).slice(0, 500) });
            else if (op.type === "add_person" && segIds.has(op.segment_id) && op.name)
              clean.push({ type: "add_person", segment_id: op.segment_id, name: String(op.name).slice(0, 200) });
            else if (op.type === "add_event" && op.title)
              clean.push({ type: "add_event", day: [1, 2, 3].includes(+op.day) ? +op.day : 1, time: String(op.time || "09:00").slice(0, 10), end_time: String(op.end_time || "10:00").slice(0, 10), title: String(op.title).slice(0, 300), venue: String(op.venue || "").slice(0, 300), descr: String(op.descr || "").slice(0, 2e3) });
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
              clean.push(o);
            } else if (op.type === "edit_check" && checkIds.has(+op.check_id) && op.text)
              clean.push({ type: "edit_check", check_id: +op.check_id, text: String(op.text).slice(0, 500) });
          }
          return json({ summary: String(parsed.summary || "Proposed changes").slice(0, 300), ops: clean });
        }
        if (path === "/api/ai/apply" && request.method === "POST") {
          if (!admin)
            return json({ error: "admin required" }, 403);
          const b = await readBody(request);
          const ops = Array.isArray(b.ops) ? b.ops : [];
          let applied = 0;
          for (const op of ops) {
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
          const r = await env.DB.prepare("INSERT INTO team (name, role) VALUES (?,?)").bind(b.name.trim().slice(0, 120), (b.role || "").slice(0, 120)).run();
          return json({ ok: true, id: r.meta.last_row_id });
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
        if (path === "/api/timeline/delete" && request.method === "POST") {
          const b = await readBody(request);
          await env.DB.prepare("DELETE FROM timeline WHERE id=?").bind(b.id).run();
          return json({ ok: true });
        }
        return json({ error: "not found" }, 404);
      } catch (e) {
        return json({ error: String(e) }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  src_default as default
};
