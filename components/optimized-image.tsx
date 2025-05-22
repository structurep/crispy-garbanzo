"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getOptimizedImageUrl, getResponsiveSizes, getPlaceholderDataUrl } from "@/lib/image-optimization"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoad?: () => void
  type?: "hero" | "card" | "thumbnail" | "full"
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  fill = false,
  quality = 85,
  placeholder = "blur",
  blurDataURL,
  onLoad,
  type = "card",
  ...props
}: OptimizedImageProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height" | "fill">) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  // Generate a blur placeholder if not provided
  const defaultBlurDataURL = blurDataURL || getPlaceholderDataUrl(width, height)

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  // Handle image error
  const handleError = () => {
    setError(true)
    // Set fallback image
    setImgSrc("/placeholder.svg")
  }

  // Optimize image URL
  useEffect(() => {
    // Only optimize if we have a source
    if (src) {
      const optimizedSrc = getOptimizedImageUrl(src, width, quality)
      setImgSrc(optimizedSrc)
    }
  }, [src, width, quality])

  // Intersection observer for lazy loading
  useEffect(() => {
    // If priority is true, we don't need to observe
    if (priority) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "200px" }, // Start loading when image is 200px from viewport
    )

    // Create a ref element to observe
    const element = document.createElement("div")
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [priority])

  // Ensure alt text is provided
  const safeAlt = alt || "Image"

  // Get responsive sizes if not provided
  const responsiveSizes = sizes || getResponsiveSizes(type)

  // Don't render until we have processed the image source
  if (!imgSrc && !error) return null

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {(isVisible || priority) && (
        <Image
          src={error ? "/placeholder.svg" : imgSrc || src}
          alt={safeAlt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            fill && "object-cover",
          )}
          priority={priority}
          sizes={responsiveSizes}
          quality={quality}
          fill={fill}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          {...props}
        />
      )}

      {/* Loading placeholder */}
      {!isLoaded && <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" aria-hidden="true" />}
    </div>
  )
}
