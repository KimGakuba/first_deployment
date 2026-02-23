import React from "react";
import { Droplets, CloudSun, Wheat, Sprout, ArrowRight } from "lucide-react";
import { useTheme } from "../ThemeContext";
import ThemeToggle from "../ThemeToggle";

export default function WelcomePage({ onGetStarted }) {
  const { theme, isDark } = useTheme();

  const glass = {
    background: theme.glassBg,
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${theme.glassBorder}`,
    boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
  };

  return (
    <div style={{ ...s.page, background: theme.pageBg }}>
      <div style={{ ...s.blob1, background: theme.blob1 }} />
      <div style={{ ...s.blob2, background: theme.blob2 }} />
      <div
        style={{
          ...s.gridOverlay,
          backgroundImage: `linear-gradient(${theme.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${theme.gridLine} 1px, transparent 1px)`,
        }}
      />

      {/* Nav */}
      <nav style={{ ...s.nav, borderBottom: `1px solid ${theme.divider}` }}>
        <div style={s.navLogo}>
          <Sprout size={24} color={theme.accent} />
          <span style={{ ...s.navLogoText, color: theme.textPrimary }}>
            SmartIrrigation
          </span>
        </div>
        <div style={s.navRight}>
          <span style={{ ...s.navLink, color: theme.textMuted }}>
            Dashboard
          </span>
          <span style={{ ...s.navLink, color: theme.textMuted }}>
            Analytics
          </span>
          <span style={{ ...s.navLink, color: theme.textMuted }}>About</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero */}
      <div style={s.hero}>
        {/* Left */}
        <div style={s.heroLeft}>
          <div
            style={{
              ...s.badge,
              background: theme.accentDim,
              border: `1px solid ${theme.accentBorder}`,
              color: theme.accent,
            }}
          >
            <span
              style={{
                ...s.badgeDot,
                background: theme.accent,
                boxShadow: `0 0 6px ${theme.accent}`,
              }}
            />
            AI-Powered · ML Accuracy 92%+
          </div>

          <h1 style={{ ...s.heroTitle, color: theme.textPrimary }}>
            Smart
            <br />
            <span style={{ color: theme.accent }}>Irrigation</span>
          </h1>

          <p style={{ ...s.heroSubtitle, color: theme.textSecondary }}>
            Make smarter watering decisions using real-time soil, weather, and
            crop data — powered by machine learning trained on 11,000+ farm
            records.
          </p>

          <div style={s.features}>
            {[
              {
                icon: <Droplets size={17} color="#3b82f6" />,
                bg: "rgba(59,130,246,0.15)",
                text: "Real-time soil moisture analysis",
              },
              {
                icon: <CloudSun size={17} color="#f59e0b" />,
                bg: "rgba(245,158,11,0.15)",
                text: "Weather-aware recommendations",
              },
              {
                icon: <Wheat size={17} color={theme.accent} />,
                bg: theme.accentDim,
                text: "Crop-specific irrigation schedules",
              },
            ].map((f, i) => (
              <div key={i} style={{ ...s.featureRow, ...glass }}>
                <div style={{ ...s.featureIcon, background: f.bg }}>
                  {f.icon}
                </div>
                <span style={{ ...s.featureText, color: theme.textSecondary }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          <button
            style={{
              ...s.btnPrimary,
              background: theme.accent,
              color: theme.accentText,
              boxShadow: `0 8px 32px ${theme.accentDim}`,
            }}
            onClick={onGetStarted}
          >
            Get Started <ArrowRight size={18} />
          </button>

          <p style={{ ...s.heroNote, color: theme.textMuted }}>
            Developed for Smart Agriculture Analytics
          </p>
        </div>

        {/* Right — preview cards */}
        <div style={s.heroRight}>
          {/* Main recommendation card */}
          <div style={{ ...glass, borderRadius: 24, padding: 22 }}>
            <p style={{ ...s.eyebrow, color: theme.textLabel }}>
              Recommendations
            </p>
            <div
              style={{
                ...s.glassRow,
                background: theme.glassInner,
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 10,
              }}
            >
              <span style={{ ...s.glassRowLabel, color: theme.textSecondary }}>
                Irrigation Decision
              </span>
              <span
                style={{
                  background: theme.accent,
                  color: theme.accentText,
                  ...s.greenBadge,
                }}
              >
                YES
              </span>
            </div>
            <div
              style={{
                background: theme.glassInner,
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 12,
                display: "flex",
              }}
            >
              {[
                { label: "Water Amount", val: "25L/m²" },
                { label: "Best Time", val: "6 AM–8 AM" },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: theme.textLabel,
                        marginBottom: 4,
                      }}
                    >
                      {m.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: 20,
                        color: theme.textPrimary,
                      }}
                    >
                      {m.val}
                    </p>
                  </div>
                  {i === 0 && (
                    <div
                      style={{
                        width: 1,
                        background: theme.glassBorder,
                        margin: "0 12px",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: theme.textLabel,
                lineHeight: 1.6,
                background: theme.glassInner,
                borderRadius: 10,
                padding: "10px 14px",
              }}
            >
              Soil moisture is below optimal for tomato crops. No rain in
              forecast.
            </p>
          </div>

          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 10,
            }}
          >
            {[
              {
                icon: <Droplets size={16} color="#3b82f6" />,
                bg: "rgba(59,130,246,0.15)",
                label: "Soil Moisture",
                val: "32%",
                color: "#3b82f6",
              },
              {
                icon: <CloudSun size={16} color="#f59e0b" />,
                bg: "rgba(245,158,11,0.15)",
                label: "Temperature",
                val: "28°C",
                color: "#f59e0b",
              },
              {
                icon: <CloudSun size={16} color="#6366f1" />,
                bg: "rgba(99,102,241,0.15)",
                label: "Humidity",
                val: "65%",
                color: "#6366f1",
              },
              {
                icon: <Wheat size={16} color={theme.accent} />,
                bg: theme.accentDim,
                label: "Crop",
                val: "Tomato",
                color: theme.accent,
              },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  ...glass,
                  borderRadius: 16,
                  padding: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: stat.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.icon}
                </div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: theme.textLabel,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: 18,
                    color: stat.color,
                  }}
                >
                  {stat.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{ ...s.footerStrip, borderTop: `1px solid ${theme.divider}` }}
      >
        {[
          "Soil Moisture Analysis",
          "ML Prediction Engine",
          "Weather Integration",
          "Crop Intelligence",
          "Real-time Alerts",
          "Yield Optimization",
        ].map((item, i) => (
          <span key={i} style={{ ...s.footerItem, color: theme.textMuted }}>
            ✦ {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const s = {
  page: {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  blob1: {
    position: "absolute",
    width: 700,
    height: 700,
    borderRadius: "50%",
    top: -250,
    right: -200,
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    bottom: -200,
    left: -150,
    pointerEvents: "none",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  nav: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 5vw",
    flexWrap: "wrap",
    gap: 12,
  },
  navLogo: { display: "flex", alignItems: "center", gap: 10 },
  navLogoText: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(15px,2vw,18px)",
    letterSpacing: -0.3,
  },
  navRight: { display: "flex", alignItems: "center", gap: 24 },
  navLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },
  hero: {
    position: "relative",
    zIndex: 5,
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "5vw",
    padding: "40px 5vw",
    maxWidth: 1400,
    margin: "0 auto",
    width: "100%",
    flexWrap: "wrap",
  },
  heroLeft: {
    flex: "1 1 320px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 50,
    padding: "6px 16px",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.5,
    width: "fit-content",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    display: "inline-block",
  },
  heroTitle: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(40px,6vw,80px)",
    lineHeight: 1.0,
    letterSpacing: -2,
  },
  heroSubtitle: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "clamp(14px,1.5vw,16px)",
    lineHeight: 1.75,
    maxWidth: 420,
  },
  features: { display: "flex", flexDirection: "column", gap: 10 },
  featureRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    borderRadius: 12,
    padding: "12px 16px",
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
  },
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 50,
    padding: "14px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    border: "none",
    width: "fit-content",
  },
  heroNote: { fontFamily: "'Inter', sans-serif", fontSize: 11 },
  heroRight: {
    flex: "1 1 320px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  eyebrow: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  glassRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  glassRowLabel: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    fontWeight: 500,
  },
  greenBadge: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 800,
    fontSize: 12,
    padding: "5px 16px",
    borderRadius: 20,
    letterSpacing: 1,
  },
  footerStrip: {
    position: "relative",
    zIndex: 5,
    padding: "14px 5vw",
    display: "flex",
    gap: 32,
    overflowX: "auto",
  },
  footerItem: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    whiteSpace: "nowrap",
    fontWeight: 500,
  },
};
