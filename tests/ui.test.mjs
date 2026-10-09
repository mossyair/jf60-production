// Browser checks (Playwright + the pre-installed Chromium) against the local Worker started by run.mjs.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { BASE, KEYS, CREDS } from "./env.mjs";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require(execSync("npm root -g").toString().trim() + "/playwright")); }

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser?.close(); });

// a page that records console errors and CSP violations
async function open(path, { mobile = false } = {}) {
  const ctx = await browser.newContext(mobile ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const problems = [];
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) problems.push(m.text()); });
  page.on("pageerror", (e) => problems.push("pageerror: " + e.message));
  await page.addInitScript(() => { window.__csp = []; document.addEventListener("securitypolicyviolation", (e) => window.__csp.push(e.violatedDirective + " " + e.blockedURI)); });
  await page.goto(BASE + path);
  return { page, ctx, problems };
}
async function signIn(page, key, name = "Tester") {
  const gateKey = (await page.$("#gateKey")) ? "#gateKey" : "#gKey";
  const gateName = gateKey === "#gateKey" ? "#gateName" : "#gName";
  await page.fill(gateName, name);
  await page.fill(gateKey, key);
  await page.keyboard.press("Enter");
}

test("every page loads under the CSP without errors", async () => {
  for (const p of ["/", "/control", "/driver", "/leader", "/av", "/crew"]) {
    const { page, ctx, problems } = await open(p);
    await page.waitForTimeout(300);
    const csp = await page.evaluate(() => window.__csp);
    assert.deepEqual(csp, [], p + " CSP: " + csp.join(", "));
    assert.deepEqual(problems, [], p + " console: " + problems.join(" | "));
    await ctx.close();
  }
});

test("stored HTML in data never runs (classic dashboard and Control Room)", async () => {
  const payload = '<img src=x onerror="window.__xss=1"><script>window.__xss=2</script>';
  await fetch(BASE + "/api/segment/field", { method: "POST", headers: { "x-token": KEYS.admin, "content-type": "application/json" }, body: JSON.stringify({ id: "s1-tour", field: "title", value: "Tour " + payload }) });
  await fetch(BASE + "/api/team/field", { method: "POST", headers: { "x-token": KEYS.admin, "content-type": "application/json" }, body: JSON.stringify({ id: 3, field: "name", value: "Pat " + payload }) });
  await fetch(BASE + "/api/contact/add", { method: "POST", headers: { "x-token": KEYS.admin, "content-type": "application/json" }, body: JSON.stringify({ name: "Evil " + payload, role: payload, venue: "Test Theater" }) });
  for (const [path, views] of [["/", ["schedule", "checklist", "people", "transport", "files", "notes"]], ["/control", ["program", "people", "logistics", "production", "print"]]]) {
    const { page, ctx, problems } = await open(path);
    await page.evaluate(() => { try { localStorage.setItem("jf60-ui", location.pathname === "/" ? "classic" : "control"); localStorage.setItem("jf60-tour", "done"); } catch {} });
    await page.reload();
    await signIn(page, KEYS.admin);
    await page.waitForTimeout(1200);
    for (const v of views) {
      const sel = path === "/" ? `[data-view="${v}"], [data-v="${v}"], #nav-${v}` : `[data-area="${v}"]`;
      const el = await page.$(sel);
      if (el) { await el.click().catch(() => {}); await page.waitForTimeout(400); }
    }
    if (path === "/control") { await page.click('[data-area="program"]'); await page.click('[data-ev="s1-tour"]'); await page.waitForTimeout(300); }
    assert.equal(await page.evaluate(() => window.__xss), undefined, path + " ran injected markup");
    assert.deepEqual(await page.evaluate(() => window.__csp), [], path);
    assert.deepEqual(problems, [], path + " console: " + problems.join(" | "));
    await ctx.close();
  }
  await fetch(BASE + "/api/segment/field", { method: "POST", headers: { "x-token": KEYS.admin, "content-type": "application/json" }, body: JSON.stringify({ id: "s1-tour", field: "title", value: "Garden tour" }) });
  await fetch(BASE + "/api/team/field", { method: "POST", headers: { "x-token": KEYS.admin, "content-type": "application/json" }, body: JSON.stringify({ id: 3, field: "name", value: "Pat Producer" }) });
});

