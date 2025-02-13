import { memoryCache } from "@/utils/memoryCache"
import { type NextRequest, NextResponse } from "next/server"

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyg3AjVIGsTbSPob91YFO5WiW4Fud5CyOhgxdv3FWTB3DpvZmtNX5586nFCVzTkyl-sAg/exec"
const CACHE_TTL = 60 // Cache for 1 minute

export const runtime = "edge"

export default async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const cacheKey = searchParams.toString()
    const forceRefresh = searchParams.get("forceRefresh") === "true"

    if (!forceRefresh) {
      const cachedData = memoryCache.get(cacheKey)
      if (cachedData) {
        return NextResponse.json(cachedData)
      }
    }

    const urlWithParams = `${SHEET_URL}?${searchParams.toString()}`
    console.log("Fetching from URL:", urlWithParams)

    const response = await fetch(urlWithParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Cache the new data
    memoryCache.set(cacheKey, data, CACHE_TTL)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching sheet data:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}

