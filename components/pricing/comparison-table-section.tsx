import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const features = [
  {
    title: "Otomatik Veri Toplama",
    description: "Google Maps ve web sitelerinden işletme verilerini otomatik olarak toplar.",
  },
  {
    title: "Çifte Doğrulama",
    description:
      "Sadece Google verileriyle yetinmez; web sitelerindeki iletişim bilgilerini de kontrol eder ve doğrular.",
  },
  {
    title: "Gerçek Zamanlı Güncellemeler",
    description: "İşletme bilgileri ve iletişim detayları düzenli olarak yenilenir.",
  },
  {
    title: "AI Destekli Mesajlaşma",
    description: "Toplu WhatsApp ve e-posta tekliflerinizi kişiselleştirip otomatikleştirir.",
  },
  {
    title: "Toplu İşlem Desteği",
    description: "Binlerce işletmeyi tek seferde listeleyin ve dışa aktarın.",
  },
  {
    title: "KVKK Uyumlu Altyapı",
    description: "Tüm veri süreçleri KVKK ve GDPR standartlarına uygun şekilde çalışır.",
  },
  {
    title: "Mobil Uygulama Desteği",
    description: "Tüm özelliklere mobil cihazınızdan da erişin.",
  },
]

export function ComparisonTableSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Mapiest ile Farkı Hemen Görün</h2>
        </div>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div></div>
              <CardTitle className="text-primary">Mapiest</CardTitle>
              <CardTitle className="text-muted-foreground">Rakipler</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-4 items-center py-3 border-b border-border/50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{feature.title}</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">{feature.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex justify-center">
                      <Check className="w-5 h-5 text-success" />
                    </div>
                    <div className="flex justify-center">
                      <X className="w-5 h-5 text-destructive" />
                    </div>
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
