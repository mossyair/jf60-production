// Role x route matrix, field credentials, impersonation, restricted files.
import { test } from "node:test";
import assert from "node:assert/strict";
import { call, KEYS, CREDS } from "./env.mjs";

const C = Object.fromEntries(Object.entries(CREDS).map(([k, v]) => [k, v.token]));

test("no key, wrong key, and a wrong-case key are refused", async () => {
  assert.equal((await call("/api/state")).status, 401);
  assert.equal((await call("/api/state", { key: "nope" })).status, 401);
  assert.equal((await call("/api/state", { key: KEYS.admin.toUpperCase() })).status, 401);
});

test("removed built-in field keys do not work", async () => {
  for (const k of ["driver", "drivers", "leader", "av", "crew", "jf60", "driver2026"])
    assert.equal((await call("/api/state", { key: k })).status, 401, k);
});

test("dashboard state per level", async () => {
  const admin = await call("/api/state", { key: KEYS.admin });
  assert.equal(admin.status, 200);
  assert.equal(admin.data.level, "admin");
  assert.equal(admin.data.chief, false);
  assert.deepEqual(admin.data.unavailable, []);
  assert.ok(admin.data.guests[0].email !== undefined, "admin sees guest contact columns");
  assert.ok(admin.data.talent_items.length > 0);
  const edit = await call("/api/state", { key: KEYS.edit });
  assert.equal(edit.data.level, "edit");
  assert.equal(edit.data.guests[0].email, undefined, "editor gets no guest email");
  assert.equal(edit.data.guests[0].passport_no, undefined);
  assert.deepEqual(edit.data.talent_items, []);
  assert.deepEqual(edit.data.catering_quotes, []);
  assert.ok(edit.data.inbox_items.every((i) => i.access === "ops"), "editor sees only ops inbox items");
  const chief = await call("/api/state", { key: KEYS.chief });
  assert.equal(chief.data.level, "admin");
  assert.equal(chief.data.chief, true);
});

test("view key: public projection only", async () => {
  const v = await call("/api/state", { key: KEYS.view });
  assert.equal(v.status, 200);
  assert.equal(v.data.level, "view");
  assert.deepEqual(Object.keys(v.data.segments[0]).sort(), ["day", "descr", "descr_he", "end_time", "id", "time", "title", "title_he", "venue", "venue_he"].sort());
  assert.ok(!v.data.transport_runs.some((r) => r.id === "r-hidden"), "hidden runs are not shown");
  assert.ok(!v.data.run_stops.some((s) => s.run_id === "r-hidden"), "stops of hidden runs are not shown");
  assert.ok(!JSON.stringify(v.data).includes("Dov Driver"), "no driver names");
  assert.deepEqual(v.data.guests, []);
  for (const p of ["/api/files", "/api/notes", "/api/grid", "/api/drivers/positions"])
    assert.equal((await call(p, { key: KEYS.view })).status, 403, p);
  assert.equal((await call("/api/segment/status", { key: KEYS.view, body: { id: "s1-tour", status: "confirmed" } })).status, 403);
});

test("budget sheet is chief-only", async () => {
  assert.equal((await call("/api/grid", { key: KEYS.admin })).status, 403);
  assert.equal((await call("/api/grid", { key: KEYS.edit })).status, 403);
  const g = await call("/api/grid", { key: KEYS.chief });
  assert.equal(g.status, 200);
  assert.equal(typeof g.data.rev, "number");
});

test("admin-only writes refuse editors", async () => {
  const cases = [
    ["/api/segment/add", { day: 1, title: "x" }],
    ["/api/segment/delete", { id: "s1-tour" }],
    ["/api/guest/add", { first_name: "x" }],
    ["/api/guest/import", { rows: [{ first_name: "a" }] }],
    ["/api/ai/apply", { ops: [] }],
    ["/api/team/add", { name: "Mallory" }],
    ["/api/team/delete", { id: 1 }],
    ["/api/team/field", { id: 1, field: "name", value: "Mallory" }],
    ["/api/team/field", { id: 1, field: "role", value: "Lead producer" }],
    ["/api/crew/field", { id: "sh1", field: "crew_json", value: "[{\"n\":\"Mallory\"}]" }],
    ["/api/guest/field", { id: 1, field: "email", value: "x@example.test" }],
    ["/api/talent/field", { id: "t1", field: "fee", value: "1" }],
    ["/api/quote/field", { id: 1, field: "note", value: "x" }],
    ["/api/files/access", { id: 1, access: "ops" }],
    ["/api/admin/sanitize-notes", {}]
  ];
  for (const [p, body] of cases)
    assert.equal((await call(p, { key: KEYS.edit, body })).status, 403, p);
});

