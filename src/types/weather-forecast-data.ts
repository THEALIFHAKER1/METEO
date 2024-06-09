import { type City } from "./city"
import { type ForecastData } from "./forecast-data"

export type WeatherForecastData = {
  city: City
  cod: string
  message: number
  cnt: number
  list: ForecastData[]
}
