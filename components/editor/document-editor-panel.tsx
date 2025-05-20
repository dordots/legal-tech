"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
  ImageIcon,
  Table,
  HelpCircle,
  MessageSquare,
  History,
  Sparkles,
  User,
  ChevronDown,
  Tag,
  Check,
  X,
  Eye,
  FileText,
  Clock,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DocumentVersionHistory } from "@/components/editor/document-version-history"

interface DocumentEditorPanelProps {
  activeSection: string
  onSectionChange: (section: string) => void
  documentType: string
}

export function DocumentEditorPanel({ activeSection, onSectionChange, documentType }: DocumentEditorPanelProps) {
  const [commentMode, setCommentMode] = useState(false)
  const [trackChanges, setTrackChanges] = useState(false)
  const [showAIContent, setShowAIContent] = useState(true)
  const [showUserContent, setShowUserContent] = useState(true)
  const [activeComment, setActiveComment] = useState<number | null>(null)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [comments, setComments] = useState<Record<string, any[]>>({
    item1: [
      {
        id: 1,
        paragraph: 0,
        text: "Please verify the founding date.",
        author: "Sarah Kim",
        time: "Yesterday at 3:45 PM",
        resolved: false,
      },
    ],
    item1a: [
      {
        id: 2,
        paragraph: 1,
        text: "This risk factor needs to be more specific about potential financial impact.",
        author: "John Davis",
        time: "Today at 9:15 AM",
        resolved: false,
      },
    ],
  })

  const handleAddComment = (sectionId: string, paragraphIndex: number) => {
    const newComment = {
      id: Date.now(),
      paragraph: paragraphIndex,
      text: "New comment",
      author: "John Doe",
      time: "Just now",
      resolved: false,
    }

    setComments({
      ...comments,
      [sectionId]: [...(comments[sectionId] || []), newComment],
    })

    setActiveComment(newComment.id)
  }

  const handleCommentChange = (commentId: number, text: string) => {
    const updatedComments = { ...comments }

    Object.keys(updatedComments).forEach((sectionId) => {
      updatedComments[sectionId] = updatedComments[sectionId].map((comment) =>
        comment.id === commentId ? { ...comment, text } : comment,
      )
    })

    setComments(updatedComments)
  }

  const handleResolveComment = (sectionId: string, commentId: number) => {
    setComments({
      ...comments,
      [sectionId]: comments[sectionId].map((comment) =>
        comment.id === commentId ? { ...comment, resolved: true } : comment,
      ),
    })

    setActiveComment(null)
  }

  const handleDeleteComment = (sectionId: string, commentId: number) => {
    setComments({
      ...comments,
      [sectionId]: comments[sectionId].filter((comment) => comment.id !== commentId),
    })

    setActiveComment(null)
  }

  const toggleVersionHistory = () => {
    setShowVersionHistory(!showVersionHistory)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b p-2 bg-white">
        <div className="flex items-center gap-2 flex-wrap">
          <ToggleGroup type="multiple" variant="outline" className="justify-start">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Separator orientation="vertical" className="h-8" />

          <ToggleGroup type="single" variant="outline" className="justify-start">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Separator orientation="vertical" className="h-8" />

          <ToggleGroup type="multiple" variant="outline" className="justify-start">
            <ToggleGroupItem value="bullet" aria-label="Bullet list">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="number" aria-label="Numbered list">
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Separator orientation="vertical" className="h-8" />

          <ToggleGroup type="single" variant="outline" className="justify-start">
            <ToggleGroupItem value="h1" aria-label="Heading 1">
              <Heading1 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="h2" aria-label="Heading 2">
              <Heading2 className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <Separator orientation="vertical" className="h-8" />

          <Button variant="outline" size="sm">
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Table className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <Button
            variant={commentMode ? "secondary" : "outline"}
            size="sm"
            onClick={() => setCommentMode(!commentMode)}
            className={commentMode ? "bg-amber-100 text-amber-900 hover:bg-amber-200 hover:text-amber-900" : ""}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Comment
          </Button>

          <Button
            variant={trackChanges ? "secondary" : "outline"}
            size="sm"
            onClick={() => setTrackChanges(!trackChanges)}
            className={trackChanges ? "bg-blue-100 text-blue-900 hover:bg-blue-200 hover:text-blue-900" : ""}
          >
            <History className="h-4 w-4 mr-1" />
            Track Changes
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Show/Hide Content</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setShowAIContent(!showAIContent)}>
                {showAIContent ? <Check className="h-4 w-4 mr-2" /> : <div className="w-4 mr-2" />}
                AI-Generated Content
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowUserContent(!showUserContent)}>
                {showUserContent ? <Check className="h-4 w-4 mr-2" /> : <div className="w-4 mr-2" />}
                User-Edited Content
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleVersionHistory}>
                <Clock className="h-4 w-4 mr-2" />
                Version History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="ml-auto">
            <Sparkles className="h-4 w-4 mr-1 text-amber-500" />
            Generate with AI
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Tabs value={activeSection} onValueChange={onSectionChange} className="flex flex-col h-full w-full">
          <div className="border-b p-2">
            <TabsList className="w-full">
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id} className="flex-1">
                  <div className="flex items-center gap-1">
                    <span>{section.label}</span>
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        section.status === "complete" && "bg-green-500",
                        section.status === "in-progress" && "bg-blue-500",
                        section.status === "needs-attention" && "bg-amber-500",
                        section.status === "not-started" && "bg-gray-300",
                      )}
                    />
                    {section.activeUsers && section.activeUsers.length > 0 && (
                      <div className="flex -space-x-1 ml-1">
                        {section.activeUsers.map((user, i) => (
                          <TooltipProvider key={i}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Avatar className="h-4 w-4 border border-white">
                                  <AvatarFallback className="text-[8px]">
                                    {user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p className="text-xs">{user.name} is editing</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {showVersionHistory ? (
              <DocumentVersionHistory onClose={toggleVersionHistory} />
            ) : (
              <ScrollArea className="flex-1">
                {sections.map((section) => (
                  <TabsContent key={section.id} value={section.id} className="mt-0 p-6">
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">{section.title}</h2>

                      {section.content
                        .filter((paragraph) => {
                          if (paragraph.type === "ai" && !showAIContent) return false
                          if (paragraph.type === "manual" && !showUserContent) return false
                          return true
                        })
                        .map((paragraph, index) => (
                          <div key={index} className="relative group">
                            <div
                              className={cn(
                                "text-sm leading-relaxed rounded-sm py-2 pl-3 pr-10 relative",
                                paragraph.type === "ai"
                                  ? "bg-blue-50 border-l-2 border-blue-500"
                                  : paragraph.type === "manual"
                                    ? "bg-green-50 border-l-2 border-green-500"
                                    : "",
                                trackChanges && paragraph.changes && "border border-blue-300 bg-blue-50/50",
                              )}
                            >
                              {/* Content type indicator */}
                              <div className="absolute left-0 top-2 -ml-3 rounded-full p-1 bg-white shadow-sm">
                                {paragraph.type === "ai" ? (
                                  <Sparkles className="h-3 w-3 text-blue-500" />
                                ) : (
                                  <User className="h-3 w-3 text-green-500" />
                                )}
                              </div>

                              {/* Paragraph content */}
                              <p>
                                {trackChanges && paragraph.changes ? (
                                  <span>
                                    {paragraph.changes.map((change: any, i: number) => (
                                      <span
                                        key={i}
                                        className={cn(
                                          change.type === "added" && "bg-green-100 text-green-800",
                                          change.type === "removed" && "bg-red-100 text-red-800 line-through",
                                        )}
                                      >
                                        {change.text}{" "}
                                      </span>
                                    ))}
                                  </span>
                                ) : (
                                  paragraph.text
                                )}
                              </p>

                              {/* XBRL Tags */}
                              {paragraph.xbrlTags &&
                                paragraph.xbrlTags.map((tag: any, i: number) => (
                                  <TooltipProvider key={i}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="inline-flex items-center bg-navy-100 text-navy-800 text-xs px-1 py-0.5 rounded mx-1 cursor-help">
                                          <Tag className="h-3 w-3 mr-1" />
                                          {tag.value}
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent side="top">
                                        <p className="text-xs">XBRL Tag: {tag.name}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}

                              {/* Comment indicators */}
                              {comments[section.id]?.some(
                                (comment) => comment.paragraph === index && !comment.resolved,
                              ) && (
                                <div className="absolute right-12 top-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="bg-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                                          {
                                            comments[section.id].filter(
                                              (comment) => comment.paragraph === index && !comment.resolved,
                                            ).length
                                          }
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent side="left">
                                        <p className="text-xs">
                                          {
                                            comments[section.id].filter(
                                              (comment) => comment.paragraph === index && !comment.resolved,
                                            ).length
                                          }{" "}
                                          comment(s)
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              )}

                              {/* Action buttons */}
                              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                {/* Explain This button (only for AI content) */}
                                {paragraph.type === "ai" && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                          <HelpCircle className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left" className="max-w-xs">
                                        <div className="space-y-2">
                                          <p className="text-xs font-medium">AI-Generated Content</p>
                                          <p className="text-xs">
                                            This content was generated by AI based on your company data and regulatory
                                            requirements. The AI analyzed previous filings, financial reports, and
                                            industry standards to create this text.
                                          </p>
                                          {paragraph.confidence && (
                                            <div className="space-y-1">
                                              <p className="text-xs font-medium">Confidence: {paragraph.confidence}%</p>
                                              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                  className="h-full bg-blue-500 rounded-full"
                                                  style={{ width: `${paragraph.confidence}%` }}
                                                ></div>
                                              </div>
                                            </div>
                                          )}
                                          {paragraph.sources && (
                                            <div>
                                              <p className="text-xs font-medium">Sources:</p>
                                              <ul className="text-xs list-disc pl-4">
                                                {paragraph.sources.map((source: string, i: number) => (
                                                  <li key={i}>{source}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}

                                {/* Add Comment button (only visible in comment mode) */}
                                {commentMode && (
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6 bg-amber-100 border-amber-300 hover:bg-amber-200"
                                    onClick={() => handleAddComment(section.id, index)}
                                  >
                                    <MessageSquare className="h-3 w-3 text-amber-800" />
                                  </Button>
                                )}

                                {/* Regenerate button (only for AI content) */}
                                {paragraph.type === "ai" && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-6 w-6">
                                          <Sparkles className="h-3 w-3 text-amber-500" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent side="left">
                                        <p className="text-xs">Regenerate this paragraph</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </div>
                            </div>

                            {/* Comments for this paragraph */}
                            {comments[section.id]
                              ?.filter((comment) => comment.paragraph === index && !comment.resolved)
                              .map((comment) => (
                                <div
                                  key={comment.id}
                                  className={cn(
                                    "mt-1 ml-6 p-2 border-l-2 border-amber-400 bg-amber-50 rounded-r-sm",
                                    activeComment === comment.id ? "ring-2 ring-amber-300" : "",
                                  )}
                                >
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-5 w-5">
                                        <AvatarFallback className="text-[10px]">
                                          {comment.author
                                            .split(" ")
                                            .map((n: string) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs font-medium">{comment.author}</span>
                                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                                    </div>
                                    <div className="flex gap-1">
                                      {activeComment === comment.id ? (
                                        <>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 text-green-600 hover:text-green-700"
                                            onClick={() => setActiveComment(null)}
                                          >
                                            <Check className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 text-red-600 hover:text-red-700"
                                            onClick={() => handleDeleteComment(section.id, comment.id)}
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5"
                                            onClick={() => setActiveComment(comment.id)}
                                          >
                                            <MessageSquare className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-5 w-5 text-green-600 hover:text-green-700"
                                            onClick={() => handleResolveComment(section.id, comment.id)}
                                          >
                                            <Check className="h-3 w-3" />
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  {activeComment === comment.id ? (
                                    <textarea
                                      className="w-full mt-1 p-1 text-xs border rounded"
                                      value={comment.text}
                                      onChange={(e) => handleCommentChange(comment.id, e.target.value)}
                                      autoFocus
                                    />
                                  ) : (
                                    <p className="text-xs mt-1">{comment.text}</p>
                                  )}
                                </div>
                              ))}
                          </div>
                        ))}

                      {/* Section compliance warnings */}
                      {section.complianceWarnings && section.complianceWarnings.length > 0 && (
                        <div className="mt-8 border border-amber-300 bg-amber-50 rounded-md p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <h3 className="text-sm font-medium text-amber-800">Compliance Warnings</h3>
                          </div>
                          <div className="space-y-2">
                            {section.complianceWarnings.map((warning: any, i: number) => (
                              <div key={i} className="flex items-start gap-2">
                                <div className="h-5 w-5 flex items-center justify-center">
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-amber-800">{warning.title}</p>
                                  <p className="text-xs text-amber-700">{warning.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section completion checklist */}
                      {section.checklist && section.checklist.length > 0 && (
                        <div className="mt-4 border border-navy-200 bg-navy-50 rounded-md p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-navy-600" />
                            <h3 className="text-sm font-medium text-navy-800">Section Checklist</h3>
                          </div>
                          <div className="space-y-1">
                            {section.checklist.map((item: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                {item.completed ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="h-4 w-4 rounded-sm border border-navy-300"></div>
                                )}
                                <p className={cn("text-xs", item.completed ? "text-navy-600" : "text-navy-800")}>
                                  {item.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </ScrollArea>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}

const sections = [
  {
    id: "item1",
    label: "Item 1",
    title: "Item 1: Business",
    status: "complete",
    activeUsers: [{ name: "John Doe" }],
    content: [
      {
        type: "manual",
        text: 'Acme Corporation (the "Company," "we," "us," or "our") is a leading provider of innovative technology solutions for businesses worldwide. Founded in 1985, we design, develop, and deliver cloud-based software applications that help organizations streamline operations, enhance productivity, and drive growth.',
      },
      {
        type: "ai",
        confidence: 92,
        sources: ["Previous 10-K", "Company Website", "Press Releases"],
        text: "Our principal executive offices are located at 123 Tech Boulevard, San Francisco, California 94105. Our telephone number is (555) 123-4567, and our website address is www.acmecorp.com. Information contained on our website is not incorporated by reference into this Annual Report on Form 10-K.",
      },
      {
        type: "manual",
        text: "We operate in three reportable segments: Enterprise Solutions, Small Business Services, and Consumer Applications. Our Enterprise Solutions segment provides comprehensive software platforms for large organizations with complex needs. Our Small Business Services segment offers streamlined versions of our core technologies tailored to the needs of growing businesses. Our Consumer Applications segment develops user-friendly applications for individual users.",
        changes: [
          { type: "original", text: "We operate in two reportable segments:" },
          { type: "removed", text: "Enterprise Solutions and Small Business Services." },
          {
            type: "added",
            text: "We operate in three reportable segments: Enterprise Solutions, Small Business Services, and Consumer Applications.",
          },
        ],
      },
      {
        type: "ai",
        confidence: 88,
        text: "For the fiscal year ended December 31, 2023, we generated $1.2 billion in revenue, representing a 15% increase compared to the prior fiscal year. Enterprise Solutions accounted for 65% of our revenue, Small Business Services accounted for 25%, and Consumer Applications accounted for the remaining 10%.",
        xbrlTags: [
          { name: "Revenue", value: "$1.2B" },
          { name: "RevenueGrowth", value: "15%" },
        ],
      },
    ],
    checklist: [
      { text: "Describe the company's business", completed: true },
      { text: "Identify significant subsidiaries", completed: true },
      { text: "Describe the markets in which the company operates", completed: true },
      { text: "Discuss seasonality of the business", completed: false },
      { text: "Disclose working capital practices", completed: false },
    ],
  },
  {
    id: "item1a",
    label: "Item 1A",
    title: "Item 1A: Risk Factors",
    status: "in-progress",
    content: [
      {
        type: "ai",
        confidence: 95,
        text: "Investing in our securities involves a high degree of risk. You should carefully consider the risks and uncertainties described below, together with all of the other information in this Annual Report on Form 10-K, including our consolidated financial statements and related notes, before making a decision to invest in our securities. The risks and uncertainties described below may not be the only ones we face. If any of the risks actually occur, our business, financial condition, operating results, and prospects could be materially and adversely affected. In that event, the market price of our common stock could decline, and you could lose part or all of your investment.",
      },
      {
        type: "ai",
        confidence: 87,
        text: "Risks Related to Our Business and Industry\n\nIf we are unable to compete effectively, our business, financial condition, and results of operations could be adversely affected. The markets for our products and services are highly competitive, and we expect competition to increase in the future. We face competition from both established and emerging companies that offer similar products and services. Many of our competitors have longer operating histories, greater name recognition, larger customer bases, and significantly greater financial, technical, marketing, and other resources than we do.",
      },
      {
        type: "manual",
        text: "Cybersecurity Risks\n\nWe face risks related to cybersecurity threats and incidents. Like many companies, we have experienced an increase in the frequency and sophistication of cybersecurity threats, and we may be unable to protect sensitive data and the integrity of our products, services, and infrastructure. A cybersecurity incident could result in the loss, theft, corruption, unauthorized release, or destruction of customer or employee data, and could disrupt our operations, damage our reputation, and reduce our revenue.",
      },
      {
        type: "ai",
        confidence: 91,
        text: "Supply Chain Disruptions\n\nOur business depends on our ability to source and distribute products in a timely manner. As a result, we rely on the efficient and uninterrupted operation of complex global supply chain networks. Disruptions to our supply chain could result from a variety of factors, many of which are outside our control, including natural disasters, adverse weather conditions, labor disputes, transportation disruptions, and increased transportation costs. In fiscal year 2023, we experienced increased costs of approximately $15.3 million due to supply chain disruptions.",
        xbrlTags: [{ name: "SupplyChainCosts", value: "$15.3M" }],
      },
    ],
    complianceWarnings: [
      {
        title: "Missing COVID-19 Risk Factors",
        description: "SEC guidance requires discussion of COVID-19 related risks if they materially affect operations.",
      },
      {
        title: "Climate Change Disclosure",
        description: "Consider adding climate change risk factors in accordance with recent SEC guidance.",
      },
    ],
    checklist: [
      { text: "Organize risk factors in order of importance", completed: true },
      { text: "Include risks specific to the company", completed: true },
      { text: "Discuss cybersecurity risks", completed: true },
      { text: "Address regulatory risks", completed: false },
      { text: "Include climate-related risks", completed: false },
    ],
  },
  {
    id: "item7",
    label: "Item 7",
    title: "Item 7: Management's Discussion and Analysis",
    status: "needs-attention",
    activeUsers: [{ name: "Sarah Kim" }],
    content: [
      {
        type: "manual",
        text: "The following discussion and analysis of our financial condition and results of operations should be read in conjunction with our consolidated financial statements and related notes included elsewhere in this Annual Report on Form 10-K. This discussion contains forward-looking statements that involve risks and uncertainties. Our actual results could differ materially from those discussed below.",
      },
      {
        type: "ai",
        confidence: 89,
        text: "Overview\n\nWe are a leading provider of innovative technology solutions for businesses worldwide. Our revenue is primarily derived from subscription fees for our cloud-based software applications, professional services related to implementation and training, and support services. For the fiscal year ended December 31, 2023, we generated $1.2 billion in revenue, representing a 15% increase compared to the prior fiscal year.",
        xbrlTags: [
          { name: "Revenue", value: "$1.2B" },
          { name: "RevenueGrowth", value: "15%" },
        ],
      },
      {
        type: "ai",
        confidence: 93,
        text: "Results of Operations\n\nRevenue increased by $156.5 million, or 15%, to $1.2 billion in fiscal year 2023 compared to $1.04 billion in fiscal year 2022. This increase was primarily due to a 20% increase in subscription revenue, which grew to $840 million in fiscal year 2023 from $700 million in fiscal year 2022, driven by a 12% increase in our customer base and increased adoption of our premium offerings.",
        xbrlTags: [
          { name: "RevenueIncrease", value: "$156.5M" },
          { name: "SubscriptionRevenue", value: "$840M" },
          { name: "SubscriptionRevenueGrowth", value: "20%" },
          { name: "CustomerBaseGrowth", value: "12%" },
        ],
      },
    ],
    checklist: [
      { text: "Provide analysis of financial condition", completed: true },
      { text: "Discuss results of operations", completed: true },
      { text: "Address liquidity and capital resources", completed: false },
      { text: "Explain critical accounting policies", completed: false },
      { text: "Discuss off-balance sheet arrangements", completed: false },
    ],
  },
  {
    id: "item8",
    label: "Item 8",
    title: "Item 8: Financial Statements",
    status: "not-started",
    content: [
      {
        type: "manual",
        text: "This section will contain the audited financial statements and supplementary data.",
      },
    ],
    checklist: [
      { text: "Include audited financial statements", completed: false },
      { text: "Provide consolidated balance sheets", completed: false },
      { text: "Include statements of income", completed: false },
      { text: "Provide statements of cash flows", completed: false },
      { text: "Include notes to financial statements", completed: false },
    ],
  },
]
