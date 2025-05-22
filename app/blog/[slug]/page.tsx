import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Layout from "@/components/layout"
import CTASection from "@/components/cta-section"
import { getBlogPost, getRelatedPosts } from "@/lib/blog"
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/schema"
import StructuredData from "@/components/structured-data"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | Structured Partners",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | Structured Partners Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Structured Partners Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage || "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, post.category, 3)
  const readingTime = Math.ceil(post.content.split(" ").length / 200)

  // Generate blog post schema
  const blogPostSchema = generateBlogPostSchema(post)

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  return (
    <Layout>
      <StructuredData data={blogPostSchema} />
      <StructuredData data={breadcrumbSchema} />

      <article className="bg-white dark:bg-gray-950">
        {/* Hero Section */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary-600 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to all posts
              </Link>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 gap-4 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author.name}</span>
                </div>

                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  <Link
                    href={`/blog/category/${post.category.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-primary"
                  >
                    {post.category}
                  </Link>
                </div>

                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {post.coverImage && (
                <div className="mb-10">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    width={900}
                    height={500}
                    className="rounded-lg shadow-md w-full h-auto"
                  />
                </div>
              )}

              <div
                className="prose dark:prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/blog/tag/${tag.toLowerCase().replace(/ /g, "-")}`}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center">
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-serif font-bold text-gray-900 dark:text-gray-50">{post.author.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-900 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      {relatedPost.coverImage && (
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <Image
                            src={relatedPost.coverImage || "/placeholder.svg"}
                            alt={relatedPost.title}
                            width={400}
                            height={225}
                            className="w-full h-48 object-cover"
                          />
                        </Link>
                      )}
                      <div className="p-6">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="font-serif text-xl font-bold text-gray-900 dark:text-gray-50 hover:text-primary dark:hover:text-primary mb-2 block"
                        >
                          {relatedPost.title}
                        </Link>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{relatedPost.excerpt}</p>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-primary hover:text-primary-700 font-medium"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </article>

      <CTASection />
    </Layout>
  )
}
