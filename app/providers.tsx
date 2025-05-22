"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { useState, useEffect } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  // Update the useEffect to initialize the accessibility checker
  useEffect(() => {
    setMounted(true)

    // Initialize accessibility checker in development
    if (process.env.NODE_ENV === "development") {
      // Import the accessibility checker dynamically to avoid issues
      import("@/lib/a11y-checker")
        .then(({ initAccessibilityChecker }) => {
          initAccessibilityChecker()
        })
        .catch((err) => {
          console.warn("Failed to load accessibility checker:", err)
        })
    }
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}
