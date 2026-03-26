import React, { useState, useEffect } from "react";
import { getHabits, toggleHabit, saveHabit } from "../../utils/storage";
import { today, CATEGORIES } from "../../utils/helpers";
import { recalcStreak } from "../../utils/streak";

export default function MonthlyTracker({ user }) {
  const [habits, setHabits] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    setHabits(getHabits());
  }, []);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const numDays = daysInMonth(year, month);
  const dayArray = Array.from({ length: numDays }, (_, i) => i + 1);

  const getMonthName = (m) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, m));
  };

  const handleToggle = (habitId, dayNum) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    const allHabits = getHabits();
    const habit = allHabits.find(h => h.id === habitId);
    
    if (habit) {
      if (!habit.logs) habit.logs = {};
      habit.logs[formattedDate] = !habit.logs[formattedDate];
      
      // Recalc streaks
      const dates = Object.keys(habit.logs).filter(d => habit.logs[d]);
      habit.streak = recalcStreak(dates);
      habit.bestStreak = Math.max(habit.bestStreak || 0, habit.streak);
      
      const updated = allHabits.map(h => h.id === habitId ? habit : h);
      localStorage.setItem('comeback_habits', JSON.stringify(updated));
      setHabits(updated);
    }
  };

  const changeMonth = (offset) => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + offset);
    setCurrentDate(d);
  };

  const calculateCompletion = (habit) => {
    if (!habit.logs) return 0;
    let count = 0;
    dayArray.forEach(d => {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (habit.logs[dateStr]) count++;
    });
    return Math.round((count / numDays) * 100);
  };

  const getDayStatus = (dayNum) => {
    const todayStr = today();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    if (dateStr === todayStr) return "is-today";
    if (dateStr > todayStr) return "is-future";
    return "";
  };

  // Extra Analytics Data
  const totalCheks = habits.reduce((sum, h) => {
    let count = 0;
    dayArray.forEach(d => {
      const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (h.logs?.[ds]) count++;
    });
    return sum + count;
  }, 0);

  const avgCompletion = habits.length ? Math.round((totalCheks / (habits.length * numDays)) * 100) : 0;
  
  const mostConsistentHabit = [...habits].sort((a, b) => calculateCompletion(b) - calculateCompletion(a))[0];

  return (
    <div className="monthly-root fade-in">
      <header className="monthly-header">
        <div className="header-info">
          <h1 className="bebas-title">MONTHLY TRACKER</h1>
          <p className="subtitle">OVERVIEW OF YOUR CONSISTENCY</p>
        </div>
        
        <div className="month-selector">
          <button onClick={() => changeMonth(-1)} className="btn-nav">‹</button>
          <span className="current-month">{getMonthName(month)} {year}</span>
          <button onClick={() => changeMonth(1)} className="btn-nav">›</button>
        </div>
      </header>

      {/* Summary Dashboard Row */}
      <div className="monthly-dashboard-row">
        <div className="mini-card card">
          <div className="mini-label">TOTAL MARKS</div>
          <div className="mini-value" style={{ color: 'var(--accent)' }}>{totalCheks}</div>
          <div className="mini-subtext">Checks this month</div>
        </div>
        <div className="mini-card card">
          <div className="mini-label">AVG COMPLETION</div>
          <div className="mini-value" style={{ color: 'var(--green)' }}>{avgCompletion}%</div>
          <div className="mini-subtext">Across all habits</div>
        </div>
        <div className="mini-card card">
          <div className="mini-label">TOP PERFORMER</div>
          <div className="mini-value" style={{ fontSize: '18px', marginTop: '8px' }}>
            {mostConsistentHabit ? mostConsistentHabit.name : '—'}
          </div>
          <div className="mini-subtext">Most consistent habit</div>
        </div>
        <div className="mini-card card">
          <div className="mini-label">MONTHLY TARGET</div>
          <div className="mini-value" style={{ color: 'var(--blue)' }}>{numDays} Days</div>
          <div className="mini-subtext">Tracked flawlessly</div>
        </div>
      </div>

      <div className="tracker-card card">
        <div className="table-responsive">
          <table className="monthly-table">
            <thead>
              <tr>
                <th className="sticky-col habit-header">HABIT</th>
                {dayArray.map(d => (
                  <th key={d} className={`day-header ${getDayStatus(d)}`}>
                    <span className="day-num">{d}</span>
                  </th>
                ))}
                <th className="meta-header">PROGRESS</th>
              </tr>
            </thead>
            <tbody>
              {habits.map(habit => {
                const cat = CATEGORIES.find(c => c.id === habit.category) || CATEGORIES[0];
                const progress = calculateCompletion(habit);
                
                return (
                  <tr key={habit.id}>
                    <td className="sticky-col habit-info">
                      <div className="habit-blob" style={{ background: cat.color }}>{cat.emoji}</div>
                      <div className="habit-text">
                        <span className="habit-name">{habit.name}</span>
                        <span className="habit-streak">🔥 {habit.streak} day streak</span>
                      </div>
                    </td>
                    {dayArray.map(d => {
                      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                      const isChecked = habit.logs?.[dateStr];
                      const isToday = dateStr === today();
                      const isFuture = dateStr > today();
                      
                      return (
                        <td key={d} className={`checkbox-cell ${isToday ? 'cell-today' : ''} ${isFuture ? 'cell-future' : ''}`}>
                          <input 
                            type="checkbox" 
                            checked={isChecked || false} 
                            disabled={isFuture}
                            onChange={() => handleToggle(habit.id, d)}
                            className="premium-checkbox"
                          />
                        </td>
                      );
                    })}
                    <td className="progress-cell">
                      <div className="prog-val">{progress}%</div>
                      <div className="prog-mini-bar">
                        <div className="prog-mini-fill" style={{ width: `${progress}%`, background: cat.color }}></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {habits.length === 0 && (
                <tr>
                  <td colSpan={numDays + 2} className="empty-state">
                    NO HABITS FOUND. START YOUR JOURNEY IN THE HABIT MANAGER.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extra Analytics Charts Section */}
      <div className="extra-analytics-section fade-in" style={{ marginTop: '40px' }}>
        <h2 className="section-title">MONTHLY PERFORMANCE ANALYTICS</h2>
        <div className="charts-grid">
          <div className="card chart-card">
            <h3 className="chart-label">HABIT COMPLETION DISTRIBUTION</h3>
            <div className="svg-chart-container">
              <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                {habits.map((h, i) => {
                  const val = calculateCompletion(h);
                  const hgt = (val / 100) * 160;
                  const x = (i * (400 / habits.length)) + (200 / habits.length) - 10;
                  const cat = CATEGORIES.find(c => c.id === h.category) || CATEGORIES[0];
                  return (
                    <g key={h.id}>
                      <rect 
                        x={x} 
                        y={180 - hgt} 
                        width="20" 
                        height={hgt} 
                        fill={cat.color} 
                        rx="4"
                        className="chart-bar"
                      />
                      <text x={x + 10} y="195" fontSize="8" fill="var(--text3)" textAnchor="middle">{h.name.substring(0, 5)}</text>
                    </g>
                  );
                })}
                <line x1="0" y1="180" x2="400" y2="180" stroke="var(--border)" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <div className="card chart-card">
            <h3 className="chart-label">DAILY ACTIVITY TREND</h3>
            <div className="svg-chart-container">
              <svg width="100%" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
                {dayArray.map((d, i) => {
                  const ds = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                  const count = habits.filter(h => h.logs?.[ds]).length;
                  const hgt = (count / (habits.length || 1)) * 160;
                  const x = (i * (400 / numDays));
                  return (
                    <rect 
                      key={d}
                      x={x} 
                      y={180 - hgt} 
                      width={400 / numDays - 2} 
                      height={hgt} 
                      fill="var(--accent)" 
                      opacity={0.3 + (count / (habits.length || 1)) * 0.7}
                      rx="1"
                    />
                  );
                })}
                <line x1="0" y1="180" x2="400" y2="180" stroke="var(--border)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .monthly-root {
          padding: 24px 0;
        }

        .monthly-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .bebas-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          letter-spacing: 4px;
          color: #fff;
          margin: 0;
          line-height: 1;
        }

        .subtitle {
          color: var(--text2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          letter-spacing: 2px;
          margin-top: 4px;
        }

        .monthly-dashboard-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .mini-card {
          padding: 20px;
          text-align: center;
        }

        .mini-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--text3);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .mini-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 2px;
          color: #fff;
          line-height: 1;
        }

        .mini-subtext {
          font-size: 11px;
          color: var(--text3);
          margin-top: 8px;
        }

        .month-selector {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--surface2);
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid var(--border);
        }

        .current-month {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          color: #fff;
          min-width: 140px;
          text-align: center;
          letter-spacing: 1px;
        }

        .btn-nav {
          background: none;
          border: none;
          color: var(--accent);
          font-size: 24px;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-nav:hover {
          transform: scale(1.2);
          color: #fff;
        }

        .tracker-card {
          padding: 0 !important;
          background: rgba(13, 17, 23, 0.4) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
          overflow-y: visible;
          position: relative;
        }

        .monthly-table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
        }

        .monthly-table th, .monthly-table td {
          padding: 12px 8px;
          text-align: center;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sticky-col {
          position: sticky;
          left: 0;
          background: #0d1117;
          z-index: 10;
          width: 250px;
          min-width: 250px;
          text-align: left !important;
          border-right: 2px solid var(--border) !important;
          box-shadow: 4px 0 10px rgba(0,0,0,0.3);
        }

        .habit-header {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--text3);
          background: var(--surface3) !important;
        }

        .day-header {
          min-width: 40px;
          background: var(--surface2);
          vertical-align: middle;
        }

        .day-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text2);
        }

        .is-today .day-num {
          color: var(--accent);
          font-weight: 900;
          text-shadow: 0 0 10px var(--accent-glow);
        }

        .cell-today {
          background: rgba(249, 115, 22, 0.03);
        }

        .habit-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .habit-blob {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .habit-text {
          display: flex;
          flex-direction: column;
        }

        .habit-name {
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }

        .habit-streak {
          font-size: 10px;
          color: var(--text2);
          font-family: 'JetBrains Mono', monospace;
        }

        .premium-checkbox {
          width: 22px !important;
          height: 22px !important;
          margin: 0 auto;
        }

        .progress-cell {
          min-width: 120px;
          background: var(--surface2);
          text-align: left !important;
        }

        .prog-val {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 4px;
        }

        .prog-mini-bar {
          height: 4px;
          background: var(--surface3);
          border-radius: 99px;
          width: 100%;
          overflow: hidden;
        }

        .prog-mini-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .cell-future {
          background: transparent !important;
          opacity: 0.3;
        }

        .empty-state {
          padding: 60px !important;
          color: var(--text3);
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 2px;
          background: transparent !important;
        }

        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 4px;
          color: var(--text2);
          margin-bottom: 24px;
          text-align: center;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }

        .chart-card {
          padding: 24px;
        }

        .chart-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 2px;
          color: var(--text3);
          margin-bottom: 24px;
          text-transform: uppercase;
        }

        .svg-chart-container {
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 10px;
          border: 1px solid var(--border);
        }

        .chart-bar {
          transition: height 1s ease, y 1s ease;
        }

        @media (max-width: 768px) {
          .sticky-col {
            width: 120px;
            min-width: 120px;
          }
          .habit-name {
            font-size: 12px;
            max-width: 60px;
          }
          .habit-streak {
            display: none;
          }
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
