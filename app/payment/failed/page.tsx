import Link from "next/link"
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardContent className="p-8 md:p-12 text-center">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-100 p-4">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ödeme İşlemi Başarısız</h1>

          <p className="text-lg text-gray-600 mb-8">
            Üzgünüz, ödemeniz işlenirken bir sorun oluştu. Lütfen tekrar deneyin.
          </p>

          {/* Common Reasons */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              Olası Nedenler
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Kart bilgileriniz hatalı girilmiş olabilir</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Kartınızda yeterli bakiye bulunmuyor olabilir</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>Bankanız işlemi güvenlik nedeniyle reddetmiş olabilir</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">•</span>
                <span>İnternet bağlantınız kesilmiş olabilir</span>
              </li>
            </ul>
          </div>

          {/* What to Do */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Ne Yapmalıyım?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#0152e2] mt-1">•</span>
                <span>Kart bilgilerinizi kontrol edin ve tekrar deneyin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0152e2] mt-1">•</span>
                <span>Farklı bir ödeme yöntemi kullanmayı deneyin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0152e2] mt-1">•</span>
                <span>Bankanızla iletişime geçerek işlemin neden reddedildiğini öğrenin</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#0152e2] hover:bg-[#0152e2]/90 text-white">
              <Link href="/pricing">
                <RefreshCw className="mr-2 w-5 h-5" />
                Tekrar Dene
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Ana Sayfaya Dön
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Yardıma mı ihtiyacınız var?</strong>
            </p>
            <p className="text-sm text-gray-600">
              Destek ekibimiz size yardımcı olmak için hazır.{" "}
              <Link href="/panel/help" className="text-[#0152e2] hover:underline font-medium">
                Bize ulaşın
              </Link>{" "}
              veya{" "}
              <a href="mailto:destek@mapiest.com" className="text-[#0152e2] hover:underline font-medium">
                destek@mapiest.com
              </a>{" "}
              adresine e-posta gönderin.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
