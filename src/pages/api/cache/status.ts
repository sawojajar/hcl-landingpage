import { memoryCache } from "@/utils/memoryCache"
import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export default async function GET(request: NextRequest) {
  try {
    const cacheSize = memoryCache.getSize()

    return NextResponse.json({
      success: true,
      cacheSize: cacheSize,
      message: `Cache currently contains ${cacheSize} entries`
    })
  } catch (error) {
    console.error("Error getting cache status:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred" 
      },
      { status: 500 }
    )
  }
}
