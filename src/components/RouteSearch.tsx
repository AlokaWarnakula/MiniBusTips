import { useMemo, useState } from "react";
import type { Route } from "../lib/routes";

type Props = { routes: Route[]; stops: string[] };

export default function RouteSearch({ routes, stops }: Props) {
  const [mode, setMode] = useState<"number" | "stops">("number");
  const [num, setNum] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [err, setErr] = useState("");

  const matches = useMemo(() => {
    if (mode !== "stops") return [];
    const f = from.trim().toLowerCase();
    const t = to.trim().toLowerCase();
    if (!f || !t) return [];
    return routes.filter((r) => {
      const fi = r.stops.findIndex((s) => s.name.toLowerCase().includes(f));
      const ti = r.stops.findIndex((s) => s.name.toLowerCase().includes(t));
      return fi !== -1 && ti !== -1 && fi !== ti;
    });
  }, [mode, from, to, routes]);

  function goNumber(e: React.FormEvent) {
    e.preventDefault();
    const r = routes.find((x) => x.number === num.trim());
    if (!r) {
      setErr("We don't have that route yet. Try picking one from the list.");
      return;
    }
    window.location.href = `/route/${r.number}`;
  }

  const tab = (m: typeof mode, label: string) => (
    <button
      type="button"
      onClick={() => { setMode(m); setErr(""); }}
      className={`flex-1 py-2 text-sm font-medium rounded-md ${
        mode === m ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-amber-50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="surface -mt-1 relative rounded-2xl border border-amber-100 bg-white p-4 sm:p-5">
      <div className="mb-4 flex rounded-xl bg-amber-50 p-1">
        {tab("number", "By route number")}
        {tab("stops", "By start & destination")}
      </div>

      {mode === "number" ? (
        <form onSubmit={goNumber} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Bus route</label>
          <select
            value={num}
            onChange={(e) => { setNum(e.target.value); setErr(""); }}
            className="w-full rounded-xl border border-slate-200 px-3 py-3 bg-white outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          >
            <option value="">Choose a route…</option>
            {routes.map((r) => (
              <option key={r.number} value={r.number}>
                {r.number} — {r.name} (via {r.via})
              </option>
            ))}
          </select>
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button className="w-full rounded-xl bg-amber-400 py-3 font-bold text-slate-900 shadow-sm transition hover:bg-amber-300 active:scale-[.99]">
            Find this route →
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <datalist id="stops">
            {stops.map((s) => <option key={s} value={s} />)}
          </datalist>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                list="stops"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Nugegoda"
                className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                list="stops"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Pettah"
                className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
              />
            </div>
          </div>

          {from.trim() && to.trim() && matches.length === 0 && (
            <p className="text-sm text-gray-500">No route in our sample data covers both stops.</p>
          )}
          <ul className="space-y-2">
            {matches.map((r) => (
              <li key={r.number}>
                <a
                  href={`/route/${r.number}`}
                  className="route-card block rounded-xl border border-slate-200 p-3 hover:border-amber-400"
                >
                  <span className="mr-1 inline-flex rounded-md bg-amber-100 px-1.5 py-0.5 font-extrabold text-amber-900">{r.number}</span>{r.name}
                  <span className="block text-xs text-gray-500">via {r.via} · {r.operator}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
