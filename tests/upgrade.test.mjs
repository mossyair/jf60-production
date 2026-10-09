// Upgrade path: a database shaped like production today (baseline schema, data, no migration history,
// duplicate proof versions) takes both migrations without losing rows. Runs on a scratch local D1.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, ".wrangler", "upgrade-test");
const config = join(dir, "wrangler.toml");
const wr = (args) => execFileSync(join(root, "node_modules", ".bin", "wrangler"), [...args, "--config", config, "--local", "--persist-to", join(dir, "state")], { cwd: root, env: { ...process.env, CI: "1" }, stdio: ["ignore", "pipe", "pipe"] }).toString();
const sql = (q) => { const out = wr(["d1", "execute", "jf60-db", "--json", "--command", q]); return JSON.parse(out.slice(out.indexOf("["))).at(0).results; };

test("existing production-shaped database upgrades cleanly", () => {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  writeFileSync(config, `name = "jf60-upgrade"\nmain = "${join(root, "src", "index.js")}"\ncompatibility_date = "2026-01-01"\n[[d1_databases]]\nbinding = "DB"\ndatabase_name = "jf60-db"\ndatabase_id = "00000000-0000-0000-0000-000000000001"\nmigrations_dir = "${join(root, "migrations")}"\n`);
  // production today: the baseline schema created directly (no d1_migrations table) plus data
  wr(["d1", "execute", "jf60-db", "--file", join(root, "migrations", "0001_baseline.sql")]);
  writeFileSync(join(dir, "data.sql"), `
    INSERT INTO segments (id, day, time, end_time, title, venue, sort_order) VALUES ('a', 1, '09:00', '10:00', 'A', 'V', 0);
    INSERT INTO files (id, r2_key, filename, section, segment_id) VALUES (1, 'k1', 'menu.pdf', 'menu', 'f1'), (2, 'k2', 'contract.pdf', 'general', NULL), (3, 'k3', 'slides.pdf', 'content', 'a');
    INSERT INTO inbox_items (file_id, name) VALUES (2, 'contract.pdf'), (3, 'slides.pdf');
    INSERT INTO design_proofs (item_id, file_id, version) VALUES ('d1', 1, 1), ('d1', 1, 1), ('d1', 1, 2);
    INSERT INTO guests (first_name, last_name) VALUES ('Ada', 'Alpha');
    UPDATE admin_grid SET rows = '[["x","1"]]' WHERE id = 1;`);
  wr(["d1", "execute", "jf60-db", "--file", join(dir, "data.sql")]);
  wr(["d1", "migrations", "apply", "jf60-db"]);
  assert.deepEqual(sql("SELECT id, access, access_reviewed FROM files ORDER BY id"), [{ id: 1, access: "ops", access_reviewed: 0 }, { id: 2, access: "admin", access_reviewed: 0 }, { id: 3, access: "ops", access_reviewed: 0 }]);
  assert.deepEqual(sql("SELECT file_id, access FROM inbox_items ORDER BY file_id"), [{ file_id: 2, access: "admin" }, { file_id: 3, access: "ops" }]);
  assert.deepEqual(sql("SELECT version FROM design_proofs ORDER BY id").map((r) => r.version), [1, 2, 3], "duplicate versions renumbered, none lost");
  assert.equal(sql("SELECT COUNT(*) n FROM guests")[0].n, 1);
  assert.equal(sql("SELECT rows FROM admin_grid WHERE id=1")[0].rows, '[["x","1"]]');
  assert.equal(sql("SELECT rev FROM admin_grid WHERE id=1")[0].rev, 0);
  assert.equal(sql("SELECT COUNT(*) n FROM hotels")[0].n, 4);
  // running the migrations again does nothing
  const again = wr(["d1", "migrations", "apply", "jf60-db"]);
  assert.match(again, /No migrations to apply/i);
  rmSync(dir, { recursive: true, force: true });
});
