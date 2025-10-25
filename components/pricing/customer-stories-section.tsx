import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const customerStories = [
  {
    name: "Ayşe Hanım",
    business: "Restoran Sahibi",
    avatar: "/customer-3.jpeg",
    metrics: {
      customers: "2.500",
      revenue: "₺92.000",
      roi: "%320",
      orders: "1.200",
    },
    testimonial: "Müşteri bulma derdi bitti, çok zaman kazandım.",
  },
  {
    name: "Mehmet Bey",
    business: "Kuaför Salonu Sahibi",
    avatar: "/customer-1.jpg",
    metrics: {
      customers: "1.800",
      revenue: "₺68.000",
      roi: "%280",
      orders: "850",
    },
    testimonial: "Mapiest sayesinde müşteri sayım ikiye katlandı.",
  },
  {
    name: "Fatma Hanım",
    business: "Kafe Sahibi",
    avatar: "/customer-6.jpg",
    metrics: {
      customers: "3.200",
      revenue: "₺115.000",
      roi: "%410",
      orders: "1.650",
    },
    testimonial: "En iyi yatırımım, kesinlikle tavsiye ederim.",
  },
]

export function CustomerStoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Müşteri Hikayeleri ve Veriler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerStories.map((story, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{story.name}</div>
                    <div className="text-sm text-white/80">{story.business}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold">{story.metrics.customers}</div>
                    <div className="text-xs text-white/80">potansiyel müşteri</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold">{story.metrics.revenue}</div>
                    <div className="text-xs text-white/80">tahmini hasılat</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold">{story.metrics.roi}</div>
                    <div className="text-xs text-white/80">reklam getirisi</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold">{story.metrics.orders}</div>
                    <div className="text-xs text-white/80">
                      toplam {story.business.includes("Kuaför") ? "rezervasyon" : "sipariş"}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <blockquote className="text-sm italic text-muted-foreground">"{story.testimonial}"</blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
