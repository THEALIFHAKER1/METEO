import React from "react"
import { Metadata } from "next"
import { AirPollutionData, OpenWeatherData, UVIndexResponse } from "@/types"

import { DEFAULT_LOCATION } from "@/config/site"
import getAirPollution from "@/lib/api/getAirPollution"
import GetCurrentWeather from "@/lib/api/GetCurrentWeather"
import getUVData from "@/lib/api/getUVData"
import GetWeatherOfLocation from "@/lib/api/GetWeatherForecast"
import GetWeatherForecast from "@/lib/api/GetWeatherForecast"
import CurrentWeather from "@/components/widget/CurrentWeather"
import HourlyForecast from "@/components/widget/HourlyForecast"
import WeatherWidgets from "@/components/widget/WeatherWidgets"

interface searchParams {
  [key: string]: string
}

export const metadata: Metadata = {
  title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
  description: `${DEFAULT_LOCATION.city} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
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
  const WeatherForecastData: OpenWeatherData = await GetWeatherForecast({
    lat,
    lon,
  })
  const AirData: AirPollutionData = await getAirPollution({
    lat,
    lon,
  })

  const UvIndexRequest: UVIndexResponse = await getUVData({ lat, lon })
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <CurrentWeather data={CurrentWeatherData} />
        </div>
        <section className="grid h-full grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={CurrentWeatherData}
            airQuality={AirData.list[0]}
            uvIndexForToday={UvIndexRequest.daily.uv_index_max[0]}
          />
          {/* <HourlyForecast
            data={[
              {
                dt: 0,
                main: {
                  temp: 0,
                  feels_like: 0,
                  temp_min: 0,
                  temp_max: 0,
                  pressure: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    id: 0,
                    main: "",
                    description: "",
                    icon: "",
                  },
                ],
                clouds: {
                  all: 0,
                },
                wind: {
                  speed: 0,
                  deg: 0,
                  gust: 0,
                },
                visibility: 0,
                pop: 0,
                rain: undefined,
                sys: {
                  pod: "d",
                },
                dt_txt: "",
              },
              {
                dt: 0,
                main: {
                  temp: 0,
                  feels_like: 0,
                  temp_min: 0,
                  temp_max: 0,
                  pressure: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    id: 0,
                    main: "",
                    description: "",
                    icon: "",
                  },
                ],
                clouds: {
                  all: 0,
                },
                wind: {
                  speed: 0,
                  deg: 0,
                  gust: 0,
                },
                visibility: 0,
                pop: 0,
                rain: undefined,
                sys: {
                  pod: "d",
                },
                dt_txt: "",
              },
              {
                dt: 0,
                main: {
                  temp: 0,
                  feels_like: 0,
                  temp_min: 0,
                  temp_max: 0,
                  pressure: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    id: 0,
                    main: "",
                    description: "",
                    icon: "",
                  },
                ],
                clouds: {
                  all: 0,
                },
                wind: {
                  speed: 0,
                  deg: 0,
                  gust: 0,
                },
                visibility: 0,
                pop: 0,
                rain: undefined,
                sys: {
                  pod: "d",
                },
                dt_txt: "",
              },
              {
                dt: 0,
                main: {
                  temp: 0,
                  feels_like: 0,
                  temp_min: 0,
                  temp_max: 0,
                  pressure: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    id: 0,
                    main: "",
                    description: "",
                    icon: "",
                  },
                ],
                clouds: {
                  all: 0,
                },
                wind: {
                  speed: 0,
                  deg: 0,
                  gust: 0,
                },
                visibility: 0,
                pop: 0,
                rain: undefined,
                sys: {
                  pod: "d",
                },
                dt_txt: "",
              },
              {
                dt: 0,
                main: {
                  temp: 0,
                  feels_like: 0,
                  temp_min: 0,
                  temp_max: 0,
                  pressure: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    id: 0,
                    main: "",
                    description: "",
                    icon: "",
                  },
                ],
                clouds: {
                  all: 0,
                },
                wind: {
                  speed: 0,
                  deg: 0,
                  gust: 0,
                },
                visibility: 0,
                pop: 0,
                rain: undefined,
                sys: {
                  pod: "d",
                },
                dt_txt: "",
              },
              {
                dt: 0,
                main: {
                  temp: 0,
                  feels_like: 0,
                  temp_min: 0,
                  temp_max: 0,
                  pressure: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    id: 0,
                    main: "",
                    description: "",
                    icon: "",
                  },
                ],
                clouds: {
                  all: 0,
                },
                wind: {
                  speed: 0,
                  deg: 0,
                  gust: 0,
                },
                visibility: 0,
                pop: 0,
                rain: undefined,
                sys: {
                  pod: "d",
                },
                dt_txt: "",
              },
              {
                dt: 0,
                main: {
                  temp: 0,
                  feels_like: 0,
                  temp_min: 0,
                  temp_max: 0,
                  pressure: 0,
                  humidity: 0,
                },
                weather: [
                  {
                    id: 0,
                    main: "",
                    description: "",
                    icon: "",
                  },
                ],
                clouds: {
                  all: 0,
                },
                wind: {
                  speed: 0,
                  deg: 0,
                  gust: 0,
                },
                visibility: 0,
                pop: 0,
                rain: undefined,
                sys: {
                  pod: "d",
                },
                dt_txt: "",
              },
            ]}
          /> */}
        </section>
      </div>
    </>
  )
}
