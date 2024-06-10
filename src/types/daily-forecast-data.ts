import { type ForecastData } from "./forecast-data"

export type DailyForecastData = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  daily: ForecastData[]
}
