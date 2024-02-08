"use client"

// import { NewForecastData } from "@/types"
import { WeatherForecastData } from "@/types"

import { convertToDate } from "@/lib/dateUtils"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import IconComponent from "../ui/icon-component"
import { Separator } from "../ui/separator"
import { TemperatureRange } from "../ui/temperature-range"

export type NewForecastData = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: {
    time: string
    weather_code: string
    temperature_2m_max: string
    temperature_2m_min: string
  }
  daily: {
    time: number[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

interface WidgetForecastProps {
  data: NewForecastData
  timezone: Number
}

export default function WidgetForecast({ data }: WidgetForecastProps) {
  const forecast = data.daily.time.map((timezone, index) => {
    return {
      date: data.daily.time[index],
      timezone: timezone,
      weatherCode: data.daily.weather_code[index],
      temperature: {
        max: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index],
      },
    }
  })

  const temperatures = forecast.map((day) => day.temperature)
  const minTemperature = Math.min(...temperatures.map((temp) => temp.min))
  const maxTemperature = Math.max(...temperatures.map((temp) => temp.max))

  return (
    <>
      <Card className=" shrink-0 overflow-auto md:h-[53rem] lg:h-[39rem] xl:h-[27rem]">
        <CardHeader>
          <CardTitle className="flex items-center gap-4 text-sm">
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 invert dark:invert-0"
              >
                <path
                  d="M8 2V5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 2V5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 9.08984H20.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 13.7002H15.7037"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6947 16.7002H15.7037"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 13.7002H12.0045"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.9955 16.7002H12.0045"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 13.7002H8.30329"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.29431 16.7002H8.30329"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </i>
            Forecast for the next 7 days
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 overflow-auto text-base font-normal md:mb-1">
          {forecast.map((day, i) => {
            return (
              <div key={i}>
                <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
                  <p className="min-w-[3rem] font-medium">
                    {i === 0
                      ? "Today"
                      : convertToDate(day.timezone, day.date, "short")}
                  </p>
                  <IconComponent
                    weatherCode={day.weatherCode}
                    className=" h-8 w-8"
                  />
                  <div className="flex w-[60%] flex-row gap-2 overflow-hidden">
                    <div className="flex w-full select-none flex-row items-center justify-between gap-2 pr-2 text-sm">
                      <p className="flex w-[3rem] min-w-fit justify-end text-neutral-600 dark:text-neutral-400">
                        {Math.floor(day.temperature.min)}&deg;
                      </p>
                      <TemperatureRange
                        min={minTemperature}
                        max={maxTemperature}
                        value={[day.temperature.min, day.temperature.max]}
                      />
                      <p className="flex w-[3rem] min-w-fit justify-end">
                        {Math.floor(day.temperature.max)}&deg;
                      </p>
                    </div>
                  </div>
                </div>
                {i !== data.daily.time.length - 1 && (
                  <Separator className="mt-3" />
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </>
  )
}
