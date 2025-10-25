"use client"

import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="text-primary-foreground relative overflow-hidden" style={{ backgroundColor: "#07377e" }}>
      <div className="absolute inset-0 opacity-10">
        {/* Animated circles */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary-foreground/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-primary-foreground/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-16 h-16 border border-primary-foreground/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 border border-primary-foreground/20 rounded-full animate-pulse delay-1500"></div>

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="network" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.1" />
              <line x1="10" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
              <line x1="10" y1="10" x2="10" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#network)" />
        </svg>

        <div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-accent/20 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent/20 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-2 h-2 bg-accent/20 rounded-full animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative z-10">
        <div className="text-center mb-6 pb-6 border-b border-primary-foreground/20"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo ve Açıklama */}
          <div className="space-y-4 sm:space-y-6">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <img src="/mapiest-logo-white.png" alt="Mapiest Logo" className="h-10 sm:h-12 w-auto" />
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Google Maps verilerini kullanarak potansiyel müşterilerinize ulaşın. AI destekli mesajlaşma ile
              satışlarınızı artırın.
            </p>

            <div className="flex space-x-3 sm:space-x-4">
              {[
                { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61575273773615", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/mapiest", label: "Instagram" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/mapiest/", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center text-primary-foreground/60 hover:text-accent hover:bg-accent/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-accent">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Ana Sayfa", href: "/" },
                { name: "Fiyatlandırma", href: "/pricing" },
                { name: "Hakkımızda", href: "/about" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm hover:underline hover:translate-x-1 inline-block transition-transform duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Politikalar */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-accent">Politikalar</h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Gizlilik Politikası", href: "/policies/privacy-policy" },
                { name: "Hizmet Şartları", href: "/policies/terms-of-service" },
                { name: "İade Politikası", href: "/policies/refund-policy" },
                { name: "Teslimat Politikası", href: "/policies/shipping-policy" },
              ].map((policy, index) => (
                <li key={index}>
                  <Link
                    href={policy.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm hover:underline hover:translate-x-1 inline-block transition-transform duration-300"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6 text-accent">İletişim</h4>
            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  icon: Mail,
                  title: "destek@mapiest.com",
                  subtitle: "7/24 Email Destek",
                },
                {
                  icon: Phone,
                  title: "+90 546 947 66 34",
                  subtitle: "Pazartesi-Cuma 12:00-21:00",
                },
                {
                  icon: MapPin,
                  title: "İstanbul, Türkiye",
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 sm:space-x-3 group hover:bg-primary-foreground/5 p-2 rounded-lg transition-all duration-300"
                >
                  <contact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm text-primary-foreground/90 font-medium break-words">{contact.title}</p>
                    <p className="text-xs text-primary-foreground/60">{contact.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 sm:mt-16 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-4">
            <div className="text-xs sm:text-sm text-primary-foreground/60 text-center md:text-left">
              © {currentYear} Mapiest CO. Tüm hakları saklıdır.
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 bg-primary-foreground/5 rounded-xl px-4 sm:px-6 py-3">
              {["/visa-logo-generic.png", "/mastercard-logo.png", "/american-express-logo.png", "/paypal-logo.png"].map(
                (logo, index) => (
                  <img
                    key={index}
                    src={logo || "/placeholder.svg"}
                    alt={`Payment method ${index + 1}`}
                    className="h-5 sm:h-6 hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100"
                  />
                ),
              )}
            </div>
          </div>

          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs text-primary-foreground/40">Powered by Mapiest CO. | Made with ❤️ in Türkiye</p>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
          aria-label="Yukarı çık"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </footer>
  )
}
