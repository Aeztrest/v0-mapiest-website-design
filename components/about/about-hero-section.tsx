import { Button } from "@/components/ui/button"

export function AboutHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('/abstract-blue-map-pattern.jpg')] opacity-10 bg-cover bg-center" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">Hakkımızda — Mapiest'in Hikayesi</h1>
            <p className="text-xl lg:text-2xl text-primary-foreground/90 text-pretty">
              Mapiest, işletmelerin potansiyel müşterilerine en verimli şekilde ulaşmasını sağlayan,{" "}
              <strong>Google ve Meta API altyapısıyla desteklenen</strong> bir SaaS platformudur.
            </p>
            <p className="text-lg text-primary-foreground/90 text-pretty">
              Amacımız, karmaşık veri toplama ve pazarlama süreçlerini herkes için{" "}
              <strong>basit, güvenli ve erişilebilir</strong> hale getirmektir.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="secondary" className="text-primary hover:text-primary/90">
                Hemen Başlayın
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Demo İzleyin
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img
                src="/about-hero-image.jpeg"
                alt="Potansiyel müşterileriniz bir tık yakında"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
