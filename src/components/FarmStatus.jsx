import React from "react";
import { Droplets, Wind, Thermometer, Leaf } from "lucide-react";

export default function FarmStatus({ data, theme, glass }) {
  const cards = [
    {
      icon: <Droplets size={17} color="#3b82f6" />,
      iconBg: "rgba(59,130,246,0.15)",
      label: "Soil Moisture",
      color: "#3b82f6",
      value: data ? `${data.Soil_Moisture}%` : "—",
      progress: data ? data.Soil_Moisture : null,
      sub: data
        ? data.Soil_Moisture < 30
          ? "Critically Dry"
          : data.Soil_Moisture < 50
            ? "Moderate"
            : "Well Hydrated"
        : "No data yet",
    },
    {
      icon: <Wind size={17} color="#6366f1" />,
      iconBg: "rgba(99,102,241,0.15)",
      label: "Humidity",
      color: "#6366f1",
      value: data ? `${data.Humidity}%` : "—",
      progress: data ? data.Humidity : null,
      sub: data
        ? data.Humidity > 70
          ? "High Humidity"
          : data.Humidity > 40
            ? "Partly Cloudy"
            : "Dry Air"
        : "No data yet",
    },
    {
      icon: <Thermometer size={17} color="#f59e0b" />,
      iconBg: "rgba(245,158,11,0.15)",
      label: "Temperature",
      color: "#f59e0b",
      value: data ? `${data.Temperature_C}°C` : "—",
      progress: null,
      sub: data
        ? data.Temperature_C > 35
          ? "Heat Stress"
          : data.Temperature_C > 25
            ? "Optimal Range"
            : "Cool"
        : "No data yet",
    },
    {
      icon: <Leaf size={17} color={theme.accent} />,
      iconBg: theme.accentDim,
      label: "Crop Type",
      color: theme.accent,
      value: data ? data.Crop_Type : "—",
      progress: null,
      sub: data ? `Stage: ${data.Crop_Growth_Stage}` : "No data yet",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {cards.map((card, i) => (
        <div key={i} style={{ ...glass, borderRadius: 16, padding: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: card.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {card.icon}
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: theme.textLabel,
                fontWeight: 500,
              }}
            >
              {card.label}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 26,
              color: card.color,
              marginBottom: 8,
            }}
          >
            {card.value}
          </p>
          {card.progress !== null && (
            <div
              style={{
                height: 4,
                background: theme.sliderTrack,
                borderRadius: 2,
                overflow: "hidden",
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, card.progress)}%`,
                  background: card.color,
                  borderRadius: 2,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          )}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: theme.textMuted,
            }}
          >
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
