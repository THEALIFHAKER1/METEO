import { env } from "@/env.js"

export default async function GetMap() {
  // if (!env.OPEN_WEATHER_API_KEY) {
  //   throw new Error("Open Weather API Key is not set")
  // }

  const MapCode = "PR0"
  const appid = "55e3a721fdb6dd960a787cff1f9ffa34"
  const apiUrl = `https://maps.openweathermap.org/maps/2.0/weather/${MapCode}/{z}/{x}/{y}?appid=${appid}`
  const response = await fetch(apiUrl, {
    cache: "no-cache",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  return response.json()
}
