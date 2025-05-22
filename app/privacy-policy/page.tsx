import Layout from "@/components/layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Structured Partners",
  description: "Learn how we collect, use, and protect your information."
}

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page outlines our commitment to safeguarding your data. Content will be updated soon.
        </p>
      </div>
    </Layout>
  )
}
