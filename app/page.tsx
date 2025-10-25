import { Header } from "@/components/header"
import { HeroSectionNew } from "@/components/hero-section-new"
import { VisionBand } from "@/components/vision-band"
import { PartnersSection } from "@/components/partners-section"
import { FindCustomersSection } from "@/components/find-customers-section"
import { WhatsAppMessagingSection } from "@/components/whatsapp-messaging-section"
import { ThreeStepsSection } from "@/components/three-steps-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FAQSection } from "@/components/faq-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSectionNew />
        <VisionBand />
        <PartnersSection />
        <FindCustomersSection />
        <WhatsAppMessagingSection />
        <ThreeStepsSection />
        <AdvantagesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
