import { Button } from "@/components/ui/button"
import { MessageSquare, Send, Mail, Building2 } from "lucide-react"

export function PersonalizedMessagingSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Kişiselleştirilmiş Mesajları Toplu Gönderin</h2>
            <p className="text-muted-foreground mb-4">
              Mapiest, Türkiye'de ilk WhatsApp API iş ortağı olarak resmi Meta altyapısını kullanır.
            </p>
            <p className="text-muted-foreground mb-6">
              Binlerce potansiyel müşteriye tek panelden otomatik, kişiselleştirilmiş teklifler gönderin.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium">WhatsApp API</div>
                  <div className="text-sm text-muted-foreground">
                    Resmî Meta altyapısı ile güvenli ve hızlı toplu mesaj gönderimi
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium">Gmail Entegrasyonu</div>
                  <div className="text-sm text-muted-foreground">Google hesabınızla kolay e-posta kampanyaları</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <div className="font-medium">Şirket Maili Desteği</div>
                  <div className="text-sm text-muted-foreground">
                    Kurumsal e-posta adreslerinizle profesyonel iletişim
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                <span>Yapay zekâ destekli mesaj editörü</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-success rounded-full" />
                <span>Otomatik gönderim ve performans raporlama</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 w-80 text-white">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="text-sm mb-2">Mesaj Editörü</div>
                <div className="bg-white/20 rounded-lg p-3 text-sm">
                  <div className="mb-2">Merhaba [İsim],</div>
                  <div className="mb-2">Restoranınız için özel bir teklifimiz var...</div>
                  <div className="text-xs text-white/70">AI tarafından optimize edildi</div>
                </div>
              </div>
              <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                <Send className="w-4 h-4 mr-2" />
                Gönder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
