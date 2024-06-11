import { type AirQualityData, type CurrentWeatherData } from "@/types"

import AirPollution from "./WidgetAirPollution"
import WidgetCompass from "./WidgetCompass"
import WidgetFeelsLike from "./WidgetFeelsLike"
import WidgetHumidity from "./WidgetHumidity"
import WidgetPreassure from "./WidgetPreassure"
import WidgetUvIndex from "./WidgetUvIndex"
import WidgetVisibility from "./WidgetVisibility"

interface WeatherWidgetsProps {
  data: CurrentWeatherData
  airQuality: AirQualityData
  uvIndexForToday: number
}

export default function WeatherWidgets({
  data,
  airQuality,
  uvIndexForToday,
}: WeatherWidgetsProps) {
  return (
    <>
      <WidgetCompass data={data} />
      <AirPollution airQuality={airQuality} />
      <WidgetUvIndex uvIndexForToday={uvIndexForToday} />
      <WidgetFeelsLike data={data} />
      <WidgetHumidity data={data} />
      <WidgetVisibility data={data} />
      <WidgetPreassure data={data} />
    </>
  )
}
