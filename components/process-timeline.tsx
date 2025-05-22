"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CheckCircle, ArrowRight, Clock, Users, FileText, PieChart, Briefcase, Award } from "lucide-react"

const processSteps = [
  {
    title: "Strategy Call",
    description: "30 minutes with Kyle personally to understand your goals, timeline, and unique business situation.",
    icon: <Clock className="h-8 w-8 text-white" />,
    details: [
      "Kyle reviews your financials, operations, and market position",
      "Exit timeline planning",
      "Preliminary valuation discussion",
      "Confidentiality protocols established",
    ],
  },
  {
    title: "Business Review",
    description:
      "Kyle conducts a comprehensive analysis of your business, identifying key value drivers and growth opportunities.",
    icon: <PieChart className="h-8 w-8 text-white" />,
    details: [
      "Financial performance review",
      "Operational assessment",
      "Market positioning analysis",
      "Kyle identifies what buyers will pay premium prices for",
    ],
  },
  {
    title: "Strategic Positioning",
    description: "Kyle develops a tailored strategy to position your business for maximum value in the market.",
    icon: <FileText className="h-8 w-8 text-white" />,
    details: [
      "Kyle creates materials that position your business for maximum value",
      "Buyer/investor profile development",
      "Valuation optimization strategy",
      "Pre-market preparation",
    ],
  },
  {
    title: "Buyer Outreach",
    description:
      "Using his industry connections, Kyle identifies and approaches potential buyers that align with your goals.",
    icon: <Users className="h-8 w-8 text-white" />,
    details: [
      "Kyle personally contacts qualified buyers through his network",
      "Buyer qualification",
      "Initial interest management",
      "Preliminary offer solicitation",
    ],
  },
  {
    title: "Negotiation",
    description:
      "Kyle leads negotiations and manages the due diligence process to maximize value and minimize disruption.",
    icon: <Briefcase className="h-8 w-8 text-white" />,
    details: [
      "Kyle negotiates on your behalf to maximize price and terms",
      "Due diligence management",
      "Deal structure optimization",
      "Closing preparation",
    ],
  },
  {
    title: "Closing",
    description: "Kyle guides you through the closing process and ensures a smooth transition to the next chapter.",
    icon: <Award className="h-8 w-8 text-white" />,
    details: [
      "Final document preparation",
      "Closing coordination",
      "Post-closing transition support",
      "Relationship continuity",
    ],
  },
]

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
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
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Kyle's Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A proven methodology that guides founders through every step of their strategic transaction.
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"} className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary to-primary/30 hidden md:block" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`flex flex-col md:flex-row gap-6 mb-12 ${index === processSteps.length - 1 ? "" : "pb-12"}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="md:w-16 flex-shrink-0 flex justify-center">
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                      activeStep === index ? "bg-primary scale-110 shadow-lg shadow-primary/30" : "bg-primary/80"
                    }`}
                  >
                    {step.icon}
                  </div>
                </div>
                <div
                  className={`flex-grow bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 ${
                    activeStep === index ? "shadow-md -translate-y-1" : ""
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-50">
                      {index + 1}. {step.title}
                    </h3>
                    {index < processSteps.length - 1 && <ArrowRight className="h-5 w-5 text-primary hidden md:block" />}
                    {index === processSteps.length - 1 && (
                      <CheckCircle className="h-5 w-5 text-green-500 hidden md:block" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>

                  {/* Expandable details */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeStep === index ? "auto" : 0,
                      opacity: activeStep === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mt-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Components:</h4>
                      <ul className="space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2 text-sm">•</span>
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
