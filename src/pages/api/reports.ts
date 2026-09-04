import type { APIRoute } from "astro";
import { ROUTES } from "../../lib/routes";
import { validateReport, FLAG_HIDE_THRESHOLD, type Report } from "../../lib/reports";

export const prerender = false;

const VALID_ROUTES = ROUTES.map((r) => r.number);

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function id() {
  return "rpt_" + crypto.randomUUID().replace(/-/g, "").slice(0, 20);
}

export const GET: APIRoute = async ({ url, locals }) => {
  const db = locals.runtime.env.DB;
  const route = url.searchParams.get("route");
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 200), 300);

  const stmt = route
    ? db
        .prepare(
          "SELECT * FROM reports WHERE route_number = ? AND flags < ? ORDER BY created_at DESC LIMIT ?"
        )
        .bind(route, FLAG_HIDE_THRESHOLD, limit)
    : db
        .prepare("SELECT * FROM reports WHERE flags < ? ORDER BY created_at DESC LIMIT ?")
        .bind(FLAG_HIDE_THRESHOLD, limit);

  const { results } = await stmt.all<Report>();
  return json({ reports: results ?? [] });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return json({ errors: { _: "Invalid request." } }, 400);
  }

  const check = validateReport(body, VALID_ROUTES);
  if (!check.ok) return json({ errors: check.errors }, 422);

  const now = Date.now();
  const rid = id();
  const v = check.value;
  await db
    .prepare(
      "INSERT INTO reports (id, route_number, status, bus_reg, note, reporter, flags, created_at) VALUES (?, ?, ?, ?, ?, ?, 0, ?)"
    )
    .bind(rid, v.route_number, v.status, v.bus_reg, v.note, v.reporter, now)
    .run();

  const report: Report = { id: rid, flags: 0, created_at: now, ...v };
  return json({ report }, 201);
};

/** Flag a report as "looks wrong". Body: { id }. */
export const PATCH: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  let body: { id?: string } = {};
  try {
    body = await request.json();
  } catch {
    return json({ errors: { _: "Invalid request." } }, 400);
  }
  const rid = String(body.id ?? "");
  if (!rid) return json({ errors: { _: "Missing report id." } }, 400);

  const row = await db
    .prepare("UPDATE reports SET flags = flags + 1 WHERE id = ? RETURNING flags")
    .bind(rid)
    .first<{ flags: number }>();

  if (!row) return json({ errors: { _: "Report not found." } }, 404);
  return json({ flags: row.flags, hidden: row.flags >= FLAG_HIDE_THRESHOLD });
};
