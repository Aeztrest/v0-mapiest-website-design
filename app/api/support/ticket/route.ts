import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Destek talebi başladı")

    const { subject, message, token } = await request.json()
    console.log("[v0] Request data:", { subject, message, hasToken: !!token })

    if (!subject || !message) {
      console.log("[v0] Başlık veya mesaj eksik")
      return NextResponse.json({ error: "Başlık ve mesaj gereklidir" }, { status: 400 })
    }

    if (!token) {
      console.log("[v0] Token bulunamadı")
      return NextResponse.json({ error: "Oturum bulunamadı" }, { status: 401 })
    }

    console.log("[v0] Kullanıcı bilgileri alınıyor:", `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`)
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("[v0] User response status:", userResponse.status)

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.log("[v0] Kullanıcı bilgileri alınamadı:", errorText)
      return NextResponse.json({ error: "Kullanıcı bilgileri alınamadı" }, { status: 401 })
    }

    const userData = await userResponse.json()
    console.log("[v0] User data:", userData)

    const userName = userData.name || "Bilinmeyen"
    const userSurname = userData.surname || "Kullanıcı"
    const userEmail = userData.email || "Bilinmeyen"

    const emailContent = `

║    YENİ DESTEK TALEBİ   ║


TALEP BİLGİLERİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Konu: ${subject}

Gönderen Bilgileri:
  • Ad Soyad: ${userName} ${userSurname}
  • E-posta: ${userEmail}
  • Tarih: ${new Date().toLocaleString("tr-TR")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESAJ İÇERİĞİ:

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bu mail Mapiest Destek Sistemi tarafından otomatik olarak 
gönderilmiştir. Lütfen kullanıcıya ${userEmail} adresinden 
geri dönüş yapınız.

© ${new Date().getFullYear()} Mapiest. Tüm hakları saklıdır.
    `.trim()

    const mailPayload = {
      mail_title: `[Destek Talebi] ${subject}`,
      message: emailContent,
      email_address: ["destek@mapiest.com"],
    }

    console.log("[v0] Mail gönderiliyor:", `${process.env.NEXT_PUBLIC_BACKEND_URL}/mail/send_multi_smtp_email`)
    console.log("[v0] Mail payload:", mailPayload)

    const mailResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mail/send_multi_smtp_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
      body: JSON.stringify(mailPayload),
    })

    console.log("[v0] Mail response status:", mailResponse.status)

    if (!mailResponse.ok) {
      const errorData = await mailResponse.text()
      console.log("[v0] Mail gönderme hatası:", errorData)
      return NextResponse.json({ error: "Mail gönderilemedi", details: errorData }, { status: 500 })
    }

    const mailResult = await mailResponse.json()
    console.log("[v0] Mail başarıyla gönderildi:", mailResult)

    return NextResponse.json({ success: true, message: "Destek talebiniz başarıyla gönderildi" })
  } catch (error) {
    console.error("[v0] Destek talebi hatası:", error)
    return NextResponse.json(
      {
        error: "Bir hata oluştu",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
