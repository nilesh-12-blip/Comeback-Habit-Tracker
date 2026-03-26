import { useState, useEffect, useCallback } from "react";
import GlobalStyles from "./components/GlobalStyles";
import LoginPage from "./components/pages/LoginPage";
import Dashboard from "./components/pages/Dashboard";
import HabitManager from "./components/pages/HabitManager";
import Analytics from "./components/pages/Analytics";
import Timeline from "./components/pages/Timeline";
import BadgesPage from "./components/pages/BadgesPage";
import Settings from "./components/pages/Settings";
import MonthlyDashboard from "./components/pages/MonthlyDashboard";
import MotivationPage from "./components/pages/MotivationPage";
import Sidebar from "./components/Sidebar";
import BadgeUnlockModal from "./components/BadgeUnlockModal";
import { BADGES, QUOTES, calcComebackScore, today } from "./utils/helpers";
import { save, load } from "./utils/storage";

export default function App() {
  const [user, setUser] = useState(() => load("cb_user", null));
  const [habits, setHabits] = useState(() => load("cb_habits", []));
  const [page, setPage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState(() => load("cb_earned_badges", []));
  const [badgeQueue, setBadgeQueue] = useState([]);

  // Persist
  useEffect(() => { 
    save("cb_habits", habits); 
  }, [habits]);

  useEffect(() => {
    save("cb_earned_badges", earnedBadgeIds);
  }, [earnedBadgeIds]);

  // Recalc streaks on mount
  useEffect(() => {
    setHabits(prev => prev.map(h => {
      const logs = h.logs || {};
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
        streak, 
        bestStreak: Math.max(h.bestStreak || 0, streak), 
        completedToday: !!logs[today()] 
      };
    }));
  }, []);

  const comebackScore = calcComebackScore(habits);

  useEffect(() => {
    if (!user) return;
    const state = { habits, comebackScore };
    const justUnlocked = BADGES.filter((b) => b.condition(state) && !earnedBadgeIds.includes(b.id));
    if (!justUnlocked.length) return;

    setEarnedBadgeIds((prev) => [...prev, ...justUnlocked.map((b) => b.id)]);
    setBadgeQueue((prev) => [
      ...prev,
      ...justUnlocked.map((badge, idx) => ({
        badge,
        quote: QUOTES[(Date.now() + idx) % QUOTES.length],
      })),
    ]);
  }, [habits, comebackScore, user, earnedBadgeIds]);

  const handleLogin = (u) => { 
    save("cb_user", u); 
    setUser(u); 
  };
  
  const handleLogout = () => { 
    localStorage.removeItem("cb_user"); 
    setUser(null); 
  };

  const toggleHabit = useCallback((id) => {
    const todayStr = today();
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const logs = { ...h.logs };
      logs[todayStr] = !logs[todayStr];
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
        completedToday: logs[todayStr] 
      };
    }));
  }, []);

  if (!user) return (
    <>
      <GlobalStyles />
      <LoginPage onLogin={handleLogin} />
    </>
  );

  const pageMap = {
    dashboard: <Dashboard habits={habits} user={user} comebackScore={comebackScore} onToggle={toggleHabit} />,
    habits: <HabitManager habits={habits} setHabits={setHabits} />,
    monthly: <MonthlyDashboard habits={habits} setHabits={setHabits} />,
    analytics: <Analytics habits={habits} comebackScore={comebackScore} />,
    timeline: <Timeline habits={habits} />,
    badges: <BadgesPage habits={habits} comebackScore={comebackScore} />,
    motivation: <MotivationPage />,
    settings: <Settings user={user} onLogout={handleLogout} habits={habits} setHabits={setHabits} />,
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar page={page} setPage={setPage} user={user} onLogout={handleLogout} collapsed={sidebarCollapsed} />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Top bar */}
          <header style={{ 
            height: "56px", 
            borderBottom: "1px solid var(--border)", 
            display: "flex", 
            alignItems: "center", 
            padding: "0 24px", 
            gap: "16px", 
            background: "var(--surface)", 
            flexShrink: 0, 
            position: "sticky", 
            top: 0, 
            zIndex: 100 
          }}>
            <button 
              onClick={() => setSidebarCollapsed(c => !c)} 
              style={{ 
                background: "none", 
                border: "none", 
                color: "var(--text2)", 
                cursor: "pointer", 
                fontSize: "18px", 
                padding: "4px" 
              }}
            >
              ☰
            </button>
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "14px" }}>🔥</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--accent)" }}>
                {habits.reduce((m, h) => Math.max(m, h.streak || 0), 0)} day streak
              </span>
            </div>
            <div 
              style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "50%", 
                background: "linear-gradient(135deg, var(--accent), #ea580c)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "13px", 
                fontWeight: 700, 
                cursor: "pointer" 
              }} 
              onClick={() => setPage("settings")}
              title="Go to Settings"
            >
              {user.name[0].toUpperCase()}
            </div>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, padding: "32px 28px", overflowY: "auto" }}>
            {pageMap[page] || pageMap.dashboard}
          </main>
        </div>
      </div>
      <BadgeUnlockModal
        badge={badgeQueue[0]?.badge}
        quote={badgeQueue[0]?.quote}
        onClose={() => setBadgeQueue((prev) => prev.slice(1))}
      />
    </>
  );
}
