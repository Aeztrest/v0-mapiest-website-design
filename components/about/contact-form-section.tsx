"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("mapiest_token")

      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          token,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Mesajınız gönderildi!",
          description: "En kısa sürede size dönüş yapacağız.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        toast({
          title: "Hata",
          description: data.error || "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Yardıma mı İhtiyacınız Var?</h2>
            <p className="text-xl text-muted-foreground">Bize ulaşın!</p>
          </div>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      İsim
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="border-b-2 border-muted focus:border-primary transition-colors"
                      placeholder="Adınızı girin"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      E-posta
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-b-2 border-muted focus:border-primary transition-colors"
                      placeholder="E-posta adresinizi girin"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground">
                    Mesaj
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border-b-2 border-muted focus:border-primary transition-colors min-h-[120px]"
                    placeholder="Mesajınızı yazın..."
                    required
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="bg-foreground text-background hover:bg-primary hover:text-white transition-colors px-8"
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-6">
                  Bu site hCaptcha ile korunuyor.
                  <a href="#" className="text-primary hover:underline ml-1">
                    Gizlilik Politikası
                  </a>{" "}
                  ve
                  <a href="#" className="text-primary hover:underline ml-1">
                    Hizmet Şartları
                  </a>{" "}
                  geçerlidir.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
