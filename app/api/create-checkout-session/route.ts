import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token gerekli" }, { status: 401 })
    }

    const body = await request.json()
    const { price_id, quantity = 1 } = body

    if (!price_id) {
      return NextResponse.json({ error: "price_id gerekli" }, { status: 400 })
    }

    const response = await fetch("http://72.60.212.48:8001/pay/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        price_id,
        quantity,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Checkout session oluşturulamadı:", errorText)
      return NextResponse.json({ error: "Checkout session oluşturulamadı" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Checkout session hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
