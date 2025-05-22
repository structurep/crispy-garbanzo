import { generateSitemapXml } from "@/lib/sitemap"

export async function GET() {
  // Generate the XML sitemap
  const sitemap = generateSitemapXml()

  // Return the sitemap with appropriate headers
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
