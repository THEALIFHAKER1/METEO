import React from "react"
import { Link } from "lucide-react"

import { Button } from "@/components/ui/button"

function Buttontest({ lat, lon }: { lat: string; lon: string }) {
  return (
    <Button>
      <Link href={`/main?lat=${lat}&lon=${lon}`}>Start</Link>
    </Button>
  )
}

export default Buttontest
