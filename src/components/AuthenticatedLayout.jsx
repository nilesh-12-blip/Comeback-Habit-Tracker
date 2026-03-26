import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { getHabits } from "../utils/storage";

export default function AuthenticatedLayout({ children, user, currentPage, navigate, onLogout }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    setHabits(getHabits());
  }, [children]); // Re-check streaks when content changes

  const currentStreak = habits.reduce((m, h) => Math.max(m, h.streak || 0), 0);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar 
        user={user} 
        collapsed={sidebarCollapsed} 
        currentPage={currentPage}
        navigate={navigate}
        onLogout={onLogout}
      />

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
              {currentStreak} day streak
            </span>
          </div>
          <div 
            onClick={() => navigate('settings')}
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
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "32px 28px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
