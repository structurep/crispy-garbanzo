import type React from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import {
  LazyVideoHero,
  LazyTestimonialSection,
  LazyProcessTimeline,
  LazyLeadMagnetPopup,
  LazyLiveChatWidget,
} from "./lazy-load-client"

// Loading fallbacks
const DefaultLoadingFallback = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md w-full h-full min-h-[200px]"></div>
)

const HeroLoadingFallback = () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full h-[400px]"></div>

const SectionLoadingFallback = () => (
  <div className="animate-pulse bg-gray-100 dark:bg-gray-800 w-full py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-2/3 mx-auto"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>
    </div>
  </div>
)

// Lazy load components with appropriate fallbacks
// Re-export the components from the client file
export { LazyVideoHero, LazyTestimonialSection, LazyProcessTimeline, LazyLeadMagnetPopup, LazyLiveChatWidget }

// Generic lazy load wrapper
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <DefaultLoadingFallback />,
  options: { ssr?: boolean } = { ssr: true },
) {
  const LazyComponent = dynamic(importFunc, {
    loading: () => <>{fallback}</>,
    ssr: options.ssr,
  })

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

// Re-export the lazyLoad function from "./lazy-load-client"
