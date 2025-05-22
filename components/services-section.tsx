"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart3, TrendingUp, Lightbulb, Search } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "@/hooks/use-media-query"

const services = [
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Sell-Side M&A",
    description: "Your Life-Changing Exit Deserves MD-Level Attention",
    mobileDescription: "Ready to Exit Your Building Products Business?",
    longDescription:
      "Kyle personally manages every sell-side engagement from positioning through closing. As a former boutique investment bank MD with 50+ completed transactions, Kyle provides the expertise and personal attention your exit deserves.",
    mobileDetails:
      "Kyle's process: 90-120 days, 3-5 bidders, 15-30% premium results\nRecent: $XXM roofing company, 40% above initial offer",
    process: [
      "Business positioning and valuation optimization",
      "Strategic and financial buyer identification (Kyle's network includes 200+ contacts)",
      "Competitive auction management (typically 3-5 serious bidders)",
      "Personal negotiation and due diligence management",
      "Hands-on closing support",
    ],
    link: "/services/sell-side-ma",
    cta: "Schedule Sell-Side Consultation",
    mobileCta: "Get Your Valuation",
    caseStudy: {
      industry: "Commercial Painting",
      outcome: "3.8x EBITDA multiple",
      highlight: "4 competing bidders, 40% premium to initial offer",
    },
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Buy-Side M&A",
    description: "Strategic Growth Through Acquisition",
    mobileDescription: "Ready to Grow Through Acquisition?",
    longDescription:
      "For established building products companies ($10M+ revenue) ready to scale through strategic acquisitions. Kyle's 15+ years of transaction experience and buyer network accelerate your growth strategy.",
    mobileDetails: "For $10M+ companies with acquisition capital\nKyle's network: 200+ qualified targets",
    process: [
      "Acquisition strategy development",
      "Target identification and screening",
      "Valuation analysis and deal structuring",
      "Due diligence management",
      "Integration planning support",
    ],
    link: "/services/buy-side-ma",
    cta: "Schedule Buy-Side Consultation",
    mobileCta: "View Available Targets",
    caseStudy: {
      industry: "Building Materials",
      outcome: "Strategic acquisition",
      highlight: "Identified 12 qualified targets, closed at 10% below initial ask",
    },
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Strategic Advisory",
    description: "Exit Readiness: 12-24 Months Before Your Transaction",
    mobileDescription: "Preparing for Exit in 12-24 Months?",
    longDescription:
      "Not ready to sell today? Kyle's strategic advisory prepares building products founders for optimal exit outcomes when they're ready.",
    mobileDetails: "Kyle's prep work typically adds $2-5M to sale price\n18-month average preparation timeline",
    process: [
      "Financial statement preparation and cleanup",
      "Operational efficiency improvements",
      "Market positioning strategy",
      "Exit timing optimization",
      "Management team development",
    ],
    link: "/services/strategic-advisory",
    cta: "Download: Exit Readiness Scorecard",
    mobileCta: "Take Readiness Assessment",
    caseStudy: {
      industry: "HVAC Services",
      outcome: "2.2x valuation increase",
      highlight: "18-month preparation program before successful exit",
    },
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Capital Raise",
    description: "Growth Capital & Minority Recaps",
    mobileDescription: "Growth Capital Coming 2025",
    longDescription:
      "Kyle is developing growth equity and minority recapitalization services for building products companies ready to accelerate growth without giving up control.",
    mobileDetails: "Growth equity and minority recaps",
    process: [
      "Growth equity raises ($2M-$15M)",
      "Minority recapitalizations",
      "Management buyout financing",
      "Strategic partnership structuring",
    ],
    link: "/services/capital-raise",
    cta: "Join 2025 Waitlist",
    mobileCta: "Join Waitlist",
    comingSoon: true,
    caseStudy: {
      industry: "Service launching Q1 2025",
      outcome: "",
      highlight: "",
    },
  },
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const isMobile = useMediaQuery("(max-width: 768px)")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kyle's Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive M&A and capital advisory services tailored specifically for the building products and services
            industry.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className={`grid grid-cols-1 ${isMobile ? "" : "md:grid-cols-2 lg:grid-cols-4"} gap-8`}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group ${
                service.comingSoon ? "relative overflow-hidden" : ""
              }`}
            >
              {service.comingSoon && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                  COMING 2025
                </div>
              )}
              <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-5">{isMobile ? service.mobileDescription : service.description}</p>

              {isMobile ? (
                <p className="text-gray-700 text-sm mb-5 whitespace-pre-line">{service.mobileDetails}</p>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">{service.longDescription}</p>
                  <div className="mb-5">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">KYLE'S PROCESS:</h4>
                    <ul className="space-y-1">
                      {service.process.map((step, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Case Study */}
              {!service.comingSoon && (
                <div className="bg-gray-50 p-4 rounded-md mb-5">
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">RECENT OUTCOME</h4>
                  <p className="text-gray-700 font-medium">{service.caseStudy.industry}</p>
                  <p className="text-primary font-bold">{service.caseStudy.outcome}</p>
                  <p className="text-gray-600 text-sm mt-1">{service.caseStudy.highlight}</p>
                </div>
              )}

              <Link
                href={service.link}
                className="inline-flex items-center text-primary hover:text-primary-700 font-medium group"
              >
                {isMobile ? service.mobileCta : service.cta}{" "}
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
