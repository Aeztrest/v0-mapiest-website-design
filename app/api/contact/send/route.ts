import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message, token } = body

    console.log("[v0] Contact form submission:", { name, email })

    // Get user info if token is provided
    let userInfo = null
    if (token) {
      try {
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (userResponse.ok) {
          userInfo = await userResponse.json()
        }
      } catch (error) {
        console.log("[v0] Could not fetch user info:", error)
      }
    }

    // Prepare email content
    const emailContent = `
YENİ İLETİŞİM FORMU MESAJI

Gönderen Bilgileri:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İsim: ${name}
E-posta: ${email}
${userInfo ? `Kullanıcı ID: ${userInfo.id}\nKayıtlı E-posta: ${userInfo.email}` : ""}

Mesaj:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bu mesaj Mapiest hakkımızda sayfasındaki iletişim formundan gönderilmiştir.
Tarih: ${new Date().toLocaleString("tr-TR")}
    `.trim()

    // Send email using the mail API
    const mailResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/mail/send_multi_smtp_email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        mail_title: `[Mapiest İletişim] ${name} - ${email}`,
        message: emailContent,
        email_address: ["ezgincapkan64@gmail.com"],
      }),
    })

    if (!mailResponse.ok) {
      const errorText = await mailResponse.text()
      console.error("[v0] Mail API error:", errorText)
      throw new Error("Mail gönderilemedi")
    }

    const mailResult = await mailResponse.json()
    console.log("[v0] Mail sent successfully:", mailResult)

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla gönderildi",
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      },
      { status: 500 },
    )
  }
}
