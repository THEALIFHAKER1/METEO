import { type Weather } from "./weather"

export type ForecastData = {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: Weather[]
  clouds: { all: number }
  wind: { speed: number; deg: number; gust: number }
  visibility: number
  pop: number
  sys: { pod: string }
  dt_txt: string
}
