import { type SiteTypes } from "@/types"

import { env } from "@/env.js"

export const siteConfig: SiteTypes = {
  name: "NEXT INITIATE",
  author: "THEALIFHAKER1",
  description:
    "Next.js 14+ starter template with app router, shadcn/ui, typesafe env, icons and configs setup.",
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
    github: "https://github.com/THEALIFHAKER1/NEXT-INITIATE",
    docs: `${env.NEXT_PUBLIC_DOCS_URL}`,
  },
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/api/og`,
}
