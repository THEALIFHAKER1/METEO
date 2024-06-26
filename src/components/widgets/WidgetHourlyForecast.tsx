"use client"

import { useRef } from "react"
import { type DailyAndHourlyForecastData, type ForecastData } from "@/types"
import { useDraggable } from "react-use-draggable-scroll"

import IconComponent from "../custom/icon-component"
import { Icons } from "../icons/icons"
import { Card, CardHeader, CardTitle } from "../ui/card"

interface HourlyForecastProps {
  data: DailyAndHourlyForecastData["hourly"]
}

export default function WidgetHourlyForecast({ data }: HourlyForecastProps) {
  function extractHoursFromDate(dt: number): number {
    const date = new Date(dt * 1000)
    return date.getHours()
  }
  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref, {
    safeDisplacement: 2,
  })

  return (
    <>
      <Card
        ref={ref}
        {...events}
        tabIndex={0}
        className="order-first col-span-2 flex cursor-grab  touch-auto touch-pan-x select-none scroll-px-0.5 flex-row items-center justify-between gap-12 overflow-auto scroll-smooth  p-6 ring-offset-background transition-colors hover:overflow-x-auto focus:scroll-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:col-span-1 lg:col-span-2 xl:col-span-1"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-4 text-sm">
            <Icons.clock />
            Hourly Forecast
          </CardTitle>
        </CardHeader>
        {data.slice(0, 12).map((item: ForecastData, idx) => (
          <>
            <div key={idx} className="flex h-full flex-col justify-between">
              <div className="flex justify-center text-sm text-neutral-600 dark:text-neutral-400">
                {idx === 0 ? "Now" : extractHoursFromDate(item.dt)}
              </div>
              <div className="flex h-full items-center justify-center">
                {item.weather[0] && (
                  <IconComponent
                    weatherCode={item.weather[0]?.id}
                    x={item.weather[0]?.icon.slice(-1)}
                    className="h-8 w-8"
                  />
                )}
              </div>
              <div className="flex justify-center">
                {Math.floor(Number(item.temp))}&deg;
              </div>
            </div>
          </>
        ))}
      </Card>
    </>
  )
}
