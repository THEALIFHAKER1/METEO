import { type Coordinates } from "@/types"

import { env } from "@/env.js"

export default async function GetNewWeatherForecast({ lat, lon }: Coordinates) {
  if (!env.OPEN_WEATHER_API_KEY) {
    throw new Error("Open Weather API Key is not set")
  }

  if (!lat || !lon) {
    throw new Error("Latitude and Longitude are required")
  }
  const appid = env.OPEN_WEATHER_API_KEY
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&timeformat=unixtime&forecast_days=7`
  const response = await fetch(apiUrl, {
    cache: "no-cache",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  return response.json()
}
