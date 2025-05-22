"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "./header"
import Footer from "./footer"
import { initAccessibilityChecker as initA11yChecker } from "@/lib/a11y-checker"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  // Add hover effects and microinteractions
  useEffect(() => {
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth"

    // Initialize accessibility checker in development
    initA11yChecker()

    return () => {
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-grow" id="main-content" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
