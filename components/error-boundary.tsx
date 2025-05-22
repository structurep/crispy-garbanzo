"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { errorMonitoring } from "@/lib/error-monitoring"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Initialize error monitoring
    errorMonitoring.init()

    // Add error handler
    const handleError = (event: ErrorEvent) => {
      event.preventDefault()
      setHasError(true)
      errorMonitoring.captureError({
        message: event.message,
        source: event.filename || "unknown",
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      })
    }

    // Add unhandled promise rejection handler
    const handleRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault()
      setHasError(true)
      errorMonitoring.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        source: "unhandledrejection",
        error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      })
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleRejection)
    }
  }, [])

  if (hasError) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but something went wrong. Please try refreshing the page or come back later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
