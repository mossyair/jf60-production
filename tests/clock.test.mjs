// Event clock (public/clock.js): Asia/Jerusalem wall time with a 05:00 day cutoff.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ctx = { window: {} };
vm.runInNewContext(readFileSync(new URL("../public/clock.js", import.meta.url), "utf8"), ctx);
const C = ctx.window.EventClock;
// 2026-10-21 00:10 in Jerusalem is 2026-10-20 21:10 UTC (IDT, UTC+3)
const at = (iso) => new Date(iso);

test("00:10 and 00:15 belong to the evening before", () => {
  for (const [utc, clock, min] of [["2026-10-20T21:10:00Z", "00:10", 1450], ["2026-10-20T21:15:00Z", "00:15", 1455]]) {
    const n = C.now(at(utc));
    assert.equal(n.date, "2026-10-20");
    assert.equal(n.day, 1);
    assert.equal(n.clock, clock);
    assert.equal(n.min, min);
  }
});
test("04:59 is still the day before; 05:00 starts the new day", () => {
  const a = C.now(at("2026-10-21T01:59:00Z"));
  assert.equal(a.date, "2026-10-20");
  assert.equal(a.min, 1440 + 299);
  const b = C.now(at("2026-10-21T02:00:00Z"));
  assert.equal(b.date, "2026-10-21");
  assert.equal(b.day, 2);
  assert.equal(b.min, 300);
});
test("the device time zone does not matter", () => {
  // same instant, independent of process TZ: computed with Intl in Asia/Jerusalem
  assert.equal(C.now(at("2026-10-22T17:30:00Z")).clock, "20:30");
});
test("schedule times on the event-day scale", () => {
  assert.equal(C.mins("00:15"), 1455);
  assert.equal(C.mins("24:15"), 1455);
  assert.equal(C.mins("04:59"), 1739);
  assert.equal(C.mins("05:00"), 300);
  assert.equal(C.hhmm(1455), "00:15");
});
