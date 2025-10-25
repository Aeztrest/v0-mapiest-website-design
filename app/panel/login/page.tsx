"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, LogIn, UserPlus, CheckCircle, Mail } from "lucide-react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const countryCodes = [
  { code: "+90", country: "Türkiye", flag: "🇹🇷" },
  { code: "+1", country: "ABD", flag: "🇺🇸" },
  { code: "+44", country: "İngiltere", flag: "🇬🇧" },
  { code: "+49", country: "Almanya", flag: "🇩🇪" },
  { code: "+33", country: "Fransa", flag: "🇫🇷" },
  { code: "+39", country: "İtalya", flag: "🇮🇹" },
  { code: "+34", country: "İspanya", flag: "🇪🇸" },
  { code: "+31", country: "Hollanda", flag: "🇳🇱" },
  { code: "+32", country: "Belçika", flag: "🇧🇪" },
  { code: "+41", country: "İsviçre", flag: "🇨🇭" },
  { code: "+43", country: "Avusturya", flag: "🇦🇹" },
  { code: "+46", country: "İsveç", flag: "🇸🇪" },
  { code: "+47", country: "Norveç", flag: "🇳🇴" },
  { code: "+45", country: "Danimarka", flag: "🇩🇰" },
  { code: "+358", country: "Finlandiya", flag: "🇫🇮" },
  { code: "+7", country: "Rusya", flag: "🇷🇺" },
  { code: "+86", country: "Çin", flag: "🇨🇳" },
  { code: "+81", country: "Japonya", flag: "🇯🇵" },
  { code: "+82", country: "Güney Kore", flag: "🇰🇷" },
  { code: "+91", country: "Hindistan", flag: "🇮🇳" },
  { code: "+971", country: "BAE", flag: "🇦🇪" },
  { code: "+966", country: "Suudi Arabistan", flag: "🇸🇦" },
]

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")

  // Login state
  const [userCode, setUserCode] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    countryCode: "+90",
  })
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)

  // Şifremi unuttum state'leri
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!userCode || !password) {
      setError("Lütfen tüm alanları doldurun")
      setLoading(false)
      return
    }

    try {
      console.log("[v0] Giriş isteği gönderiliyor...")

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userCode, // userCode alanı email olarak kullanılıyor
          password: password,
        }),
      })

      console.log("[v0] API yanıtı alındı, status:", response.status)

      const data = await response.json()

      if (response.ok && data.access_token) {
        localStorage.setItem("mapiest_token", data.access_token)
        console.log("[v0] Token kaydedildi, kullanıcı bilgileri çekiliyor...")

        const userResponse = await fetch("/api/user/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        })

        if (userResponse.ok) {
          const userData = await userResponse.json()
          console.log("[v0] Kullanıcı bilgileri alındı:", userData)

          localStorage.setItem("mapiest_user", JSON.stringify(userData))

          // Dashboard'a yönlendir
          router.push("/panel/dashboard")
        } else {
          setError("Kullanıcı bilgileri alınamadı")
          setLoading(false)
        }
      } else if (response.status === 401) {
        setError("E-posta veya şifre hatalı")
        setLoading(false)
      } else if (response.status === 422) {
        if (data.detail && data.detail.length > 0) {
          setError(data.detail[0].msg)
        } else {
          setError("Giriş sırasında bir hata oluştu")
        }
        setLoading(false)
      } else {
        setError(data.error || data.detail || "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.")
        setLoading(false)
      }
    } catch (error) {
      console.error("[v0] API isteği hatası:", error)
      setError("Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.")
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    setLoading(true)

    // Form validasyonu
    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.phone ||
      !registerData.password
    ) {
      setError("Lütfen tüm alanları doldurun")
      setLoading(false)
      return
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerData.email)) {
      setError("Geçerli bir e-posta adresi girin")
      setLoading(false)
      return
    }

    const phoneRegex = /^[0-9]{7,15}$/
    if (!phoneRegex.test(registerData.phone.replace(/\s/g, ""))) {
      setError("Geçerli bir telefon numarası girin")
      setLoading(false)
      return
    }

    // Şifre uzunluğu kontrolü
    if (registerData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      setLoading(false)
      return
    }

    try {
      console.log("[v0] Kayıt isteği gönderiliyor...")

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerData.firstName,
          surname: registerData.lastName,
          email: registerData.email,
          phone_no: `${registerData.countryCode}${registerData.phone}`,
          password: registerData.password,
        }),
      })

      console.log("[v0] API yanıtı alındı, status:", response.status)

      const data = await response.json()

      if (response.status === 201) {
        // Başarılı kayıt
        console.log("[v0] Kayıt başarılı, kullanıcı verisi:", data)

        setSuccessMessage("Kayıt tamamlandı! Lütfen e-posta adresinizi kontrol edin ve hesabınızı doğrulayın.")
        setLoading(false)

        // 3 saniye sonra login tab'ına geç
        setTimeout(() => {
          setActiveTab("login")
          setSuccessMessage("")
          // Kayıt formunu temizle
          setRegisterData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            countryCode: "+90",
          })
        }, 3000)
      } else if (response.status === 422) {
        // Validasyon hatası
        if (data.detail && data.detail.length > 0) {
          setError(data.detail[0].msg)
        } else {
          setError("Kayıt sırasında bir hata oluştu")
        }
        setLoading(false)
      } else {
        // Diğer hatalar
        console.log("[v0] Beklenmeyen hata, status:", response.status)
        setError(data.error || data.detail || "Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.")
        setLoading(false)
      }
    } catch (error) {
      console.error("[v0] API isteği hatası:", error)
      setError("Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.")
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotPasswordMessage(null)
    setForgotPasswordLoading(true)

    if (!forgotPasswordEmail) {
      setForgotPasswordMessage({ type: "error", text: "Lütfen e-posta adresinizi girin" })
      setForgotPasswordLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(forgotPasswordEmail)) {
      setForgotPasswordMessage({ type: "error", text: "Geçerli bir e-posta adresi girin" })
      setForgotPasswordLoading(false)
      return
    }

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotPasswordEmail,
        }),
      })

      if (response.ok) {
        setForgotPasswordMessage({
          type: "success",
          text: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin.",
        })
        setForgotPasswordEmail("")

        // 3 saniye sonra modal'ı kapat
        setTimeout(() => {
          setShowForgotPasswordModal(false)
          setForgotPasswordMessage(null)
        }, 3000)
      } else {
        const data = await response.json()
        setForgotPasswordMessage({
          type: "error",
          text: data.error || data.detail || "Şifre sıfırlama isteği gönderilemedi. Lütfen tekrar deneyin.",
        })
      }
    } catch (error) {
      console.error("[v0] Şifremi unuttum hatası:", error)
      setForgotPasswordMessage({
        type: "error",
        text: "Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.",
      })
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-4">
            <Image src="/mapiest-logo.gif" alt="Mapiest Logo" width={200} height={60} className="h-12 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold">Yönetim Paneli</CardTitle>
          <CardDescription>
            {activeTab === "login"
              ? "Mapiest platformuna giriş yapmak için kullanıcı kodunuzu ve şifrenizi girin"
              : "Mapiest platformuna kayıt olmak için bilgilerinizi girin"}
          </CardDescription>

          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login")
                setError("")
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Giriş Yap
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register")
                setError("")
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === "register"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Kayıt Ol
            </button>
          </div>
        </CardHeader>
        <CardContent>
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userCode">E-posta Adresi</Label>
                <Input
                  id="userCode"
                  type="email"
                  placeholder="ornek@email.com"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  disabled={loading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrenizi girin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Dialog open={showForgotPasswordModal} onOpenChange={setShowForgotPasswordModal}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={() => {
                        setShowForgotPasswordModal(true)
                        setForgotPasswordMessage(null)
                        setForgotPasswordEmail("")
                      }}
                    >
                      Şifremi Unuttum?
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Şifre Sıfırlama</DialogTitle>
                      <DialogDescription>
                        E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="forgotPasswordEmail">E-posta Adresi</Label>
                        <Input
                          id="forgotPasswordEmail"
                          type="email"
                          placeholder="ornek@email.com"
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          disabled={forgotPasswordLoading}
                          className="h-11"
                        />
                      </div>

                      {forgotPasswordMessage && (
                        <Alert
                          variant={forgotPasswordMessage.type === "error" ? "destructive" : "default"}
                          className={
                            forgotPasswordMessage.type === "success"
                              ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                              : ""
                          }
                        >
                          {forgotPasswordMessage.type === "success" && (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          )}
                          <AlertDescription
                            className={
                              forgotPasswordMessage.type === "success" ? "text-green-800 dark:text-green-200" : ""
                            }
                          >
                            {forgotPasswordMessage.text}
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button type="submit" className="w-full h-11" disabled={forgotPasswordLoading}>
                        {forgotPasswordLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 mr-2" />
                            Şifre Sıfırlama Bağlantısı Gönder
                          </>
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Giriş Yap
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Hesabınız yok mu? Kayıt Ol sekmesine geçin</p>
              </div>
            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">İsim</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="İsminiz"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                    disabled={loading}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyisim</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Soyisminiz"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    disabled={loading}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  disabled={loading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon Numarası</Label>
                <div className="flex gap-2">
                  <Select
                    value={registerData.countryCode}
                    onValueChange={(value) => setRegisterData({ ...registerData, countryCode: value })}
                    disabled={loading}
                  >
                    <SelectTrigger className="w-[140px] h-11">
                      <SelectValue>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {countryCodes.find((c) => c.code === registerData.countryCode)?.flag}
                          </span>
                          <span className="text-sm">{registerData.countryCode}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{country.flag}</span>
                            <span className="text-sm">{country.code}</span>
                            <span className="text-xs text-muted-foreground">{country.country}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="5551234567"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value.replace(/\D/g, "") })}
                    disabled={loading}
                    className="h-11 flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registerPassword">Şifre</Label>
                <div className="relative">
                  <Input
                    id="registerPassword"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="En az 6 karakter"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    disabled={loading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {successMessage && (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-200">{successMessage}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full h-11" disabled={loading}>
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Kayıt yapılıyor...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Kayıt Ol
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Kayıt olarak kullanım şartlarını kabul etmiş olursunuz</p>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
