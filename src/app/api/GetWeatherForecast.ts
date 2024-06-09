import { type Coordinates } from "@/types"

import { env } from "@/env.js"

export default async function GetWeatherForecast({ lat, lon }: Coordinates) {
  try {
    const KEY = env.OPEN_WEATHER_API_KEY

    if (!KEY) {
      throw new Error("Open Weather API Key is not set")
    }

    if (!lat || !lon) {
      throw new Error("Latitude and Longitude are required")
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
    const response = await fetch(apiUrl, {
      next: {
        revalidate: 60 * 60 * 3,
      },
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
