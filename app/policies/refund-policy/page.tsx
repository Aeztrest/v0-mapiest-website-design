import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-2">İade ve Para İadesi Politikası</h1>
          <p className="text-muted-foreground mb-4">Yürürlük Tarihi: 7 Ağustos 2025</p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <p className="font-semibold mb-2">Dropmaps LTD</p>
            <p className="mb-1">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</p>
            <p className="mb-1">
              E-posta:{" "}
              <a href="mailto:info@mapiest.com" className="text-primary hover:underline">
                info@mapiest.com
              </a>
            </p>
            <p>Telefon: +44 743 810 29 97</p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Ürün Niteliği</h2>
            <p>
              Mapiest tamamen yazılım tabanlı, anlık veri sağlayan bir dijital hizmet platformudur. Satılan tüm ürünler
              dijital nitelikte olup fiziksel kargo, teslimat veya stok bulundurulması söz konusu değildir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Abonelik ve Yenileme</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Kullanıcı, satın alma işlemiyle birlikte aylık veya yıllık olarak yenilenen dijital abonelik sistemine
                dahil olur.
              </li>
              <li>
                Abonelik, kullanıcı tarafından iptal edilmediği sürece otomatik olarak yenilenir ve ücret tahsil edilir.
              </li>
              <li>İptal işlemi kullanıcı panelinden kolayca yapılabilir.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Cayma Hakkı ve İade Koşulları</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Mapiest dijital içerik sağladığından, üyelik aktive edildiği ve veri çekimi gerçekleştiği anda cayma
                hakkı sona erer.
              </li>
              <li>
                Kullanıcı, satın alma sonrası 24 saat içinde ve hiçbir veri çekilmemişse, destek ekibine başvurarak iade
                talebinde bulunabilir.
              </li>
              <li>
                Bu durum Avrupa Birliği Tüketici Hakları Direktifi (2011/83/EU) ve İngiltere Tüketici Sözleşmeleri
                Yönetmeliği (Consumer Contracts Regulations 2013) çerçevesinde geçerlidir.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. İade Süreci</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>İade onayı alındığında, ödeme işlemi orijinal ödeme yöntemi üzerinden gerçekleştirilir.</li>
              <li>Bankanıza bağlı olarak iade işlemleri 7–14 iş günü içinde tamamlanır.</li>
              <li>Shopify Payments altyapısı üzerinden yapılan işlemler güvence altındadır.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Özel Durumlar</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Taksitli ödemelerde iade, bankanızın prosedürlerine göre yansıtılır.</li>
              <li>
                Dijital hizmetin kötüye kullanımı veya sistemsel manipülasyon tespit edilirse iade hakkı geçersiz
                sayılır.
              </li>
              <li>
                Fiziksel ürün gönderimi bulunmadığından, "kargo ücreti" veya "stok yenileme ücreti" gibi uygulamalar
                Mapiest için geçerli değildir.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Destek ve İletişim</h2>
            <p className="mb-4">İade talepleriniz için:</p>
            <div className="bg-muted p-6 rounded-lg">
              <p>
                E-posta:{" "}
                <a href="mailto:info@mapiest.com" className="text-primary hover:underline">
                  info@mapiest.com
                </a>
              </p>
            </div>
          </section>

          <div className="bg-muted p-6 rounded-lg mt-8">
            <p className="text-sm">
              Bu politika, Mapiest'in dijital hizmet modelini ve kullanıcı haklarını net bir şekilde tanımlamak amacıyla
              hazırlanmıştır.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
