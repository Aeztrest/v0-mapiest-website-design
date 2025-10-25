import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 401 })
    }

    const token = authHeader.replace("Bearer ", "")

    console.log("[v0] Demo request API isteği gönderiliyor...")

    const response = await fetch("http://72.60.212.48:8001/demo/request", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("[v0] Backend API yanıtı alındı, status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Demo request hatası:", errorData)
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] Demo request başarılı:", data)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("[v0] Demo request API hatası:", error)
    return NextResponse.json({ error: "Sunucu hatası. Lütfen tekrar deneyin." }, { status: 500 })
  }
}
