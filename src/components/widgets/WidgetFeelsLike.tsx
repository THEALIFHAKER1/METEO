import React from "react"
import { type CurrentWeatherData } from "@/types"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

function WidgetFeelsLike({ data }: { data: CurrentWeatherData }) {
  return (
    <Card className="order-7 flex h-48 flex-col justify-between">
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
              <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
            </svg>
          </i>
          Feels like
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{Math.floor(data.main.feels_like)}&deg;</p>
      </CardContent>
      <CardFooter>
        <p>
          {data.main.feels_like < data.main.temp
            ? "Feels colder than the actual temperature."
            : data.main.feels_like > data.main.temp
              ? "Feels warmer than the actual temperature."
              : "Feels like the actual temperature."}
        </p>
      </CardFooter>
    </Card>
  )
}

export default WidgetFeelsLike
