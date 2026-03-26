export default function BadgeUnlockModal({ badge, quote, onClose }) {
  if (!badge) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "560px" }}>
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <div style={{ fontSize: "58px", marginBottom: "10px", animation: "bounce 1s ease-in-out infinite" }}>
            {badge.emoji}
          </div>
          <h2 style={{ fontSize: "30px", fontFamily: "var(--font-display)", letterSpacing: "1px" }}>
            LEVEL {badge.level} UNLOCKED
          </h2>
          <p style={{ color: "var(--accent)", fontWeight: 700, marginTop: "4px" }}>{badge.label}</p>
          <p style={{ color: "var(--text2)", fontSize: "13px", marginTop: "6px" }}>
            {badge.desc} ({badge.days} days)
          </p>
        </div>

        <div
          style={{
            background: "rgba(249,115,22,0.08)",
            border: "1px solid rgba(249,115,22,0.25)",
            borderRadius: "var(--radius)",
            padding: "18px",
            marginBottom: "18px",
          }}
        >
          <p style={{ fontStyle: "italic", lineHeight: 1.6, textAlign: "center" }}>"{quote}"</p>
        </div>

        <button className="btn btn-primary" onClick={onClose} style={{ width: "100%", justifyContent: "center" }}>
          Keep the streak alive
        </button>
      </div>
    </div>
  );
}
