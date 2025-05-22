"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, ChevronDown, Users, Briefcase, Building, X } from "lucide-react"

interface CalendlyEmbedProps {
  url?: string
  buttonText?: string
  buttonClassName?: string
  inline?: boolean
  showRouting?: boolean
  className?: string
}

type MeetingType = "strategy" | "valuation" | "exit-planning" | "general"
type UserType = "founder" | "investor" | "advisor" | "general"

export default function CalendlyEmbed({
  url = "https://calendly.com/structuredpartners",
  buttonText = "Schedule a Call",
  buttonClassName = "bg-[#E35F4F] hover:bg-[#d04c3c] text-white font-medium px-5 py-2 rounded transition-colors flex items-center justify-center",
  inline = false,
  showRouting = false,
  className = "",
}: CalendlyEmbedProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showRoutingModal, setShowRoutingModal] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingType>("general")
  const [selectedUserType, setSelectedUserType] = useState<UserType>("general")
  const modalRef = useRef<HTMLDivElement>(null)

  // Determine the correct Calendly URL based on selections
  const getCalendlyUrl = () => {
    let finalUrl = url

    // Add meeting type
    if (selectedMeeting !== "general") {
      finalUrl += `/${selectedMeeting}`
    }

    // Add user type as a UTM parameter
    if (selectedUserType !== "general") {
      finalUrl += `?utm_source=website&utm_medium=direct&utm_campaign=${selectedUserType}`
    }

    return finalUrl
  }

  useEffect(() => {
    setMounted(true)

    // Load Calendly script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    // Click outside to close modal
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowRoutingModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Clean up
      document.body.removeChild(script)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const openCalendly = () => {
    if (showRouting) {
      setShowRoutingModal(true)
    } else {
      if (window.Calendly) {
        window.Calendly.initPopupWidget({
          url: getCalendlyUrl(),
        })
      }
      setIsOpen(true)
    }
  }

  const handleSchedule = () => {
    setShowRoutingModal(false)
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: getCalendlyUrl(),
      })
    }
    setIsOpen(true)
  }

  const meetingTypes = [
    { id: "strategy", label: "Strategy Call", icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { id: "valuation", label: "Valuation Discussion", icon: <Building className="h-4 w-4 mr-2" /> },
    { id: "exit-planning", label: "Exit Planning", icon: <Calendar className="h-4 w-4 mr-2" /> },
    { id: "general", label: "General Inquiry", icon: <Users className="h-4 w-4 mr-2" /> },
  ]

  const userTypes = [
    { id: "founder", label: "Business Owner/Founder" },
    { id: "investor", label: "Investor/Buyer" },
    { id: "advisor", label: "Advisor/Consultant" },
    { id: "general", label: "Other" },
  ]

  if (!mounted) return null

  if (inline) {
    return (
      <div
        className={`calendly-inline-widget ${className}`}
        data-url={getCalendlyUrl()}
        style={{ minWidth: "320px", height: "630px" }}
      />
    )
  }

  return (
    <>
      <button onClick={openCalendly} className={buttonClassName}>
        <Calendar className="mr-2 h-5 w-5" />
        {buttonText}
      </button>

      {/* Routing Modal */}
      {showRoutingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowRoutingModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Schedule Your Meeting</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What type of meeting would you like to schedule?
              </label>
              <div className="space-y-2">
                {meetingTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedMeeting(type.id as MeetingType)}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedMeeting === type.id
                        ? "border-[#E35F4F] bg-[#E35F4F]/10"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {type.icon}
                    <span>{type.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How would you describe yourself?
              </label>
              <div className="relative">
                <select
                  value={selectedUserType}
                  onChange={(e) => setSelectedUserType(e.target.value as UserType)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-[#E35F4F] focus:border-[#E35F4F] rounded-md dark:bg-gray-700 dark:text-white"
                >
                  {userTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
            </div>

            <button
              onClick={handleSchedule}
              className="w-full bg-[#E35F4F] hover:bg-[#d04c3c] text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Now
            </button>
          </div>
        </div>
      )}
    </>
  )
}
