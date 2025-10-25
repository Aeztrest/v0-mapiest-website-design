"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check, X, Zap, Shield, Clock, Users, Info } from "lucide-react"

export function AdvantagesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const parallaxRef = useRef<HTMLDivElement | null>(null)

  // Smooth parallax (lerp)
  useEffect(() => {
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (prefersReduced) return

    const SMOOTHING = 0.12 // 0.08–0.2 arası deneyebilirsin (daha büyük = daha hızlı)
    const MAX_OFFSET_DESKTOP = 40 // px
    const MAX_OFFSET_MOBILE = 24 // px

    let current = 0
    let target = 0
    let rafId = 0

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

    const computeTarget = () => {
      if (!sectionRef.current) return
      const el = sectionRef.current
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight

      const absTop = rect.top + window.scrollY
      const start = absTop
      const end = absTop + el.offsetHeight - vh
      const denom = Math.max(1, end - start)
      const prog = clamp((window.scrollY - start) / denom, 0, 1)

      const maxOffset = window.innerWidth < 768 ? MAX_OFFSET_MOBILE : MAX_OFFSET_DESKTOP

      target = prog * maxOffset
    }

    const animate = () => {
      // lerp
      current += (target - current) * SMOOTHING
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`
      }
      rafId = requestAnimationFrame(animate)
    }

    computeTarget()
    animate()

    const onScroll = () => computeTarget()
    const onResize = () => computeTarget()

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const advantages = [
    {
      icon: Zap,
      title: "Hızlı ve Toplu İşlem",
      description: "Yeni iş fırsatları sunan işletmeleri saniyeler içinde toplu olarak listeleyin",
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: Shield,
      title: "Doğrulanmış Veriler",
      description: "Karar vericilerin iletişim bilgilerini tek tıkla, topluca edinin",
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      icon: Clock,
      title: "Otomatik Listeleme",
      description: "Tek platformda binlerce potansiyel müşteriyi otomatik olarak listeleyin",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      title: "Hedefli Arama",
      description: "İş yapabileceğiniz firmaları ve yöneticileri tek seferde listeleyin",
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
  ]

  const comparison = [
    {
      feature: "Otomatik Veri Toplama",
      mapiest: true,
      competitors: true,
      tooltip: "Google Maps ve web sitelerinden işletme verilerini otomatik olarak toplar.",
    },
    {
      feature: "AI Destekli Mesajlaşma",
      mapiest: true,
      competitors: false,
      tooltip: "Toplu WhatsApp ve e-posta tekliflerinizi kişiselleştirip otomatikleştirir.",
    },
    { feature: "Gerçek Zamanlı Güncellemeler",
      mapiest: true, 
      competitors: true, 
      tooltip: "İşletme bilgileri ve iletişim detayları düzenli olarak yenilenir.",
    },
    {
      feature: "Toplu İşlem Desteği",
      mapiest: true,
      competitors: false,
      tooltip: "Binlerce işletmeyi tek seferde listeleyin ve dışa aktarın.",
    },
    { feature: "KVKK Uyumluluğu", mapiest: true, competitors: false, tooltip: "Tüm veri süreçleri KVKK ve GDPR standartlarına uygun şekilde çalışır." },
    { feature: "Mobil Uygulama", mapiest: true, competitors: false, tooltip: "Tüm özelliklere mobil cihazınızdan da erişin." },
    {
      feature: "Çifte Doğrulama",
      mapiest: true,
      competitors: false,
      tooltip: "Sadece Google verileriyle yetinmez; web sitelerindeki iletişim bilgilerini de kontrol eder ve doğrular.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-background relative overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-24 self-start">
            <div ref={parallaxRef} className="will-change-transform transform-gpu">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 text-balance">
                <span className="text-primary">Mapiest</span> Avantajları
              </h2>

              <div className="space-y-4 sm:space-y-6">
                {advantages.map((a, i) => (
                  <div key={i} className="flex items-start space-x-3 sm:space-x-4 group">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 ${a.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <a.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${a.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-base sm:text-lg mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                        {a.title}
                      </h4>
                      <p className="text-sm sm:text-base text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:shadow-xl transition-shadow duration-500">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center">
                  Rakip Karşılaştırması
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pb-3 sm:pb-4 border-b border-border">
                    <div className="font-semibold text-xs sm:text-sm text-muted-foreground">Özellik</div>
                    <div className="font-semibold text-xs sm:text-sm text-primary text-center bg-primary/10 rounded px-1 sm:px-2 py-1">
                      Mapiest
                    </div>
                    <div className="font-semibold text-xs sm:text-sm text-muted-foreground text-center bg-muted/50 rounded px-1 sm:px-2 py-1">
                      Rakipler
                    </div>
                  </div>

                  {comparison.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-2 sm:gap-4 items-center py-2 hover:bg-muted/20 rounded transition-colors"
                    >
                      <div className="text-xs sm:text-sm text-foreground flex items-center gap-1 sm:gap-2">
                        <span className="break-words leading-tight">{item.feature}</span>
                        <div className="group relative flex-shrink-0">
                          <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 hidden sm:block pointer-events-none">
                            {item.tooltip}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        {item.mapiest ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                        ) : (
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                        )}
                      </div>
                      <div className="flex justify-center">
                        {item.competitors ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                        ) : (
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
