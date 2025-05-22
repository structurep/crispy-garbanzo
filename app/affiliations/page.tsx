import Layout from "@/components/layout"
import CTASection from "@/components/cta-section"
import { getAffiliations, getAffiliationCategories } from "@/lib/affiliations"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Affiliations & Partnerships | Structured Partners",
  description:
    "Explore our industry affiliations and partnerships that help us deliver exceptional value to our clients in the building products and services industry.",
  openGraph: {
    title: "Affiliations & Partnerships | Structured Partners",
    description:
      "Explore our industry affiliations and partnerships that help us deliver exceptional value to our clients in the building products and services industry.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Structured Partners - Affiliations",
      },
    ],
  },
}

export default function AffiliationsPage() {
  const affiliations = getAffiliations()
  const categories = getAffiliationCategories()

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Our Affiliations & Partnerships
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              We maintain strong relationships with industry organizations and partners to deliver exceptional value to
              our clients.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {affiliations
                    .filter((affiliation) => affiliation.category === category)
                    .map((affiliation, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center"
                      >
                        <div className="h-16 flex items-center justify-center mb-4">
                          <img
                            src={affiliation.logo || "/placeholder.svg"}
                            alt={affiliation.name}
                            className="max-h-16 w-auto object-contain"
                          />
                        </div>
                        <h3 className="font-serif font-bold text-gray-900 dark:text-gray-50 mb-2">
                          {affiliation.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{affiliation.description}</p>
                        {affiliation.url && (
                          <a
                            href={affiliation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-700 text-sm font-medium mt-auto"
                          >
                            Learn more
                          </a>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </Layout>
  )
}
