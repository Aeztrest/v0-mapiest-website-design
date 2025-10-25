import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-background to-muted/20">
        <article className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold mb-4">Hizmet Şartları (Terms of Service)</h1>
            <p className="text-muted-foreground mb-8">Yürürlük Tarihi: 7 Ağustos 2025</p>

            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <p className="font-semibold mb-2">Şirket: Dropmaps LTD</p>
              <p className="text-sm text-muted-foreground mb-1">
                Adres: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
              </p>
              <p className="text-sm text-muted-foreground">İletişim: info@mapiest.com / +44 743 810 29 97</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Tanımlar</h2>
              <p className="mb-4">
                <strong>Mapiest:</strong> Dropmaps LTD tarafından geliştirilen, işletme verilerini organize eden,
                e-posta ve WhatsApp Business/Web entegrasyonu üzerinden kullanıcıların kendi numaralarıyla
                iletişimlerini kolaylaştıran SaaS platformudur.
              </p>
              <p className="mb-4">
                <strong>Kullanıcı:</strong> Mapiest'e kayıt olan, demo veya ücretli paketlerden birini kullanan gerçek
                veya tüzel kişi.
              </p>
              <p>
                <strong>Platform:</strong> www.mapiest.com ve bağlantılı tüm sistemler.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Hizmetin Kapsamı</h2>
              <p className="mb-4">Mapiest kullanıcıya şu dijital işlevleri sağlar:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Sektör ve bölge bazlı işletme verilerini organize etme</li>
                <li>WhatsApp Business/Web entegrasyonu üzerinden kendi numarasıyla iletişim kurma</li>
                <li>E-posta gönderim altyapısı (SMTP veya hazır servisler)</li>
                <li>Yapay zeka ile mesaj önerileri ve kişiselleştirme</li>
                <li>Kullanıcı paneli, istatistik, kredi takibi</li>
                <li>Eğitim ve onboarding içerikleri</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Mapiest yalnızca yazılım altyapısı sağlar; mesajların içerik, zamanlama ve hukuki uygunluğu kullanıcıya
                aittir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Üyelik ve Abonelik</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kullanıcı, e-posta ve şifre ile kayıt olduktan sonra paket satın alarak platformu kullanabilir.</li>
                <li>Abonelikler aylık veya yıllık olarak otomatik yenilenir.</li>
                <li>Panel üzerinden iptal edilmediği sürece yenileme devam eder.</li>
                <li>Tüm ödemeler Shopify altyapısı ile güvenli şekilde işlenir.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Demo Kullanımı</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kullanıcılar kredi kartı bilgisi girmeden demo hesabı açabilir.</li>
                <li>Demo kapsamında sınırlı sayıda veri ve özellik kullanılabilir.</li>
                <li>Limit dolduğunda kullanıcı bilgilendirilir ve abonelik paketlerine yönlendirilir.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Kullanım Kuralları</h2>
              <p className="mb-4">Kullanıcı:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Platformu yalnızca yasal ticari faaliyetler için kullanacağını,</li>
                <li>Elde ettiği işletme verilerini KVKK, GDPR ve ETDK'ya uygun şekilde değerlendireceğini,</li>
                <li>
                  WhatsApp, e-posta veya diğer kanallardan iletişim kurarken gerekli izinleri almakla yükümlü olduğunu,
                </li>
                <li>Hesap bilgilerini koruyacağını ve üçüncü kişilerle paylaşmayacağını kabul eder.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Sorumluluk Sınırları</h2>
              <p className="mb-4">
                Mapiest, yalnızca yazılım altyapısı sunar. Kullanımın yasal uygunluğu, mesaj içerikleri ve izinli veri
                yönetimi tamamen kullanıcıya aittir.
              </p>
              <p className="mb-4">
                Kötüye kullanım, spam, dolandırıcılık veya yasa dışı faaliyetlerden Dropmaps LTD sorumlu tutulamaz.
              </p>
              <p>
                Veri sağlayıcı değişiklikleri, API limitleri veya geçici erişim sorunlarından doğan kesintilerde iade
                hakkı doğmaz; ancak kalıcı sorunlarda destek ekibi çözüm sunar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Veri Güvenliği</h2>
              <p>
                Mapiest, kullanıcı verilerini makul teknik ve idari önlemlerle korur; ancak internet tabanlı hizmetlerde
                mutlak güvenlik garanti edilemez.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Fikri Mülkiyet</h2>
              <p>
                Mapiest'in yazılım altyapısı, tasarımı, görsel bileşenleri ve yapay zeka çıktıları Dropmaps LTD'ye
                aittir. İzinsiz kopyalama, çoğaltma veya dağıtım yasaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Güncellemeler</h2>
              <p>
                Dropmaps LTD, yazılım üzerinde değişiklik yapma, yeni özellikler ekleme ve bu şartları güncelleme
                hakkını saklı tutar. Güncellemeler e-posta veya kullanıcı paneli üzerinden duyurulur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Uyuşmazlık Çözümü</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tüm uyuşmazlıklarda İngiltere yasaları geçerlidir.</li>
                <li>Tüketici kullanıcılar, kendi ülkelerindeki Tüketici Mahkemeleri'ne başvurabilir.</li>
                <li>Ticari kullanıcılar için yetkili mahkeme Londra Merkez Mahkemeleridir.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. İletişim</h2>
              <p className="mb-2">Her türlü talep ve şikayet için:</p>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="mb-1">📧 info@mapiest.com</p>
                <p>📞 +44 743 810 29 97</p>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
