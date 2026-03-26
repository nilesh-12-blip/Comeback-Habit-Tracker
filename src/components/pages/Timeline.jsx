import React, { useState, useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import { getHabits } from "../../utils/storage";

export default function Timeline({ user }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("week");

  function loadHabits() {
    const data = getHabits();
    setHabits(data);
    setLoading(false);
  }

  useEffect(() => {
    loadHabits();
  }, []);

  const periods = [
    { id: "week", label: "Week", days: 7 },
    { id: "month", label: "Month", days: 30 },
    { id: "3month", label: "3 Months", days: 90 },
    { id: "6month", label: "6 Months", days: 180 },
    { id: "year", label: "Year", days: 365 },
  ];

  const daysCount = periods.find(p => p.id === period)?.days || 7;
  const dateRange = (() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const range = [];
    for (let i = 0; i < daysCount; i++) {
      const d = new Date();
      d.setDate(d.getDate() - (daysCount - 1 - i));
      // If user wants 2026, we ensure we don't show 2025 in long views unless it's genuinely needed
      // But based on the request, we'll clamp to 2026-01-01 if it's 2026
      if (currentYear === 2026 && d.getFullYear() < 2026) {
        continue;
      }
      range.push(d.toISOString().split("T")[0]);
    }
    return range;
  })();

  const grouped = (() => {
    if (daysCount <= 7) return [{ label: "This Week", dates: dateRange }];
    if (daysCount <= 30) {
      const weeks = [];
      for (let i = 0; i < dateRange.length; i += 7) {
        const chunk = dateRange.slice(i, i + 7);
        weeks.push({ label: `Week ${weeks.length + 1}`, dates: chunk });
      }
      return weeks;
    }
    const months = {};
    dateRange.forEach(d => {
      const key = d.slice(0, 7);
      if (!months[key]) months[key] = { 
        label: new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" }), 
        dates: [] 
      };
      months[key].dates.push(d);
    });
    return Object.values(months);
  })();

  const getScore = (dates) => {
    if (!habits.length) return 0;
    const total = habits.length * dates.length;
    const done = habits.reduce((s, h) => s + dates.filter(d => h.logs?.[d]).length, 0);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "var(--text2)" }}>Loading timeline...</div>;

  return (
    <div style={{ maxWidth: "900px" }} className="fade-in">
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", letterSpacing: "1px" }}>
          GROWTH TIMELINE
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "4px" }}>
          Your complete legendary journey, visualized from localStorage.
        </p>
      </div>

      <div className="tab-bar" style={{ marginBottom: "24px" }}>
        {periods.map(p => (
          <button 
            key={p.id} 
            className={`tab ${period === p.id ? "active" : ""}`} 
            onClick={() => setPeriod(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ 
          position: "absolute", 
          left: "80px", 
          top: 0, 
          bottom: 0, 
          width: "2px", 
          background: "linear-gradient(180deg, var(--accent), var(--purple), var(--blue))", 
          opacity: 0.3 
        }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {grouped.map((g, gi) => {
            const score = getScore(g.dates);
            const color = score >= 80 ? "var(--green)" : score >= 50 ? "var(--accent)" : "var(--red)";
            return (
              <div key={gi} className="slide-up" style={{ display: "flex", gap: "20px", alignItems: "flex-start", animationDelay: `${gi * 0.1}s` }}>
                <div style={{ width: "70px", textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: "11px", color: "var(--text3)", marginBottom: "4px", fontFamily: "var(--font-mono)" }}>
                    {score}%
                  </div>
                </div>
                <div style={{ position: "relative", zIndex: 1, marginTop: "4px" }}>
                  <div style={{ 
                    width: "12px", 
                    height: "12px", 
                    borderRadius: "50%", 
                    background: color, 
                    boxShadow: `0 0 8px ${color}`, 
                    border: "2px solid var(--bg)" 
                  }} />
                </div>
                <div className="card" style={{ flex: 1, borderColor: score >= 80 ? "rgba(34,197,94,0.2)" : "var(--border)" }}>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    marginBottom: "12px" 
                  }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700 }}>
                      {g.label}
                    </h3>
                    <span style={{ fontSize: "12px", color }}>
                      {score >= 80 ? "🔥 Excellent" : score >= 50 ? "⚡ Good" : score > 0 ? "💪 Recovering" : "—"}
                    </span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: "15px" }}>
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${score}%`, 
                        background: `linear-gradient(90deg, ${color}, ${color}88)` 
                      }} 
                    />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {g.dates.map(d => {
                      const count = habits.filter(h => h.logs?.[d]).length;
                      const maxH = habits.length || 1;
                      const intensity = count / maxH;
                      return (
                        <div 
                          key={d} 
                          title={`${formatDate(d)}: ${count}/${maxH} done`} 
                          style={{
                            width: daysCount <= 30 ? "20px" : "12px",
                            height: daysCount <= 30 ? "20px" : "12px",
                            borderRadius: "3px",
                            background: count === 0 ? "var(--surface2)" : intensity >= 0.8 ? "var(--green)" : intensity >= 0.5 ? "#eab308" : "#f97316",
                          }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
