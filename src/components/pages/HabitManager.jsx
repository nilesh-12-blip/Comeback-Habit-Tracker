import React, { useState, useEffect } from "react";
import { CATEGORIES, today, formatDate, DAYS } from "../../utils/helpers";
import { getHabits, saveHabit, deleteHabit, toggleHabit } from "../../utils/storage";

export default function HabitManager({ user, navigate }) {
  const [habits, setHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", category: "fitness", note: "" });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const todayStr = today();

  function loadHabits() {
    const data = getHabits();
    setHabits(data);
    setLoading(false);
  }

  useEffect(() => {
    loadHabits();
  }, []);

  const openAdd = () => { 
    setForm({ name: "", category: "fitness", note: "" }); 
    setEditing(null); 
    setShowModal(true); 
  };

  const openEdit = (h) => { 
    setForm({ name: h.name, category: h.category, note: h.note || "" }); 
    setEditing(h.id); 
    setShowModal(true); 
  };

  const save = () => {
    if (!form.name.trim() || busy) return;
    setBusy(true);
    
    // Simulate slight delay for "premium" feel
    setTimeout(() => {
      const habitToSave = editing 
        ? { ...habits.find(h => h.id === editing), ...form }
        : { ...form };
      
      saveHabit(habitToSave);
      loadHabits();
      setShowModal(false);
      setBusy(false);
    }, 400);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this habit? This action cannot be undone.")) {
      deleteHabit(id);
      loadHabits();
    }
  };

  const handleToggle = (id) => {
    toggleHabit(id);
    loadHabits();
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "var(--text2)" }}>Loading habits...</div>;

  return (
    <div style={{ maxWidth: "900px" }} className="fade-in">
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: "28px" 
      }}>
        <div>
          <h1 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "32px", 
            letterSpacing: "1px" 
          }}>
            MY HABITS
          </h1>
          <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "4px" }}>
            {habits.length} habits tracked securely in localStorage.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          + Add Habit
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "80px 40px" }}>
          <div style={{ fontSize: "60px", marginBottom: "16px" }}>🌱</div>
          <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
            Start Your First Habit
          </h2>
          <p style={{ color: "var(--text2)", marginBottom: "24px" }}>
            Every legend started with a single habit.
          </p>
          <button className="btn btn-primary" onClick={openAdd}>
            Add Your First Habit
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {habits.map((h, idx) => {
            const done = h.logs?.[todayStr];
            const cat = CATEGORIES.find(c => c.id === h.category) || CATEGORIES[5];
            const last7 = Array.from({ length: 7 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - (6 - i));
              return d.toISOString().split("T")[0];
            });
            return (
              <div key={h.id} className="card" style={{ 
                borderColor: done ? "rgba(34,197,94,0.2)" : "var(--border)",
                animationDelay: `${idx * 0.05}s`
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ 
                    width: "44px", 
                    height: "44px", 
                    borderRadius: "12px", 
                    background: `${cat.color}22`, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    fontSize: "22px", 
                    flexShrink: 0 
                  }}>
                    {cat.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px", 
                      flexWrap: "wrap" 
                    }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700 }}>
                        {h.name}
                      </h3>
                      <span 
                        className="badge-pill" 
                        style={{ background: `${cat.color}22`, color: cat.color }}
                      >
                        {cat.label}
                      </span>
                      {h.streak >= 3 && (
                        <span 
                          className="badge-pill" 
                          style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
                        >
                          🔥 {h.streak}
                        </span>
                      )}
                    </div>
                    {h.note && (
                      <p style={{ color: "var(--text2)", fontSize: "12px", marginTop: "2px" }}>
                        {h.note}
                      </p>
                    )}
                    {/* Last 7 days mini heatmap */}
                    <div style={{ 
                      display: "flex", 
                      gap: "4px", 
                      marginTop: "10px", 
                      alignItems: "center" 
                    }}>
                      {last7.map(d => (
                        <div 
                          key={d} 
                          title={formatDate(d)} 
                          style={{
                            width: "22px", 
                            height: "22px", 
                            borderRadius: "5px",
                            background: h.logs?.[d] ? "var(--green)" : "var(--surface2)",
                            border: d === todayStr ? "1px solid var(--accent)" : "1.5px solid transparent",
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            fontSize: "10px", 
                            color: "var(--text3)",
                          }}
                        >
                          {!h.logs?.[d] && DAYS[new Date(d + "T12:00:00").getDay()][0]}
                        </div>
                      ))}
                      <span style={{ fontSize: "11px", color: "var(--text3)", marginLeft: "4px" }}>
                        Last 7 days
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text2)" }}>
                        🔥 {h.streak || 0} streak
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text2)" }}>
                        👑 {h.bestStreak || 0} best
                      </span>
                    </div>
                  </div>
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "8px", 
                    alignItems: "flex-end", 
                    flexShrink: 0 
                  }}>
                    <button 
                      onClick={() => handleToggle(h.id)} 
                      className={`btn ${done ? "btn-success" : "btn-ghost"}`} 
                      style={{ fontSize: "12px", padding: "6px 14px" }}
                    >
                      {done ? "✓ Done" : "Mark Done"}
                    </button>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button 
                        className="btn btn-ghost" 
                        style={{ padding: "5px 10px", fontSize: "12px" }} 
                        onClick={() => openEdit(h)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger" 
                        style={{ padding: "5px 10px", fontSize: "12px" }} 
                        onClick={() => handleDelete(h.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>
              {editing ? "Edit Habit" : "New Legend Habit"}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label>Habit Name</label>
                <input 
                  placeholder="e.g. Morning Run" 
                  value={form.name} 
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                  autoFocus 
                />
              </div>
              <div>
                <label>Category</label>
                <select 
                  value={form.category} 
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.emoji} {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Note (optional)</label>
                <input 
                  placeholder="Any notes..." 
                  value={form.note} 
                  onChange={e => setForm(f => ({ ...f, note: e.target.value }))} 
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, justifyContent: "center" }} 
                onClick={save}
                disabled={busy}
              >
                {busy ? "Saving..." : editing ? "Save Changes" : "Create Habit"}
              </button>
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
