import { CATEGORIES, DAYS, getLast7Days, getLast30Days, formatDate } from "../../utils/helpers";

export default function Analytics({ habits, comebackScore }) {
  const last7 = getLast7Days();
  const last30 = getLast30Days();

  // Weekly chart data
  const weekData = last7.map(d => {
    const total = habits.length;
    const done = habits.filter(h => h.logs?.[d]).length;
    return { date: d, pct: total > 0 ? Math.round((done / total) * 100) : 0, done, total };
  });

  // Category performance
  const catPerf = CATEGORIES.map(c => {
    const catHabits = habits.filter(h => h.category === c.id);
    if (!catHabits.length) return null;
    const totalLogs = catHabits.reduce((s, h) => s + Object.values(h.logs || {}).filter(Boolean).length, 0);
    const totalDays = catHabits.reduce((s, h) => s + Object.keys(h.logs || {}).length, 0);
    const pct = totalDays > 0 ? Math.round((totalLogs / totalDays) * 100) : 0;
    return { ...c, pct, count: catHabits.length };
  }).filter(Boolean);

  // Monthly heatmap
  const monthMax = Math.max(...last30.map(d => habits.filter(h => h.logs?.[d]).length), 1);

  const getHeatColor = (val, max) => {
    if (val === 0) return "var(--surface2)";
    const intensity = val / max;
    if (intensity < 0.33) return "#166534";
    if (intensity < 0.66) return "#16a34a";
    return "#22c55e";
  };

  // Insights
  const insights = [];
  const dayOfWeekMiss = [0, 0, 0, 0, 0, 0, 0];
  const dayOfWeekTotal = [0, 0, 0, 0, 0, 0, 0];
  habits.forEach(h => {
    Object.entries(h.logs || {}).forEach(([d, v]) => {
      const day = new Date(d + "T12:00:00").getDay();
      dayOfWeekTotal[day]++;
      if (v) dayOfWeekMiss[day]++;
    });
  });
  const worst = dayOfWeekTotal.reduce((wi, t, i) => t > 3 && (dayOfWeekMiss[i] / t) < (dayOfWeekMiss[wi] / (dayOfWeekTotal[wi] || 1)) ? i : wi, 0);
  if (dayOfWeekTotal[worst] > 0) {
    const rate = Math.round((dayOfWeekMiss[worst] / dayOfWeekTotal[worst]) * 100);
    if (rate < 70) insights.push({ icon: "⚠️", text: `You struggle most on ${DAYS[worst]}s — only ${rate}% completion.`, type: "warn" });
  }
  if (comebackScore >= 75) insights.push({ icon: "💪", text: "You recover well after missed days. Keep it up!", type: "good" });
  if (habits.some(h => h.streak >= 7)) insights.push({ icon: "🔥", text: "You have an active 7+ day streak. Don't break it!", type: "good" });
  if (habits.length === 0) insights.push({ icon: "🌱", text: "Add habits to unlock insights.", type: "neutral" });

  return (
    <div style={{ maxWidth: "1000px" }} className="fade-in">
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", letterSpacing: "1px" }}>
          ANALYTICS
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "4px" }}>
          Deep dive into your performance
        </p>
      </div>

      {/* Weekly Bar Chart */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "20px" }}>
          Weekly Completion Rate
        </h2>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
          {weekData.map(d => (
            <div 
              key={d.date} 
              style={{ 
                flex: 1, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                gap: "6px", 
                height: "100%" 
              }}
            >
              <div style={{ 
                flex: 1, 
                display: "flex", 
                alignItems: "flex-end", 
                width: "100%" 
              }}>
                <div 
                  className="chart-bar" 
                  title={`${d.pct}%`} 
                  style={{
                    width: "100%",
                    height: `${Math.max(d.pct, 4)}%`,
                    background: d.pct >= 80 ? "linear-gradient(180deg, var(--green), #16a34a)" :
                      d.pct >= 50 ? "linear-gradient(180deg, var(--accent), #ea580c)" :
                        "linear-gradient(180deg, var(--red), #dc2626)",
                    boxShadow: d.pct >= 80 ? "0 0 12px rgba(34,197,94,0.3)" : "none",
                  }} 
                />
              </div>
              <div style={{ fontSize: "11px", color: "var(--text3)", fontFamily: "var(--font-mono)" }}>
                {d.pct}%
              </div>
              <div style={{ fontSize: "10px", color: "var(--text3)" }}>
                {DAYS[new Date(d.date + "T12:00:00").getDay()]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Category Performance */}
        <div className="card">
          <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
            By Category
          </h2>
          {catPerf.length === 0 ? (
            <p style={{ color: "var(--text3)", fontSize: "13px" }}>
              No data yet.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {catPerf.sort((a, b) => b.pct - a.pct).map(c => (
                <div key={c.id}>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    marginBottom: "4px" 
                  }}>
                    <span style={{ fontSize: "13px" }}>
                      {c.emoji} {c.label}
                    </span>
                    <span style={{ 
                      fontSize: "13px", 
                      fontFamily: "var(--font-mono)", 
                      color: c.pct >= 70 ? "var(--green)" : "var(--accent)" 
                    }}>
                      {c.pct}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${c.pct}%`, 
                        background: `linear-gradient(90deg, ${c.color}, ${c.color}88)` 
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Comeback Score Breakdown */}
        <div className="card">
          <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
            Comeback Score
          </h2>
          <div style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <svg width={140} height={140} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={70} cy={70} r={56} fill="none" stroke="var(--surface2)" strokeWidth={10} />
                <circle 
                  cx={70} 
                  cy={70} 
                  r={56} 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth={10}
                  strokeDasharray={`${(comebackScore / 100) * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                  strokeLinecap="round" 
                  style={{ filter: "drop-shadow(0 0 8px var(--accent))" }} 
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "var(--accent)" }}>
                  {comebackScore}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text3)" }}>
                  / 100
                </div>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "var(--text2)", marginTop: "12px" }}>
              {comebackScore >= 80 ? "🔥 Excellent recovery rate!" : comebackScore >= 60 ? "⚡ Good comeback momentum" : "💪 Keep pushing through setbacks"}
            </p>
          </div>
        </div>
      </div>

      {/* 30-day heatmap */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
          30-Day Activity Heatmap
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {last30.map(d => {
            const count = habits.filter(h => h.logs?.[d]).length;
            return (
              <div 
                key={d} 
                className="heatmap-cell" 
                title={`${formatDate(d)}: ${count} habits done`}
                style={{ background: getHeatColor(count, monthMax), width: "20px", height: "20px" }} 
              />
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "12px" }}>
          <span style={{ fontSize: "11px", color: "var(--text3)" }}>Less</span>
          {["var(--surface2)", "#166534", "#16a34a", "#22c55e"].map((c, i) => (
            <div key={i} style={{ width: "14px", height: "14px", borderRadius: "3px", background: c }} />
          ))}
          <span style={{ fontSize: "11px", color: "var(--text3)" }}>More</span>
        </div>
      </div>

      {/* Insights */}
      <div className="card">
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "14px" }}>
          Smart Insights
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {insights.map((ins, i) => (
            <div 
              key={i} 
              style={{
                padding: "12px 16px", 
                borderRadius: "10px",
                background: ins.type === "good" ? "var(--green-dim)" : ins.type === "warn" ? "rgba(234,179,8,0.1)" : "var(--surface2)",
                border: `1px solid ${ins.type === "good" ? "rgba(34,197,94,0.2)" : ins.type === "warn" ? "rgba(234,179,8,0.2)" : "var(--border)"}`,
                display: "flex", 
                gap: "10px", 
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "18px" }}>
                {ins.icon}
              </span>
              <p style={{ fontSize: "13px", color: "var(--text)" }}>
                {ins.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
