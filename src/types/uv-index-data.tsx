export type UVIndexData = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnits
  daily: DailyData
}

type DailyUnits = {
  time: string
  uv_index_max: string
}

type DailyData = {
  time: string[]
  uv_index_max: number[]
}
