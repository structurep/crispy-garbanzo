import { siteConfig } from "./metadata"
import type { BlogPost } from "./blog"
import type { Affiliation } from "./affiliations"

// Organization schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Structured Partners",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/structured-partners-logo.svg`,
    description: "M&A Advisory for Building Products & Services",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chicago",
      addressRegion: "IL",
      postalCode: "60601",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+15555555555",
      contactType: "customer service",
    },
    sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin],
  }
}

// Website schema
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Structured Partners",
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

// Local Business schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Structured Partners",
    image: `${siteConfig.url}/images/og-image.png`,
    "@id": `${siteConfig.url}/#organization`,
    url: siteConfig.url,
    telephone: "+15555555555",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main Street, Suite 400",
      addressLocality: "Chicago",
      addressRegion: "IL",
      postalCode: "60601",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.8781,
      longitude: -87.6298,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [siteConfig.links.twitter, siteConfig.links.linkedin],
  }
}

// Service schema
export function generateServiceSchema(service: {
  name: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Structured Partners",
      url: siteConfig.url,
    },
    url: `${siteConfig.url}${service.url}`,
  }
}

// Blog post schema
export function generateBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `${siteConfig.url}${post.coverImage}` : `${siteConfig.url}/images/og-image.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Structured Partners",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/structured-partners-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags ? post.tags.join(", ") : "",
    articleSection: post.category,
  }
}

// FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

// Affiliation schema
export function generateAffiliationSchema(affiliation: Affiliation) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: affiliation.name,
    description: affiliation.description,
    url: affiliation.url || `${siteConfig.url}/affiliations/${affiliation.name.toLowerCase().replace(/\s+/g, "-")}`,
    logo: affiliation.logo ? `${siteConfig.url}${affiliation.logo}` : undefined,
  }
}
