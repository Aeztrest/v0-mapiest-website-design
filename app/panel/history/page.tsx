"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Download, Eye, ChevronLeft, ChevronRight, Filter, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SearchHistory {
  id: string
  sector: string
  region: string
  requestDate: string
  completionDate: string
  companyCount: number
  requestedCount: number
  status: "completed" | "processing" | "failed"
  csvUrl?: string
}

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedSearch, setSelectedSearch] = useState<SearchHistory | null>(null)
  const [historyData, setHistoryData] = useState<SearchHistory[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const itemsPerPage = 5

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("mapiest_token")
        if (!token) {
          toast({
            title: "Hata",
            description: "Oturum bulunamadı. Lütfen tekrar giriş yapın.",
            variant: "destructive",
          })
          setHistoryData([])
          return
        }

        const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://72.60.212.48:8001"
        const response = await fetch(`${API_BASE}/dashboard/logs?limit=100`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Geçmiş aramalar yüklenemedi")
        }

        const data = await response.json()
        console.log("[v0] History API response:", data)

        if (!Array.isArray(data)) {
          console.error("[v0] Invalid API response format:", data)
          setHistoryData([])
          return
        }

        const formattedData: SearchHistory[] = data.map((log: any) => ({
          id: log.job_id,
          sector: log.sektor || "Belirtilmemiş",
          region: log.yer || "Belirtilmemiş",
          requestDate: formatDate(log.started_at),
          completionDate: formatDate(log.finished_at),
          companyCount: log.collected_count || 0,
          requestedCount: log.requested_adet || 0,
          status: log.status || "completed",
          csvUrl: log.csv_url,
        }))

        setHistoryData(formattedData)
      } catch (error) {
        console.error("[v0] History fetch error:", error)
        setHistoryData([])
        toast({
          title: "Hata",
          description: "Geçmiş aramalar yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [toast])

  const formatDate = (isoDate: string | null) => {
    if (!isoDate) return "-"
    try {
      const date = new Date(isoDate)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const hours = String(date.getHours()).padStart(2, "0")
      const minutes = String(date.getMinutes()).padStart(2, "0")
      return `${year}-${month}-${day} ${hours}:${minutes}`
    } catch {
      return "-"
    }
  }

  const filteredData = historyData.filter((item) => {
    const matchesSearch =
      item.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-success/20 text-success">
            Tamamlandı
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-warning/20 text-warning">
            İşleniyor
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Başarısız</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleExport = (item: SearchHistory) => {
    if (!item.csvUrl) {
      toast({
        title: "Uyarı",
        description: "Bu arama için CSV dosyası bulunamadı.",
        variant: "destructive",
      })
      return
    }

    window.open(item.csvUrl, "_blank")
    toast({
      title: "İndiriliyor",
      description: "CSV dosyası indiriliyor...",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Geçmiş aramalar yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Geçmiş Aramalar</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Daha önce yaptığınız tüm aramaları görüntüleyin ve yönetin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtrele ve Ara
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Sektör veya bölge ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="processing">İşleniyor</SelectItem>
                <SelectItem value="failed">Başarısız</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Arama Geçmişi</CardTitle>
          <CardDescription className="text-sm">Toplam {filteredData.length} arama kaydı bulundu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Sektör</TableHead>
                  <TableHead className="min-w-[100px]">Bölge</TableHead>
                  <TableHead className="min-w-[140px]">İstek Tarihi</TableHead>
                  <TableHead className="min-w-[140px]">Tamamlanma</TableHead>
                  <TableHead className="text-right min-w-[100px]">Firma Sayısı</TableHead>
                  <TableHead className="min-w-[100px]">Durum</TableHead>
                  <TableHead className="text-right min-w-[120px]">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Henüz arama geçmişi bulunmuyor
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.sector}</TableCell>
                      <TableCell>{item.region}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.requestDate}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.completionDate}</TableCell>
                      <TableCell className="text-right font-semibold">{item.companyCount}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedSearch(item)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Arama Detayları</DialogTitle>
                                <DialogDescription>
                                  {item.sector} - {item.region}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Sektör</p>
                                    <p className="font-medium">{item.sector}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Bölge</p>
                                    <p className="font-medium">{item.region}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">İstek Tarihi</p>
                                    <p className="font-medium">{item.requestDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Tamamlanma</p>
                                    <p className="font-medium">{item.completionDate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Talep Edilen</p>
                                    <p className="font-medium">{item.requestedCount}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Toplanan</p>
                                    <p className="font-medium">{item.companyCount}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Durum</p>
                                    <div className="mt-1">{getStatusBadge(item.status)}</div>
                                  </div>
                                </div>
                                <Button onClick={() => handleExport(item)} className="w-full" disabled={!item.csvUrl}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Sonuçları İndir
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleExport(item)}
                            disabled={!item.csvUrl}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {filteredData.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} arası gösteriliyor (Toplam:{" "}
                {filteredData.length})
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-1 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
