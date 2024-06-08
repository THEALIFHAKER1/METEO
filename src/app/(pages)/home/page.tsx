import Link from "next/link"
import { siteConfig } from "@/configs/site"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { CopyNpmCommandButton } from "@/components/custom/copy-button"
import {
  Drawalog,
  DrawalogBody,
  DrawalogContent,
  DrawalogDescription,
  DrawalogFooter,
  DrawalogHeader,
  DrawalogTitle,
  DrawalogTrigger,
} from "@/components/custom/drawalog"
import TextDecryption from "@/components/custom/text-decryption"
import { ThemeSwitcher } from "@/components/custom/theme-switcher"
import { Icons } from "@/components/icons/icons"

function HomePage() {
  return (
    <>
      <div className="container flex h-full max-w-[64rem] flex-col items-center justify-center gap-4 text-center">
        <Icons.logo className="h-20 w-20 transition-all hover:h-28 hover:w-28 hover:animate-pulse" />
        <TextDecryption
          targetText={siteConfig.name}
          className="text-4xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl"
        />
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {siteConfig.description}
        </p>
        <div className="flex gap-2">
          <GetStartModal />
          <ThemeSwitcher />
        </div>
      </div>
    </>
  )
}

export default HomePage

function GetStartModal() {
  return (
    <Drawalog>
      <DrawalogTrigger asChild>
        <Button>Get Started</Button>
      </DrawalogTrigger>
      <DrawalogContent>
        <DrawalogHeader>
          <DrawalogTitle>Get Started</DrawalogTitle>
          <DrawalogDescription>
            Learn how to get started with {siteConfig.name}
          </DrawalogDescription>
        </DrawalogHeader>
        <DrawalogBody className="space-y-4 overflow-hidden pb-4 text-center text-sm sm:pb-0 sm:text-left">
          <p>
            To create a new project using {siteConfig.name}, run the following
            command:
          </p>
          <CopyCommand />
          <p>
            For more information, check out the official documentation or visit
            the Github repository.
          </p>
        </DrawalogBody>
        <DrawalogFooter>
          <Link
            href={`/docs`}
            // target="_blank"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Documentation
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className={cn(buttonVariants({ size: "default" }))}
          >
            Github
          </Link>
        </DrawalogFooter>
      </DrawalogContent>
    </Drawalog>
  )
}

function CopyCommand() {
  const npm = "npx create-next-initiate"
  return (
    <div className="flex w-full flex-col items-center ">
      <div className="relative flex h-full w-full ">
        <div className="relative flex w-full items-center rounded-lg border border-purple-200/20 bg-purple-100/10 px-2 py-2 text-sm md:px-3 md:py-3  lg:px-5 lg:py-4 ">
          <code className="mr-12">{npm}</code>
          {/* <ClipboardSelect client:load /> */}
          <CopyNpmCommandButton
            commands={{
              npm: npm,
              yarn: "yarn create-next-initiate",
              pnpm: "pnpx create-next-initiate",
              bun: "bunx create-next-initiate",
            }}
            className={cn("absolute right-4 top-4")}
          />
        </div>
      </div>
    </div>
  )
}
