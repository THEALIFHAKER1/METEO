import { type Weather } from "./weather"

export type ForecastData = {
  dt: number
  sunrise: number
  sunset: number
  temp: Temperature
  feels_like: FeelsLike
  pressure: number
  humidity: number
  weather: Weather[]
  speed: number
  deg: number
  gust: number
  clouds: number
  pop: number
  rain?: number
}

type Temperature = {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

type FeelsLike = {
  day: number
  night: number
  eve: number
  morn: number
}
