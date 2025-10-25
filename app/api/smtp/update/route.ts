import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { smtp_server, smtp_port, smtp_email, smtp_password, display_name, token } = body

    if (!token) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 401 })
    }

    if (!smtp_server || !smtp_port || !smtp_email || !smtp_password || !display_name) {
      return NextResponse.json({ error: "Tüm alanlar gereklidir" }, { status: 400 })
    }

    const response = await fetch("http://72.60.212.48:8001/smtp/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify({
        smtp_server,
        smtp_port,
        smtp_email,
        smtp_password,
        display_name,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "SMTP ayarları kaydedilemedi" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("SMTP update error:", error)
    return NextResponse.json({ error: "SMTP ayarları güncellenirken bir hata oluştu" }, { status: 500 })
  }
}
