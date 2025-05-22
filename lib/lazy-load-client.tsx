"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { Suspense } from "react"

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
export const LazyVideoHero = dynamic(() => import("@/components/video-hero"), {
  loading: () => <HeroLoadingFallback />,
  ssr: false,
})

export const LazyTestimonialSection = dynamic(() => import("@/components/testimonial-section"), {
  loading: () => <SectionLoadingFallback />,
  ssr: true,
})

export const LazyProcessTimeline = dynamic(() => import("@/components/process-timeline"), {
  loading: () => <SectionLoadingFallback />,
  ssr: true,
})

export const LazyLeadMagnetPopup = dynamic(() => import("@/components/lead-magnet-popup"), {
  ssr: false,
})

export const LazyLiveChatWidget = dynamic(() => import("@/components/live-chat-widget"), {
  ssr: false,
})

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
