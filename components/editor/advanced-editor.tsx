"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { EditorHeader } from "@/components/editor/editor-header"
import { AIAssistantPanel } from "@/components/editor/ai-assistant-panel"
import { DocumentEditorPanel } from "@/components/editor/document-editor-panel"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface AdvancedEditorProps {
  documentId: string
  documentType: string
}

export function AdvancedEditor({ documentId, documentType }: AdvancedEditorProps) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("item1")
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [mobileView, setMobileView] = useState<"editor" | "ai">("editor")
  const [defaultLayout, setDefaultLayout] = useState([40, 60])
  const [layout, setLayout] = useState(defaultLayout)
  const documentRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Document data (would come from API in real app)
  const documentData = {
    id: documentId,
    title: "FY 2023 Annual Report",
    company: "Acme Corporation",
    type: documentType,
    status: "In Progress",
    version: "1.4",
    lastSaved: "2023-12-21T14:32:00Z",
    deadline: "2024-01-15T23:59:59Z",
    completionPercentage: 68,
    complianceScore: 92,
    issuesCount: 3,
    activeUsers: [
      { id: "user1", name: "John Doe", avatar: "/avatars/john-doe.png", section: "item1" },
      { id: "user2", name: "Sarah Kim", avatar: "/avatars/sarah-kim.png", section: "item7" },
    ],
  }

  // Handle text selection for AI reference
  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      setSelectedText(selection.toString())
    } else {
      setSelectedText(null)
    }
  }

  // Toggle panel expansion
  const toggleLeftPanel = () => {
    if (leftPanelCollapsed) {
      setLeftPanelCollapsed(false)
      setRightPanelCollapsed(false)
      setLayout(defaultLayout)
    } else {
      setLeftPanelCollapsed(true)
      setRightPanelCollapsed(false)
      setLayout([0, 100])
    }
  }

  const toggleRightPanel = () => {
    if (rightPanelCollapsed) {
      setRightPanelCollapsed(false)
      setLeftPanelCollapsed(false)
      setLayout(defaultLayout)
    } else {
      setRightPanelCollapsed(true)
      setLeftPanelCollapsed(false)
      setLayout([100, 0])
    }
  }

  // Handle layout changes
  const handleLayoutChange = (sizes: number[]) => {
    if (sizes[0] > 10 && sizes[1] > 10) {
      setLayout(sizes)
      setLeftPanelCollapsed(false)
      setRightPanelCollapsed(false)
    }
  }

  // Reset to default layout
  const resetLayout = () => {
    setLayout(defaultLayout)
    setLeftPanelCollapsed(false)
    setRightPanelCollapsed(false)
  }

  return (
    <div className="flex h-screen flex-col">
      <EditorHeader document={documentData} />

      {/* Mobile View Tabs */}
      {isMobile && (
        <div className="border-b">
          <Tabs value={mobileView} onValueChange={(v) => setMobileView(v as "editor" | "ai")}>
            <TabsList className="w-full">
              <TabsTrigger value="editor" className="flex-1">
                Document Editor
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1">
                AI Assistant
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Desktop Split View */}
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          // Mobile View
          <div className="h-full">
            <div className={cn("h-full", mobileView === "ai" ? "block" : "hidden")}>
              <AIAssistantPanel
                activeSection={activeSection}
                selectedText={selectedText}
                onClearSelectedText={() => setSelectedText(null)}
                documentType={documentType}
              />
            </div>
            <div
              ref={documentRef}
              className={cn("h-full", mobileView === "editor" ? "block" : "hidden")}
              onMouseUp={handleTextSelection}
            >
              <DocumentEditorPanel
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                documentType={documentType}
              />
            </div>
          </div>
        ) : (
          // Desktop Split View
          <ResizablePanelGroup direction="horizontal" onLayout={handleLayoutChange} className="h-full">
            <ResizablePanel
              defaultSize={defaultLayout[0]}
              size={layout[0]}
              minSize={leftPanelCollapsed ? 0 : 20}
              maxSize={rightPanelCollapsed ? 100 : 80}
              className="relative"
            >
              {!leftPanelCollapsed && (
                <div className="absolute right-3 top-3 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-white/90 shadow-sm hover:bg-white"
                    onClick={toggleRightPanel}
                  >
                    {rightPanelCollapsed ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </div>
              )}
              <AIAssistantPanel
                activeSection={activeSection}
                selectedText={selectedText}
                onClearSelectedText={() => setSelectedText(null)}
                documentType={documentType}
              />
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-border" />

            <ResizablePanel
              defaultSize={defaultLayout[1]}
              size={layout[1]}
              minSize={rightPanelCollapsed ? 0 : 20}
              maxSize={leftPanelCollapsed ? 100 : 80}
              className="relative"
              ref={documentRef}
              onMouseUp={handleTextSelection}
            >
              {!rightPanelCollapsed && (
                <div className="absolute left-3 top-3 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-white/90 shadow-sm hover:bg-white"
                    onClick={toggleLeftPanel}
                  >
                    {leftPanelCollapsed ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </div>
              )}
              <DocumentEditorPanel
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                documentType={documentType}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  )
}
