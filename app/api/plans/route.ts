import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 saniye timeout

    const response = await fetch("http://72.60.212.48:8001/plans/getplans", {
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId))

    if (!response.ok) {
      console.error("[v0] Plans API error: Backend returned", response.status)
      // Fallback data döndür
      return NextResponse.json(
        {
          plans: [],
          error: "Plans could not be loaded",
        },
        { status: 200 },
      )
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error("[v0] Plans API error: Invalid content-type:", contentType)
      return NextResponse.json(
        {
          plans: [],
          error: "Invalid response format",
        },
        { status: 200 },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Plans API error:", error)
    return NextResponse.json(
      {
        plans: [],
        error: "Failed to fetch plans",
      },
      { status: 200 },
    )
  }
}
