"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, User } from "lucide-react"
import Link from "next/link"

interface UserInfo {
  name: string
  surname: string
  email: string
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("mapiest_token")
      if (!token) return

      try {
        const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://72.60.212.48:8001"
        const response = await fetch(`${API_BASE}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser({
            name: data.name,
            surname: data.surname,
            email: data.email,
          })
        } else {
          localStorage.removeItem("mapiest_token")
          localStorage.removeItem("mapiest_user")
        }
      } catch (error) {
        console.error("[v0] Error fetching user:", error)
      }
    }

    checkUser()
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src="/mapiest-logo-white.png" alt="Mapiest Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-accent transition-colors duration-300 relative group">
              Ana Sayfa
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/pricing" className="hover:text-accent transition-colors duration-300 relative group">
              Fiyatlandırma
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/about" className="hover:text-accent transition-colors duration-300 relative group">
              Hakkımızda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary-foreground hover:text-accent hover:scale-110 transition-all duration-300"
            >
              <Search className="w-4 h-4" />
            </Button>
            {user ? (
              <Link href="/panel/dashboard">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105"
                >
                  <User className="w-4 h-4 mr-2" />
                  {user.name} {user.surname}
                </Button>
              </Link>
            ) : (
              <Link href="/panel/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground bg-transparent transition-all duration-300 hover:scale-105"
                >
                  Giriş Yap
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-primary-foreground hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/20 animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="hover:text-accent transition-colors">
                Ana Sayfa
              </a>
              <a href="/pricing" className="hover:text-accent transition-colors">
                Fiyatlandırma
              </a>
              <a href="/about" className="hover:text-accent transition-colors">
                Hakkımızda
              </a>
              {user ? (
                <Link href="/panel/dashboard">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground w-fit bg-transparent"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user.name} {user.surname}
                  </Button>
                </Link>
              ) : (
                <Link href="/panel/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent text-primary-foreground hover:bg-accent hover:text-accent-foreground w-fit bg-transparent"
                  >
                    Giriş Yap
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
