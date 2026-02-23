// =============================================
// api.js — BACKEND CONNECTION
//
// 👋 BACKEND COLLEAGUE — THIS FILE IS FOR YOU
//
// The frontend calls predictIrrigation() when
// the farmer submits the form.
//
// YOUR JOB: Build POST /api/predict
//
// INPUT the frontend sends:
// {
//   Soil_Moisture: 25.0,
//   Temperature_C: 35.0,
//   Humidity: 40.0,
//   Rainfall_mm: 2.0,
//   Sunlight_Hours: 9.0,
//   Previous_Irrigation_mm: 10.0,
//   Soil_Type: "Sandy",
//   Crop_Type: "Maize",
//   Crop_Growth_Stage: "Flowering",
//   Season: "Summer",
//   Region: "North"
// }
//
// OUTPUT your backend must return:
// {
//   prediction: "High",
//   confidence: 0.94,
//   probabilities: { Low: 0.02, Medium: 0.04, High: 0.94 },
//   water_amount: "35L/m²",
//   best_time: "6 AM – 8 AM"
// }
// =============================================

// Change this to your backend URL when ready
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://10.150.7.2:5000'

// ── REAL API CALL (use when backend is ready) ──
export async function predictIrrigation(formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (!response.ok) throw new Error(`Server error: ${response.status}`)
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('API error:', error)
    return { success: false, error: error.message }
  }
}

// ── MOCK (works without backend for testing) ──
// DELETE this when backend is connected
export function mockPredictIrrigation(formData) {
  const { Soil_Moisture, Rainfall_mm, Temperature_C } = formData

  let prediction, confidence, waterAmount, bestTime

  if (Soil_Moisture < 30 && Rainfall_mm < 5 && Temperature_C > 32) {
    prediction = 'High'
    confidence = 0.92
    waterAmount = '35L/m²'
    bestTime = '6 AM – 8 AM'
  } else if (Soil_Moisture < 50 && Rainfall_mm < 20) {
    prediction = 'Medium'
    confidence = 0.85
    waterAmount = '20L/m²'
    bestTime = '7 AM – 9 AM'
  } else {
    prediction = 'Low'
    confidence = 0.88
    waterAmount = '10L/m²'
    bestTime = 'Evening'
  }

  return {
    success: true,
    data: {
      prediction,
      confidence,
      water_amount: waterAmount,
      best_time: bestTime,
      probabilities: {
        Low:    prediction === 'Low'    ? confidence : (1 - confidence) / 2,
        Medium: prediction === 'Medium' ? confidence : (1 - confidence) / 2,
        High:   prediction === 'High'   ? confidence : (1 - confidence) / 2,
      }
    }
  }
}