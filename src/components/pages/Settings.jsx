import React, { useState, useEffect } from "react";
import { getHabits } from "../../utils/storage";

export default function Settings({ user, onLogout }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = user?.name || "Legendary User";
  const userEmail = user?.email || "demo@example.com";

  function loadHabits() {
    const data = getHabits();
    setHabits(data);
    setLoading(false);
  }

  useEffect(() => {
    loadHabits();
  }, []);

  const totalDone = habits.reduce((s, h) => s + Object.values(h.logs || {}).filter(Boolean).length, 0);
  const totalDays = habits.reduce((s, h) => {
    const logs = h.logs || {};
    return s + Object.keys(logs).length;
  }, 0);

  const exportData = () => {
    const data = {
      user: { name: userName, email: userEmail },
      habits,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `comeback-legend-backup-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearData = () => {
    if (window.confirm("CRITICAL: This will delete ALL your habits and progress from this browser forever. Continue?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "var(--text2)" }}>Loading settings...</div>;

  return (
    <div style={{ maxWidth: "680px" }} className="fade-in">
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", letterSpacing: "1px" }}>
          SETTINGS
        </h1>
      </div>

      {/* Profile */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
          Profile
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ 
            width: "56px", 
            height: "56px", 
            borderRadius: "50%", 
            background: "linear-gradient(135deg, var(--accent), #ea580c)", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            fontSize: "22px", 
            fontWeight: 700 
          }}>
            {userName?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "16px" }}>
              {userName}
            </div>
            <div style={{ color: "var(--text2)", fontSize: "13px" }}>
              {userEmail}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
          Storage Stats
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px" }}>
          {[
            { label: "Habits Tracked", value: habits.length },
            { label: "Total Completions", value: totalDone },
            { label: "Days Logged", value: totalDays },
          ].map(s => (
            <div 
              key={s.label} 
              style={{ 
                textAlign: "center", 
                padding: "12px", 
                background: "var(--surface2)", 
                borderRadius: "10px" 
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--accent)" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text3)", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
          Data Management
        </h2>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "14px" }}>
          Your data is stored locally in your browser's localStorage.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-ghost" onClick={exportData}>
            📥 Export Backup (JSON)
          </button>
        </div>
        <p style={{ color: "var(--text3)", fontSize: "12px", marginTop: "8px" }}>
          Download your habits and progress as JSON for backup.
        </p>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px", color: "var(--red)" }}>
          Danger Zone
        </h2>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "14px" }}>
          Be careful with these legendary actions.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-ghost" onClick={onLogout}>
            Sign Out
          </button>
          <button className="btn btn-danger" onClick={clearData}>
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
