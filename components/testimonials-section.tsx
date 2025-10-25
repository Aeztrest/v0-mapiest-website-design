"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "Pazarlama Müdürü",
      company: "TechStart A.Ş.",
      package: "İşletme Paketi",
      rating: 5,
      comment:
        "Mapiest sayesinde satış hedeflerimizi %150 aştık. AI destekli mesajlaşma özelliği gerçekten çok etkili. Müşteri bulma sürecimiz artık çok daha hızlı ve verimli.",
      avatar: "/customer-1.jpg",
      sector: "E-ticaret",
      performance: "+150%",
    },
    {
      name: "Elif Kaya",
      role: "Kurucu Ortak",
      company: "Digital Solutions",
      package: "Ajans Paketi",
      rating: 5,
      comment:
        "Platform kullanımı çok kolay ve sonuçlar hemen görülüyor. Özellikle Google Maps entegrasyonu mükemmel çalışıyor. Ekibimizin verimliliği %200 arttı.",
      avatar: "/customer-2.jpg",
      sector: "Ajans",
      performance: "+200%",
    },
    {
      name: "Mehmet Özkan",
      role: "Satış Direktörü",
      company: "Growth Marketing",
      package: "İşletme Paketi",
      rating: 5,
      comment:
        "Küçük bütçeli bir ajans olarak Mapiest ile büyük işler başardık. Müşteri portföyümüz 3 ayda ikiye katlandı. Kesinlikle tavsiye ediyorum.",
      avatar: "/customer-4.jpg",
      sector: "Danışmanlık",
      performance: "+100%",
    },
    {
      name: "Zeynep Demir",
      role: "E-ticaret Uzmanı",
      company: "Online Retail Co.",
      package: "Kurumsal Paket",
      rating: 5,
      comment:
        "Mapiest ile hedef müşterilerimizi çok daha kolay buluyoruz. Veri kalitesi mükemmel ve destek ekibi her zaman yardımcı oluyor. Harika bir platform!",
      avatar: "/customer-6.jpg",
      sector: "E-ticaret",
      performance: "+180%",
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-warning fill-warning" : "text-muted-foreground"}`} />
    ))
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            <span className="text-primary">Müşterilerimiz</span> Ne Diyor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Yüzlerce memnun müşterimizden bazılarının Mapiest deneyimleri
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-card shadow-2xl border-2 border-primary/10 hover:border-primary/20 transition-all duration-500">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full border-4 border-primary/20 hover:border-primary/40 transition-colors"
                  />
                </div>

                {/* İçerik */}
                <div className="flex-1 text-center md:text-left">
                  {/* Yıldızlar */}
                  <div className="flex justify-center md:justify-start space-x-1 mb-4">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>

                  {/* Yorum */}
                  <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 text-pretty">
                    "{testimonials[currentIndex].comment}"
                  </blockquote>

                  {/* Müşteri Bilgileri */}
                  <div className="space-y-2">
                    <div className="font-bold text-foreground text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-muted-foreground">
                      {testimonials[currentIndex].role} • {testimonials[currentIndex].company}
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-2">
                      <div className="inline-block bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                        {testimonials[currentIndex].package}
                      </div>
                      <div className="inline-flex items-center space-x-1 bg-success/10 text-success text-sm px-3 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        <span>{testimonials[currentIndex].performance}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Sektör: {testimonials[currentIndex].sector}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full p-0 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full p-0 bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex space-x-1 mb-3">{renderStars(testimonial.rating)}</div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">"{testimonial.comment}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-sm text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="inline-flex items-center space-x-1 bg-success/10 text-success text-xs px-2 py-1 rounded">
                      <TrendingUp className="w-2 h-2" />
                      <span>{testimonial.performance}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
