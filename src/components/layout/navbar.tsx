import { Suspense } from "react"
import { siteConfig } from "@/configs/site"

import CommandDialogSearchBar from "../custom/CommandDialogSearchBar"
import Search from "../custom/Search"
import { ThemeSwitcher } from "../custom/theme-switcher"

export default function Navbar() {
  return (
    <nav className="flex h-[5%] items-center justify-between">
      <div className="flex items-center">
        <p className="text-2xl">🌦️</p>
        <p className="text-2xl font-bold">{siteConfig.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <CommandDialogSearchBar />
        {/* Need an google map api key to use this feature */}
        <Suspense>
          <Search />
        </Suspense>
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
