import Layout from "@/components/layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Structured Partners",
  description: "Review the terms and conditions for using our website."
}

export default function TermsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The full terms of service will be posted here shortly.
        </p>
      </div>
    </Layout>
  )
}
