"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const milestones = [
  {
    year: "Early Career",
    title: "Investment Banking Foundation",
    description:
      "After earning his finance degree, Kyle began his career at a boutique investment bank focused on middle-market transactions.",
    image: "/images/origin-1.jpg",
  },
  {
    year: "2010-2015",
    title: "Building Products Focus",
    description:
      "Kyle specialized in building products and services transactions, developing deep industry expertise and a valuable network.",
    image: "/images/origin-2.jpg",
  },
  {
    year: "2015-2020",
    title: "Managing Director Role",
    description:
      "As Managing Director, Kyle led 50+ successful transactions for building products companies, consistently achieving premium valuations.",
    image: "/images/origin-3.jpg",
  },
  {
    year: "2020-2022",
    title: "Industry Recognition",
    description:
      "Kyle's transaction expertise and industry focus earned him recognition as a leading advisor in the building products space.",
    image: "/images/origin-4.jpg",
  },
  {
    year: "Today",
    title: "Structured Partners",
    description:
      "After seeing great founders getting lost in the shuffle at larger firms, Kyle launched Structured Partners to provide the focused, personal attention building products founders deserve.",
    image: "/images/origin-5.jpg",
  },
]

export default function OriginStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Kyle's Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From investment banking Managing Director to founder-focused M&A advisor.
            </p>
          </motion.div>

          <motion.div ref={containerRef} style={{ opacity, scale }} className="relative">
            {/* Horizontal timeline for desktop */}
            <div className="hidden md:block">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 transform -translate-y-1/2" />

              <div className="flex justify-between relative">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-1/5 px-2"
                  >
                    <div className="flex flex-col items-center">
                      {/* Year bubble */}
                      <div className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-4 z-10">
                        {milestone.year}
                      </div>

                      {/* Timeline dot */}
                      <div className="h-4 w-4 rounded-full bg-primary mb-4" />

                      {/* Image */}
                      <div className="rounded-lg overflow-hidden shadow-md mb-4 aspect-video w-full">
                        <Image
                          src={milestone.image || "/placeholder.svg"}
                          alt={milestone.title}
                          width={300}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-50 mb-2 text-center">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm text-center">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Vertical timeline for mobile */}
            <div className="md:hidden">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary to-primary/30" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex"
                  >
                    {/* Year and dot */}
                    <div className="mr-6 flex flex-col items-center">
                      <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full mb-2">
                        {milestone.year}
                      </div>
                      <div className="h-4 w-4 rounded-full bg-primary" />
                      <div className="h-full w-0.5 bg-transparent flex-grow" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{milestone.description}</p>
                        <div className="rounded-lg overflow-hidden shadow-sm">
                          <Image
                            src={milestone.image || "/placeholder.svg"}
                            alt={milestone.title}
                            width={300}
                            height={200}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
