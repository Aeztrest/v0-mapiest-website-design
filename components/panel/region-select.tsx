"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const districtsByCity: Record<string, Array<{ value: string; label: string }>> = {
  istanbul: [
    { value: "kadikoy", label: "Kadıköy" },
    { value: "besiktas", label: "Beşiktaş" },
    { value: "sisli", label: "Şişli" },
    { value: "uskudar", label: "Üsküdar" },
    { value: "beyoglu", label: "Beyoğlu" },
    { value: "fatih", label: "Fatih" },
    { value: "bakirkoy", label: "Bakırköy" },
    { value: "maltepe", label: "Maltepe" },
    { value: "pendik", label: "Pendik" },
    { value: "kartal", label: "Kartal" },
    { value: "umraniye", label: "Ümraniye" },
    { value: "atasehir", label: "Ataşehir" },
    { value: "sariyer", label: "Sarıyer" },
    { value: "eyupsultan", label: "Eyüpsultan" },
    { value: "kucukcekmece", label: "Küçükçekmece" },
    { value: "buyukcekmece", label: "Büyükçekmece" },
    { value: "bahcelievler", label: "Bahçelievler" },
    { value: "bagcilar", label: "Bağcılar" },
    { value: "esenler", label: "Esenler" },
    { value: "gaziosmanpasa", label: "Gaziosmanpaşa" },
  ],
  ankara: [
    { value: "cankaya", label: "Çankaya" },
    { value: "kecioren", label: "Keçiören" },
    { value: "yenimahalle", label: "Yenimahalle" },
    { value: "mamak", label: "Mamak" },
    { value: "etimesgut", label: "Etimesgut" },
    { value: "sincan", label: "Sincan" },
    { value: "pursaklar", label: "Pursaklar" },
    { value: "altindag", label: "Altındağ" },
    { value: "golbasi", label: "Gölbaşı" },
  ],
  izmir: [
    { value: "konak", label: "Konak" },
    { value: "bornova", label: "Bornova" },
    { value: "karsiyaka", label: "Karşıyaka" },
    { value: "buca", label: "Buca" },
    { value: "cigli", label: "Çiğli" },
    { value: "gaziemir", label: "Gaziemir" },
    { value: "balcova", label: "Balçova" },
    { value: "narlidere", label: "Narlıdere" },
    { value: "bayrakli", label: "Bayraklı" },
  ],
}

const citiesByCountry: Record<string, Array<{ value: string; label: string }>> = {
  turkey: [
    { value: "istanbul", label: "İstanbul" },
    { value: "ankara", label: "Ankara" },
    { value: "izmir", label: "İzmir" },
    { value: "bursa", label: "Bursa" },
    { value: "antalya", label: "Antalya" },
    { value: "adana", label: "Adana" },
    { value: "gaziantep", label: "Gaziantep" },
    { value: "konya", label: "Konya" },
    { value: "kayseri", label: "Kayseri" },
    { value: "mersin", label: "Mersin" },
    { value: "eskisehir", label: "Eskişehir" },
    { value: "diyarbakir", label: "Diyarbakır" },
    { value: "samsun", label: "Samsun" },
    { value: "denizli", label: "Denizli" },
    { value: "sanliurfa", label: "Şanlıurfa" },
    { value: "adapazari", label: "Adapazarı" },
    { value: "malatya", label: "Malatya" },
    { value: "kahramanmaras", label: "Kahramanmaraş" },
    { value: "erzurum", label: "Erzurum" },
    { value: "van", label: "Van" },
  ],
}

const countries = [{ value: "turkey", label: "🇹🇷 Türkiye" }]

interface RegionSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function RegionSelect({ value, onChange, disabled }: RegionSelectProps) {
  const [country, setCountry] = React.useState("turkey")
  const [city, setCity] = React.useState("")
  const [district, setDistrict] = React.useState("")

  const cities = countries.length ? (citiesByCountry[country] || []) : []
  const districts = city ? (districtsByCity[city] || []) : []

  const selectedCityLabel = cities.find(c => c.value === city)?.label
  const selectedDistrictLabel = districts.find(d => d.value === district)?.label

  React.useEffect(() => {
    if (!value) { setCity(""); setDistrict(""); return }
    const parts = value.split(", ")
    if (parts.length === 2) {
      const d = Object.values(districtsByCity).flat().find(x => x.label === parts[0])
      const c = Object.values(citiesByCountry).flat().find(x => x.label === parts[1])
      if (c) setCity(c.value)
      if (d) setDistrict(d.value)
    }
  }, [value])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {/* Ülke */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="w-full justify-between h-11 bg-transparent"
            disabled={disabled}
          >
            {countries.find(c => c.value === country)?.label ?? "Ülke seçin..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[1000] w-[--radix-popover-trigger-width] max-w-[min(92vw,420px)] p-0"
          align="start"
          side="bottom"
          sideOffset={8}
          // @ts-ignore
          position="popper"
        >
          <Command>
            <CommandInput placeholder="Ülke ara..." />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>Ülke bulunamadı.</CommandEmpty>
              <CommandGroup>
                {countries.map(c => (
                  <CommandItem
                    key={c.value}
                    value={c.value}
                    onSelect={(v) => {
                      setCountry(v)
                      setCity("")
                      setDistrict("")
                      onChange("")
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", country === c.value ? "opacity-100" : "opacity-0")} />
                    {c.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Şehir */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="w-full justify-between h-11 bg-transparent"
            disabled={disabled}
          >
            {city ? selectedCityLabel : "Şehir seçin..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[1000] w-[--radix-popover-trigger-width] max-w-[min(92vw,420px)] p-0"
          align="start"
          side="bottom"
          sideOffset={8}
          // @ts-ignore
          position="popper"
        >
          <Command>
            <CommandInput placeholder="Şehir ara..." />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>Şehir bulunamadı.</CommandEmpty>
              <CommandGroup>
                {cities.map(c => (
                  <CommandItem
                    key={c.value}
                    value={c.value}
                    onSelect={(v) => {
                      setCity(v)
                      setDistrict("")
                      onChange("")
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", city === c.value ? "opacity-100" : "opacity-0")} />
                    {c.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* İlçe */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className="w-full justify-between h-11 bg-transparent"
            disabled={disabled || !city}
          >
            {district ? selectedDistrictLabel : "İlçe seçin..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-[1000] w-[--radix-popover-trigger-width] max-w-[min(92vw,420px)] p-0"
          align="start"
          side="bottom"
          sideOffset={8}
          // @ts-ignore
          position="popper"
        >
          <Command>
            <CommandInput placeholder="İlçe ara..." />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>İlçe bulunamadı.</CommandEmpty>
              <CommandGroup>
                {districts.map(d => (
                  <CommandItem
                    key={d.value}
                    value={d.value}
                    onSelect={(v) => {
                      setDistrict(v)
                      const dLabel = districts.find(x => x.value === v)?.label
                      const cLabel = cities.find(x => x.value === city)?.label
                      onChange(`${dLabel}, ${cLabel}`)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", district === d.value ? "opacity-100" : "opacity-0")} />
                    {d.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
