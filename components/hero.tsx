"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Phone } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative bg-gray-50 py-16 md:py-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {isMobile ? (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-2"
              >
                Kyle Bobinski - Investment Banking MD
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-gray-900 mb-2"
              >
                50+ Building Products Transactions Closed
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-900 mb-6"
              >
                Personal Attention for Your Life-Changing Exit
              </motion.p>
            </>
          ) : (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6 }}
                className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                The Investment Banking MD Who Built, Exited, and Now Advises Building Products Companies
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 mb-4"
              >
                Kyle Bobinski combines 15+ years of investment banking experience with real operator insight. As a
                former boutique investment bank Managing Director who closed 50+ transactions, Kyle provides the
                personal attention your life-changing exit deserves.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg font-medium text-gray-800 mb-8"
              >
                Track Record: 95% success rate | Average Result: 15-30% above market norms
              </motion.p>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            {isMobile ? (
              <>
                <Link
                  href="tel:+1XXXXXXXXXX"
                  className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Kyle
                </Link>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Get Valuation
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center group"
                >
                  Meet Kyle
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Get Your Valuation Range
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
