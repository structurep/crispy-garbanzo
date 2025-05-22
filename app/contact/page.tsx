import Layout from "@/components/layout"
import ContactForm from "@/components/contact-form"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/schema"
import StructuredData from "@/components/structured-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Structured Partners",
  description:
    "Get in touch with our team to discuss your exit strategy or learn more about our M&A advisory services.",
  keywords: ["contact M&A advisor", "schedule strategy call", "exit planning consultation", "M&A advisory contact"],
}

export default function ContactPage() {
  // Generate schema for the contact page
  const localBusinessSchema = generateLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ])

  return (
    <Layout>
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={breadcrumbSchema} />

      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Get in touch with our team to discuss your exit strategy or learn more about our M&A advisory services.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>

              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                  Contact Information
                </h2>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-50 mb-1">Office Location</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        123 Main Street, Suite 400
                        <br />
                        Chicago, IL 60601
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-50 mb-1">Email</h3>
                      <a href="mailto:info@structuredpartners.com" className="text-primary hover:text-primary-700">
                        info@structuredpartners.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-50 mb-1">Phone</h3>
                      <a href="tel:+15555555555" className="text-primary hover:text-primary-700">
                        (555) 555-5555
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary-50 dark:bg-primary-900/20 p-3 rounded-full mr-4">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-50 mb-1">Schedule a Call</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Book a 30-minute strategy call with our team.
                      </p>
                      <a
                        href="https://calendly.com/structuredpartners/strategy-call"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-md transition-colors inline-block text-sm"
                      >
                        Schedule Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
