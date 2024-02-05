import { Coordinates, OpenWeatherData } from "@/types"

import { env } from "@/env.mjs"

export default async function GetWeatherOfLocation({
  lat,
  lon,
}: Coordinates): Promise<OpenWeatherData> {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.OPEN_WEATHER_API_KEY}`
  const response = await fetch(apiUrl, {
    cache: "no-cache",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  return response.json()
}
