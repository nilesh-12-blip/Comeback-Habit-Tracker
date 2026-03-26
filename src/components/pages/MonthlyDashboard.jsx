import { useState, useEffect } from "react";
import { today, DAYS, formatDate } from "../../utils/helpers";

export default function MonthlyDashboard({ habits, setHabits }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthData, setMonthData] = useState([]);

  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const data = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      data.push(dateStr);
    }
    setMonthData(data);
  }, [currentMonth]);

  const toggleDay = (habitId, dateStr) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== habitId) return h;
      const logs = { ...h.logs };
      logs[dateStr] = !logs[dateStr];
      
      // Recalculate streak
      let streak = 0;
      const d = new Date();
      while (true) {
        const ds = d.toISOString().split("T")[0];
        if (logs[ds]) { 
          streak++; 
          d.setDate(d.getDate() - 1); 
        } else break;
      }
      
      return {
        ...h,
        logs,
        streak,
        bestStreak: Math.max(h.bestStreak || 0, streak),
        completedToday: logs[today()]
      };
    }));
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const monthYear = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const completionStats = habits.map(h => ({
    name: h.name,
    completed: monthData.filter(d => h.logs?.[d]).length,
    percentage: monthData.length > 0 ? Math.round((monthData.filter(d => h.logs?.[d]).length / monthData.length) * 100) : 0
  }));

  return (
    <div style={{ maxWidth: "1400px" }} className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", letterSpacing: "1px" }}>
          MONTHLY TRACK
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "4px" }}>
          Track all habits for the entire month at a glance
        </p>
      </div>

      {/* Controls */}
      <div className="card slide-up" style={{ marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-ghost" onClick={previousMonth} style={{ padding: "8px 14px" }}>
            ← Prev
          </button>
          <button className="btn btn-primary" onClick={goToToday} style={{ padding: "8px 16px" }}>
            Today
          </button>
          <button className="btn btn-ghost" onClick={nextMonth} style={{ padding: "8px 14px" }}>
            Next →
          </button>
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, minWidth: "200px", textAlign: "center" }}>
          {monthYear}
        </h2>
        <div style={{ width: "180px" }} />
      </div>

      {habits.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🌱</div>
          <p style={{ color: "var(--text2)" }}>Add habits to view your monthly progress</p>
        </div>
      ) : (
        <>
          {/* Monthly Sheet */}
          <div className="card slide-up" style={{ 
            marginBottom: "24px", 
            overflow: "auto",
            animation: "slideUp 0.5s ease forwards"
          }}>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse", 
              fontFamily: "var(--font-body)" 
            }}>
              <thead>
                <tr>
                  <th style={{ 
                    position: "sticky", 
                    left: 0, 
                    background: "var(--surface2)", 
                    padding: "14px 12px",
                    textAlign: "left",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: "var(--text2)",
                    zIndex: 10
                  }}>
                    HABIT
                  </th>
                  {monthData.slice(0, 31).map((date, idx) => {
                    const d = new Date(date);
                    const dayNum = d.getDate();
                    const dayOfWeek = d.getDay();
                    const dayName = DAYS[dayOfWeek];
                    const isToday = date === today();
                    
                    return (
                      <th key={date} style={{ 
                        padding: "12px 6px",
                        textAlign: "center",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: isToday ? "var(--accent)" : "var(--text2)",
                        borderRight: `1px solid ${isToday ? "rgba(249,115,22,0.3)" : "var(--border)"}`,
                        background: isToday ? "rgba(249,115,22,0.08)" : "transparent",
                      }}>
                        <div>{dayNum}</div>
                        <div style={{ fontSize: "9px", opacity: 0.6 }}>{dayName}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {habits.map((habit, habitIdx) => (
                  <tr key={habit.id} style={{ 
                    animation: `slideUp 0.4s ease forwards`,
                    animationDelay: `${habitIdx * 0.05}s`,
                    borderBottom: `1px solid var(--border)`
                  }}>
                    <td style={{ 
                      position: "sticky", 
                      left: 0, 
                      background: "var(--surface2)", 
                      padding: "12px",
                      fontWeight: 600,
                      fontSize: "14px",
                      zIndex: 5,
                      minWidth: "150px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "18px" }}>📌</span>
                        {habit.name}
                      </div>
                    </td>
                    {monthData.slice(0, 31).map((date, dayIdx) => {
                      const isCompleted = habit.logs?.[date];
                      const isToday = date === today();
                      
                      return (
                        <td key={date} style={{ 
                          padding: "4px 6px",
                          textAlign: "center",
                          borderRight: `1px solid ${isToday ? "rgba(249,115,22,0.3)" : "var(--border)"}`,
                          background: isToday ? "rgba(249,115,22,0.04)" : "transparent",
                        }}>
                          <input
                            type="checkbox"
                            checked={isCompleted || false}
                            onChange={() => toggleDay(habit.id, date)}
                            style={{
                              width: "24px",
                              height: "24px",
                              cursor: "pointer",
                              accentColor: "var(--green)",
                              transition: "all 0.3s ease",
                              transform: "scale(1)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.15)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                            onChangeCapture={(e) => {
                              if (e.currentTarget.checked) {
                                e.currentTarget.style.animation = "success-pop 0.5s ease forwards";
                              }
                            }}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Completion Stats */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "16px" 
          }}>
            {completionStats.map((stat, idx) => (
              <div key={stat.name} className="card slide-up" style={{
                animationDelay: `${idx * 0.08}s`,
                background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(249,115,22,0.05))",
                border: "1.5px solid rgba(249,115,22,0.2)"
              }}>
                <div style={{ marginBottom: "12px" }}>
                  <h3 style={{ 
                    fontSize: "14px", 
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: "4px"
                  }}>
                    {stat.name}
                  </h3>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "var(--text2)" 
                  }}>
                    {stat.completed} / {monthData.length} completed
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="progress-bar" style={{ marginBottom: "12px" }}>
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${stat.percentage}%`,
                      animation: "shimmerEffect 3s ease-in-out infinite"
                    }} 
                  />
                </div>

                {/* Percentage Display */}
                <div style={{ 
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  fontFamily: "var(--font-display)"
                }}>
                  {stat.percentage}%
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="card slide-up" style={{ marginTop: "24px", animation: "slideUp 0.5s ease forwards", animationDelay: "0.2s" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>Legend</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="checkbox" checked disabled style={{ width: "20px", height: "20px", cursor: "default" }} />
                <span style={{ fontSize: "13px" }}>Habit completed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="checkbox" checked={false} disabled style={{ width: "20px", height: "20px", cursor: "default" }} />
                <span style={{ fontSize: "13px" }}>Habit not completed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  padding: "4px 12px", 
                  borderRadius: "4px", 
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  fontSize: "12px"
                }}>
                  Today
                </div>
                <span style={{ fontSize: "13px" }}>Current day</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
