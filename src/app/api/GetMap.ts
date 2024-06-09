import { env } from "@/env.js"

export default async function GetMap() {
  try {
    const KEY = env.OPEN_WEATHER_API_KEY
    const MapCode = env.MAP_CODE
    if (!env.OPEN_WEATHER_API_KEY) {
      throw new Error("Open Weather API Key is not set")
    }
    if (!env.MAP_CODE) {
      throw new Error("Map Code is not set")
    }
    const apiUrl = `https://maps.openweathermap.org/maps/2.0/weather/${MapCode}/{z}/{x}/{y}?appid=${KEY}`
    const response = await fetch(apiUrl, {
      cache: "no-cache",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch weather data")
    }
    return response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}