test("editors keep their own write paths", async () => {
  const r = await call("/api/team/field", { key: KEYS.edit, body: { id: 2, field: "phone", value: "+972-50-000-0022" } });
  assert.equal(r.status, 200, JSON.stringify(r.data));
  assert.equal((await call("/api/segment/status", { key: KEYS.edit, body: { id: "s1-tour", status: "progress" } })).status, 200);
});

test("field credentials: each role reaches only its own page", async () => {
  const pages = { leaderA: "/leader", crewDinner: "/crew", driverR1: "/driver", avIndividual: "/av" };
  for (const [k, page] of Object.entries(pages)) {
    const r = await call("/api/state", { key: C[k] });
    assert.equal(r.status, 200, k);
    assert.equal(r.data.redirect, page, k);
    assert.equal((await call("/api/files", { key: C[k] })).status, 403, k + " files list");
    assert.equal((await call("/api/segment/status", { key: C[k], body: { id: "s1-tour", status: "open" } })).status, 403, k + " dashboard write");
  }
  assert.equal((await call("/api/state", { key: KEYS.driverShared })).data.redirect, "/driver");
  assert.equal((await call("/api/state", { key: KEYS.avShared })).data.redirect, "/av");
  // a leader credential whose person no longer exists does nothing
  assert.equal((await call("/api/state", { key: C.orphanLeader })).status, 401);
});

test("x-name cannot change who a field credential is", async () => {
  const a = await call("/api/leader/state", { key: C.leaderA, headers: { "x-name": encodeURIComponent("Other Leader") } });
  assert.equal(a.status, 200);
  assert.equal(a.data.me.name, "Lea Leader");
  assert.deepEqual(a.data.hotels, ["Test Hotel A"]);
  assert.ok(a.data.guests.every((g) => g.hotel === "Test Hotel A"));
  assert.ok(!a.data.guests.some((g) => g.last_name === "Cancelled"), "cancelled guests are not listed");
  const c = await call("/api/crew/state", { key: C.crewDinner, headers: { "x-name": "Pat Producer" } });
  assert.equal(c.data.me.name, "Sam Site");
});

test("leader boarding: own hotel, staying that day", async () => {
  assert.equal((await call("/api/leader/board", { key: C.leaderA, body: { guest_id: 1, day: 1, on: true } })).status, 200);
  assert.equal((await call("/api/leader/board", { key: C.leaderA, body: { guest_id: 3, day: 1, on: true } })).status, 403, "other hotel");
  assert.equal((await call("/api/leader/board", { key: C.leaderB, body: { guest_id: 1, day: 1, on: true } })).status, 403, "other leader");
  assert.equal((await call("/api/leader/board", { key: C.leaderA, body: { guest_id: 2, day: 1, on: true } })).status, 400, "not at hotel that day");
  assert.equal((await call("/api/leader/board", { key: C.leaderA, body: { guest_id: 1, day: 9, on: true } })).status, 400, "bad day");
});

test("crew and AV completion respect scope", async () => {
  assert.equal((await call("/api/field/done", { key: C.crewDinner, body: { kind: "need", id: "n2", done: true } })).status, 200, "need of own event");
  assert.equal((await call("/api/field/done", { key: C.crewDinner, body: { kind: "need", id: "n3", done: true } })).status, 403, "need of another event");
  assert.equal((await call("/api/field/done", { key: C.crewDinner, body: { kind: "shift", id: "sh1", done: true } })).status, 200, "own shift");
  assert.equal((await call("/api/field/done", { key: C.crewDinner, body: { kind: "shift", id: "sh2", done: true } })).status, 403, "someone else's shift");
  assert.equal((await call("/api/field/done", { key: C.crewAll, body: { kind: "need", id: "n3", done: true } })).status, 200, "all-scope crew");
  assert.equal((await call("/api/field/done", { key: C.avIndividual, body: { kind: "need", id: "n2", done: true } })).status, 200, "AV need");
  assert.equal((await call("/api/field/done", { key: C.avIndividual, body: { kind: "need", id: "n1", done: true } })).status, 403, "non-AV need");
  assert.equal((await call("/api/field/done", { key: C.crewDinner, body: { kind: "need", id: "missing", done: true } })).status, 404);
});

