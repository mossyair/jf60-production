import { test } from "node:test";
import assert from "node:assert/strict";
import { call, KEYS } from "./env.mjs";
test("admin state loads", async () => {
  const r = await call("/api/state", { key: KEYS.admin });
  assert.equal(r.status, 200, JSON.stringify(r.data).slice(0, 300));
});
