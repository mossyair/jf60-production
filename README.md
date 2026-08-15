# JF60 Production — shared event dashboard

A live, multi-user version of the production board. Everyone with the **edit link** can view, check items off, and add new items. The **admin link** can also delete seeded items and reset.

Runs on Cloudflare (Workers + D1). Free tier is far more than enough for this.

---

## What you need once

1. A **Cloudflare account** (free) — sign up at cloudflare.com.
2. **Node.js** installed (v18+). Check with `node --version`.

---

## Deploy — about 10 minutes, copy-paste

Open a terminal **inside this folder** and run these in order.

### 1. Install Wrangler (Cloudflare's CLI) and log in
```bash
npm install -g wrangler
wrangler login
```
A browser opens — approve access. Done once.

### 2. Create the database
```bash
wrangler d1 create jf60-db
```
This prints a block that includes a `database_id = "…"`. **Copy that ID.**

### 3. Paste the ID into `wrangler.toml`
Open `wrangler.toml`, find the line:
```
database_id = "PLACEHOLDER"
```
Replace `PLACEHOLDER` with the ID you just copied. Save.

### 4. Load the schedule into the database
```bash
npm run seed
```
(That runs the table setup, then the seed data — all 19 segments, 29 people, 24 checklist items.)

### 5. Set your two access keys
Pick two hard-to-guess phrases (like passwords). Run each command, and paste the value when prompted:
```bash
wrangler secret put EDIT_TOKEN
wrangler secret put ADMIN_TOKEN
```
> Example values: an edit key like `jf60-team-2026-cedar` and an admin key like `jf60-admin-9x71-olive`. Use your own.

### 6. Deploy
```bash
npm run deploy
```
Wrangler prints your live URL, e.g. `https://jf60-production.<your-subdomain>.workers.dev`.

**You're live.**

---

## Sharing access

Give people the URL plus the right key. Two ways:

- **Just send the URL** and tell them the key — they type it into the entry screen and their name (so their added items are attributed).
- **Or send a pre-keyed link** so they don't type anything:
  - Editors: `https://YOUR-URL/?k=YOUR_EDIT_TOKEN`
  - Admin (you + Carmi): `https://YOUR-URL/?k=YOUR_ADMIN_TOKEN`

Anyone with the edit link can check items off **and add new checklist items and people**. Only the admin link can delete the original seeded items or reset.

> Keep the admin link private. Anyone with a link is in — don't post either link publicly.

---

## Everyday use

- **Schedule** tab — the full run of show; click any segment to set status, confirm people, add items, take notes.
- **Checklist** tab — every open item across the whole event in one list. Type in the box + **Add item** to create a new one. Check the box to close it.
- **People** tab — every speaker/panelist, confirmed vs. not.

Changes save instantly to the shared database. The board also auto-refreshes every 20 seconds so you see each other's updates.

---

## Changing things later

- **Edit the seed** (fix a name, add a segment): edit `gen-seed.js`, run `node gen-seed.js`, then `npm run seed` again. Note: re-seeding replaces seeded rows and people, but **keeps** user-added checklist items.
- **Rotate a key**: just run `wrangler secret put EDIT_TOKEN` again with a new value and redeploy.

---

## Cost

Cloudflare's free tier covers this comfortably (100k requests/day, 5 GB D1). A 100-guest event team won't come close.

