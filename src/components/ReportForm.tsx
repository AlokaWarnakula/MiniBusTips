import { useState } from "react";
import type { Route } from "../lib/routes";
import { STATUS_META, type Report, type Status } from "../lib/reports";

const STATUSES = Object.keys(STATUS_META) as Status[];

export default function ReportForm({
  routes,
  defaultRoute = "",
  onAdded,
}: {
  routes: Route[];
  defaultRoute?: string;
  onAdded?: (r: Report) => void;
}) {
  const [route, setRoute] = useState(defaultRoute);
  const [status, setStatus] = useState<Status | "">("");
  const [busReg, setBusReg] = useState("");
  const [note, setNote] = useState("");
  const [reporter, setReporter] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ route_number: route, status, bus_reg: busReg, note, reporter }),
    });
    setBusy(false);
    const data = await res.json();
    if (!res.ok) {
      setErrors(data.errors ?? { _: "Something went wrong. Try again." });
      return;
    }
    onAdded?.(data.report as Report);
    setStatus("");
    setBusReg("");
    setNote("");
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  }

  const field = "w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100";
  const errText = (k: string) => errors[k] && <p className="text-sm text-red-600 mt-1">{errors[k]}</p>;

  return (
    <form onSubmit={submit} className="surface rounded-2xl border border-amber-100 bg-white p-5 space-y-4">
      <div><p className="text-xs font-bold uppercase tracking-wider text-amber-700">Help another commuter</p><h2 className="text-xl font-extrabold">Report a bus route now</h2></div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Route *</label>
        <select value={route} onChange={(e) => setRoute(e.target.value)} className={`${field} bg-white`}>
          <option value="">Choose a route…</option>
          {routes.map((r) => (
            <option key={r.number} value={r.number}>{r.number} — {r.name}</option>
          ))}
        </select>
        {errText("route_number")}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current status *</label>
        <div className="grid grid-cols-2 gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                status === s ? "border-amber-500 bg-amber-50 text-slate-900 ring-2 ring-amber-200" : "border-slate-200 hover:border-amber-300"
              }`}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: STATUS_META[s].dot }} />
              {STATUS_META[s].label}
            </button>
          ))}
        </div>
        {errText("status")}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bus plate (optional)</label>
          <input value={busReg} onChange={(e) => setBusReg(e.target.value)}
            placeholder="e.g. NC-3456" className={field} />
          {errText("bus_reg")}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your name (optional)</label>
          <input value={reporter} onChange={(e) => setReporter(e.target.value)}
            placeholder="e.g. Kasun" className={field} />
          {errText("reporter")}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note (optional) — where is it now?
        </label>
        <input value={note} onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. just left Maharagama, heavy traffic at Nugegoda"
          maxLength={140} className={field} />
        <div className="flex justify-between">
          {errText("note")}
          <span className="text-xs text-gray-400 ml-auto">{note.length}/140</span>
        </div>
      </div>

      {errors._ && <p className="text-sm text-red-600">{errors._}</p>}

      <button disabled={busy}
        className="w-full rounded-xl bg-slate-900 py-3 font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50">
        {busy ? "Sending…" : "Submit report"}
      </button>
      {done && <p className="text-sm text-green-700">Thanks! Your report is live.</p>}
    </form>
  );
}
