import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"

import GetLocation from "./getLocation"

interface searchParams {
  [key: string]: string
}

export default function Home({ searchParams }: { searchParams: searchParams }) {
  const lat = searchParams?.lat || ""
  const lon = searchParams?.lon || ""

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <p className="text-[64px]">🌦️</p>
        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>
        <div className="flex gap-2">
          <GetLocation />
        </div>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {siteConfig.description}
        </p>
        <div className="flex gap-4">
          <Button>
            <Link href={`/main?lat=${lat}&lon=${lon}`}>Start</Link>
          </Button>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className={`gap-4 ${cn(buttonVariants({ size: "default" }))}`}
          >
            <Icons.github className="h-[1.2rem] w-[1.2rem] " />
            GitHub
          </Link>
          <ModeToggle />
        </div>
      </div>
    </main>
  )
}
