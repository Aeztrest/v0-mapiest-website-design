"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  TrendingUp,
  Mail,
  MessageSquare,
  Calendar,
  Database,
  Award,
  ArrowRight,
  Download,
  Eye,
  Loader2,
} from "lucide-react"
import { WeeklyUsageChart } from "@/components/panel/weekly-usage-chart"
import { SuccessRateChart } from "@/components/panel/success-rate-chart"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface DashboardSummary {
  ok: boolean
  remaining_credit: number
  total_data_count: number | null
  total_mail_sent: number
  total_whatsapp_sent: number
  last_data_pull_time: string | null
  success_rates: {
    mail: number | null
    whatsapp: number | null
    overall: number | null
  }
  weekly_usage: {
    mail: Array<{ date: string; count: number }>
    whatsapp: Array<{ date: string; count: number }>
  }
  success_trend: {
    mail: Array<{ date: string; count: number }>
    whatsapp: Array<{ date: string; count: number }>
  }
  top_sector: {
    label: string
    value: {
      search_count: number
      total_collected: number
    }
  } | null
  last_searches: Array<{
    job_id: string
    sector: string
    location: string
    requested: number
    collected: number
    status: string
    csv_url: string
    started_at: string
    finished_at: string
  }>
}

interface DashboardLog {
  job_id: string
  yer: string
  sektor: string
  requested_adet: number
  collected_count: number
  status: string
  csv_url: string
  started_at: string
  finished_at: string
}

const recentSearches = [
  {
    id: 1,
    sector: "Restoran",
    region: "İstanbul",
    companyCount: 234,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: 2,
    sector: "Kafe",
    region: "Ankara",
    companyCount: 156,
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: 3,
    sector: "Otel",
    region: "Antalya",
    companyCount: 89,
    date: "2024-01-13",
    status: "completed",
  },
  {
    id: 4,
    sector: "Market",
    region: "İzmir",
    companyCount: 312,
    date: "2024-01-12",
    status: "completed",
  },
  {
    id: 5,
    sector: "Eczane",
    region: "Bursa",
    companyCount: 67,
    date: "2024-01-11",
    status: "completed",
  },
]

