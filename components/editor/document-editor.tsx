"use client"
import { useState } from "react"
import {
  HelpCircle,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  AlignLeft,
  MessageSquare,
  Tag,
  Check,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface DocumentEditorProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DocumentEditor({ activeSection, onSectionChange }: DocumentEditorProps) {
  const [commentMode, setCommentMode] = useState(false)
  const [activeComment, setActiveComment] = useState<number | null>(null)
  const [comments, setComments] = useState<Record<string, any[]>>({
    item1: [
      {
        id: 1,
        paragraph: 0,
        text: "Please verify the founding date.",
        author: "Sarah Kim",
        time: "Yesterday at 3:45 PM",
      },
    ],
    item1a: [
      {
        id: 2,
        paragraph: 1,
        text: "This risk factor needs to be more specific about potential financial impact.",
        author: "John Davis",
        time: "Today at 9:15 AM",
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

  const handleDeleteComment = (sectionId: string, commentId: number) => {
    setComments({
      ...comments,
      [sectionId]: comments[sectionId].filter((comment) => comment.id !== commentId),
    })

    setActiveComment(null)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="border-b p-2 bg-white">
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Underline className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Button variant="outline" size="sm">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Button variant="outline" size="sm">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <AlignLeft className="h-4 w-4" />
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
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={onSectionChange} className="flex flex-col h-full">
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
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-0 h-full p-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{section.title}</h2>

                {section.content.map((paragraph, index) => (
                  <div key={index} className="relative group">
                    <div
                      className={cn(
                        "text-sm leading-relaxed rounded-sm py-2 pl-3 pr-10 relative",
                        paragraph.type === "ai"
                          ? "bg-blue-50 border-l-2 border-blue-500"
                          : paragraph.type === "manual"
                            ? "bg-green-50 border-l-2 border-green-500"
                            : "",
                      )}
                    >
                      {paragraph.text}

                      {/* XBRL Tags */}
                      {paragraph.xbrlTags &&
                        paragraph.xbrlTags.map((tag, i) => (
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
                      {comments[section.id]?.some((comment) => comment.paragraph === index) && (
                        <div className="absolute right-12 top-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="bg-amber-200 text-amber-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                                  {comments[section.id].filter((comment) => comment.paragraph === index).length}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p className="text-xs">
                                  {comments[section.id].filter((comment) => comment.paragraph === index).length}{" "}
                                  comment(s)
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )}

                      {/* Explain This button */}
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <HelpCircle className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="max-w-xs">
                              <div className="space-y-2">
                                <p className="text-xs font-medium">
                                  {paragraph.type === "ai" ? "AI-Generated Content" : "Manually Edited Content"}
                                </p>
                                <p className="text-xs">
                                  {paragraph.type === "ai"
                                    ? "This content was generated by AI based on your company data and SEC requirements. The AI analyzed previous filings, financial reports, and industry standards to create this text."
                                    : "This content was manually edited by a user. It may have been written from scratch or modified from AI-generated content."}
                                </p>
                                {paragraph.type === "ai" && paragraph.confidence && (
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
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Add Comment button (only visible in comment mode) */}
                        {commentMode && (
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 ml-1 bg-amber-100 border-amber-300 hover:bg-amber-200"
                            onClick={() => handleAddComment(section.id, index)}
                          >
                            <MessageSquare className="h-3 w-3 text-amber-800" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Comments for this paragraph */}
                    {comments[section.id]
                      ?.filter((comment) => comment.paragraph === index)
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
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5"
                                  onClick={() => setActiveComment(comment.id)}
                                >
                                  <MessageSquare className="h-3 w-3" />
                                </Button>
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
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

// Import Avatar component for comments
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const sections = [
  {
    id: "item1",
    label: "Item 1",
    title: "Item 1: Business",
    status: "complete",
    content: [
      {
        type: "manual",
        text: 'Acme Corporation (the "Company," "we," "us," or "our") is a leading provider of innovative technology solutions for businesses worldwide. Founded in 1985, we design, develop, and deliver cloud-based software applications that help organizations streamline operations, enhance productivity, and drive growth.',
      },
      {
        type: "ai",
        confidence: 92,
        text: "Our principal executive offices are located at 123 Tech Boulevard, San Francisco, California 94105. Our telephone number is (555) 123-4567, and our website address is www.acmecorp.com. Information contained on our website is not incorporated by reference into this Annual Report on Form 10-K.",
      },
      {
        type: "manual",
        text: "We operate in three reportable segments: Enterprise Solutions, Small Business Services, and Consumer Applications. Our Enterprise Solutions segment provides comprehensive software platforms for large organizations with complex needs. Our Small Business Services segment offers streamlined versions of our core technologies tailored to the needs of growing businesses. Our Consumer Applications segment develops user-friendly applications for individual users.",
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
  },
  {
    id: "item7",
    label: "Item 7",
    title: "Item 7: Management's Discussion and Analysis",
    status: "needs-attention",
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
  },
]
