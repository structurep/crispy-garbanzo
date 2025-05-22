"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight, Award, Briefcase, Users } from "lucide-react"
import { useInView } from "react-intersection-observer"

export default function FounderBioMobile() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">Meet Kyle Bobinski</h2>
          <p className="text-gray-600">Former Investment Banking MD | Building Products Exit Expert</p>
        </div>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="mb-6 relative"
          >
            <div className="rounded-full overflow-hidden border-4 border-primary/10 shadow-lg h-40 w-40 mx-auto">
              <Image
                src="/images/founder-headshot.jpeg"
                alt="Kyle Bobinski"
                width={160}
                height={160}
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700 font-medium">15+ Years Investment Banking MD</span>
              </div>
              <div className="flex items-center justify-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700 font-medium">50+ Building Products Deals Closed</span>
              </div>
              <div className="flex items-center justify-center">
                <Award className="h-5 w-5 text-primary mr-2" />
                <span className="text-gray-700 font-medium">95% Success Rate on Exits</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Kyle works with only 6-8 clients per year by design - each founder gets his complete personal attention
              during their most important business transaction.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <Link
              href="/about"
              className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-medium px-4 py-3 rounded-md transition-colors flex items-center justify-center w-full mb-4"
            >
              More About Kyle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-600 text-white font-medium px-4 py-3 rounded-md transition-colors flex items-center justify-center w-full"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Call with Kyle
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
