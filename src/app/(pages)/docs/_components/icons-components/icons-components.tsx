import { Icons } from "@/components/icons/icons"

import InstructionsIcons from "./instructions-icons"

export default function IconsComponents() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-2 rounded-xl bg-foreground/20 p-5">
        <p className="flex w-fit gap-2 rounded-xl bg-destructive p-4 text-center align-middle font-bold">
          <Icons.danger className="h-5 w-5" />
          You need a python to run this script
        </p>
        <InstructionsIcons />
        <p className="bg-success flex w-fit gap-2 rounded-xl p-4 text-center align-middle font-bold">
          <Icons.success className="h-5 w-5" />
          Done
        </p>
      </div>
    </div>
  )
}
