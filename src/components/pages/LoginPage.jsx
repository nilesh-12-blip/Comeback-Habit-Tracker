import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login"); // login | register
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate delay
    setTimeout(() => {
      setLoading(false);
      if (mode === "register") {
        if (!form.name || !form.email || !form.password) {
          setError("Please fill in all fields");
          return;
        }
        onLogin({ name: form.name, email: form.email });
      } else {
        if (!form.email || !form.password) {
          setError("Please fill in all fields");
          return;
        }
        onLogin({ name: form.name || "Legendary User", email: form.email });
      }
    }, 800);
  }

  return (
    <div className="login-master-container">
      {/* Visual Section - Guaranteed to be behind the form in layering if needed */}
      <div className="samurai-visual-section">
        <div className="samurai-image-container" />
        <div className="visual-vignette" />
        
        {/* Fire Sparks - Strictly contained with pointer-events: none */}
        <div className="local-sparks-box">
          {[...Array(25)].map((_, i) => (
            <span
              key={`spark-${i}`}
              className={`ember-spark ember-type-${i % 3}`}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "-20px",
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="aesthetic-title slide-up">
          <span className="aesthetic-tag">ESTD 2026</span>
          <h2 className="aesthetic-main">FORGED IN CONSISTENCY</h2>
        </div>
      </div>

      {/* Form Section - Guaranteed High Layering */}
      <div className="interactive-form-section">
        <div className="form-portal-box">
          <div className="portal-header fade-in">
            <h1 className="portal-title">COMEBACK</h1>
            <p className="portal-tagline">THE WARRIOR'S HABIT TRACKER</p>
          </div>

          <div className="portal-card glass-panel scale-in">
            <h3 className="portal-heading">
              {mode === "login" ? "RESTORE PROGRESS" : "INITIATE PROTOCOL"}
            </h3>
            
            <form onSubmit={handleSubmit} className="portal-inputs-area">
              {mode === "register" && (
                <div className="portal-field">
                  <label>WARRIOR NAME</label>
                  <input 
                    placeholder="e.g. Musashi"
                    value={form.name}
                    onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                    required
                    autoComplete="name"
                  />
                </div>
              )}
              <div className="portal-field">
                <label>VORTEX EMAIL</label>
                <input 
                  type="email"
                  placeholder="warrior@grit.com"
                  value={form.email}
                  onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="portal-field">
                <label>SECRET CIPHER</label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  required
                  autoComplete="current-password"
                />
              </div>

              {error && <p className="portal-error">{error}</p>}

              <button type="submit" className="portal-btn-primary" disabled={loading}>
                {loading ? "AUTHENTICATING..." : mode === "login" ? "ASCEND TO DASHBOARD" : "START YOUR STORY"}
              </button>
            </form>

            <button 
              className="portal-btn-switch" 
              onClick={() => setMode(m => m === "login" ? "register" : "login")}
            >
              {mode === "login" ? "NEED AN ACCOUNT? FORGE ONE" : "ALREADY A WARRIOR? LOGIN"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .login-master-container {
          height: 100vh;
          width: 100%;
          display: flex;
          background: #000;
          overflow: hidden;
          position: relative;
          color: #fff;
        }

        /* 55% Visual Split */
        .samurai-visual-section {
          flex: 0 0 55%;
          position: relative;
          height: 100%;
          overflow: hidden;
          border-right: 2px solid #ff3e3e;
          z-index: 1;
        }

        .samurai-image-container {
          position: absolute;
          inset: 0;
          background: url('/semurai.jpg') no-repeat center center / cover;
          filter: saturate(1.2) brightness(0.7);
          animation: epicZoom 30s linear infinite alternate;
        }

        @keyframes epicZoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }

        .visual-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%),
                      linear-gradient(to right, transparent 80%, rgba(255, 62, 62, 0.1) 100%);
        }

        .aesthetic-title {
          position: absolute;
          bottom: 60px;
          left: 60px;
          z-index: 5;
        }

        .aesthetic-tag {
          font-family: 'JetBrains Mono', monospace;
          color: #ff3e3e;
          font-size: 13px;
          letter-spacing: 5px;
          display: block;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(255, 62, 62, 0.5);
        }

        .aesthetic-main {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          letter-spacing: 5px;
          margin: 0;
          line-height: 0.85;
        }

        /* 45% Form Split - High Priority Layer */
        .interactive-form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          background: #030405;
          position: relative;
          z-index: 100; /* Higher than visual section */
          pointer-events: auto !important;
        }

        .form-portal-box {
          width: 100%;
          max-width: 420px;
          z-index: 101;
        }

        .portal-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .portal-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 80px;
          letter-spacing: 12px;
          margin: 0;
          background: linear-gradient(135deg, #fff, #ff3e3e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .portal-tagline {
          font-family: 'JetBrains Mono', monospace;
          color: #64748b;
          font-size: 11px;
          letter-spacing: 3px;
          margin-top: 5px;
        }

        .portal-card.glass-panel {
          background: rgba(15, 15, 20, 0.8);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 62, 62, 0.3);
          padding: 35px;
          border-radius: 24px;
          box-shadow: 0 50px 100px rgba(0,0,0,0.8), 0 0 50px rgba(255, 0, 0, 0.05);
          position: relative;
          z-index: 102;
          pointer-events: auto !important;
        }

        .portal-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          letter-spacing: 3px;
          color: #fff;
          margin-bottom: 25px;
          border-left: 4px solid #ff3e3e;
          padding-left: 15px;
        }

        .portal-inputs-area {
          display: flex;
          flex-direction: column;
          gap: 20px;
          pointer-events: auto !important;
        }

        .portal-field label {
          font-family: 'JetBrains Mono', monospace;
          color: #ff3e3e;
          font-size: 10px;
          letter-spacing: 2px;
          margin-bottom: 10px;
          display: block;
        }

        .portal-field input {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 15px 18px;
          border-radius: 12px;
          color: #fff;
          font-size: 16px;
          transition: all 0.3s;
          pointer-events: auto !important;
        }

        .portal-field input:focus {
          border-color: #ff3e3e;
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 20px rgba(255, 62, 62, 0.2);
          outline: none;
        }

        .portal-btn-primary {
          background: linear-gradient(135deg, #ff3e3e, #ff8c00);
          color: #fff;
          border: none;
          padding: 18px;
          border-radius: 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          cursor: pointer;
          margin-top: 10px;
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(255, 62, 62, 0.4);
          pointer-events: auto !important;
        }

        .portal-btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 40px rgba(255, 62, 62, 0.6);
        }

        .portal-btn-switch {
          background: none;
          border: none;
          color: #64748b;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          margin-top: 30px;
          cursor: pointer;
          width: 100%;
          transition: 0.3s;
          pointer-events: auto !important;
        }

        .portal-btn-switch:hover { color: #ff3e3e; }

        .portal-error {
          color: #ff4d4d;
          font-size: 13px;
          background: rgba(255, 77, 77, 0.1);
          padding: 10px;
          border-radius: 8px;
          text-align: center;
        }

        /* Particles - Strictly Layered to avoid blocking */
        .local-sparks-box {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .ember-spark {
          position: absolute;
          width: 3px;
          height: 15px;
          border-radius: 999px;
          filter: blur(1.5px);
          animation: riseEmber linear infinite;
        }

        .ember-type-0 { background: #ff3e00; box-shadow: 0 0 10px #ff3e00; }
        .ember-type-1 { background: #ff7b00; box-shadow: 0 0 10px #ff7b00; width: 2px; }
        .ember-type-2 { background: #ff0000; box-shadow: 0 0 15px #ff0000; width: 4px; }

        @keyframes riseEmber {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }

        @media (max-width: 1000px) {
          .login-master-container { flex-direction: column; overflow-y: auto; }
          .samurai-visual-section { flex: 0 0 40vh; border-right: none; border-bottom: 3px solid #ff3e3e; }
          .interactive-form-section { padding: 40px 20px; }
          .portal-title { font-size: 60px; }
        }
      `}</style>
    </div>
  );
}
