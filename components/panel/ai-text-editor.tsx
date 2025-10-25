"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { generateAIText } from "@/app/actions/generate-text"

interface AITextEditorProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function AITextEditor({ value, onChange, disabled }: AITextEditorProps) {
  const [generating, setGenerating] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [error, setError] = useState("")

  const handleGenerateAIText = async () => {
    if (!value.trim()) {
      setError("Lütfen önce bir metin girin. AI, girdiğiniz metni KVKK uyumlu hale getirecektir.")
      return
    }

    setGenerating(true)
    setShowSuggestion(false)
    setError("")

    try {
      const result = await generateAIText(value)

      if (result.success && result.text) {
        onChange(result.text)
        setShowSuggestion(true)
      } else {
        setError(result.error || "Mesaj oluşturulurken bir hata oluştu.")
      }
    } catch (err) {
      console.error("[v0] AI text generation error:", err)
      setError("AI ile mesaj oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGenerateAIText}
          disabled={disabled || generating}
          className="gap-2 bg-transparent"
        >
          {generating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              AI Üretiyor...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              AI ile Mesaj Oluştur
            </>
          )}
        </Button>
      </div>

      <Textarea
        id="message"
        placeholder="Mesajınızı buraya yazın veya AI ile oluşturun..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={12}
        className="resize-none"
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}

      {showSuggestion && (
        <Alert className="bg-primary/10 border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <AlertDescription className="text-sm">
            AI tarafından KVKK uyumlu mesaj oluşturuldu. İstediğiniz gibi düzenleyebilirsiniz.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
