import Link from "next/link"

import { ModeToggle } from "./mode-toggle"

export default function Navigation() {
  return (
    <nav className="flex w-full items-center justify-between py-4">
      <div />
      <div className="flex w-full gap-2 sm:w-fit">
        {/* <CommandDialog /> */}
        <ModeToggle />
      </div>
    </nav>
  )
}
