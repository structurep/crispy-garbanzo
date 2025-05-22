import Link from "next/link"
import Layout from "@/components/layout"
import CTASection from "@/components/cta-section"

const insights = [
  {
    title: "The Founder's Guide to Strategic Exits",
    excerpt:
      "Learn the key strategies that can help you maximize value when selling your building products or services business.",
    date: "May 15, 2023",
    slug: "founders-guide-strategic-exits",
  },
  {
    title: "5 Value Drivers for Building Products Companies",
    excerpt:
      "Discover the five key value drivers that buyers and investors look for in building products and services companies.",
    date: "April 3, 2023",
    slug: "value-drivers-building-products",
  },
  {
    title: "Private Equity vs. Strategic Buyers: Pros and Cons",
    excerpt:
      "Understanding the differences between private equity and strategic buyers can help you make the right choice for your exit.",
    date: "March 12, 2023",
    slug: "private-equity-vs-strategic-buyers",
  },
  {
    title: "Preparing Your Business for Due Diligence",
    excerpt:
      "A comprehensive guide to preparing your building products or services business for the due diligence process.",
    date: "February 28, 2023",
    slug: "preparing-business-due-diligence",
  },
]

export default function Insights() {
  return (
    <Layout>
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Insights</h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Expert perspectives on M&A and capital strategies for the building products and services industry.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {insights.map((insight, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{insight.date}</p>
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-3">{insight.title}</h2>
                    <p className="text-gray-600 mb-4">{insight.excerpt}</p>
                    <Link
                      href={`/insights/${insight.slug}`}
                      className="text-primary hover:text-primary-700 font-medium"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Download Our Free Resources</h2>
              <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">The Founder's Exit Playbook</h3>
                <p className="text-gray-600 mb-6">
                  A comprehensive guide to preparing your building products or services business for a successful exit.
                </p>
                <Link
                  href="/resources/playbook"
                  className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
                >
                  Download Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </Layout>
  )
}
