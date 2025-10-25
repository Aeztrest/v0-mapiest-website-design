import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-2">Gizlilik Politikası</h1>
          <p className="text-muted-foreground mb-8">Son Güncelleme: 4 Ağustos 2025</p>

          <p className="mb-6">
            Mapiest | Yapay Zekâ Destekli Veri & Mesaj Platformu ("Mapiest", "biz", "bizim"), kullanıcılarına işletme
            verilerini organize etme ve iletişim süreçlerini kolaylaştırma hizmetleri sunar. Bu Gizlilik Politikası,
            kişisel verilerinizi nasıl topladığımızı, kullandığımızı, paylaştığımızı ve bu verilerle ilgili haklarınızı
            açıklamaktadır.
          </p>

          <p className="mb-8">
            Hizmetlerimizi kullanarak bu politikayı okuduğunuzu, anladığınızı ve burada belirtilen şekilde kişisel
            verilerinizin işlenmesini kabul ettiğinizi beyan etmiş olursunuz.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Topladığımız Bilgiler</h2>
            <p className="mb-4">Mapiest aşağıdaki kategorilerde kişisel verileri toplayabilir:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                <strong>İletişim Bilgileri:</strong> Ad, e-posta, telefon numarası, işletme adı ve adresi.
              </li>
              <li>
                <strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre, tercih ve ayarlar.
              </li>
              <li>
                <strong>İşlem Bilgileri:</strong> Satın alınan paketler, ödeme ve faturalama verileri.
              </li>
              <li>
                <strong>Cihaz ve Kullanım Bilgileri:</strong> IP adresi, tarayıcı bilgisi, kullanım geçmişi.
              </li>
              <li>
                <strong>Müşteri İletişimleri:</strong> Destek talepleri, geri bildirimler ve yazışmalar.
              </li>
            </ul>
            <p>
              Herkese açık işletme verileri (ör. Google Maps üzerinde kamuya açık telefon, adres, web sitesi bilgileri)
              de sistemimize dahil edilebilir. Bu veriler yalnızca ticari iletişim ve müşteri adaylarını organize etme
              amacıyla işlenir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Kişisel Verilerin Kullanım Amaçları</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Hizmetleri sunmak, kişiselleştirmek ve iyileştirmek</li>
              <li>Ödemeleri işlemek ve satın alma süreçlerini yürütmek</li>
              <li>Kullanıcı desteği sağlamak ve soruları yanıtlamak</li>
              <li>Hesap güvenliğini sağlamak ve dolandırıcılığı önlemek</li>
              <li>İlgili mevzuata uymak (KVKK, GDPR, ETDK vb.)</li>
            </ul>
            <p className="bg-muted p-4 rounded-lg">
              <strong>Önemli Not:</strong> Mapiest, WhatsApp, e-posta veya SMS üzerinden ileti gönderme imkanı sağlasa
              da, mesaj gönderimi yalnızca kullanıcının kendi sorumluluğundadır. Kullanıcılar, KVKK ve Elektronik
              Ticaretin Düzenlenmesi Kanunu ("ETDK") gereği İYS (İleti Yönetim Sistemi) üzerinden gerekli izinleri
              almakla yükümlüdür.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Verilerin Paylaşımı</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Hizmet Sağlayıcılar:</strong> Ödeme, barındırma, müşteri desteği ve analiz hizmeti sağlayan
                üçüncü taraflarla.
              </li>
              <li>
                <strong>İş Ortakları:</strong> Reklam ve pazarlama faaliyetleri kapsamında (yalnızca izinli çerçevede).
              </li>
              <li>
                <strong>Yasal Yükümlülükler:</strong> Yetkili mercilerden gelen geçerli talepler doğrultusunda.
              </li>
              <li>
                <strong>Kurumsal İşlemler:</strong> Birleşme, devralma veya satış durumlarında.
              </li>
            </ul>
            <p className="mt-4">
              Mapiest, kullanıcıların kendi izin yükümlülüklerini yerine getirmediği durumlarda hukuki sorumluluk kabul
              etmez.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Veri Saklama ve Güvenlik</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Veriler, hizmetlerin sunulması için gerekli olduğu sürece saklanır.</li>
              <li>Yasal yükümlülükler doğrultusunda daha uzun süre saklama yapılabilir.</li>
              <li>
                Verilerin korunması için makul teknik ve idari güvenlik önlemleri uygulanır. Ancak "mutlak güvenlik"
                garanti edilemez.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Kullanıcı Hakları</h2>
            <p className="mb-4">Kullanıcılar, yürürlükteki veri koruma mevzuatı kapsamında şu haklara sahiptir:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Kendi kişisel verilerine erişme</li>
              <li>Düzeltme ve silme talep etme</li>
              <li>İşlemeye itiraz etme</li>
              <li>Veri taşınabilirliği talep etme</li>
              <li>Rızayı geri çekme</li>
            </ul>
            <p>
              Bu hakları kullanmak için{" "}
              <a href="mailto:info@mapiest.com" className="text-primary hover:underline">
                info@mapiest.com
              </a>{" "}
              adresi üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Çocukların Verileri</h2>
            <p>
              Mapiest hizmetleri çocuklara yönelik değildir. 16 yaşın altındaki bireylerden bilerek kişisel veri
              toplamayız.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Uluslararası Aktarımlar</h2>
            <p>
              Verileriniz, Birleşik Krallık ve Avrupa dışındaki ülkelere aktarılabilir. Bu durumda uluslararası veri
              aktarım mekanizmaları (örn. Standart Sözleşme Maddeleri) uygulanır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Değişiklikler</h2>
            <p>
              Bu politika zaman zaman güncellenebilir. Güncellemeler web sitemizde yayınlanır ve yürürlük tarihi revize
              edilir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. İletişim</h2>
            <p className="mb-4">Veri koruma konusundaki tüm talepleriniz için:</p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-semibold mb-2">Dropmaps LTD</p>
              <p className="mb-1">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</p>
              <p className="mb-1">
                E-posta:{" "}
                <a href="mailto:info@mapiest.com" className="text-primary hover:underline">
                  info@mapiest.com
                </a>
              </p>
              <p>Telefon: +44 743 810 29 97 / +90 546 947 66 34</p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
