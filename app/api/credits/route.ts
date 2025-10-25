import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("http://72.60.212.48:8001/credits/get-credit-infos", {
      headers: {
        accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Credits API error:", error)
    return NextResponse.json({ error: "Kredi bilgileri alınamadı" }, { status: 500 })
  }
}
