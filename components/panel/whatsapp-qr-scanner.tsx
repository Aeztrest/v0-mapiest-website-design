"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QrCode, Smartphone, Loader2 } from "lucide-react"

interface WhatsAppQRScannerProps {
  connected: boolean
  onConnect: (connected: boolean) => void
}

export function WhatsAppQRScanner({ connected, onConnect }: WhatsAppQRScannerProps) {
  const [scanning, setScanning] = useState(false)

  const handleScan = () => {
    setScanning(true)

    // Simüle edilmiş QR tarama işlemi
    setTimeout(() => {
      onConnect(true)
      setScanning(false)
    }, 3000)
  }

  if (connected) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-success" />
        </div>
        <p className="text-sm font-medium">WhatsApp Bağlantısı Aktif</p>
        <p className="text-xs text-muted-foreground mt-1">Mesaj göndermeye hazırsınız</p>
        <Button variant="outline" size="sm" className="mt-4 bg-transparent" onClick={() => onConnect(false)}>
          Bağlantıyı Kes
        </Button>
      </div>
    )
  }

  if (scanning) {
    return (
      <div className="text-center py-8">
        <div className="w-48 h-48 mx-auto mb-4 border-4 border-dashed border-primary rounded-lg flex items-center justify-center animate-pulse">
          <QrCode className="w-24 h-24 text-primary" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <p className="text-sm font-medium">QR Kod Bekleniyor...</p>
        </div>
        <p className="text-xs text-muted-foreground">Telefonunuzda WhatsApp'ı açın ve QR kodu tarayın</p>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <div className="w-48 h-48 mx-auto mb-4 border-4 border-dashed border-border rounded-lg flex items-center justify-center">
        <QrCode className="w-24 h-24 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium mb-2">WhatsApp QR Kodu</p>
      <p className="text-xs text-muted-foreground mb-4">
        Bağlantı kurmak için telefonunuzda WhatsApp'ı açın ve QR kodu tarayın
      </p>
      <Button onClick={handleScan} className="gap-2">
        <Smartphone className="w-4 h-4" />
        QR Kod Taramayı Başlat
      </Button>
    </div>
  )
}
