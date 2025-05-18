"use client"

import { useState } from "react"
import { PaperclipIcon, SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatInterfaceProps {
  activeSection: string
}

export function ChatInterface({ activeSection }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the AI
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <h2 className="font-semibold">AI Assistant</h2>
        <p className="text-xs text-muted-foreground">Ask questions or get help with your 10-K filing</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8">
                {msg.sender === "user" ? (
                  <>
                    <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </>
                ) : (
                  <>
                    <AvatarImage src="/futuristic-helper-robot.png" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={`rounded-lg p-3 text-sm ${msg.sender === "user" ? "bg-navy-900 text-white" : "bg-muted"}`}
              >
                <p>{msg.text}</p>
                {msg.contextLink && (
                  <div className="mt-2 text-xs">
                    <a href="#" className="underline">
                      {msg.contextLink}
                    </a>
                  </div>
                )}
                <div className="mt-1 text-xs opacity-70">{msg.time}</div>
              </div>
            </div>
          </div>
        ))}

        {activeSection === "item1a" && (
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-sm font-medium text-blue-800">Working on: Item 1A - Risk Factors</p>
            <p className="text-xs text-blue-600 mt-1">
              I can help you identify industry-specific risks, regulatory concerns, and market factors that should be
              included in this section.
            </p>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <PaperclipIcon className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Textarea
            placeholder="Ask a question about your 10-K filing..."
            className="min-h-10 resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button
            className="shrink-0 bg-navy-900 hover:bg-navy-800"
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          AI suggestions are based on SEC requirements and your company data
        </div>
      </div>
    </div>
  )
}

const chatMessages = [
  {
    sender: "ai",
    text: "Hello! I'm your AI assistant for SEC 10-K filings. How can I help you today?",
    time: "10:30 AM",
  },
  {
    sender: "user",
    text: "Can you help me with the Risk Factors section?",
    time: "10:31 AM",
  },
  {
    sender: "ai",
    text: "Of course! For the Risk Factors section (Item 1A), I can help you identify and draft comprehensive risk disclosures specific to your industry and business operations. Would you like me to analyze your previous filings and suggest updates based on recent developments?",
    time: "10:31 AM",
  },
  {
    sender: "user",
    text: "Yes, please analyze our previous filings and suggest updates based on recent market conditions.",
    time: "10:32 AM",
  },
  {
    sender: "ai",
    text: "I've analyzed your previous filings and current market conditions. Based on my analysis, I recommend adding new risk factors related to supply chain disruptions, cybersecurity threats, and changing regulatory landscape. I've drafted some suggested language for these sections. Would you like me to insert these into Item 1A?",
    contextLink: "View analysis of previous filings",
    time: "10:34 AM",
  },
  {
    sender: "user",
    text: "Yes, please insert the suggested language into Item 1A.",
    time: "10:35 AM",
  },
  {
    sender: "ai",
    text: "I've inserted the suggested language into Item 1A. I've highlighted the AI-generated content in blue so you can easily identify and review it. Is there anything specific you'd like me to explain or modify?",
    time: "10:36 AM",
  },
]
