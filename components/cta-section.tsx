"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section className="py-16 md:py-24 bg-primary text-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-4xl font-bold mb-6"
          >
            {isMobile
              ? "30 Minutes with Kyle Bobinski"
              : "30 Minutes with Kyle Bobinski - Former Investment Banking MD"}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            {isMobile ? (
              <p className="text-lg mb-4">
                Get direct access to a former boutique investment bank MD with 50+ completed transactions
              </p>
            ) : (
              <>
                <p className="text-xl mb-4">
                  Get direct access to a former boutique investment bank MD with 50+ completed transactions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
                  <div className="flex items-start">
                    <span className="font-bold mr-2">✓</span>
                    <span>Personal valuation range estimate for your business</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-2">✓</span>
                    <span>3 specific actions to increase your sale price</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-2">✓</span>
                    <span>Honest assessment of optimal exit timing</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-2">✓</span>
                    <span>Direct conversation with Kyle (no sales team, no junior staff)</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg mb-8"
          >
            Kyle personally handles every initial consultation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="bg-white hover:bg-gray-100 text-primary font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center group"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Your Call with Kyle
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            {isMobile && (
              <div className="mt-4 text-sm">
                <p>Kyle works with only 6-8 clients per year</p>
                <p>Currently accepting new clients for Q2 2025</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
