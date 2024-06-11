import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Clock, CloudSun, Moon, SunMedium } from "lucide-react"
import { FaCheckCircle } from "react-icons/fa"
import { IoMdAlert } from "react-icons/io"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  clock: Clock,
  logo: CloudSun,
  sun: SunMedium,
  moon: Moon,
  github: GitHubLogoIcon,
  danger: IoMdAlert,
  success: FaCheckCircle,
}

export const Icons: IconsType = icons
