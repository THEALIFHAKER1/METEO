import { type Metadata } from "next"
import { DEFAULT_LOCATION, siteConfig } from "@/configs/site"
import {
  type AirPollutionData,
  type CurrentWeatherData,
  type DailyAndHourlyForecastData,
  type UVIndexData,
} from "@/types"

import Map from "@/components/widgets/Map"
import WeatherWidgets from "@/components/widgets/WeatherWidgets"
import WidgetCurrentWeather from "@/components/widgets/WidgetCurrentWeather"
import WidgetDailyForecast from "@/components/widgets/WidgetDailyForecast"
import WidgetHourlyForecast from "@/components/widgets/WidgetHourlyForecast"
import GetAirPollution from "@/app/api/GetAirPollution"
import GetCurrentWeather from "@/app/api/GetCurrentWeather"
import getDailyAndHourlyForecast from "@/app/api/getDailyAndHourlyForecast"
import getUV from "@/app/api/getUV"

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
  const CurrentWeatherData: CurrentWeatherData = (await GetCurrentWeather({
    lat,
    lon,
  })) as CurrentWeatherData

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

  const CurrentWeather: CurrentWeatherData = (await GetCurrentWeather({
    lat,
    lon,
  })) as CurrentWeatherData

  const DailyAndHourlyForecast: DailyAndHourlyForecastData =
    (await getDailyAndHourlyForecast({
      lat,
      lon,
    })) as DailyAndHourlyForecastData

  const AirPollution: AirPollutionData = (await GetAirPollution({
    lat,
    lon,
  })) as AirPollutionData

  const UVIndex: UVIndexData = (await getUV({ lat, lon })) as UVIndexData

  const DailyForecast = DailyAndHourlyForecast.daily
  const HourlyForecast = DailyAndHourlyForecast.hourly

  const [
    CurrentWeatherData,
    DailyForecastData,
    HourlyForecastData,
    AirPollutionData,
    UVIndexData,
  ] = await Promise.all([
    CurrentWeather,
    DailyForecast,
    HourlyForecast,
    AirPollution,
    UVIndex,
  ])

  return (
    <>
      <div className="flex flex-col gap-4 md:h-full md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <WidgetCurrentWeather data={CurrentWeatherData} />
          <WidgetDailyForecast
            data={DailyForecastData}
            timezone={CurrentWeatherData.timezone}
          />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 overflow-auto lg:grid-cols-3 xl:grid-cols-4">
          <WidgetHourlyForecast data={HourlyForecastData} />
          <WeatherWidgets
            data={CurrentWeather}
            airQuality={AirPollutionData.list[0]!}
            uvIndexForToday={UVIndexData.daily.uv_index_max[0]!}
          />
          <Map />
        </section>
      </div>
    </>
  )
}
