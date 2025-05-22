import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Layout from "@/components/layout"
import CTASection from "@/components/cta-section"
import { getAffiliation } from "@/lib/affiliations"
import type { Metadata } from "next"

interface AffiliationPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: AffiliationPageProps): Promise<Metadata> {
  const affiliation = getAffiliation(params.slug)

  if (!affiliation) {
    return {
      title: "Affiliation Not Found | Structured Partners",
      description: "The requested affiliation could not be found.",
    }
  }

  return {
    title: `${affiliation.name} | Structured Partners Affiliations`,
    description: affiliation.description,
    openGraph: {
      title: `${affiliation.name} | Structured Partners Affiliations`,
      description: affiliation.description,
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: affiliation.name,
        },
      ],
    },
  }
}

export default function AffiliationPage({ params }: AffiliationPageProps) {
  const affiliation = getAffiliation(params.slug)

  if (!affiliation) {
    notFound()
  }

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/affiliations" className="inline-flex items-center text-primary hover:text-primary-600 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all affiliations
            </Link>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <Image
                  src={affiliation.logo || "/placeholder.svg"}
                  alt={affiliation.name}
                  width={160}
                  height={80}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                  {affiliation.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">{affiliation.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <h2>About Our Partnership</h2>
              <p>{affiliation.details}</p>

              <h2>Benefits to Our Clients</h2>
              <p>
                Through our affiliation with {affiliation.name}, our clients gain access to valuable resources,
                connections, and insights that enhance the transaction process and help achieve optimal outcomes.
              </p>

              {affiliation.url && (
                <div className="mt-8">
                  <a
                    href={affiliation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
                  >
                    Visit {affiliation.name} Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </Layout>
  )
}
