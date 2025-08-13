import { memoryCache } from "@/utils/memoryCache"
import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

export default async function DELETE(request: NextRequest) {
  try {
    const clearedCount = memoryCache.clearAll()

    console.log(`Cleared ${clearedCount} cache entries`)

    return NextResponse.json({
      success: true,
      message: `Successfully cleared ${clearedCount} cache entries`,
      clearedCount: clearedCount
    })
  } catch (error) {
    console.error("Error clearing cache:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred" 
      },
      { status: 500 }
    )
  }
}

