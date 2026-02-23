import React, { useState } from "react";

const DEFAULT_VALUES = {
  Soil_Moisture: 32,
  Temperature_C: 28,
  Humidity: 65,
  Rainfall_mm: 5,
  Sunlight_Hours: 7,
  Previous_Irrigation_mm: 20,
  Soil_Type: "Clay",
  Crop_Type: "Tomato",
  Crop_Growth_Stage: "Flowering",
  Season: "Summer",
  Region: "North",
};

const OPTIONS = {
  Soil_Type: ["Clay", "Sandy", "Loamy", "Silty", "Peaty"],
  Crop_Type: [
    "Wheat",
    "Rice",
    "Maize",
    "Sugarcane",
    "Cotton",
    "Soybean",
    "Barley",
    "Potato",
    "Tomato",
    "Sorghum",
  ],
  Crop_Growth_Stage: [
    "Seedling",
    "Vegetative",
    "Flowering",
    "Fruiting",
    "Maturity",
  ],
  Season: ["Summer", "Winter", "Spring", "Autumn"],
  Region: ["North", "South", "East", "West", "Central"],
};

const SLIDERS = [
  {
    key: "Soil_Moisture",
    icon: "💧",
    label: "Soil Moisture",
    unit: "%",
    min: 0,
    max: 100,
    color: "#3b82f6",
  },
  {
    key: "Temperature_C",
    icon: "🌡️",
    label: "Temperature",
    unit: "°C",
    min: 0,
    max: 50,
    color: "#f59e0b",
  },
  {
    key: "Humidity",
    icon: "💦",
    label: "Humidity",
    unit: "%",
    min: 0,
    max: 100,
    color: "#6366f1",
  },
  {
    key: "Rainfall_mm",
    icon: "🌧️",
    label: "Rainfall (last 7 days)",
    unit: "mm",
    min: 0,
    max: 300,
    color: "#6366f1",
  },
  {
    key: "Sunlight_Hours",
    icon: "☀️",
    label: "Sunlight Hours",
    unit: "h",
    min: 0,
    max: 14,
    color: "#f59e0b",
  },
  {
    key: "Previous_Irrigation_mm",
    icon: "🚿",
    label: "Previous Irrigation",
    unit: "mm",
    min: 0,
    max: 200,
    color: "#2ecc71",
  },
];

export default function InputForm({ onSubmit, loading, theme }) {
  const [form, setForm] = useState(DEFAULT_VALUES);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      Soil_Moisture: parseFloat(form.Soil_Moisture),
      Temperature_C: parseFloat(form.Temperature_C),
      Humidity: parseFloat(form.Humidity),
      Rainfall_mm: parseFloat(form.Rainfall_mm),
      Sunlight_Hours: parseFloat(form.Sunlight_Hours),
      Previous_Irrigation_mm: parseFloat(form.Previous_Irrigation_mm),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p style={{ ...s.sectionLabel, color: theme.textLabel }}>
        📡 Sensor Readings
      </p>
      <div style={s.sliderGrid}>
        {SLIDERS.map((cfg) => (
          <div
            key={cfg.key}
            style={{
              background: theme.glassInner,
              border: `1px solid ${theme.glassBorder}`,
              borderRadius: 16,
              padding: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: cfg.color + "22",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  {cfg.icon}
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: theme.textSecondary,
                  }}
                >
                  {cfg.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(16px,2.5vw,20px)",
                  color: cfg.color,
                  flexShrink: 0,
                }}
              >
                {parseFloat(form[cfg.key]).toFixed(0)}
                {cfg.unit}
              </span>
            </div>
            <input
              type="range"
              min={cfg.min}
              max={cfg.max}
              step="0.5"
              value={form[cfg.key]}
              onChange={(e) => set(cfg.key, e.target.value)}
              style={{
                width: "100%",
                height: 4,
                borderRadius: 2,
                outline: "none",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                accentColor: cfg.color,
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                color: theme.textMuted,
                marginTop: 6,
              }}
            >
              <span>
                {cfg.min}
                {cfg.unit}
              </span>
              <span>
                {cfg.max}
                {cfg.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ ...s.sectionLabel, color: theme.textLabel, marginTop: 28 }}>
        🌾 Farm Information
      </p>
      <div style={s.dropGrid}>
        {Object.entries(OPTIONS).map(([field, opts]) => (
          <div
            key={field}
            style={{
              background: theme.inputBg,
              border: `1px solid ${theme.inputBorder}`,
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <label
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                color: theme.textLabel,
                textTransform: "capitalize",
                fontWeight: 500,
                letterSpacing: 0.3,
              }}
            >
              {field.replace(/_/g, " ")}
            </label>
            <select
              value={form[field]}
              onChange={(e) => set(field, e.target.value)}
              style={{
                background: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: 8,
                padding: "8px 10px",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: theme.textPrimary,
                outline: "none",
                cursor: "pointer",
                width: "100%",
                appearance: "auto",
                WebkitAppearance: "auto",
              }}
            >
              {opts.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <button
        type="submit"
        style={{
          marginTop: 28,
          width: "100%",
          padding: 16,
          background: theme.accent,
          color: theme.accentText,
          border: "none",
          borderRadius: 14,
          fontSize: 15,
          fontWeight: 700,
          fontFamily: "'Inter', sans-serif",
          boxShadow: `0 8px 32px ${theme.accentDim}`,
          cursor: "pointer",
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? "⏳ Analyzing..." : "🔍 Get Irrigation Prediction"}
      </button>
    </form>
  );
}

const s = {
  sectionLabel: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  sliderGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 14,
  },
  dropGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 12,
  },
};
