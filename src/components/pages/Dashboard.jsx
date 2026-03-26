import { CATEGORIES, QUOTES, today, formatDate, DAYS, getLast7Days } from "../../utils/helpers";

export default function Dashboard({ habits, user, comebackScore, onToggle }) {
  const todayStr = today();
  const quote = QUOTES[new Date().getDay() % QUOTES.length];
  const completed = habits.filter(h => h.logs?.[todayStr]).length;
  const completionRate = habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0;
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.bestStreak || 0), 0);
  const currentStreak = habits.reduce((m, h) => Math.max(m, h.streak || 0), 0);

  return (
    <div style={{ maxWidth: "1100px" }} className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ color: "var(--text2)", fontSize: "14px", marginBottom: "6px" }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", letterSpacing: "1px" }}>
          Hey, {user.name.split(" ")[0]}. 👋
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "14px", marginTop: "6px", fontStyle: "italic" }}>
          "{quote}"
        </p>
      </div>

      {/* Stats Row */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
        gap: "16px", 
        marginBottom: "28px" 
      }}>
        {[
          { label: "Today's Progress", value: `${completed}/${habits.length}`, sub: `${completionRate}% done`, color: "var(--green)", icon: "✅" },
          { label: "Current Streak", value: currentStreak, sub: "days", color: "var(--accent)", icon: "🔥" },
          { label: "Best Streak", value: bestStreak, sub: "days ever", color: "var(--purple)", icon: "👑" },
          { label: "Comeback Score", value: comebackScore, sub: "out of 100", color: "var(--blue)", icon: "⚡" },
        ].map((s, idx) => (
          <div key={s.label} className="card slide-up" style={{ 
            borderColor: "var(--border)",
            animationDelay: `${idx * 0.1}s`,
            position: "relative", 
            overflow: "hidden",
            background: s.color === "var(--accent)" 
              ? "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.05))"
              : s.color === "var(--green)"
              ? "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))"
              : s.color === "var(--purple)"
              ? "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(168,85,247,0.05))"
              : "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.05))"
          }}>
            <div style={{ 
              position: "absolute", 
              top: "12px", 
              right: "16px", 
              fontSize: "28px", 
              opacity: 0.2,
              animation: s.icon === "🔥" ? "flame 2s ease-in-out infinite" : "float 3s ease-in-out infinite"
            }}>
              {s.icon}
            </div>
            <div style={{ 
              fontSize: "11px", 
              color: "var(--text3)", 
              fontWeight: 700, 
              letterSpacing: "0.08em", 
              textTransform: "uppercase", 
              marginBottom: "12px" 
            }}>
              {s.label}
            </div>
            <div style={{ 
              fontFamily: "var(--font-display)", 
              fontSize: "42px", 
              background: `linear-gradient(135deg, ${s.color}, ${s.color === "var(--accent)" ? "#ea580c" : "currentColor"})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px", 
              lineHeight: 1,
              animation: "glow-pulse 2s ease-in-out infinite"
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text2)", marginTop: "6px", fontWeight: 500 }}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Today's Habits */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            marginBottom: "16px" 
          }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700 }}>
              Today's Habits
            </h2>
            <span style={{ fontSize: "12px", color: "var(--text2)" }}>
              {completionRate}% complete
            </span>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
          {habits.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--text3)" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🌱</div>
              <p>No habits yet. Add your first one in Habits!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {habits.map((h, idx) => {
                const done = h.logs?.[todayStr];
                const cat = CATEGORIES.find(c => c.id === h.category) || CATEGORIES[5];
                return (
                  <div 
                    key={h.id}
                    className="slide-up"
                    style={{
                      animationDelay: `${idx * 0.05}s`,
                      display: "flex", 
                      alignItems: "center", 
                      gap: "14px",
                      padding: "12px 16px", 
                      borderRadius: "10px",
                      background: done 
                        ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))" 
                        : "var(--surface2)",
                      border: `1.5px solid ${done ? "rgba(34,197,94,0.3)" : "var(--border)"}`,
                      cursor: "pointer", 
                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onClick={() => onToggle(h.id)}
                    onMouseEnter={(e) => {
                      if (!done) {
                        e.currentTarget.style.background = "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.05))";
                        e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(249,115,22,0.15)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = done 
                        ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))" 
                        : "var(--surface2)";
                      e.currentTarget.style.borderColor = done ? "rgba(34,197,94,0.3)" : "var(--border)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ 
                      width: "28px", 
                      height: "28px", 
                      borderRadius: "8px", 
                      background: done 
                        ? "linear-gradient(135deg, var(--green), #16a34a)"
                        : "var(--surface3)",
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      fontSize: "14px", 
                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)", 
                      flexShrink: 0,
                      animation: done ? "success-pop 0.5s ease forwards" : "none",
                      boxShadow: done ? "0 0 12px rgba(34,197,94,0.4)" : "none"
                    }}>
                      {done ? "✓" : cat.emoji}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ 
                        fontSize: "14px", 
                        fontWeight: 600, 
                        textDecoration: done ? "line-through" : "none", 
                        color: done ? "var(--text2)" : "var(--text)" 
                      }}>
                        {h.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text3)" }}>
                        {cat.label} · <span style={{ color: "var(--accent)", fontWeight: 600 }}>{h.streak || 0}🔥</span> streak
                      </div>
                    </div>
                    {done && <span className="bounce" style={{ color: "var(--green)", fontSize: "18px", animation: "bounce 0.6s ease" }}>✓</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
