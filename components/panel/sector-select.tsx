"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const sectors = [
  { value: "restaurant", label: "Restoran" },
  { value: "cafe", label: "Kafe" },
  { value: "hotel", label: "Otel" },
  { value: "market", label: "Market / Süpermarket" },
  { value: "pharmacy", label: "Eczane" },
  { value: "hospital", label: "Hastane / Sağlık Merkezi" },
  { value: "clinic", label: "Klinik / Muayenehane" },
  { value: "school", label: "Okul / Eğitim Kurumu" },
  { value: "university", label: "Üniversite" },
  { value: "bank", label: "Banka" },
  { value: "gym", label: "Spor Salonu / Fitness" },
  { value: "beauty", label: "Güzellik Salonu / Kuaför" },
  { value: "spa", label: "SPA / Masaj Salonu" },
  { value: "automotive", label: "Otomotiv / Oto Servis" },
  { value: "car-dealer", label: "Araç Galerisi" },
  { value: "real-estate", label: "Emlak / Gayrimenkul" },
  { value: "lawyer", label: "Avukat / Hukuk Bürosu" },
  { value: "dentist", label: "Diş Hekimi / Diş Kliniği" },
  { value: "veterinary", label: "Veteriner / Pet Shop" },
  { value: "construction", label: "İnşaat / Yapı Malzemeleri" },
  { value: "technology", label: "Teknoloji / Yazılım" },
  { value: "it-services", label: "IT Hizmetleri / Danışmanlık" },
  { value: "education", label: "Eğitim / Kurs Merkezi" },
  { value: "retail", label: "Perakende / Mağazacılık" },
  { value: "manufacturing", label: "İmalat / Üretim" },
  { value: "logistics", label: "Lojistik / Kargo" },
  { value: "insurance", label: "Sigorta" },
  { value: "accounting", label: "Muhasebe / Mali Müşavirlik" },
  { value: "advertising", label: "Reklam / Pazarlama Ajansı" },
  { value: "printing", label: "Matbaa / Baskı Hizmetleri" },
  { value: "photography", label: "Fotoğrafçılık / Video Prodüksiyon" },
  { value: "event", label: "Organizasyon / Etkinlik Yönetimi" },
  { value: "travel", label: "Seyahat Acentesi / Turizm" },
  { value: "cleaning", label: "Temizlik Hizmetleri" },
  { value: "security", label: "Güvenlik Hizmetleri" },
  { value: "furniture", label: "Mobilya / İç Mimarlık" },
  { value: "textile", label: "Tekstil / Giyim" },
  { value: "food", label: "Gıda / İçecek Üretimi" },
  { value: "bakery", label: "Fırın / Pastane" },
  { value: "jewelry", label: "Kuyumcu / Mücevherat" },
  { value: "electronics", label: "Elektronik / Beyaz Eşya" },
  { value: "bookstore", label: "Kitapçı / Kırtasiye" },
  { value: "florist", label: "Çiçekçi" },
  { value: "garden", label: "Bahçe / Peyzaj" },
  { value: "plumbing", label: "Tesisatçı / Tadilat" },
  { value: "electrician", label: "Elektrikçi" },
  { value: "painter", label: "Boyacı / Dekorasyon" },
  { value: "locksmith", label: "Çilingir" },
  { value: "laundry", label: "Çamaşırhane / Kuru Temizleme" },
  { value: "tailor", label: "Terzi / Dikiş Atölyesi" },
  { value: "optician", label: "Optik / Gözlükçü" },
  { value: "pharmacy-cosmetic", label: "Kozmetik / Parfümeri" },
  { value: "toy-store", label: "Oyuncakçı" },
  { value: "sports-store", label: "Spor Malzemeleri" },
  { value: "music-store", label: "Müzik Aletleri" },
  { value: "art-gallery", label: "Sanat Galerisi / Müze" },
  { value: "cinema", label: "Sinema / Tiyatro" },
  { value: "nightclub", label: "Gece Kulübü / Bar" },
  { value: "casino", label: "Casino / Eğlence Merkezi" },
  { value: "amusement-park", label: "Lunapark / Tema Parkı" },
  { value: "zoo", label: "Hayvanat Bahçesi / Akvaryum" },
]

interface SectorSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function SectorSelect({ value, onChange, disabled }: SectorSelectProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          className="w-full justify-between h-11 bg-transparent"
          disabled={disabled}
        >
          {value ? sectors.find(s => s.value === value)?.label : "Sektör seçin..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="z-[1000] w-[--radix-popover-trigger-width] max-w-[min(92vw,480px)] p-0"
        align="start"
        side="bottom"
        sideOffset={8}
        // @ts-ignore — shadcn varyantında yoksa sorun etme
        position="popper"
      >
        <Command>
          <CommandInput placeholder="Sektör ara..." />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>Sektör bulunamadı.</CommandEmpty>
            <CommandGroup>
              {sectors.map(sector => (
                <CommandItem
                  key={sector.value}
                  value={sector.value}
                  onSelect={(v) => onChange(v === value ? "" : v)}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === sector.value ? "opacity-100" : "opacity-0")} />
                  {sector.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
