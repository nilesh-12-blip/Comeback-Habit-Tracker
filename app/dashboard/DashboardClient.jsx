"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DashboardClient({ userName }) {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    bestStreak: 0,
    unlockedCount: 0,
    totalBadges: 10,
    nextBadge: null,
    latestUnlock: null,
    quote: "",
  });

  async function loadHabits() {
    const res = await fetch("/api/habits", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setHabits(data.habits);
    }
  }

  async function loadSummary() {
    const res = await fetch("/api/summary", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setSummary(data);
    }
  }

  useEffect(() => {
    loadHabits();
    loadSummary();
  }, []);

  async function addHabit(e) {
    e.preventDefault();
    if (!name.trim() || loading) return;
    setLoading(true);
    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });
    setLoading(false);
    if (res.ok) {
      setName("");
      await loadHabits();
      await loadSummary();
    }
  }

  return (
    <main className="container" style={{ padding: "32px 0 64px" }}>
      <div style={{ display: "grid", gap: 14, marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Dashboard {userName ? `· ${userName}` : ""}</h1>
        <p style={{ margin: 0, color: "var(--muted)" }}>Secure DB-backed habits with badge progression.</p>
        {summary.quote ? <p style={{ margin: 0, fontStyle: "italic", color: "var(--muted)" }}>"{summary.quote}"</p> : null}
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/monthly-track" className="btn btn-ghost">
            Open Monthly Track
          </Link>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", gap: 10 }}>
        <form onSubmit={addHabit} style={{ display: "flex", gap: 10, flex: 1 }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add a habit (e.g. Morning workout)"
            style={{
              flex: 1,
              background: "#0d1117",
              color: "var(--text)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "10px 12px",
            }}
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Habit"}
          </button>
        </form>
        <button className="btn btn-ghost" onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <section className="card">
          <h2 style={{ marginTop: 0 }}>Habits</h2>
          {!habits.length ? (
            <p style={{ color: "var(--muted)" }}>No habits yet. Add your first habit.</p>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {habits.map((h) => (
                <HabitRow
                  key={h.id}
                  habit={h}
                  onRefresh={async () => {
                    await loadHabits();
                    await loadSummary();
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <aside className="card">
          <h2 style={{ marginTop: 0 }}>Badges</h2>
          <p style={{ margin: "0 0 8px", color: "var(--muted)" }}>
            {summary.unlockedCount} / {summary.totalBadges} unlocked
          </p>
          <p style={{ margin: "0 0 8px" }}>Best streak: {summary.bestStreak} days</p>
          {summary.nextBadge ? (
            <p style={{ margin: 0, color: "var(--muted)" }}>
              Next: {summary.nextBadge.emoji} {summary.nextBadge.label} in {summary.nextBadge.days - summary.bestStreak} days
            </p>
          ) : (
            <p style={{ margin: 0, color: "var(--accent)" }}>All badges unlocked. Beast Mode achieved.</p>
          )}
          {summary.latestUnlock ? (
            <p style={{ marginTop: 10, color: "var(--accent)" }}>
              New unlock: {summary.latestUnlock.emoji} {summary.latestUnlock.label}
            </p>
          ) : null}
        </aside>
      </div>
    </main>
  );
}

function HabitRow({ habit, onRefresh }) {
  const [busy, setBusy] = useState(false);

  async function toggleToday() {
    setBusy(true);
    await fetch(`/api/habits/${habit.id}/toggle`, { method: "POST" });
    setBusy(false);
    await onRefresh();
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "10px 12px",
      }}
    >
      <div>
        <div style={{ fontWeight: 600 }}>{habit.name}</div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>
          Current: {habit.streak} days · Best: {habit.bestStreak} days
        </div>
      </div>
      <button className="btn btn-ghost" onClick={toggleToday} disabled={busy}>
        {busy ? "..." : "Toggle Today"}
      </button>
    </div>
  );
}
