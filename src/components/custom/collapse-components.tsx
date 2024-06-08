import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface CollapseComponentsProps {
  nameComponent: React.ReactNode
  contentComponent: React.ReactNode
  open?: boolean
}
export default function CollapseComponents({
  nameComponent,
  contentComponent,
  open = false,
}: CollapseComponentsProps) {
  return (
    <Accordion type="single" collapsible defaultValue={open ? "item" : ""}>
      <AccordionItem value="item">
        <AccordionTrigger className="whitespace-nowrap text-left hover:no-underline">
          {nameComponent}
        </AccordionTrigger>
        <AccordionContent>{contentComponent}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
