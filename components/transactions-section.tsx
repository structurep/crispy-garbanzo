"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const transactionTypes = ["All", "Sell-Side M&A", "Capital Raise", "Strategic Advisory"]

const transactions = [
  {
    company: "Commercial Painting Co.",
    industry: "Commercial Services",
    type: "Sell-Side M&A",
    outcome: "Acquired by Strategic Buyer",
    highlight: "3.8x EBITDA multiple",
    year: "2023",
  },
  {
    company: "Building Materials Manufacturer",
    industry: "Manufacturing",
    type: "Capital Raise",
    outcome: "$12M Growth Equity",
    highlight: "Non-dilutive structure",
    year: "2022",
  },
  {
    company: "HVAC Services Provider",
    industry: "Mechanical Services",
    type: "Sell-Side M&A",
    outcome: "Acquired by Private Equity",
    highlight: "4.2x EBITDA multiple",
    year: "2022",
  },
  {
    company: "Roofing Contractor",
    industry: "Construction Services",
    type: "Strategic Advisory",
    outcome: "Valuation Increase",
    highlight: "2.2x value growth in 18 months",
    year: "2021",
  },
  {
    company: "Plumbing Supply Distributor",
    industry: "Distribution",
    type: "Capital Raise",
    outcome: "$8M Debt Financing",
    highlight: "Below-market interest rate",
    year: "2021",
  },
  {
    company: "Home Builder",
    industry: "Residential Construction",
    type: "Sell-Side M&A",
    outcome: "Acquired by Strategic Buyer",
    highlight: "5.1x EBITDA multiple",
    year: "2020",
  },
]

export default function TransactionsSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const filteredTransactions =
    activeFilter === "All" ? transactions : transactions.filter((t) => t.type === activeFilter)

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
    <section className="py-16 md:py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A selection of our recent successful transactions in the building products and services industry.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {transactionTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === type ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={index}
                variants={item}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif font-bold text-gray-900">{transaction.company}</h3>
                    <p className="text-gray-600 text-sm">{transaction.industry}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{transaction.year}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-md mb-3">
                  <p className="text-primary font-bold">{transaction.outcome}</p>
                  <p className="text-gray-700 text-sm">{transaction.highlight}</p>
                </div>
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  {transaction.type}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
