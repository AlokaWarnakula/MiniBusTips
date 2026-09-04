# Kohomada Bus? — Hackathon Plan

SE3090 Assignment 2 · 4-hour in-class build · Group ID: _TODO_

---

## 1. Problem (Sri Lanka)

Bus passengers have **no real-time information**. Standing at a halt you cannot
tell if a route is delayed, already full, or not running today (breakdown,
strike, weather, road diversion). Buses are not GPS-tracked, so no official feed
exists. People miss work and wait with no information.

## 2. Solution

A **no-login web app** with two features:

1. **Route & fare finder** — search by route number or start→destination; see the
   stop list; estimate fare + travel time for your segment.
2. **Live status reports** — any rider reports a route as normal / crowded /
   delayed / not running, optionally with bus plate + a location note. Everyone
   sees an aggregated live status dot per route (reports from the last 2 hours).

Value: crowd-sourced information that does not exist today. A few reporters help
everyone else on the route.

## 3. Scope (LOCKED — do not add features)

**In:** 8 real Colombo routes, route search (number + stops), stop timeline, fare
calculator, report form with validation, live feed with route filter + 15s
refresh, aggregated status, About page, responsive, 404.

**Out:** login/accounts, user profiles, a bus registry, real GPS tracking, maps
(Leaflet map of stops is *optional polish only, after minute 175*), edit/delete
of reports, trains/vans.

## 4. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro 5 (SSR) + React 19 islands | one project = pages + API |
| Hosting | Cloudflare Pages | one deploy, API runs on Workers under the hood |
| DB | Cloudflare D1 (SQLite), raw SQL | no ORM/migration tooling needed in 4h |
| Styling | Tailwind CSS 4 | fast, responsive by default |
| Lang | TypeScript (strict) | |
| Tooling | Wrangler | D1 + deploy |
| AI | Claude Code (Sonnet 5), + _TODO_ | scaffold + logic; all reviewed by team |

Monorepo (single project), **not** split FE/BE: splitting adds 2 deploys + CORS
for zero benefit at this scale. Pages Functions already runs the API on Workers.

## 5. Architecture

```
Browser
  /                     Astro SSR  – problem intro + RouteSearch island
  /route/[number]       Astro SSR  – stop timeline + FareCalculator + ReportList island
  /report               Astro SSR  – ReportForm + ReportList islands
  /about                Astro SSR  – problem explanation
  /api/reports  GET     list reports (optional ?route=)   ─┐
  /api/reports  POST    validate + insert report           ├─ Cloudflare D1 (table: reports)
  /api/health   GET     D1 connectivity check             ─┘

src/data/routes.json    static sample data (routes, stops, km)
src/lib/routes.ts       findRoutes, estimateFare, estimateMinutes, segmentKm
src/lib/reports.ts      validateReport (shared), liveStatus aggregation, timeAgo
```

**Data model — `reports`**

| col | type | notes |
|---|---|---|
| id | TEXT PK | `rpt_<random>` |
| route_number | TEXT | must match routes.json |
| status | TEXT | normal \| crowded \| delayed \| not_running |
| bus_reg | TEXT null | uppercased, light regex |
| note | TEXT null | ≤140 chars |
| reporter | TEXT null | ≤40 chars |
| created_at | INTEGER | epoch ms |

Buses are **not** entities — many reports per route is expected and good
(reinforcing signal). Status dot = most-reported status in last 2h, severity tie-break.

## 6. Fare logic (explainable in the demo)

Distance between the two chosen stops → minimum Rs. 30 for the first ~2.6 km
stage → + Rs. 8 per further 1.6 km stage → round to nearest Rs. 5. Guidance
estimate only, shown as such. Highway route (Colombo–Kandy) uses 45 km/h for
time, city routes 19 km/h.

## 7. Minimum-requirements checklist (tick on the DEPLOYED link, incognito)

- [ ] 1. Landing page — `/`
- [ ] 2. Problem shown in-app — `/` intro + `/about`
- [ ] 3. Two working features — route/fare finder + live reports
- [ ] 4. Input form — report form
- [ ] 5. Validation + friendly errors — empty route/status, bad plate, long note
- [ ] 6. Display/search/filter/calculate — route search, feed filter, fare calc
- [ ] 7. Responsive desktop + mobile
- [ ] 8. Navigation — header: Find Route / Live Reports / About
- [ ] 9. Sample data — routes.json + seeded reports
- [ ] 10. Clear SL value — shown in `/about` and the demo

## 8. Team & ownership

