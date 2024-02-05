export type SiteConfig = {
  name: string
  author: string
  description: string
  keywords: Array<string>
  url: {
    base: string
    author: string
  }
  links: {
    github: string
  }
  ogImage: string
}

type Coordinates = {
  lon: string
  lat: string
}

export type Location = {
  city: string
  coord: Coordinates
}

export type OpenWeatherData = {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type AirPollutionData = {
  coord: Coordinates
  list: Array<{
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
  }>
}

export type UvIndexData = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: {
    time: string
    uv_index_max: string
  }
  daily: {
    time: string[]
    uv_index_max: number[]
  }
}

export type WeatherForecastData = {
  city: City
  cod: string
  message: number
  cnt: number
  list: Array<{
    dt: number
    sunrise: number
    sunset: number
    temp: Temperature
    feels_like: FeelsLike
    pressure: number
    humidity: number
    weather: {
      id: number
      main: string
      description: string
      icon: string
    }
    speed: number
    deg: number
    gust: number
    clouds: number
    pop: number
    rain?: number
  }>
}
