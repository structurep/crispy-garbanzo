import type { Metadata } from "next"

// Base URL for the site
export const siteConfig = {
  name: "Kyle Bobinski | Building Products M&A",
  description: "Former Investment Banking MD for Building Products & Services",
  url: "https://structuredpartners.com",
  ogImage: "/images/og-image.png",
  links: {
    twitter: "https://twitter.com/kylebobinski",
    linkedin: "https://linkedin.com/in/kylebobinski",
  },
}

// Default metadata
export const defaultMetadata: Metadata = {
  title: {
    default: "Kyle Bobinski | Building Products M&A Advisor",
    template: "%s | Kyle Bobinski",
  },
  description:
    "Former Investment Banking MD with 50+ completed transactions. Kyle provides the personal attention your life-changing exit deserves.",
  keywords: [
    "M&A",
    "mergers and acquisitions",
    "building products",
    "exit strategy",
    "capital raise",
    "strategic advisory",
    "Kyle Bobinski",
  ],
  authors: [{ name: "Kyle Bobinski" }],
  creator: "Kyle Bobinski",
  publisher: "Structured Partners",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@kylebobinski",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

// Function to create metadata for specific pages
export function createMetadata({
  title,
  description,
  keywords = [],
  image,
  canonical,
  type = "website",
  publishedTime,
  authors,
}: {
  title: string
  description: string
  keywords?: string[]
  image?: string
  canonical?: string
  type?: "website" | "article"
  publishedTime?: string
  authors?: string[]
}): Metadata {
  const ogImage = image || siteConfig.ogImage

  return {
    title,
    description,
    keywords: [...(defaultMetadata.keywords as string[]), ...keywords],
    alternates: {
      canonical: canonical || "/",
    },
    openGraph: {
      type,
      locale: "en_US",
      url: canonical ? `${siteConfig.url}${canonical}` : siteConfig.url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${siteConfig.url}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@kylebobinski",
    },
    authors: authors ? authors.map((author) => ({ name: author })) : defaultMetadata.authors,
  }
}
