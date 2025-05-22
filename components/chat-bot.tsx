"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface Message {
  type: "bot" | "user"
  text: string
  options?: { text: string; action: string }[]
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      text: "👋 Hi there! I'm your M&A advisor assistant. How can I help you today?",
      options: [
        { text: "Learn about exit strategies", action: "exit-strategies" },
        { text: "Valuation questions", action: "valuation" },
        { text: "Schedule a call", action: "schedule" },
        { text: "Download resources", action: "resources" },
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Auto-open chat after 45 seconds if not already interacted with
    const timer = setTimeout(() => {
      if (!localStorage.getItem("chatInteracted")) {
        setIsOpen(true)
      }
    }, 45000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    localStorage.setItem("chatInteracted", "true")
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { type: "user", text: input }])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = generateResponse(input)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleOptionClick = (action: string) => {
    let response: Message

    switch (action) {
      case "exit-strategies":
        response = {
          type: "bot",
          text: "Exit strategies are plans for founders to transition out of their business. The main types include:\n\n• Strategic sale to a competitor\n• Private equity recapitalization\n• Management buyout\n• Family succession\n\nWould you like to learn more about a specific strategy?",
          options: [
            { text: "Strategic sale", action: "strategic-sale" },
            { text: "Private equity", action: "private-equity" },
            { text: "Download exit guide", action: "download-guide" },
          ],
        }
        break
      case "valuation":
        response = {
          type: "bot",
          text: "Business valuation in the building products industry typically ranges from 4-8x EBITDA, depending on several factors:\n\n• Growth rate and market position\n• Customer concentration\n• Recurring revenue streams\n• Management depth\n• Operational efficiency\n\nWould you like to discuss your specific situation with an advisor?",
          options: [
            { text: "Schedule a valuation call", action: "schedule" },
            { text: "Learn about value drivers", action: "value-drivers" },
          ],
        }
        break
      case "schedule":
        response = {
          type: "bot",
          text: "Great! Our M&A advisors are available for confidential strategy calls to discuss your specific situation. You can schedule directly using our calendar.",
          options: [
            { text: "Schedule now", action: "calendar-link" },
            { text: "Learn more first", action: "learn-more" },
          ],
        }
        break
      case "resources":
        response = {
          type: "bot",
          text: "We have several resources available for founders considering an exit:\n\n• The Founder's Exit Playbook (25-page guide)\n• Value Driver Assessment Tool\n• M&A Process Timeline\n• Due Diligence Checklist\n\nWhich would you like to access?",
          options: [
            { text: "Exit Playbook", action: "download-guide" },
            { text: "Due Diligence Checklist", action: "due-diligence" },
          ],
        }
        break
      case "download-guide":
        response = {
          type: "bot",
          text: "You can download our comprehensive Founder's Exit Playbook by clicking the button below. It includes strategies for maximizing your valuation, timing your exit, and navigating the M&A process.",
          options: [
            { text: "Download Playbook", action: "playbook-link" },
            { text: "Talk to an advisor", action: "schedule" },
          ],
        }
        break
      case "calendar-link":
        response = {
          type: "bot",
          text: "You can schedule a call with one of our M&A advisors using the link below. The call is completely confidential and there's no obligation.",
          options: [{ text: "Open Calendly", action: "open-calendly" }],
        }
        break
      case "playbook-link":
        response = {
          type: "bot",
          text: "Great! You can download the Exit Playbook now. Would you like to discuss any specific aspects of your exit strategy with an advisor?",
          options: [
            { text: "Schedule a call", action: "schedule" },
            { text: "No thanks", action: "thanks" },
          ],
        }
        break
      case "open-calendly":
        // Open Calendly in a new tab
        window.open("https://calendly.com/structuredpartners/strategy-call", "_blank")
        response = {
          type: "bot",
          text: "I've opened our scheduling page in a new tab. If you have any questions before your call, feel free to ask!",
        }
        break
      case "thanks":
        response = {
          type: "bot",
          text: "You're welcome! If you have any other questions in the future, I'm here to help. Good luck with your exit planning!",
        }
        break
      default:
        response = {
          type: "bot",
          text: "I'm not sure I understand. Could you rephrase your question?",
          options: [
            { text: "Exit strategies", action: "exit-strategies" },
            { text: "Valuation", action: "valuation" },
            { text: "Schedule a call", action: "schedule" },
          ],
        }
    }

    setMessages((prev) => [...prev, { type: "user", text: action }, response])
  }

  const generateResponse = (input: string): Message => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("exit") || lowerInput.includes("sell") || lowerInput.includes("selling")) {
      return {
        type: "bot",
        text: "Selling your business is a significant decision. Our approach focuses on maximizing value through competitive tension and finding the right strategic fit. Would you like to learn more about our exit process?",
        options: [
          { text: "Exit process", action: "exit-strategies" },
          { text: "Schedule a call", action: "schedule" },
        ],
      }
    } else if (lowerInput.includes("value") || lowerInput.includes("worth") || lowerInput.includes("price")) {
      return {
        type: "bot",
        text: "Valuation in the building products industry depends on multiple factors including growth rate, profitability, customer concentration, and market position. Would you like to discuss your specific situation?",
        options: [
          { text: "Schedule valuation call", action: "schedule" },
          { text: "Learn about value drivers", action: "value-drivers" },
        ],
      }
    } else if (lowerInput.includes("schedule") || lowerInput.includes("call") || lowerInput.includes("talk")) {
      return {
        type: "bot",
        text: "I'd be happy to help you schedule a call with one of our M&A advisors. Our calls are confidential and focused on understanding your specific situation.",
        options: [{ text: "Schedule now", action: "calendar-link" }],
      }
    } else if (lowerInput.includes("download") || lowerInput.includes("guide") || lowerInput.includes("resource")) {
      return {
        type: "bot",
        text: "We have several resources available for founders considering an exit. Our most popular is the Founder's Exit Playbook, a comprehensive guide to the M&A process.",
        options: [{ text: "Download Playbook", action: "download-guide" }],
      }
    } else {
      return {
        type: "bot",
        text: "Thanks for your message. To better assist you, could you let me know what specific aspect of M&A or exit planning you're interested in?",
        options: [
          { text: "Exit strategies", action: "exit-strategies" },
          { text: "Valuation", action: "valuation" },
          { text: "Talk to an advisor", action: "schedule" },
        ],
      }
    }
  }

  // Don't render until client-side
  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-gray-700 text-white rotate-90" : "bg-primary text-white"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl z-40 overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col"
          >
            {/* Chat header */}
            <div className="bg-primary text-white p-4">
              <h3 className="font-medium">Structured Partners</h3>
              <p className="text-sm opacity-80">M&A Advisory Chat</p>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.type === "user"
                        ? "bg-primary text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {msg.options && (
                      <div className="mt-3 flex flex-col gap-2">
                        {msg.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleOptionClick(option.action)}
                            className="text-left px-3 py-1.5 bg-white dark:bg-gray-700 text-primary dark:text-white text-sm rounded border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 rounded-bl-none">
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={handleSend}
                  className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-r-md transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3 flex justify-between">
                <Link href="/contact" className="text-xs text-primary hover:underline" target="_blank">
                  Schedule a call
                </Link>
                <Link href="/resources/playbook" className="text-xs text-primary hover:underline" target="_blank">
                  Download Exit Playbook
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
