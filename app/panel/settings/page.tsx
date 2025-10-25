"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  User,
  Mail,
  Lock,
  CreditCard,
  Shield,
  CheckCircle2,
  TrendingUp,
  Phone,
  Loader2,
  XCircle,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "next/navigation"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "https://mehmetback.mapiest.com"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    if (searchParams.get("linked") === "1") {
      toast({
        title: "Başarılı",
        description: "Facebook hesabınız başarıyla bağlandı!",
      })
      // URL'den query parametresini temizle
      window.history.replaceState({}, "", "/panel/settings")
    }
  }, [searchParams, toast])

  const [user, setUser] = useState<{
    id: number
    name: string
    surname: string
    email: string
    plan: string
    plan_id?: number
    plan_cancel_req?: boolean // plan_cancel_req field'ı eklendi
    credit: number
    is_email_verified: boolean
  } | null>(null)

  const [editName, setEditName] = useState("")
  const [editSurname, setEditSurname] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [subscriptionLoading, setSubscriptionLoading] = useState(false)
  const [subscriptionResult, setSubscriptionResult] = useState<{
    ok: boolean
    email: string
    subscription_id: string
    status: string
    cancel_at_period_end: boolean
    current_period_end: string
    message: string
  } | null>(null)
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false)

  const [smtpSettings, setSmtpSettings] = useState({
    smtp_server: "smtp.gmail.com",
    smtp_port: 587,
    smtp_email: "",
    smtp_password: "",
    display_name: "Mapiest",
  })
  const [smtpLoading, setSmtpLoading] = useState(false)

  const [whatsappStep, setWhatsappStep] = useState(0)
  const [wabaList, setWabaList] = useState<Array<{ id: string; name: string }>>([])
  const [selectedWaba, setSelectedWaba] = useState<string | null>(null)
  const [phoneList, setPhoneList] = useState<
    Array<{
      id: string
      display_phone_number: string
      verified_name: string
      code_verification_status: string
    }>
  >([])
  const [selectedPhone, setSelectedPhone] = useState<{
    id: string
    display_phone_number: string
    verified_name: string
  } | null>(null)
  const [wabaLoading, setWabaLoading] = useState(false)
  const [phoneLoading, setPhoneLoading] = useState(false)

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) return

      const response = await fetch(`${API_BASE}/users/me`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) return

      const userData = await response.json()
      setUser(userData)
      localStorage.setItem("mapiest_user", JSON.stringify(userData))
      setEditName(userData.name || "")
      setEditSurname(userData.surname || "")
      setEditEmail(userData.email || "")
    } catch (error) {
      console.error("[v0] Fetch user info error:", error)
    }
  }

  useEffect(() => {
    fetchUserInfo()

    const savedSmtpSettings = localStorage.getItem("mapiest_smtp_settings")
    if (savedSmtpSettings) {
      setSmtpSettings(JSON.parse(savedSmtpSettings))
    }
  }, [])

  const handleSubscriptionAction = async () => {
    if (user?.plan_cancel_req) {
      // Plan iptal edilmiş, devam ettir
      await handleResumeSubscription()
    } else {
      // Plan aktif, iptal et
      await handleCancelSubscription()
    }
    // İşlem sonrası kullanıcı bilgilerini güncelle
    await fetchUserInfo()
  }

  const handleCancelSubscription = async () => {
    setSubscriptionLoading(true)
    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        toast({
          title: "Hata",
          description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`${API_BASE}/stripe/subscription/cancel-subscription`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Abonelik iptal edilemedi")
      }

      setSubscriptionResult(data)
      setShowSubscriptionDialog(true)
    } catch (error) {
      console.error("[v0] Cancel subscription error:", error)
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Abonelik iptal edilirken bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setSubscriptionLoading(false)
    }
  }

  const handleResumeSubscription = async () => {
    setSubscriptionLoading(true)
    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        toast({
          title: "Hata",
          description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`${API_BASE}/stripe/subscription/resume-subscription`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Abonelik devam ettirilemedi")
      }

      setSubscriptionResult(data)
      setShowSubscriptionDialog(true)
    } catch (error) {
      console.error("[v0] Resume subscription error:", error)
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Abonelik devam ettirilirken bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setSubscriptionLoading(false)
    }
  }

  const hasActivePlan = () => {
    const activePlans = ["Enterprise Paket", "Agency Paket", "Business Paket"]
    return user?.plan && activePlans.includes(user.plan)
  }

  const handleUpdateProfile = () => {
    setError("")
    setSuccess("")

    if (!editName || !editSurname || !editEmail) {
      setError("Lütfen tüm alanları doldurun")
      return
    }

    const updatedUser = {
      ...user,
      name: editName,
      surname: editSurname,
      email: editEmail,
    }
    setUser(updatedUser)
    localStorage.setItem("mapiest_user", JSON.stringify(updatedUser))

    setSuccess("Profil bilgileriniz başarıyla güncellendi")
  }

  const handleChangePassword = () => {
    setError("")
    setSuccess("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Lütfen tüm şifre alanlarını doldurun")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Yeni şifreler eşleşmiyor")
      return
    }

    if (newPassword.length < 6) {
      setError("Yeni şifre en az 6 karakter olmalıdır")
      return
    }

    setSuccess("Şifreniz başarıyla değiştirildi")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSaveSmtpSettings = async () => {
    setError("")
    setSuccess("")

    if (
      !smtpSettings.smtp_server ||
      !smtpSettings.smtp_email ||
      !smtpSettings.smtp_password ||
      !smtpSettings.display_name
    ) {
      setError("Lütfen tüm mail ayarlarını doldurun")
      return
    }

    if (smtpSettings.smtp_port < 1 || smtpSettings.smtp_port > 65535) {
      setError("Geçerli bir port numarası girin (1-65535)")
      return
    }

    setSmtpLoading(true)

    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        setError("Oturum bulunamadı. Lütfen tekrar giriş yapın.")
        setSmtpLoading(false)
        return
      }

      const response = await fetch("/api/smtp/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...smtpSettings,
          token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "SMTP ayarları kaydedilemedi")
        setSmtpLoading(false)
        return
      }

      localStorage.setItem("mapiest_smtp_settings", JSON.stringify(smtpSettings))
      setSuccess(data.message || "Mail ayarları başarıyla kaydedildi")
    } catch (error) {
      console.error("SMTP settings error:", error)
      setError("Mail ayarları kaydedilirken bir hata oluştu")
    } finally {
      setSmtpLoading(false)
    }
  }

  const handleFacebookConnect = async () => {
    if (!user?.id) {
      toast({
        title: "Hata",
        description: "Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.",
        variant: "destructive",
      })
      return
    }

    const token = localStorage.getItem("mapiest_token")
    if (!token) {
      toast({
        title: "Hata",
        description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/facebook/login?app_user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Facebook bağlantısı başlatılamadı")
      }

      window.location.href = data.url
    } catch (error) {
      console.error("[v0] Facebook connect error:", error)
      toast({
        title: "Hata",
        description: "Facebook bağlantısı başlatılırken bir hata oluştu",
        variant: "destructive",
      })
    }
  }

  const fetchWabaList = async () => {
    setWabaLoading(true)
    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        toast({
          title: "Hata",
          description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive",
        })
        setWabaLoading(false)
        return
      }

      const response = await fetch(`${API_BASE}/whatsapp/waba-ids`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("WABA listesi alınamadı")
      }

      const data = await response.json()
      setWabaList(data.wabas || [])
      setWhatsappStep(1)
    } catch (error) {
      console.error("[v0] WABA fetch error:", error)
      toast({
        title: "Hata",
        description: "WABA listesi alınırken bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setWabaLoading(false)
    }
  }

  const handleSelectWaba = async (wabaId: string) => {
    setSelectedWaba(wabaId)
    setPhoneLoading(true)

    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        toast({
          title: "Hata",
          description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive",
        })
        setPhoneLoading(false)
        return
      }

      const response = await fetch(`${API_BASE}/whatsapp/waba/${wabaId}/phone-numbers`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Telefon listesi alınamadı")
      }

      const data = await response.json()
      setPhoneList(data.numbers || [])
      setWhatsappStep(2)
    } catch (error) {
      console.error("[v0] Phone list fetch error:", error)
      toast({
        title: "Hata",
        description: "Telefon listesi alınırken bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setPhoneLoading(false)
    }
  }

  const handleSelectPhone = async (phone: (typeof phoneList)[0]) => {
    setSelectedPhone(phone)

    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        toast({
          title: "Hata",
          description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
          variant: "destructive",
        })
        return
      }

      const response = await fetch(`${API_BASE}/whatsapp/set-waba-and-number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          waba_id: selectedWaba,
          phone_number_id: phone.id,
        }),
      })

      if (!response.ok) {
        throw new Error("WABA ve telefon kaydedilemedi")
      }

      setWhatsappStep(3)
      toast({
        title: "Başarılı",
        description: "Telefon numarası başarıyla bağlandı!",
      })
    } catch (error) {
      console.error("[v0] Set WABA and phone error:", error)
      toast({
        title: "Uyarı",
        description: "Telefon seçimi kaydedilemedi, ancak devam edebilirsiniz",
        variant: "destructive",
      })
      setWhatsappStep(3)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Ayarlar</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Profil bilgilerinizi ve hesap ayarlarınızı yönetin</p>
      </div>

      {success && (
        <Alert className="bg-success/10 border-success">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <AlertDescription className="text-success">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Dialog open={showSubscriptionDialog} onOpenChange={setShowSubscriptionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {subscriptionResult?.cancel_at_period_end ? (
                <XCircle className="w-5 h-5 text-destructive" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-success" />
              )}
              Abonelik İşlemi
            </DialogTitle>
            <DialogDescription>İşlem başarıyla tamamlandı</DialogDescription>
          </DialogHeader>
          {subscriptionResult && (
            <div className="space-y-4">
              <Alert
                className={
                  subscriptionResult.cancel_at_period_end
                    ? "bg-destructive/10 border-destructive"
                    : "bg-success/10 border-success"
                }
              >
                <AlertDescription
                  className={subscriptionResult.cancel_at_period_end ? "text-destructive" : "text-success"}
                >
                  {subscriptionResult.message}
                </AlertDescription>
              </Alert>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">E-posta:</span>
                  <span className="font-medium">{subscriptionResult.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Abonelik ID:</span>
                  <span className="font-mono text-xs">{subscriptionResult.subscription_id}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Durum:</span>
                  <Badge variant={subscriptionResult.status === "active" ? "default" : "secondary"}>
                    {subscriptionResult.status}
                  </Badge>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Dönem Bitiş Tarihi:</span>
                  <span className="font-medium">
                    {new Date(subscriptionResult.current_period_end).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowSubscriptionDialog(false)} className="w-full">
              Tamam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Sol Taraf - Profil Bilgileri */}
        <div className="space-y-6">
          {/* Kullanıcı Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profil Bilgileri
              </CardTitle>
              <CardDescription>Kişisel bilgilerinizi görüntüleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">İsim</Label>
                <Input id="name" value={editName} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="surname">Soyisim</Label>
                <Input id="surname" value={editSurname} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" value={editEmail} disabled className="pl-10 bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Şifre Değiştirme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Şifre Değiştir
              </CardTitle>
              <CardDescription>Hesap güvenliğiniz için şifrenizi güncelleyin</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Lock className="w-4 h-4 mr-2" />
                    Şifre Değiştir
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Şifre Değiştir</DialogTitle>
                    <DialogDescription>Yeni şifrenizi girin ve onaylayın</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Yeni Şifre</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleChangePassword}>Şifreyi Değiştir</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    WhatsApp Onboarding
                  </CardTitle>
                  <CardDescription>Facebook ile bağlan ve telefon numaranı seç</CardDescription>
                </div>
                {whatsappStep === 0 && (
                  <Button onClick={handleFacebookConnect} className="bg-primary hover:bg-primary/90">
                    Facebook ile Bağlan
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Başlangıç durumu */}
              {whatsappStep === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    WhatsApp Business hesabınızı bağlamak için Facebook ile giriş yapın
                  </p>
                  <Button
                    onClick={fetchWabaList}
                    variant="outline"
                    className="mt-4 bg-transparent"
                    disabled={wabaLoading}
                  >
                    {wabaLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      "WABA Listesini Göster"
                    )}
                  </Button>
                </div>
              )}

              {/* Adım 1: WABA Seç */}
              {whatsappStep >= 1 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <h3 className="font-semibold">WABA Seç</h3>
                  </div>
                  {wabaLoading ? (
                    <div className="grid grid-cols-2 gap-3">
                      <Skeleton className="h-20 rounded-xl" />
                      <Skeleton className="h-20 rounded-xl" />
                    </div>
                  ) : wabaList.length === 0 ? (
                    <Alert>
                      <AlertDescription>WABA bulunamadı. Lütfen Facebook ile bağlanın.</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {wabaList.map((waba) => (
                        <Button
                          key={waba.id}
                          variant={selectedWaba === waba.id ? "default" : "outline"}
                          className="h-auto py-4 flex flex-col items-start rounded-xl"
                          onClick={() => handleSelectWaba(waba.id)}
                          disabled={phoneLoading}
                        >
                          <span className="text-xs text-muted-foreground">{waba.id}</span>
                          <span className="font-semibold">{waba.name}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Adım 2: Telefon Numarası Seç */}
              {whatsappStep >= 2 && whatsappStep < 3 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <h3 className="font-semibold">Telefon Numarası Seç</h3>
                  </div>
                  {phoneLoading ? (
                    <Skeleton className="h-40 rounded-xl" />
                  ) : phoneList.length === 0 ? (
                    <Alert>
                      <AlertDescription>Telefon numarası bulunamadı</AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <div className="border rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="text-left p-3">Numara</th>
                              <th className="text-left p-3">İsim</th>
                              <th className="text-left p-3">Durum</th>
                              <th className="text-right p-3">Seç</th>
                            </tr>
                          </thead>
                          <tbody>
                            {phoneList.map((phone) => (
                              <tr key={phone.id} className="border-t hover:bg-muted/50">
                                <td className="p-3">{phone.display_phone_number}</td>
                                <td className="p-3">{phone.verified_name}</td>
                                <td className="p-3">
                                  <Badge
                                    variant={phone.code_verification_status === "VERIFIED" ? "default" : "secondary"}
                                  >
                                    {phone.code_verification_status}
                                  </Badge>
                                </td>
                                <td className="p-3 text-right">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleSelectPhone(phone)}
                                    disabled={selectedPhone?.id === phone.id}
                                  >
                                    {selectedPhone?.id === phone.id ? "Seçildi" : "Seç"}
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {selectedPhone && (
                        <Alert className="rounded-xl">
                          <Phone className="w-4 h-4" />
                          <AlertDescription>Seçilen: {selectedPhone.display_phone_number}</AlertDescription>
                        </Alert>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Adım 3: Başarı - Bağlı Telefon Numarası */}
              {whatsappStep >= 3 && selectedPhone && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-success">Telefon numarası bağlandı!</h3>
                  </div>
                  <Alert className="bg-success/10 border-success rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <AlertDescription className="text-success text-sm space-y-1">
                      <div className="font-semibold">Bağlı Telefon Numarası:</div>
                      <div>{selectedPhone.display_phone_number}</div>
                      <div className="text-xs opacity-80">İsim: {selectedPhone.verified_name}</div>
                      <div className="text-xs opacity-80">Phone ID: {selectedPhone.id}</div>
                      <div className="text-xs opacity-80">WABA ID: {selectedWaba}</div>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sağ Taraf - Abonelik Bilgileri */}
        <div className="space-y-6">
          {/* Abonelik Planı */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Abonelik Planı
              </CardTitle>
              <CardDescription>Mevcut paket bilgileriniz ve kullanım hakları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paket</p>
                  <p className="text-xl font-bold">{user?.plan || "Default Plan"}</p>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">
                  {user?.is_email_verified ? "Aktif" : "Beklemede"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Kalan Kredi</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Shield className="w-4 h-4 text-primary" />
                    <p className="font-medium">{user?.credit?.toLocaleString() || 0}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-posta Durumu</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{user?.is_email_verified ? "Doğrulandı" : "Beklemede"}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-card rounded-lg border">
                <p className="text-sm text-muted-foreground mb-2">Hesap Bilgileri</p>
                <p className="text-lg font-bold">{user ? `${user.name} ${user.surname}` : "Yükleniyor..."}</p>
                <p className="text-sm text-muted-foreground mt-1">{user?.email || ""}</p>
              </div>

              {hasActivePlan() && (
                <Button
                  variant="outline"
                  className={`w-full bg-transparent ${
                    user?.plan_cancel_req
                      ? "border-success text-success hover:bg-success hover:text-success-foreground"
                      : "border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  }`}
                  onClick={handleSubscriptionAction}
                  disabled={subscriptionLoading}
                >
                  {subscriptionLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : user?.plan_cancel_req ? (
                    <PlayCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  {user?.plan_cancel_req ? "Planı Devam Ettir" : "Planı İptal Et"}
                </Button>
              )}

              <Button asChild className="w-full">
                <Link href="/pricing">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Planı Yükselt
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Paket Özellikleri */}
          <Card>
            <CardHeader>
              <CardTitle>Paket Özellikleri</CardTitle>
              <CardDescription>{user?.plan || "Default Plan"} paketi ile sahip olduğunuz özellikler</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "İşletme verisi çekme",
                  "Mail gönderimi",
                  "WhatsApp mesajı",
                  "AI destekli metin düzenleyici",
                  "Gelişmiş raporlama ve analiz",
                  "Müşteri desteği",
                  "API erişimi",
                  "Veri dışa aktarma",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
