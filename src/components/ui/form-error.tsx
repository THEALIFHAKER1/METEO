import { FiAlertTriangle } from "react-icons/fi"
import { IoMdAlert } from "react-icons/io"

interface FormErrorProps {
  message?: string
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className=" flex items-center gap-x-2 rounded-md border border-[#FFE0E1] bg-[#FFF0F0] p-3 text-sm text-[#E50000] shadow-sm dark:border-[#4D0408] dark:bg-[#2D0607] dark:text-[#FF9EA1]">
      <IoMdAlert className="h-5 w-5" />
      <p>{message}</p>
    </div>
  )
}
