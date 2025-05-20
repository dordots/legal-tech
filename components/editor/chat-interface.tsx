"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { PaperclipIcon, SendIcon, Smile, Bold, Italic, List, Upload, X, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface ChatInterfaceProps {
  activeSection: string
  selectedText?: string
  onClearSelectedText?: () => void
}

export function ChatInterface({ activeSection, selectedText, onClearSelectedText }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Simulate AI typing effect
  useEffect(() => {
    if (selectedText) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [selectedText])

  const handleSendMessage = () => {
    if (message.trim() || uploadedFiles.length > 0) {
      // In a real app, this would send the message to the AI
      setMessage("")
      setUploadedFiles([])
      setIsTyping(true)

      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.add("border-navy-500")
      dropAreaRef.current.classList.add("bg-navy-50")
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove("border-navy-500")
      dropAreaRef.current.classList.remove("bg-navy-50")
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (dropAreaRef.current) {
      dropAreaRef.current.classList.remove("border-navy-500")
      dropAreaRef.current.classList.remove("bg-navy-50")
    }

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => file.name)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const toggleUpload = () => {
    setIsUploading(!isUploading)
  }

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file !== fileName))
  }

  // Get section details
  const sectionInfo = getSectionInfo(activeSection)

  return (
    <div className="flex flex-col h-full">
      {/* Context Panel */}
      <div className="bg-navy-50 p-3 border-b">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getSectionStatusColor(sectionInfo.status)}`}></div>
          <h3 className="text-sm font-medium">Currently editing: {sectionInfo.title}</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{sectionInfo.description}</p>
      </div>

      {/* Selected Text Reference */}
      <AnimatePresence>
        {selectedText && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-blue-50 border-l-2 border-blue-500 p-3 flex items-start"
          >
            <div className="flex-1">
              <div className="text-xs font-medium text-blue-700">Selected text:</div>
              <p className="text-sm text-blue-900 line-clamp-2">{selectedText}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-blue-700 hover:text-blue-900"
              onClick={onClearSelectedText}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 mt-1">
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
                {msg.files && msg.files.length > 0 && (
                  <div className="mb-2 space-y-1">
                    {msg.files.map((file, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/20 rounded p-1 text-xs">
                        <FileText className="h-3 w-3" />
                        <span className="truncate">{file}</span>
                      </div>
                    ))}
                  </div>
                )}
                <p>{msg.text}</p>
                {msg.contextLink && (
                  <div className="mt-2 text-xs">
                    <a href="#" className="underline">
                      {msg.contextLink}
                    </a>
                  </div>
                )}
                {msg.referencedSection && (
                  <div className="mt-2 bg-navy-100/30 rounded p-1 text-xs flex items-center gap-1">
                    <span className="font-medium">Reference:</span> {msg.referencedSection}
                  </div>
                )}
                <div className="mt-1 text-xs opacity-70">{msg.time}</div>
              </div>
            </div>
          </div>
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/futuristic-helper-robot.png" alt="AI" />
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

      {/* Context-aware suggestion chips */}
      <div className="px-4 py-2 flex flex-wrap gap-2">
        {suggestionChips[activeSection]?.map((chip, index) => (
          <Badge
            key={index}
            variant="outline"
            className="bg-navy-50 hover:bg-navy-100 cursor-pointer transition-colors"
          >
            {chip}
          </Badge>
        ))}
      </div>

      {/* File Upload Area */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t overflow-hidden"
          >
            <div
              ref={dropAreaRef}
              className="p-4 border-2 border-dashed border-navy-200 rounded-md m-4 transition-colors"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-navy-400" />
                <p className="text-sm text-center">
                  Drag & drop files here or{" "}
                  <button
                    className="text-navy-600 hover:text-navy-800 font-medium"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, XLSX, CSV, TXT</p>
                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="px-4 pb-4 space-y-2">
                <p className="text-xs font-medium">Uploaded files:</p>
                <div className="space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-navy-50 rounded-md p-2 text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-navy-500" />
                        <span className="truncate max-w-[200px]">{file}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeFile(file)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-t p-4">
        <div className="flex gap-2 items-end">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-1 mb-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Bold className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Bold</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Italic className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Italic</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <List className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">List</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Smile className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Emoji</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

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
          </div>

          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isUploading ? "secondary" : "outline"}
                    size="icon"
                    className="shrink-0"
                    onClick={toggleUpload}
                  >
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach files</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              className="shrink-0 bg-navy-900 hover:bg-navy-800"
              size="icon"
              onClick={handleSendMessage}
              disabled={!message.trim() && uploadedFiles.length === 0}
            >
              <SendIcon className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          AI suggestions are based on SEC requirements and your company data
        </div>
      </div>
    </div>
  )
}

// Helper function to get section information
function getSectionInfo(sectionId: string) {
  const sections: Record<string, { title: string; description: string; status: string }> = {
    item1: {
      title: "Item 1 - Business",
      description: "Overview of the company's business operations",
      status: "complete",
    },
    item1a: {
      title: "Item 1A - Risk Factors",
      description: "Factors that may affect the company's future results",
      status: "in-progress",
    },
    item7: {
      title: "Item 7 - Management's Discussion and Analysis",
      description: "Analysis of financial condition and results of operations",
      status: "needs-attention",
    },
    item8: {
      title: "Item 8 - Financial Statements",
      description: "Audited financial statements and supplementary data",
      status: "not-started",
    },
  }

  return sections[sectionId] || { title: "Unknown Section", description: "", status: "not-started" }
}

// Helper function to get status color
function getSectionStatusColor(status: string) {
  switch (status) {
    case "complete":
      return "bg-green-500"
    case "in-progress":
      return "bg-blue-500"
    case "needs-attention":
      return "bg-amber-500"
    default:
      return "bg-gray-300"
  }
}

// Context-aware suggestion chips based on section
const suggestionChips: Record<string, string[]> = {
  item1: ["Update business description", "Add new product lines", "Revise company history"],
  item1a: ["Extract risks from Q4 report", "Generate risk factor based on litigation", "Update cybersecurity risks"],
  item7: ["Update MD&A section", "Import financial highlights", "Generate liquidity analysis"],
  item8: ["Import financial statements", "Generate footnotes", "Update accounting policies"],
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
    files: ["Q4_2023_Financial_Report.pdf"],
    text: "I've uploaded our Q4 financial report. Can you extract relevant risk factors from this document?",
    time: "10:35 AM",
  },
  {
    sender: "ai",
    text: "I've analyzed the Q4 financial report and identified several key risk factors that should be included in your 10-K filing. I've highlighted a potential supply chain risk in Item 1A, paragraph 3 that needs to be updated based on the information in your Q4 report.",
    referencedSection: "Item 1A - Risk Factors, paragraph 3",
    time: "10:36 AM",
  },
]
