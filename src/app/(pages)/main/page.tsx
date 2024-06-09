import { type Metadata } from "next"
import { DEFAULT_LOCATION, siteConfig } from "@/configs/site"
import {
  type AirPollutionData,
  type NewForecastData,
  type OpenWeatherData,
  type UvIndexData,
  type WeatherForecastData,
} from "@/types"

import GetAirPollution from "@/app/api/getAirPollution"
import GetCurrentWeather from "@/app/api/GetCurrentWeather"
import GetNewWeatherForecast from "@/app/api/GetNewWeatherForecast"
import GetUVData from "@/app/api/getUVData"
import GetWeatherForecast from "@/app/api/GetWeatherForecast"

type searchParams = Record<string, string>

export async function generateMetadata({
  searchParams,
}: {
  searchParams: searchParams
}): Promise<Metadata> {
  const { lat, lon } = searchParams
  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set("lat", lat ?? DEFAULT_LOCATION.coord.lat)
  ogSearchParams.set("lon", lon ?? DEFAULT_LOCATION.coord.lon)

  if (!lat || !lon) {
    return {
      title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
      description: `${DEFAULT_LOCATION.city} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
    }
  }
  const CurrentWeatherData: OpenWeatherData = (await GetCurrentWeather({
    lat,
    lon,
  })) as OpenWeatherData

  const coord = `${CurrentWeatherData.coord.lat}, ${CurrentWeatherData.coord.lon}`
  const placesname = CurrentWeatherData.sys.country
    ? `${CurrentWeatherData.name}, ${CurrentWeatherData.sys.country}`
    : CurrentWeatherData.name
  const title = `${placesname || coord} - Weather Forecast`
  const description = `${placesname || coord}  weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`
  const ogUrl = `/api/og?${ogSearchParams.toString()}`

  return {
    title,
    description,
    authors: { name: siteConfig.author },
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  }
}

export default async function MainPage({
  searchParams,
}: {
  searchParams: searchParams
}) {
  const lat = searchParams?.lat ?? DEFAULT_LOCATION.coord.lat
  const lon = searchParams?.lon ?? DEFAULT_LOCATION.coord.lon

  const CurrentWeatherData: OpenWeatherData = (await GetCurrentWeather({
    lat,
    lon,
  })) as OpenWeatherData

  const WeatherForecastData: WeatherForecastData = (await GetWeatherForecast({
    lat,
    lon,
  })) as WeatherForecastData

  const NewWeatherForecastData: NewForecastData = (await GetNewWeatherForecast({
    lat,
    lon,
  })) as NewForecastData

  const AirPollutionData: AirPollutionData = (await GetAirPollution({
    lat,
    lon,
  })) as AirPollutionData

  const UvIndexData: UvIndexData = (await GetUVData({
    lat,
    lon,
  })) as UvIndexData

  const [CurrentWeather, AirPollution, UvIndex] = await Promise.all([
    CurrentWeatherData,
    AirPollutionData.list[0],
    UvIndexData.daily.uv_index_max[0],
  ])
  return <></>
}
