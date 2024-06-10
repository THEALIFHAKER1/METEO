import { type Metadata } from "next"
import { DEFAULT_LOCATION, siteConfig } from "@/configs/site"
import { type CurrentWeatherData, type DailyForecastData } from "@/types"

import Navbar from "@/components/layout/navbar"
import WidgetCurrentWeather from "@/components/widgets/WidgetCurrentWeather"
import WidgetDailyForecast from "@/components/widgets/WidgetDailyForecast"
import GetCurrentWeather from "@/app/api/GetCurrentWeather"
import getDailyForecast from "@/app/api/getDailyForecast"

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

  const DailyForecast: DailyForecastData = (await getDailyForecast({
    lat,
    lon,
  })) as DailyForecastData

  const [CurrentWeatherData, DailyForecastData] = await Promise.all([
    CurrentWeather,
    DailyForecast,
  ])

  return (
    <>
      <Navbar />
      <div className="flex h-[95%] flex-col gap-4 pb-5 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <WidgetCurrentWeather data={CurrentWeatherData} />
          <WidgetDailyForecast data={DailyForecastData} />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4"></section>
      </div>
    </>
  )
}
