"use client"

import { useState, useRef, useEffect } from "react"
import { SendIcon, PaperclipIcon, Sparkles, Tag, Search, FileText, Calculator, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function XBRLAssistantPanel() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>(sampleMessages)
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: "user",
          content: message,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])

      // Clear input
      setMessage("")

      // Simulate AI typing
      setIsTyping(true)

      // Simulate AI response after a delay
      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "ai",
            content:
              "I've analyzed your question about XBRL tagging. The `us-gaap:Revenue` tag should be used for the company's main revenue line item. Make sure to use the correct context and period information for accurate reporting.",
            timestamp: new Date().toLocaleTimeString(),
          },
        ])
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col h-full border-l">
      <div className="border-b p-2 bg-navy-50 flex items-center justify-between">
        <h3 className="text-sm font-medium">XBRL Assistant</h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8 mt-1">
                  {msg.sender === "user" ? (
                    <AvatarFallback>JD</AvatarFallback>
                  ) : (
                    <>
                      <AvatarImage src="/abstract-geometric-shapes.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 text-sm ${msg.sender === "user" ? "bg-navy-900 text-white" : "bg-muted"}`}
                >
                  <p>{msg.content}</p>
                  {msg.tagSuggestion && (
                    <div className="mt-3 bg-white/90 rounded-md p-2 border">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-navy-100 text-navy-800">{msg.tagSuggestion.name}</Badge>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground">{msg.tagSuggestion.description}</p>
                    </div>
                  )}
                  {msg.actions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.actions.map((action: string, i: number) => (
                        <Button key={i} variant="secondary" size="sm" className="text-xs h-7">
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                  <div className="text-xs mt-1 opacity-70">{msg.timestamp}</div>
                </div>
              </div>
            </div>
          ))}

          {/* AI Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/abstract-geometric-shapes.png" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 text-sm bg-muted min-w-[60px] flex items-center">
                  <span className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <div className="bg-navy-50 rounded-md p-3 mb-3">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="suggestions" className="border-none">
              <AccordionTrigger className="py-0 hover:no-underline">
                <div className="flex items-center gap-2 text-sm text-navy-800">
                  <Sparkles className="h-4 w-4 text-navy-600" />
                  <span className="font-medium">Suggested Actions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 space-y-2 pt-1">
                  {suggestionButtons.map((btn, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-sm h-auto py-2 gap-2"
                      onClick={() => setMessage(btn.prompt)}
                    >
                      {btn.icon && <btn.icon className="h-4 w-4" />}
                      <div className="text-left">
                        <p>{btn.label}</p>
                        <p className="text-xs text-muted-foreground">{btn.description}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex gap-2 items-end">
          <Textarea
            placeholder="Ask about XBRL tagging..."
            className="min-h-[80px] resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon" className="rounded-full" aria-label="Attach File">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button
              className="rounded-full bg-navy-900 hover:bg-navy-800"
              size="icon"
              aria-label="Send Message"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          AI assistant specialized in XBRL tagging and SEC financial reporting
        </p>
      </div>
    </div>
  )
}

// Sample chat messages
const sampleMessages = [
  {
    id: 1,
    sender: "ai",
    content: "Hello! I'm your XBRL Tagging Assistant. How can I help you with tagging financial data today?",
    timestamp: "10:30 AM",
    actions: ["Find missing tags", "Validate calculations", "Show common issues"],
  },
  {
    id: 2,
    sender: "user",
    content: "What tag should I use for operating income?",
    timestamp: "10:31 AM",
  },
  {
    id: 3,
    sender: "ai",
    content:
      "For operating income, you should use the standard 'us-gaap:OperatingIncomeLoss' tag. This tag is defined as 'The net result for the period of deducting operating expenses from operating revenues.'",
    timestamp: "10:31 AM",
    tagSuggestion: {
      name: "us-gaap:OperatingIncomeLoss",
      description: "The net result for the period of deducting operating expenses from operating revenues.",
    },
  },
  {
    id: 4,
    sender: "user",
    content: "I'm seeing a calculation warning for gross profit. Can you explain why?",
    timestamp: "10:33 AM",
  },
  {
    id: 5,
    sender: "ai",
    content:
      "The calculation warning for gross profit occurs because the sum of the components doesn't match the reported value. In XBRL, Gross Profit should equal Revenue minus Cost of Revenue. Check if there's a rounding issue or if any components are missing from the calculation. The expected calculation is: $1,245,000,000 - $498,000,000 = $747,000,000.",
    timestamp: "10:34 AM",
    actions: ["Fix calculation", "Review involved tags", "Ignore warning"],
  },
]

// Suggestion buttons
const suggestionButtons = [
  {
    icon: Tag,
    label: "What tag should I use for...",
    description: "Get tag recommendations for specific financial concepts",
    prompt: "What XBRL tag should I use for earnings per share?",
  },
  {
    icon: Calculator,
    label: "Fix calculation inconsistency",
    description: "Get help resolving calculation validation issues",
    prompt: "I have a calculation inconsistency with operating income. How can I fix it?",
  },
  {
    icon: Search,
    label: "Find missing required tags",
    description: "Identify and add missing required tags",
    prompt: "What required tags am I missing for the income statement?",
  },
  {
    icon: FileText,
    label: "Explain regulatory requirements",
    description: "Learn about SEC XBRL tagging requirements",
    prompt: "What are the SEC requirements for tagging financial statements?",
  },
  {
    icon: ClipboardCheck,
    label: "Pre-filing validation check",
    description: "Run comprehensive check before filing",
    prompt: "Can you help me prepare for pre-filing validation checks?",
  },
]
