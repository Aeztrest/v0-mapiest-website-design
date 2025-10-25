"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface ApiPlan {
  id: number
  plan_name: string
  credit_count: number
  price: number
  price_id: string
  is_plan_active: boolean
}

export function PricingPackagesSection() {
  const router = useRouter()
  const [packages, setPackages] = useState([
    {
      name: "İşletme Paketi",
      description: "Küçük ve orta ölçekli işletmeler için hızlı başlangıç",
      credits: 3000,
      duration: "3 Aylık",
      price: "₺4,350",
      priceId: "", // Added price_id field
      color: "border-success/50",
      headerColor: "bg-success/10",
      popular: false,
      features: [
        "Temel raporlama, CSV/Excel dışa aktarım",
        "Aboneliğinizi istediğiniz zaman iptal edin",
        "3.000 kredi / 3 aylık abonelik (yenilenir)",
        "Hedef sektör & lokasyona göre toplu işletme listeleme",
        "Doğrulanmış e-posta, telefon ve web bilgileri",
        "Toplu WhatsApp ve e-posta gönderimi",
      ],
    },
    {
      name: "Ajans Paketi",
      description: "Ekipleriyle büyümek isteyen ajanslar için",
      credits: 6000,
      duration: "3 Aylık",
      price: "₺7,950",
      priceId: "", // Added price_id field
      color: "border-primary/50",
      headerColor: "bg-primary/10",
      popular: true,
      features: [
        "Gelişmiş filtreleme & hedefleme araçları",
        "7/24 teknik destek, çoklu cihaz uyumu",
        "Aboneliğinizi istediğiniz zaman iptal edin",
        "6.000 kredi / 3 aylık abonelik (yenilenir)",
        "Başlangıç paketindeki tüm özellikler +",
        "Sınırsız mesaj gönderimi (akıllı hız limiti)",
        "Yapay zekâ destekli mesaj düzenleyici",
      ],
    },
    {
      name: "Kurumsal Paket",
      description: "Büyük satış ekipleri için en kapsamlı çözüm",
      credits: 12000,
      duration: "3 Aylık",
      price: "₺14,600",
      priceId: "", // Added price_id field
      color: "border-[#EFEDFF]",
      headerColor: "bg-[#EFEDFF]",
      popular: false,
      features: [
        "Yasal veri toplama, KVKK/GDPR uyumlu yapı",
        "API ve entegrasyon erişimi",
        "Aboneliğinizi istediğiniz zaman iptal edin",
        "12.000 kredi / 3 aylık abonelik (yenilenir)",
        "Hızlandırılmış sistem, öncelikli işlem kuyruğu",
        "Profesyonel dashboard & ayrıntılı raporlama",
        "3 kullanıcı girişi, 7/24 özel destek hattı",
      ],
    },
  ])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/plans")
        if (!response.ok) throw new Error("Failed to fetch plans")

        const data = await response.json()
        if (data.plans && Array.isArray(data.plans)) {
          const planNameMap: { [key: string]: string } = {
            "Business Paket": "İşletme Paketi",
            "Agency Paket": "Ajans Paketi",
            "Enterprise Paket": "Kurumsal Paket",
          }

          setPackages((currentPackages) =>
            currentPackages.map((pkg) => {
              const apiPlan = data.plans.find((p: ApiPlan) => planNameMap[p.plan_name] === pkg.name && p.is_plan_active)
              if (apiPlan) {
                return {
                  ...pkg,
                  credits: apiPlan.credit_count,
                  price: `₺${apiPlan.price.toLocaleString("tr-TR")}`,
                  priceId: apiPlan.price_id, // Store price_id from API
                  features: pkg.features.map((feature) =>
                    feature.includes("kredi")
                      ? `${apiPlan.credit_count.toLocaleString()} kredi / 3 aylık abonelik (yenilenir)`
                      : feature,
                  ),
                }
              }
              return pkg
            }),
          )
        }
      } catch (error) {
        console.error("[v0] Error fetching plans:", error)
      }
    }

    fetchPlans()
  }, [])

  const handlePurchase = async (priceId: string) => {
    const token = localStorage.getItem("mapiest_token")

    if (!token) {
      router.push(`/panel/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    try {
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price_id: priceId, token }),
      })

      if (!response.ok) {
        throw new Error("Abonelik oluşturulamadı")
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("[v0] Purchase error:", error)
      alert("Satın alma işlemi başlatılamadı. Lütfen tekrar deneyin.")
    }
  }

  return (
    <section className="min-h-screen py-16 sm:py-20 lg:py-24 bg-muted/30 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
            Satışlarınıza <span className="text-primary">Güç Katacak</span> Paketi Seçin
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 text-pretty px-4">
            İhtiyaçlarınıza göre tasarlanmış 3 aylık paketler. Kredi bazlı esnek kullanım.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative ${pkg.color} ${
                pkg.popular ? "ring-2 ring-primary shadow-2xl md:scale-105 hover:md:scale-110" : "hover:scale-105"
              } hover:shadow-xl transition-all duration-500`}
            >
              {pkg.popular && (
                <>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold flex items-center space-x-1 shadow-lg">
                      <Star className="w-3 h-3 fill-current" />
                      <span>En Popüler</span>
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse pointer-events-none"></div>
                </>
              )}

              <CardHeader className={`${pkg.headerColor} rounded-t-lg`}>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{pkg.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-lg sm:text-xl font-bold text-foreground">{pkg.price}</span>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-primary font-semibold bg-primary/10 px-2 py-1 rounded">
                        {pkg.credits.toLocaleString()} Kredi / {pkg.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6">
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pkg.popular
                      ? "bg-foreground hover:bg-foreground/90 text-background shadow-lg hover:shadow-xl"
                      : "bg-foreground hover:bg-foreground/90 text-background"
                  } transition-all duration-300 hover:scale-105`}
                  size="lg"
                  onClick={() => handlePurchase(pkg.priceId)} // Added onClick handler
                  disabled={!pkg.priceId} // Disable if no price_id
                >
                  Hemen Başla
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12 lg:mt-16 px-4">
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
            İade işlemleri için iletişime geçin.
          </p>
        </div>
      </div>
    </section>
  )
}
