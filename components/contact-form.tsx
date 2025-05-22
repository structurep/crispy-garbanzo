"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Calendar } from "lucide-react"

export default function ContactForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    interestArea: "sell-side-ma",
    bestTimeToCall: "morning",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Please enter a valid email address"
    if (!formData.company.trim()) errors.company = "Company name is required"
    if (!formData.message.trim()) errors.message = "Message is required"

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    // Validate form
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      // Form submitted successfully
      setFormSuccess(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        interestArea: "sell-side-ma",
        bestTimeToCall: "morning",
      })

      // Redirect to thank you page after a delay
      setTimeout(() => {
        router.push("/thank-you")
      }, 3000)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      {formSuccess ? (
        <div className="text-center py-8">
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full p-3 inline-flex mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Your message has been received. We'll get back to you shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
                className={`w-full px-4 py-3 border ${
                  fieldErrors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              />
              {fieldErrors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.company}
                aria-describedby={fieldErrors.company ? "company-error" : undefined}
                className={`w-full px-4 py-3 border ${
                  fieldErrors.company ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              />
              {fieldErrors.company && (
                <p id="company-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.company}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 border ${
                  fieldErrors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
              />
              {fieldErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-500">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="interestArea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Area of Interest *
            </label>
            <select
              id="interestArea"
              name="interestArea"
              value={formData.interestArea}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="sell-side-ma">Sell-Side M&A</option>
              <option value="buy-side-ma">Buy-Side M&A</option>
              <option value="strategic-advisory">Strategic Advisory</option>
              <option value="capital-raise">Capital Raise (2025)</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="bestTimeToCall" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Best Time to Call
            </label>
            <select
              id="bestTimeToCall"
              name="bestTimeToCall"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="morning">Morning (9am-12pm)</option>
              <option value="afternoon">Afternoon (12pm-5pm)</option>
              <option value="evening">Evening (After 5pm)</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brief Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              className={`w-full px-4 py-3 border ${
                fieldErrors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
              } rounded-md focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
            ></textarea>
            {fieldErrors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-500">
                {fieldErrors.message}
              </p>
            )}
          </div>

          {formError && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
              {formError}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Call with Kyle
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By submitting this form, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </form>
      )}
    </div>
  )
}
