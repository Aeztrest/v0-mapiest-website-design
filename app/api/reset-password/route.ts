import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, new_password } = body

    console.log("[v0] Reset password isteği:", { token: token?.substring(0, 20) + "..." })

    const response = await fetch("http://72.60.212.48:8001/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        token,
        new_password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.log("[v0] Reset password hatası:", data)
      return NextResponse.json({ error: data.detail || "Şifre sıfırlama başarısız oldu" }, { status: response.status })
    }

    console.log("[v0] Reset password başarılı")
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Reset password hatası:", error)
    return NextResponse.json({ error: "Şifre sıfırlama sırasında bir hata oluştu" }, { status: 500 })
  }
}
