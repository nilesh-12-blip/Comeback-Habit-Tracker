import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container" style={{ padding: "48px 0 72px" }}>
      <section style={{ display: "grid", gap: 16, marginBottom: 28 }}>
        <h1 style={{ fontSize: "2.4rem", margin: 0 }}>Comeback Habit Tracker</h1>
        <p style={{ color: "var(--muted)", maxWidth: 700 }}>
          Production-ready full-stack habit tracker with database persistence, streak badges, SEO-ready pages, and
          secure API defaults.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <Link className="btn btn-primary" href="/dashboard">
            Open Dashboard
          </Link>
          <Link className="btn btn-ghost" href="/login">
            Login / Register
          </Link>
          <Link className="btn btn-ghost" href="/docs">
            Architecture
          </Link>
        </div>
      </section>
    </main>
  );
}
