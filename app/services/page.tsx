import Layout from "@/components/layout"
import CTASection from "@/components/cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | Structured Partners",
  description:
    "Comprehensive M&A and capital advisory services tailored specifically for the building products and services industry.",
}

export default function ServicesPage() {
  const services = [
    {
      title: "Sell-Side M&A",
      description:
        "Full lifecycle advisory with competitive tension creation to maximize value in your exit. We guide founders through every step of the process, from preparation to close.",
      link: "/services/sell-side-ma",
      highlights: [
        "Comprehensive valuation analysis",
        "Strategic positioning and marketing",
        "Buyer identification and outreach",
        "Negotiation support and deal structuring",
        "Due diligence management",
        "Closing coordination",
      ],
    },
    {
      title: "Capital Raise",
      description:
        "Growth equity or minority recap advisory to fuel your next phase of growth. We help you find the right capital partner who understands your industry and vision.",
      link: "/services/capital-raise",
      highlights: [
        "Capital needs assessment",
        "Investor materials preparation",
        "Investor identification and outreach",
        "Term sheet negotiation",
        "Due diligence support",
        "Closing coordination",
      ],
    },
    {
      title: "Strategic Advisory",
      description:
        "Exit readiness programs for businesses 12-24 months from a potential transaction. We help you maximize value before going to market.",
      link: "/services/strategic-advisory",
      highlights: [
        "Value driver assessment",
        "Growth strategy development",
        "Operational improvement planning",
        "Financial reporting enhancement",
        "Management team development",
        "Exit timing optimization",
      ],
    },
  ]

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Comprehensive M&A and capital advisory services tailored specifically for the building products and
              services industry.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                    <a
                      href={service.link}
                      className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
                    >
                      Learn More
                    </a>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                      Service Highlights
                    </h3>
                    <ul className="space-y-2">
                      {service.highlights.map((highlight, hIndex) => (
                        <li key={hIndex} className="flex items-start">
                          <span className="text-primary mr-2 font-bold">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </Layout>
  )
}
