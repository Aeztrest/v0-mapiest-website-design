import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Download, Send } from "lucide-react"

export function ThreeStepsSection() {
  const steps = [
    {
      number: 1,
      title: "Hedef kitlenizi belirleyin",
      description:
        "Sektörünüzü ve konumunuzu seçin. Mapiest, tam istediğiniz profildeki işletmeleri saniyeler içinde bulsun.",
      icon: MapPin,
      color: "text-primary",
    },
    {
      number: 2,
      title: "Verileri Saniyeler İçinde Çek",
      description:
        "Google Haritalar ve web verilerini analiz eden Mapiest, seçtiğiniz işletmelerin doğrulanmış iletişim bilgilerini anında listeler.",
      icon: Download,
      color: "text-accent",
    },
    {
      number: 3,
      title: "Toplu Mesaj Gönder",
      description:
        "AI destekli editörüyle ile toplu WhatsApp ve e-posta tekliflerinizi kişiselleştirin, binlerce işletmeye tekliflerinizi otomasyonlaştırın.",
      icon: Send,
      color: "text-success",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            <span className="text-primary">3 Adımda</span> Müşterine Ulaş
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Mapiest ile potansiyel müşterilerinize ulaşmak hiç bu kadar kolay olmamıştı. Sadece 3 basit adımda satış
            sürecinizi başlatın.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-xl transition-all duration-500 hover:-translate-y-3 border-2 hover:border-primary/20 bg-gradient-to-br from-card to-card/50"
            >
              <CardContent className="p-8 text-center">
                {/* Numara */}
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-transform duration-500 shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                </div>

                {/* İkon */}
                <div
                  className={`w-12 h-12 mx-auto mb-4 ${step.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="w-full h-full" />
                </div>

                {/* İçerik */}
                <h3 className="text-xl font-bold text-foreground mb-4 text-balance">{step.title}</h3>

                <p className="text-muted-foreground leading-relaxed text-pretty mb-4">{step.description}</p>
              </CardContent>

              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </Card>
          ))}
        </div>

        {/* Bağlantı Çizgileri */}
        <div className="hidden md:flex justify-center items-center mt-8 space-x-8">
          <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-primary/30"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-primary/30"></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse delay-500"></div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/30 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
