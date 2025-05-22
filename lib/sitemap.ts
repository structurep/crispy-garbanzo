import { getAllBlogPosts } from "./blog"
import { getAffiliations } from "./affiliations"

// Base URL for the site
const BASE_URL = "https://structuredpartners.com"

// Interface for sitemap entry
interface SitemapEntry {
  url: string
  lastModified?: string
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

// Function to generate sitemap entries
export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = []

  // Add static pages
  const staticPages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/insights", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/affiliations", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/services/sell-side-ma", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/capital-raise", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/strategic-advisory", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/resources/playbook", priority: 0.8, changeFrequency: "monthly" as const },
  ]

  // Add static pages to entries
  staticPages.forEach((page) => {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      lastModified: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    })
  })

  // Add blog posts
  const blogPosts = getAllBlogPosts()
  blogPosts.forEach((post) => {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date).toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.7,
    })
  })

  // Add blog category pages
  const categories = [...new Set(blogPosts.map((post) => post.category))]
  categories.forEach((category) => {
    entries.push({
      url: `${BASE_URL}/blog/category/${category.toLowerCase().replace(/ /g, "-")}`,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  })

  // Add blog tag pages
  const tags = new Set<string>()
  blogPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tags.add(tag))
    }
  })
  Array.from(tags).forEach((tag) => {
    entries.push({
      url: `${BASE_URL}/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  })

  // Add affiliation pages
  const affiliations = getAffiliations()
  affiliations.forEach((affiliation) => {
    entries.push({
      url: `${BASE_URL}/affiliations/${affiliation.name.toLowerCase().replace(/\s+/g, "-")}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  })

  return entries
}

// Function to generate XML sitemap
export function generateSitemapXml(): string {
  const entries = generateSitemapEntries()

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  entries.forEach((entry) => {
    xml += "  <url>\n"
    xml += `    <loc>${entry.url}</loc>\n`
    if (entry.lastModified) {
      xml += `    <lastmod>${entry.lastModified}</lastmod>\n`
    }
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`
    }
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`
    }
    xml += "  </url>\n"
  })

  xml += "</urlset>"

  return xml
}
