"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  author: string
  company: string
  text: string
  image?: string
  role?: string
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[]
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ testimonials }) => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const defaultTestimonials: Testimonial[] = [
    {
      author: "Mike Chen",
      role: "Founder",
      company: "Commercial Painting Company",
      text: "Kyle's personal attention made all the difference. Within 90 days, we had 4 strategic buyers competing for our business. His industry knowledge helped us achieve a 40% premium to the initial offer.",
      image: "/images/testimonial-1.png",
    },
    {
      author: "Sarah Williams",
      role: "CEO",
      company: "Specialty Building Materials",
      text: "Kyle didn't just manage our transaction - he prepared our business to command premium pricing. The strategic advisory work added significant value to our final sale price.",
      image: "/images/testimonial-2.png",
    },
    {
      author: "David Rodriguez",
      role: "President",
      company: "HVAC Services Group",
      text: "As someone who's been through an exit before, Kyle understood exactly what we were facing. His process was professional, confidential, and results-driven.",
      image: "/images/testimonial-3.png",
    },
  ]

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)

    autoPlayRef.current = setInterval(() => {
      if (isAutoPlaying) {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % (testimonials ? testimonials.length : defaultTestimonials.length))
      }
    }, 6000)
  }

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [testimonials, isAutoPlaying])

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setDirection(-1)
    setCurrent(
      (prev) =>
        (prev - 1 + (testimonials ? testimonials.length : defaultTestimonials.length)) %
        (testimonials ? testimonials.length : defaultTestimonials.length),
    )
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setDirection(1)
    setCurrent((prev) => (prev + 1) % (testimonials ? testimonials.length : defaultTestimonials.length))
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  if (!testimonials || testimonials.length === 0) {
    testimonials = defaultTestimonials
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Hear directly from founders who've successfully navigated strategic transactions with our guidance.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 overflow-hidden">
              <div className="absolute top-6 left-6 text-primary opacity-20">
                <Quote size={60} />
              </div>

              <div className="relative min-h-[300px]">
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center md:items-start gap-8"
                  >
                    <div className="md:w-1/4 flex justify-center">
                      <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-900 shadow-lg">
                        {testimonials[current].image ? (
                          <Image
                            src={testimonials[current].image || "/placeholder.svg"}
                            alt={`${testimonials[current].author} from ${testimonials[current].company}`}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="bg-primary-100 dark:bg-primary-900 h-full w-full flex items-center justify-center text-primary text-2xl font-bold">
                            {testimonials[current].author.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="md:w-3/4">
                      <blockquote className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        "{testimonials[current].text}"
                      </blockquote>
                      <div className="flex flex-col">
                        <cite className="text-lg font-semibold text-gray-900 dark:text-gray-50 not-italic">
                          {testimonials[current].author}
                        </cite>
                        <span className="text-primary font-medium">
                          {testimonials[current].role}, {testimonials[current].company}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      current === index ? "bg-primary w-6" : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
