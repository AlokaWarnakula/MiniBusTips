export type Status = "normal" | "crowded" | "delayed" | "not_running";

export type Report = {
  id: string;
  route_number: string;
  status: Status;
  bus_reg: string | null;
  note: string | null;
  reporter: string | null;
  flags: number;
  created_at: number;
};

/** Reports at or above this many "looks wrong" flags are hidden. */
export const FLAG_HIDE_THRESHOLD = 3;

export const STATUS_META: Record<Status, { label: string; dot: string; text: string; rank: number }> = {
  normal:      { label: "Normal",      dot: "#16a34a", text: "Running normally",     rank: 0 },
  crowded:     { label: "Very crowded", dot: "#eab308", text: "Very crowded",         rank: 1 },
  delayed:     { label: "Delayed",     dot: "#f97316", text: "Delayed / slow",       rank: 2 },
  not_running: { label: "Not running", dot: "#dc2626", text: "Not running",          rank: 3 },
};

export const FRESH_MS = 2 * 60 * 60 * 1000; // 2 hours

/** Overall live status for a route from its recent reports. */
export function liveStatus(reports: Report[], now = Date.now()) {
  const fresh = reports.filter((r) => now - r.created_at <= FRESH_MS);
  if (fresh.length === 0) return { key: null as Status | null, count: 0 };
  const counts = new Map<Status, number>();
  for (const r of fresh) counts.set(r.status, (counts.get(r.status) ?? 0) + 1);
  // most reported; ties broken by severity
  let best: Status = "normal";
  let bestN = -1;
  for (const [k, n] of counts) {
    if (n > bestN || (n === bestN && STATUS_META[k].rank > STATUS_META[best].rank)) {
      best = k;
      bestN = n;
    }
  }
  return { key: best, count: fresh.length };
}

export function timeAgo(ms: number, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - ms) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  return `${Math.round(h / 24)} d ago`;
}

/** Shared validation used by the API and the form. */
export function validateReport(input: {
  route_number?: unknown;
  status?: unknown;
  bus_reg?: unknown;
  note?: unknown;
  reporter?: unknown;
}, validRoutes: string[]): { ok: true; value: Omit<Report, "id" | "created_at"> } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const route = String(input.route_number ?? "").trim();
  const status = String(input.status ?? "").trim();
  const busRaw = String(input.bus_reg ?? "").trim().toUpperCase();
  const note = String(input.note ?? "").trim();
  const reporter = String(input.reporter ?? "").trim();

  if (!route) errors.route_number = "Please choose a bus route.";
  else if (!validRoutes.includes(route)) errors.route_number = "That route is not in our list yet.";

  if (!status) errors.status = "Please choose the current status.";
  else if (!(status in STATUS_META)) errors.status = "Unknown status.";

  if (busRaw && !/^[A-Z0-9]{1,4}[\s-]?[0-9]{1,4}$/.test(busRaw)) {
    errors.bus_reg = "That doesn't look like a plate (e.g. NC-3456). Leave blank if unsure.";
  }
  if (note.length > 140) errors.note = "Please keep the note under 140 characters.";
  if (reporter.length > 40) errors.reporter = "Name is too long.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      route_number: route,
      status: status as Status,
      bus_reg: busRaw || null,
      note: note || null,
      reporter: reporter || null,
    },
  };
}
