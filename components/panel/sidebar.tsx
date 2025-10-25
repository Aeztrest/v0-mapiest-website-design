"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Search,
  Mail,
  MessageSquare,
  History,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/panel/dashboard" },
  { icon: Search, label: "Arama Yap", href: "/panel/search" },
  { icon: Mail, label: "Mail Gönder", href: "/panel/mail" },
  { icon: MessageSquare, label: "WhatsApp Gönder", href: "/panel/whatsapp" },
  { icon: History, label: "Geçmiş Aramalar", href: "/panel/history" },
  { icon: HelpCircle, label: "Yardım", href: "/panel/help" },
  { icon: Settings, label: "Ayarlar", href: "/panel/settings" },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("mapiest_token")
    localStorage.removeItem("mapiest_user")
    window.location.href = "/panel/login"
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          "lg:z-30 z-50",
          // Mobil görünüm
          "lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0 w-full" : "-translate-x-full w-full",
          // Desktop görünüm
          "lg:w-64 lg:block",
          collapsed && "lg:w-16",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
            {!collapsed && (
              <Link href="/">
                <Image
                  src="/mapiest-logo.gif"
                  alt="Mapiest"
                  width={140}
                  height={40}
                  className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto hidden lg:flex"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                        !isActive && "text-sidebar-foreground",
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
                collapsed && "lg:justify-center",
              )}
            >
              <LogOut className="w-5 h-5" />
              {!collapsed && <span className="ml-3">Çıkış Yap</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
