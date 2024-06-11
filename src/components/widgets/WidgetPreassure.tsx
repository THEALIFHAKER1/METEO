import React from "react"
import { type CurrentWeatherData } from "@/types"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

function WidgetPreassure({ data }: { data: CurrentWeatherData }) {
  return (
    <Card className="order-7 flex  flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-sm">
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m12 14 4-4" />
              <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            </svg>
          </i>
          Pressure
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.main.pressure} hPa</p>
      </CardContent>
      <CardFooter>
        <p className="w-3/4 text-sm">
          {data.main.pressure < 1000
            ? "Low pressure. Expect changes in the weather."
            : data.main.pressure >= 1000 && data.main.pressure <= 1010
              ? "Normal pressure. Typical weather conditions."
              : "High pressure. Expect stable and clear weather."}
        </p>
      </CardFooter>
    </Card>
  )
}

export default WidgetPreassure
