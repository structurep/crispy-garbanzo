// Simple analytics utility for tracking page views and events

// Types
type EventType = "page_view" | "click" | "form_submit" | "cta_click" | "chat_open" | "download"

interface AnalyticsEvent {
  type: EventType
  page: string
  timestamp: string
  data?: Record<string, any>
}

// Analytics class
class Analytics {
  private static instance: Analytics
  private initialized = false
  private events: AnalyticsEvent[] = []
  private userId: string | null = null
  private sessionId: string | null = null
  private isInitializing = false // Flag to prevent recursive calls

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics()
    }
    return Analytics.instance
  }

  // Initialize analytics
  public init(): void {
    // Prevent re-initialization and recursive calls
    if (this.initialized || this.isInitializing) return

    this.isInitializing = true

    if (typeof window !== "undefined") {
      // Generate session ID
      this.sessionId = this.generateId()

      // Try to get user ID from localStorage
      try {
        this.userId = localStorage.getItem("analytics_user_id")

        if (!this.userId) {
          this.userId = this.generateId()
          localStorage.setItem("analytics_user_id", this.userId)
        }
      } catch (e) {
        // Handle localStorage errors
        console.warn("Analytics: Unable to access localStorage", e)
        this.userId = this.generateId()
      }

      // Add listeners for navigation events
      window.addEventListener("popstate", () => {
        // Don't call trackPageView directly to avoid potential recursion
        this.trackEvent("page_view", {
          url: window.location.href,
          referrer: document.referrer,
          title: document.title,
        })
      })

      this.initialized = true
      this.isInitializing = false

      // Track initial page view - but only after initialization is complete
      this.trackEvent("page_view", {
        url: window.location.href,
        referrer: document.referrer,
        title: document.title,
      })

      // Send events periodically
      setInterval(() => this.sendEvents(), 30000)
    } else {
      this.isInitializing = false
    }
  }

  // Track page view - modified to avoid recursion
  public trackPageView(): void {
    // Only track if already initialized, don't auto-initialize here
    if (!this.initialized) return

    this.trackEvent("page_view", {
      url: window.location.href,
      referrer: document.referrer,
      title: document.title,
    })
  }

  // Track event
  public trackEvent(type: EventType, data?: Record<string, any>): void {
    // Only proceed if initialized
    if (!this.initialized) return

    const event: AnalyticsEvent = {
      type,
      page: typeof window !== "undefined" ? window.location.pathname : "",
      timestamp: new Date().toISOString(),
      data,
    }

    this.events.push(event)

    // If we have too many events, send them immediately
    if (this.events.length >= 10) {
      this.sendEvents()
    }
  }

  // Send events to backend
  private async sendEvents(): Promise<void> {
    if (this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    try {
      // In a real implementation, this would send to your analytics endpoint
      console.log("Sending analytics events:", eventsToSend)

      // Simulate sending to backend
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userId: this.userId,
      //     sessionId: this.sessionId,
      //     events: eventsToSend
      //   })
      // })
    } catch (error) {
      // If sending fails, add events back to queue
      console.error("Failed to send analytics events:", error)
      this.events = [...eventsToSend, ...this.events]
    }
  }

  // Generate random ID
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance()

// Utility functions for common events
export function trackCtaClick(ctaName: string, ctaLocation: string): void {
  analytics.trackEvent("cta_click", { ctaName, ctaLocation })
}

export function trackFormSubmit(formName: string, success: boolean): void {
  analytics.trackEvent("form_submit", { formName, success })
}

export function trackDownload(fileName: string, fileType: string): void {
  analytics.trackEvent("download", { fileName, fileType })
}
