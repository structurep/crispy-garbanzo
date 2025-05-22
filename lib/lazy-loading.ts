"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"

// Hook to detect when an element is in viewport
export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
        ...options,
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [options])

  return [ref, isInView]
}

// Hook to lazy load images
export function useLazyImage(src: string, placeholder = "/placeholder.svg") {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [imageRef, isInView] = useInView()

  useEffect(() => {
    if (isInView && src) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
      }
    }
  }, [isInView, src])

  return [imageRef, imageSrc, isInView]
}

// Hook to lazy load components
export function useLazyComponent<T>(factory: () => Promise<{ default: React.ComponentType<T> }>, options = {}) {
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null)
  const [ref, isInView] = useInView(options)

  useEffect(() => {
    if (isInView && !Component) {
      let isMounted = true
      factory().then((module) => {
        if (isMounted) {
          setComponent(() => module.default)
        }
      })
      return () => {
        isMounted = false
      }
    }
  }, [isInView, Component, factory])

  return [ref, Component]
}
