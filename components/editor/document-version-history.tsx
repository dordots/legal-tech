"use client"

import { useState } from "react"
import { X, Clock, Sparkles, RotateCcw, Eye, GitCompare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface DocumentVersionHistoryProps {
  onClose: () => void
}

export function DocumentVersionHistory({ onClose }: DocumentVersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)
  const [compareMode, setCompareMode] = useState(false)
  const [compareVersions, setCompareVersions] = useState<string[]>([])

  const handleVersionSelect = (versionId: string) => {
    if (compareMode) {
      if (compareVersions.includes(versionId)) {
        setCompareVersions(compareVersions.filter((v) => v !== versionId))
      } else if (compareVersions.length < 2) {
        setCompareVersions([...compareVersions, versionId])
      }
    } else {
      setSelectedVersion(versionId === selectedVersion ? null : versionId)
    }
  }

  const toggleCompareMode = () => {
    setCompareMode(!compareMode)
    setCompareVersions([])
    setSelectedVersion(null)
  }

  return (
    <div className="flex flex-col h-full border-l">
      <div className="flex items-center justify-between p-3 border-b bg-navy-50">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-navy-700" />
          <h3 className="font-medium text-navy-900">Version History</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={compareMode ? "secondary" : "outline"} size="sm" className="h-7" onClick={toggleCompareMode}>
            <GitCompare className="h-3 w-3 mr-1" />
            Compare
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {versionHistory.map((version) => (
            <div
              key={version.id}
              className={cn(
                "border rounded-md p-3 cursor-pointer transition-colors",
                selectedVersion === version.id || compareVersions.includes(version.id)
                  ? "border-navy-500 bg-navy-50"
                  : "hover:border-navy-300",
              )}
              onClick={() => handleVersionSelect(version.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {compareMode && (
                    <div
                      className={cn(
                        "h-4 w-4 rounded-full border",
                        compareVersions.includes(version.id) ? "bg-navy-600 border-navy-600" : "border-gray-300",
                      )}
                    >
                      {compareVersions.includes(version.id) && <Check className="h-3 w-3 text-white" />}
                    </div>
                  )}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-normal",
                      version.id === "v1.4" && "bg-blue-100 text-blue-800 border-blue-200",
                      version.type === "ai" && "bg-blue-50 text-blue-700 border-blue-200",
                      version.type === "user" && "bg-green-50 text-green-700 border-green-200",
                      version.type === "system" && "bg-gray-100 text-gray-700 border-gray-200",
                    )}
                  >
                    {version.id}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{version.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {!compareMode && (
                    <>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                {version.type === "user" ? (
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">
                      {version.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ) : version.type === "ai" ? (
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-blue-600" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-gray-600" />
                  </div>
                )}
                <span className="text-sm">{version.description}</span>
              </div>

              {version.changes && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium">Changes: </span>
                  {version.changes}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {compareMode && compareVersions.length === 2 && (
        <div className="p-3 border-t bg-navy-50">
          <Button className="w-full bg-navy-700 hover:bg-navy-800">
            <GitCompare className="h-4 w-4 mr-2" />
            Compare {compareVersions[0]} and {compareVersions[1]}
          </Button>
        </div>
      )}
    </div>
  )
}

// Helper component for the check icon
function Check({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

const versionHistory = [
  {
    id: "v1.4",
    type: "user",
    author: "John Doe",
    date: "Today at 2:32 PM",
    description: "Updated Risk Factors section with cybersecurity risks",
    changes: "Added 2 paragraphs to Item 1A, edited 1 paragraph in Item 1",
  },
  {
    id: "v1.3",
    type: "ai",
    date: "Today at 11:15 AM",
    description: "AI-generated content for MD&A section",
    changes: "Added financial analysis to Item 7",
  },
  {
    id: "v1.2",
    type: "user",
    author: "Sarah Kim",
    date: "Yesterday at 4:45 PM",
    description: "Revised Business section with updated product information",
    changes: "Edited 3 paragraphs in Item 1",
  },
  {
    id: "v1.1",
    type: "system",
    date: "Yesterday at 10:30 AM",
    description: "Autosaved version",
    changes: "Minor formatting changes",
  },
  {
    id: "v1.0",
    type: "user",
    author: "John Doe",
    date: "Dec 20, 2023",
    description: "Initial document creation",
    changes: "Created document structure with basic content",
  },
]
