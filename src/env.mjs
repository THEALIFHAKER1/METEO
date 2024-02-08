import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    OPEN_WEATHER_API_KEY: z.string().min(1),
    MAPBOX_ACCESS_TOKEN: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  },
})
