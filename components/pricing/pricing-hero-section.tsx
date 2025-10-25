export function PricingHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-0 top-0 h-full w-48" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 C30,50 70,50 100,0 L100,100 L0,100 Z" fill="currentColor" />
        </svg>
        <svg className="absolute right-0 top-0 h-full w-48" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 C30,50 70,50 100,0 L100,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Potansiyel Müşterilerinizi Listeleyin</h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">İşletmenize uygun paketleri inceleyin</p>

          {/* Hero visual placeholder */}
          <div className="mt-12 relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="aspect-video bg-white/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <p className="text-sm text-white/80">Platform Kullanımı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
