"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<Array<{ type: "user" | "agent"; text: string }>>([
    { type: "agent", text: "Hello! How can I help you with your exit strategy today?" },
  ])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Auto-open chat after 30 seconds if not already interacted with
    const timer = setTimeout(() => {
      if (!isOpen && !localStorage.getItem("chatInteracted")) {
        setIsOpen(true)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    localStorage.setItem("chatInteracted", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    // Add user message to chat
    setChatHistory([...chatHistory, { type: "user", text: message }])
    setMessage("")

    // Simulate agent response after a short delay
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "agent",
          text: "Thanks for reaching out! One of our M&A advisors will get back to you shortly. In the meantime, would you like to schedule a strategy call or download our exit playbook?",
        },
      ])
    }, 1000)
  }

  if (!mounted) return null

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-20 right-4 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "bg-gray-700 text-white rotate-90" : "bg-primary text-white"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 overflow-hidden border border-gray-200 flex flex-col">
          {/* Chat header */}
          <div className="bg-primary text-white p-4">
            <h3 className="font-medium">Structured Partners</h3>
            <p className="text-sm text-primary-100">M&A Advisory Chat</p>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 space-y-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-600 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
