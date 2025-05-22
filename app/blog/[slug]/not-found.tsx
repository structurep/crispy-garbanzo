import Link from "next/link"
import Layout from "@/components/layout"

export default function BlogNotFound() {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Article Not Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We couldn't find the article you're looking for. It may have been moved or deleted.
            </p>
            <Link
              href="/blog"
              className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors inline-block"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
