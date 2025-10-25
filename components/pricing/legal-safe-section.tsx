import { Card, CardContent } from "@/components/ui/card"
import { Shield, Scale } from "lucide-react"

export function LegalSafeSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Rakiplerin Aksine, Yasal ve Güvenli</h2>
                <p className="text-muted-foreground mb-6">
                  Mapiest, Google Maps ve WhatsApp resmî API altyapılarını kullanarak işletme verilerini güvenli biçimde toplar ve işler.
                </p>
                <p className="text-muted-foreground mb-6">
                  Tüm süreçler KVKK kurallarına uygundur.
                </p>
                <p className="text-muted-foreground mb-6">
                  Verileriniz, Google ve Meta’nın onaylı API standartlarıyla korunur.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-success">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">KVKK & GDPR Uyumu</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <Scale className="w-5 h-5" />
                    <span className="text-sm font-medium">Google ve WhatsApp API Entegrasyonu</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-primary/10 rounded-2xl p-8 w-64 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Scale className="w-16 h-16 text-primary mx-auto mb-4" />
                    <div className="text-sm text-muted-foreground">Yasal & Güvenli</div>
                    <div className="text-xs text-muted-foreground mt-2">API Entegrasyonu</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
