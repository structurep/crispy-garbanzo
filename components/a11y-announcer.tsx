"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

// Singleton for managing announcements
class AnnouncementManager {
  private static instance: AnnouncementManager
  private announcements: string[] = []
  private callbacks: Set<(message: string) => void> = new Set()

  private constructor() {
    // Private constructor for singleton
  }

  public static getInstance(): AnnouncementManager {
    if (!AnnouncementManager.instance) {
      AnnouncementManager.instance = new AnnouncementManager()
    }
    return AnnouncementManager.instance
  }

  public announce(message: string, priority = false): void {
    if (priority) {
      this.announcements.unshift(message)
    } else {
      this.announcements.push(message)
    }
    this.processQueue()
  }

  public subscribe(callback: (message: string) => void): () => void {
    this.callbacks.add(callback)
    return () => this.callbacks.delete(callback)
  }

  private processQueue(): void {
    if (this.announcements.length === 0) return

    const message = this.announcements.shift()
    if (message) {
      this.callbacks.forEach((callback) => callback(message))
    }
  }
}

// Export singleton instance
export const announcer = AnnouncementManager.getInstance()

// Utility function for announcing
export function announce(message: string, priority = false): void {
  announcer.announce(message, priority)
}

// Announcer component
export default function A11yAnnouncer() {
  const [message, setMessage] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    // Subscribe to announcements
    const unsubscribe = announcer.subscribe(setMessage)

    return unsubscribe
  }, [])

  // Announce page changes
  useEffect(() => {
    // Get the page title
    const pageTitle = document.title

    // Announce page change after a short delay to allow screen readers to catch up
    const timer = setTimeout(() => {
      announce(`Navigated to ${pageTitle}`)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
      {message}
    </div>
  )
}
