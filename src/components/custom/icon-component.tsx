import Image from "next/image"

import { weatherIconMappings } from "@/lib/iconMap"

interface IconComponentProps {
  weatherCode: number
  x?: string
  className?: string
}

export default function IconComponent({
  weatherCode,
  x,
  className,
}: IconComponentProps) {
  const iconNameKey = x ? `${weatherCode}${x}` : weatherCode
  const iconName = weatherIconMappings[iconNameKey]

  return (
    <div className={`relative invert-0 dark:invert ${className}`}>
      <Image
        fill
        alt={weatherCode.toString()}
        src={`/icons/weather/wi-${iconName}.svg`}
        className="select-none"
      />
    </div>
  )
}
