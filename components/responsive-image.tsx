"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getOptimizedImageProps } from "@/lib/image-utils"

interface ResponsiveImageProps {
  src: string
  alt: string
  type?: "thumbnail" | "card" | "hero" | "profile" | "logo" | "icon"
  className?: string
  priority?: boolean
  fill?: boolean
  objectFit?: "cover" | "contain" | "fill"
  sizes?: string
  onLoad?: () => void
}

export default function ResponsiveImage({
  src,
  alt,
  type = "card",
  className,
  priority = false,
  fill = false,
  objectFit = "cover",
  sizes,
  onLoad,
  ...props
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Get optimized image props
  const imageProps = getOptimizedImageProps(src, alt, type, priority)

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  // Handle image error
  const handleError = () => {
    setError(true)
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        {...imageProps}
        src={error ? "/placeholder.svg" : imageProps.src}
        fill={fill}
        sizes={sizes || imageProps.sizes}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          fill && `object-${objectFit}`,
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Loading placeholder */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"
          aria-hidden="true"
          style={{
            width: fill ? "100%" : imageProps.width,
            height: fill ? "100%" : imageProps.height,
          }}
        />
      )}
    </div>
  )
}
