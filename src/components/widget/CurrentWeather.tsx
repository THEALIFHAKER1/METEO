// import { City, HourlyForecastData } from "@/types"

import { OpenWeatherData } from "@/types"

import { convertToDate } from "@/lib/dateUtils"
import { Card } from "@/components/ui/card"

import Clock from "../ui/clock"
import IconComponent from "../ui/icon-component"

interface CurrentWeatherProps {
  data: OpenWeatherData
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const initial = new Date()
  return (
    <Card className="relative flex h-fit w-full shrink-0 flex-col justify-between overflow-hidden p-10 ">
      <div className="absolute " />
      <div>
        <div className="flex justify-between text-lg font-semibold">
          <span>{convertToDate(data.timezone, data.dt, "long")}</span>
          <Clock initial={initial} timezone={data.timezone} />
        </div>
        <div className="text-md mt-2 flex font-bold">
          <span>{data.name}</span>
          {data.sys.country && <span className="mx-1">,</span>}
          <span>{data.sys.country}</span>
        </div>
      </div>
      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">
        {Math.round(data.main.temp)}&deg;
      </div>
      <div>
        <IconComponent
          weatherCode={data.weather[0].id}
          x={data.weather[0].icon.slice(-1)}
          className="h-9 w-9"
        />
        <div className="font-semibold">{data.weather[0].main}</div>
        <div className="flex gap-2 dark:text-neutral-500">
          <span>H: {Math.round(data.main.temp_max)}&deg;</span>
          <span>L: {Math.round(data.main.temp_min)}&deg;</span>
        </div>
      </div>
    </Card>
  )
}
