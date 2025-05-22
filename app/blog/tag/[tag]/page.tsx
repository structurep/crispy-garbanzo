import { redirect } from "next/navigation"
import { getPostsByTag } from "@/lib/blog"
import type { Metadata } from "next"

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = params.tag.replace(/-/g, " ")

  return {
    title: `${tag} | Structured Partners Blog`,
    description: `Articles tagged with ${tag} in the building products and services industry.`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = params.tag.replace(/-/g, " ")
  const posts = getPostsByTag(tag)

  // If no posts found, redirect to the main blog page
  if (posts.length === 0) {
    redirect("/blog")
  }

  // Redirect to the blog page with the tag filter
  redirect(`/blog?tag=${params.tag}`)
}
