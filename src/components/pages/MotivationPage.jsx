import { useState } from "react";
import { QUOTES } from "../../utils/helpers";

export default function MotivationPage() {
  const [selectedQuote, setSelectedQuote] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (index) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div style={{
      padding: "32px 24px",
      maxWidth: "1000px",
      margin: "0 auto"
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "48px",
        animation: "slideUp 0.6s ease forwards"
      }}>
        <div style={{
          fontSize: "64px",
          marginBottom: "16px",
          animation: "float 3s ease-in-out infinite"
        }}>
          💫
        </div>
        <h1 style={{
          fontSize: "42px",
          fontWeight: 700,
          background: "linear-gradient(135deg, var(--accent), #fb923c)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "12px",
          letterSpacing: "-0.5px"
        }}>
          Your Motivation Hub
        </h1>
        <p style={{
          color: "var(--text2)",
          fontSize: "16px",
          fontWeight: 500,
          maxWidth: "500px",
          margin: "0 auto"
        }}>
          Every time you complete a habit, a unique quote appears to fuel your comeback journey.
        </p>
      </div>

      {/* Featured Quote Section */}
      <div style={{
        background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(168,85,247,0.05))",
        border: "2px solid rgba(249,115,22,0.3)",
        borderRadius: "var(--radius-lg)",
        padding: "40px",
        marginBottom: "48px",
        position: "relative",
        overflow: "hidden",
        animation: "slideUp 0.6s ease forwards",
        animationDelay: "0.1s"
      }}>
        {/* Glow effect */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(249,115,22,0.1), transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{
          position: "relative",
          zIndex: 1
        }}>
          <div style={{
            fontSize: "80px",
            marginBottom: "24px",
            animation: "bounce 2s ease-in-out infinite"
          }}>
            🔥
          </div>

          <div style={{
            fontSize: "32px",
            color: "var(--accent)",
            marginBottom: "16px",
            lineHeight: 1
          }}>
            "
          </div>

          <p style={{
            fontSize: "24px",
            fontWeight: 600,
            color: "var(--text)",
            lineHeight: 1.6,
            fontStyle: "italic",
            marginBottom: "24px",
            minHeight: "80px"
          }}>
            {QUOTES[selectedQuote]}
          </p>

          <div style={{
            fontSize: "32px",
            color: "var(--accent)",
            marginBottom: "24px",
            textAlign: "right",
            lineHeight: 1
          }}>
            "
          </div>

          {/* Navigation */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px"
          }}>
            <button
              onClick={() => setSelectedQuote(prev => prev === 0 ? QUOTES.length - 1 : prev - 1)}
              className="btn btn-ghost"
              style={{
                padding: "10px 16px",
                fontSize: "14px"
              }}
            >
              ← Prev
            </button>

            <span style={{
              color: "var(--text2)",
              fontSize: "14px",
              fontWeight: 600
            }}>
              {selectedQuote + 1} / {QUOTES.length}
            </span>

            <button
              onClick={() => setSelectedQuote(prev => prev === QUOTES.length - 1 ? 0 : prev + 1)}
              className="btn btn-ghost"
              style={{
                padding: "10px 16px",
                fontSize: "14px"
              }}
            >
              Next →
            </button>

            <button
              onClick={() => toggleFavorite(selectedQuote)}
              style={{
                background: favorites.includes(selectedQuote) ? "rgba(249,115,22,0.2)" : "transparent",
                border: "1px solid rgba(249,115,22,0.2)",
                borderRadius: "var(--radius-md)",
                color: favorites.includes(selectedQuote) ? "var(--accent)" : "var(--text2)",
                cursor: "pointer",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: 600,
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "rgba(249,115,22,0.4)";
                e.target.style.background = "rgba(249,115,22,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(249,115,22,0.2)";
                e.target.style.background = favorites.includes(selectedQuote) ? "rgba(249,115,22,0.2)" : "transparent";
              }}
            >
              {favorites.includes(selectedQuote) ? "❤️" : "🤍"} Save
            </button>
          </div>
        </div>
      </div>

      {/* All Quotes Grid */}
      <div style={{
        marginBottom: "32px"
      }}>
        <h2 style={{
          fontSize: "24px",
          fontWeight: 700,
          marginBottom: "24px",
          color: "var(--text)"
        }}>
          All {QUOTES.length} Quotes
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px"
        }}>
          {QUOTES.map((quote, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedQuote(idx)}
              style={{
                background: selectedQuote === idx 
                  ? "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.08))" 
                  : "rgba(249,115,22,0.05)",
                border: selectedQuote === idx 
                  ? "1.5px solid rgba(249,115,22,0.4)" 
                  : "1px solid rgba(249,115,22,0.2)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: selectedQuote === idx ? "scale(1.02)" : "scale(1)",
                position: "relative",
                overflow: "hidden",
                animation: `slideUp 0.6s ease forwards`,
                animationDelay: `${0.1 + idx * 0.03}s`,
                opacity: 0
              }}
              onMouseEnter={(e) => {
                if (selectedQuote !== idx) {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
                  e.currentTarget.style.background = "rgba(249,115,22,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedQuote !== idx) {
                  e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)";
                  e.currentTarget.style.background = "rgba(249,115,22,0.05)";
                }
              }}
            >
              {/* Favorite indicator */}
              <div style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                fontSize: "18px",
                cursor: "pointer",
                opacity: favorites.includes(idx) ? 1 : 0.4,
                transition: "opacity 0.3s ease"
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(idx);
              }}
              >
                {favorites.includes(idx) ? "❤️" : "🤍"}
              </div>

              <p style={{
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: 1.6,
                color: "var(--text)",
                fontStyle: "italic",
                paddingRight: "24px"
              }}>
                "{quote}"
              </p>

              {/* Indicator dot */}
              {selectedQuote === idx && (
                <div style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  height: "3px",
                  width: "100%",
                  background: "linear-gradient(90deg, var(--accent), #fb923c)",
                  animation: "slideIn 0.4s ease forwards"
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div style={{
          marginTop: "48px",
          paddingTop: "32px",
          borderTop: "1px solid var(--border)"
        }}>
          <h2 style={{
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "24px",
            color: "var(--text)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            ❤️ Your Favorites ({favorites.length})
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px"
          }}>
            {favorites.map(idx => (
              <div
                key={idx}
                style={{
                  background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(168,85,247,0.05))",
                  border: "1.5px solid rgba(249,115,22,0.3)",
                  borderRadius: "var(--radius-md)",
                  padding: "24px",
                  position: "relative",
                  animation: "slideUp 0.6s ease forwards"
                }}
              >
                <div style={{
                  fontSize: "20px", 
                  marginBottom: "12px" 
                }}>
                  ✨
                </div>
                <p style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  lineHeight: 1.6,
                  color: "var(--text)",
                  fontStyle: "italic",
                  marginBottom: "16px"
                }}>
                  "{QUOTES[idx]}"
                </p>
                <button
                  onClick={() => toggleFavorite(idx)}
                  style={{
                    background: "rgba(249,115,22,0.15)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    color: "var(--accent)",
                    borderRadius: "var(--radius-sm)",
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: 600,
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(249,115,22,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(249,115,22,0.15)";
                  }}
                >
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div style={{
        marginTop: "48px",
        background: "rgba(168,85,247,0.05)",
        border: "1px solid rgba(168,85,247,0.2)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        animation: "slideUp 0.6s ease forwards",
        animationDelay: "0.2s"
      }}>
        <h2 style={{
          fontSize: "18px",
          fontWeight: 700,
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text)"
        }}>
          💡 Pro Tip
        </h2>
        <p style={{
          color: "var(--text2)",
          fontSize: "14px",
          lineHeight: 1.6,
          margin: 0
        }}>
          Every time you complete a daily habit, a random motivational quote will appear to celebrate your progress and boost your confidence. The more you complete, the more motivation you'll receive! Save your favorite quotes here for quick inspiration whenever you need it.
        </p>
      </div>
    </div>
  );
}
