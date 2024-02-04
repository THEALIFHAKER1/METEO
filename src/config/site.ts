import { SiteConfig } from "@/types"

import { env } from "@/env.mjs"

export const siteConfig: SiteConfig = {
  name: "NEXT INITIATE",
  author: "THEALIFHAKER1",
  description:
    "Next.js 14+ starter template with app router, shadcn/ui, typesafe env, icons and configs setup.",
  keywords: ["Next.js", "React", "Tailwind CSS", "Radix UI", "shadcn/ui"],
  url: {
    base: env.NEXT_PUBLIC_APP_URL,
    author: "https://ae1.pro",
  },
  links: {
    github: "https://github.com/THEALIFHAKER1/NEXT-INITIATE",
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
}
