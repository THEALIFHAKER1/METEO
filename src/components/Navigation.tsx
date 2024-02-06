import { siteConfig } from "@/config/site"

import CommandDialogSearchBar from "./CommandDialogSearchBar"
import { ModeToggle } from "./mode-toggle"
import Search from "./Search"

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex items-center">
        <p className="text-2xl">🌦️</p>
        <p className="text-2xl font-bold">{siteConfig.name}</p>
      </div>
      <div className="flex items-center gap-4">
        {/* <CommandDialogSearchBar />  Need an google map api*/}
        <Search />
        <ModeToggle />
      </div>
    </nav>
  )
}
