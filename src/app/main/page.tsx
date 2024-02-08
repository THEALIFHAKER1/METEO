import React from "react"
import { Metadata } from "next"
import {
  AirPollutionData,
  NewForecastData,
  OpenWeatherData,
  UvIndexData,
  WeatherForecastData,
} from "@/types"

import { DEFAULT_LOCATION } from "@/config/site"
import GetAirPollution from "@/lib/api/getAirPollution"
import GetCurrentWeather from "@/lib/api/GetCurrentWeather"
import GetNewWeatherForecast from "@/lib/api/GetNewWeatherForecast"
import GetUVData from "@/lib/api/getUVData"
import GetWeatherForecast from "@/lib/api/GetWeatherForecast"
import Map from "@/components/widgets/Map"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import WidgetCurrentWeather from "@/components/widgets/WidgetCurrentWeather"
import WidgetForecast from "@/components/widgets/WidgetForecast"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: searchParams
}): Promise<Metadata> {
  const { lat, lon } = searchParams

  if (!lat || !lon) {
    return {
      title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
      description: `${DEFAULT_LOCATION.city} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
    }
  }
  const CurrentWeatherData: OpenWeatherData = await GetCurrentWeather({
    lat,
    lon,
  })

  const coord = `${CurrentWeatherData.coord.lat}, ${CurrentWeatherData.coord.lon}`
  const placesname = CurrentWeatherData.sys.country
    ? `${CurrentWeatherData.name}, ${CurrentWeatherData.sys.country}`
    : CurrentWeatherData.name
  return {
    title: `${placesname || coord} - Weather Forecast`,
    description: `${placesname || coord}  weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
  }
}

interface searchParams {
  [key: string]: string
}

export default async function MainPage({
  searchParams,
}: {
  searchParams: searchParams
}) {
  const lat = searchParams?.lat || DEFAULT_LOCATION.coord.lat
  const lon = searchParams?.lon || DEFAULT_LOCATION.coord.lon

  const CurrentWeatherData: OpenWeatherData = await GetCurrentWeather({
    lat,
    lon,
  })
  const WeatherForecastData: WeatherForecastData = await GetWeatherForecast({
    lat,
    lon,
  })
  const NewWeatherForecastData: NewForecastData = await GetNewWeatherForecast({
    lat,
    lon,
  })
  const AirPollutionData: AirPollutionData = await GetAirPollution({
    lat,
    lon,
  })
  const UvIndexData: UvIndexData = await GetUVData({
    lat,
    lon,
  })

  const [CurrentWeather, AirPollution, UvIndex] = await Promise.all([
    CurrentWeatherData,
    AirPollutionData.list[0],
    UvIndexData.daily.uv_index_max[0],
  ])

  return (
    <>
      <div className="flex flex-col gap-4 pb-5 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <WidgetCurrentWeather data={CurrentWeather} />
          <WidgetForecast
            data={NewWeatherForecastData}
            timezone={WeatherForecastData.city.timezone}
          />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={CurrentWeather}
            airQuality={AirPollution}
            uvIndexForToday={UvIndex}
          />
          <Map />
        </section>
      </div>
    </>
  )
}
