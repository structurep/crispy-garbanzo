"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import { Award, TrendingUp, Users, BarChart4, Briefcase, Shield } from "lucide-react"

const DifferentiationSection = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const qualifications = [
    {
      icon: <Briefcase className="h-6 w-6 text-[#E35F4F]" />,
      title: "15+ Years as Investment Banking MD",
      description: "Exclusive focus on building products and services - Kyle knows your industry inside and out",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-[#E35F4F]" />,
      title: "50+ Deals Closed as Boutique IB MD",
      description: "Proven track record of successful deals",
    },
    {
      icon: <Users className="h-6 w-6 text-[#E35F4F]" />,
      title: "Personal Attention",
      description: "Kyle works with only 6-8 clients per year",
    },
    {
      icon: <Award className="h-6 w-6 text-[#E35F4F]" />,
      title: "95% Success Rate",
      description: "On engaged sell-side processes",
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-[#E35F4F]" />,
      title: "Results-Driven Process",
      description: "With proven track record",
    },
    {
      icon: <Shield className="h-6 w-6 text-[#E35F4F]" />,
      title: "Confidential Process",
      description: "Secure and discreet transaction management",
    },
  ]

  const dealVisuals = [
    {
      industry: "Commercial Roofing",
      dealSize: "$5M-$25M",
      image: "/images/deal-tech.png",
    },
    {
      industry: "Specialty Building Materials",
      dealSize: "$5M-$25M",
      image: "/images/deal-manufacturing.png",
    },
    {
      industry: "HVAC Services",
      dealSize: "$5M-$25M",
      image: "/images/deal-healthcare.png",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="text-[#E35F4F]">Kyle Bobinski</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer a unique blend of expertise, innovation, and founder-centric solutions. Our commitment to
            excellence sets us apart in the M&A advisory landscape.
          </p>
        </div>

        {/* Operator Qualifications */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {qualifications.map((qual, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#E35F4F]"
            >
              <div className="flex items-start">
                <div className="mr-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-full">{qual.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{qual.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{qual.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Deal Visuals */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Recent Transaction Experience
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dealVisuals.map((deal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <Image
                    src={`/abstract-geometric-shapes.png?height=300&width=500&query=${deal.industry} business deal`}
                    alt={`${deal.industry} transaction`}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-xl font-bold mb-1">{deal.industry}</h4>
                  <p className="text-sm text-gray-200 mb-2">Deal Size: {deal.dealSize}</p>
                  <div className="w-12 h-1 bg-[#E35F4F] rounded-full mb-3" />
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Successful {deal.industry.toLowerCase()} transaction with strategic buyer alignment and premium
                    valuation.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience Highlight */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Operator Experience That Matters</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Our team brings real-world operational experience to every transaction. We've been in your shoes as
              founders, operators, and executives, giving us unique insight into the challenges and opportunities you
              face.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <span className="mr-2 text-[#E35F4F]">✓</span> Founder-to-founder understanding
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <span className="mr-2 text-[#E35F4F]">✓</span> Industry-specific expertise
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <span className="mr-2 text-[#E35F4F]">✓</span> Strategic growth planning
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <span className="mr-2 text-[#E35F4F]">✓</span> Value-driven transaction approach
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Image
              src="/images/operator-experience.png"
              alt="Operator experience illustration showing business growth and expertise"
              width={500}
              height={350}
              className="rounded-lg shadow-xl object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#E35F4F] text-white p-4 rounded-lg shadow-lg">
              <p className="font-bold text-xl">20+</p>
              <p className="text-sm">Years Combined Experience</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DifferentiationSection
