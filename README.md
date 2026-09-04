# Kohomada Bus? — Sri Lanka bus route & live status

**SE3090 Assignment 2 — Mini Hackathon** · Build for Sri Lanka

- **Deployed app:** _TODO paste Cloudflare Pages URL_
- **Demo video:** _TODO paste link_
- **Group ID:** _TODO_

## The selected problem

Sri Lankan bus passengers have no official real-time information. Standing at a
halt, you cannot tell whether a route is delayed, already full, or not running
today (breakdown, strike, weather, road diversion). People miss work and wait
with no information.

## The proposed solution

A no-login web app with two features:

1. **Route & fare finder** — search by route number or by start + destination,
   see the stop list, and estimate fare and travel time for your segment.
2. **Live status reports** — any rider reports a route as normal / crowded /
   delayed / not running, optionally with the bus plate and a location note.
   Every visitor sees a live status dot per route, aggregated from reports in the
   last 2 hours.

## Main features

- Route search by number and by From→To over 8 real Colombo-area routes
- Per-route stop timeline with distances
- Fare + travel-time calculator (Rs. 30 min, ~Rs. 8 per 1.6 km stage, rounded)
- Crowd-sourced live reports with shared D1 storage and 15s auto-refresh
- Aggregated live status per route (most-reported status, severity tie-break)
- Live status dots on the home route list
- Report form with input validation and friendly error messages
- Route filter + status filter chips on the reports feed
- "Looks wrong" community flagging — 3 flags hides a report (no login needed)
- Responsive layout (mobile + desktop), skeleton loaders, empty states, basic nav, seeded sample data

## Minimum requirements mapping

| # | Requirement | Where |
|---|---|---|
| 1 | Landing page | `/` |
| 2 | Problem explained in-app | `/` intro + `/about` |
| 3 | Two functional features | route/fare finder + live reports |
| 4 | Input form | report form on `/report` |
| 5 | Validation + friendly errors | `src/lib/reports.ts` `validateReport`, shown in `ReportForm` |
| 6 | Display / search / filter / calculate | route search, feed filter, fare calc |
| 7 | Responsive | Tailwind, tested mobile + desktop |
| 8 | Navigation | header nav: Find Route / Live Reports / About |
| 9 | Sample data | `src/data/routes.json`, `seed.sql` |
| 10 | Clear value to SL users | `/about` |

## Technologies used

- **Astro 5** (SSR) + **React 19** islands
- **Cloudflare Pages** (hosting) + **Cloudflare D1** (SQLite) for reports
- **Tailwind CSS 4**
- **TypeScript**
- **Wrangler** for D1 + deploy

## AI tools used

- **Claude Code (Claude Sonnet 5)** — scaffolded the Astro + CF project, wrote the
  route data model, fare logic, API route and React components. We reviewed every
  file, adjusted the fare formula and status-aggregation rules, and can explain
  the code.
- _TODO add any other tool (e.g. ChatGPT for sample stop data) — one line each._

See `AI_PROMPT_LOG.md` for the full prompt log.

## Team members and contributions

| Member | Student ID | Contribution |
|---|---|---|
| _TODO_ | _TODO_ | Problem & solution design, `/about`, route data |
| _TODO_ | _TODO_ | UI shell, layout, navigation, responsive pass |
| _TODO_ | _TODO_ | Route search + fare calculator |
| _TODO_ | _TODO_ | Reports API + form + feed, D1, deployment |

## Run locally

```bash
npm install
npm run db:local        # create schema in local D1
npm run seed:local      # optional: load sample reports
npm run dev             # http://localhost:4321
```

## Deploy (Cloudflare Pages)

```bash
npx wrangler login
npx wrangler d1 create minihack-bus          # paste database_id into wrangler.toml
npm run db:remote
npm run seed:remote
npm run deploy
```

Or connect the GitHub repo in the Cloudflare Pages dashboard with build command
`npm run build`, output dir `dist`, and bind D1 database `minihack-bus` as `DB`.

## Declaration

AI tools were used as described above and in `AI_PROMPT_LOG.md`. All code was
reviewed by the team and every member can explain their sections. No pre-built or
previously submitted project was reused.
