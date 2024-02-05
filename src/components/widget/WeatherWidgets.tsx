import { AirQualityData, OpenWeatherData } from "@/types"

import { formatSunTimeWithAMPM } from "@/lib/dateUtils"

// import { AirQualityData, City, HourlyForecastData } from "@/types"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import Compass from "../ui/compass"
import { Progress } from "../ui/progress"
import AirPollution from "./AirPollution"
import WidgetCompass from "./WidgetCompass"
import WidgetFeelsLike from "./WidgetFeelsLike"
import WidgetHumidity from "./WidgetHumidity"
import WidgetPreassure from "./WidgetPreassure"
import WidgetTwilight from "./WidgetTwilight"
import WidgetUvIndex from "./WidgetUvIndex"
import WidgetVisibility from "./WidgetVisibility"

interface WeatherWidgetsProps {
  data: OpenWeatherData
  airQuality: AirQualityData
  uvIndexForToday: number
  // city: City
}

export default function WeatherWidgets({
  data,
  airQuality,
  uvIndexForToday,
  // city,
}: WeatherWidgetsProps) {
  return (
    <>
      <AirPollution airQuality={airQuality} className="1" />
      <WidgetCompass data={data} />
      <WidgetUvIndex uvIndexForToday={uvIndexForToday} />
      <WidgetFeelsLike data={data} />
      <WidgetHumidity data={data} />
      <WidgetVisibility data={data} />
      <WidgetPreassure data={data} />
    </>
  )
}