test("restricted files: list, download, delete, inbox, relabel", async () => {
  const ids = (r) => r.data.files.map((f) => f.id).sort();
  assert.deepEqual(ids(await call("/api/files", { key: KEYS.edit })), [1, 4, 5]);
  assert.deepEqual(ids(await call("/api/files", { key: KEYS.admin })), [1, 2, 4, 5]);
  assert.deepEqual(ids(await call("/api/files", { key: KEYS.chief })), [1, 2, 3, 4, 5]);
  assert.equal((await call("/api/files/download?id=2", { key: KEYS.edit })).status, 404);
  assert.equal((await call("/api/files/download?id=3", { key: KEYS.admin })).status, 404);
  assert.equal((await call("/api/files/download?id=3", { key: KEYS.chief })).status, 200);
  assert.equal((await call("/api/files/delete", { key: KEYS.edit, body: { id: 2 } })).status, 404);
  assert.equal((await call("/api/inbox/apply", { key: KEYS.edit, body: { id: 1, plain: true } })).status, 404, "admin inbox item hidden from editor");
  assert.equal((await call("/api/inbox/dismiss", { key: KEYS.edit, body: { id: 1 } })).status, 404);
  assert.equal((await call("/api/files/access", { key: KEYS.admin, body: { id: 2, access: "chief" } })).status, 403, "only chief marks chief");
  assert.equal((await call("/api/files/access", { key: KEYS.admin, body: { id: 3, access: "ops" } })).status, 404, "admin can't see chief file");
  // field apps: event-linked ops content only, crew within scope
  assert.equal((await call("/api/files/download?id=1", { key: C.avIndividual })).status, 200);
  assert.equal((await call("/api/files/download?id=2", { key: C.avIndividual })).status, 404);
  assert.equal((await call("/api/files/download?id=1", { key: C.crewDinner })).status, 200);
  assert.equal((await call("/api/files/download?id=4", { key: C.crewDinner })).status, 404, "other event's file");
  assert.equal((await call("/api/files/download?id=1", { key: C.leaderA })).status, 403, "leaders have no files");
});

test("downloads never render active content", async () => {
  const r = await call("/api/files/download?id=5&inline=1", { key: KEYS.admin });
  assert.equal(r.status, 200);
  assert.equal(r.headers.get("content-type"), "application/octet-stream");
  assert.match(r.headers.get("content-disposition"), /^attachment/);
  assert.match(r.headers.get("content-security-policy"), /sandbox/);
  assert.equal(r.headers.get("cache-control"), "private, no-store");
  const pdf = await call("/api/files/download?id=1&inline=1", { key: KEYS.admin });
  assert.equal(pdf.headers.get("content-type"), "application/pdf");
});

test("download cookie carries the real level and is cleared on logout", async () => {
  const s = await call("/api/session", { key: KEYS.chief, method: "POST" });
  const cookie = s.headers.get("set-cookie").split(";")[0];
  assert.match(cookie, /^jf60_dl=chief\./);
  const d = await call("/api/files/download?id=3", { headers: { cookie } });
  assert.equal(d.status, 200, "chief cookie opens chief file");
  const a = await call("/api/session", { key: KEYS.admin, method: "POST" });
  const ac = a.headers.get("set-cookie").split(";")[0];
  assert.equal((await call("/api/files/download?id=3", { headers: { cookie: ac } })).status, 404, "admin cookie does not");
  const out = await call("/api/logout", { method: "POST" });
  assert.match(out.headers.get("set-cookie"), /jf60_dl=;.*Max-Age=0/);
  assert.equal(out.headers.get("cache-control"), "private, no-store");
});
