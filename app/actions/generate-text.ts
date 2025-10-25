"use server"

import OpenAI from "openai"

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    "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",
})

export async function generateAIText(userText: string) {
  try {
    console.log("[v0] AI text generation started")
    console.log("[v0] User text length:", userText.length)

    const systemPrompt = `Sen bir KVKK ve İYS uyumlu WhatsApp mesaj düzenleyicisisin. Kullanıcının verdiği mesajı aşağıdaki kurallara göre yeniden yaz:

KURALLAR:
1. Mesaj toplu gönderim izlenimi vermemeli
2. Açılış kısa, nazik ve kişisel olmalı
3. Satış dili ve agresif pazarlama kullanılmamalı
4. YASAK İFADELER: kampanya, indirim, fırsat, % işareti, sınırlı süre, toplu gönderim, otomatik mesaj, acele edin, kaçırmayın, son şans, hemen, bugün, yarın
5. Mesaj sade, destekleyici ve güven verici bir tonda yazılmalı
6. Mesaj mutlaka yumuşak bir soru ile bitmeli
7. Mesajın sonunda KVKK/İYS uyumu için nazik bir opt-out cümlesi yer almalı (örn: "Bu tür mesajları almak istemiyorsanız lütfen bize bildirin.")
8. Uzunluk 220–380 karakter arasında olmalı
9. Emoji, CAPS LOCK, aşırı ünlem gibi unsurlar kullanılmamalı
10. Doğal, samimi ve kişisel bir dil kullanılmalı

Sadece düzenlenmiş mesajı döndür, başka açıklama ekleme.`

    console.log("[v0] Calling OpenAI API...")

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userText },
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    console.log("[v0] OpenAI API response received")

    const generatedText = completion.choices[0]?.message?.content

    if (!generatedText) {
      console.error("[v0] No text generated from AI")
      throw new Error("AI yanıt üretemedi")
    }

    console.log("[v0] Generated text length:", generatedText.length)

    return { success: true, text: generatedText }
  } catch (error) {
    console.error("[v0] AI text generation error:", error)
    if (error instanceof Error) {
      console.error("[v0] Error message:", error.message)
      console.error("[v0] Error stack:", error.stack)
    }
    return {
      success: false,
      error: "Mesaj oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
    }
  }
}
