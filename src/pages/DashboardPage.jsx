import React, { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart2,
  TrendingUp,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  Leaf,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../ThemeContext";
import ThemeToggle from "../ThemeToggle";
import InputForm from "../components/InputForm";
import PredictionResult from "../components/PredictionResult";
import FarmStatus from "../components/FarmStatus";
import AnalyticsChart from "../components/AnalyticsChart";
import { predictIrrigation } from "../api";

const TABS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "input", icon: ClipboardList, label: "Input" },
  { id: "results", icon: BarChart2, label: "Results" },
  { id: "analytics", icon: TrendingUp, label: "Analytics" },
];

export default function DashboardPage({ onBack }) {
  const { theme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const glass = {
    background: theme.glassBg,
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${theme.glassBorder}`,
    boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
  };

  const handlePredict = async (data) => {
    setFormData(data);
    setLoading(true);
    setError(null);
    setActiveTab("results");
    const response = await predictIrrigation(data);
    if (response.success) {
      setResult(response.data);
    } else {
      setError("Prediction failed. Please check the backend is running.");
    }
    setLoading(false);
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

      {/* ── HEADER ── */}
      <header
        style={{
          ...s.header,
          background: theme.headerBg,
          borderBottom: `1px solid ${theme.divider}`,
        }}
      >
        <button
          onClick={onBack}
          style={{
            ...s.backBtn,
            background: theme.glassBg,
            border: `1px solid ${theme.glassBorder}`,
            color: theme.textSecondary,
          }}
        >
          <ArrowLeft size={15} /> Home
        </button>

        <div style={s.navLogo}>
          <span style={{ fontSize: 20 }}>🌿</span>
          <span style={{ ...s.navLogoText, color: theme.textPrimary }}>
            SmartIrrigation
          </span>
        </div>

        {/* Tabs */}
        <nav style={s.tabs}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...s.tab,
                  background: active ? theme.accentDim : "transparent",
                  color: active ? theme.accent : theme.textMuted,
                  border: active
                    ? `1px solid ${theme.accentBorder}`
                    : "1px solid transparent",
                }}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right — online badge + theme toggle */}
        <div style={s.headerRight}>
          <div
            style={{
              ...s.onlineBadge,
              background: theme.accentDim,
              border: `1px solid ${theme.accentBorder}`,
            }}
          >
            <div
              style={{
                ...s.onlineDot,
                background: theme.accent,
                boxShadow: `0 0 6px ${theme.accent}`,
              }}
            />
            <span style={{ ...s.onlineText, color: theme.accent }}>Online</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={s.main}>
        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <div style={s.dashLayout}>
            <div>
              <h2 style={{ ...s.pageTitle, color: theme.textPrimary }}>
                Farm Overview
              </h2>

              {/* Recommendation card */}
              <div
                style={{
                  ...glass,
                  borderRadius: 24,
                  padding: 24,
                  marginBottom: 20,
                }}
              >
                <p style={{ ...s.eyebrow, color: theme.textLabel }}>
                  Recommendations
                </p>
                {result ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: theme.glassInner,
                        borderRadius: 12,
                        padding: "14px 18px",
                        marginBottom: 12,
                        flexWrap: "wrap",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 15,
                          fontWeight: 500,
                          color: theme.textSecondary,
                        }}
                      >
                        Irrigation Decision
                      </span>
                      <span
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 800,
                          fontSize: 12,
                          padding: "6px 16px",
                          borderRadius: 20,
                          letterSpacing: 0.8,
                          background:
                            result.prediction === "High"
                              ? "#2ecc71"
                              : result.prediction === "Medium"
                                ? "#f59e0b"
                                : "#3b82f6",
                          color: "#fff",
                        }}
                      >
                        {result.prediction === "High"
                          ? "YES — IRRIGATE"
                          : result.prediction === "Medium"
                            ? "IRRIGATE SOON"
                            : "NO — SKIP"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        background: theme.glassInner,
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      {[
                        { label: "Water Amount", val: result.water_amount },
                        { label: "Best Time", val: result.best_time },
                        {
                          label: "Confidence",
                          val: `${(result.confidence * 100).toFixed(0)}%`,
                          green: true,
                        },
                      ].map((m, i) => (
                        <React.Fragment key={i}>
                          <div
                            style={{
                              flex: "1 1 80px",
                              textAlign: "center",
                              padding: "4px 0",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 11,
                                color: theme.textLabel,
                                marginBottom: 6,
                              }}
                            >
                              {m.label}
                            </p>
                            <p
                              style={{
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                fontWeight: 700,
                                fontSize: "clamp(15px,2vw,20px)",
                                color: m.green
                                  ? theme.accent
                                  : theme.textPrimary,
                              }}
                            >
                              {m.val}
                            </p>
                          </div>
                          {i < 2 && (
                            <div
                              style={{
                                width: 1,
                                background: theme.glassBorder,
                                margin: "0 8px",
                              }}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: theme.textSecondary,
                        lineHeight: 1.6,
                        background: theme.glassInner,
                        borderRadius: 10,
                        padding: "12px 16px",
                      }}
                    >
                      {result.prediction === "High"
                        ? "⚠️ Soil moisture critically low. Irrigate immediately."
                        : result.prediction === "Medium"
                          ? "📋 Moderate irrigation recommended within 24 hours."
                          : "✅ Soil moisture adequate. Skip irrigation today."}
                    </p>
                  </>
                ) : (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <p style={{ fontSize: 36, marginBottom: 12 }}>🌱</p>
                    <p
                      style={{
                        color: theme.textMuted,
                        fontSize: 14,
                        marginBottom: 20,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Enter your farm conditions to get an AI recommendation
                    </p>
                    <button
                      style={{
                        ...s.actionBtn,
                        background: theme.accent,
                        color: theme.accentText,
                      }}
                      onClick={() => setActiveTab("input")}
                    >
                      Enter Farm Data →
                    </button>
                  </div>
                )}
              </div>

              <p style={{ ...s.sectionLabel, color: theme.textLabel }}>
                Farm Status
              </p>
              <FarmStatus data={formData} theme={theme} glass={glass} />
            </div>

            {/* Right column */}
            <div>
              <h2 style={{ ...s.pageTitle, color: theme.textPrimary }}>
                Live Readings
              </h2>
              <div style={s.liveGrid}>
                {[
                  {
                    icon: <Droplets size={17} color="#3b82f6" />,
                    bg: "rgba(59,130,246,0.15)",
                    label: "Soil Moisture",
                    value: formData ? `${formData.Soil_Moisture}%` : "—",
                    color: "#3b82f6",
                    sub: "Current reading",
                  },
                  {
                    icon: <Thermometer size={17} color="#f59e0b" />,
                    bg: "rgba(245,158,11,0.15)",
                    label: "Temperature",
                    value: formData ? `${formData.Temperature_C}°C` : "—",
                    color: "#f59e0b",
                    sub: "Ambient",
                  },
                  {
                    icon: <Wind size={17} color="#6366f1" />,
                    bg: "rgba(99,102,241,0.15)",
                    label: "Humidity",
                    value: formData ? `${formData.Humidity}%` : "—",
                    color: "#6366f1",
                    sub: "Relative",
                  },
                  {
                    icon: <Sun size={17} color="#f59e0b" />,
                    bg: "rgba(245,158,11,0.15)",
                    label: "Sunlight",
                    value: formData ? `${formData.Sunlight_Hours}h` : "—",
                    color: "#f59e0b",
                    sub: "Daily",
                  },
                  {
                    icon: <CloudRain size={17} color="#6366f1" />,
                    bg: "rgba(99,102,241,0.15)",
                    label: "Rainfall",
                    value: formData ? `${formData.Rainfall_mm}mm` : "—",
                    color: "#6366f1",
                    sub: "Last 7 days",
                  },
                  {
                    icon: <Leaf size={17} color={theme.accent} />,
                    bg: theme.accentDim,
                    label: "Crop",
                    value: formData ? formData.Crop_Type : "—",
                    color: theme.accent,
                    sub: formData ? formData.Crop_Growth_Stage : "None",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{ ...glass, borderRadius: 18, padding: "16px" }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: item.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      {item.icon}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: theme.textLabel,
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 800,
                        fontSize: "clamp(17px,2vw,22px)",
                        color: item.color,
                        marginBottom: 2,
                      }}
                    >
                      {item.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: theme.textMuted,
                      }}
                    >
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>

              {result && (
                <div
                  style={{
                    ...glass,
                    borderRadius: 20,
                    padding: 20,
                    marginTop: 16,
                  }}
                >
                  <p style={{ ...s.eyebrow, color: theme.textLabel }}>
                    Model Confidence
                  </p>
                  <p
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 800,
                      fontSize: "clamp(28px,4vw,42px)",
                      color: theme.accent,
                      marginBottom: 10,
                      lineHeight: 1,
                    }}
                  >
                    {(result.confidence * 100).toFixed(1)}%
                  </p>
                  <div
                    style={{
                      height: 6,
                      background: theme.sliderTrack,
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(result.confidence * 100).toFixed(0)}%`,
                        borderRadius: 3,
                        background: `linear-gradient(90deg, #1a6b35, ${theme.accent})`,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: theme.textMuted,
                      marginTop: 8,
                    }}
                  >
                    Prediction:{" "}
                    <strong style={{ color: theme.accent }}>
                      {result.prediction} irrigation need
                    </strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* INPUT */}
        {activeTab === "input" && (
          <div style={s.centered}>
            <h2
              style={{
                ...s.pageTitle,
                color: theme.textPrimary,
                marginBottom: 6,
              }}
            >
              Enter Farm Conditions
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: theme.textMuted,
                marginBottom: 24,
              }}
            >
              Fill in your current field readings to get an AI-powered
              recommendation
            </p>
            <div style={{ ...glass, borderRadius: 24, padding: 32 }}>
              <InputForm
                onSubmit={handlePredict}
                loading={loading}
                theme={theme}
              />
            </div>
          </div>
        )}

        {/* RESULTS */}
        {activeTab === "results" && (
          <div style={s.centered}>
            <h2
              style={{
                ...s.pageTitle,
                color: theme.textPrimary,
                marginBottom: 6,
              }}
            >
              Prediction Results
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: theme.textMuted,
                marginBottom: 24,
              }}
            >
              AI-powered irrigation recommendation based on your farm data
            </p>
            {loading ? (
              <div
                style={{
                  ...glass,
                  borderRadius: 24,
                  padding: 60,
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 48, marginBottom: 16 }}>⏳</p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: theme.textMuted,
                    fontSize: 16,
                  }}
                >
                  Analyzing farm conditions...
                </p>
              </div>
            ) : error ? (
              <div
                style={{
                  ...glass,
                  borderRadius: 24,
                  padding: 40,
                  textAlign: "center",
                  border: `1px solid rgba(231,76,60,0.3)`,
                }}
              >
                <p style={{ fontSize: 40, marginBottom: 12 }}>⚠️</p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#e74c3c",
                    fontSize: 15,
                    marginBottom: 20,
                  }}
                >
                  {error}
                </p>
                <button
                  style={{
                    ...s.actionBtn,
                    background: theme.accent,
                    color: theme.accentText,
                  }}
                  onClick={() => setActiveTab("input")}
                >
                  Try Again
                </button>
              </div>
            ) : result ? (
              <PredictionResult
                result={result}
                theme={theme}
                glass={glass}
                onNewPrediction={() => setActiveTab("input")}
                onViewAnalytics={() => setActiveTab("analytics")}
              />
            ) : (
              <div
                style={{
                  ...glass,
                  borderRadius: 24,
                  padding: 60,
                  textAlign: "center",
                }}
              >
                <p style={{ fontSize: 48, marginBottom: 16 }}>📋</p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: theme.textMuted,
                    fontSize: 16,
                    marginBottom: 24,
                  }}
                >
                  No results yet. Submit your farm data first.
                </p>
                <button
                  style={{
                    ...s.actionBtn,
                    background: theme.accent,
                    color: theme.accentText,
                  }}
                  onClick={() => setActiveTab("input")}
                >
                  Go to Input →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <div style={s.centered}>
            <h2
              style={{
                ...s.pageTitle,
                color: theme.textPrimary,
                marginBottom: 6,
              }}
            >
              Analytics
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: theme.textMuted,
                marginBottom: 24,
              }}
            >
              Probability breakdown and farm metadata
            </p>
            <div
              style={{
                ...glass,
                borderRadius: 24,
                padding: 28,
                marginBottom: 20,
              }}
            >
              <AnalyticsChart
                probabilities={result?.probabilities}
                theme={theme}
              />
            </div>
            {formData && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: 14,
                }}
              >
                {[
                  { icon: "🗓️", label: "Season", value: formData.Season },
                  { icon: "📍", label: "Region", value: formData.Region },
                  { icon: "🪨", label: "Soil Type", value: formData.Soil_Type },
                  {
                    icon: "🌱",
                    label: "Growth Stage",
                    value: formData.Crop_Growth_Stage,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      ...glass,
                      borderRadius: 18,
                      padding: 20,
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 28,
                        display: "block",
                        marginBottom: 10,
                      }}
                    >
                      {item.icon}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 11,
                        color: theme.textLabel,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                        color: theme.textPrimary,
                        marginTop: 4,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
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
    position: "fixed",
    width: 700,
    height: 700,
    borderRadius: "50%",
    top: -250,
    right: -200,
    pointerEvents: "none",
    zIndex: 0,
  },
  blob2: {
    position: "fixed",
    width: 500,
    height: 500,
    borderRadius: "50%",
    bottom: -150,
    left: -150,
    pointerEvents: "none",
    zIndex: 0,
  },
  gridOverlay: {
    position: "fixed",
    inset: 0,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 5vw",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    flexWrap: "wrap",
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 50,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "'Inter', sans-serif",
  },
  navLogo: { display: "flex", alignItems: "center", gap: 8 },
  navLogoText: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(14px,2vw,17px)",
    letterSpacing: -0.3,
  },
  tabs: {
    display: "flex",
    gap: 4,
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: "clamp(12px,1.5vw,14px)",
    borderRadius: 50,
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  headerRight: { display: "flex", alignItems: "center", gap: 8 },
  onlineBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderRadius: 50,
    padding: "6px 12px",
  },
  onlineDot: { width: 7, height: 7, borderRadius: "50%" },
  onlineText: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 600,
  },
  main: {
    position: "relative",
    zIndex: 5,
    flex: 1,
    padding: "28px 5vw 48px",
    maxWidth: 1400,
    margin: "0 auto",
    width: "100%",
  },
  dashLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    alignItems: "start",
  },
  pageTitle: {
    fontFamily: "'Bricolage Grotesque', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(20px,2.5vw,26px)",
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  eyebrow: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  actionBtn: {
    border: "none",
    borderRadius: 50,
    padding: "12px 28px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  sectionLabel: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  liveGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 12,
  },
  centered: { maxWidth: 860, margin: "0 auto" },
};
