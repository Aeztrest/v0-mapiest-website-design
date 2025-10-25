"use client"

import Link from "next/link"
import { CheckCircle, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const siparisNo = searchParams.get("siparis_no") || `MP-${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardContent className="p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ödemeniz Başarıyla Tamamlandı!</h1>

          <p className="text-lg text-gray-600 mb-8">
            Mapiest'e hoş geldiniz! Hesabınız aktif edildi ve hemen kullanmaya başlayabilirsiniz.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-gray-900 mb-4">Sipariş Detayları</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Sipariş No:</span>
                <span className="font-medium text-gray-900 break-all">{siparisNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tarih:</span>
                <span className="font-medium text-gray-900">{new Date().toLocaleDateString("tr-TR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Durum:</span>
                <span className="font-medium text-green-600">Aktif</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#0152e2]" />
              Sırada Ne Var?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#0152e2] mt-1">•</span>
                <span>E-posta adresinize fatura gönderildi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0152e2] mt-1">•</span>
                <span>Panel üzerinden hemen müşteri aramaya başlayabilirsiniz</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0152e2] mt-1">•</span>
                <span>Destek ekibimiz 7/24 hizmetinizdedir</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#0152e2] hover:bg-[#0152e2]/90 text-white">
              <Link href="/panel/dashboard">
                Panele Git
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </div>

          {/* Support Info */}
          <p className="text-sm text-gray-500 mt-8">
            Herhangi bir sorunuz mu var?{" "}
            <Link href="/panel/help" className="text-[#0152e2] hover:underline font-medium">
              Destek ekibimizle iletişime geçin
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
          <div className="text-center">Yükleniyor...</div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}