export default function DashboardPage() {
  const [user, setUser] = useState<{
    id: number
    name: string
    surname: string
    email: string
    plan: string
    plan_id?: number
    credit: number
    is_email_verified: boolean
    is_demo_used?: boolean // Added is_demo_used field
  } | null>(null)
  const [isRequestingDemo, setIsRequestingDemo] = useState(false)
  const [demoDialogOpen, setDemoDialogOpen] = useState(false)
  const [demoMessage, setDemoMessage] = useState("")
  const { toast } = useToast()

  const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null)
  const [dashboardLogs, setDashboardLogs] = useState<DashboardLog[]>([])
  const [isLoadingSummary, setIsLoadingSummary] = useState(true)
  const [isLoadingLogs, setIsLoadingLogs] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("mapiest_token")
      if (!token) return

      try {
        const response = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data)
          // Update localStorage with fresh data
          localStorage.setItem("mapiest_user", JSON.stringify(data))
        }
      } catch (error) {
        console.error("[v0] Failed to fetch user data:", error)
        // Fallback to localStorage
        const userData = localStorage.getItem("mapiest_user")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        setIsLoadingSummary(false)
        return
      }

      try {
        const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://72.60.212.48:8001"
        const response = await fetch(`${API_BASE}/dashboard/summary`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setDashboardSummary(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch dashboard summary:", error)
      } finally {
        setIsLoadingSummary(false)
      }
    }

    fetchDashboardSummary()
  }, [])

  useEffect(() => {
    const fetchDashboardLogs = async () => {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        setIsLoadingLogs(false)
        return
      }

      try {
        const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://72.60.212.48:8001"
        const response = await fetch(`${API_BASE}/dashboard/logs?limit=5`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setDashboardLogs(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch dashboard logs:", error)
      } finally {
        setIsLoadingLogs(false)
      }
    }

    fetchDashboardLogs()
  }, [])

  const isDefaultPlan = user?.plan_id === 1 || user?.plan === "Default Plan" || user?.plan === "Default"
  const showDemoButton = isDefaultPlan && !user?.is_demo_used

  /*
  const handleRequestDemo = async () => {
    setIsRequestingDemo(true)
    const token = localStorage.getItem("mapiest_token")

    if (!token) {
      toast({
        title: "Hata",
        description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
        variant: "destructive",
      })
      setIsRequestingDemo(false)
      return
    }

    try {
      const response = await fetch("/api/demo/request", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        setDemoMessage(data.message || "Demo başarıyla etkinleştirildi!")
        setDemoDialogOpen(true)

        if (user && data.credits_added) {
          const updatedUser = {
            ...user,
            credit: user.credit + data.credits_added,
            is_demo_used: true,
          }
          setUser(updatedUser)
          localStorage.setItem("mapiest_user", JSON.stringify(updatedUser))

          window.dispatchEvent(
            new CustomEvent("creditUpdated", {
              detail: { credit: updatedUser.credit },
            }),
          )
        }
      } else {
        toast({
          title: "Hata",
          description: data.error || data.detail || "Demo talebi gönderilemedi. Lütfen tekrar deneyin.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("[v0] Demo talep hatası:", error)
      toast({
        title: "Bağlantı Hatası",
        description: "Lütfen internet bağlantınızı kontrol edin.",
        variant: "destructive",
      })
    } finally {
      setIsRequestingDemo(false)
    }
  }
  */

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Henüz veri çekilmedi"
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Aktif Paket Bilgileri</CardTitle>
          <CardDescription className="text-sm">Mevcut paketiniz ve kullanım hakları</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Paket Türü</p>
              <p className="text-base sm:text-lg font-bold">{user?.plan || "Default Plan"}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Toplam Kredi</p>
              <p className="text-base sm:text-lg font-bold">{user?.credit?.toLocaleString() || 0} kredi</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">E-posta Doğrulama</p>
              <p className="text-base sm:text-lg font-bold">{user?.is_email_verified ? "Doğrulandı ✓" : "Beklemede"}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {/*
            {showDemoButton && (
              <Button
                variant="default"
                onClick={handleRequestDemo}
                disabled={isRequestingDemo}
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isRequestingDemo ? "İşleniyor..." : "Demo Talep Et"}
              </Button>
            )}
            */}
            <Button variant="default" asChild className="w-full sm:w-auto">
              <Link href="/pricing">Planı Yükselt</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/panel/settings">Paket Detayları</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/*
      <Dialog open={demoDialogOpen} onOpenChange={setDemoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo Başarıyla Etkinleştirildi! 🎉</DialogTitle>
            <DialogDescription className="space-y-2 pt-4">
              <p className="text-base">{demoMessage}</p>
              <p className="text-sm text-muted-foreground">Demo süreniz boyunca tüm özellikleri deneyebilirsiniz.</p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setDemoDialogOpen(false)} className="w-full">
            Tamam
          </Button>
        </DialogContent>
      </Dialog>
      */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Tek platformda binlerce potansiyel müşteriyi otomatik olarak listeleyin
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/panel/search">
            <BarChart3 className="w-4 h-4 mr-2" />
            Yeni Arama
          </Link>
        </Button>
      </div>

      {/* Ana Metrik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Kalan Kredi</CardTitle>
            <Database className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingSummary ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                (dashboardSummary?.remaining_credit || user?.credit || 0).toLocaleString()
              )}
            </div>
            <p className="text-xs text-muted-foreground">Mevcut kredi</p>
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {user?.plan || "Default Plan"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Veri</CardTitle>
            <Database className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingSummary ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : dashboardSummary?.total_data_count !== null ? (
                dashboardSummary?.total_data_count.toLocaleString()
              ) : (
                "0"
              )}
            </div>
            <p className="text-xs text-muted-foreground">Toplam çekilen firma</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gönderilen Mail</CardTitle>
            <Mail className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingSummary ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                (dashboardSummary?.total_mail_sent || 0).toLocaleString()
              )}
            </div>
            <p className="text-xs text-muted-foreground">Toplam mail gönderimi</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Mesaj</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingSummary ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                (dashboardSummary?.total_whatsapp_sent || 0).toLocaleString()
              )}
            </div>
            <p className="text-xs text-muted-foreground">Toplam WhatsApp mesajı</p>
          </CardContent>
        </Card>
      </div>

      {/* İkinci Sıra Metrikler */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">En Çok Aranan Sektör</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : dashboardSummary?.top_sector ? (
              <>
                <div className="text-xl font-bold capitalize">{dashboardSummary.top_sector.label}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardSummary.top_sector.value.search_count} arama •{" "}
                  {dashboardSummary.top_sector.value.total_collected} firma
                </p>
              </>
            ) : (
              <>
                <div className="text-xl font-bold">-</div>
                <p className="text-xs text-muted-foreground">Henüz arama yapılmadı</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Son Veri Çekme</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <div className="text-xl font-bold">
                  {dashboardSummary?.last_data_pull_time
                    ? new Date(dashboardSummary.last_data_pull_time).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {dashboardSummary?.last_data_pull_time
                    ? new Date(dashboardSummary.last_data_pull_time).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Henüz veri çekilmedi"}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Başarı Oranı</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <div className="text-xl font-bold">
                  {dashboardSummary?.success_rates.overall !== null
                    ? `${dashboardSummary.success_rates.overall.toFixed(1)}%`
                    : "-"}
                </div>
                <p className="text-xs text-muted-foreground">Başarılı işlem oranı</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Haftalık Kullanım</CardTitle>
            <CardDescription>Son 7 günün veri çekme istatistikleri</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <WeeklyUsageChart data={dashboardSummary?.weekly_usage} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Başarı Oranı Trendi</CardTitle>
            <CardDescription>Mail ve WhatsApp gönderim başarı oranları</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingSummary ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <SuccessRateChart data={dashboardSummary?.success_trend} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Son 5 Arama */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl">Son 5 Arama</CardTitle>
              <CardDescription className="text-sm">En son yaptığınız aramalar ve sonuçları</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="/panel/history">
                Tümünü Gör
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingLogs ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : dashboardLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Henüz arama yapılmadı</div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {dashboardLogs.map((log) => (
                <div
                  key={log.job_id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base truncate capitalize">
                        {log.sektor} - {log.yer}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {log.collected_count} firma • {new Date(log.started_at).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {log.status === "completed" ? "Tamamlandı" : log.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" asChild>
                      <Link href={`/panel/history?job_id=${log.job_id}`}>
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    </Button>
                    {log.csv_url && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" asChild>
                        <a href={log.csv_url} download target="_blank" rel="noopener noreferrer">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
