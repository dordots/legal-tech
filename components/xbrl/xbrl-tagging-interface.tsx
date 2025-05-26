"use client"

import { useState } from "react"
import {
  ChevronRight,
  FileCode,
  Tag,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  AlertCircle,
  Search,
  BookOpen,
  Wand2,
  Hand,
  Eye,
  TableProperties,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Progress } from "@/components/ui/progress"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import { XBRLFinancialContentView } from "@/components/xbrl/xbrl-financial-content-view"
import { XBRLTagSelectionPanel } from "@/components/xbrl/xbrl-tag-selection-panel"
import { XBRLTagPropertyEditor } from "@/components/xbrl/xbrl-tag-property-editor"
import { XBRLValidationPanel } from "@/components/xbrl/xbrl-validation-panel"
import { XBRLAssistantPanel } from "@/components/xbrl/xbrl-assistant-panel"
import { XBRLTaxonomyBrowser } from "@/components/xbrl/xbrl-taxonomy-browser"

const taggingModes = [
  { id: "auto", label: "Automatic", icon: Wand2 },
  { id: "manual", label: "Manual", icon: Hand },
  { id: "review", label: "Review", icon: Eye },
  { id: "taxonomy", label: "Taxonomy", icon: BookOpen },
]

interface XBRLTaggingInterfaceProps {
  documentId: string
  sectionId: string
}

export function XBRLTaggingInterface({ documentId, sectionId }: XBRLTaggingInterfaceProps) {
  const [activeMode, setActiveMode] = useState("auto")
  const [activePanel, setActivePanel] = useState("tagging")
  const [taggingProgress, setTaggingProgress] = useState(68)
  const [validationStatus, setValidationStatus] = useState<"success" | "warning" | "error" | "incomplete">("warning")
  const [defaultLayout, setDefaultLayout] = useState([60, 40])
  const [layout, setLayout] = useState(defaultLayout)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const renderValidationStatusBadge = () => {
    switch (validationStatus) {
      case "success":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Valid
          </Badge>
        )
      case "warning":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Warnings
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Errors
          </Badge>
        )
      case "incomplete":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Incomplete
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-white">
      {/* Header */}
      <div className="border-b bg-navy-50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="h-5 w-5 text-navy-700" />
            <h2 className="font-semibold text-navy-900">XBRL Tagging</h2>
            <Separator orientation="vertical" className="h-5 mx-2" />
            <div className="text-xs text-muted-foreground flex items-center">
              <span>Item 8: Financial Statements</span>
              <ChevronRight className="h-3 w-3 mx-1" />
              <span>Income Statement</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border text-xs">
              <div className="flex items-center">
                <Tag className="h-3 w-3 text-navy-500 mr-1" />
                <span>
                  <span className="font-medium">{taggingProgress}%</span> Tagged
                </span>
              </div>
              <Progress value={taggingProgress} className="w-24 h-1.5" />
              {renderValidationStatusBadge()}
            </div>
          </div>
        </div>
      </div>

      {/* Tagging Mode Selector */}
      <div className="border-b p-2 bg-white">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-1">
            <ToggleGroup type="single" value={activeMode} onValueChange={(value) => value && setActiveMode(value)}>
              {taggingModes.map((mode) => (
                <ToggleGroupItem key={mode.id} value={mode.id} aria-label={mode.label} className="gap-1">
                  <mode.icon className="h-4 w-4" />
                  {!isMobile && <span>{mode.label}</span>}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {!isMobile && (
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search financial data..." className="pl-8" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      {isMobile ? (
        // Mobile layout with tabs
        <Tabs defaultValue="document" className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start px-2 pt-2 bg-transparent">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="tagging">Tagging</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="assistant">Assistant</TabsTrigger>
          </TabsList>
          <TabsContent value="document" className="flex-1 p-0 m-0">
            <div className="h-full p-2">
              <XBRLFinancialContentView documentId={documentId} sectionId={sectionId} />
            </div>
          </TabsContent>
          <TabsContent value="tagging" className="flex-1 p-0 m-0">
            <ScrollArea className="h-full p-2">
              <XBRLTagSelectionPanel />
              <div className="mt-4">
                <XBRLTagPropertyEditor />
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="validation" className="flex-1 p-0 m-0">
            <ScrollArea className="h-full p-2">
              <XBRLValidationPanel documentId={documentId} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="assistant" className="flex-1 p-0 m-0">
            <div className="h-full">
              <XBRLAssistantPanel />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        // Desktop/Tablet layout with resizable panels
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={60} minSize={30}>
              <XBRLFinancialContentView documentId={documentId} sectionId={sectionId} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} minSize={25}>
              <Tabs
                defaultValue="tagging"
                value={activePanel}
                onValueChange={setActivePanel as (value: string) => void}
                className="h-full flex flex-col"
              >
                <TabsList className="mx-4 mt-2 justify-start">
                  <TabsTrigger value="tagging" className="gap-1">
                    <Tag className="h-3.5 w-3.5" />
                    Tagging
                  </TabsTrigger>
                  <TabsTrigger value="validation" className="gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Validation
                  </TabsTrigger>
                  <TabsTrigger value="assistant" className="gap-1">
                    <Wand2 className="h-3.5 w-3.5" />
                    Assistant
                  </TabsTrigger>
                  <TabsTrigger value="taxonomy" className="gap-1">
                    <TableProperties className="h-3.5 w-3.5" />
                    Taxonomy
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="tagging" className="flex-1 p-4 pt-2 m-0">
                  <ScrollArea className="h-full">
                    <XBRLTagSelectionPanel />
                    <div className="mt-6">
                      <XBRLTagPropertyEditor />
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="validation" className="flex-1 p-4 pt-2 m-0">
                  <ScrollArea className="h-full">
                    <XBRLValidationPanel documentId={documentId} />
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="assistant" className="flex-1 p-0 m-0">
                  <XBRLAssistantPanel />
                </TabsContent>

                <TabsContent value="taxonomy" className="flex-1 p-4 pt-2 m-0">
                  <ScrollArea className="h-full">
                    <XBRLTaxonomyBrowser />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  )
}
