import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = { Low: "#2ecc71", Medium: "#f59e0b", High: "#e74c3c" };

export default function AnalyticsChart({ probabilities, theme }) {
  if (!probabilities) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <p style={{ fontSize: 40, marginBottom: 12 }}>📊</p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: theme.textMuted,
            fontSize: 14,
          }}
        >
          Run a prediction first to see analytics
        </p>
      </div>
    );
  }

  const chartData = Object.entries(probabilities).map(([level, prob]) => ({
    name: level,
    probability: parseFloat((prob * 100).toFixed(1)),
  }));

  return (
    <div>
      <p
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: theme.textPrimary,
          marginBottom: 20,
        }}
      >
        Prediction Probability Breakdown
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.glassBorder} />
          <XAxis
            dataKey="name"
            tick={{
              fontFamily: "Inter",
              fontSize: 13,
              fill: theme.textSecondary,
              fontWeight: 500,
            }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontFamily: "Inter", fontSize: 11, fill: theme.textMuted }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, "Probability"]}
            contentStyle={{
              fontFamily: "Inter",
              borderRadius: 12,
              background: theme.glassBg,
              border: `1px solid ${theme.glassBorder}`,
              color: theme.textPrimary,
              backdropFilter: "blur(12px)",
            }}
          />
          <Bar dataKey="probability" radius={[8, 8, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#2ecc71"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 28,
          marginTop: 16,
        }}
      >
        {Object.entries(COLORS).map(([level, color]) => (
          <div
            key={level}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: color,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: theme.textMuted,
              }}
            >
              {level} Need
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
