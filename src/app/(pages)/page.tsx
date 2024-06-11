"use client"

import Link from "next/link"
import { siteConfig } from "@/configs/site"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import TextDecryption from "@/components/custom/text-decryption"
import { ThemeSwitcher } from "@/components/custom/theme-switcher"
import { Icons } from "@/components/icons/icons"

import GetLocation from "../api/getLocation"

type searchParams = Record<string, string>

export default function HomePage({
  searchParams,
}: {
  searchParams: searchParams
}) {
  const lat = searchParams?.lat
  const lon = searchParams?.lon

  return (
    <>
      <div className="container flex h-full max-w-[64rem] flex-col items-center justify-center gap-4 text-center">
        <Icons.logo className="h-20 w-20 transition-all hover:h-28 hover:w-28 hover:animate-pulse" />
        <TextDecryption
          targetText={siteConfig.name}
          className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl"
        />
        <div className="flex gap-2">
          <GetLocation />
        </div>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {siteConfig.description}
        </p>
        <div className="flex gap-2">
          <Link
            href={`/main?lat=${lat}&lon=${lon}`}
            className={`gap-4 ${cn(buttonVariants({ size: "default" }))}`}
          >
            Start
          </Link>

          <Link
            href={siteConfig.links.github}
            target="_blank"
            className={`gap-4 ${cn(buttonVariants({ size: "default" }))}`}
          >
            <Icons.github className="h-[1.2rem] w-[1.2rem] " />
            GitHub
          </Link>
          <ThemeSwitcher />
        </div>
      </div>
    </>
  )
}
