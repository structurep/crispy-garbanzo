"use client"

import { useState, useEffect } from "react"

export default function SkipLink() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-white focus:text-primary focus:px-4 focus:py-2 focus:outline-none"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}
