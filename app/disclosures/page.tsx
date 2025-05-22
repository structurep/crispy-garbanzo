import Layout from "@/components/layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclosures | Structured Partners",
  description: "Important disclosures and regulatory information."
}

export default function DisclosuresPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl font-bold mb-6">Disclosures</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Relevant disclosures will appear on this page in the future.
        </p>
      </div>
    </Layout>
  )
}
