import { redirect } from "next/navigation"
import { getPostsByCategory } from "@/lib/blog"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.category.replace(/-/g, " ")

  return {
    title: `${category} | Structured Partners Blog`,
    description: `Articles about ${category} in the building products and services industry.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category.replace(/-/g, " ")
  const posts = getPostsByCategory(category)

  // If no posts found, redirect to the main blog page
  if (posts.length === 0) {
    redirect("/blog")
  }

  // Redirect to the blog page with the category filter
  redirect(`/blog?category=${params.category}`)
}
