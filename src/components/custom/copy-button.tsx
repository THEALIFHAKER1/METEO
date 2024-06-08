"use client"

import { useCallback, useEffect, useState } from "react"
import { type DropdownMenuTriggerProps } from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ClipboardIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
  commands: Required<{
    npm: string
    yarn: string
    pnpm: string
    bun: string
  }>
}
export async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch (error) {
    console.error("Failed to copy:", error)
  }
}

export function CopyNpmCommandButton({
  commands,
  className,
}: CopyNpmCommandButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyCommand = useCallback(async (value: string) => {
    await copyToClipboard(value)
    setHasCopied(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="default"
          className={cn("relative z-10 h-6 w-6 ", className)}
        >
          {hasCopied ? (
            <CheckIcon className="h-3 w-3" />
          ) : (
            <ClipboardIcon className="h-3 w-3" />
          )}
          <span className="sr-only">Copy</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {commands.npm && (
          <DropdownMenuItem onClick={() => copyCommand(commands.npm)}>
            npm
          </DropdownMenuItem>
        )}
        {commands.yarn && (
          <DropdownMenuItem onClick={() => copyCommand(commands.yarn)}>
            yarn
          </DropdownMenuItem>
        )}
        {commands.pnpm && (
          <DropdownMenuItem onClick={() => copyCommand(commands.pnpm)}>
            pnpm
          </DropdownMenuItem>
        )}
        {commands.bun && (
          <DropdownMenuItem onClick={() => copyCommand(commands.bun)}>
            bun
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// copy code
export function CopyCodeButton({ code }: { code: string }) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  const copyCode = useCallback(async (value: string) => {
    await copyToClipboard(value)
    setHasCopied(true)
  }, [])

  return (
    <Button
      size="icon"
      variant="default"
      onClick={() => copyCode(code)}
      className="relative z-10 h-6 w-6"
    >
      {hasCopied ? (
        <CheckIcon className="h-3 w-3" />
      ) : (
        <ClipboardIcon className="h-3 w-3" />
      )}
      <span className="sr-only">Copy</span>
    </Button>
  )
}
