"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Shield } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter subscription logic here
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-16 text-primary-foreground" style={{ backgroundColor: "#07377e" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
            <Mail className="w-8 h-8 text-accent-foreground animate-bounce" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">Mapiest Güncellemelerini Kaçırmayın</h2>

          <p className="text-lg text-primary-foreground/80 mb-8 text-pretty">
            Yeni özellikler, ipuçları ve özel fırsatlardan haberdar olmak için bültenimize abone olun. Ayda sadece 1-2
            email gönderiyoruz.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Abone Ol
              </Button>
            </form>
          ) : (
            <div className="bg-success/20 border border-success/30 rounded-lg p-4 max-w-md mx-auto mb-6 animate-in fade-in duration-500">
              <p className="text-success-foreground font-semibold">✓ Başarıyla abone oldunuz! Teşekkür ederiz.</p>
            </div>
          )}

          <div className="flex items-center justify-center space-x-4 text-sm text-primary-foreground/60">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Gizliliğiniz korunur</span>
            </div>
            <span>•</span>
            <span>İstediğiniz zaman abonelikten çıkabilirsiniz</span>
          </div>
        </div>
      </div>
    </section>
  )
}
