#!/usr/bin/env node
// Issue an individual field-app credential (driver, group leader, AV, crew).
// Prints the new token once (give it to the person) and the SQL that stores only its SHA-256 hash.
// Nothing is sent anywhere: review the SQL, then run it yourself with
//   npx wrangler d1 execute jf60-db --remote --command "<the printed SQL>"
//
// Usage:
//   node scripts/issue-field-credential.mjs --role leader --person 12 --hotels mishkenot
//   node scripts/issue-field-credential.mjs --role crew --person 7 --segments d1-opening,d2-gala
//   node scripts/issue-field-credential.mjs --role crew --person 3 --all
//   node scripts/issue-field-credential.mjs --role driver --label "Bus 1" --runs r1,r4
//   node scripts/issue-field-credential.mjs --role av --label "AV supplier"
// Revoke: UPDATE field_credentials SET active=0, revoked_at=datetime('now') WHERE id=<id>;
import { createHash, randomBytes } from "node:crypto";
import { pathToFileURL } from "node:url";

const ROLES = ["driver", "leader", "av", "crew"];
const sq = (s) => "'" + String(s).replace(/'/g, "''") + "'";
const list = (v) => JSON.stringify(String(v || "").split(",").map((x) => x.trim()).filter(Boolean));

export function newToken() {
  return randomBytes(24).toString("base64url");
}
export function credentialSql({ role, person = null, label = "", hotels = "", runs = "", segments = "", all = false }, token) {
  if (!ROLES.includes(role)) throw new Error(`role must be one of ${ROLES.join(", ")}`);
  if ((role === "leader" || role === "crew") && !person) throw new Error(`a ${role} credential needs --person <team id>`);
  if (role === "leader" && !hotels) throw new Error("a leader credential needs --hotels <hotel ids>");
  if (!/^[A-Za-z0-9_-]{20,128}$/.test(token)) throw new Error("token must be 20-128 characters of A-Z a-z 0-9 _ -");
  const hash = createHash("sha256").update(token).digest("hex");
  return `INSERT INTO field_credentials (token_hash, role, person_id, label, hotel_ids, run_ids, segment_ids, all_scope) VALUES (${sq(hash)}, ${sq(role)}, ${person ? Number(person) : "NULL"}, ${sq(label)}, ${sq(list(hotels))}, ${sq(list(runs))}, ${sq(list(segments))}, ${all ? 1 : 0});`;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i].replace(/^--/, "");
    if (k === "all") args.all = true;
    else args[k] = argv[++i];
  }
  try {
    const token = newToken();
    const sql = credentialSql(args, token);
    console.log("Token (give it to the person; it is not stored anywhere):\n  " + token + "\n");
    console.log("SQL to store the credential (hash only):\n  " + sql);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
