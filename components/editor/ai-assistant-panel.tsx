"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PaperclipIcon,
  SendIcon,
  Smile,
  Bold,
  Italic,
  List,
  Upload,
  X,
  FileText,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Database,
  Search,
  Lightbulb,
  MessageSquare,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AIAssistantPanelProps {
  activeSection: string
  selectedText?: string | null
  onClearSelectedText?: () => void
  documentType: string
}

export function AIAssistantPanel({
  activeSection,
  selectedText,
  onClearSelectedText,
  documentType,
}: AIAssistantPanelProps) {
  const [message, setMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "context" | "tools">("chat")
  const chatEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Simulate AI typing effect when selected text changes
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
    <div className="flex flex-col h-full bg-white">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "chat" | "context" | "tools")} className="w-full">
        <div className="border-b">
          <TabsList className="w-full rounded-none bg-transparent border-b px-2">
            <TabsTrigger
              value="chat"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-navy-700 data-[state=active]:shadow-none rounded-none"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="context"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-navy-700 data-[state=active]:shadow-none rounded-none"
            >
              Context
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-navy-700 data-[state=active]:shadow-none rounded-none"
            >
              Tools
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="flex flex-col h-full mt-0 p-0">
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

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
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
          </ScrollArea>

          {/* Context-aware suggestion chips */}
          <div className="px-4 py-2 flex flex-wrap gap-2 border-t">
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
                        <div
                          key={index}
                          className="flex items-center justify-between bg-navy-50 rounded-md p-2 text-xs"
                        >
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
                  placeholder="Ask a question about your document..."
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
              AI suggestions are based on document requirements and your company data
            </div>
          </div>
        </TabsContent>

        <TabsContent value="context" className="h-full mt-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              <div className="bg-navy-50 rounded-lg p-4 border border-navy-100">
                <h3 className="text-sm font-medium mb-2">Document Context</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Document Type:</span>
                    <span className="font-medium">{documentType}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Current Section:</span>
                    <span className="font-medium">{sectionInfo.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Section Status:</span>
                    <span
                      className={`font-medium ${sectionInfo.status === "complete" ? "text-green-600" : sectionInfo.status === "in-progress" ? "text-blue-600" : "text-amber-600"}`}
                    >
                      {sectionInfo.status.charAt(0).toUpperCase() + sectionInfo.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Section Requirements</h3>
                <div className="space-y-2">
                  {sectionRequirements[activeSection]?.map((req, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs border-l-2 border-navy-200 pl-2 py-1">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                      <p>{req}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Related Documents</h3>
                <div className="space-y-2">
                  {relatedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs border rounded-md p-2">
                      <FileText className="h-4 w-4 text-navy-500" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-muted-foreground">{doc.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Regulatory References</h3>
                <div className="space-y-2">
                  {regulatoryReferences.map((ref, index) => (
                    <div key={index} className="text-xs border rounded-md p-2">
                      <div className="flex items-center gap-1 mb-1">
                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                        <p className="font-medium">{ref.title}</p>
                      </div>
                      <p className="text-muted-foreground">{ref.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="tools" className="h-full mt-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Content Generation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">Generate Risk Factors</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Create comprehensive risk factors based on company data
                      </span>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Extract Financial Data</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Extract and format financial data from reports
                      </span>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Analyze Regulatory Requirements</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Check document against latest SEC requirements
                      </span>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Check Compliance</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Verify document compliance with regulations
                      </span>
                    </div>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Document Analysis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-navy-500" />
                        <span className="font-medium">Find Similar Disclosures</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Search for similar disclosures in other filings
                      </span>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">Suggest Improvements</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Get AI suggestions to improve current section
                      </span>
                    </div>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Collaboration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Add Comment for Team</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Create a comment for team members to review
                      </span>
                    </div>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto py-2 px-3">
                    <div className="flex flex-col items-start text-left">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Share Section for Review</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        Share current section with team members
                      </span>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="bg-navy-50 rounded-lg p-4 border border-navy-100">
                <h3 className="text-sm font-medium mb-2">AI Capabilities</h3>
                <p className="text-xs text-muted-foreground mb-3">SRFCB AI can help you with the following tasks:</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                    <p>Generate document content based on company data and regulatory requirements</p>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                    <p>Extract and analyze financial information from reports and statements</p>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                    <p>Check compliance with SEC regulations and industry standards</p>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                    <p>Suggest improvements to document clarity, accuracy, and completeness</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
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

// Section requirements
const sectionRequirements: Record<string, string[]> = {
  item1: [
    "Describe the company's business, including its main products and services",
    "Identify significant subsidiaries",
    "Describe the markets in which the company operates",
    "Discuss seasonality of the business, if applicable",
    "Disclose working capital practices",
  ],
  item1a: [
    "Disclose factors that make the offering speculative or risky",
    "Organize risk factors in order of importance",
    "Include risks specific to the company and its industry",
    "Discuss cybersecurity risks and incidents",
    "Address regulatory risks and compliance challenges",
  ],
  item7: [
    "Provide analysis of financial condition and results of operations",
    "Discuss liquidity and capital resources",
    "Explain critical accounting policies and estimates",
    "Address any off-balance sheet arrangements",
    "Discuss any known trends or uncertainties",
  ],
  item8: [
    "Include audited financial statements and supplementary data",
    "Provide consolidated balance sheets for the last two fiscal years",
    "Include consolidated statements of income for the last three fiscal years",
    "Provide statements of cash flows for the last three fiscal years",
    "Include notes to financial statements",
  ],
}

// Related documents
const relatedDocuments = [
  { title: "FY 2022 Annual Report", type: "10-K" },
  { title: "Q4 2023 Quarterly Report", type: "10-Q" },
  { title: "2023 Proxy Statement", type: "DEF 14A" },
  { title: "Earnings Release", type: "8-K" },
]

// Regulatory references
const regulatoryReferences = [
  {
    title: "SEC Regulation S-K Item 101",
    description: "Requirements for description of business operations",
  },
  {
    title: "SEC Regulation S-K Item 105",
    description: "Requirements for risk factor disclosure",
  },
  {
    title: "SEC Regulation S-K Item 303",
    description: "Requirements for Management's Discussion and Analysis",
  },
]

const chatMessages = [
  {
    sender: "ai",
    text: "Hello! I'm your AI assistant for document creation. How can I help you with your document today?",
    time: "10:30 AM",
  },
  {
    sender: "user",
    text: "I need help with the Risk Factors section. Can you suggest some cybersecurity risk factors?",
    time: "10:31 AM",
  },
  {
    sender: "ai",
    text: "I'd be happy to help with cybersecurity risk factors. Based on your company's industry and recent SEC guidance, here are some key cybersecurity risks you should consider including:",
    time: "10:31 AM",
  },
  {
    sender: "ai",
    text: "1. Data Breach Risks: Discuss the risk of unauthorized access to sensitive customer and business data, and potential financial and reputational impacts.\n\n2. Ransomware and Malware: Address the risk of ransomware attacks that could disrupt operations.\n\n3. Third-Party Vendor Risks: Highlight risks associated with third-party service providers who have access to your systems.\n\n4. Regulatory Compliance: Discuss risks related to evolving cybersecurity regulations and potential penalties for non-compliance.\n\nWould you like me to draft a complete section on any of these specific risks?",
    time: "10:32 AM",
  },
  {
    sender: "user",
    text: "Yes, please draft a section on data breach risks that we can include in our document.",
    time: "10:33 AM",
  },
  {
    sender: "ai",
    text: "I've drafted a section on data breach risks for your document. I've analyzed your company's business model and recent industry incidents to create a comprehensive disclosure:",
    referencedSection: "Item 1A - Risk Factors, Data Security section",
    time: "10:35 AM",
  },
  {
    sender: "ai",
    text: "**Data Security Risks**\n\nWe collect, use, and store sensitive data, including intellectual property, proprietary business information, personal information of our customers and employees, and other third-party data. We face multiple risks regarding the protection of this data, including unauthorized access, loss, improper disclosure, and cyber attacks. Despite our implementation of security measures, our systems may be vulnerable to attacks by hackers or breaches due to employee error, malfeasance, or other disruptions.\n\nAny such breach could compromise our networks and the information stored there could be accessed, publicly disclosed, lost, or stolen. Any such access, disclosure, or other loss of information could result in legal claims or proceedings, liability under laws that protect the privacy of personal information, regulatory penalties, disrupt our operations and the services we provide to customers, damage our reputation, and cause a loss of confidence in our products and services, which could adversely affect our business, financial condition, and results of operations.\n\nIn the past three years, we have experienced [X number] of data security incidents, though none have had a material adverse effect on our business. However, we cannot provide assurances that such incidents will not have a material adverse effect in the future.",
    time: "10:36 AM",
  },
  {
    sender: "user",
    files: ["Q4_2023_Financial_Report.pdf"],
    text: "I've uploaded our Q4 financial report. Can you extract relevant financial data for the MD&A section?",
    time: "10:40 AM",
  },
  {
    sender: "ai",
    text: "I've analyzed the Q4 2023 Financial Report and extracted the key financial data for your MD&A section. Here are the highlights:",
    time: "10:42 AM",
  },
  {
    sender: "ai",
    text: "**Revenue**: $1.2 billion for Q4 2023, up 15% year-over-year\n**Gross Margin**: 62%, improved from 58% in Q4 2022\n**Operating Expenses**: $420 million, increased 8% year-over-year\n**Net Income**: $180 million, up 22% year-over-year\n**Cash Flow from Operations**: $210 million\n**Cash and Cash Equivalents**: $850 million as of December 31, 2023\n\nWould you like me to draft a complete MD&A section using this data, or would you prefer to focus on a specific aspect of the financial results?",
    time: "10:43 AM",
  },
]
