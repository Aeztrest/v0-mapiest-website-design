"use client"

import type React from "react"

import { useEffect, useMemo, useState, useCallback } from "react"
import { Star, Award, Globe, Shield, Zap, ChevronLeft, ChevronRight } from "lucide-react"

type Partner = {
  name: string
  logo: string
  description: string
  badge: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export function PartnersSection() {
  const [current, setCurrent] = useState(0)

  const partners: Partner[] = useMemo(
    () => [
      {
        name: "Microsoft Partner",
        logo: "/5.png",
        description: "Cloud Solutions Partner",
        badge: "Gold Partner",
        icon: Award,
      },
      {
        name: "Google Partner",
        logo: "/GooglePartner.png",
        description: "Maps API Integration",
        badge: "Premier Partner",
        icon: Globe,
      },
      {
        name: "OpenAI",
        logo: "/OpenAI.png",
        description: "AI Technology Partner",
        badge: "Technology Partner",
        icon: Zap,
      },
      {
        name: "Meta",
        logo: "/Meta.png",
        description: "Business Solutions",
        badge: "Business Partner",
        icon: Star,
      },
      {
        name: "AWS",
        logo: "/AwsLogo.png",
        description: "Cloud Infrastructure",
        badge: "Advanced Partner",
        icon: Shield,
      },
    ],
    [],
  )

  // Auto slide (her 4s’de bir)
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % partners.length), 4000)
    return () => clearInterval(id)
  }, [partners.length])

  const mod = (n: number, m: number) => ((n % m) + m) % m
  const order = [-2, -1, 0, 1, 2]
  const visible = order.map((offset) => partners[mod(current + offset, partners.length)])

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % partners.length), [partners.length])
  const goPrev = useCallback(() => setCurrent((c) => mod(c - 1, partners.length)), [partners.length])

  const cardBase =
    "relative rounded-2xl p-6 border bg-white/60 backdrop-blur-sm will-change-transform " +
    "transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"

  const renderCard = (partner: Partner, pos: number, key: number) => {
    const isCenter = pos === 0
    const isNear = Math.abs(pos) === 1
    const isFar = Math.abs(pos) === 2

    const scale = isCenter ? "scale-100" : isNear ? "scale-[0.96]" : "scale-90"
    const opacity = isCenter ? "opacity-100" : isNear ? "opacity-85" : "opacity-40"
    const translate =
      pos === -2
        ? "-translate-x-4"
        : pos === -1
        ? "-translate-x-2"
        : pos === 1
        ? "translate-x-2"
        : pos === 2
        ? "translate-x-4"
        : "translate-x-0"

    const blur = isFar ? "blur-[1.5px]" : ""
    const gray = isCenter ? "" : "grayscale"
    const ring = isCenter ? "border-primary/40 shadow-xl" : "border-border/40"
    const Icon = partner.icon

    // --- LOGO SIZE: sadece logonun boyutunu değiştiriyoruz ---
    // Merkezdeki karta daha büyük logo, yakın kartlara orta boy, uzak kartlara küçük.
    const logoHeightClass = isCenter ? "h-24" : isNear ? "h-20" : "h-16"
    // Wrapper yüksekliğini logo ile uyumlu tutuyoruz (kart içi hizalama bozulmasın diye).
    const logoWrapperHeight = isCenter ? "h-28" : isNear ? "h-24" : "h-20"
    // --------------------------------------------------------

    return (
      <div key={key} className={`group ${cardBase} ${ring} ${scale} ${opacity} ${translate} ${blur}`}>
        {/* Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
              {partner.badge}
            </span>
          </div>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        </div>

        {/* Logo */}
        <div className={`flex items-center justify-center mb-4 ${logoWrapperHeight}`}>
          <img
            src={partner.logo || "/placeholder.svg"}
            alt={partner.name}
            loading="lazy"
            className={`${logoHeightClass} w-auto ${gray} transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]`}
          />
        </div>

        {/* Info */}
        <div className="text-center">
          <h4 className={`font-semibold text-sm mb-1 ${isCenter ? "text-primary" : "text-foreground"}`}>
            {partner.name}
          </h4>
          <p className={`text-xs ${isCenter ? "text-foreground" : "text-muted-foreground"}`}>{partner.description}</p>
        </div>

        {isCenter && (
          <div className="absolute inset-0 -z-10 rounded-2xl blur-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-60" />
        )}
      </div>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Güvenilir</span> İş Ortaklarımız
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dünya çapında tanınan teknoloji liderleri ile birlikte çalışarak size en iyi hizmeti sunuyoruz.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Arrows */}
          <button
            aria-label="previous"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full border bg-background/70 backdrop-blur px-2 py-2 hover:bg-background shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="next"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full border bg-background/70 backdrop-blur px-2 py-2 hover:bg-background shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="hidden lg:block">{renderCard(visible[0], -2, 0)}</div>
            <div className="hidden md:block">{renderCard(visible[1], -1, 1)}</div>
            <div>{renderCard(visible[2], 0, 2)}</div>
            <div className="hidden md:block">{renderCard(visible[3], 1, 3)}</div>
            <div className="hidden lg:block">{renderCard(visible[4], 2, 4)}</div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {partners.map((_, i) => (
              <button
                key={i}
                aria-label={`go to ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/5 rounded-full px-6 py-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Güvenilir Teknoloji Ortaklıkları</span>
          </div>
        </div>
      </div>
    </section>
  )
}
