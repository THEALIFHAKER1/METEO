"use client"

import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface BaseProps {
  children: React.ReactNode
}

interface RootDrawalogProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface DrawalogProps extends BaseProps {
  className?: string
  asChild?: true
}

const desktop = "(min-width: 640px)"

const Drawalog = ({ children, ...props }: RootDrawalogProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery(desktop)
  const Drawalog = isDesktop ? Dialog : Drawer

  return (
    <Drawalog open={open} onOpenChange={setOpen} {...props}>
      {children}
    </Drawalog>
  )
}

const DrawalogTrigger = ({ className, children, ...props }: DrawalogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DrawalogTrigger = isDesktop ? DialogTrigger : DrawerTrigger

  return (
    <DrawalogTrigger className={className} {...props}>
      {children}
    </DrawalogTrigger>
  )
}

const DrawalogClose = ({ className, children, ...props }: DrawalogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DrawalogClose = isDesktop ? DialogClose : DrawerClose

  return (
    <DrawalogClose className={className} {...props}>
      {children}
    </DrawalogClose>
  )
}

const DrawalogContent = ({ className, children, ...props }: DrawalogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DrawalogContent = isDesktop ? DialogContent : DrawerContent

  return (
    <DrawalogContent className={className} {...props}>
      {children}
    </DrawalogContent>
  )
}

const DrawalogDescription = ({
  className,
  children,
  ...props
}: DrawalogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DrawalogDescription = isDesktop ? DialogDescription : DrawerDescription

  return (
    <DrawalogDescription className={className} {...props}>
      {children}
    </DrawalogDescription>
  )
}

const DrawalogHeader = ({ className, children, ...props }: DrawalogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DrawalogHeader = isDesktop ? DialogHeader : DrawerHeader

  return (
    <DrawalogHeader className={className} {...props}>
      {children}
    </DrawalogHeader>
  )
}

const DrawalogTitle = ({ className, children, ...props }: DrawalogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DrawalogTitle = isDesktop ? DialogTitle : DrawerTitle

  return (
    <DrawalogTitle className={className} {...props}>
      {children}
    </DrawalogTitle>
  )
}

const DrawalogBody = ({ className, children, ...props }: DrawalogProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  )
}

const DrawalogFooter = ({ className, children, ...props }: DrawalogProps) => {
  const isDesktop = useMediaQuery(desktop)
  const DrawalogFooter = isDesktop ? DialogFooter : DrawerFooter

  return (
    <DrawalogFooter className={className} {...props}>
      {children}
    </DrawalogFooter>
  )
}

export {
  Drawalog,
  DrawalogTrigger,
  DrawalogClose,
  DrawalogContent,
  DrawalogDescription,
  DrawalogHeader,
  DrawalogTitle,
  DrawalogBody,
  DrawalogFooter,
}
