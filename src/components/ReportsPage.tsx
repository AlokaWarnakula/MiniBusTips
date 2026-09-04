import { useState } from "react";
import type { Route } from "../lib/routes";
import ReportForm from "./ReportForm";
import ReportList from "./ReportList";

export default function ReportsPage({ routes, defaultRoute = "" }: { routes: Route[]; defaultRoute?: string }) {
  const [key, setKey] = useState(0);
  return (
    <div className="space-y-6">
      <ReportForm routes={routes} defaultRoute={defaultRoute} onAdded={() => setKey((k) => k + 1)} />
      <div>
        <h2 className="font-semibold mb-2">Recent reports</h2>
        <ReportList showRouteFilter routeNumbers={routes.map((r) => r.number)} refreshKey={key} />
      </div>
    </div>
  );
}
