"use client"

import { useEffect, useState } from "react"

interface ScriptLoaderProps {
  src: string
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  onLoad?: () => void
  onError?: () => void
  id?: string
}

export default function ScriptLoader({ src, strategy = "afterInteractive", onLoad, onError, id }: ScriptLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Skip if already loaded or if strategy is beforeInteractive (handled by Next.js)
    if (loaded || strategy === "beforeInteractive") return

    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      setLoaded(true)
      if (onLoad) onLoad()
      return
    }

    // For afterInteractive, load immediately
    if (strategy === "afterInteractive") {
      loadScript()
      return
    }

    // For lazyOnload, use Intersection Observer
    if (strategy === "lazyOnload") {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadScript()
          observer.disconnect()
        }
      })

      observer.observe(document.documentElement)
      return () => observer.disconnect()
    }

    function loadScript() {
      const script = document.createElement("script")
      script.src = src
      if (id) script.id = id

      script.onload = () => {
        setLoaded(true)
        if (onLoad) onLoad()
      }

      script.onerror = () => {
        if (onError) onError()
      }

      document.body.appendChild(script)
    }
  }, [src, strategy, onLoad, onError, id, loaded])

  return null
}
