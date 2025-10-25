"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, Target, Zap, MapPin, Building, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function FindCustomersSection() {
  const router = useRouter()
  const [businessCount, setBusinessCount] = useState(0)
  const [accuracyRate, setAccuracyRate] = useState(0)
  const [isSearching, setIsSearching] = useState(false)
  const [searchCompleted, setSearchCompleted] = useState(false)
  const [selectedSector, setSelectedSector] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const targetBusinessCount = 31268
  const targetAccuracyRate = 98

  const startSearch = () => {
    if (!selectedSector || !selectedCity) {
      return
    }

    setIsSearching(true)
    setSearchCompleted(false)
    setBusinessCount(0)
    setAccuracyRate(0)

    const businessInterval = setInterval(() => {
      setBusinessCount((prev) => {
        if (prev >= targetBusinessCount) {
          clearInterval(businessInterval)
          return targetBusinessCount
        }
        return prev + Math.floor(Math.random() * 50) + 10
      })
    }, 30)

    const accuracyInterval = setInterval(() => {
      setAccuracyRate((prev) => {
        if (prev >= targetAccuracyRate) {
          clearInterval(accuracyInterval)
          setIsSearching(false)
          setSearchCompleted(true)
          return targetAccuracyRate
        }
        return prev + Math.floor(Math.random() * 3) + 1
      })
    }, 60)
  }

  const handleDownload = () => {
    router.push("/panel/login")
  }

  return (
    <section className="py-20 bg-background">
      <style>{`
        @keyframes radarSweep { to { transform: rotate(360deg); } }
        @keyframes radarPulse {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: .6; }
          50% { opacity: .3; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
        @keyframes dotFade {
          0%,100% { opacity:.3; transform: scale(.85); }
          50% { opacity:1; transform: scale(1.15); }
        }
        @keyframes lineFlash { 0%,100%{opacity:0} 50%{opacity:.35} }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* SOL: Kart + Harita */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-xl p-6 border hover:shadow-2xl transition-shadow duration-500">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-5 h-5 text-primary" />
                <span className="font-semibold text-card-foreground">Potansiyel Müşteri Arama</span>
                {isSearching && (
                  <div className="ml-auto">
                    <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary animate-pulse" />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Sektör</span>
                    </div>
                    <Select value={selectedSector} onValueChange={setSelectedSector}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sektör seçin..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restoran">Restoran</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">İl</span>
                    </div>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="İl seçin..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="istanbul">İstanbul</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sayaçlar */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-success/10 rounded p-3 border border-success/20 relative overflow-hidden">
                    <div className="text-success font-semibold text-lg animate-pulse">
                      {businessCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Bulunan İşletme</div>
                  </div>
                  <div className="bg-accent/10 rounded p-3 border border-accent/20 relative overflow-hidden">
                    <div className="text-accent font-semibold text-lg animate-pulse">{accuracyRate}%</div>
                    <div className="text-xs text-muted-foreground">Doğruluk Oranı</div>
                  </div>
                </div>

                {/* HARİTA + RADAR */}
                <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Harita Görünümü</span>
                    <Building className="w-4 h-4 text-primary" />
                  </div>

                  <div className="relative h-36 md:h-48 rounded-lg overflow-hidden bg-background">
                    {/* 1) IZGARA (çok hafif, altta) */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        opacity: 0.03, // <<< ızgara neredeyse görünmez
                        backgroundImage:
                          "linear-gradient(to right, rgb(99 102 241) 1px, transparent 1px), linear-gradient(to bottom, rgb(99 102 241) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                      }}
                    />

                    {/* 2) DÜNYA HARİTASI (baskın, üstte) */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <img
                        src="/world-map.svg"
                        alt="World Map"
                        className="w-[115%] max-w-none h-full object-cover opacity-70"
                        style={{
                          filter: "contrast(1.05) brightness(1.05) drop-shadow(0 2px 8px rgba(0,0,0,.08))",
                          mixBlendMode: "normal",
                        }}
                      />
                    </div>

                    {/* 3) RADAR SWEEP (haritanın üzerinde) */}
                    <div
                      className="absolute left-1/2 top-1/2 z-20 w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.28) 55deg, transparent 120deg)",
                        animation: "radarSweep 5.5s linear infinite",
                        WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 58%, transparent 70%)",
                        maskImage: "radial-gradient(circle at center, black 0%, black 58%, transparent 70%)",
                        mixBlendMode: "multiply",
                      }}
                    />

                    {/* 4) PULSE HALKALAR */}
                    <div
                      className="absolute left-1/2 top-1/2 z-20 w-28 h-28 border border-primary/40 rounded-full"
                      style={{ transform: "translate(-50%, -50%)", animation: "radarPulse 3s ease-out infinite" }}
                    />
                    <div
                      className="absolute left-1/2 top-1/2 z-20 w-28 h-28 border border-primary/25 rounded-full"
                      style={{ transform: "translate(-50%, -50%)", animation: "radarPulse 3s ease-out infinite 1.2s" }}
                    />

                    {/* MERKEZ */}
                    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary shadow" />

                    {/* NOKTALAR */}
                    {[
                      { top: "20%", left: "15%", color: "bg-green-500", delay: "0s" },
                      { top: "35%", left: "25%", color: "bg-blue-500", delay: "0.5s" },
                      { top: "55%", left: "20%", color: "bg-orange-500", delay: "1s" },
                      { top: "25%", left: "70%", color: "bg-green-500", delay: "1.5s" },
                      { top: "45%", left: "75%", color: "bg-blue-500", delay: "2s" },
                      { top: "65%", left: "80%", color: "bg-orange-500", delay: "2.5s" },
                      { top: "60%", left: "60%", color: "bg-green-500", delay: "3s" },
                      { top: "40%", left: "50%", color: "bg-blue-500", delay: "3.5s" },
                    ].map((p, i) => (
                      <span
                        key={i}
                        className={`absolute z-20 w-2 h-2 rounded-full ${p.color} shadow`}
                        style={{ top: p.top, left: p.left, animation: `dotFade 3s ease-in-out ${p.delay} infinite` }}
                      />
                    ))}

                    {/* KISA ÇİZGİLER (çok hafif) */}
                    <svg className="absolute inset-0 z-20 w-full h-full pointer-events-none" viewBox="0 0 100 50">
                      <g stroke="rgb(99 102 241 / .25)" strokeWidth=".4">
                        <line
                          x1="12"
                          y1="18"
                          x2="20"
                          y2="24"
                          style={{ animation: "lineFlash 3.2s ease-in-out infinite" }}
                        />
                        <line
                          x1="63"
                          y1="30"
                          x2="78"
                          y2="18"
                          style={{ animation: "lineFlash 3.2s ease-in-out infinite .9s" }}
                        />
                        <line
                          x1="18"
                          y1="40"
                          x2="32"
                          y2="33"
                          style={{ animation: "lineFlash 3.2s ease-in-out infinite 1.6s" }}
                        />
                      </g>
                    </svg>

                    {/* EQUALIZER */}
                    <div className="absolute bottom-2 right-2 z-20 flex items-end gap-0.5 opacity-70">
                      {[8, 12, 9, 11, 7].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-primary/70 rounded-sm"
                          style={{
                            height: `${h}px`,
                            animation: `dotFade ${1.9 + i * 0.2}s ease-in-out ${i * 0.12}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Icon */}
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          {/* SAĞ: Metin */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              <span className="text-primary">Hedeflediğiniz sektördeki binlerce işletmeyi</span> Mapiest sizin için
              bulsun.
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Google Haritalar ve web verilerini birleştirerek{" "}
              <strong className="text-foreground">binlerce potansiyel müşterinin</strong> iletişim bilgilerine saniyeler
              içinde ulaşın.
            </p>

            <div className="space-y-4">
              {[
                { title: "Gerçek Zamanlı Veri", desc: "Güncel işletme bilgileri ve iletişim detayları" },
                { title: "Akıllı Filtreleme", desc: "Sektör, lokasyon ve büyüklük bazında detaylı arama" },
                {
                  title: "Hızlı İletişim",
                  desc: "Mail ve WhatsApp otomasyonlarıyla pazarlama sürecinizi hızlandırın.",
                },
              ].map((it) => (
                <div key={it.title} className="flex items-start gap-3 group">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <span className="text-success-foreground text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{it.title}</h4>
                    <p className="text-muted-foreground">{it.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={startSearch}
                disabled={!selectedSector || !selectedCity || isSearching}
              >
                {isSearching ? "Aranıyor..." : "Aramayı Başlat"}
              </Button>

              {searchCompleted && (
                <Button
                  size="lg"
                  className="bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Dosyayı İndir
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
