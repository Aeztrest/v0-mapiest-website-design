import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mail_title, message, email_address, token } = body

    if (!token) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 401 })
    }

    if (!mail_title || !message || !email_address || email_address.length === 0) {
      return NextResponse.json({ error: "Gerekli alanlar eksik" }, { status: 400 })
    }

    // Backend API'ye istek at
    const response = await fetch("http://72.60.212.48:8001/mail/send_multi_smtp_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({
        mail_title,
        message,
        email_address,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ error: "Mail gönderilemedi", details: errorData }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Mail gönderme hatası:", error)
    return NextResponse.json({ error: "Mail gönderilemedi" }, { status: 500 })
  }
}
