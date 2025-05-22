import Image from "next/image"
import Layout from "@/components/layout"
import CTASection from "@/components/cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Structured Partners",
  description:
    "Founded on the principle that M&A advisors should truly understand the businesses they represent. Learn about our team and our approach.",
  keywords: [
    "M&A advisors",
    "founder experience",
    "building products expertise",
    "deal sherpa",
    "exit strategy experts",
  ],
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Kyle Johnson",
      title: "Founder & Managing Partner",
      bio: "After building and exiting his own business in the building products industry, Kyle recognized the gap between traditional investment banking and what founders actually need during the most important financial transaction of their lives.",
      image: "/images/founder-headshot.jpeg",
    },
    {
      name: "Sarah Reynolds",
      title: "Partner, Capital Markets",
      bio: "With over 15 years of experience in private equity and investment banking, Sarah leads our capital raising practice, helping clients secure growth capital and strategic investments.",
      image: "/images/team-member-1.jpg",
    },
    {
      name: "Michael Chen",
      title: "Partner, M&A Advisory",
      bio: "Michael brings 20+ years of experience in sell-side M&A, having closed over 50 transactions in the building products and services sector throughout his career.",
      image: "/images/team-member-2.jpg",
    },
    {
      name: "Jennifer Martinez",
      title: "Director, Strategic Advisory",
      bio: "Jennifer leads our strategic advisory practice, helping clients prepare for successful exits through operational improvements and strategic positioning.",
      image: "/images/team-member-3.jpg",
    },
  ]

  const values = [
    {
      title: "Operator First",
      description:
        "We approach every client engagement with the perspective of business operators, not just financial advisors.",
    },
    {
      title: "Industry Focus",
      description:
        "Our exclusive focus on building products and services gives us unmatched insight into industry-specific value drivers.",
    },
    {
      title: "Client Alignment",
      description:
        "We structure our engagements to ensure our incentives are perfectly aligned with achieving optimal outcomes for our clients.",
    },
    {
      title: "Transparent Communication",
      description:
        "We believe in clear, direct communication throughout the process, with no surprises or hidden agendas.",
    },
    {
      title: "Relationship Driven",
      description:
        "We build lasting relationships with our clients that extend beyond the transaction, becoming trusted advisors for the long term.",
    },
    {
      title: "Results Focused",
      description:
        "We measure our success by the outcomes we achieve for our clients, not by the number of deals we close.",
    },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              About Structured Partners
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Founded on the principle that M&A advisors should truly understand the businesses they represent.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">Our Story</h2>
                <div className="prose dark:prose-invert prose-lg">
                  <p>
                    Structured Partners was founded in 2019 by Kyle Johnson after his own experience selling a building
                    products business. During that process, Kyle recognized the gap between traditional investment
                    banking and what founders actually need during the most important financial transaction of their
                    lives.
                  </p>
                  <p>
                    Having been on both sides of the table—as a founder selling his business and as an advisor helping
                    others do the same—Kyle built Structured Partners to combine institutional M&A expertise with the
                    practical insights that can only come from operational experience.
                  </p>
                  <p>
                    Today, our team of experienced professionals serves founder-led businesses in the building products
                    and services industry, helping them navigate complex transactions and achieve optimal outcomes.
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
                <Image src="/images/office-image.jpg" alt="Structured Partners office" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These core principles guide our approach to every client engagement and shape our company culture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-50 mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Meet the experienced professionals who will guide you through your strategic transaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="relative h-64 md:h-full w-full rounded-lg overflow-hidden shadow-md">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-4">{member.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Approach Section */}
      <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Our Approach</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                What makes Structured Partners different from traditional investment banks and M&A advisors.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 md:p-12">
              <div className="prose dark:prose-invert prose-lg max-w-none">
                <h3>The Deal Sherpa Philosophy</h3>
                <p>
                  We believe that selling your business or raising capital should be a guided journey, not a mysterious
                  process. That's why we approach every engagement as your "Deal Sherpa" — an experienced guide who
                  knows the terrain, anticipates challenges, and helps you navigate the complex path to a successful
                  outcome.
                </p>

                <h3>Industry-Specific Expertise</h3>
                <p>
                  Unlike generalist advisors, we focus exclusively on the building products and services industry. This
                  specialized focus allows us to provide insights and guidance that generalists simply cannot offer. We
                  understand the unique dynamics, value drivers, and buyer landscape in your industry.
                </p>

                <h3>Operator + Advisor Experience</h3>
                <p>
                  Our team combines hands-on operational experience with institutional M&A expertise. We've built,
                  operated, and sold businesses ourselves, giving us a unique perspective that informs our advisory
                  approach. We understand the practical realities of running a business, not just the financial theory.
                </p>

                <h3>Relationship-Driven Process</h3>
                <p>
                  We believe in building lasting relationships with our clients that extend beyond the transaction. We
                  take the time to understand your personal and business goals, tailoring our approach to achieve the
                  outcomes that matter most to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </Layout>
  )
}