| Member | ID | Area | Files |
|---|---|---|---|
| _TODO_ | _TODO_ | Problem/design, data | `PLAN.md`, `about.astro`, `routes.json` |
| _TODO_ | _TODO_ | UI shell | `Layout.astro`, nav, responsive pass |
| _TODO_ | _TODO_ | Route search + fare | `RouteSearch.tsx`, `FareCalculator.tsx`, `lib/routes.ts` |
| _TODO_ | _TODO_ | Reports + deploy | `ReportForm.tsx`, `ReportList.tsx`, `api/reports.ts`, D1, CF Pages |

Everyone commits from their own machine on their own branch → PR → merge.
Record who did what here and in the README.

## 9. Timeline (240 min)

| Min | Phase | Action |
|---|---|---|
| 0–20 | Plan | Confirm scope (this file), create GitHub repo, everyone clones |
| 20–45 | Setup | `wrangler login` + `d1 create` + paste id; deploy hello-world to CF Pages; branch per person |
| 45–175 | Build | Each owner polishes their area against real use; keep `main` green; deploy on every merge |
| 175–205 | Polish | Validation messages, empty states, mobile test on real phone, re-seed data |
| 205–225 | Ship | Final push; run `db:remote`/`seed:remote`; test deployed link in incognito |
| 225–240 | Submit | Record 2-min video; fill submission PDF; upload with Group ID |

**Hard rules:** scope locked at min 20. Stop building at min 175.

## 10. Commands

```bash
npm install
npm run db:local && npm run seed:local     # local D1
npm run dev                                 # http://localhost:4321

# deploy
npx wrangler login
npx wrangler d1 create minihack-bus         # paste database_id -> wrangler.toml
npm run db:remote && npm run seed:remote
npm run deploy
# verify: open <pages-url>/api/health  -> {"ok":true,...}
```

## 11. Submission (single PDF, renamed to Group ID)

1. Git repo link
2. Deployed app link
3. 2-min demo video link
4. Team names + student IDs
5. Short problem/solution description (Sections 1–2 above)
6. Technologies + AI tools list (Section 4)
7. AI Prompt Log (`AI_PROMPT_LOG.md`)

## 12. Demo script (2 min)

1. (15s) Team + app name + the problem.
2. (20s) `/` — search route 138 by number.
3. (30s) Route page — stop timeline; fare calc Maharagama→Pettah; live status dot
   showing "Delayed" from reports.
4. (30s) `/report` — submit a "Not running" report for 177 with a note; show it
   appear in the feed and the status dot change.
5. (15s) Resize to mobile — responsive.
6. (10s) Deployed URL + expected impact.

## 13. Possible improvements (only if ahead of schedule)

See "Improvements" section below — pick at most one or two, after minute 175.

### High value, low risk
- **"Report looks wrong?" 👎** on each report; 3 downvotes hides it from the feed
  (new column `flags INTEGER DEFAULT 0`, PATCH endpoint). Handles abuse without login.
- **Route status on the home list** — show each route's live dot on `/` cards
  (one `/api/reports` call, group client-side). Big visual payoff for the demo.
- **"Last updated" + manual refresh button** on the feed.
- **Empty-state illustrations** and a skeleton loader (polish marks).
- **`prefers-reduced-motion`** and basic a11y labels on the status buttons.

### Medium value / medium risk
- **Leaflet + OpenStreetMap** map of the selected route's stops (static markers,
  popups show recent notes). No GPS. ~30 min. Only if everything else is done.
- **Filter feed by status** (not just route) — 4 toggle chips.
- **Sort routes by "most reported problems now"** on the home page.
- **Share button** — copy a link to the route page.
- **Basic rate limit** on POST `/api/reports` (per-IP, in-memory or KV) to stop
  spam during the demo.

### Nice, but probably skip
- PWA / installable / offline cache of routes.json.
- i18n (Sinhala/Tamil labels) — meaningful but time-consuming to do well.
- Historical trends ("this route is usually late at 5pm").
- Photo upload with a report (needs R2 + moderation).

### Code-quality improvements (do during polish)
- Extract the repeated Tailwind `field` class into a shared component.
- `ReportList` — show a small error state if `/api/reports` fails.
- Debounce the From/To search in `RouteSearch`.
- Add `aria-live` to the form success message.
- Move the fare constants (30, 8, 1.6, 2.6) to named exports so the About page and
  the calculator read from one source of truth.
- Guard `estimateMinutes` route-`"1"` check → use a `speedKmh` field on each route
  in `routes.json` instead of a hardcoded number.
