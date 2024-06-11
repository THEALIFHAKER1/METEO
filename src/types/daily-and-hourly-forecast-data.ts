import { type ForecastData } from "./forecast-data"

export type DailyAndHourlyForecastData = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  daily: ForecastData[]
  hourly: ForecastData[]
}
