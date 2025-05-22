"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Download, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if user has dismissed the CTA in this session
    const hasBeenDismissed = sessionStorage.getItem("ctaDismissed") === "true"
    setIsDismissed(hasBeenDismissed)

    const handleScroll = () => {
      // Show the sticky CTA after scrolling down 800px
      if (window.scrollY > 800 && !hasBeenDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem("ctaDismissed", "true")
  }

  // Don't render until client-side
  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg z-50 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-primary/10 p-2 rounded-full mr-4 hidden sm:block">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-gray-900 dark:text-gray-50 text-lg">
                    Ready to discuss your exit strategy?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm hidden sm:block">
                    Schedule a confidential call with Kyle Bobinski
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center shadow-md"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Call
                </Link>
                <Link
                  href="/resources/playbook"
                  className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium px-4 py-2 rounded-md transition-colors flex items-center shadow-md"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Download</span> Playbook
                </Link>
                <button
                  onClick={handleDismiss}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Dismiss"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
