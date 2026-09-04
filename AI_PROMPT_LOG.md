# AI Prompt Log

**Module:** SE3090 Assignment 2 — Mini Hackathon
**Project:** Kohomada Bus? — Sri Lanka bus route & live status
**Deployed app:** https://f1df5df4.minihack-bus.pages.dev

This file is the team's honest audit trail of every significant use of an AI
coding tool on this project. For each use we record: the tool, what we asked for
(prompt intent), why we asked, how a human checked the result, and what the AI
was **not** allowed to decide.

Rules we followed while keeping this log:

- No passwords, API keys, database IDs or personal data are recorded here.
- Nothing is logged that did not actually happen. No invented prompts, no
  invented checks, no invented commits.
- AI output was never merged unread. Every entry below names a human check.
- The team can explain any line of the delivered code without the AI present.

---

## 1 · Project scaffold (Astro + React + Cloudflare Pages + D1)

| | |
|---|---|
| **Tool** | Claude Code (Claude Sonnet 5) |
| **Prompt intent** | "Scaffold an Astro + React + Cloudflare Pages + D1 app for a Sri Lankan bus route finder plus crowd-sourced live status reports. No login. Three screens." |
| **Purpose** | Get a working project skeleton and stack wiring quickly, so the limited build time went into the two graded features rather than boilerplate. |
| **Human verification** | We read every generated file before keeping it. We confirmed the D1 binding resolves, ran the app locally, and checked that all three pages render. |
| **Scope limit** | The AI chose no product requirements. The problem, the two features and the screen list came from us and from the assignment specification. |

## 2 · Fare and travel-time helper (`src/lib/routes.ts`)

| | |
|---|---|
| **Tool** | Claude Code (Claude Sonnet 5) — continuation of #1 |
| **Prompt intent** | Ask for a fare and travel-time helper driven by the route data file. |
| **Purpose** | Implement requirement 6 (calculate), so a rider can price a segment before boarding. |
| **Human verification** | We compared the generated formula against real Sri Lankan bus fares, then **changed it ourselves**: we kept the Rs. 30 minimum and set the stage length to 1.6 km at roughly Rs. 8 per stage. |
| **Scope limit** | The fare rules are ours. The AI wrote the arithmetic; it did not decide the rates, and the result is shown in the UI as an estimate, not an official fare. |

## 3 · Shared input validation (`validateReport` + `ReportForm` errors)

| | |
|---|---|
| **Tool** | Claude Code (Claude Sonnet 5) — continuation of #1 |
| **Prompt intent** | Ask for one shared validation function used by both the API route and the form, returning friendly per-field messages instead of raw errors. |
| **Purpose** | Requirements 4 and 5 — an input form with validation and clear error messages. |
| **Human verification** | We manually submitted an empty route, an empty status, a malformed number plate and an over-length note, and confirmed the correct message appears on each field. |
| **Scope limit** | The wording of the user-facing messages was reviewed and edited by us so it reads naturally to a Sri Lankan rider. |

## 4 · Pre-deploy hardening pass (two AI agents, cross-reviewed)

| | |
|---|---|
| **Tool** | Claude Code (Claude Sonnet 5) **and** OpenAI Codex (GPT-5.6), coordinated locally through the DevTeam MCP server |
| **Prompt intent** | "Harden the MVP before the deadline: verify everything works, fix code-quality problems, add a small feature that helps riders tell apart several buses on the same route, and deploy to Cloudflare." |
| **Purpose** | Turn a working prototype into something safe to demo on a public link. |
| **Human verification** | The work was split into separate assignments and **each agent reviewed the other's changes**, with a team member reading the diff before it was merged. Verified outcomes: a Cloudflare Sessions deploy blocker fixed; the report note limit aligned at 140 characters on both client and server; highway speed moved out of hardcoded logic into the route data; a real 404 returned for an unknown route instead of a silent redirect; the plate regex widened to accept province-prefixed plates; "buses reported recently" plate chips plus an "updated N seconds ago" and manual Refresh control added. The deployed link's `/api/health` endpoint was called and answered `{"ok":true,...}`. |
| **Scope limit** | A human supplied and authorized the deployment account context. Codex ran the Cloudflare Pages deployment at the team's instruction; it did not choose the account, publish without approval, or author a Git commit. The team reviewed the deployed result. |

## 5 · Documentation and audit-trail pass (this file)

