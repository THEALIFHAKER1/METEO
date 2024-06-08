"use client"

import { motion as m } from "framer-motion"

import { Icons } from "../icons/icons"

type LoaderProps = {
  loadingText?: string
}

export default function Loader({ loadingText }: LoaderProps) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
      className="relative flex h-full w-full flex-col items-center justify-center font-sans focus:focus-visible:focus:outline-none"
    >
      <span className="z-[1] animate-pulse font-sans text-8xl sm:text-[30vh]">
        <Icons.logo className="h-32 w-32" />
      </span>
      {loadingText && (
        <span className="z-[1] font-mono text-sm uppercase">
          [{loadingText}]
        </span>
      )}
    </m.div>
  )
}
