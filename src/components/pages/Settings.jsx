import { useState } from "react";
import { save, load } from "../../utils/storage";

export default function Settings({ user, onLogout, habits, setHabits }) {
  const [saved, setSaved] = useState(false);
  const [reminder, setReminder] = useState(load("reminder_time", "08:00"));

  const handleSave = () => {
    save("reminder_time", reminder);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearAll = () => {
    if (window.confirm("This will delete all your habits and progress. Are you sure?")) {
      setHabits([]);
    }
  };

  const exportData = () => {
    const data = {
      user,
      habits,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `comeback-tracker-backup-${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const totalDone = habits.reduce((s, h) => s + Object.values(h.logs || {}).filter(Boolean).length, 0);
  const totalDays = habits.reduce((s, h) => s + Object.keys(h.logs || {}).length, 0);

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
            {user.name[0].toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "16px" }}>
              {user.name}
            </div>
            <div style={{ color: "var(--text2)", fontSize: "13px" }}>
              {user.email}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
          Your Stats
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
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

      {/* Reminder */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
          Daily Reminder
        </h2>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "14px" }}>
          Set your preferred check-in time
        </p>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input 
            type="time" 
            value={reminder} 
            onChange={e => setReminder(e.target.value)} 
            style={{ maxWidth: "160px" }} 
          />
          <button 
            className="btn btn-primary" 
            onClick={handleSave}
          >
            {saved ? "✓ Saved!" : "Save"}
          </button>
        </div>
        <p style={{ color: "var(--text3)", fontSize: "12px", marginTop: "8px" }}>
          ⚠️ Browser notifications must be enabled. This is a visual preference for now.
        </p>
      </div>

      {/* Data Management */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px" }}>
          Data Management
        </h2>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "14px" }}>
          Export or manage your data
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-ghost" onClick={exportData}>
            📥 Export Data
          </button>
        </div>
        <p style={{ color: "var(--text3)", fontSize: "12px", marginTop: "8px" }}>
          Download your habits and progress as JSON for backup or migration.
        </p>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ borderColor: "rgba(239,68,68,0.3)" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "4px", color: "var(--red)" }}>
          Danger Zone
        </h2>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginBottom: "14px" }}>
          Irreversible actions below
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn btn-danger" onClick={clearAll}>
            Clear All Habits
          </button>
          <button className="btn btn-danger" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
