import { useState, useEffect } from "react";
import { today, DAYS, getLast30Days, formatDate } from "../../utils/helpers";
import MotivationModal from "../MotivationModal";

export default function InteractiveCalendar({ habits, setHabits, selectedHabitId, setSelectedHabitId }) {
  const [viewMonth, setViewMonth] = useState(new Date());
  const [monthDays, setMonthDays] = useState([]);
  const [showMotivation, setShowMotivation] = useState(false);
  const [completedHabitName, setCompletedHabitName] = useState("");

  // Generate calendar days for the selected month
  useEffect(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      days.push(d.toISOString().split("T")[0]);
    }
    
    setMonthDays(days);
  }, [viewMonth]);

  const selectedHabit = habits.find(h => h.id === selectedHabitId);

  const toggleDay = (dateStr) => {
    if (!selectedHabitId || !selectedHabit) return;
    
    setHabits(prev => prev.map(h => {
      if (h.id !== selectedHabitId) return h;
      
      const logs = { ...h.logs };
      const wasCompleted = logs[dateStr];
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
      
      // Show motivation modal when completing today's habit
      if (!wasCompleted && logs[dateStr] && dateStr === today()) {
        setCompletedHabitName(h.name);
        setShowMotivation(true);
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
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setViewMonth(new Date());
  };

  const monthYear = viewMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div style={{ maxWidth: "900px" }} className="fade-in">
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", letterSpacing: "1px" }}>
          INTERACTIVE CALENDAR
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "4px" }}>
          Click boxes to track daily progress
        </p>
      </div>

      {/* Habit Selector */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>
          Select Habit to Track
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
          {habits.length === 0 ? (
            <p style={{ color: "var(--text3)", gridColumn: "1 / -1" }}>
              Add a habit first to use the calendar tracker
            </p>
          ) : (
            habits.map(h => (
              <button
                key={h.id}
                onClick={() => setSelectedHabitId(h.id)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: selectedHabitId === h.id ? "2px solid var(--accent)" : "1px solid var(--border)",
                  background: selectedHabitId === h.id ? "rgba(249,115,22,0.1)" : "var(--surface2)",
                  color: selectedHabitId === h.id ? "var(--accent)" : "var(--text2)",
                  cursor: "pointer",
                  fontWeight: selectedHabitId === h.id ? 700 : 500,
                  transition: "all 0.2s",
                  fontSize: "13px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {h.name}
              </button>
            ))
          )}
        </div>
      </div>

      {selectedHabit && (
        <>
          {/* Calendar Header */}
          <div className="card" style={{ marginBottom: "20px" }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              marginBottom: "20px"
            }}>
              <button className="btn btn-ghost" onClick={previousMonth} style={{ padding: "6px 12px" }}>
                ← Prev
              </button>
              <h2 style={{ fontSize: "18px", fontWeight: 700, minWidth: "200px", textAlign: "center" }}>
                {monthYear}
              </h2>
              <button className="btn btn-ghost" onClick={nextMonth} style={{ padding: "6px 12px" }}>
                Next →
              </button>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={goToToday}
              style={{ marginBottom: "20px", width: "100%", justifyContent: "center" }}
            >
              Go to Today
            </button>

            {/* Calendar Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
              {/* Day headers */}
              {DAYS.map(day => (
                <div key={day} style={{ 
                  textAlign: "center", 
                  fontWeight: 700, 
                  fontSize: "12px", 
                  color: "var(--text2)", 
                  padding: "8px",
                  letterSpacing: "0.05em"
                }}>
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {monthDays.map((dateStr, i) => {
                const isCompleted = dateStr && selectedHabit.logs?.[dateStr];
                const isToday = dateStr === today();
                const dayNum = dateStr ? parseInt(dateStr.split("-")[2]) : null;

                return (
                  <div key={i}>
                    {dateStr ? (
                      <button
                        onClick={() => toggleDay(dateStr)}
                        style={{
                          width: "100%",
                          aspectRatio: "1",
                          borderRadius: "8px",
                          border: isToday ? "2px solid var(--accent)" : "1px solid var(--border)",
                          background: isCompleted ? "linear-gradient(135deg, var(--green), #16a34a)" : "var(--surface2)",
                          color: isCompleted ? "#fff" : "var(--text)",
                          cursor: "pointer",
                          fontWeight: 600,
                          fontSize: "14px",
                          transition: "all 0.2s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: isCompleted ? "0 0 12px rgba(34,197,94,0.3)" : "none",
                          transform: "scale(1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                        title={`${formatDate(dateStr)}${isCompleted ? " ✓" : ""}`}
                      >
                        <span>{dayNum}</span>
                        {isCompleted && <span style={{ marginLeft: "4px", fontSize: "12px" }}>✓</span>}
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Stats for selected habit */}
            <div style={{ 
              marginTop: "24px", 
              padding: "16px", 
              background: "var(--surface2)", 
              borderRadius: "10px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px"
            }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "var(--accent)", fontWeight: 700 }}>
                  {selectedHabit.streak || 0}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text3)" }}>Current Streak</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "var(--purple)", fontWeight: 700 }}>
                  {selectedHabit.bestStreak || 0}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text3)" }}>Best Streak</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ 
                  fontSize: "24px", 
                  color: "var(--green)", 
                  fontWeight: 700 
                }}>
                  {Object.values(selectedHabit.logs || {}).filter(Boolean).length}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text3)" }}>Total Completions</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", color: "var(--blue)", fontWeight: 700 }}>
                  {Object.keys(selectedHabit.logs || {}).length > 0 
                    ? Math.round((Object.values(selectedHabit.logs || {}).filter(Boolean).length / Object.keys(selectedHabit.logs || {}).length) * 100)
                    : 0}%
                </div>
                <div style={{ fontSize: "12px", color: "var(--text3)" }}>Success Rate</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="card">
            <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "12px" }}>How to Use</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "6px", 
                  background: "linear-gradient(135deg, var(--green), #16a34a)",
                  boxShadow: "0 0 12px rgba(34,197,94,0.3)"
                }} />
                <span style={{ fontSize: "13px" }}>Completed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "6px", 
                  background: "var(--surface2)",
                  border: "1px solid var(--border)"
                }} />
                <span style={{ fontSize: "13px" }}>Not completed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "6px", 
                  background: "var(--surface2)",
                  border: "2px solid var(--accent)"
                }} />
                <span style={{ fontSize: "13px" }}>Today</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Motivation Modal */}
      <MotivationModal 
        isOpen={showMotivation} 
        onClose={() => setShowMotivation(false)}
        habitName={completedHabitName}
      />
    </div>
  );
}
