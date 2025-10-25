"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileSpreadsheet, Send, Info, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { AITextEditor } from "@/components/panel/ai-text-editor"
import { Input } from "@/components/ui/input"

export default function MailPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [queuedCount, setQueuedCount] = useState(0)
  const [emailAddresses, setEmailAddresses] = useState<string[]>([])
  const [error, setError] = useState("")

  const parseCSV = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string
          console.log("[v0] CSV content preview:", text.substring(0, 500))

          const lines = text.split("\n").filter((line) => line.trim())
          if (lines.length === 0) {
            reject(new Error("CSV dosyası boş"))
            return
          }

          // Detect delimiter (comma, semicolon, or tab)
          const firstLine = lines[0]
          let delimiter = ","
          if (firstLine.includes(";")) delimiter = ";"
          else if (firstLine.includes("\t")) delimiter = "\t"

          console.log("[v0] Detected delimiter:", delimiter === "," ? "comma" : delimiter === ";" ? "semicolon" : "tab")

          // Parse CSV with proper quoted value handling
          const parseCSVLine = (line: string): string[] => {
            const result: string[] = []
            let current = ""
            let inQuotes = false

            for (let i = 0; i < line.length; i++) {
              const char = line[i]

              if (char === '"') {
                inQuotes = !inQuotes
              } else if (char === delimiter && !inQuotes) {
                result.push(current.trim())
                current = ""
              } else {
                current += char
              }
            }
            result.push(current.trim())
            return result
          }

          // Parse header
          const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/"/g, ""))
          console.log("[v0] Headers found:", headers)

          const emailIndex = headers.findIndex((h) => h === "email" || h.includes("email") || h.includes("e-mail"))
          console.log("[v0] Email column index:", emailIndex)

          if (emailIndex === -1) {
            reject(new Error("CSV dosyasında 'email' sütunu bulunamadı. Bulunan sütunlar: " + headers.join(", ")))
            return
          }

          // Extract emails
          const emails: string[] = []
          for (let i = 1; i < lines.length; i++) {
            const columns = parseCSVLine(lines[i])
            const email = columns[emailIndex]?.trim().replace(/"/g, "")

            // Validate email
            if (email && email.includes("@") && email.includes(".")) {
              emails.push(email)
            }
          }

          console.log("[v0] Parsed emails:", emails.length)
          console.log("[v0] Sample emails:", emails.slice(0, 3))

          if (emails.length === 0) {
            reject(new Error("CSV dosyasında geçerli email adresi bulunamadı"))
            return
          }

          resolve(emails)
        } catch (err) {
          console.error("[v0] CSV parse error:", err)
          reject(err)
        }
      }
      reader.onerror = () => reject(new Error("Dosya okunamadı"))
      reader.readAsText(file)
    })
  }

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.name.endsWith(".csv")) {
        setCsvFile(file)
        setError("")
        try {
          const emails = await parseCSV(file)
          setEmailAddresses(emails)
          console.log("[v0] Successfully parsed", emails.length, "emails")
        } catch (err) {
          setError(err instanceof Error ? err.message : "CSV dosyası parse edilemedi")
          setCsvFile(null)
          setEmailAddresses([])
        }
      } else {
        setError("Lütfen geçerli bir CSV dosyası yükleyin (.csv)")
      }
    }
  }

  const handleSend = async () => {
    setError("")
    setSuccess(false)

    if (!csvFile || emailAddresses.length === 0) {
      setError("Lütfen geçerli bir CSV dosyası yükleyin")
      return
    }
    if (!subject || !message) {
      setError("Lütfen konu ve mesaj alanlarını doldurun")
      return
    }

    const token = localStorage.getItem("mapiest_token")
    if (!token) {
      setError("Oturum bulunamadı. Lütfen tekrar giriş yapın.")
      return
    }

    setSending(true)

    try {
      const response = await fetch("/api/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail_title: subject,
          message: message,
          email_address: emailAddresses,
          token: token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Mail gönderilemedi")
      }

      if (data.ok) {
        setSuccess(true)
        setQueuedCount(data.queued || emailAddresses.length)
      } else {
        throw new Error(data.detail || "Mail gönderilemedi")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mail gönderilemedi")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Mail Gönder</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          CSV dosyasından toplu mail gönderimi yapın ve AI ile mesajınızı optimize edin
        </p>
      </div>

      {/* Bilgi Kutusu */}
      <Alert>
        <Info className="w-4 h-4" />
        <AlertDescription>
          <strong>CSV Formatı:</strong> CSV dosyanızda "email" sütunu bulunmalıdır. Veri çekme işleminden aldığınız CSV
          dosyalarını doğrudan kullanabilirsiniz.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Sol Taraf - Dosya Yükleme */}
        <div className="space-y-6">
          {/* CSV Yükleme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" />
                CSV Dosyası
              </CardTitle>
              <CardDescription>
                Mail gönderilecek kişilerin email adreslerini içeren CSV dosyasını yükleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="csv-upload"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="hidden"
                    disabled={sending}
                  />
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">CSV dosyası yüklemek için tıklayın</p>
                    <p className="text-xs text-muted-foreground mt-1">.csv formatı desteklenir</p>
                  </label>
                </div>

                {csvFile && emailAddresses.length > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{csvFile.name}</p>
                      <p className="text-xs text-muted-foreground">{emailAddresses.length} email adresi bulundu</p>
                    </div>
                    <Badge variant="secondary">Yüklendi</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Taraf - Mesaj İçeriği */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mesaj İçeriği</CardTitle>
              <CardDescription>Mail konusu ve mesaj içeriğini yazın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Konu</Label>
                <Input
                  id="subject"
                  placeholder="Mail konusu"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={sending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mesaj</Label>
                <AITextEditor value={message} onChange={setMessage} disabled={sending} />
              </div>
            </CardContent>
          </Card>

          {/* Başarı Mesajı */}
          {success && (
            <Alert className="bg-green-500/10 border-green-500">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <AlertDescription className="text-green-500">
                <strong>Başarılı!</strong> {queuedCount} mail gönderim kuyruğuna alındı.
              </AlertDescription>
            </Alert>
          )}

          {/* Hata Mesajı */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Gönder Butonu */}
          <Button onClick={handleSend} disabled={sending || emailAddresses.length === 0} className="w-full" size="lg">
            {sending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Mail Gönder ({emailAddresses.length} alıcı)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
