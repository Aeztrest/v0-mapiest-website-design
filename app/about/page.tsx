import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHeroSection } from "@/components/about/about-hero-section"
import { VisionMissionSection } from "@/components/about/vision-mission-section"
import { OfficesSection } from "@/components/about/offices-section"
import { WhyMapiestSection } from "@/components/about/why-mapiest-section"
import { ContactFormSection } from "@/components/about/contact-form-section"
import { NewsletterSection } from "@/components/newsletter-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHeroSection />
        <VisionMissionSection />
        <OfficesSection />
        <WhyMapiestSection />
        <ContactFormSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
