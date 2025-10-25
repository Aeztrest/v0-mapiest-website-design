import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const appUserId = searchParams.get("app_user_id")

    if (!appUserId) {
      return NextResponse.json({ error: "app_user_id parametresi gerekli" }, { status: 400 })
    }

    const backendUrl = `https://mehmetback.mapiest.com/auth/facebook/login?app_user_id=${appUserId}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authHeader,
      },
      redirect: "manual",
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId))

    // Redirect URL'i al
    const redirectUrl = response.headers.get("location")

    if (!redirectUrl) {
      return NextResponse.json({ error: "Redirect URL alınamadı" }, { status: 500 })
    }

    // Redirect URL'i döndür
    return NextResponse.json({ url: redirectUrl })
  } catch (error) {
    console.error("[v0] Facebook login error:", error)
    return NextResponse.json({ error: "Facebook bağlantısı başlatılamadı" }, { status: 500 })
  }
}
