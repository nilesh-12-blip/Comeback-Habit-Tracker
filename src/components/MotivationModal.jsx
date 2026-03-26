import { useState, useEffect } from "react";
import { QUOTES } from "../utils/helpers";

export default function MotivationModal({ isOpen, onClose, habitName = "Daily Task" }) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (isOpen) {
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setQuote(randomQuote);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
      animation: "fadeIn 0.3s ease forwards",
      pointerEvents: isOpen ? "all" : "none"
    }}>
      {/* Celebration particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            fontSize: "32px",
            pointerEvents: "none",
            animation: `celebrationPop ${1 + i * 0.1}s ease-out forwards`,
            left: "50%",
            top: "50%",
            marginLeft: "-16px",
            marginTop: "-16px"
          }}
        >
          {["🔥", "⚡", "💫", "👑", "✨", "🎯", "💥", "🏆", "🌟", "💎", "🚀", "👊"][i]}
        </div>
      ))}

      {/* Modal Card */}
      <div style={{
        background: "linear-gradient(135deg, var(--surface), rgba(13,17,23,0.9))",
        borderRadius: "var(--radius-lg)",
        border: "2px solid rgba(249,115,22,0.3)",
        padding: "48px 40px",
        maxWidth: "500px",
        width: "90%",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(249,115,22,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        animation: "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
      }}>
        {/* Glow background */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.1), transparent 60%)",
          pointerEvents: "none"
        }} />

        {/* Trophy icon */}
        <div style={{
          fontSize: "64px",
          textAlign: "center",
          marginBottom: "24px",
          animation: "bounce 0.8s ease-in-out infinite",
          filter: "drop-shadow(0 0 20px rgba(249,115,22,0.4))"
        }}>
          🏆
        </div>

        {/* Achievement message */}
        <h2 style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: 700,
          background: "linear-gradient(135deg, var(--accent), #fb923c)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "12px",
          animation: "slideUp 0.6s ease forwards",
          animationDelay: "0.1s",
          opacity: 0
        }}>
          Awesome Work! 🔥
        </h2>

        <p style={{
          textAlign: "center",
          color: "var(--text2)",
          fontSize: "14px",
          marginBottom: "32px",
          fontWeight: 500,
          animation: "slideUp 0.6s ease forwards",
          animationDelay: "0.2s",
          opacity: 0
        }}>
          You completed: <span style={{ color: "var(--accent)", fontWeight: 700 }}>{habitName}</span>
        </p>

        {/* Motivational Quote */}
        <div style={{
          background: "rgba(249,115,22,0.05)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: "var(--radius-md)",
          padding: "24px",
          marginBottom: "32px",
          position: "relative",
          animation: "slideUp 0.6s ease forwards",
          animationDelay: "0.3s",
          opacity: 0
        }}>
          <div style={{
            fontSize: "32px",
            color: "var(--accent)",
            marginBottom: "12px",
            lineHeight: 1
          }}>
            "
          </div>
          <p style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text)",
            lineHeight: 1.6,
            fontStyle: "italic",
            marginBottom: "12px"
          }}>
            {quote}
          </p>
          <div style={{
            fontSize: "32px",
            color: "var(--accent)",
            textAlign: "right",
            lineHeight: 1
          }}>
            "
          </div>
        </div>

        {/* Stats showing streak potential */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "28px",
          animation: "slideUp 0.6s ease forwards",
          animationDelay: "0.4s",
          opacity: 0
        }}>
          <div style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            textAlign: "center",
            transition: "all 0.3s ease"
          }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔥</div>
            <p style={{ fontSize: "12px", color: "var(--text2)", marginBottom: "4px" }}>Keep Going</p>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>Streak +1</p>
          </div>
          <div style={{
            background: "rgba(168,85,247,0.1)",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: "var(--radius-md)",
            padding: "16px",
            textAlign: "center",
            transition: "all 0.3s ease"
          }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚡</div>
            <p style={{ fontSize: "12px", color: "var(--text2)", marginBottom: "4px" }}>You're Crushing</p>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "#a855f7" }}>It!</p>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex",
          gap: "12px",
          animation: "slideUp 0.6s ease forwards",
          animationDelay: "0.5s",
          opacity: 0
        }}>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{
              flex: 1,
              padding: "14px",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              boxShadow: "0 8px 24px rgba(249,115,22,0.3)",
              transition: "all 0.3s ease"
            }}
          >
            Keep Building 🚀
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "32px",
            height: "32px",
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.2)",
            borderRadius: "50%",
            color: "var(--text2)",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            fontWeight: 700
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(249,115,22,0.2)";
            e.target.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(249,115,22,0.1)";
            e.target.style.color = "var(--text2)";
          }}
        >
          ✕
        </button>
      </div>

      <style>{`
        @keyframes celebrationPop {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(
              calc((Math.random() - 0.5) * 400px),
              calc((Math.random() - 0.5) * 400px)
            ) scale(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
