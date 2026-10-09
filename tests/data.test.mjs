// Validation, conflicts, transactions, proofs, imports, notes sanitizing, GPS freshness.
import { test } from "node:test";
import assert from "node:assert/strict";
import { call, KEYS, CREDS } from "./env.mjs";

const A = KEYS.admin, E = KEYS.edit;

test("server-side validation of enums, dates, times, links and JSON", async () => {
  const bad = [
    ["/api/segment/status", { id: "s1-tour", status: "<img src=x onerror=alert(1)>" }],
    ["/api/run/field", { id: "r1", field: "status", value: "flying" }],
    ["/api/run/field", { id: "r1", field: "depart_time", value: "8am" }],
    ["/api/run/field", { id: "r1", field: "dropoff_url", value: "javascript:alert(1)" }],
    ["/api/run/field", { id: "r1", field: "dropoff_url", value: "data:text/html,<script>1</script>" }],
    ["/api/run/field", { id: "r1", field: "nope", value: "x" }],
    ["/api/guest/field", { id: 1, field: "checkin", value: "2026-02-30" }],
    ["/api/design/field", { id: "d1", field: "status", value: "done" }],
    ["/api/design/field", { id: "d1", field: "category", value: "Bad Category!" }],
    ["/api/food/field", { id: "f1", field: "menu_json", value: "{not json" }],
    ["/api/food/field", { id: "f1", field: "meal_type", value: "feast" }],
    ["/api/segment/edit", { id: "s1-tour", day: 7 }],
    ["/api/crew/field", { id: "sh1", field: "day", value: "30" }],
    ["/api/timeline/add", { title: "x", due_date: "tomorrow" }]
  ];
  for (const [p, body] of bad) {
    const r = await call(p, { key: A, body });
    assert.equal(r.status, 400, p + " " + JSON.stringify(body) + " → " + r.status);
  }
  assert.equal((await call("/api/run/field", { key: A, body: { id: "r1", field: "dropoff_url", value: "https://maps.example.test/x" } })).status, 200);
  assert.equal((await call("/api/run/field", { key: A, body: { id: "r1", field: "depart_time", value: "24:15" } })).status, 200, "after-midnight time");
  assert.ok([404, 405].includes((await call("/api/state", { key: A, body: "{bad", method: "POST" })).status));
  assert.equal((await call("/api/segment/status", { key: A, body: "{bad json" })).status, 400);
});

test("missing records are 404, not a silent success", async () => {
  assert.equal((await call("/api/segment/status", { key: A, body: { id: "no-such", status: "open" } })).status, 404);
  assert.equal((await call("/api/run/field", { key: A, body: { id: "no-such", field: "notes", value: "x" } })).status, 404);
  assert.equal((await call("/api/contact/delete", { key: A, body: { id: 9999 } })).status, 404);
  assert.equal((await call("/api/check/toggle", { key: A, body: { id: 9999 } })).status, 404);
});

test("field conflicts: stale expect gets 409 with the current value", async () => {
  const ok = await call("/api/run/field", { key: A, body: { id: "r2", field: "notes", value: "first", expect: "" } });
  assert.equal(ok.status, 200);
  const stale = await call("/api/run/field", { key: E, body: { id: "r2", field: "notes", value: "second", expect: "" } });
  assert.equal(stale.status, 409);
  assert.equal(stale.data.kind, "conflict");
  assert.equal(stale.data.current.notes, "first");
  // the same value saved twice is not a conflict
  assert.equal((await call("/api/run/field", { key: E, body: { id: "r2", field: "notes", value: "first", expect: "" } })).status, 200);
  // edits update only the submitted fields
  await call("/api/segment/edit", { key: A, body: { id: "s2-panel", venue: "Room 2" } });
  const st = await call("/api/state", { key: A });
  const seg = st.data.segments.find((s) => s.id === "s2-panel");
  assert.equal(seg.venue, "Room 2");
  assert.equal(seg.title, "Panel");
  assert.equal(seg.time, "10:00");
});

