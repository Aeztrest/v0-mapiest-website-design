"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, Users, Globe, Building } from "lucide-react"
import { VideoModal } from "./video-modal"
import Link from "next/link"

export function HeroSectionNew() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [businessCount, setBusinessCount] = useState(0)

  useEffect(() => {
    const targetCount = 31268
    const duration = 2000
    const steps = 60
    const increment = targetCount / steps
    const stepDuration = duration / steps

    let currentCount = 0
    const timer = setInterval(() => {
      currentCount += increment
      if (currentCount >= targetCount) {
        setBusinessCount(targetCount)
        clearInterval(timer)
      } else {
        setBusinessCount(Math.floor(currentCount))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => {
    return num.toLocaleString("tr-TR")
  }

  return (
    <>
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

      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white -mt-16 pt-16 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('/abstract-blue-map-pattern.jpg')] opacity-10 bg-cover bg-center" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl animate-spin"
            style={{ animationDuration: "20s" }}
          />
        </div>

        <div className="relative z-20 w-full py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-in slide-in-from-left-8 duration-1000">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <img
                    src="/mapiest-logo-white.png"
                    alt="Mapiest Logo"
                    className="h-12 sm:h-14 lg:h-16 w-auto hover:scale-110 transition-transform duration-300"
                  />
                  <div className="bg-accent/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-accent/30">
                    <span className="text-accent font-medium text-xs sm:text-sm flex items-center">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      Veri & Otomasyon Platformu
                    </span>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-6 lg:space-y-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white text-balance">
                    Doğrulanmış verilerle
                    <br />
                    <span className="text-accent bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent animate-pulse">
                      yeni müşterilere
                    </span>
                    <br />
                    <span className="text-white/90"> saniyeler içinde ulaşın.</span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl lg:text-1xl text-white/80 leading-relaxed max-w-1xl">
                    Mapiest, Google kaynaklarından ve işletmelerin web sitelerinden doğrulanmış işletme verilerini
                    listeler ve toplu mesajlaşmayı yasal çerçevede otomatikleştirir.
                  </p>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/15 transition-all duration-300">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">150M+</div>
                      <div className="text-xs sm:text-sm text-white/70">İşletme Verisi</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/15 transition-all duration-300">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">500+</div>
                      <div className="text-xs sm:text-sm text-white/70">Sektör</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/15 transition-all duration-300">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent">7/24</div>
                      <div className="text-xs sm:text-sm text-white/70">Destek</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-300 mt-8 lg:mt-0 max-w-[520px] ml-auto">
                <div className="relative">
                  <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-500 hover:scale-[1.03]">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 shadow-inner">
                      <div className="flex items-center justify-between mb-2 sm:mb-4 flex-wrap gap-2">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <img src="/mapiest-logo.gif" alt="Mapiest Logo" className="h-8 sm:h-10 w-auto" />
                          <div>
                            <span className="font-bold text-gray-800 text-base sm:text-lg">Mapiest Platform</span>
                            <div className="text-xs text-gray-500">AI Powered</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                          <span className="text-xs sm:text-sm text-gray-600">1,247 aktif</span>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                          <Button
                            size="sm"
                            className="h-9 sm:h-10 px-4 sm:px-5 rounded-lg hover:scale-105 transition-transform text-sm"
                            onClick={() => setIsVideoModalOpen(true)}
                          >
                            <Play className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                            Platformu Gör
                            <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-9 sm:h-10 px-4 sm:px-5 rounded-lg hover:scale-105 transition-transform bg-transparent text-gray-800 hover:text-white hover:bg-primary border-gray-300 text-sm"
                            asChild
                          >
                            <Link href="/pricing">
                              Hizmetleri İncele
                              <ArrowRight className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="text-xs font-medium text-gray-600">SEKTÖR</div>
                            <div className="h-9 sm:h-10 bg-gray-100 rounded-lg flex items-center px-2 sm:px-3 border-l-4 border-accent">
                              <span className="text-gray-700 text-xs sm:text-sm">Restoran & Kafe</span>
                            </div>
                          </div>
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="text-xs font-medium text-gray-600">BÖLGE</div>
                            <div className="h-9 sm:h-10 bg-gray-100 rounded-lg flex items-center px-2 sm:px-3 border-l-4 border-primary">
                              <span className="text-gray-700 text-xs sm:text-sm">İstanbul</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5 sm:space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Arama İlerliyor...</span>
                            <span className="text-accent font-medium">{formatNumber(businessCount)}/100.000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                            <div
                              className="bg-gradient-to-r from-accent to-primary h-1.5 sm:h-2 rounded-full animate-pulse"
                              style={{ width: "84.7%" }}
                            />
                          </div>
                        </div>

                        <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-600">Harita Görünümü</span>
                            <Building className="w-4 h-4 text-primary" />
                          </div>

                          <div className="relative h-36 md:h-48 rounded-lg overflow-hidden bg-white">
                            <div
                              className="absolute inset-0 z-0"
                              style={{
                                opacity: 0.03,
                                backgroundImage:
                                  "linear-gradient(to right, rgb(99 102 241) 1px, transparent 1px), linear-gradient(to bottom, rgb(99 102 241) 1px, transparent 1px)",
                                backgroundSize: "18px 18px",
                              }}
                            />

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

                            <div
                              className="absolute left-1/2 top-1/2 z-20 w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full"
                              style={{
                                background:
                                  "conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.28) 55deg, transparent 120deg)",
                                animation: "radarSweep 5.5s linear infinite",
                                WebkitMaskImage:
                                  "radial-gradient(circle at center, black 0%, black 58%, transparent 70%)",
                                maskImage: "radial-gradient(circle at center, black 0%, black 58%, transparent 70%)",
                                mixBlendMode: "multiply",
                              }}
                            />

                            <div
                              className="absolute left-1/2 top-1/2 z-20 w-28 h-28 border border-primary/40 rounded-full"
                              style={{
                                transform: "translate(-50%, -50%)",
                                animation: "radarPulse 3s ease-out infinite",
                              }}
                            />
                            <div
                              className="absolute left-1/2 top-1/2 z-20 w-28 h-28 border border-primary/25 rounded-full"
                              style={{
                                transform: "translate(-50%, -50%)",
                                animation: "radarPulse 3s ease-out infinite 1.2s",
                              }}
                            />

                            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary shadow" />

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
                                style={{
                                  top: p.top,
                                  left: p.left,
                                  animation: `dotFade 3s ease-in-out ${p.delay} infinite`,
                                }}
                              />
                            ))}

                            <svg
                              className="absolute inset-0 z-20 w-full h-full pointer-events-none"
                              viewBox="0 0 100 50"
                            >
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

                        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                              <span className="font-medium text-gray-800 text-sm sm:text-base">
                                {formatNumber(businessCount)} İşletme Bulundu
                              </span>
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">2.3 saniye</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-accent/20 via-transparent to-primary/20 rounded-3xl blur-2xl opacity-50" />
                  <div className="pointer-events-none absolute -inset-4 -z-10 bg-gradient-to-r from-accent/10 to-primary/10 rounded-3xl blur-3xl opacity-30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WqaiStsgyZxNoeGOA0J9ERHWMBijJ6.mp4"
        title="Mapiest Platform Demo"
        isYouTube={false}
      />
    </>
  )
}
