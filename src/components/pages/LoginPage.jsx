import { useState } from "react";
import { QUOTES } from "../../utils/helpers";
import warriorImage from "../../../worrier.jpg";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState("email"); // email | name | done
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmail = (e) => {
    e.preventDefault();
    if (!email.includes("@")) { 
      setError("Enter a valid email"); 
      return; 
    }
    setError("");
    setStep("name");
  };

  const handleName = (e) => {
    e.preventDefault();
    if (!name.trim()) { 
      setError("Enter your name"); 
      return; 
    }
    setLoading(true);
    setTimeout(() => {
      onLogin({ email, name: name.trim() });
    }, 800);
  };

  return (
    <div className="login-root">
      <div className="login-bg" />
      {[...Array(18)].map((_, i) => (
        <span
          key={`wind-${i}`}
          className="wind-spark"
          style={{
            left: `${4 + (i * 5.2) % 92}%`,
            animationDelay: `${i * 0.24}s`,
            animationDuration: `${3.8 + (i % 5) * 0.8}s`,
          }}
        />
      ))}
      <div className="wind-layer" />

      <div className="login-shell">
        <div className="login-form-col">
          {/* Logo Section */}
          <div style={{ textAlign: "center", marginBottom: "48px", animation: "slideUp 0.8s ease forwards" }}>
          <div style={{ 
            fontSize: "48px", 
            marginBottom: "16px", 
            display: "inline-block", 
            animation: "float 3s ease-in-out infinite",
            filter: "drop-shadow(0 0 20px rgba(255,70,70,0.35))"
          }}>
            ✦
          </div>
          <h1 style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "42px", 
            letterSpacing: "2px", 
            background: "linear-gradient(135deg, var(--accent), #fb923c)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            animation: "slideUp 0.8s ease forwards",
            animationDelay: "0.1s",
            opacity: 0
          }}>
            COMEBACK
          </h1>
          <p style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "18px", 
            letterSpacing: "4px", 
            color: "var(--accent)", 
            marginTop: "8px",
            fontWeight: 700,
            animation: "slideUp 0.8s ease forwards",
            animationDelay: "0.2s",
            opacity: 0
          }}>
            LEGEND
          </p>
          <p style={{ 
            color: "var(--text2)", 
            marginTop: "16px", 
            fontSize: "14px",
            fontWeight: 500,
            animation: "slideUp 0.8s ease forwards",
            animationDelay: "0.3s",
            opacity: 0
          }}>
            Your legendary comeback starts today.
          </p>
        </div>

        {/* Form Card */}
        <div className="card scale-in" style={{ 
          background: "linear-gradient(135deg, var(--surface), rgba(13,17,23,0.8))",
          borderColor: "rgba(249,115,22,0.2)",
          border: "1.5px solid rgba(249,115,22,0.2)",
          boxShadow: "0 20px 60px rgba(249,115,22,0.1)",
          animation: "slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          animationDelay: "0.1s",
          opacity: 0,
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Gradient Border Effect */}
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--radius-lg)",
            padding: "1.5px",
            background: "linear-gradient(135deg, rgba(249,115,22,0.3), rgba(168,85,247,0.1))",
            pointerEvents: "none",
            opacity: 0.5
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {step === "email" && (
              <div style={{ animation: "fadeIn 0.4s ease forwards" }}>
                <h2 style={{ 
                  fontSize: "24px", 
                  fontWeight: 700, 
                  marginBottom: "8px",
                  background: "linear-gradient(120deg, var(--text), var(--text2))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  Get Started
                </h2>
                <p style={{ 
                  color: "var(--text2)", 
                  fontSize: "13px", 
                  marginBottom: "32px",
                  fontWeight: 500
                }}>
                  Enter your email to begin your legendary journey — no password needed.
                </p>
                <form onSubmit={handleEmail}>
                  <div style={{ marginBottom: "20px", animation: "slideUp 0.5s ease forwards", animationDelay: "0.1s" }}>
                    <label style={{ fontWeight: 700, letterSpacing: "0.05em" }}>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={e => { 
                        setEmail(e.target.value); 
                        setError(""); 
                      }} 
                      autoFocus
                      style={{
                        marginTop: "8px",
                        background: "linear-gradient(135deg, rgba(22,27,34,0.8), rgba(22,27,34,0.6))",
                        borderColor: email ? "rgba(249,115,22,0.4)" : "var(--border)",
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                      }}
                    />
                    {error && (
                      <p style={{ 
                        color: "var(--red)", 
                        fontSize: "12px", 
                        marginTop: "8px",
                        animation: "slideUp 0.3s ease forwards",
                        fontWeight: 600
                      }}>
                        ✕ {error}
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ 
                      width: "100%", 
                      justifyContent: "center", 
                      padding: "14px",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      animation: "slideUp 0.5s ease forwards",
                      animationDelay: "0.2s",
                      boxShadow: "0 8px 24px rgba(249,115,22,0.3)",
                      position: "relative"
                    }}
                  >
                    Continue →
                  </button>
                </form>
              </div>
            )}

            {step === "name" && (
              <div style={{ animation: "fadeIn 0.4s ease forwards" }}>
                <h2 style={{ 
                  fontSize: "24px", 
                  fontWeight: 700, 
                  marginBottom: "8px",
                  background: "linear-gradient(120deg, var(--text), var(--text2))",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  What's your name?
                </h2>
                <p style={{ 
                  color: "var(--text2)", 
                  fontSize: "13px", 
                  marginBottom: "32px",
                  fontWeight: 500
                }}>
                  We'll personalize your comeback experience.
                </p>
                <form onSubmit={handleName}>
                  <div style={{ marginBottom: "20px", animation: "slideUp 0.5s ease forwards", animationDelay: "0.1s" }}>
                    <label style={{ fontWeight: 700, letterSpacing: "0.05em" }}>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Your legendary name" 
                      value={name} 
                      onChange={e => { 
                        setName(e.target.value); 
                        setError(""); 
                      }} 
                      autoFocus
                      style={{
                        marginTop: "8px",
                        background: "linear-gradient(135deg, rgba(22,27,34,0.8), rgba(22,27,34,0.6))",
                        borderColor: name ? "rgba(249,115,22,0.4)" : "var(--border)",
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                      }}
                    />
                    {error && (
                      <p style={{ 
                        color: "var(--red)", 
                        fontSize: "12px", 
                        marginTop: "8px",
                        animation: "slideUp 0.3s ease forwards",
                        fontWeight: 600
                      }}>
                        ✕ {error}
                      </p>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ 
                      width: "100%", 
                      justifyContent: "center", 
                      padding: "14px",
                      fontSize: "15px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      animation: "slideUp 0.5s ease forwards",
                      animationDelay: "0.2s",
                      boxShadow: "0 8px 24px rgba(249,115,22,0.3)",
                      position: "relative",
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer"
                    }} 
                    disabled={loading}
                  >
                    {loading ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ animation: "spin 1s linear infinite" }}>⚙️</span>
                        Starting your journey...
                      </span>
                    ) : (
                      "Begin My Comeback 🔥"
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-ghost" 
                    style={{ 
                      width: "100%", 
                      justifyContent: "center", 
                      marginTop: "12px",
                      animation: "slideUp 0.5s ease forwards",
                      animationDelay: "0.3s"
                    }} 
                    onClick={() => setStep("email")}
                  >
                    ← Back
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Footer Text */}
        <p style={{ 
          textAlign: "center", 
          color: "var(--text3)", 
          fontSize: "12px", 
          marginTop: "32px",
          animation: "slideUp 0.8s ease forwards",
          animationDelay: "0.4s",
          opacity: 0,
          fontWeight: 500,
          letterSpacing: "0.04em",
          width: "100%"
        }}>
          💾 Data stored locally in your browser. No account required.
        </p>
      </div>
      </div>

      <style>{`
        .login-root {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 22px;
          position: relative;
          overflow: hidden;
          background: var(--bg);
          isolation: isolate;
        }

        .login-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(110deg, rgba(5, 5, 8, 0.9) 18%, rgba(28, 6, 8, 0.62) 52%, rgba(18, 5, 7, 0.86) 100%),
            radial-gradient(circle at 72% 42%, rgba(255, 35, 35, 0.26), rgba(255, 35, 35, 0) 56%),
            radial-gradient(circle at 24% 88%, rgba(180, 5, 25, 0.24), rgba(180, 5, 25, 0) 52%),
            url(${warriorImage});
          background-position: center center;
          background-size: cover;
          filter: saturate(0.72) contrast(1.12) brightness(0.68);
          transform-origin: center center;
          animation: warriorZoom 18s ease-in-out infinite alternate;
        }

        .wind-spark {
          position: absolute;
          z-index: 1;
          bottom: -24px;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,120,120,0.95), rgba(255,120,120,0.3));
          box-shadow: 0 0 10px rgba(255,80,80,0.65), 0 0 20px rgba(255,40,40,0.25);
          pointer-events: none;
          animation-name: windRise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .wind-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.45;
          background:
            radial-gradient(120px 40px at 15% 85%, rgba(255,65,65,0.22), transparent 70%),
            radial-gradient(180px 50px at 42% 92%, rgba(255,85,85,0.16), transparent 70%),
            radial-gradient(140px 40px at 78% 88%, rgba(255,40,40,0.2), transparent 70%);
          animation: windSweep 7s ease-in-out infinite;
        }

        .login-shell {
          width: 100%;
          max-width: 460px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          align-items: stretch;
          z-index: 2;
          position: relative;
        }

        .login-form-col {
          min-width: 0;
          backdrop-filter: blur(7px);
          border-radius: var(--radius-lg);
          padding: 14px;
          background: linear-gradient(160deg, rgba(6, 6, 8, 0.48), rgba(23, 8, 10, 0.34));
          border: 1px solid rgba(255, 60, 60, 0.14);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.56), 0 0 60px rgba(220, 22, 36, 0.16);
        }

        @keyframes windRise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          65% {
            opacity: 0.55;
          }
          100% {
            transform: translate3d(14px, -92vh, 0) scale(1);
            opacity: 0;
          }
        }

        @keyframes windSweep {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(10px) translateY(-6px); }
        }

        @keyframes warriorZoom {
          0% { transform: scale(1) translateX(0); }
          100% { transform: scale(1.08) translateX(-1.2%); }
        }

        @media (max-width: 1080px) {
          .login-shell {
            max-width: 500px;
          }
        }

        @media (max-width: 640px) {
          .login-root {
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
}
