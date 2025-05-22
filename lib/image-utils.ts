// Image optimization utilities

import { getOptimizedImageUrl, getResponsiveSizes, getPlaceholderDataUrl } from "@/lib/image-optimization"

// Define standard image sizes for different contexts
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 400, height: 225 },
  hero: { width: 1200, height: 600 },
  profile: { width: 300, height: 300 },
  logo: { width: 180, height: 60 },
  icon: { width: 48, height: 48 },
}

// Generate alt text for images based on context and filename
export function generateAltText(filename: string, context?: string): string {
  // Remove file extension and convert to readable format
  const name = filename.split("/").pop()?.split(".")[0] || ""
  const readableName = name.replace(/-/g, " ").replace(/_/g, " ")

  // Capitalize first letter of each word
  const formattedName = readableName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Add context if provided
  return context ? `${formattedName} - ${context}` : formattedName
}

// Check if an image has appropriate alt text
export function checkImageAlt(alt: string | undefined): boolean {
  // Alt should exist and not be generic
  return !!alt && alt !== "image" && alt !== "photo" && alt !== "picture" && alt !== "icon" && alt.length > 3
}

// Get optimized image props for next/image
export function getOptimizedImageProps(
  src: string,
  alt: string,
  type: "thumbnail" | "card" | "hero" | "profile" | "logo" | "icon" = "card",
  priority = false,
) {
  const size = imageSizes[type]

  return {
    src: getOptimizedImageUrl(src, size.width),
    alt: checkImageAlt(alt) ? alt : generateAltText(src),
    width: size.width,
    height: size.height,
    sizes: getResponsiveSizes(
      type === "thumbnail" || type === "icon" || type === "logo" ? "thumbnail" : type === "hero" ? "hero" : "card",
    ),
    priority,
    placeholder: "blur",
    blurDataURL: getPlaceholderDataUrl(size.width, size.height),
  }
}
