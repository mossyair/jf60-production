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
// A generated config in a scratch folder, so that no local .dev.vars (which may hold real secrets) is loaded.
const config = join(tmp, "wrangler.toml");
const run = (args) => execFileSync(wrangler, [...args, "--config", config], { cwd: root, stdio: ["ignore", "ignore", "inherit"], env: { ...process.env, CI: "1" } });

rmSync(state, { recursive: true, force: true });
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
writeFileSync(config, `name = "jf60-test"
main = "${join(root, "src", "index.js")}"
compatibility_date = "2026-01-01"
[assets]
directory = "${join(root, "public")}"
binding = "ASSETS"
run_worker_first = true
[[d1_databases]]
binding = "DB"
database_name = "jf60-db"
database_id = "00000000-0000-0000-0000-000000000000"
migrations_dir = "${join(root, "migrations")}"
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "jf60-files"
`);
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

// fake Anthropic API: records each request body (so tests can check what would be sent) and answers briefly
import { createServer } from "node:http";
const AI_PORT = PORT - 1;
const aiLog = join(tmp, "ai-requests.jsonl");
writeFileSync(aiLog, "");
const fake = createServer((req, res) => {
  let body = "";
  req.on("data", (d) => (body += d));
  req.on("end", async () => {
    const { appendFileSync } = await import("node:fs");
    appendFileSync(aiLog, body.replace(/\n/g, " ") + "\n");
    const slow = /SLOW-REQUEST/.test(body);
    setTimeout(() => {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ id: "msg_test", type: "message", role: "assistant", model: "test", content: [{ type: "text", text: "Synthetic answer." }], stop_reason: "end_turn", usage: { input_tokens: 1, output_tokens: 1 } }));
    }, slow ? 3000 : 10);
  });
});
fake.listen(AI_PORT, "127.0.0.1");
const vars = { ANTHROPIC_API_KEY: "test-not-a-real-key", ANTHROPIC_BASE_URL: `http://127.0.0.1:${AI_PORT}`, CHIEF_TOKEN: KEYS.chief, ADMIN_TOKEN: KEYS.admin, EDIT_TOKEN: KEYS.edit, VIEW_TOKEN: KEYS.view, DRIVER_TOKEN: KEYS.driverShared, AV_TOKEN: KEYS.avShared };
const devArgs = ["dev", "--config", config, "--local", "--persist-to", state, "--port", String(PORT), "--ip", "127.0.0.1", "--show-interactive-dev-session=false", ...Object.entries(vars).flatMap(([k, v]) => ["--var", `${k}:${v}`])];
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
// run the tests in a child process without blocking this one (the fake AI server lives here)
const code = await new Promise((resolve) => {
  const t = spawn(process.execPath, ["--test", "--test-concurrency=1", ...files], { cwd: root, stdio: "inherit", env: { ...process.env, TEST_PORT: String(PORT), AI_LOG: aiLog } });
  t.on("exit", (c) => resolve(c ?? 1));
});
if (process.env.SHOW_WORKER_LOG) console.log(log);
writeFileSync(join(tmp, "worker.log"), log);
stop();
fake.close();
process.exit(code);
