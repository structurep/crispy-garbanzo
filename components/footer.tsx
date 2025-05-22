"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowRight, Linkedin, Twitter, Facebook, Calendar, Phone } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/structured-partners-logo.svg"
                alt="Structured Partners"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Kyle Bobinski personally handles your transaction from preparation through closing. Former boutique
              investment bank MD with 50+ completed transactions focused exclusively on building products and services.
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/sell-side-ma" className="text-gray-600 hover:text-primary transition-colors">
                  Sell-Side M&A
                </Link>
              </li>
              <li>
                <Link href="/services/capital-raise" className="text-gray-600 hover:text-primary transition-colors">
                  Capital Raise
                </Link>
              </li>
              <li>
                <Link
                  href="/services/strategic-advisory"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Strategic Advisory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-gray-600 hover:text-primary transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/affiliations" className="text-gray-600 hover:text-primary transition-colors">
                  Affiliations
                </Link>
              </li>
              <li>
                <Link href="/resources/playbook" className="text-gray-600 hover:text-primary transition-colors">
                  Exit Playbook
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Subscribe to Our Insights</h3>
            <p className="text-gray-600 mb-4">
              Get our latest M&A insights and industry updates delivered to your inbox.
            </p>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  Thank you for subscribing! Check your inbox for a confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-r-md transition-colors disabled:opacity-70 flex items-center"
                  >
                    {isSubmitting ? "..." : <ArrowRight className="h-5 w-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  By subscribing, you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-primary">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-serif font-bold text-xl text-gray-900 mb-3">
              Ready to Discuss Your Building Products Exit?
            </h3>
            <p className="text-gray-600 mb-4">
              Kyle Bobinski personally handles every initial consultation. Get direct access to 15+ years of investment
              banking experience focused exclusively on building products and services.
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-gray-700 font-medium">What You'll Get:</p>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Personal 30-minute consultation with Kyle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Custom valuation range for your business</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">Specific next steps to maximize your exit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span className="text-gray-700">No obligation, no sales pitch</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-md transition-colors flex items-center justify-center"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule 30 Minutes with Kyle
              </Link>
              <Link
                href="tel:+1XXXXXXXXXX"
                className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-medium px-4 py-2 rounded-md transition-colors flex items-center justify-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Kyle Directly: XXX-XXX-XXXX
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; {currentYear} Structured Partners. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <Link href="/privacy" className="text-gray-500 text-sm hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 text-sm hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/disclosures" className="text-gray-500 text-sm hover:text-primary">
              Disclosures
            </Link>
            <Link href="/sitemap" className="text-gray-500 text-sm hover:text-primary">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
