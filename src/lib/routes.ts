import routesData from "../data/routes.json";

export type Stop = { name: string; km: number };
export type Route = {
  number: string;
  name: string;
  via: string;
  highway: string;
  operator: string;
  /** Average running speed for time estimates. Defaults to CITY_SPEED_KMH. */
  speedKmh?: number;
  stops: Stop[];
};

/** City routes crawl; highway/intercity routes run faster. */
export const CITY_SPEED_KMH = 19;

export const ROUTES: Route[] = routesData as Route[];

export function getRoute(num: string): Route | undefined {
  return ROUTES.find((r) => r.number === num.trim());
}

/** Routes that pass through both towns, in the right order. */
export function findRoutes(from: string, to: string): Route[] {
  const f = from.trim().toLowerCase();
  const t = to.trim().toLowerCase();
  if (!f || !t) return [];
  return ROUTES.filter((r) => {
    const fi = r.stops.findIndex((s) => s.name.toLowerCase().includes(f));
    const ti = r.stops.findIndex((s) => s.name.toLowerCase().includes(t));
    return fi !== -1 && ti !== -1 && fi !== ti;
  });
}

export function allStopNames(): string[] {
  const set = new Set<string>();
  ROUTES.forEach((r) => r.stops.forEach((s) => set.add(s.name)));
  return [...set].sort();
}

/**
 * Sri Lankan bus fare estimate (normal service).
 * Minimum Rs. 30 covers the first stage (~2.6 km); each further ~1.6 km
 * stage adds Rs. 8. Rounded to the nearest Rs. 5. Educational estimate only.
 */
export function estimateFare(km: number): number {
  const d = Math.abs(km);
  let fare = 30;
  if (d > 2.6) fare += Math.ceil((d - 2.6) / 1.6) * 8;
  return Math.round(fare / 5) * 5;
}

/** Rough travel time in minutes. Uses the route's speedKmh (highway ~45), else city ~19. */
export function estimateMinutes(km: number, route: Route): number {
  const speed = route.speedKmh ?? CITY_SPEED_KMH;
  return Math.max(2, Math.round((Math.abs(km) / speed) * 60));
}

export function segmentKm(route: Route, fromName: string, toName: string): number | null {
  const a = route.stops.find((s) => s.name === fromName);
  const b = route.stops.find((s) => s.name === toName);
  if (!a || !b) return null;
  return Math.abs(b.km - a.km);
}
