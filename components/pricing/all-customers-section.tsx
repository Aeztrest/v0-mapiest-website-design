import { MapPin, Building, Users } from "lucide-react"

export function AllCustomersSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-primary/5 rounded-2xl p-8 flex justify-center">
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm w-full">
              <div className="text-center mb-6">
                <div className="text-sm text-muted-foreground mb-2">Müşteri Paneli</div>
                <div className="text-lg font-semibold">İstanbul - Restoran</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm">Bölge</span>
                  </div>
                  <span className="text-sm font-medium">Kadıköy</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    <span className="text-sm">Sektör</span>
                  </div>
                  <span className="text-sm font-medium">Restoran</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">Firma Sayısı</span>
                  </div>
                  <span className="text-sm font-medium">1,247</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Tüm Müşteri Adaylarını Tek Panelde Görün</h2>
            <p className="text-muted-foreground mb-6">
              Mapiest, Google API ve web sitesi iletişim verilerini otomatik olarak toplar, iki aşamalı doğrulama sürecinden geçirir.
            </p>
            <p className="text-muted-foreground mb-6">
              Bu sayede sadece aktif işletmeler listelenir, yanlış veya eski bilgiler filtrelenir.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm">2 katmanlı veri doğrulama</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm">Otomatik veri akışı</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-sm">Güncel işletme verileri</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
