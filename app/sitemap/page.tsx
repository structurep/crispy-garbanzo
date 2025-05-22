import Layout from "@/components/layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sitemap | Structured Partners",
  description: "Overview of available pages on our site."
}

export default function SitemapPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl font-bold mb-6">Sitemap</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A structured list of site pages will be added here soon.
        </p>
      </div>
    </Layout>
  )
}
