import { useEffect, useMemo, useState } from "react";
import {
  STATUS_META,
  FRESH_MS,
  liveStatus,
  timeAgo,
  type Report,
  type Status,
} from "../lib/reports";

type Props = {
  route?: string;
  showRouteFilter?: boolean;
  routeNumbers?: string[];
  /** bump to force a refetch (e.g. after submitting) */
  refreshKey?: number;
};

const STATUSES = Object.keys(STATUS_META) as Status[];

export default function ReportList({
  route,
  showRouteFilter,
  routeNumbers = [],
  refreshKey = 0,
}: Props) {
  const [reports, setReports] = useState<Report[]>([]);
  const [routeFilter, setRouteFilter] = useState<string>(route ?? "");
  const [statusFilter, setStatusFilter] = useState<Set<Status>>(new Set());
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const [nowTick, setNowTick] = useState(Date.now());

  const active = route ?? (routeFilter || undefined);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const qs = active ? `?route=${encodeURIComponent(active)}` : "";
        const res = await fetch(`/api/reports${qs}`);
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!alive) return;
        setReports(data.reports ?? []);
        setFailed(false);
        setUpdatedAt(Date.now());
      } catch {
        if (alive) setFailed(true);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    const t = setInterval(load, 15000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [active, refreshKey, nonce]);

  // keep the "updated Ns ago" label ticking
  useEffect(() => {
    const t = setInterval(() => setNowTick(Date.now()), 5000);
    return () => clearInterval(t);
  }, []);

  const live = route ? liveStatus(reports) : null;

  // Feature: which specific buses were reported on this route recently.
  const recentBuses = useMemo(() => {
    if (!route) return [];
    const cutoff = Date.now() - FRESH_MS;
    const seen = new Set<string>();
    for (const r of reports) {
      if (r.created_at >= cutoff && r.bus_reg) seen.add(r.bus_reg);
    }
    return [...seen];
  }, [reports, route]);

  const shown = useMemo(
    () =>
      reports.filter(
        (r) =>
          !flagged.has(r.id) &&
          (statusFilter.size === 0 || statusFilter.has(r.status as Status))
      ),
    [reports, statusFilter, flagged]
  );

  function toggleStatus(s: Status) {
    setStatusFilter((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }

  async function flag(rid: string) {
    setFlagged((prev) => new Set(prev).add(rid)); // optimistic
    try {
      await fetch("/api/reports", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: rid }),
      });
    } catch {
      /* keep it hidden locally regardless */
    }
  }

  return (
    <div className="space-y-3">
      {route && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <span
            className="inline-block w-3.5 h-3.5 rounded-full"
            style={{ background: live?.key ? STATUS_META[live.key].dot : "#9ca3af" }}
          />
          <div>
            <div className="font-semibold">
              {live?.key ? STATUS_META[live.key].text : "No recent info"}
            </div>
            <div className="text-xs text-gray-500">
              {live?.count
                ? `${live.count} report${live.count > 1 ? "s" : ""} in the last 2 hours`
                : "Be the first to report this route"}
            </div>
          </div>
        </div>
      )}

      {route && recentBuses.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
          <span className="font-medium text-gray-600">Buses reported recently:</span>
          {recentBuses.map((b) => (
            <span key={b} className="rounded-md bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-900">
              {b}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {showRouteFilter && (
          <select
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm"
          >
            <option value="">All routes</option>
            {routeNumbers.map((n) => (
              <option key={n} value={n}>
                Route {n}
              </option>
            ))}
          </select>
        )}
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => toggleStatus(s)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${
              statusFilter.has(s)
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 text-gray-600"
            }`}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: STATUS_META[s].dot }}
            />
            {STATUS_META[s].label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <span>
          {updatedAt ? `Updated ${timeAgo(updatedAt, nowTick)}` : "Loading…"}
        </span>
        <button
          type="button"
          onClick={() => setNonce((n) => n + 1)}
          className="rounded-md border border-gray-300 px-2 py-0.5 text-gray-600 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <ul className="space-y-2">
          {[0, 1, 2].map((i) => (
            <li key={i} className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse mt-2" />
            </li>
          ))}
        </ul>
      ) : failed ? (
        <p className="text-sm text-red-600">
          Couldn't load reports. Retrying every 15 seconds…
        </p>
      ) : shown.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-gray-300 p-6 text-center">
          <div className="text-2xl mb-1">🕓</div>
          <p className="text-sm text-gray-600">
            {reports.length === 0
              ? "No reports yet. Be the first to share what you see."
              : "No reports match this filter."}
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {shown.map((r) => {
            const m = STATUS_META[r.status as Status];
            return (
              <li key={r.id} className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: m.dot }}
                  />
                  <span className="font-semibold">{m.label}</span>
                  {!route && <span className="text-gray-500">· Route {r.route_number}</span>}
                  {r.bus_reg && <span className="text-gray-500">· {r.bus_reg}</span>}
                  <span className="text-gray-400 ml-auto">{timeAgo(r.created_at)}</span>
                </div>
                {r.note && <p className="text-sm text-gray-700 mt-1">{r.note}</p>}
                <div className="flex items-center justify-between mt-1">
                  {r.reporter ? (
                    <p className="text-xs text-gray-400">— {r.reporter}</p>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    onClick={() => flag(r.id)}
                    className="text-xs text-gray-400 hover:text-red-600"
                    title="Report this as wrong or spam"
                  >
                    👎 Looks wrong
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
