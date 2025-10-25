"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Mapiest nasıl çalışır?",
      answer:
        "Mapiest, Google Maps üzerindeki işletme verilerini otomatik olarak toplar. Siz sadece hedef sektör ve lokasyonu seçersiniz, platform saniyeler içinde binlerce potansiyel müşteri bilgisini size sunar. Ardından AI destekli mesajlaşma sistemi ile bu müşterilere toplu mesaj gönderebilirsiniz.",
    },
    {
      question: "Veri toplama işlemi yasal mı?",
      answer:
        "Evet, Mapiest tamamen yasal çerçevede çalışır. Sadece Google Maps üzerinde halka açık olan işletme bilgilerini toplarız. KVKK ve GDPR uyumlu olarak çalışıyoruz. Kişisel veriler değil, sadece işletme iletişim bilgileri toplanır.",
    },
    {
      question: "Hangi sektörlerden veri toplayabiliyorum?",
      answer:
        "Mapiest ile restoran, kafe, kuaför, berber, oto servis, emlak, sağlık, eğitim, perakende ve daha birçok sektörden veri toplayabilirsiniz. Platform sürekli güncellenen 500+ sektör kategorisi sunar.",
    },
    {
      question: "AI mesajlaşma özelliği nasıl çalışır?",
      answer:
        "AI mesajlaşma sistemi, hedef kitlenize uygun kişiselleştirilmiş mesajlar oluşturur. Sektör, lokasyon ve işletme büyüklüğü gibi faktörleri dikkate alarak en etkili mesaj içeriğini önerir. Siz de bu mesajları düzenleyebilir ve kendi tarzınızı katabilirsiniz.",
    },
    {
      question: "Ücretsiz deneme süresi var mı?",
      answer:
        "Evet, tüm paketlerimizde 14 gün ücretsiz deneme hakkı bulunur. Kredi kartı bilgisi gerekmez ve istediğiniz zaman iptal edebilirsiniz. Deneme süresinde tüm özellikleri sınırlı kullanım hakkı ile test edebilirsiniz.",
    },
    {
      question: "Veriler ne kadar güncel?",
      answer:
        "Mapiest veritabanı günlük olarak güncellenir. Google Maps üzerindeki değişiklikler 24-48 saat içinde sistemimize yansır. Bu sayede her zaman en güncel işletme bilgilerine erişim sağlarsınız.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            <span className="text-primary">Sık Sorulan</span> Sorular
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Mapiest hakkında merak ettiklerinizin cevapları burada. Başka sorularınız için destek ekibimizle iletişime
            geçebilirsiniz.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="border border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md rounded-xl"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 rounded-xl ${
                      openIndex === index ? "bg-primary/5" : "hover:bg-muted/30"
                    }`}
                  >
                    <h3 className="font-semibold text-foreground text-lg pr-4">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-primary transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
                      )}
                    </div>
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                      <div className="border-t border-border pt-4">
                        <p className="text-muted-foreground leading-relaxed text-pretty">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Başka sorularınız mı var?</p>
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
          >
            Destek Ekibi ile İletişime Geç
          </Button>
        </div>
      </div>
    </section>
  )
}
