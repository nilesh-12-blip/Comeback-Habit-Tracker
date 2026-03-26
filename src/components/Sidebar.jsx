export default function Sidebar({ page, setPage, user, onLogout, collapsed }) {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "⚡" },
    { id: "habits", label: "Habits", icon: "✅" },
    { id: "monthly", label: "Monthly Track", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "timeline", label: "Timeline", icon: "📅" },
    { id: "badges", label: "Badges", icon: "🏆" },
    { id: "motivation", label: "Motivation", icon: "💫" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside style={{
      width: collapsed ? "68px" : "220px",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s ease",
      flexShrink: 0,
      height: "100vh",
      position: "sticky",
      top: 0,
      overflow: "hidden",
    }}>
      {/* Brand */}
      <div style={{ 
        padding: collapsed ? "20px 14px" : "24px 20px", 
        borderBottom: "1px solid var(--border)",
        background: "linear-gradient(135deg, rgba(249,115,22,0.05), transparent)"
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "10px" 
        }}>
          <span style={{ 
            fontSize: "28px", 
            flexShrink: 0, 
            animation: "flame 2s ease-in-out infinite",
            filter: "drop-shadow(0 0 8px rgba(249,115,22,0.4))"
          }}>
            🔥
          </span>
          {!collapsed && (
            <div>
              <div style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "16px", 
                letterSpacing: "1.5px", 
                lineHeight: 1,
                background: "linear-gradient(135deg, var(--accent), #fb923c)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700
              }}>
                COMEBACK
              </div>
              <div style={{ 
                fontSize: "10px", 
                color: "var(--accent)", 
                letterSpacing: "2px",
                fontWeight: 600
              }}>
                LEGEND
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ 
        flex: 1, 
        padding: "12px 8px", 
        overflowY: "auto" 
      }}>
        {nav.map((n, idx) => (
          <button 
            key={n.id} 
            onClick={() => setPage(n.id)} 
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: collapsed ? "12px 14px" : "10px 14px",
              borderRadius: "10px",
              border: "1.5px solid transparent",
              cursor: "pointer",
              background: page === n.id 
                ? "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.08))" 
                : "transparent",
              color: page === n.id ? "var(--accent)" : "var(--text2)",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: page === n.id ? 700 : 500,
              marginBottom: "4px",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              borderLeft: page === n.id ? "3px solid var(--accent)" : "3px solid transparent",
              justifyContent: collapsed ? "center" : "flex-start",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              if (page !== n.id) {
                e.currentTarget.style.background = "rgba(249,115,22,0.1)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.transform = "translateX(4px)";
              }
            }}
            onMouseLeave={(e) => {
              if (page !== n.id) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text2)";
                e.currentTarget.style.transform = "translateX(0)";
              }
            }}
            title={collapsed ? n.label : undefined}
          >
            <span style={{ 
              fontSize: "18px", 
              flexShrink: 0,
              animation: page === n.id ? "float 2s ease-in-out infinite" : "none"
            }}>
              {n.icon}
            </span>
            {!collapsed && <span>{n.label}</span>}
          </button>
        ))}
      </nav>

      {/* User */}
      {!collapsed && (
        <div style={{ 
          padding: "16px", 
          borderTop: "1px solid var(--border)",
          background: "linear-gradient(135deg, rgba(249,115,22,0.05), transparent)"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px", 
            marginBottom: "10px",
            animation: "slideUp 0.5s ease forwards"
          }}>
            <div style={{ 
              width: "36px", 
              height: "36px", 
              borderRadius: "50%", 
              background: "linear-gradient(135deg, var(--accent), #ea580c)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              fontSize: "14px", 
              fontWeight: 700, 
              flexShrink: 0,
              boxShadow: "0 0 16px rgba(249,115,22,0.4)"
            }}>
              {user.name[0].toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ 
                fontSize: "13px", 
                fontWeight: 700, 
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                whiteSpace: "nowrap" 
              }}>
                {user.name}
              </div>
              <div style={{ 
                fontSize: "11px", 
                color: "var(--text3)", 
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                whiteSpace: "nowrap" 
              }}>
                {user.email}
              </div>
            </div>
          </div>
          <button 
            className="btn btn-ghost" 
            onClick={onLogout}
            style={{ 
              width: "100%", 
              justifyContent: "center", 
              fontSize: "12px", 
              padding: "8px" 
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}
