import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "METEO",
  author: "THEALIFHAKER1",
  description:
    "Real-time weather app build with Next.js 14, Typescript and Shadcn UI. That gives you all the weather information you need",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://ae1.pro",
  },
  links: {
    github: "https://github.com/THEALIFHAKER1/METEO",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
