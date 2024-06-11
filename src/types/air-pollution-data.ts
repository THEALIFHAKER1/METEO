import { type Coordinates } from "./coordinate"

export type AirPollutionData = {
  coord: Coordinates
  list: AirQualityData[]
}

export type AirQualityData = {
  dt: number
  main: {
    aqi: 1 | 2 | 3 | 4 | 5
  }
  components: {
    co: number // Concentration of CO (Carbon monoxide), μg/m3
    no: number // Concentration of NO (Nitrogen monoxide), μg/m3
    no2: number // Concentration of NO2 (Nitrogen dioxide), μg/m3
    o3: number // Concentration of O3 (Ozone), μg/m3
    so2: number // Concentration of SO2 (Sulphur dioxide), μg/m3
    pm2_5: number // Concentration of PM2.5 (Fine particles matter), μg/m3
    pm10: number // Concentration of PM10 (Coarse particulate matter), μg/m3
    nh3: number // Concentration of NH3 (Ammonia), μg/m3
  }
}
