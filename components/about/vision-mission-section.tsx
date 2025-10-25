import { Card, CardContent } from "@/components/ui/card"
import { Target, Lightbulb } from "lucide-react"

export function VisionMissionSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Vizyonumuz ve Misyonumuz</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Sadece veri değil, gerçek satış fırsatları üretmek
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Vizyonumuz</h3>
              </div>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed mb-4">
                Sadece veri değil, <strong>gerçek satış fırsatları</strong> üretmek.
              </p>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed mb-4">
                Her işletmenin, teknik bilgiye ihtiyaç duymadan potansiyel müşterilerine ulaşabildiği,
              </p>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                <strong>adil, erişilebilir ve veriye dayalı bir iş dünyası</strong> yaratmak.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center group-hover:bg-success/20 transition-colors">
                  <Lightbulb className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Misyonumuz</h3>
              </div>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed mb-4">
                İşletmelerin hedef kitlesini saniyeler içinde listeleyip, tek tıkla{" "}
                <strong>yasal ve güvenli bir şekilde</strong> iletişim kurabilmesini sağlamak.
              </p>
              <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                Zaman ve bütçeden tasarruf ettiren, yüksek dönüşüm odaklı{" "}
                <strong>yapay zekâ destekli müşteri edinme deneyimi</strong> sunmak.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <div className="relative max-w-full mx-auto">
            <img
              src="/mapiest-benefits-comparison.jpeg"
              alt="Mapiest Benefits - Rakip Karşılaştırması"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
