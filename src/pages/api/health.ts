import type { APIRoute } from "astro";

export const prerender = false;

/** Deploy check: confirms the D1 binding works. */
export const GET: APIRoute = async ({ locals }) => {
  try {
    const row = await locals.runtime.env.DB.prepare(
      "SELECT COUNT(*) AS n FROM reports"
    ).first<{ n: number }>();
    return new Response(JSON.stringify({ ok: true, reports: row?.n ?? 0 }), {
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, error: String(e) }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
};
