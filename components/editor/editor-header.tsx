"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Save,
  Upload,
  Share2,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  History,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"

interface EditorHeaderProps {
  document: {
    id: string
    title: string
    company: string
    type: string
    status: string
    version: string
    lastSaved: string
    deadline: string
    completionPercentage: number
    complianceScore: number
    issuesCount: number
  }
}

export function EditorHeader({ document }: EditorHeaderProps) {
  const [title, setTitle] = useState(document.title)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const handleTitleClick = () => {
    setIsEditingTitle(true)
    setTimeout(() => {
      titleInputRef.current?.focus()
      titleInputRef.current?.select()
    }, 0)
  }

  const handleTitleBlur = () => {
    setIsEditingTitle(false)
    // In a real app, save the title here
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false)
      // In a real app, save the title here
    }
    if (e.key === "Escape") {
      setTitle(document.title)
      setIsEditingTitle(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "draft":
        return "bg-slate-500"
      case "in progress":
        return "bg-blue-500"
      case "review":
        return "bg-amber-500"
      case "completed":
        return "bg-green-500"
      case "submitted":
        return "bg-purple-500"
      default:
        return "bg-slate-500"
    }
  }

  const lastSavedDate = new Date(document.lastSaved)
  const deadlineDate = new Date(document.deadline)
  const timeToDeadline = formatDistanceToNow(deadlineDate, { addSuffix: true })
  const isPastDeadline = deadlineDate < new Date()

  return (
    <div className="border-b bg-white p-2 sticky top-0 z-10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/documents">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to documents</span>
              </Link>
            </Button>

            <div className="flex flex-col">
              {isEditingTitle ? (
                <Input
                  ref={titleInputRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  className="h-7 text-lg font-semibold py-0 border-navy-300"
                />
              ) : (
                <h1 className="text-lg font-semibold cursor-pointer hover:text-navy-700" onClick={handleTitleClick}>
                  {title}
                </h1>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{document.company}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{document.type}</span>
                <Badge variant="outline" className={`ml-2 text-white ${getStatusColor(document.status)}`}>
                  {document.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>v{document.version}</span>
                    <span>•</span>
                    <span>Last saved {formatDistanceToNow(lastSavedDate, { addSuffix: true })}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last saved on {lastSavedDate.toLocaleString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="h-6" />

            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">
                <History className="mr-1 h-3 w-3" />
                History
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    <Download className="mr-1 h-3 w-3" />
                    Export
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem>Export as DOCX</DropdownMenuItem>
                  <DropdownMenuItem>Export as XBRL</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm" className="h-8">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>

              <Button variant="outline" size="sm" className="h-8">
                <Settings className="mr-1 h-3 w-3" />
                Settings
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 md:hidden">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <History className="mr-2 h-4 w-4" />
                  History
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6" />

            <Button size="sm" className="h-8 bg-navy-900 hover:bg-navy-800">
              <Save className="mr-1 h-3 w-3" />
              Save
            </Button>

            <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
              <Upload className="mr-1 h-3 w-3" />
              Submit
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Completion:</span>
              <div className="w-32 flex items-center gap-2">
                <Progress value={document.completionPercentage} className="h-2" />
                <span className="font-medium">{document.completionPercentage}%</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Compliance:</span>
              <div className="flex items-center gap-1">
                <CheckCircle
                  className={`h-3 w-3 ${document.complianceScore >= 90 ? "text-green-500" : document.complianceScore >= 70 ? "text-amber-500" : "text-red-500"}`}
                />
                <span className="font-medium">{document.complianceScore}/100</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Issues:</span>
              <div className="flex items-center gap-1">
                <AlertTriangle
                  className={`h-3 w-3 ${document.issuesCount === 0 ? "text-green-500" : document.issuesCount < 5 ? "text-amber-500" : "text-red-500"}`}
                />
                <span className="font-medium">{document.issuesCount}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-muted-foreground">Deadline:</span>
            <span className={`font-medium ${isPastDeadline ? "text-red-500" : "text-navy-700"}`}>{timeToDeadline}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
