"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, X } from "lucide-react"

export function HeroSection() {
  const [showVideoModal, setShowVideoModal] = useState(false)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-primary/90 to-slate-900 text-primary-foreground overflow-hidden">
      {/* Background Pattern - Daha dinamik dalga efekti */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-success/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-accent/10 to-success/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 opacity-20">
        <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="currentColor"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Sol Taraf - İçerik */}
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
                <span className="text-accent animate-in fade-in duration-1000 delay-300">Mapiest</span> ile
                <br />
                Satışlarınızı
                <br />
                <span className="text-success animate-in fade-in duration-1000 delay-500">Artırın</span>
              </h1>

              <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed text-pretty animate-in slide-in-from-left-4 duration-1000 delay-700">
                Google Maps üzerindeki işletme verilerini toplayarak{" "}
                <strong className="text-primary-foreground">potansiyel müşterilere</strong> ulaşın ve{" "}
                <strong className="text-accent">yapay zeka destekli</strong> toplu mesajlar gönderin.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-left-4 duration-1000 delay-1000">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Hemen Başla
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowVideoModal(true)}
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-4 bg-transparent shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Demo İzle
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8 animate-in slide-in-from-left-4 duration-1000 delay-1200">
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-accent group-hover:scale-110 transition-transform">10K+</div>
                <div className="text-sm text-primary-foreground/70">Aktif Kullanıcı</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-success group-hover:scale-110 transition-transform">500K+</div>
                <div className="text-sm text-primary-foreground/70">Toplanan Veri</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl font-bold text-warning group-hover:scale-110 transition-transform">99.9%</div>
                <div className="text-sm text-primary-foreground/70">Uptime</div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Platform Mockup */}
          <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-500">
            <div className="relative z-10 bg-card rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-primary rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-200"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-400"></div>
                </div>
                <div className="bg-card rounded p-3">
                  <div className="text-card-foreground text-sm font-medium mb-2">Mapiest Dashboard</div>
                  <div className="space-y-2">
                    <div className="h-2 bg-accent rounded w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-success rounded w-1/2 animate-pulse delay-300"></div>
                    <div className="h-2 bg-muted rounded w-2/3 animate-pulse delay-600"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded p-3 hover:bg-muted/80 transition-colors">
                  <div className="w-8 h-8 bg-accent rounded mb-2"></div>
                  <div className="h-2 bg-card-foreground/20 rounded mb-1"></div>
                  <div className="h-2 bg-card-foreground/20 rounded w-2/3"></div>
                </div>
                <div className="bg-muted rounded p-3 hover:bg-muted/80 transition-colors">
                  <div className="w-8 h-8 bg-success rounded mb-2"></div>
                  <div className="h-2 bg-card-foreground/20 rounded mb-1"></div>
                  <div className="h-2 bg-card-foreground/20 rounded w-2/3"></div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <span className="text-accent-foreground font-bold animate-pulse">AI</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-success rounded-full animate-pulse shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-card rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] relative animate-in zoom-in-95 duration-300">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 text-card-foreground hover:text-accent"
            >
              <X className="w-5 h-5" />
            </Button>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Demo video burada gösterilecek</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alt Mesaj Şeridi */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900 text-primary-foreground py-3">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm animate-pulse">
            <span className="text-accent font-semibold">Mapiest</span> ile satışlarınızı artırın - Hemen ücretsiz
            deneyin!
          </p>
        </div>
      </div>
    </section>
  )
}
