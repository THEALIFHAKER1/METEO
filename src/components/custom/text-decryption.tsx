"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface TextHackProps {
  targetText: string
  className?: string
}
export default function TextDecryption({
  targetText,
  className,
}: TextHackProps) {
  const [text, setText] = useState("‎ ")
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const interval = setInterval(() => {
      const updatedText = targetText
        .split("")
        .map((letter, index) => {
          if (index < animationProgress) {
            return letter
          }
          return letters[Math.floor(Math.random() * 26)]
        })
        .join("")

      setText(updatedText)

      if (animationProgress >= targetText.length) {
        clearInterval(interval)
      }

      setAnimationProgress(animationProgress + 0.1) // Adjust animation speed as needed
    }, 5)

    return () => clearInterval(interval)
  }, [animationProgress, targetText])
  return (
    <div>
      <h1 onMouseOver={() => setAnimationProgress(0)} className={cn(className)}>
        {text}
      </h1>
    </div>
  )
}
