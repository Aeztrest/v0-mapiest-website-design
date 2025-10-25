import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    console.log("[v0] Forgot password API isteği alındı:", { email })

    const response = await fetch("http://72.60.212.48:8001/auth/forgot-password", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })

    console.log("[v0] Backend API yanıtı alındı, status:", response.status)

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[v0] Forgot password API hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası. Lütfen tekrar deneyin." }, { status: 500 })
  }
}
