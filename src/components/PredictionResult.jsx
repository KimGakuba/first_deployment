import React from "react";

const CONFIG = {
  Low: {
    color: "#2ecc71",
    badge: "SKIP TODAY",
    msg: "Soil moisture is adequate. No irrigation needed today.",
  },
  Medium: {
    color: "#f59e0b",
    badge: "IRRIGATE SOON",
    msg: "Moderate irrigation recommended within the next 24 hours.",
  },
  High: {
    color: "#e74c3c",
    badge: "IRRIGATE NOW",
    msg: "Soil moisture is critically low. Irrigate immediately.",
  },
};

export default function PredictionResult({
  result,
  theme,
  glass,
  onNewPrediction,
  onViewAnalytics,
}) {
  if (!result) return null;
  const { prediction, confidence, water_amount, best_time, probabilities } =
    result;
  const cfg = CONFIG[prediction] || CONFIG["Medium"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Main card */}
      <div style={{ ...glass, borderRadius: 24, padding: 28 }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: theme.textLabel,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginBottom: 18,
          }}
        >
          Recommendations
        </p>

        {/* Decision row */}
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
              padding: "6px 18px",
              borderRadius: 20,
              letterSpacing: 0.8,
              background: cfg.color,
              color: "#fff",
            }}
          >
            {cfg.badge}
          </span>
        </div>

        {/* Metrics */}
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
            { label: "Water Amount", val: water_amount || "—" },
            { label: "Best Time", val: best_time || "—" },
            {
              label: "Confidence",
              val: `${(confidence * 100).toFixed(1)}%`,
              color: cfg.color,
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
                    fontSize: "clamp(15px,2vw,22px)",
                    color: m.color || theme.textPrimary,
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

        {/* Decision label */}
        <div
          style={{
            background: theme.glassInner,
            borderRadius: 12,
            padding: "16px 18px",
            marginBottom: 12,
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
            Decision
          </p>
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(22px,3vw,32px)",
              color: cfg.color,
              lineHeight: 1.1,
            }}
          >
            {prediction === "High"
              ? "Irrigate Now"
              : prediction === "Medium"
                ? "Irrigate Soon"
                : "No Irrigation Needed"}
          </p>
        </div>

        {/* Message */}
        <div
          style={{
            background: theme.glassInner,
            borderRadius: 12,
            padding: "14px 18px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: theme.textSecondary,
              lineHeight: 1.6,
            }}
          >
            {cfg.msg}
          </p>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {/* Confidence */}
        <div
          style={{
            ...glass,
            borderRadius: 20,
            padding: 24,
            flex: 1,
            minWidth: 200,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: theme.textLabel,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 12,
            }}
          >
            Model Confidence
          </p>
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px,4vw,40px)",
              color: cfg.color,
              lineHeight: 1,
              marginBottom: 12,
            }}
          >
            {(confidence * 100).toFixed(1)}%
          </p>
          <div
            style={{
              height: 6,
              background: theme.sliderTrack,
              borderRadius: 3,
              overflow: "hidden",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(confidence * 100).toFixed(0)}%`,
                background: cfg.color,
                borderRadius: 3,
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              color: theme.textMuted,
            }}
          >
            {confidence >= 0.85
              ? "High confidence prediction"
              : confidence >= 0.7
                ? "Moderate confidence"
                : "⚠️ Low confidence — verify sensor readings"}
          </p>
        </div>

        {/* Probabilities */}
        {probabilities && (
          <div
            style={{
              ...glass,
              borderRadius: 20,
              padding: 24,
              flex: 1,
              minWidth: 200,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: theme.textLabel,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 16,
              }}
            >
              Probability Breakdown
            </p>
            {Object.entries(probabilities).map(([level, prob]) => (
              <div
                key={level}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    width: 54,
                    color: theme.textSecondary,
                  }}
                >
                  {level}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    background: theme.sliderTrack,
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(prob * 100).toFixed(0)}%`,
                      background: CONFIG[level]?.color || "#888",
                      borderRadius: 4,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: theme.textMuted,
                    width: 34,
                    textAlign: "right",
                  }}
                >
                  {(prob * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={onNewPrediction}
          style={{
            flex: 1,
            padding: 14,
            background: theme.accent,
            color: theme.accentText,
            border: "none",
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            boxShadow: `0 6px 24px ${theme.accentDim}`,
          }}
        >
          New Prediction
        </button>
        <button
          onClick={onViewAnalytics}
          style={{
            flex: 1,
            padding: 14,
            background: theme.glassBg,
            backdropFilter: "blur(12px)",
            border: `1px solid ${theme.glassBorder}`,
            color: theme.textSecondary,
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
          }}
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}
