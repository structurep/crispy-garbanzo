import Link from "next/link"
import Layout from "@/components/layout"
import { CheckCircle, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thank You | Structured Partners",
  description: "Thank you for contacting Structured Partners. We'll be in touch shortly.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-100 rounded-full p-4 inline-flex mb-6">
              <CheckCircle className="h-12 w-12" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Thank You!
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your message has been received. One of our M&A advisors will get back to you shortly.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/"
                className="bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center"
              >
                Return to Homepage
              </Link>

              <Link
                href="/resources/playbook"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center group"
              >
                Download Exit Playbook
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
                What Happens Next?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-2xl font-bold">1</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">
                    Initial Response
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll respond to your inquiry within 24 hours to acknowledge receipt.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-2xl font-bold">2</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">Strategy Call</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll schedule a 30-minute strategy call to discuss your specific situation.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-primary-50 dark:bg-primary-900/20 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary text-2xl font-bold">3</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">Customized Plan</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We'll develop a tailored approach based on your goals and timeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
