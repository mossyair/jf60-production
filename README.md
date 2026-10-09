# JF60 Production

The production app for the Jerusalem Foundation's 60th anniversary conference (20–22 October 2026).
It is one Cloudflare Worker (`src/`) with static pages (`public/`), a D1 database (`jf60-db`), an R2 bucket
(`jf60-files`) and, optionally, the Anthropic API for the assistant features.

| Page | Path | For |
|---|---|---|
| Classic dashboard | `/` | Program, guests, transport, food, design, files, notes, budget sheet |
| Control Room | `/control` | The same data in one place: home, program, people, logistics, production, inbox, print center |
| Driver app | `/driver` | Runs, pickups, navigation, location sharing |
| Group leader app | `/leader` | One hotel's guests, buses and boarding check |
| AV app | `/av` | AV needs, briefs and files per event |
| Crew app | `/crew` | Shifts, run sheets and site needs |

Changes to `main` deploy automatically through Workers Builds. Work on a branch, open a pull request, merge only when it is ready to go live.

---

## Who can do what

The server enforces all of this (`src/index.js`); the pages only hide what a key cannot use.

| | View | Edit | Admin | Chief |
|---|:-:|:-:|:-:|:-:|
| Public program (sessions, times, venues, public transport times) | ✓ | ✓ | ✓ | ✓ |
| Ask (read-only assistant; a view key's Ask sees only the public program) | ✓ | ✓ | ✓ | ✓ |
| Edit sessions, briefs, transport, food, design, to-dos, contacts, site needs, crew "done" | | ✓ | ✓ | ✓ |
| Upload files, read and file inbox documents (not guest lists, invoices, contracts) | | ✓ | ✓ | ✓ |
| Open files marked **ops** (team) | | ✓ | ✓ | ✓ |
| Open files marked **admin**; file guest lists, invoices, contracts | | | ✓ | ✓ |
| Guest passports, phones, emails; talent fees; catering quotes | | | ✓ | ✓ |
| Add or delete sessions, runs, guests, design and food items; import guests; apply AI suggestions | | | ✓ | ✓ |
| Change staff names and roles, add or remove staff (names identify people in the field apps) | | | ✓ | ✓ |
| Change file access; usage information | | | ✓ | ✓ |
| Budget sheet (`/api/grid`); files marked **chief** | | | | ✓ |

The chief key is an admin key that also opens the budget sheet and chief-only files. Admin keys do not open the budget.

Field apps never use dashboard keys:

| Role | Key | Sees and may change |
|---|---|---|
| Driver | individual credential (runs) or the shared `DRIVER_TOKEN` | all runs; "your runs" only from the credential; sends its location |
| Group leader | individual credential (person + hotels) | guests of the credential's hotels; may mark boarding only for those guests, only on nights they stay |
| AV | individual credential or the shared `AV_TOKEN` | AV needs (Shuster and podiums) and event-linked **ops** content files |
| Crew | individual credential (person + events, or all events) | ticks site needs of its events and shifts it is named on; event-linked **ops** content files of its events |

Identity in the field apps comes only from the credential. The name typed at sign-in is shown in the usage information and nowhere else.

---

## Secrets

Set with `npx wrangler secret put NAME` (production) or in `.dev.vars` (local only; never commit it). Nothing has a built-in default: if a secret is missing, that role simply cannot sign in.

| Secret | Needed for |
|---|---|
| `CHIEF_TOKEN` | chief key (budget) |
| `ADMIN_TOKEN` | admin key |
| `EDIT_TOKEN` | edit key |
| `VIEW_TOKEN` | view key (optional) |
| `DRIVER_TOKEN` | optional shared driver key, at least 16 characters; otherwise drivers need individual credentials |
| `AV_TOKEN` | optional shared AV key, at least 16 characters; otherwise AV needs an individual credential |
| `ANTHROPIC_API_KEY` | Ask, Suggest changes, menu reading, inbox reading (optional; without it these answer "not configured") |

Keys are compared exactly (case-sensitive), the same way as before this release. The existing chief, admin, edit and view keys stay as they are: nothing in this release requires changing or rotating them.

### Field credentials (individual keys)

Leaders and crew always need an individual credential; drivers and AV may use one. Only a SHA-256 hash is stored.

```bash
# prints a new token (give it to the person privately) and the SQL to store its hash
node scripts/issue-field-credential.mjs --role leader --person <team.id> --hotels mishkenot
node scripts/issue-field-credential.mjs --role crew   --person <team.id> --segments d1-opening,d2-dinner
node scripts/issue-field-credential.mjs --role crew   --person <team.id> --all
node scripts/issue-field-credential.mjs --role driver --label "Bus 1" --runs <run id>,<run id>
node scripts/issue-field-credential.mjs --role av     --label "AV supplier"

# then run the printed SQL yourself
npx wrangler d1 execute jf60-db --remote --command "<printed INSERT>"

# revoke
npx wrangler d1 execute jf60-db --remote --command "UPDATE field_credentials SET active=0, revoked_at=datetime('now') WHERE id=<id>"
```

`--person` is the `id` of the person in the staff sheet (`team` table). Hotel ids are in the `hotels` table:
`mishkenot`, `king-david`, `inbal`, `dan-panorama`. Each hotel's `name` must match `guests.hotel` and `run_stops.hotel_match` exactly.
A leader or crew credential whose person is deleted stops working; the staff sheet refuses to delete a person with an active credential.

---

## Database

The schema lives in ordered migrations in `migrations/`:

- `0001_baseline.sql`: the complete schema as it ran in production on 9 October 2026 (`CREATE … IF NOT EXISTS`, no data). On the existing production database it changes nothing.
- `0002_hardening.sql`: additive only. Revisions for the budget and notes, file and inbox access classes, the `hotels` and `field_credentials` tables, GPS fix time, registration ids, unique proof versions (renumbering any duplicates; no rows are removed), AI usage counters and idempotency keys.

```bash
npm run migrate:local     # local development database
npm run migrate:remote    # production (see "Deploying" first)
```

Wrangler records applied migrations in `d1_migrations`; applying again does nothing. There is no seed or reset script for production. Local development uses synthetic data only (`npm run seed-local`).

---

## Deploying this release

Order matters: the new code reads the new columns, and the old code keeps working with them. So the database goes first.

1. **Back up** (keep the file out of git; `backups/` is ignored):
   `npx wrangler d1 export jf60-db --remote --output backups/jf60-$(date +%Y%m%d-%H%M).sql`
   Note the time as well: D1 Time Travel can restore the database to any minute of the last 30 days (7 days on the free plan).
2. **Secrets**: leave `CHIEF_TOKEN`, `ADMIN_TOKEN`, `EDIT_TOKEN` and `VIEW_TOKEN` exactly as they are; people signed in with them stay signed in. The old built-in field keys no longer work. Either set `DRIVER_TOKEN` / `AV_TOKEN` (16+ characters) or issue individual credentials.
3. **Migrate**: `npm run migrate:remote`. Check: `npx wrangler d1 migrations list jf60-db --remote`.
4. **Field credentials**: issue one per group leader and crew member (see above) and send them out.
5. **Merge** the pull request. Workers Builds deploys `main`.
6. **Check**: sign in with each key; open a file; save a field and see "Saved"; open a field app with a credential.
7. **Review file access** (below) and **clean stored notes** (below).

### Rolling back

- Code: Cloudflare dashboard → Workers → jf60-production → Deployments → roll back to the previous version, or revert the merge on GitHub. The old code works with the migrated database, so the schema does not need to be rolled back. Be aware that rolling back the code also brings back everything this release fixed, including the old built-in field keys.
- Data: `npx wrangler d1 time-travel restore jf60-db --timestamp <time before the change>` (or import the backup into a fresh database). This also removes everything entered after that time, so it is the last resort.

---

## Reviewing file access

Every file has an access class: **ops** (whole team; field apps may open event-linked content), **admin**, or **chief**. The migration marks existing menus, proofs and event content files **ops** and every general file **admin**, all as "not reviewed".

Admins see each file's class in the classic dashboard → Files, and change it there (only the chief key can set **chief**). Changing it marks the file reviewed. To list what is still unreviewed:

```bash
npx wrangler d1 execute jf60-db --remote --command "SELECT id, filename, section, access FROM files WHERE access_reviewed=0"
```

New uploads: editors always create **ops** files; admins default general files to **admin** and the rest to **ops**. Filing an inbox document as a guest list, invoice or contract raises it to at least **admin**; filing never lowers access. Inbox items carry the access of their file.

## Cleaning stored notes

General notes are rich text. They are cleaned with an allowlist when saved and again every time they are read, so old content cannot run code in a browser. To rewrite the stored copy itself (after taking a backup):

```bash
# dry run: reports whether anything would change
curl -s -X POST https://<app>/api/admin/sanitize-notes -H "x-token: $ADMIN_TOKEN" -H "content-type: application/json" -d '{}'
# apply
curl -s -X POST https://<app>/api/admin/sanitize-notes -H "x-token: $ADMIN_TOKEN" -H "content-type: application/json" -d '{"apply":true}'
```

---

## How the numbers are defined

- **Staying at a hotel on a date**: active guests whose check-in ≤ date ≤ check-out. Driver pickups, the Control Room run sheet and the leader app use this. It is not an RSVP for a ride.
- **Boarding** (leader app): "marked on board" out of the guests listed for that night. Marks are stored on the server and shown only in the leader app; the Control Room and dashboard do not show them.
- **Session attendance** (crew app): active guests with an attending RSVP for that session.
- **Event day**: Israel time (Asia/Jerusalem), and a day runs until 05:00, so 00:15 belongs to the evening before.

## Saving and conflicts

- Nothing says "Saved" until the server has confirmed it. The status line under the header shows Saving…, Saved, or what went wrong.
- One-field edits send the value they started from. If someone else changed that field meanwhile, the server answers 409 and the screen shows the current value instead of overwriting it.
- The budget sheet merges cell edits; structural changes (rows, columns, sheets) and notes are saved with a revision number and refused if they are stale.
- In the Control Room, edits wait in a queue and are sent one at a time, in order. A failed edit stays (with Retry or Discard); the page warns before closing while something is unsaved.
- Imports compare first; nothing changes until "Apply selected". Cancellations are offered only when "complete guest list" is ticked, and start unticked. Apply re-checks every change against current data and is safe to repeat.

## Assistant (AI) limits

Ask is read-only. Suggest changes produces proposals; only an admin can apply them, and each is validated again. Requests are limited per day and per minute, at most 4 run at once, and each times out after 60 seconds (counted in D1, so limits hold across Worker instances). Guests are sent only as counts; files are sent only if the key may open them; spreadsheets send one sheet, capped.

## Usage information

Admins see who opened the apps (Control Room → Access & activity → Usage). It is usage information, not an audit log: names are what people type at sign-in, and a shared key can be used by several people.

---

## Local development and tests

```bash
npm install
npm run seed-local      # migrations + synthetic data into the local D1
npx wrangler dev        # http://localhost:8787, keys from .dev.vars
npm test                # full local test run (below)
```

`npm test` builds a fresh local D1 and R2 from the migrations and synthetic fixtures (`tests/fixtures/`), starts `wrangler dev` with test-only keys (it does not load `.dev.vars`), runs a fake Anthropic server, and runs:

- `tests/auth.test.mjs`: role × route matrix, field credentials, impersonation, file access, downloads, cookies
- `tests/data.test.mjs`: validation, conflicts, budget merges, notes sanitizing, proofs, imports, AI context and limits, GPS freshness, headers
- `tests/ui.test.mjs`: every page under the CSP, stored-markup safety, empty live data, save states and the queue, field apps, Hebrew and phone layout (Playwright + Chromium)
- `tests/clock.test.mjs`, `tests/upgrade.test.mjs`: event clock at midnight, and upgrading a production-shaped database

Nothing in the tests touches the production database, bucket or secrets.

Third-party browser code is vendored in `public/vendor/` (Leaflet 1.9.4, SheetJS 0.18.5, verified against the npm registry checksums), so the pages run under a strict Content Security Policy with no external scripts.