| | |
|---|---|
| **Tool** | Claude Code (Claude Opus 5), with OpenAI Codex as independent reviewer, coordinated through DevTeam |
| **Prompt intent** | "Make the AI prompt log clearer and more complete: state the purpose and the human check for every entry, replace the placeholder declaration, and explain honestly how Git contributions work across the team." |
| **Purpose** | Meet the assignment's AI-disclosure requirement with a log a marker can actually audit. |
| **Human verification** | The facts in this file were checked against the repository before writing: `git log` for the real commit history and authors, and `README.md` / `PLAN.md` for the member list and ownership split. A second agent reviewed the result, and a team member read the final file. |
| **Scope limit** | This pass changed documentation only — no application code, no data and no deployment configuration was touched. The one repository action taken, at the team's explicit request, was creating and pushing the four member branches listed below; no commit was authored by the AI and no deployment was run. |

---

## Git collaboration and authorship

A marker can read our commit history, so it has to be truthful.

**Current state of the history (checked, not assumed).** Every commit on `main`
so far was authored by `it24101147`, who also did the merges and the deployment.
The other members' contributions are recorded in the tables in `README.md` and
`PLAN.md`, and are not yet reflected in Git authorship.

**How the remaining members add their work — the only correct way.** One branch
per member already exists on the remote, all four branched from the same commit
on `main`:

| Branch | Member | Area |
|---|---|---|
| `feature/m1-design-about-route-data` | it24100509 | Problem & solution design, `/about`, route data |
| `feature/m2-ui-shell-responsive` | it24102629 | UI shell, layout, navigation, responsive pass |
| `feature/m3-route-search-fare` | it24101027 | Route search + fare calculator |
| `feature/m4-reports-d1-deploy` | it24101147 | Reports API + form + feed, D1, deployment |

Each member checks out their own branch on their own machine and commits **as
themselves**:

```bash
git config user.name  "Member Name"
git config user.email "member@example.com"
git checkout feature/m2-ui-shell-responsive
git commit -m "feat(ui): what they built"
git push
```

Then open a pull request into `main`, as the existing `feature/*` and `chore/*`
branches in this repository already do.

**What we deliberately did not do.** Git makes it technically possible for one
person to forge another person's commit — `git commit --author="Someone Else"`,
or rewriting history to re-label existing commits. We did not do this. It puts a
name on work that person did not write, which is a misrepresentation of
authorship rather than a shortcut. Where two people genuinely worked on the same
change together, the honest tool is a `Co-authored-by:` trailer added by the
person actually making the commit, with the other person's agreement.

**What the AI agents did and did not do in Git.** Being precise here, because
the distinction matters:

- **No AI agent has authored a commit in this repository.** Every commit in the
  history was made by a human running `git` on their own machine.
- **Codex performed the Pages deployment at the team's instruction.** A human
  supplied and authorized the Cloudflare account context and reviewed the
  result; the agent did not choose the account or publish without approval.
- **One thing an agent did do:** during the pass described in entry 5, and at the
  team's explicit request, the agent created the four member branches listed
  above and pushed them to the remote. Creating a branch adds no commit and
  changes no authorship — the branches exist so each member has somewhere to
  commit their own work. The `m1`, `m2` and `m3` branches still sit exactly on
  the `main` commit with nothing added. The `m4` branch carries the
  documentation commits that produced this file; they were authored by the m4
  team member from their own machine under their own Git identity, and each
  names the AI assistant in a `Co-authored-by` trailer rather than as the author.

The DevTeam coordination used in entries 4 and 5 assigns and reviews work between
agents; it does not itself produce commits.

---

## Declaration

We declare that AI tools were used on this project as follows, and only as
follows:

- **Claude Code (Claude Sonnet 5)** — scaffolded the Astro + Cloudflare project
  and wrote the first version of the route data model, the fare logic, the
  reports API route and the React components. We reviewed every file, changed
  the fare formula and the status-aggregation rules ourselves, and can explain
  the code.
- **Claude Code (Sonnet 5) with OpenAI Codex (GPT-5.6)** — a coordinated
  pre-deployment hardening pass in which each agent reviewed the other's
  changes, listed in entry 4 above. All changes were read by a team member
  before merging.
- **Claude Code (Claude Opus 5)** — the documentation and audit-trail pass that
  produced this file, reviewed by OpenAI Codex and by a team member.

No AI tool authored a commit. Codex performed the Cloudflare Pages deployment
only through human-authorized account context and at the team's instruction. The
only Git action taken by an agent was creating the four member branches
described above, at our request. All AI output was reviewed by a human before it
was kept. Every member can explain the sections attributed to them in
`README.md`. No pre-built or previously submitted project was reused.
