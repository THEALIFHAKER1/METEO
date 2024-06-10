/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"
import { type NextRequest } from "next/server"
import { DEFAULT_LOCATION } from "@/configs/site"
import { type CurrentWeatherData } from "@/types"

import { env } from "@/env.js"

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

    const CurrentWeatherData: CurrentWeatherData = (await GetCurrentWeather({
      lat: lat ?? "",
      lon: lon ?? "",
    })) as CurrentWeatherData
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
          <h1
            style={{
              fontFamily: "Inter",
              fontSize: "3rem",
              color: "white",
              textAlign: "center",
            }}
          >
            {CurrentWeatherData.name ?? DEFAULT_LOCATION.city}
          </h1>
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
