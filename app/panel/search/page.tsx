"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Download,
  FileSpreadsheet,
  Info,
  MapPin,
  Briefcase,
  Loader2,
  Database,
  CheckCircle2,
  Coins,
  Globe,
} from "lucide-react"
import { sectors, countries, citiesByCountry } from "@/lib/search-data"

interface SearchResult {
  id: string
  name: string
  address: string
  phone: string
  email: string
  sector: string
  rating: number
}

export default function SearchPage() {
  const [selectedSector, setSelectedSector] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [dataLimit, setDataLimit] = useState(100)
  const [searching, setSearching] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<SearchResult[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [error, setError] = useState("")

  const [sectorSearch, setSectorSearch] = useState("")
  const [countrySearch, setCountrySearch] = useState("")
  const [citySearch, setCitySearch] = useState("")

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [jobId, setJobId] = useState("")
  const [remainingCredit, setRemainingCredit] = useState(0)

  const filteredSectors = sectors.filter((sector) => sector.label.toLowerCase().includes(sectorSearch.toLowerCase()))

  const filteredCountries = countries.filter((country) =>
    country.label.toLowerCase().includes(countrySearch.toLowerCase()),
  )

  const availableCities = selectedCountry ? citiesByCountry[selectedCountry] || [] : []
  const filteredCities = availableCities.filter((city) => city.label.toLowerCase().includes(citySearch.toLowerCase()))

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
    setSelectedCity("")
    setCitySearch("")
  }

  const handleSuccessDialogClose = (open: boolean) => {
    setShowSuccessDialog(open)
    if (!open) {
      // Dialog kapatıldığında kriterleri sıfırla
      setSelectedSector("")
      setSelectedCountry("")
      setSelectedCity("")
      setDataLimit(100)
      setSectorSearch("")
      setCountrySearch("")
      setCitySearch("")
    }
  }

  const handleSearch = async () => {
    if (!selectedSector || !selectedCountry || !selectedCity) {
      setError("Lütfen sektör, ülke ve şehir seçiniz")
      return
    }

    setError("")
    setSearching(true)
    setProgress(0)
    setResults([])

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      const token = localStorage.getItem("mapiest_token")
      if (!token) {
        setError("Oturum bulunamadı. Lütfen tekrar giriş yapın.")
        setSearching(false)
        clearInterval(interval)
        return
      }

      const cityLabel = availableCities.find((c) => c.value === selectedCity)?.label || selectedCity
      const countryLabel = countries.find((c) => c.value === selectedCountry)?.label || selectedCountry
      const yer = `${cityLabel}, ${countryLabel}`

      const sectorLabel = sectors.find((s) => s.value === selectedSector)?.label || selectedSector

      console.log("[v0] Veri çekme başlatılıyor:", { yer, sektor: sectorLabel, adet: dataLimit })

      const response = await fetch("/api/vericekme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yer: yer,
          sektor: selectedSector,
          adet: dataLimit,
          token: token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("[v0] API hatası:", data)
        setError(data.error || "Veri çekme başarısız oldu")
        setSearching(false)
        clearInterval(interval)
        setProgress(0)
        return
      }

      console.log("[v0] API yanıtı:", data)

      const fetchedResults: SearchResult[] = data.results || []
      setResults(fetchedResults)
      setTotalResults(fetchedResults.length)
      setProgress(100)

      if (data.ok && data.message) {
        setSuccessMessage(data.message)
        setJobId(data.job_id || "")

        try {
          const userResponse = await fetch("/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()
            setRemainingCredit(userData.credit || 0)
            localStorage.setItem("mapiest_user", JSON.stringify(userData))

            window.dispatchEvent(new CustomEvent("creditUpdated", { detail: { credit: userData.credit } }))
          }
        } catch (err) {
          console.error("[v0] Kullanıcı bilgisi güncellenemedi:", err)
        }

        setShowSuccessDialog(true)
      }

      setTimeout(() => {
        setSearching(false)
      }, 500)
    } catch (err: any) {
      console.error("[v0] Veri çekme hatası:", err)
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
      setSearching(false)
      clearInterval(interval)
      setProgress(0)
    }
  }

  const handleExport = (format: "excel" | "csv") => {
    alert(`${totalResults} sonuç ${format.toUpperCase()} olarak indiriliyor...`)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Arama Yap</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Sektör ve bölge bazlı işletme araması yapın</p>
      </div>

      <Alert>
        <Info className="w-4 h-4 flex-shrink-0" />
        <AlertDescription className="text-xs sm:text-sm">
          <strong>API Limitleri:</strong> Günlük maksimum 1000 firma verisi çekebilirsiniz. Kalan hakkınız: 750 firma
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Arama Kriterleri</CardTitle>
          <CardDescription className="text-sm">İşletmeleri bulmak için sektör ve bölge seçin</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                Sektör
              </Label>
              <Select value={selectedSector} onValueChange={setSelectedSector} disabled={searching}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sektör seçin..." />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Sektör ara..."
                      value={sectorSearch}
                      onChange={(e) => setSectorSearch(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  {filteredSectors.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">Sonuç bulunamadı</div>
                  ) : (
                    filteredSectors.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 flex-shrink-0" />
                Ülke
              </Label>
              <Select value={selectedCountry} onValueChange={handleCountryChange} disabled={searching}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ülke seçin..." />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Ülke ara..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  {filteredCountries.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">Sonuç bulunamadı</div>
                  ) : (
                    filteredCountries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Şehir
              </Label>
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={searching || !selectedCountry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={selectedCountry ? "Şehir seçin..." : "Önce ülke seçin"} />
                </SelectTrigger>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Şehir ara..."
                      value={citySearch}
                      onChange={(e) => setCitySearch(e.target.value)}
                      className="h-8"
                      disabled={!selectedCountry}
                    />
                  </div>
                  {filteredCities.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground text-center">
                      {selectedCountry ? "Sonuç bulunamadı" : "Önce ülke seçin"}
                    </div>
                  ) : (
                    filteredCities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm">
              <Database className="w-4 h-4 flex-shrink-0" />
              Çekilecek Veri Sayısı
            </Label>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground">Minimum: 10</span>
                <Badge variant="secondary" className="text-sm sm:text-base font-semibold w-fit">
                  {dataLimit} firma
                </Badge>
                <span className="text-xs sm:text-sm text-muted-foreground">Maksimum: 1000</span>
              </div>
              <Slider
                min={10}
                max={1000}
                step={10}
                value={[dataLimit]}
                onValueChange={(value) => setDataLimit(value[0])}
                disabled={searching}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Tek seferde çekmek istediğiniz firma sayısını belirleyin. Daha fazla veri daha uzun süre alabilir.
              </p>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleSearch} disabled={searching} className="w-full sm:w-auto" size="lg">
            {searching ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Aranıyor...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Aramayı Başlat
              </>
            )}
          </Button>

          {searching && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">Arama ilerliyor...</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {totalResults > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg sm:text-xl">Arama Sonuçları</CardTitle>
                <CardDescription className="text-sm">
                  Toplam <Badge variant="secondary">{totalResults}</Badge> firma bulundu
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("excel")}
                  className="text-xs sm:text-sm"
                >
                  <FileSpreadsheet className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExport("csv")} className="text-xs sm:text-sm">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {results.slice(0, 10).map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-3 sm:p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <h4 className="font-semibold text-sm sm:text-base">{result.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{result.address}</p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                      <span className="text-muted-foreground break-all">{result.phone}</span>
                      <span className="text-muted-foreground break-all">{result.email}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs self-start">
                    {result.rating} ⭐
                  </Badge>
                </div>
              ))}
              {results.length > 10 && (
                <p className="text-center text-xs sm:text-sm text-muted-foreground py-4">
                  ve {results.length - 10} firma daha... (Tümünü görmek için export edin)
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={showSuccessDialog} onOpenChange={handleSuccessDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <DialogTitle className="text-xl">İşlem Başlatıldı!</DialogTitle>
            </div>
            <DialogDescription className="text-base leading-relaxed pt-2">{successMessage}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {jobId && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">İş Numarası:</p>
                <p className="font-mono font-semibold text-sm">{jobId}</p>
              </div>
            )}

            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <Coins className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Kalan Krediniz</p>
                <p className="text-xl font-bold text-primary">{remainingCredit.toLocaleString()} Kredi</p>
              </div>
            </div>

            <Button onClick={() => handleSuccessDialogClose(false)} className="w-full">
              Tamam
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
