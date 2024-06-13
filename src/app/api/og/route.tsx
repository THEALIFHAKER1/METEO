/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"
import { type NextRequest } from "next/server"
import { siteConfig } from "@/configs/site"
import { type CurrentWeatherData } from "@/types"

import { env } from "@/env.js"
import { convertToDate } from "@/lib/dateUtils"

import GetCurrentWeather from "../GetCurrentWeather"

export const runtime = "edge"

const interBold = fetch(
  new URL("../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(_req: NextRequest) {
  try {
    const fontBold = await interBold
    const { searchParams } = _req.nextUrl
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (lat ?? lon) {
      const CurrentWeatherData: CurrentWeatherData = (await GetCurrentWeather({
        lat: lat ?? "",
        lon: lon ?? "",
      })) as CurrentWeatherData
      return new ImageResponse(
        (
          <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-black text-white border-8 border-white">
            <div tw="flex items-center">
              <img
                width={50}
                height={50}
                src={`${env.NEXT_PUBLIC_APP_URL}/icons/icon-512x512.png`}
                alt=""
              />
              <p tw="ml-2 font-bold text-2xl">{siteConfig.name}</p>
            </div>
            <div tw="flex flex-col flex-1 py-10">
              <span>
                {convertToDate(
                  CurrentWeatherData.timezone,
                  CurrentWeatherData.dt,
                  "long"
                )}
              </span>
              {CurrentWeatherData.name ? (
                <div tw="flex text-[50px] font-bold  w-[400px]">
                  <>
                    <span>{CurrentWeatherData.name}</span>

                    {CurrentWeatherData.sys.country && (
                      <>
                        <span>,&nbsp;</span>
                        <span>{CurrentWeatherData.sys.country}</span>
                      </>
                    )}
                  </>
                </div>
              ) : (
                <>
                  <span>Lat: {CurrentWeatherData.coord.lat}</span>
                  <span>,&nbsp;</span>
                  <span>Long: {CurrentWeatherData.coord.lon}</span>
                </>
              )}
              <div tw="flex justify-start py-7 text-8xl font-bold md:py-10">
                {Math.round(CurrentWeatherData.main.temp)}&deg;
              </div>
              {CurrentWeatherData.weather?.[0] && (
                <div tw=" flex font-semibold">
                  {CurrentWeatherData.weather[0].main}
                </div>
              )}
              {CurrentWeatherData.weather?.[0] && (
                <div tw="flex">
                  <span>
                    H: {Math.round(CurrentWeatherData.main.temp_max)}&deg;
                  </span>
                  <span tw="pl-2">
                    L: {Math.round(CurrentWeatherData.main.temp_min)}&deg;
                  </span>
                </div>
              )}
            </div>
            <img
              tw="absolute object-cover bg-center rounded-md top-[0%] right-[0%] transform translate-x-1/2 translate-y-1/2"
              width={500}
              height={610}
              src={`${env.NEXT_PUBLIC_APP_URL}/backdrop.png`}
              alt=""
            />
            <div tw="flex items-center w-full justify-between">
              <div tw="flex items-center">
                <div tw="w-48 h-2 rounded-full bg-white mr-2" />
                <div tw="w-2 h-2 rounded-full bg-white mr-2" />
                <div tw="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: "Inter",
              data: fontBold,
              style: "normal",
              weight: 700,
            },
          ],
        }
      )
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            borderRadius: "8px",
            border: "8px solid white",
          }}
        >
          <img
            width={300}
            height={300}
            src={`${env.NEXT_PUBLIC_APP_URL}/icons/icon-512x512.png`}
            alt=""
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    )
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}
