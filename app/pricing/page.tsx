import { Header } from "@/components/header"
import { PricingHeroSection } from "@/components/pricing/pricing-hero-section"
import { PricingPackagesSection } from "@/components/pricing/pricing-packages-section"
import { ThreeStepsSection } from "@/components/three-steps-section"
import { LegalSafeSection } from "@/components/pricing/legal-safe-section"
import { AllCustomersSection } from "@/components/pricing/all-customers-section"
import { ComparisonTableSection } from "@/components/pricing/comparison-table-section"
import { PersonalizedMessagingSection } from "@/components/pricing/personalized-messaging-section"
import { WhyMapiestSection } from "@/components/pricing/why-mapiest-section"
import { CustomerStoriesSection } from "@/components/pricing/customer-stories-section"
import { FAQSection } from "@/components/faq-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PricingPackagesSection />
        <ThreeStepsSection />
        <LegalSafeSection />
        <AllCustomersSection />
        <ComparisonTableSection />
        <PersonalizedMessagingSection />
        <WhyMapiestSection />
        <CustomerStoriesSection />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
