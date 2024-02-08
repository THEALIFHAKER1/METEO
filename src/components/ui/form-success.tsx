import { FaCheckCircle } from "react-icons/fa"

interface FormSuccessProps {
  message?: string
}

export default function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className=" flex items-center gap-x-2 rounded-md border bg-[#ECFDF3] p-3 text-sm text-emerald-500 shadow-sm dark:border-[#003D1C] dark:bg-[#001F0F]">
      <FaCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
