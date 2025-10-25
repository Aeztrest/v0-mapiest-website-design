import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { yer, sektor, adet, token } = body

    console.log("[v0] Veri çekme isteği:", { yer, sektor, adet })

    if (!token) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 401 })
    }

    const response = await fetch("http://72.60.212.48:8001/vericekme/cek", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yer,
        sektor,
        adet,
      }),
    })

    const responseText = await response.text()
    console.log("[v0] Backend response status:", response.status)
    console.log("[v0] Backend response text:", responseText)

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend error: ${response.status}`, details: responseText },
        { status: response.status },
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("[v0] JSON parse error:", e)
      return NextResponse.json({ error: "Backend returned invalid JSON", details: responseText }, { status: 500 })
    }

    console.log("[v0] Veri çekme başarılı, sonuç sayısı:", data?.results?.length || 0)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error("[v0] Veri çekme hatası:", error)
    return NextResponse.json({ error: "Veri çekme başarısız", details: error.message }, { status: 500 })
  }
}
