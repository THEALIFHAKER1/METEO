import { ForecastData, WeatherForecastData } from "@/types"

import { convertToDate } from "@/lib/dateUtils"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import IconComponent from "../ui/icon-component"
import { Separator } from "../ui/separator"
import { TemperatureRange } from "../ui/temperature-range"

interface WidgetForecastProps {
  data: WeatherForecastData
}

export default function WidgetForecast({ data }: WidgetForecastProps) {
  const filterWeather = data.list.reduce(
    (uniqueForecasts: ForecastData[], forecast: ForecastData) => {
      const date = convertToDate(data.city.timezone, forecast.dt, "short")
      const isDuplicate = uniqueForecasts.some(
        (uniqueForecast) =>
          convertToDate(data.city.timezone, uniqueForecast.dt, "short") === date
      )
      if (!isDuplicate) {
        uniqueForecasts.push(forecast)
      }
      return uniqueForecasts
    },
    []
  )
  const temperatures = filterWeather.map((item: ForecastData) => item.main)
  const minTemperature = Math.min(...temperatures.map((temp) => temp.temp_min))
  const maxTemperature = Math.max(...temperatures.map((temp) => temp.temp_max))

  return (
    <>
      <Card className=" h-[25rem]  shrink-0 overflow-hidden">
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
            Forecast for the next 5 days
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base font-normal md:mb-1">
          {filterWeather.map((item: ForecastData, i) => (
            <div key={item.dt}>
              <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
                <p className="min-w-[3rem] font-medium">
                  {i === 0
                    ? "Today"
                    : convertToDate(data.city.timezone, item.dt, "short")}
                </p>
                <IconComponent
                  weatherCode={item.weather[0].id}
                  className=" h-8 w-8"
                />
                <div className="flex w-[60%] flex-row gap-2 overflow-hidden">
                  <div className="flex w-full select-none flex-row items-center justify-between gap-2 pr-2 text-sm">
                    <p className="flex w-[3rem] min-w-fit justify-end text-neutral-600 dark:text-neutral-400">
                      {Math.floor(item.main.temp_min)}&deg;
                    </p>
                    <TemperatureRange
                      min={minTemperature - Math.floor(Math.random() * 5)}
                      max={maxTemperature}
                      value={[
                        item.main.temp_min - Math.floor(Math.random() * 5),
                        item.main.temp_max,
                      ]}
                    />
                    <p className="flex w-[3rem] min-w-fit justify-end">
                      {Math.floor(
                        item.main.temp_max + Math.floor(Math.random() * 5)
                      )}
                      &deg;
                    </p>
                  </div>
                </div>
              </div>
              {i !== data.list.length - 1 && <Separator className="mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
