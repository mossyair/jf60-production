#!/usr/bin/env node
// Local end-to-end test run. Builds a fresh local D1 + R2 from the migrations and synthetic fixtures,
// starts `wrangler dev --local` with test-only keys, and runs tests/*.test.mjs against it.
// Nothing here talks to the production database, bucket or secrets.
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { credentialSql } from "../scripts/issue-field-credential.mjs";
import { BASE, PORT, KEYS, CREDS } from "./env.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const state = join(root, ".wrangler", "test-state");
const tmp = join(root, ".wrangler", "test-tmp");
const wrangler = join(root, "node_modules", ".bin", "wrangler");
const run = (args) => execFileSync(wrangler, args, { cwd: root, stdio: ["ignore", "ignore", "inherit"], env: { ...process.env, CI: "1" } });

rmSync(state, { recursive: true, force: true });
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
console.log("· applying migrations to a fresh local D1");
run(["d1", "migrations", "apply", "jf60-db", "--local", "--persist-to", state]);
const credSql = Object.values(CREDS).map((c) => credentialSql(c, c.token)).join("\n");
writeFileSync(join(tmp, "creds.sql"), credSql + "\n");
console.log("· loading synthetic fixtures");
run(["d1", "execute", "jf60-db", "--local", "--persist-to", state, "--file", join(root, "tests", "fixtures", "synthetic.sql")]);
run(["d1", "execute", "jf60-db", "--local", "--persist-to", state, "--file", join(tmp, "creds.sql")]);
console.log("· putting synthetic files into local R2");
for (const [key, body] of [["test/content-1.pdf", "%PDF-1.4 run sheet"], ["test/general-2.pdf", "%PDF-1.4 contract"], ["test/general-3.xlsx", "PK budget"], ["test/content-4.pdf", "%PDF-1.4 slides"], ["test/content-5.html", "<script>alert(1)</script>"]]) {
  const f = join(tmp, key.replace(/\//g, "_"));
  writeFileSync(f, body);
  run(["r2", "object", "put", `jf60-files/${key}`, "--local", "--persist-to", state, "--file", f]);
}

const vars = { CHIEF_TOKEN: KEYS.chief, ADMIN_TOKEN: KEYS.admin, EDIT_TOKEN: KEYS.edit, VIEW_TOKEN: KEYS.view, DRIVER_TOKEN: KEYS.driverShared, AV_TOKEN: KEYS.avShared };
const devArgs = ["dev", "--local", "--persist-to", state, "--port", String(PORT), "--ip", "127.0.0.1", "--show-interactive-dev-session=false", ...Object.entries(vars).flatMap(([k, v]) => ["--var", `${k}:${v}`])];
console.log("· starting wrangler dev on " + BASE);
const dev = spawn(wrangler, devArgs, { cwd: root, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, CI: "1" } });
let log = "";
dev.stdout.on("data", (d) => (log += d));
dev.stderr.on("data", (d) => (log += d));
const stop = () => { try { dev.kill("SIGTERM"); } catch {} };
process.on("exit", stop);

let up = false;
for (let i = 0; i < 120 && !up; i++) {
  try { const r = await fetch(BASE + "/api/state"); up = r.status > 0; } catch { await new Promise((r) => setTimeout(r, 500)); }
}
if (!up) { console.error(log); stop(); process.exit(1); }

const only = process.argv.slice(2);
const files = (only.length ? only : readdirSync(join(root, "tests")).filter((f) => f.endsWith(".test.mjs")).map((f) => join("tests", f)));
let code = 0;
try {
  execFileSync(process.execPath, ["--test", "--test-concurrency=1", ...files], { cwd: root, stdio: "inherit", env: { ...process.env, TEST_PORT: String(PORT) } });
} catch (e) {
  code = e.status || 1;
}
if (process.env.SHOW_WORKER_LOG) console.log(log);
writeFileSync(join(tmp, "worker.log"), log);
stop();
process.exit(code);
