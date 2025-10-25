import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"

export function OfficesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ofislerimiz</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Küresel hizmet anlayışımızla İngiltere ve ABD'de ofislerimiz bulunmaktadır.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* İngiltere Ofisi */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">İngiltere Ofisimiz</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Dropmaps LTD</p>
                    <p className="text-muted-foreground">71–75 Shelton Street</p>
                    <p className="text-muted-foreground">Covent Garden, London</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <a href="mailto:destek@mapiest.com" className="text-primary hover:underline">
                    destek@mapiest.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <a href="tel:+447438102997" className="text-primary hover:underline">
                    +44 743 810 2997
                  </a>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9089394448!2d-0.12634492346!3d51.51424097181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5c0d7c4f8c5c0!2s71-75%20Shelton%20St%2C%20London%20WC2H%209JQ%2C%20UK!5e0!3m2!1sen!2str!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded"
                />
              </div>
            </CardContent>
          </Card>

          {/* ABD Ofisi */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/30">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">ABD Ofisimiz</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Rosintal LLC</p>
                    <p className="text-muted-foreground">30 N Gould St, Ste R</p>
                    <p className="text-muted-foreground">Sheridan, WY 82801</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <a href="mailto:Destek@mapiest.com" className="text-primary hover:underline">
                    Destek@mapiest.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <a href="tel:05469476634" className="text-primary hover:underline">
                    TR İrtibat No: 0546 947 66 34
                  </a>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.8!2d-106.95639!3d44.79635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a66e7e5%3A0x7e6e6e6e6e6e6e6e!2s30%20N%20Gould%20St%20%23R%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2str!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
