// Image optimization utility

// Function to get optimized image URL
export function getOptimizedImageUrl(src: string, width?: number, quality?: number): string {
  // If the image is already from an optimization service, return as is
  if (src.includes("imagedelivery.net") || src.includes("imagecdn.app") || src.includes("res.cloudinary.com")) {
    return src
  }

  // If it's a local image, add width and quality parameters
  if (src.startsWith("/")) {
    const params = new URLSearchParams()
    if (width) params.set("w", width.toString())
    if (quality) params.set("q", quality.toString())

    const queryString = params.toString()
    return `${src}${queryString ? `?${queryString}` : ""}`
  }

  // Return original for external images
  return src
}

// Function to get appropriate image sizes attribute
export function getResponsiveSizes(type: "hero" | "card" | "thumbnail" | "full" = "card"): string {
  switch (type) {
    case "hero":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
    case "card":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    case "thumbnail":
      return "(max-width: 640px) 50vw, 150px"
    case "full":
      return "100vw"
    default:
      return "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  }
}

// Function to get placeholder blur data URL for an image
export function getPlaceholderDataUrl(width: number, height: number, color = "f3f4f6"): string {
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='100%25' height='100%25' fill='%23${color}'/%3E%3C/svg%3E`
}
