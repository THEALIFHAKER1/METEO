import React from "react"
import { Metadata } from "next"
import { OpenWeatherData } from "@/types"

import { DEFAULT_LOCATION } from "@/config/site"
import GetWeatherOfLocation from "@/lib/api/GetWeatherOfLocation"
import CurrentWeather from "@/components/widget/CurrentWeather"

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
  const WeatherOfLocation: OpenWeatherData = await GetWeatherOfLocation({
    lat,
    lon,
  })
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <CurrentWeather
            data={WeatherOfLocation}
            city={WeatherOfLocation.name}
          />
          {JSON.stringify(WeatherOfLocation)}
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {/*  */}
        </section>
      </div>
    </>
  )
}
