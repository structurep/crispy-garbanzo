"use client"

import Layout from "@/components/layout"
import ServicesSection from "@/components/services-section"
import DifferentiationSection from "@/components/differentiation-section"
import ClientArchetypes from "@/components/client-archetypes"
import AffiliationsSection from "@/components/affiliations-section"
import FounderBio from "@/components/founder-bio"
import CTASection from "@/components/cta-section"
import StickyCTA from "@/components/sticky-cta"
import ExitIntentPopup from "@/components/exit-intent-popup"
import ChatBot from "@/components/chat-bot"
import VideoHero from "@/components/video-hero"
import TestimonialSection from "@/components/testimonial-section"
import ProcessTimeline from "@/components/process-timeline"
import OriginStory from "@/components/origin-story"
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/schema"
import StructuredData from "@/components/structured-data"
import FounderBioMobile from "@/components/founder-bio-mobile"
import { useMobile } from "@/hooks/use-mobile"

export default function ClientPage() {
  // Generate schema for the homepage
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()
  const isMobile = useMobile()

  return (
    <Layout>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />

      <VideoHero />
      <ServicesSection />
      <TestimonialSection />
      <CTASection />
      <ProcessTimeline />
      <DifferentiationSection />
      <ClientArchetypes />
      <OriginStory />
      <AffiliationsSection />
      {isMobile ? <FounderBioMobile /> : <FounderBio />}
      <StickyCTA />
      <ExitIntentPopup />
      <ChatBot />
    </Layout>
  )
}
