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
