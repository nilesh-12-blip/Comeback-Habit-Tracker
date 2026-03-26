"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "register") {
      const reg = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!reg.ok) {
        setLoading(false);
        setError("Registration failed");
        return;
      }
    }

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);
    if (res?.ok) router.push("/dashboard");
    else setError("Invalid email or password");
  }

  return (
    <main className="container" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div className="card" style={{ width: "min(440px, 92vw)" }}>
        <h1 style={{ marginTop: 0 }}>{mode === "login" ? "Welcome back" : "Create account"}</h1>
        <p style={{ color: "var(--muted)", marginTop: -4, marginBottom: 16 }}>
          {mode === "login" ? "Login to access your secure tracker." : "Create your secure habit tracker account."}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
          {mode === "register" ? (
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              style={inputStyle}
            />
          ) : null}
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            style={inputStyle}
          />
          <input
            placeholder="Password (min 8 chars)"
            type="password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            style={inputStyle}
          />

          {error ? <p style={{ color: "#f87171", margin: 0 }}>{error}</p> : null}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register & Login"}
          </button>
        </form>

        <button
          className="btn btn-ghost"
          style={{ width: "100%", marginTop: 10 }}
          onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
        >
          {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </main>
  );
}

const inputStyle = {
  background: "#0d1117",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  padding: "10px 12px",
};
