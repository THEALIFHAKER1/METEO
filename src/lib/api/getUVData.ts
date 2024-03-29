import { Coordinates, OpenWeatherData } from "@/types"

import { env } from "@/env.mjs"

export default async function GetUVData({ lat, lon }: Coordinates) {
  if (!env.OPEN_WEATHER_API_KEY) {
    throw new Error("Open Weather API Key is not set")
  }

  if (!lat || !lon) {
    throw new Error("Latitude and Longitude are required")
  }
  const appid = env.OPEN_WEATHER_API_KEY
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`
  const response = await fetch(apiUrl, {
    cache: "no-cache",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  return response.json()
}
