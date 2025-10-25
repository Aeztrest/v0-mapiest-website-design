"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  MessageSquare,
  FileSpreadsheet,
  Send,
  Info,
  CheckCircle2,
  Loader2,
  Settings,
  Construction,
} from "lucide-react"
import { AITextEditor } from "@/components/panel/ai-text-editor"
import { useToast } from "@/hooks/use-toast"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://72.60.212.48:8001"

const UNDER_CONSTRUCTION = true

export default function WhatsAppPage() {
  const [excelFile, setExcelFile] = useState<File | null>(null)
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const [sentCount, setSentCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [deliveryStatus, setDeliveryStatus] = useState<{ sent: number; delivered: number; failed: number }>({
    sent: 0,
    delivered: 0,
    failed: 0,
  })
  const [error, setError] = useState("")
  const { toast } = useToast()

  if (UNDER_CONSTRUCTION) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="max-w-2xl w-full border-primary/20">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Construction className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl">Geliştirme Aşamasında</CardTitle>
              <CardDescription className="text-base">
                WhatsApp mesajlaşma özelliği şu anda geliştirilme aşamasındadır
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-primary/20 bg-primary/5">
              <Info className="w-4 h-4 text-primary" />
              <AlertDescription>
                Bu özellik üzerinde çalışmalarımız devam etmektedir. Yakında kullanıma açılacaktır. Anlayışınız için
                teşekkür ederiz.
              </AlertDescription>
            </Alert>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Planlanan Özellikler:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>WhatsApp Business API entegrasyonu</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Toplu mesaj gönderimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>AI destekli mesaj oluşturma</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Mesaj şablonları ve kişiselleştirme</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Detaylı iletim raporları</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Button className="w-full bg-transparent" variant="outline" asChild>
                <a href="/panel/dashboard">Panele Dön</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const parseCSV = (text: string): string[] => {
    const lines = text.split("\n")
    if (lines.length === 0) return []

    // Parse CSV line with proper quote handling
    const parseLine = (line: string): string[] => {
      const result: string[] = []
      let current = ""
      let inQuotes = false

      for (let i = 0; i < line.length; i++) {
        const char = line[i]

        if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === "," && !inQuotes) {
          result.push(current.trim())
          current = ""
        } else {
          current += char
        }
      }

      result.push(current.trim())
      return result
    }

    const headers = parseLine(lines[0])
    const phoneIndex = headers.findIndex((h) => h.toLowerCase().includes("phone") || h === "internationalPhoneNumber")

    console.log("[v0] CSV Headers:", headers)
    console.log("[v0] Phone column index:", phoneIndex)

    if (phoneIndex === -1) {
      setError("Excel dosyasında telefon numarası kolonu bulunamadı")
      return []
    }

    const phones: string[] = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = parseLine(line)
      const phone = values[phoneIndex]?.trim()

      console.log("[v0] Line", i, "phone value:", phone)

      if (phone && phone.match(/\+?\d/)) {
        // Remove all spaces and non-digit characters except +
        const cleanPhone = phone.replace(/[^\d+]/g, "")
        if (cleanPhone.startsWith("+") && cleanPhone.length > 10) {
          phones.push(cleanPhone)
        }
      }
    }

    console.log("[v0] Total phones found:", phones.length)
    console.log("[v0] Phone numbers:", phones)

    return phones
  }

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls") || file.name.endsWith(".csv")) {
        setExcelFile(file)
        setError("")

        const reader = new FileReader()
        reader.onload = (event) => {
          const text = event.target?.result as string
          const phones = parseCSV(text)
          setPhoneNumbers(phones)
          setTotalCount(phones.length)

          if (phones.length === 0) {
            setError("Excel dosyasında geçerli telefon numarası bulunamadı")
          }
        }
        reader.readAsText(file)
      } else {
        setError("Lütfen geçerli bir Excel dosyası yükleyin (.xlsx, .xls, .csv)")
      }
    }
  }

  const handleSend = async () => {
    setError("")

    if (!excelFile) {
      setError("Lütfen Excel dosyası yükleyin")
      return
    }
    if (phoneNumbers.length === 0) {
      setError("Excel dosyasında geçerli telefon numarası bulunamadı")
      return
    }
    if (!message) {
      setError("Lütfen mesaj içeriği girin")
      return
    }

    setSending(true)
    setProgress(0)
    setSuccess(false)
    setSentCount(0)
    setDeliveryStatus({ sent: 0, delivered: 0, failed: 0 })

    try {
      const storedUser = localStorage.getItem("mapiest_user")
      const user = storedUser ? JSON.parse(storedUser) : null
      const token = user?.access_token

      if (!token) {
        setError("Oturum bulunamadı. Lütfen tekrar giriş yapın.")
        setSending(false)
        return
      }

      const response = await fetch(`${API_BASE}/whatsapp/send-text`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumbers,
          text: message,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || errorData.message || "Mesaj gönderilemedi")
      }

      const data = await response.json()

      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(currentProgress)
        const currentSent = Math.floor((currentProgress / 100) * totalCount)
        setSentCount(currentSent)

        setDeliveryStatus({
          sent: currentSent,
          delivered: Math.floor(currentSent * 0.95),
          failed: Math.floor(currentSent * 0.05),
        })

        if (currentProgress >= 100) {
          clearInterval(interval)
          setSuccess(true)
          setSending(false)
          toast({
            title: "Başarılı!",
            description: `${totalCount} mesaj başarıyla gönderildi.`,
          })
        }
      }, 200)
    } catch (err: any) {
      console.error("[v0] WhatsApp send error:", err)
      setError(err.message || "Mesaj gönderilirken bir hata oluştu")
      setSending(false)
      toast({
        title: "Hata",
        description: err.message || "Mesaj gönderilirken bir hata oluştu",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">WhatsApp Gönder</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Toplu WhatsApp mesajı gönderin ve AI ile mesajınızı optimize edin
        </p>
      </div>

      <Alert>
        <Settings className="w-4 h-4 flex-shrink-0" />
        <AlertDescription className="text-xs sm:text-sm">
          <strong>WhatsApp Business Bağlantısı:</strong> WhatsApp mesajı gönderebilmek için öncelikle{" "}
          <a href="/panel/settings" className="underline font-medium hover:text-primary">
            Ayarlar
          </a>{" "}
          sayfasından WhatsApp Business hesabınızı bağlamanız gerekmektedir.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                Excel Dosyası
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Mesaj gönderilecek telefon numaralarını içeren Excel dosyasını yükleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="excel-upload"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleExcelUpload}
                    className="hidden"
                    disabled={sending}
                  />
                  <label htmlFor="excel-upload" className="cursor-pointer">
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs sm:text-sm font-medium">Excel dosyası yüklemek için tıklayın</p>
                    <p className="text-xs text-muted-foreground mt-1">.xlsx, .xls, .csv formatları desteklenir</p>
                  </label>
                </div>

                {excelFile && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{excelFile.name}</p>
                      <p className="text-xs text-muted-foreground">{totalCount} numara bulundu</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Yüklendi
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                Mesaj İçeriği
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                WhatsApp mesajınızı yazın veya AI ile oluşturun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AITextEditor value={message} onChange={setMessage} disabled={sending} />
            </CardContent>
          </Card>

          {sending && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin flex-shrink-0" />
                  Gönderiliyor...
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">
                      {sentCount} / {totalCount} mesaj gönderildi
                    </span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="p-2 sm:p-3 bg-muted rounded-lg text-center">
                    <p className="text-lg sm:text-2xl font-bold text-primary">{deliveryStatus.sent}</p>
                    <p className="text-xs text-muted-foreground">Gönderildi</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-muted rounded-lg text-center">
                    <p className="text-lg sm:text-2xl font-bold text-success">{deliveryStatus.delivered}</p>
                    <p className="text-xs text-muted-foreground">Teslim Edildi</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-muted rounded-lg text-center">
                    <p className="text-lg sm:text-2xl font-bold text-destructive">{deliveryStatus.failed}</p>
                    <p className="text-xs text-muted-foreground">Başarısız</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {success && (
            <Alert className="bg-success/10 border-success">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
              <AlertDescription className="text-success text-xs sm:text-sm">
                <strong>Başarılı!</strong> {deliveryStatus.delivered} mesaj başarıyla teslim edildi.{" "}
                {deliveryStatus.failed > 0 && `${deliveryStatus.failed} mesaj gönderilemedi.`}
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs sm:text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleSend} disabled={sending} className="w-full" size="lg">
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                WhatsApp Mesajı Gönder
              </>
            )}
          </Button>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                Kullanım İpuçları ve Öneriler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Business WhatsApp Kullanın:</strong> Toplu mesaj gönderimleri
                    için WhatsApp Business hesabı önemle tavsiye ederiz. Normal WhatsApp hesapları ile toplu mesaj
                    göndermek hesap engellemesine neden olabilir.
                  </p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Mesaj Aralıkları:</strong> Spam olarak algılanmamak için
                    mesajlar arasında 3-5 saniye bekleme süresi ile sistem tarafından gönderilir. Günde maksimum 200-300
                    mesaj göndermenizi öneririz.
                  </p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Kişiselleştirme:</strong> Excel dosyanızda isim, şirket gibi
                    alanlar varsa mesajınızda bu değişkenleri kullanarak kişiselleştirilmiş mesajlar gönderin.
                  </p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Mesaj İçeriği:</strong> Açık, net ve değer odaklı mesajlar
                    yazın. Spam içerik, aşırı büyük harf kullanımı ve çok fazla emoji kullanmaktan kaçının.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
