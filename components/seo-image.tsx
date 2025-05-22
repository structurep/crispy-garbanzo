import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SEOImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function SEOImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  ...props
}: SEOImageProps & Omit<React.ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">) {
  // Ensure alt text is provided
  const safeAlt = alt || "Image"

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={safeAlt}
      width={width}
      height={height}
      className={cn("", className)}
      priority={priority}
      sizes={sizes}
      {...props}
    />
  )
}
