import { useEffect, useState } from "react";
import type { Route } from "../lib/routes";
import { STATUS_META, liveStatus, type Report } from "../lib/reports";

export default function RouteGrid({ routes }: { routes: Route[] }) {
  const [byRoute, setByRoute] = useState<Record<string, Report[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/reports");
        const data = await res.json();
        if (!alive) return;
        const map: Record<string, Report[]> = {};
        for (const r of (data.reports ?? []) as Report[]) {
          (map[r.route_number] ??= []).push(r);
        }
        setByRoute(map);
      } catch {
        /* leave dots grey */
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const t = setInterval(load, 20000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {routes.map((r) => {
        const live = liveStatus(byRoute[r.number] ?? []);
        const meta = live.key ? STATUS_META[live.key] : null;
        return (
          <li key={r.number}>
            <a
              href={`/route/${r.number}`}
              className="route-card surface flex items-start gap-3 rounded-2xl border border-amber-100 bg-white p-4 hover:border-amber-400"
            >
              <span
                className={`mt-1.5 inline-block w-3 h-3 rounded-full shrink-0 ring-4 ring-amber-50 ${
                  loading ? "animate-pulse" : ""
                }`}
                style={{ background: meta ? meta.dot : "#d1d5db" }}
                title={meta ? meta.label : "No recent info"}
              />
              <span className="min-w-0">
                <span className="mr-1.5 inline-flex rounded-lg bg-slate-900 px-2 py-0.5 text-sm font-extrabold text-white">{r.number}</span><span className="font-bold">{r.name}</span>
                <span className="mt-1 block text-xs text-slate-500">
                  {meta ? `${meta.label} · ${live.count} report${live.count > 1 ? "s" : ""}` : "No recent info"}
                  {" · "}via {r.via}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
