"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "@/components/panel/sidebar"
import { PanelHeader } from "@/components/panel/header"

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Login sayfası değilse token kontrolü yap
    if (pathname !== "/panel/login") {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        router.push("/panel/login")
      }
    }
  }, [pathname, router])

  // Login sayfasında sidebar ve header gösterme
  if (pathname === "/panel/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64 transition-all duration-300">
        <PanelHeader />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
