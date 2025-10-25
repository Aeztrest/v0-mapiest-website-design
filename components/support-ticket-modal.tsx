"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SupportTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SupportTicketModal({ isOpen, onClose }: SupportTicketModalProps) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!subject.trim() || !message.trim()) {
      setError("Lütfen başlık ve mesaj alanlarını doldurun")
      return
    }

    const token = localStorage.getItem("mapiest_token")
    if (!token) {
      setError("Oturum bulunamadı. Lütfen tekrar giriş yapın.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/support/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          message,
          token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Destek talebi gönderilemedi")
      }

      setSuccess(true)
      setSubject("")
      setMessage("")

      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Destek Talebi Oluştur
          </DialogTitle>
          <DialogDescription>Destek ekibimiz en kısa sürede size geri dönüş yapacaktır.</DialogDescription>
        </DialogHeader>

        {success ? (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Destek talebiniz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">Başlık *</Label>
              <Input
                id="subject"
                placeholder="Destek talebinizin konusu"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSubmitting}
                className="border-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mesaj *</Label>
              <Textarea
                id="message"
                placeholder="Lütfen sorununuzu veya talebinizi detaylı bir şekilde açıklayın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                disabled={isSubmitting}
                className="border-gray-900 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 bg-transparent"
              >
                İptal
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Gönder
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