test("budget: revisions and cell merges", async () => {
  const C = KEYS.chief;
  const g = await call("/api/grid", { key: C });
  const rev = g.data.rev;
  // two people edit different cells from the same starting point: both survive
  const a = await call("/api/grid/cells", { key: C, body: { edits: [{ tab: 0, r: 0, c: 1, from: "100", to: "150" }] } });
  assert.equal(a.status, 200);
  const b = await call("/api/grid/cells", { key: C, body: { edits: [{ tab: 0, r: 1, c: 1, from: "200", to: "250" }] } });
  assert.equal(b.status, 200);
  const g2 = await call("/api/grid", { key: C });
  assert.equal(g2.data.tabs[0].rows[0][1], "150");
  assert.equal(g2.data.tabs[0].rows[1][1], "250");
  // the same cell from a stale value conflicts
  const c = await call("/api/grid/cells", { key: C, body: { edits: [{ tab: 0, r: 0, c: 1, from: "100", to: "999" }] } });
  assert.equal(c.status, 409);
  assert.equal(c.data.conflicts[0].current, "150");
  // whole-sheet save with an old revision conflicts
  const w = await call("/api/grid", { key: C, body: { rev, tabs: g.data.tabs } });
  assert.equal(w.status, 409);
  const w2 = await call("/api/grid", { key: C, body: { rev: g2.data.rev, tabs: g2.data.tabs } });
  assert.equal(w2.status, 200);
  assert.equal(w2.data.rev, g2.data.rev + 1);
  assert.equal((await call("/api/grid", { key: C, body: { tabs: g2.data.tabs } })).status, 400, "rev required");
});

test("notes: sanitized on write and read, revision-checked", async () => {
  const n = await call("/api/notes", { key: E });
  const evil = '<p>ok</p><img src=x onerror=alert(1)><script>alert(2)</script><a href="javascript:alert(3)">x</a><a href="https://example.test" onclick="x()">y</a><svg><g onload=alert(4)></g></svg><p style="color:red;background:url(javascript:1)">z</p>';
  const w = await call("/api/notes", { key: E, body: { rev: n.data.rev, body: evil } });
  assert.equal(w.status, 200);
  const r = await call("/api/notes", { key: E });
  for (const bad of ["<script", "onerror", "onclick", "javascript:", "<img", "<svg", "onload", "url("])
    assert.ok(!r.data.body.toLowerCase().includes(bad), bad + " survived: " + r.data.body);
  assert.match(r.data.body, /<a href="https:\/\/example.test\/" rel="noopener noreferrer" target="_blank">y<\/a>/);
  assert.match(r.data.body, /style="color: red"/);
  const stale = await call("/api/notes", { key: A, body: { rev: n.data.rev, body: "<p>overwrite</p>" } });
  assert.equal(stale.status, 409);
  assert.equal(stale.data.kind, "conflict");
  const dry = await call("/api/admin/sanitize-notes", { key: A, body: {} });
  assert.equal(dry.status, 200);
  assert.equal(dry.data.changed, false);
});

test("proofs: unique versions, old approvals don't approve the latest", async () => {
  const p1 = await call("/api/design/proof", { key: E, body: { item_id: "d1", file_id: 1 } });
  const p2 = await call("/api/design/proof", { key: E, body: { item_id: "d1", file_id: 4 } });
  assert.equal(p1.data.version + 1, p2.data.version);
  const old = await call("/api/design/decide", { key: E, body: { proof_id: p1.data.id, decision: "approved" } });
  assert.equal(old.status, 200);
  assert.equal(old.data.latest, false);
  let st = await call("/api/state", { key: A });
  assert.equal(st.data.design_items.find((d) => d.id === "d1").status, "awaiting_approval");
  const ch = await call("/api/design/decide", { key: E, body: { proof_id: p2.data.id, decision: "changes" } });
  assert.equal(ch.data.latest, true);
  st = await call("/api/state", { key: A });
  assert.equal(st.data.design_items.find((d) => d.id === "d1").status, "changes");
  // simultaneous uploads still get distinct versions
  const many = await Promise.all([1, 4, 1, 4].map((f) => call("/api/design/proof", { key: E, body: { item_id: "d1", file_id: f } })));
  const vs = many.filter((r) => r.status === 200).map((r) => r.data.version);
  assert.equal(new Set(vs).size, vs.length);
  assert.equal((await call("/api/design/proof", { key: E, body: { item_id: "d1", file_id: 2 } })).status, 404, "editor can't attach an admin file");
});

