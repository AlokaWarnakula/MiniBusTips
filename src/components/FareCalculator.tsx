import { useState } from "react";
import type { Route } from "../lib/routes";
import { estimateFare, estimateMinutes } from "../lib/routes";

export default function FareCalculator({ route }: { route: Route }) {
  const names = route.stops.map((s) => s.name);
  const [from, setFrom] = useState(names[0]);
  const [to, setTo] = useState(names[names.length - 1]);

  const a = route.stops.find((s) => s.name === from);
  const b = route.stops.find((s) => s.name === to);
  const km = a && b ? Math.abs(b.km - a.km) : 0;
  const sameStop = from === to;

  return (
    <div className="surface rounded-2xl border border-amber-100 bg-white p-5">
      <div className="mb-4 flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-100">💳</span><div><h2 className="font-extrabold">Trip estimate</h2><p className="text-xs text-slate-500">Choose your boarding and exit stops</p></div></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-sm">
          <span className="block font-medium text-gray-700 mb-1">Boarding at</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100">
            {names.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="block font-medium text-gray-700 mb-1">Getting off at</span>
          <select value={to} onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100">
            {names.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>

      {sameStop ? (
        <p className="mt-3 text-sm text-red-600">Choose two different stops.</p>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <Stat label="Distance" value={`${km.toFixed(1)} km`} />
          <Stat label="Est. fare" value={`Rs. ${estimateFare(km)}`} />
          <Stat label="Est. time" value={`${estimateMinutes(km, route)} min`} />
        </div>
      )}
      <p className="mt-3 text-xs text-gray-500">
        Estimate only: Rs. 30 minimum, then ~Rs. 8 per 1.6 km stage, rounded to Rs. 5.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-amber-50 py-3 px-1">
      <div className="text-base font-extrabold text-slate-900 sm:text-lg">{value}</div>
      <div className="text-[11px] text-slate-500">{label}</div>
    </div>
  );
}
