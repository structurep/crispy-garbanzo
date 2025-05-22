import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/layout"
import CTASection from "@/components/cta-section"
import { fetchBlogPosts, fetchBlogCategories, fetchBlogTags } from "@/lib/cms"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Structured Partners",
  description: "Expert perspectives on M&A and capital strategies for the building products and services industry.",
}

export default async function BlogPage() {
  // Fetch data from CMS
  const allPosts = await fetchBlogPosts()
  const categories = await fetchBlogCategories()
  const tags = await fetchBlogTags()

  // Process data
  const featuredPosts = allPosts.filter((post) => post.featured)
  const recentPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6)

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Insights & Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Expert perspectives on M&A and capital strategies for the building products and services industry.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {post.coverImage && (
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-60 w-full">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="mx-2">•</span>
                        <Link
                          href={`/blog/category/${post.category.toLowerCase().replace(/ /g, "-")}`}
                          className="text-primary hover:text-primary-600"
                        >
                          {post.category}
                        </Link>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 hover:text-primary dark:hover:text-primary mb-3 block"
                      >
                        {post.title}
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary hover:text-primary-700 font-medium inline-flex items-center"
                      >
                        Read more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Posts */}
      <div className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
              <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4 md:mb-0">
                Recent Articles
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category, index) => (
                  <Link
                    key={index}
                    href={`/blog/category/${category.toLowerCase().replace(/ /g, "-")}`}
                    className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
                <Link
                  href="/blog/categories"
                  className="bg-primary text-white px-3 py-1 rounded-full text-sm hover:bg-primary-600 transition-colors"
                >
                  All Categories
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {post.coverImage && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-serif text-xl font-bold text-gray-900 dark:text-gray-50 hover:text-primary dark:hover:text-primary mb-3 block"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    <Link href={`/blog/${post.slug}`} className="text-primary hover:text-primary-700 font-medium">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/blog/archive"
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium px-6 py-3 rounded-md transition-colors inline-block"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center">
              Popular Topics
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`}
                  className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </Layout>
  )
}