test("Control Room with empty live data shows empty sections, never sample data", async () => {
  const { page, ctx } = await open("/control");
  await page.evaluate(() => { try { localStorage.setItem("jf60-tour", "done"); } catch {} });
  const empty = { level: "admin", chief: false, segments: [], people: [], checklist: [], venues: [], contacts: [], team: [], timeline: [], food_items: [], dietary: [], guests: [], guest_sessions: [], design_items: [], design_proofs: [], transport_runs: [], run_stops: [], gift_items: [], crew_shifts: [], talent_items: [], fair_orgs: [], day_guests: [], catering_quotes: [], furniture_items: [], site_needs: [], inbox_items: [], hotels: [], unavailable: ["crew_shifts"] };
  await page.route("**/api/state", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(empty) }));
  await page.route("**/api/files", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"files":[]}' }));
  await page.route("**/api/access/**", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true,"rows":[]}' }));
  await signIn(page, KEYS.admin);
  await page.waitForTimeout(800);
  let text = "";
  for (const a of ["home", "program", "people", "logistics", "production", "inbox", "settings"]) {
    await page.click(`[data-area="${a}"]`);
    await page.waitForTimeout(150);
    text += await page.innerText("body");
  }
  for (const sample of ["Hagai", "Schuster", "Peacock", "₪395,800", "Guest 01", "Organization 01", "Welcome and Opening Session", "Mayumana", "Sample data", "· sample", "Personal key", "Plan rotation"])
    assert.ok(!text.includes(sample), "found sample data: " + sample);
  await page.click('[data-area="logistics"]');
  await page.click('[data-t="logistics"][data-k="ops"]').catch(() => {});
  assert.match(await page.innerText("#page"), /could not be loaded/i, "unavailable section is flagged");
  await ctx.close();
});

test("Control Room never says Saved before the server confirms; failed saves stay queued", async () => {
  const { page, ctx } = await open("/control");
  await page.evaluate(() => { try { localStorage.setItem("jf60-tour", "done"); } catch {} });
  await signIn(page, KEYS.edit);
  await page.waitForSelector('[data-area="program"]');
  const day2 = async () => { await page.click('[data-area="program"]'); await page.click('[data-ptab="2"]'); };
  await day2();
  for (const [status, kind, re] of [[500, "server", /not saved/i], [400, "validation", /not saved/i], [403, "forbidden", /not saved/i], [409, "conflict", /changed by someone else/i]]) {
    await page.route("**/api/segment/status", (r) => r.fulfill({ status, contentType: "application/json", body: JSON.stringify({ error: "test " + kind, kind: status === 409 ? "conflict" : undefined, current: { status: "open" } }) }));
    await page.click('[data-ev="s2-panel"]');
    const sel = await page.$("#evStatus");
    const cur = await sel.inputValue();
    await sel.selectOption(cur === "open" ? "progress" : "open");
    await page.waitForTimeout(400);
    const st = await page.innerText("#saveSt");
    assert.match(st, re, status + ": " + st);
    assert.ok(!/✓/.test(st), status + " showed Saved");
    const q = await page.evaluate(() => JSON.parse(sessionStorage.getItem("jf60-cr-queue") || "[]"));
    assert.equal(q.length, 1, status + " queue kept");
    await page.unroute("**/api/segment/status");
    page.once("dialog", (d) => d.accept());
    await page.click("#qDiscard, #qReload");
    await page.waitForTimeout(500);
    await day2();
  }
  // network failure, then retry succeeds and only then says Saved
  await page.route("**/api/segment/status", (r) => r.abort("internetdisconnected"));
  await page.click('[data-ev="s2-panel"]');
  await page.selectOption("#evStatus", "confirmed");
  await page.waitForTimeout(300);
  assert.match(await page.innerText("#saveSt"), /not saved/i);
  // a reload warns while something is unsaved
  const warns = await page.evaluate(() => { const e = new Event("beforeunload", { cancelable: true }); window.dispatchEvent(e); return e.defaultPrevented; });
  assert.equal(warns, true);
  await page.unroute("**/api/segment/status");
  await page.click("#qRetry");
  await page.waitForFunction(() => /✓/.test(document.querySelector("#saveSt").innerText), null, { timeout: 5000 });
  const st = await (await fetch(BASE + "/api/state", { headers: { "x-token": KEYS.edit } })).json();
  assert.equal(st.segments.find((x) => x.id === "s2-panel").status, "confirmed");
  await ctx.close();
});

