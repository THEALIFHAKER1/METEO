"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import FormError from "@/components/ui/form-error"
import FormSuccess from "@/components/ui/form-success"
import { Skeleton } from "@/components/ui/skeleton"

export default function GetLocation() {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter()
  const [isWaiting, setIsWaiting] = useState(true)

  useEffect(() => {
    if (navigator.geolocation) {
      setIsWaiting(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLatitude(latitude)
          setLongitude(longitude)
          setIsWaiting(false)
          const params = new URLSearchParams(searchParams)
          params.set("lat", latitude.toString())
          params.set("lon", longitude.toString())
          replace(`${pathname}?${params.toString()}`)
        },
        (error) => {
          setError(error.message)
          setIsWaiting(false)
        }
      )
    } else {
      setError("Geolocation is not supported by this browser.")
    }
  }, [pathname, replace, searchParams])

  return (
    <>
      {isWaiting ? (
        <>
          <Skeleton className="h-[2.8rem] w-40" />
          <Skeleton className="h-[2.8rem] w-40" />
          <Skeleton className="h-[2.8rem] w-60" />
        </>
      ) : !error ? (
        <>
          <FormSuccess message={"OpenWeatherMap API"} />
          <FormSuccess message={"OpenMapBox API"} />
          <FormSuccess
            message={`Latitude: ${latitude}, Longitude: ${longitude}`}
          />
        </>
      ) : (
        <FormError message={error} />
      )}
    </>
  )
}
