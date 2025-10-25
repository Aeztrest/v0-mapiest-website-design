import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { price_id, token } = body

    if (!price_id || !token) {
      return NextResponse.json({ error: "price_id ve token gerekli" }, { status: 400 })
    }

    const response = await fetch("http://72.60.212.48:8001/pay/create-subscription-session", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price_id }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Subscription API error:", errorText)
      return NextResponse.json({ error: "Abonelik oluşturulamadı" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Subscription API error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
