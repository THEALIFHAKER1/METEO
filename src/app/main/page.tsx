import React from "react"
import { Metadata } from "next"
import {
  AirPollutionData,
  OpenWeatherData,
  UvIndexData,
  WeatherForecastData,
} from "@/types"

import { DEFAULT_LOCATION } from "@/config/site"
import GetAirPollution from "@/lib/api/GetAirPollution"
import GetCurrentWeather from "@/lib/api/GetCurrentWeather"
import GetUVData from "@/lib/api/GetUVData"
import GetWeatherForecast from "@/lib/api/GetWeatherForecast"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import WidgetCurrentWeather from "@/components/widgets/WidgetCurrentWeather"

export const metadata: Metadata = {
  title: `Weather Forecast`,
  description: ` weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
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

  console.log(WeatherForecastData)

  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <WidgetCurrentWeather data={CurrentWeather} />
        </div>
        <section className="grid h-full grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={CurrentWeather}
            airQuality={AirPollution}
            uvIndexForToday={UvIndex}
          />
        </section>
      </div>
    </>
  )
}
