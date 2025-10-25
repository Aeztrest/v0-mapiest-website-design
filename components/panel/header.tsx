"use client"

import { useState, useEffect } from "react"
import { User, Coins, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"

interface CreditOption {
  id: number
  credits: number
  price: number
  price_id: string
  credit_name_tr: string
}

export function PanelHeader() {
  const [user, setUser] = useState<{
    id: number
    name: string
    surname: string
    email: string
    plan: string
    credit: number
    plan_credit: number
    bought_credit: number
    bought_credit_expiry_time: string | null
    is_email_verified: boolean
  } | null>(null)
  const [credits, setCredits] = useState({ remaining: 0, total: 0 })
  const [showCreditModal, setShowCreditModal] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [selectedCreditIndex, setSelectedCreditIndex] = useState(0)
  const [creditOptions, setCreditOptions] = useState<CreditOption[]>([])
  const [loadingCredits, setLoadingCredits] = useState(true)
  const [purchasingCredit, setPurchasingCredit] = useState(false)
  const [loadingUserData, setLoadingUserData] = useState(false)

  useEffect(() => {
    const fetchCreditOptions = async () => {
      try {
        const response = await fetch("/api/credits")
        if (response.ok) {
          const data = await response.json()
          const formattedOptions = data.map((item: any) => ({
            id: item.id,
            credits: Number.parseInt(item.credit_name_tr.replace(/[^\d]/g, "")),
            price: item.price,
            price_id: item.price_id,
            credit_name_tr: item.credit_name_tr,
          }))
          setCreditOptions(formattedOptions)
        }
      } catch (error) {
        console.error("[v0] Kredi paketleri yüklenemedi:", error)
      } finally {
        setLoadingCredits(false)
      }
    }

    fetchCreditOptions()
  }, [])

  const fetchUserData = async () => {
    const token = localStorage.getItem("mapiest_token")
    const cachedUser = localStorage.getItem("mapiest_user")

    if (cachedUser) {
      const userData = JSON.parse(cachedUser)
      setUser(userData)
      setCredits({
        remaining: userData.credit || 0,
        total: userData.credit || 0,
      })
    }

    if (token) {
      try {
        const response = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const userData = await response.json()
          console.log("[v0] Fresh user data from API:", userData)
          console.log("[v0] bought_credit:", userData.bought_credit)
          console.log("[v0] bought_credit_expiry_time:", userData.bought_credit_expiry_time)
          setUser(userData)
          localStorage.setItem("mapiest_user", JSON.stringify(userData))
          setCredits({
            remaining: userData.credit || 0,
            total: userData.credit || 0,
          })
        } else {
          console.error("[v0] API response not ok:", response.status)
          if (response.status === 401) {
            localStorage.removeItem("mapiest_token")
            localStorage.removeItem("mapiest_user")
          }
        }
      } catch (error) {
        console.error("[v0] Kullanıcı bilgileri çekilemedi:", error)
      }
    }
  }

  useEffect(() => {
    fetchUserData()

    const handleCreditUpdate = (event: CustomEvent) => {
      const newCredit = event.detail.credit
      setCredits({
        remaining: newCredit,
        total: newCredit,
      })

      if (user) {
        const updatedUser = { ...user, credit: newCredit }
        setUser(updatedUser)
      }
    }

    window.addEventListener("creditUpdated", handleCreditUpdate as EventListener)

    return () => {
      window.removeEventListener("creditUpdated", handleCreditUpdate as EventListener)
    }
  }, [])

  const handleOpenCreditModal = async () => {
    setShowCreditModal(true)
    setLoadingUserData(true)
    await fetchUserData()
    setLoadingUserData(false)
  }

  const handlePurchaseCredit = async () => {
    if (creditOptions.length === 0 || purchasingCredit) return

    const selectedOption = creditOptions[selectedCreditIndex]
    const token = localStorage.getItem("mapiest_token")

    if (!token) {
      alert("Oturum bulunamadı. Lütfen tekrar giriş yapın.")
      return
    }

    setPurchasingCredit(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          price_id: selectedOption.price_id,
          quantity: 1,
        }),
      })

      if (!response.ok) {
        throw new Error("Checkout session oluşturulamadı")
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Stripe URL alınamadı")
      }
    } catch (error) {
      console.error("[v0] Kredi satın alma hatası:", error)
      alert("Kredi satın alma işlemi başarısız oldu. Lütfen tekrar deneyin.")
      setPurchasingCredit(false)
    }
  }

  const selectedPackage = creditOptions[selectedCreditIndex]

  const formatExpiryDate = (dateString: string | null) => {
    if (!dateString) return "Süresiz"

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    } catch {
      return "Süresiz"
    }
  }

  return (
    <>
      <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">Mapiest Yönetim Paneli</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handleOpenCreditModal}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer relative group"
          >
            <Coins className="w-4 h-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">{credits.remaining.toLocaleString()} Kredi</span>
            </div>
            <Plus
              className={`w-4 h-4 text-primary transition-all duration-300 ${
                isHovered ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-90"
              }`}
            />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block">{user ? `${user.name} ${user.surname}` : "Kullanıcı"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="sm:hidden px-2 py-2 border-b">
                <div className="flex items-center gap-2 text-sm">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{credits.remaining.toLocaleString()} Kredi</span>
                </div>
              </div>
              <DropdownMenuItem asChild>
                <Link href="/panel/settings">
                  <User className="w-4 h-4 mr-2" />
                  Profil Ayarları
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {showCreditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-card">
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Kredi Satın Al</h2>
                  {loadingUserData ? (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground">Kredi bilgileri yükleniyor...</p>
                    </div>
                  ) : (
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Mevcut Krediniz:{" "}
                        <span className="font-semibold text-primary">{credits.remaining.toLocaleString()}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Paket Kredisi:{" "}
                        <span className="font-medium text-foreground">{(user?.plan_credit || 0).toLocaleString()}</span>
                      </p>
                      <div className="text-xs text-muted-foreground">
                        <p>
                          Satın Alınan Krediler:{" "}
                          <span className="font-medium text-foreground">
                            {(user?.bought_credit || 0).toLocaleString()}
                          </span>
                        </p>
                        <p className="mt-0.5">
                          Bitiş Tarihi:{" "}
                          <span className="font-medium text-foreground">
                            {formatExpiryDate(user?.bought_credit_expiry_time || null)}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowCreditModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {loadingCredits || !selectedPackage ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Kredi paketleri yükleniyor...</p>
                </div>
              ) : (
                <>
                  <div className="mb-8 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Coins className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold text-foreground">
                            {selectedPackage.credits.toLocaleString()} Kredi
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Toplam kredilerinize aktarılır. Kullanım tarihi kısıtı bulunmaz.
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl sm:text-4xl font-bold text-primary">
                          ₺{selectedPackage.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Kredi başına: ₺{(selectedPackage.price / selectedPackage.credits).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 px-2">
                    <label className="text-sm font-medium text-foreground mb-4 block">Kredi Miktarı Seçin</label>
                    <div className="relative pt-2 pb-12">
                      <Slider
                        value={[selectedCreditIndex]}
                        onValueChange={(value) => setSelectedCreditIndex(value[0])}
                        max={creditOptions.length - 1}
                        step={1}
                        className="w-full"
                      />

                      <div className="absolute top-10 left-0 right-0 flex justify-between">
                        {creditOptions.map((option, index) => {
                          const isSelected = index === selectedCreditIndex
                          return (
                            <div key={option.id} className="flex flex-col items-center relative">
                              <div
                                className={`w-1 h-3 rounded-full transition-all ${
                                  isSelected ? "bg-primary h-4" : "bg-border"
                                }`}
                              />
                              <span
                                className={`text-xs mt-2 whitespace-nowrap transition-all font-medium ${
                                  isSelected ? "text-primary scale-110" : "text-muted-foreground"
                                }`}
                              >
                                {option.credits >= 1000 ? `${option.credits / 1000}k` : option.credits}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePurchaseCredit}
                    disabled={purchasingCredit}
                    className="w-full h-14 text-lg font-semibold shadow-lg"
                  >
                    {purchasingCredit ? "Stripe'a yönlendiriliyor..." : "Ekstra Kredi Al"}
                  </Button>

                  <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Not:</strong>
                      Krediler, işletme verisi çekme, mail gönderimi ve WhatsApp mesajı gönderimi gibi işlemlerde
                      kullanılır.
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
