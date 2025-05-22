import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Kyle Bobinski | Building Products M&A Advisor",
  description:
    "Former Investment Banking MD with 50+ completed transactions. Kyle provides the personal attention your life-changing exit deserves.",
  keywords: [
    "Kyle Bobinski",
    "building products M&A",
    "exit strategy",
    "investment banking MD",
    "M&A advisor",
    "founder exit",
  ],
  openGraph: {
    title: "Kyle Bobinski | Building Products M&A Advisor",
    description: "Former Investment Banking MD with 50+ completed transactions.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kyle Bobinski - Building Products M&A Advisor",
      },
    ],
  },
}

export default function Home() {
  return <ClientPage />
}
