# AI Prompt Log

For each significant AI use: tool, exact prompt, purpose, and how we checked or
changed the output. Redact passwords, API keys and personal data.

| # | Tool | Prompt (summary / exact) | Purpose | How we checked / changed it |
|---|------|--------------------------|---------|-----------------------------|
| 1 | Claude Code (Sonnet 5) | "Scaffold an Astro + React + Cloudflare Pages + D1 app for a Sri Lankan bus route finder + crowd-sourced live status reports. No login. 3 screens." | Project scaffold, stack setup | Reviewed every generated file; confirmed the D1 binding, ran it locally, checked the 3 pages render. |
| 2 | Claude Code (Sonnet 5) | (part of #1) fare + travel-time helper `src/lib/routes.ts` | Fare calculation logic | Checked the Rs. 30 minimum + stage rate against real bus fares; adjusted stage length to 1.6 km. |
| 3 | Claude Code (Sonnet 5) | (part of #1) `validateReport` shared validation + `ReportForm` errors | Input validation with friendly messages | Tested empty route, empty status, bad plate, long note; confirmed messages show. |
| 4 | _TODO_ | _TODO_ | _TODO_ | _TODO_ |

## Declaration

_TODO: one line per tool, e.g._
"Claude Code — scaffolded the app and wrote the initial components; we reviewed
all files, tuned the fare formula and status aggregation, and can explain the code."
