import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
// Import the SkipLink component
import SkipLink from "@/components/skip-link"
// Import the Providers component
import { Providers } from "./providers"
// Import the AnalyticsProvider component
import AnalyticsProvider from "@/components/analytics-provider"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <AnalyticsProvider>
          <Providers>
            <div id="main-content" tabIndex={-1}>
              {children}
            </div>
          </Providers>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
