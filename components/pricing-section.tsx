"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

export function PricingSection() {
  const router = useRouter()
  const [plans, setPlans] = useState([
    {
      name: "İşletme Paketi",
      description: "Küçük ve orta ölçekli işletmeler için hızlı başlangıç",
      credits: 3000,
      duration: "3 Aylık",
      price: "₺4,350",
      priceId: "", // Added price_id field
      color: "border-success/50",
      headerColor: "bg-success/10",
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

          setPlans((currentPlans) =>
            currentPlans.map((plan) => {
              const apiPlan = data.plans.find(
                (p: ApiPlan) => planNameMap[p.plan_name] === plan.name && p.is_plan_active,
              )
              if (apiPlan) {
                return {
                  ...plan,
                  credits: apiPlan.credit_count,
                  price: `₺${apiPlan.price.toLocaleString("tr-TR")}`,
                  priceId: apiPlan.price_id, // Store price_id from API
                  features: plan.features.map((feature) =>
                    feature.includes("kredi")
                      ? `${apiPlan.credit_count.toLocaleString()} kredi / 3 aylık abonelik (yenilenir)`
                      : feature,
                  ),
                }
              }
              return plan
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
    // Check if user is logged in
    const token = localStorage.getItem("mapiest_token")

    if (!token) {
      // Redirect to login with return URL
      router.push(`/panel/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    try {
      // Create subscription session
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

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("[v0] Purchase error:", error)
      alert("Satın alma işlemi başlatılamadı. Lütfen tekrar deneyin.")
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            Satışlarınıza <span className="text-primary">Güç Katacak</span> Paketi Seçin
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 text-pretty px-4">
            İhtiyaçlarınıza göre tasarlanmış 3 aylık paketler. Kredi bazlı esnek kullanım.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.color} ${
                plan.popular ? "ring-2 ring-primary shadow-2xl md:scale-105 hover:md:scale-110" : "hover:scale-105"
              } hover:shadow-xl transition-all duration-500`}
            >
              {plan.popular && (
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

              <CardHeader className={`${plan.headerColor} rounded-t-lg`}>
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{plan.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      <span className="text-lg sm:text-xl font-bold text-foreground">{plan.price}</span>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-primary font-semibold bg-primary/10 px-2 py-1 rounded">
                        {plan.credits.toLocaleString()} Kredi / {plan.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6">
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-foreground hover:bg-foreground/90 text-background shadow-lg hover:shadow-xl"
                      : "bg-foreground hover:bg-foreground/90 text-background"
                  } transition-all duration-300 hover:scale-105`}
                  size="lg"
                  onClick={() => handlePurchase(plan.priceId)} // Added onClick handler
                  disabled={!plan.priceId} // Disable if no price_id
                >
                  Hemen Başla
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 lg:mt-12 px-4">
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
            İade işlemleri için iletişime geçin.
          </p>
        </div>
      </div>
    </section>
  )
}
