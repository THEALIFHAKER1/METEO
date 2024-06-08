import CodeSnippet from "@/components/custom/code-snippet"

import ClientComponent from "./client-components"
import ServerComponents from "./server-components"

export default function ServerClientComponents() {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-2 rounded-xl bg-foreground/20 p-5">
        This is server component (parent)
        <ClientComponent>
          <ServerComponents />
        </ClientComponent>
      </div>

      <div>
        <CodeSnippet
          code={`<div className="grid gap-2 rounded-xl bg-foreground/20 p-5">
  This is server component (parent)
  <ClientComponent> // need to "use client" and have a child component
    <ServerComponents /> // must be a child component under client component
  </ClientComponent>
</div>
`}
        />
      </div>
    </div>
  )
}
