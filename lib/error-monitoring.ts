import React from "react"
// Simple error monitoring utility

// Types
interface ErrorEvent {
  message: string
  source: string
  lineno?: number
  colno?: number
  error?: Error
  componentStack?: string
  timestamp: string
  url: string
  userAgent: string
}

// Error monitoring class
class ErrorMonitoring {
  private static instance: ErrorMonitoring
  private initialized = false
  private errors: ErrorEvent[] = []

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): ErrorMonitoring {
    if (!ErrorMonitoring.instance) {
      ErrorMonitoring.instance = new ErrorMonitoring()
    }
    return ErrorMonitoring.instance
  }

  // Initialize error monitoring
  public init(): void {
    if (this.initialized || typeof window === "undefined") return

    // Add global error handler
    window.addEventListener("error", (event) => {
      this.captureError({
        message: event.message,
        source: event.filename || "unknown",
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      })
    })

    // Add unhandled promise rejection handler
    window.addEventListener("unhandledrejection", (event) => {
      this.captureError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        source: "unhandledrejection",
        error: event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      })
    })

    this.initialized = true

    // Send errors periodically
    setInterval(() => this.sendErrors(), 10000)
  }

  // Capture error
  public captureError(error: ErrorEvent): void {
    if (!this.initialized && typeof window !== "undefined") this.init()

    this.errors.push(error)

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error captured:", error)
    }

    // If we have too many errors, send them immediately
    if (this.errors.length >= 5) {
      this.sendErrors()
    }
  }

  // Manually capture error
  public captureException(error: Error, componentStack?: string): void {
    if (typeof window === "undefined") return

    this.captureError({
      message: error.message,
      source: error.name,
      error,
      componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    })
  }

  // Send errors to backend
  private async sendErrors(): Promise<void> {
    if (this.errors.length === 0) return

    const errorsToSend = [...this.errors]
    this.errors = []

    try {
      // In a real implementation, this would send to your error monitoring service
      console.log("Sending error events:", errorsToSend)

      // Simulate sending to backend
      // await fetch('/api/error-monitoring', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ errors: errorsToSend })
      // })
    } catch (error) {
      // If sending fails, add errors back to queue
      console.error("Failed to send error events:", error)
      this.errors = [...errorsToSend, ...this.errors]
    }
  }
}

// Export singleton instance
export const errorMonitoring = ErrorMonitoring.getInstance()

// Error boundary component
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    errorMonitoring.captureException(error, errorInfo.componentStack)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong. Please try again later.</div>
    }

    return this.props.children
  }
}
