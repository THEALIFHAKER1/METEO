import {
  CheckCheck,
  Moon,
  SunMedium,
  Triangle,
  TriangleAlert,
} from "lucide-react"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  logo: Triangle,
  sun: SunMedium,
  moon: Moon,
  danger: TriangleAlert,
  success: CheckCheck,
}

export const Icons: IconsType = icons