test("classic dashboard: failed saves are reported, never shown as saved", async () => {
  const { page, ctx, problems } = await open("/");
  await page.evaluate(() => { try { localStorage.setItem("jf60-ui", "classic"); } catch {} });
  await signIn(page, KEYS.edit);
  await page.waitForSelector("#main", { state: "visible" });
  await page.route("**/api/notes", (r) => r.request().method() === "POST" ? r.fulfill({ status: 500, contentType: "application/json", body: '{"error":"boom"}' }) : r.continue());
  await page.evaluate(() => { ui.view = "notes"; render(); });
  await page.waitForSelector("#notesEditor[contenteditable=true]");
  await page.click("#notesEditor");
  await page.keyboard.type(" more");
  await page.waitForTimeout(1300);
  assert.match(await page.innerText("#notesHint"), /not saved/i);
  assert.match(await page.innerText("#saveSt"), /not saved/i);
  await page.unroute("**/api/notes");
  // a stale revision comes back as a conflict with a choice, not a silent overwrite
  await fetch(BASE + "/api/notes", { method: "GET", headers: { "x-token": KEYS.admin } }).then((r) => r.json()).then((n) => fetch(BASE + "/api/notes", { method: "POST", headers: { "x-token": KEYS.admin, "content-type": "application/json" }, body: JSON.stringify({ rev: n.rev, body: "<p>admin wrote this</p>", by: "Admin" }) }));
  await page.click("#notesEditor");
  await page.keyboard.type(" again");
  await page.waitForTimeout(1300);
  assert.match(await page.innerText("#notesHint"), /changed the notes meanwhile/i);
  assert.ok(await page.$("#nTheirs"));
  assert.deepEqual(problems.filter((p) => !/Not saved|boom|500|409/.test(p)), []);
  await ctx.close();
});

test("field apps: identity from the key, boarding count matches the list, logout clears the key", async () => {
  const { page, ctx, problems } = await open("/leader", { mobile: true });
  await signIn(page, CREDS.leaderA.token, "Somebody Else");
  await page.waitForSelector("#app:not([hidden])");
  assert.match(await page.innerText("#who"), /Lea Leader/);
  await page.evaluate(() => { DAY = 1; FIELD.render(); });
  const count = await page.innerText("#bcount");
  const listed = await page.$$eval("[data-board]", (els) => els.length);
  assert.equal(count.split("/")[1], String(listed), "denominator = guests listed");
  assert.match(await page.innerText("#board"), /לא מוצג כרגע בחדר הבקרה/);
  assert.ok(await page.$("#conn"), "connection line");
  const overflow = await page.evaluate(() => document.scrollingElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 1, "no horizontal scroll on a phone: " + overflow);
  await page.click("#logout");
  await page.waitForURL(BASE + "/");
  assert.equal(await page.evaluate(() => sessionStorage.getItem("jf60k")), null);
  assert.deepEqual(problems, []);
  await ctx.close();
});

test("driver page: assigned run comes from the key; GPS sends carry the fix time", async () => {
  const { page, ctx } = await open("/driver", { mobile: true });
  await ctx.grantPermissions(["geolocation"]);
  await ctx.setGeolocation({ latitude: 31.7767, longitude: 35.2234, accuracy: 12 });
  const sent = [];
  await page.route("**/api/driver/position", async (r) => { sent.push(JSON.parse(r.request().postData())); await r.continue(); });
  await signIn(page, CREDS.driverR1.token, "Bus 1");
  await page.waitForSelector("#app:not([hidden])");
  await page.evaluate(() => { DAY = 1; render(); });
  assert.match(await page.innerText("#main"), /הנסיעה שלך/);
  await page.click("#shareBtn");
  await page.waitForTimeout(1500);
  assert.ok(sent.length >= 1, "a position was sent");
  assert.ok(Number.isFinite(sent[0].fix_at), "fix time included");
  assert.equal(sent[0].run_id, undefined, "the page does not guess a run");
  assert.match(await page.innerText("#shareSt"), /נשלח/);
  await ctx.close();
});

test("Hebrew, right-to-left and keyboard sign-in in the Control Room", async () => {
  const { page, ctx, problems } = await open("/control", { mobile: true });
  await page.evaluate(() => { try { localStorage.setItem("jf60-tour", "done"); } catch {} });
  await page.focus("#gName");
  await page.keyboard.type("Tester");
  await page.keyboard.press("Tab");
  await page.keyboard.type(KEYS.edit);
  await page.keyboard.press("Enter");
  await page.waitForSelector('#bottomNav [data-area="home"]');
  await page.click('#langSeg [data-k="he"]').catch(async () => { await page.evaluate(() => document.querySelector('#langSeg [data-k="he"]').click()); });
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => document.documentElement.dir), "rtl");
  const overflow = await page.evaluate(() => document.scrollingElement.scrollWidth - window.innerWidth);
  assert.ok(overflow <= 1, "no horizontal scroll: " + overflow);
  const unlabeled = await page.$$eval("input:not([type=hidden]):not([type=file]), select, textarea", (els) => els.filter((e) => e.offsetParent && !e.labels?.length && !e.getAttribute("aria-label") && !e.getAttribute("title") && !e.closest("label")).map((e) => e.id || e.outerHTML.slice(0, 60)));
  assert.deepEqual(unlabeled, [], "form fields without a label");
  assert.deepEqual(problems, []);
  await ctx.close();
});
