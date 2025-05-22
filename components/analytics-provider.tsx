"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { analytics } from "@/lib/analytics"

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize analytics only once when the component mounts
    analytics.init()
  }, [])

  useEffect(() => {
    // Only track page views if the route changes and after initialization
    if (pathname) {
      // Use a small timeout to ensure analytics is initialized
      const timer = setTimeout(() => {
        analytics.trackPageView()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}
