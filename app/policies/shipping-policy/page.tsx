import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-2">Kargo Politikası</h1>
          <p className="text-muted-foreground mb-8">Yürürlük Tarihi: 7 Ağustos 2025</p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <p className="font-semibold mb-2">Şirket: Dropmaps LTD</p>
            <p className="mb-1">Adres: 71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom</p>
            <p className="mb-1">
              İletişim:{" "}
              <a href="mailto:info@mapiest.com" className="text-primary hover:underline">
                info@mapiest.com
              </a>{" "}
              / +44 743 810 29 97
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Mapiest Dijital Bir Üründür – Fiziksel Kargo Gönderimi Yoktur
            </h2>
            <p className="mb-4">Mapiest, tamamen çevrimiçi sunulan bir SaaS platformudur. Dolayısıyla:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Herhangi bir fiziksel ürün gönderimi yapılmaz.</li>
              <li>"Kargo", "teslimat süresi" veya "adres bilgisi" uygulamaları Mapiest için geçerli değildir.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Hizmete Erişim</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Ödeme işlemi onaylandığında hesabınız anında aktive edilir.</li>
              <li>Tüm kullanım haklarınız, kullanıcı panelinize otomatik olarak tanımlanır.</li>
              <li>Aktivasyon ve erişim tamamen web arayüzü üzerinden gerçekleşir.</li>
              <li>
                Nadiren gecikme yaşanırsa, destek ekibimizle iletişime geçerek hızlı çözüm alabilirsiniz:{" "}
                <a href="mailto:info@mapiest.com" className="text-primary hover:underline">
                  info@mapiest.com
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