test("imports: Unicode names, registration ids, duplicates, explicit full roster, idempotent apply", async () => {
  const rows = [
    { first_name: "José", last_name: "Núñez", hotel: "Test Hotel B" },
    { first_name: "Jose", last_name: "Nunez", hotel: "Test Hotel A" },
    { first_name: "Ada", last_name: "Alpha-Renamed", reg_id: "R-1", checkin: "20/10/2026" },
    { first_name: "Ada", last_name: "Alpha-Renamed", reg_id: "R-1" },
    { first_name: "Новый", last_name: "Гость", checkin: "31/02/2026" },
    { first_name: "李", last_name: "雷" }
  ];
  const pv = await call("/api/guest/import", { key: A, body: { rows } });
  assert.equal(pv.status, 200);
  const kinds = pv.data.changes.map((c) => c.kind + ":" + c.name);
  assert.ok(kinds.includes("edit:José Núñez"), "accented name matches itself: " + kinds);
  assert.ok(kinds.includes("new:Jose Nunez"), "unaccented is a different person, not merged");
  assert.ok(kinds.some((k) => k.startsWith("duplicate:")), "duplicate rows are flagged");
  assert.ok(kinds.includes("new:Новый Гость") && kinds.includes("new:李 雷"), "non-Latin names are kept distinct");
  assert.ok(!pv.data.changes.some((c) => c.kind === "gone"), "no cancellations without full-roster mode");
  const ada = pv.data.changes.find((c) => c.id === 1);
  assert.ok(ada.diffs.some((d) => d.field === "checkin" && d.to === "2026-10-20"), "day-first dates mapped");
  assert.ok(pv.data.changes.find((c) => c.name === "Новый Гость").problems.length, "impossible date flagged");
  const full = await call("/api/guest/import", { key: A, body: { rows, full_roster: true } });
  const gone = full.data.changes.filter((c) => c.kind === "gone");
  assert.ok(gone.length && gone.every((c) => c.checked === false), "cancellations offered unchecked");
  const pick = pv.data.changes.filter((c) => c.kind === "new" || c.kind === "edit");
  const key = "imp-" + Date.now();
  const ap = await call("/api/guest/import/apply", { key: A, body: { changes: pick }, headers: { "idempotency-key": key } });
  assert.equal(ap.status, 200, JSON.stringify(ap.data));
  const again = await call("/api/guest/import/apply", { key: A, body: { changes: pick }, headers: { "idempotency-key": key } });
  assert.deepEqual(again.data, ap.data, "same key replays the same answer");
  const twice = await call("/api/guest/import/apply", { key: A, body: { changes: pick } });
  assert.equal(twice.data.applied, 0, "re-applying changes nothing");
  const st = await call("/api/state", { key: A });
  assert.equal(st.data.guests.filter((g) => g.first_name === "李").length, 1);
  const newcomer = st.data.guests.find((g) => g.first_name === "李");
  assert.equal(st.data.guest_sessions.filter((s) => s.guest_id === newcomer.id).length, 0, "no hard-coded sessions");
  // a preview that went stale is refused as a whole
  await call("/api/guest/field", { key: A, body: { id: 3, field: "hotel", value: "Test Hotel A" } });
  const stalePv = [{ kind: "edit", id: 3, name: "Cy Gamma", diffs: [{ field: "hotel", from: "Test Hotel B", to: "Test Hotel C" }] }];
  const sa = await call("/api/guest/import/apply", { key: A, body: { changes: stalePv } });
  assert.equal(sa.status, 409);
});

