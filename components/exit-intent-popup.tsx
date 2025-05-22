"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, Download, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const popupShownRef = useRef(false)

  useEffect(() => {
    setMounted(true)

    // Check if popup has been shown in this session
    const hasSeenPopup = localStorage.getItem("hasSeenExitPopup") === "true"

    if (hasSeenPopup) {
      return
    }

    // Set up exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if the mouse leaves from the top of the page
      if (e.clientY <= 5 && !popupShownRef.current) {
        setIsVisible(true)
        popupShownRef.current = true
      }
    }

    // Set up scroll depth detection (show after 70% scroll)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

      if (scrollPercentage > 70 && !popupShownRef.current) {
        setIsVisible(true)
        popupShownRef.current = true
      }
    }

    // Add event listeners
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("scroll", handleScroll)

    // Set a fallback timer (45 seconds)
    const timer = setTimeout(() => {
      if (!popupShownRef.current) {
        setIsVisible(true)
        popupShownRef.current = true
      }
    }, 45000)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("scroll", handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    localStorage.setItem("hasSeenExitPopup", "true")

    // Close popup after success message is shown
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenExitPopup", "true")
  }

  // Don't render until client-side
  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
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
                      Before you go, get instant access to our comprehensive guide with proven strategies to maximize
                      your exit value.
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
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          <input
                            type="email"
                            id="popup-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          "Get Free Guide"
                        )}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
