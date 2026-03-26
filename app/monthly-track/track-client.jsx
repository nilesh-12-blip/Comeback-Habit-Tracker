"use client";

import { useEffect, useMemo, useState } from "react";

function currentMonthISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function MonthlyTrackClient() {
  const [month, setMonth] = useState(currentMonthISO());
  const [data, setData] = useState({ dates: [], rows: [] });

  async function load() {
    const res = await fetch(`/api/monthly?month=${month}`, { cache: "no-store" });
    if (res.ok) setData(await res.json());
  }

  useEffect(() => {
    load();
  }, [month]);

  const totals = useMemo(() => {
    const rows = data.rows || [];
    const avg = rows.length ? Math.round(rows.reduce((s, r) => s + r.percentage, 0) / rows.length) : 0;
    return { habits: rows.length, avg };
  }, [data]);

  return (
    <main className="container" style={{ padding: "30px 0 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h1 style={{ margin: 0 }}>Monthly Track</h1>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ background: "#0d1117", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 10, padding: 8 }}
        />
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Habits tracked: {totals.habits} · Average monthly completion: {totals.avg}%
        </p>
      </div>

      <div className="card" style={{ overflow: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 900 }}>
          <thead>
            <tr>
              <th style={thSticky}>Habit</th>
              {data.dates.map((d) => (
                <th key={d} style={thDay}>
                  {Number(d.slice(-2))}
                </th>
              ))}
              <th style={thDay}>%</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.id}>
                <td style={tdSticky}>{row.name}</td>
                {data.dates.map((d) => (
                  <td key={d} style={tdDay}>
                    {row.byDate[d] ? "✓" : "·"}
                  </td>
                ))}
                <td style={tdDay}>{row.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const thSticky = {
  position: "sticky",
  left: 0,
  background: "#131823",
  textAlign: "left",
  padding: "8px 10px",
  borderBottom: "1px solid #232b36",
};

const tdSticky = {
  position: "sticky",
  left: 0,
  background: "#10141c",
  textAlign: "left",
  padding: "8px 10px",
  borderBottom: "1px solid #232b36",
};

const thDay = {
  textAlign: "center",
  padding: "8px 6px",
  borderBottom: "1px solid #232b36",
  fontSize: 12,
  color: "#93a0b2",
};

const tdDay = {
  textAlign: "center",
  padding: "8px 6px",
  borderBottom: "1px solid #232b36",
  fontSize: 12,
};
