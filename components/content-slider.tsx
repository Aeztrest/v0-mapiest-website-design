"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Slide = {
  id: number
  backgroundImage: string
  title: string
  description: string
}

const slides: Slide[] = [
  {
    id: 1,
    backgroundImage: "/images/hero-space-bg.jpeg",
    title: "Toplu Veri Çekme",
    description: "Satış hedefinizdeki firmaların iletişim bilgilerini binlerce kayıt halinde çıkarın",
  },
  {
    id: 2,
    backgroundImage: "/images/hero-business-bg.jpeg",
    title: "Otomatik Listeleme",
    description: "Sizinle iş yapma potansiyeli olan işletmeleri otomatik olarak listeleyin",
  },
  {
    id: 3,
    backgroundImage: "/images/hero-minimal-bg.jpeg",
    title: "Doğrulanmış Bilgiler",
    description: "Doğrulanmış e-posta, telefon ve sosyal profilleri toplu biçimde listeleyin",
  },
]

export function ContentSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const id = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [isAutoPlaying])

  const goToSlide = (i: number) => {
    setCurrentSlide(i)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length)

  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
            aria-hidden={index !== currentSlide}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4 sm:px-6">
              <div className="container mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 text-balance">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto text-pretty px-4">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Önceki slayt"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Sonraki slayt"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 sm:space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={cn(
              "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125",
              i === currentSlide ? "bg-white shadow-lg shadow-white/40" : "bg-white/40 hover:bg-white/60",
            )}
            aria-label={`Slayt ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
