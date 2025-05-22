"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"

interface Affiliation {
  name: string
  logo: string
  category: string
}

const affiliations: Affiliation[] = [
  {
    name: "Association for Corporate Growth",
    logo: "/images/affiliations/acg-logo.png",
    category: "Financial",
  },
  {
    name: "Alliance of M&A Advisors",
    logo: "/images/affiliations/amaa-logo.png",
    category: "Financial",
  },
  {
    name: "National Association of Home Builders",
    logo: "/images/affiliations/nahb-logo.png",
    category: "Industry",
  },
  {
    name: "American Institute of Architects",
    logo: "/images/affiliations/aia-logo.png",
    category: "Industry",
  },
  {
    name: "U.S. Green Building Council",
    logo: "/images/affiliations/usgbc-logo.png",
    category: "Industry",
  },
  {
    name: "Cornell University",
    logo: "/images/affiliations/cornell-logo.png",
    category: "Academic",
  },
]

export default function AffiliationsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Our Affiliations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We maintain strong relationships with industry organizations and financial institutions to deliver
              exceptional value.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {affiliations.map((affiliation, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center h-32"
              >
                <div className="h-16 flex items-center justify-center mb-2">
                  <Image
                    src={affiliation.logo || "/placeholder.svg"}
                    alt={affiliation.name}
                    width={120}
                    height={60}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">{affiliation.category}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/affiliations"
              className="inline-flex items-center text-primary hover:text-primary-700 font-medium group"
            >
              View all our affiliations and partnerships{" "}
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
