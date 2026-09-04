DROP TABLE IF EXISTS reports;
CREATE TABLE reports (
  id           TEXT PRIMARY KEY,
  route_number TEXT NOT NULL,
  status       TEXT NOT NULL CHECK (status IN ('normal','crowded','delayed','not_running')),
  bus_reg      TEXT,
  note         TEXT,
  reporter     TEXT,
  flags        INTEGER NOT NULL DEFAULT 0,
  created_at   INTEGER NOT NULL
);
CREATE INDEX idx_reports_route ON reports (route_number, created_at DESC);
