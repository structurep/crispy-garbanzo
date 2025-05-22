"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Building, TrendingUp, Users, Briefcase } from "lucide-react"
import CalendlyEmbed from "./calendly-embed"

const archetypes = [
  {
    title: "Exiting Founder",
    description: "Ready to sell your business and maximize your life's work",
    icon: <Building className="h-8 w-8 text-primary" />,
    benefits: [
      "Kyle's positioning typically achieves 15-30% higher sale prices",
      "Minimize tax implications with proper structuring",
      "Kyle ensures your legacy continues with the right buyer",
    ],
    userType: "founder",
  },
  {
    title: "Growth-Stage Owner",
    description: "Seeking capital to fuel your next phase of expansion",
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    benefits: [
      "Kyle helps you raise growth capital without giving up control",
      "Structure favorable terms that preserve control",
      "Connect with partners who understand your industry",
    ],
    userType: "founder",
  },
  {
    title: "Private Equity Buyer",
    description: "Looking for quality acquisitions in the building products space",
    icon: <Users className="h-8 w-8 text-primary" />,
    benefits: [
      "Access Kyle's proprietary deal flow",
      "Benefit from Kyle's industry-specific expertise",
      "Streamlined process with qualified opportunities",
    ],
    userType: "investor",
  },
  {
    title: "Strategic Acquirer",
    description: "Seeking complementary businesses for your portfolio",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    benefits: [
      "Find businesses that align with your strategic goals",
      "Leverage Kyle's industry knowledge for proper valuation",
      "Smooth integration planning and execution",
    ],
    userType: "investor",
  },
]

export default function ClientArchetypes() {
  const [activeArchetype, setActiveArchetype] = useState<number | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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
    <section className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Who Kyle Serves
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kyle helps building products founders in these situations:
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {archetypes.map((archetype, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`bg-white p-8 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 ${
                  activeArchetype === index ? "shadow-md -translate-y-1" : ""
                }`}
                onMouseEnter={() => setActiveArchetype(index)}
                onMouseLeave={() => setActiveArchetype(null)}
              >
                <div className="mb-5">{archetype.icon}</div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{archetype.title}</h3>
                <p className="text-gray-600 mb-5">{archetype.description}</p>

                <ul className="space-y-2 mb-6">
                  {archetype.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <CalendlyEmbed
                  userType={archetype.userType}
                  buttonText="Schedule a Consultation"
                  buttonClassName="bg-primary hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-md transition-colors flex items-center justify-center w-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
