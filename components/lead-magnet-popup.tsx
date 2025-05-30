"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function LeadMagnetPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenPopup")

    if (!hasSeenPopup) {
      // Set up exit intent detection
      const handleMouseLeave = (e: MouseEvent) => {
        if (!hasInteracted && e.clientY <= 0) {
          setIsVisible(true)
          setHasInteracted(true)
        }
      }

      // Or show after 30 seconds
      const timer = setTimeout(() => {
        if (!hasInteracted) {
          setIsVisible(true)
          setHasInteracted(true)
        }
      }, 30000)

      document.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave)
        clearTimeout(timer)
      }
    }
  }, [hasInteracted])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    localStorage.setItem("hasSeenPopup", "true")
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenPopup", "true")
  }

  // Don't render until client-side
  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full p-3 inline-flex mb-4">
                    <Download className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Your guide is on its way to your inbox.</p>
                  <a
                    href="/resources/founders-guide-to-selling.pdf"
                    download
                    className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-2 rounded-md transition-colors inline-block"
                  >
                    Download Now
                  </a>
                </div>
              ) : (
                <>
                  <div className="bg-primary text-white py-4 px-6 -mx-6 -mt-6 mb-6">
                    <h3 className="text-xl font-bold">The Founder's Guide to Selling Your Business</h3>
                    <p className="text-primary-100 mt-1">Free 25-page playbook with actionable strategies</p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Get instant access to our comprehensive guide with proven strategies to maximize your exit value.
                    </p>

                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">Valuation enhancement tactics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">Deal structure optimization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">Negotiation strategies from both sides</span>
                      </li>
                    </ul>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <label
                          htmlFor="popup-email"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="popup-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-800"
                          placeholder="you@company.com"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70"
                      >
                        {isSubmitting ? "Sending..." : "Get Free Guide"}
                      </button>

                      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </form>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
