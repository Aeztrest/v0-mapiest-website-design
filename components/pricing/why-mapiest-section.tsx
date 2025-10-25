import { Zap, DollarSign, Clock, TrendingUp, Shield } from "lucide-react"

export function WhyMapiestSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6">Mapiest Avantajları</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6" />
                <span>Otomasyon: Tek tıkla manuel işleri devre dışı bırakın</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6" />
                <span>Maliyet Tasarrufu: Geleneksel yöntemlere göre %80'e varan avantaj</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6" />
                <span>Zaman Kazancı: Ekiplerinizin haftalarca sürecek işini dakikalara indirin</span>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6" />
                <span>Hızlı Sonuç: Dakikalar içinde binlerce potansiyel müşteri bulun</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                <span>Güvenli Altyapı: Google & Meta API bağlantıları ile tam yasal uyumluluk</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Neden Mapiest Paketleri?</h2>
            <p className="text-muted-foreground mb-6">Klasik müşteri bulma yöntemleri pahalı, yavaş ve verimsizdir.</p>
            <p className="text-muted-foreground mb-6">
              Mapiest ile tüm süreci otomatikleştirerek yüzlerce saatlik iş yükünü ortadan kaldırın.
            </p>
            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
              <p className="text-sm font-medium italic">
                "Mapiest ile zamandan, bütçeden ve enerjiden tasarruf edin — hemen deneyin."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
