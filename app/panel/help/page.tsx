"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  PlayCircle,
  BookOpen,
  Database,
  Mail,
  MessageSquare,
  BarChart3,
  Search,
  Settings,
  HelpCircle,
} from "lucide-react"
import { VideoModal } from "@/components/video-modal"
import { SupportTicketModal } from "@/components/support-ticket-modal"
import { useState } from "react"

export default function HelpPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Yardım ve Tanıtım</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Mapiest platformunu kullanmaya başlamak için rehberimizi inceleyin
        </p>
      </div>

      {/* Tanıtım Videosu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Tanıtım Videosu
          </CardTitle>
          <CardDescription>Mapiest platformunun tüm özelliklerini keşfedin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Video placeholder - gerçek uygulamada iframe veya video player kullanılacak */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
            <div className="relative z-10 text-center">
              <PlayCircle className="w-20 h-20 mx-auto mb-4 text-primary" />
              <p className="text-lg font-semibold mb-2">Mapiest Platformu Tanıtım Videosu</p>
              <p className="text-sm text-muted-foreground mb-4">Platformun tüm özelliklerini 5 dakikada öğrenin</p>
              <Button onClick={() => setIsVideoOpen(true)}>
                <PlayCircle className="w-4 h-4 mr-2" />
                Videoyu İzle
              </Button>
            </div>
          </div>
          <Alert className="mt-4">
            <HelpCircle className="w-4 h-4" />
            <AlertDescription>
              Video izledikten sonra aşağıdaki kullanım rehberini inceleyerek detaylı bilgi alabilirsiniz.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Hızlı Başlangıç */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BookOpen className="w-5 h-5" />
            Hızlı Başlangıç Rehberi
          </CardTitle>
          <CardDescription className="text-sm">Mapiest'i kullanmaya başlamak için adım adım kılavuz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold mb-2">Arama Yapın</h4>
              <p className="text-sm text-muted-foreground">Sektör ve bölge seçerek işletme verilerini çekin</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold mb-2">Mesaj Gönderin</h4>
              <p className="text-sm text-muted-foreground">Mail veya WhatsApp ile toplu mesaj gönderin</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold mb-2">Takip Edin</h4>
              <p className="text-sm text-muted-foreground">Dashboard'dan performansınızı izleyin</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kullanım Rehberi - Akordeon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Detaylı Kullanım Rehberi
          </CardTitle>
          <CardDescription>Tüm özellikler hakkında detaylı bilgi</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Veri Çekme Sınırları */}
            <AccordionItem value="limits">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Veri Çekme Sınırları ve Kotalar</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <h4 className="font-semibold">Paket Limitleri</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Business Paket:</span>
                        <Badge variant="secondary">3,000 kredi / 3 Ay</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Agency Paket:</span>
                        <Badge variant="secondary">6,000 kredi / 3 Ay</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Enterprise Paket:</span>
                        <Badge variant="secondary">12,000 kredi / 3 Ay</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Günlük
                    </Badge>
                    <div>
                      <p className="font-medium">Günlük Kredi Kullanım Limiti</p>
                      <p className="text-sm text-muted-foreground">
                        Paketinize göre günlük kredi kullanabilirsiniz. Bu limit her gün saat 00:00'da sıfırlanır.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      Yıllık
                    </Badge>
                    <div>
                      <p className="font-medium">Yıllık Toplam Limit</p>
                      <p className="text-sm text-muted-foreground">
                        Paketinize göre yıllık toplam kredi kullanım hakkınız bulunmaktadır. Kalan kredinizi
                        Dashboard'dan takip edebilirsiniz.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">
                      API
                    </Badge>
                    <div>
                      <p className="font-medium">API Rate Limit</p>
                      <p className="text-sm text-muted-foreground">
                        Dakikada maksimum 60 API isteği yapabilirsiniz. Aşırı kullanım durumunda geçici olarak kısıtlama
                        uygulanabilir.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Gmail Kullanımı */}
            <AccordionItem value="gmail">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Gmail ile Mail Gönderimi</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Uygulama Şifresi Oluşturma</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Google Hesabınıza giriş yapın</li>
                      <li>Güvenlik bölümüne gidin</li>
                      <li>2 Adımlı Doğrulama'yı aktif edin (eğer aktif değilse)</li>
                      <li>Uygulama Şifreleri bölümüne tıklayın</li>
                      <li>"Mail" seçeneğini seçin ve şifre oluşturun</li>
                      <li>Oluşturulan 16 haneli şifreyi Mapiest'te kullanın</li>
                    </ol>
                  </div>
                  <Alert>
                    <Mail className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Önemli:</strong> Normal Gmail şifrenizi değil, uygulama şifresini kullanmalısınız. Aksi
                      takdirde mail gönderimi başarısız olur.
                    </AlertDescription>
                  </Alert>
                  <div>
                    <h4 className="font-semibold mb-2">Günlük Gönderim Limitleri</h4>
                    <p className="text-sm text-muted-foreground">
                      Gmail ücretsiz hesaplar için günde 500, Google Workspace hesapları için 2,000 mail gönderim limiti
                      bulunmaktadır.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* WhatsApp Kullanımı */}
            <AccordionItem value="whatsapp">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span className="font-semibold">WhatsApp ile Mesaj Gönderimi</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">WhatsApp Business API (WABA) Bağlantısı</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Ayarlar sayfasından "WhatsApp Onboarding" bölümüne gidin</li>
                      <li>"WhatsApp Hesabı Bağla" butonuna tıklayın</li>
                      <li>Meta Business Suite hesabınızla giriş yapın</li>
                      <li>WhatsApp Business hesabınızı seçin veya yeni hesap oluşturun</li>
                      <li>Telefon numaranızı doğrulayın (SMS veya arama ile)</li>
                      <li>Mapiest'e API erişim izni verin</li>
                      <li>Bağlantı tamamlandıktan sonra mesaj şablonlarınızı oluşturun</li>
                    </ol>
                  </div>
                  <Alert>
                    <MessageSquare className="w-4 h-4" />
                    <AlertDescription>
                      <strong>Önemli:</strong> WhatsApp Business API kullanımı için Meta tarafından onaylanmış bir
                      telefon numarası ve iş hesabı gereklidir. Onay süreci 1-2 iş günü sürebilir.
                    </AlertDescription>
                  </Alert>
                  <div>
                    <h4 className="font-semibold mb-2">Mesaj Şablonları</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      WhatsApp Business API ile mesaj göndermek için önceden onaylanmış şablonlar kullanmanız
                      gerekmektedir:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Ayarlar → WhatsApp Onboarding bölümünden şablon oluşturun</li>
                      <li>Şablonunuz Meta tarafından onaylandıktan sonra kullanabilirsiniz</li>
                      <li>Şablonlarda değişken alanlar kullanarak kişiselleştirme yapabilirsiniz</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Gönderim Limitleri</h4>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp Business API ile gönderim limitleriniz hesabınızın kalite puanına göre belirlenir. Yüksek
                      kalite puanı için spam yapmaktan kaçının ve kullanıcı geri bildirimlerine dikkat edin.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Dashboard Özellikleri */}
            <AccordionItem value="dashboard">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Dashboard ve Raporlama</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Metrik Kartları</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Dashboard'da aşağıdaki metrikleri gerçek zamanlı olarak takip edebilirsiniz:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Günlük ve toplam çekilen veri sayısı</li>
                      <li>Gönderilen mail ve WhatsApp mesaj sayıları</li>
                      <li>En çok aranan sektörler</li>
                      <li>Başarı oranları ve performans metrikleri</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Grafikler ve Analizler</h4>
                    <p className="text-sm text-muted-foreground">
                      Haftalık kullanım grafikleri ve başarı oranı trendleri ile performansınızı detaylı şekilde analiz
                      edebilirsiniz.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Son Aramalar</h4>
                    <p className="text-sm text-muted-foreground">
                      En son yaptığınız 5 aramayı görüntüleyebilir, detaylarını inceleyebilir ve sonuçları
                      indirebilirsiniz.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Arama Özellikleri */}
            <AccordionItem value="search">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Arama ve Veri Çekme</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Sektör ve Bölge Seçimi</h4>
                    <p className="text-sm text-muted-foreground">
                      20'den fazla sektör ve Türkiye'nin tüm illerinde arama yapabilirsiniz. Arama yapılabilir dropdown
                      menülerden kolayca seçim yapın.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Sonuç Formatları</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Arama sonuçlarını aşağıdaki formatlarda indirebilirsiniz:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Excel (.xlsx) - Tüm veriler düzenli tablolar halinde</li>
                      <li>CSV (.csv) - Diğer programlara aktarım için</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Veri İçeriği</h4>
                    <p className="text-sm text-muted-foreground">
                      Her firma için isim, adres, telefon, e-posta, sektör ve değerlendirme puanı bilgilerini elde
                      edebilirsiniz.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Hesap Ayarları */}
            <AccordionItem value="settings">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Hesap ve Güvenlik Ayarları</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Profil Bilgileri</h4>
                    <p className="text-sm text-muted-foreground">
                      Ayarlar sayfasından ad, e-posta ve telefon bilgilerinizi güncelleyebilirsiniz. Değişiklikler
                      anında kaydedilir.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Şifre Güvenliği</h4>
                    <p className="text-sm text-muted-foreground">
                      Hesap güvenliğiniz için düzenli olarak şifrenizi değiştirmenizi öneririz. Şifreniz en az 6
                      karakter olmalıdır.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Abonelik Yönetimi</h4>
                    <p className="text-sm text-muted-foreground">
                      Mevcut paket bilgilerinizi görüntüleyebilir, planınızı yükseltebilir veya iptal edebilirsiniz.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Destek */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle>Daha Fazla Yardıma mı İhtiyacınız Var?</CardTitle>
          <CardDescription>Destek ekibimiz size yardımcı olmak için burada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Yukarıdaki rehberde bulamadığınız bir konu varsa veya teknik destek almak istiyorsanız, bizimle iletişime
            geçebilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="default" onClick={() => setIsSupportModalOpen(true)}>
              <Mail className="w-4 h-4 mr-2" />
              Destek Talebi Oluştur
            </Button>
          </div>
        </CardContent>
      </Card>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WqaiStsgyZxNoeGOA0J9ERHWMBijJ6.mp4"
        title="Mapiest Platform Tanıtım Videosu"
        isYouTube={false}
      />

      <SupportTicketModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  )
}