test("AI apply validates each op and writes atomically", async () => {
  const r = await call("/api/ai/apply", { key: A, body: { ops: [
    { type: "add_check", segment_id: "s1-tour", text: "Bring water" },
    { type: "add_check", segment_id: "no-such", text: "x" },
    { type: "edit_event", segment_id: "s1-tour", time: "not a time" },
    { type: "drop_table", segment_id: "s1-tour" }
  ] } });
  assert.equal(r.status, 200);
  assert.equal(r.data.applied, 1);
  assert.equal(r.data.rejected, 3);
});

test("view Ask sends only the public projection; editor Ask has no personal data", async () => {
  const { readFileSync } = await import("node:fs");
  const before = readFileSync(process.env.AI_LOG, "utf8").split("\n").filter(Boolean).length;
  const r = await call("/api/ai/ask", { key: KEYS.view, body: { question: "When is the panel?" } });
  assert.equal(r.status, 200, JSON.stringify(r.data));
  const e = await call("/api/ai/ask", { key: KEYS.edit, body: { question: "How many guests?" } });
  assert.equal(e.status, 200);
  const sent = readFileSync(process.env.AI_LOG, "utf8").split("\n").filter(Boolean).slice(before);
  assert.equal(sent.length, 2);
  const view = sent[0], edit = sent[1];
  for (const secret of ["Dov Driver", "internal note", "Internal staff shuttle", "Lea Leader", "Test Band", "Test Caterer", "by_hotel", "+972"])
    assert.ok(!view.includes(secret), "view Ask leaked " + secret);
  for (const pii of ["ada@example.test", "P0000001", "+1-555-0101", "Alpha", "Test Band", "Test Caterer"])
    assert.ok(!edit.includes(pii), "editor Ask leaked " + pii);
  assert.equal((await call("/api/ai/propose", { key: KEYS.view, body: { instruction: "x" } })).status, 403);
});

test("AI quotas and concurrency are enforced server-side", async () => {
  // at most 4 requests run at once; the fake server answers slowly for these
  const rs = await Promise.all(Array.from({ length: 7 }, () => call("/api/ai/ask", { key: KEYS.admin, body: { question: "SLOW-REQUEST" } })));
  const codes = rs.map((r) => r.status);
  assert.ok(codes.filter((c) => c === 200).length <= 4, codes.join(","));
  assert.ok(codes.includes(429), codes.join(","));
  assert.ok(rs.filter((r) => r.status === 429).every((r) => r.data.error), "429 explains itself");
});

test("GPS: fix time stored, out-of-order fixes ignored, stale rejected", async () => {
  const D = CREDS.driverR1.token;
  const now = Date.now();
  const p = (fix, lat) => call("/api/driver/position", { key: D, body: { device: "phone1", lat, lng: 35.2, accuracy: 10, fix_at: fix } });
  assert.equal((await p(now - 1000, 31.77)).data.accepted, true);
  assert.equal((await p(now - 60000, 31.70)).data.accepted, false, "older fix arriving late is ignored");
  assert.equal((await p(now - 7 * 3600e3, 31.7)).status, 400, "hours-old fix rejected");
  assert.equal((await p(undefined, 31.7)).status, 400, "fix time required");
  const pos = await call("/api/drivers/positions", { key: E });
  const mine = pos.data.positions.find((x) => x.name === "Bus 1");
  assert.equal(mine.lat, 31.77);
  assert.equal(mine.run_id, "r1", "run comes from the credential, not guessed");
  assert.ok(mine.fix_at);
});

test("responses are private and not cached; pages carry CSP", async () => {
  const r = await call("/api/state", { key: E });
  assert.equal(r.headers.get("cache-control"), "private, no-store");
  for (const page of ["/", "/control", "/driver", "/leader", "/av", "/crew"]) {
    const res = await fetch(new URL(page, (await import("./env.mjs")).BASE), { redirect: "follow" });
    assert.equal(res.status, 200, page);
    const csp = res.headers.get("content-security-policy") || "";
    assert.match(csp, /script-src 'self'(;|$)/, page);
    assert.match(csp, /frame-ancestors 'none'/, page);
    assert.equal(res.headers.get("x-frame-options"), "DENY");
  }
});
