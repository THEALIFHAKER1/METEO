import { type CurrentWeatherData } from "@/types"

import { convertToDate } from "@/lib/dateUtils"
import { Card } from "@/components/ui/card"

import Clock from "../custom/clock"
import IconComponent from "../custom/icon-component"

interface CurrentWeatherProps {
  data: CurrentWeatherData
}

export default function WidgetCurrentWeather({ data }: CurrentWeatherProps) {
  const initial = new Date()
  return (
    <Card className="relative flex h-fit w-full shrink-0 flex-col justify-between overflow-hidden p-[2.4rem] ">
      <div className="absolute " />
      <div>
        <div className="flex justify-between text-lg font-semibold">
          <span>{convertToDate(data.timezone, data.dt, "long")}</span>
          <Clock initial={initial} timezone={data.timezone} />
        </div>
        <div className="text-md mt-2 flex font-bold">
          {data.name ? (
            <>
              <span>{data.name}</span>

              {data.sys.country && (
                <>
                  <span>,&nbsp;</span>
                  <span>{data.sys.country}</span>
                </>
              )}
            </>
          ) : (
            <>
              <span>Lat: {data.coord.lat}</span>
              <span>,&nbsp;</span>
              <span>Long: {data.coord.lon}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">
        {Math.round(data.main.temp)}&deg;
      </div>
      <div>
        {data.weather?.[0] && (
          <>
            <IconComponent
              weatherCode={data.weather[0].id}
              x={data.weather[0].icon.slice(-1)}
              className="h-9 w-9"
            />
            <div className="font-semibold">{data.weather[0].main}</div>
            <div className="flex gap-4 dark:text-neutral-500">
              <span>H: {Math.round(data.main.temp_max)}&deg;</span>
              <span>L: {Math.round(data.main.temp_min)}&deg;</span>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
