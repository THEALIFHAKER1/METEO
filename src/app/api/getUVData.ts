import { type Coordinates } from "@/types"

export default async function GetUVData({ lat, lon }: Coordinates) {
  try {
    if (!lat || !lon) {
      throw new Error("Latitude and Longitude are required")
    }
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`
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
