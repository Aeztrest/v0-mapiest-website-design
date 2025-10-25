"use client"

import { MessageCircle, Users, Send, BarChart3, CheckCircle } from "lucide-react"

export function WhatsAppMessagingSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* SOL: Metin ve Adımlar */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Otomasyonu
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              <span className="text-primary">Binlerce müşteriye</span> WhatsApp ile anında ulaşın
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Mapiest ile bulduğunuz potansiyel müşterilere WhatsApp üzerinden toplu mesaj gönderin. Kişiselleştirilmiş
              mesajlarınızla dönüşüm oranınızı artırın.
            </p>

            {/* Adımlar */}
            <div className="space-y-5 mt-8">
              {[
                {
                  icon: Users,
                  title: "1. Hedef Kitleyi Belirleyin",
                  desc: "Mapiest ile bulduğunuz işletmeleri seçin veya kendi listenizi yükleyin",
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
                {
                  icon: MessageCircle,
                  title: "2. Mesajınızı Hazırlayın",
                  desc: "Kişiselleştirilmiş şablonlar oluşturun ve değişkenler ekleyin",
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
                {
                  icon: Send,
                  title: "3. Toplu Gönderim Yapın",
                  desc: "Tek tıkla binlerce kişiye aynı anda mesaj gönderin",
                  color: "text-green-500",
                  bg: "bg-green-500/10",
                },
                {
                  icon: BarChart3,
                  title: "4. Sonuçları Takip Edin",
                  desc: "Gönderim durumlarını ve yanıt oranlarını gerçek zamanlı izleyin",
                  color: "text-orange-500",
                  bg: "bg-orange-500/10",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div
                    className={`w-12 h-12 ${step.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-success opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg mt-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Yüksek Dönüşüm Oranı</p>
                <p className="text-xs text-muted-foreground">
                  WhatsApp mesajları %70'e varan açılma oranıyla en etkili iletişim kanalıdır
                </p>
              </div>
            </div>
          </div>

          {/* SAĞ: Video */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-xl p-6 border hover:shadow-2xl transition-shadow duration-500">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-success" />
                <span className="font-semibold text-card-foreground">WhatsApp Mesaj Gönderimi</span>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Canlı Demo</span>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-muted aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-DA6ULQxPmvoyVYFv2I2ohRUBrM0tGa.mp4"
                >
                  Tarayıcınız video etiketini desteklemiyor.
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <Send className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-muted-foreground">Otomatik Gönderim</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Anlık Raporlama</span>
                </div>
              </div>
            </div>

            {/* Floating Icon */}
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-success rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-6 h-6 text-success-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
