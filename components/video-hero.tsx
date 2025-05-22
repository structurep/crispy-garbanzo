"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Download } from "lucide-react"

export default function VideoHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Check if video can be loaded
    const video = document.createElement("video")
    video.oncanplay = () => setVideoLoaded(true)
    video.onerror = () => setVideoLoaded(false)
    video.src = "/videos/hero-background.mp4"

    // Preload the video
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
      {/* Video background with fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        {videoLoaded ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            poster="/images/hero-fallback.png"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            We've been in your seat — <span className="text-primary">and your buyer's</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
            Your Deal Sherpa — From First Pitch to Final Check. We pair institutional M&A experience with hard-earned
            operator insight to help founder-led businesses achieve optimal outcomes.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center group shadow-lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Strategy Call
              <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/resources/playbook"
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Exit Playbook
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle animated arrow indicating scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  )
}
