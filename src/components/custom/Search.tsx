"use client"

import { useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer"

export default function Search() {
  const SearchParams = useSearchParams()
  const pathname = usePathname()
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()
  const [latitude, setLatitude] = useState<string | undefined>(
    SearchParams.get("lat")?.toString()
  )
  const [longitude, setLongitude] = useState<string | undefined>(
    SearchParams.get("lon")?.toString()
  )

  const form = useForm()
  function handleSearch() {
    startTransition(() => {
      const params = new URLSearchParams(SearchParams)
      if (latitude) {
        params.set("lat", latitude)
      } else {
        params.delete("lat")
      }
      if (longitude) {
        params.set("lon", longitude)
      } else {
        params.delete("lon")
      }
      replace(`${pathname}?${params.toString()}`)
      toast("Searching....")
    })
  }

  return (
    <>
      <div className="hidden md:block">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="flex gap-4 "
          >
            <FormField
              control={form.control}
              name="Latitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="any"
                      aria-label={"Latitude"}
                      value={latitude ?? ""}
                      className="h-10 w-full rounded-lg bg-background px-2 text-sm "
                      onChange={(e) => setLatitude(e.target.value)}
                      placeholder={"Latitude"}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Longitude"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="any"
                      aria-label={"Longitude"}
                      value={longitude ?? ""}
                      className="h-10 w-full rounded-lg bg-background px-2 text-sm "
                      onChange={(e) => setLongitude(e.target.value)}
                      placeholder={"Longitude"}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="default" type="submit" className=" ">
              Search
            </Button>
          </form>
        </Form>
      </div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Search</Button>
          </DrawerTrigger>
          <DrawerContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSearch)}
                className="m-7 flex flex-col gap-4 "
              >
                <FormField
                  control={form.control}
                  name="Latitude"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="any"
                          aria-label={"Latitude"}
                          value={latitude ?? ""}
                          className="h-10 w-full rounded-lg bg-background px-2 text-sm "
                          onChange={(e) => setLatitude(e.target.value)}
                          placeholder={"Latitude"}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Longitude"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="any"
                          aria-label={"Longitude"}
                          value={longitude ?? ""}
                          className="h-10 w-full rounded-lg bg-background px-2 text-sm "
                          onChange={(e) => setLongitude(e.target.value)}
                          placeholder={"Longitude"}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="default" type="submit" className=" ">
                  Search
                </Button>
              </form>
            </Form>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
