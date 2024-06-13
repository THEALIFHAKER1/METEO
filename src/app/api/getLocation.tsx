"use client"

import React, { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import FormError from "@/components/ui/form-error"
import FormSuccess from "@/components/ui/form-success"
import { Skeleton } from "@/components/ui/skeleton"

export default function GetLocation() {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const SearchParams = useSearchParams()
  const pathname = usePathname()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(true) // Add isLoading state
  const [isWaiting, setIsWaiting] = useState(true) // Add isWaiting state

  useEffect(() => {
    if (navigator.geolocation) {
      setIsWaiting(true) // Set isWaiting to true when geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setIsWaiting(false) // Set isWaiting to false when geolocation is successful
        },
        (error) => {
          setError(error.message)
          setIsWaiting(false) // Set isWaiting to false when geolocation fails
        }
      )
      startTransition(() => {
        const params = new URLSearchParams(SearchParams)
        if (latitude) {
          params.set("lat", latitude.toString())
        } else {
          params.delete("lat")
        }
        if (longitude) {
          params.set("lon", longitude.toString())
        } else {
          params.delete("lon")
        }
        replace(`${pathname}?${params.toString()}`)
      })
    } else {
      setError("Geolocation is not supported by this browser.")
    }
  }, [latitude, longitude, pathname, replace, SearchParams, startTransition])

  useEffect(() => {
    if (!isPending) {
      setIsLoading(false) // Set isLoading to false when isPending is false
    }
  }, [isPending])

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className="h-[2.8rem] w-40" />
          <Skeleton className="h-[2.8rem] w-40" />
          <Skeleton className="h-[2.8rem] w-60" />
        </>
      ) : (
        <>
          <FormSuccess message={"OpenWeatherMap API"} />
          <FormSuccess message={"OpenMapBox API"} />
          {isWaiting ? (
            <Skeleton className="h-[2.8rem] w-60" />
          ) : !error ? (
            <FormSuccess
              message={`Latitude: ${latitude}, Longitude: ${longitude}`}
            />
          ) : (
            <FormError message={error} />
          )}
        </>
      )}
    </>
  )
}
