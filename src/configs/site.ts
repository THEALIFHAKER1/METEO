import { type Location, type SiteTypes } from "@/types"

import { env } from "@/env.js"

export const siteConfig: SiteTypes = {
  name: "METEO",
  author: "THEALIFHAKER1",
  description:
    "Real-time weather app build with Next.js 14, Typescript and Shadcn UI. That gives you all the weather information you need.",
  keywords: [
    "next",
    "react",
    "starter",
    "template",
    "router",
    "shadcn/ui",
    "typesafe",
    "env",
    "icons",
    "configs",
  ],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://ae1.tech",
  },
  links: {
    github: "https://github.com/THEALIFHAKER1/METEO",
    docs: `${env.NEXT_PUBLIC_DOCS_URL}`,
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/api/og`,
}

export const DEFAULT_LOCATION: Location = {
  city: "Kuala Lumpur, MY",
  coord: {
    lat: "3.1499",
    lon: "101.6945",
  },
}
