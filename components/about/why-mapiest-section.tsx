import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Globe, CreditCard } from "lucide-react"

export function WhyMapiestSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Otomatik & Akıllı Mesajlar",
      description:
        "Yapay zekâ destekli mesaj editörüyle WhatsApp, Gmail veya şirket e-postası üzerinden kişiselleştirilmiş toplu mesajlar gönderin. Meta tarafından onaylı resmî WhatsApp API altyapısı ile %100 yasal ve güvenli iletişim sağlayın.",
      color: "text-primary",
      bgColor: "bg-primary/10",
      hoverBgColor: "group-hover:bg-primary/20",
    },
    {
      icon: Globe,
      title: "Web Tabanlı ve Her Yerde Erişilebilir",
      description:
        "Kurulum gerektirmez. Tüm cihazlarda — mobil, tablet, macOS veya Windows — aynı arayüzle çalışır. Sadece tarayıcı açarak kampanyalarınızı yönetin.",
      color: "text-success",
      bgColor: "bg-success/10",
      hoverBgColor: "group-hover:bg-success/20",
    },
    {
      icon: CreditCard,
      title: "Uygun Fiyat, Esnek Kredi Sistemi",
      description:
        "Sabit ücretlere mahkûm olmayın. İhtiyacınıza göre kredi bazlı sistemle kullanın, dilediğiniz zaman yükseltin veya iptal edin. Yüksek verim, minimum maliyet.",
      color: "text-accent",
      bgColor: "bg-accent/10",
      hoverBgColor: "group-hover:bg-accent/20",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Neden Mapiest?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Mapiest'i tercih etmeniz için üç güçlü neden
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-20 h-20 ${feature.bgColor} ${feature.hoverBgColor} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}
                  >
                    <Icon className={`w-10 h-10 ${feature.color}`} />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-4 text-center">{feature.title}</h3>

                  <p className="text-muted-foreground text-pretty leading-relaxed text-center">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
