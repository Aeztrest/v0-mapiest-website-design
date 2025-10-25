"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const visionMessages = [
  "Mapiest ile satışlarınızı artırın",
  "Potansiyel müşterilerinize ulaşın",
  "AI destekli mesajlaşma ile fark yaratın",
  "Kolay ve hızlı müşteri bulma",
  "Hedef sektörünüzdeki işletmelerin doğrulanmış iletişim bilgilerini toplu şekilde listeleyin",
  "İş yapabileceğiniz firmaları ve yöneticileri tek seferde listeleyin",
  "Sizinle iş yapma potansiyeli olan işletmeleri otomatik olarak listeleyin",
  "Satış hedefinizdeki firmaların iletişim bilgilerini binlerce kayıt halinde çıkarın",
  "Yeni iş fırsatları sunan işletmeleri saniyeler içinde toplu olarak listeleyin",
  "Karar vericilerin iletişim bilgilerini tek tıkla, topluca edinin",
  "Doğrulanmış e-posta, telefon ve sosyal profilleri toplu biçimde listeleyin",
  "Tek platformda binlerce potansiyel müşteriyi otomatik olarak listeleyin",
  "Haritadan veri değil, toplu satış fırsatlarını listeleyin",
  "Mapiest ile hedef kitlenizi tek seferde listeleyin, satışa dönüştürün",
]

export function VisionBand() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % visionMessages.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full py-2 bg-white overflow-hidden">
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="relative h-8 flex items-center justify-center">
            {visionMessages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out",
                  index === currentMessage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                )}
                aria-live="polite"
              >
                <p className="text-[#0152e2] text-base md:text-lg font-medium text-center px-4">
                  {message.split(" ").map((word, wordIndex) => {
                    const isHighlight =
                      word.includes("Mapiest") ||
                      word.includes("artırın") ||
                      word.includes("ulaşın") ||
                      word.includes("AI") ||
                      word.includes("fark") ||
                      word.includes("müşteri") ||
                      word.includes("işletmelerin") ||
                      word.includes("firmaları") ||
                      word.includes("karar") ||
                      word.includes("e-posta") ||
                      word.includes("potansiyel") ||
                      word.includes("kitlenizi")
                    return (
                      <span
                        key={wordIndex}
                        className={cn(
                          "transition-colors duration-300",
                          isHighlight ? "text-[#0152e2] font-semibold" : "text-[#0152e2]",
                        )}
                      >
                        {word}
                        {wordIndex < message.split(" ").length - 1 ? " " : ""}
                      </span>
                    )
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0152e2]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0152e2]/30 to-transparent" />
    </section>
  )
}
