import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const res = await fetch("http://72.60.212.48:8001/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // 🔧 alan adlarını endpoint ile birebir yap
        name: body.name,
        surname: body.surname,
        email: body.email,
        phone_no: body.phone_no,
        password: body.password,
      }),
    })

    // İçerik tipine göre güvenli okuma
    const ct = res.headers.get("content-type") || ""
    const payload = ct.includes("application/json") ? await res.json() : await res.text()

    if (!res.ok && res.status !== 201) {
      let msg = "İstek başarısız"
      if (typeof payload === "string") msg = payload
      else if (payload?.detail?.[0]?.msg) msg = payload.detail[0].msg
      return NextResponse.json({ error: msg }, { status: res.status || 400 })
    }

    return NextResponse.json(payload, { status: res.status || 201 })
  } catch (err: any) {
    console.error("[v0] API route hatası:", err)
    return NextResponse.json({ error: err?.message || "Sunucu hatası" }, { status: 500 })
  }
}
