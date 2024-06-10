import { type City } from "./city"
import { type ForecastData } from "./forecast-data"

export type DailyForecastData = {
  city: City
  cod: string
  message: number
  cnt: number
  list: ForecastData[]
}
