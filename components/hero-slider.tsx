"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeroSlide {
  id: number
  backgroundImage: string
  title: string
  highlightText: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  buttonVariant: "primary" | "outline"
  theme: "space" | "business"
}

const slides: HeroSlide[] = [
  {
    id: 1,
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web%204.png-tB2tqZaX2t7yrGs7nfGfqXwKQjvLXl.jpeg",
    title: "Dünyanın her yerinden",
    highlightText: "Sayısız Müşteri!",
    subtitle: "www.mapiest.com",
    description: "Google Maps verilerini kullanarak potansiyel müşterilerinizi bulun",
    buttonText: "Ücretsiz Deneyin",
    buttonLink: "/pricing",
    buttonVariant: "primary",
    theme: "space",
  },
  {
    id: 2,
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web%205.png-arJAet10TYTqC1aRWIy75GRE2mq19f.jpeg",
    title: "İşletmeleriniz için",
    highlightText: "dijital çözümler",
    subtitle: "yaratıyoruz.",
    description: "Google Maps ve yapay zekâ ile potansiyel müşterilere ulaşın ve satışlarınızı artırın.",
    buttonText: "Hizmetleri İncele",
    buttonLink: "/about",
    buttonVariant: "outline",
    theme: "business",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Otomatik geçiş
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // 10 saniye sonra otomatik geçişi tekrar başlat
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slider Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-[1px]" />

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4">
                {slide.theme === "space" ? (
                  // Slayt 1: Space Theme Layout
                  <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Logo - Sol üst */}
                    <div className="absolute top-8 left-8 z-30">
                      <img
                        src="/mapiest-logo.gif"
                        alt="Mapiest Logo"
                        className="h-16 w-auto hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Sol taraf - boş (laptop merkeze yerleştirilecek) */}
                    <div></div>

                    {/* Sağ taraf - İçerik */}
                    <div className="space-y-8 text-right animate-in slide-in-from-right-8 duration-1000">
                      <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
                          {slide.title}
                          <br />
                          <span className="text-accent animate-pulse">{slide.highlightText}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-medium">{slide.subtitle}</p>
                        <p className="text-lg text-white/80 max-w-md ml-auto">{slide.description}</p>
                      </div>

                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4 shadow-2xl hover:shadow-accent/25 hover:scale-105 transition-all duration-300"
                      >
                        {slide.buttonText}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Slayt 2: Business Theme Layout
                  <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Sol taraf - İçerik */}
                    <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000">
                      {/* Logo */}
                      <img
                        src="/mapiest-logo.gif"
                        alt="Mapiest Logo"
                        className="h-20 w-auto hover:scale-110 transition-transform duration-300 mb-8"
                      />

                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white text-balance">
                          {slide.title}
                          <br />
                          <span className="text-accent">{slide.highlightText}</span>
                          <br />
                          <span className="text-white">{slide.subtitle}</span>
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed max-w-lg">{slide.description}</p>
                      </div>

                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 bg-transparent shadow-2xl hover:shadow-white/25 hover:scale-105 transition-all duration-300"
                      >
                        {slide.buttonText}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>

                    {/* Sağ taraf - boş (iş insanı görseli arka planda) */}
                    <div></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
        aria-label="Önceki slayt"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:text-accent transition-colors" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
        aria-label="Sonraki slayt"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:text-accent transition-colors" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300 hover:scale-125",
              index === currentSlide ? "bg-accent shadow-lg shadow-accent/50" : "bg-white/30 hover:bg-white/50",
            )}
            aria-label={`Slayt ${index + 1}'e git`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-accent transition-all duration-300 ease-linear"
            style={{
              width: isAutoPlaying ? "100%" : "0%",
              transitionDuration: isAutoPlaying ? "5000ms" : "300ms",
            }}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
