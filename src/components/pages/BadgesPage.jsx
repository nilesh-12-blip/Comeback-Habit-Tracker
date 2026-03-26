import { BADGES } from "../../utils/helpers";

export default function BadgesPage({ habits, comebackScore }) {
  const state = { habits, comebackScore };
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.bestStreak || 0, h.streak || 0), 0);
  const earned = BADGES.filter(b => b.condition(state));
  const locked = BADGES.filter(b => !b.condition(state));

  return (
    <div style={{ maxWidth: "900px" }} className="fade-in">
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", letterSpacing: "1px" }}>
          BADGE LEVELS
        </h1>
        <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "4px" }}>
          {earned.length} of {BADGES.length} levels unlocked · Best streak: {bestStreak} days
        </p>
      </div>

      {earned.length > 0 && (
        <>
          <h2 style={{ 
            fontSize: "14px", 
            fontWeight: 700, 
            color: "var(--accent)", 
            letterSpacing: "0.06em", 
            textTransform: "uppercase", 
            marginBottom: "14px" 
          }}>
            Earned
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
            gap: "14px", 
            marginBottom: "28px" 
          }}>
            {earned.map(b => (
              <div 
                key={b.id} 
                className="card pulse-glow" 
                style={{ 
                  textAlign: "center", 
                  borderColor: "rgba(249,115,22,0.3)", 
                  background: "rgba(249,115,22,0.05)" 
                }}
              >
                <div style={{ fontSize: "44px", marginBottom: "10px" }}>
                  {b.emoji}
                </div>
                <div style={{ fontSize: "11px", color: "var(--accent2)", fontWeight: 700, marginBottom: "4px" }}>
                  LEVEL {b.level}
                </div>
                <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                  {b.label}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text2)" }}>
                  {b.desc} ({b.days} days)
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {locked.length > 0 && (
        <>
          <h2 style={{ 
            fontSize: "14px", 
            fontWeight: 700, 
            color: "var(--text3)", 
            letterSpacing: "0.06em", 
            textTransform: "uppercase", 
            marginBottom: "14px" 
          }}>
            Locked
          </h2>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
            gap: "14px" 
          }}>
            {locked.map(b => (
              <div 
                key={b.id} 
                className="card" 
                style={{ textAlign: "center", opacity: 0.5, filter: "grayscale(1)" }}
              >
                <div style={{ fontSize: "44px", marginBottom: "10px" }}>
                  🔒
                </div>
                <div style={{ fontSize: "11px", color: "var(--text3)", fontWeight: 700, marginBottom: "4px" }}>
                  LEVEL {b.level}
                </div>
                <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>
                  {b.label}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text2)" }}>
                  {b.desc} ({b.days} days)
                </div>
                <div style={{ marginTop: "8px", fontSize: "11px", color: "var(--text3)" }}>
                  {Math.max(0, b.days - bestStreak)} days to unlock
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
