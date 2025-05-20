"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/editor/chat-interface"
import { DocumentEditor } from "@/components/editor/document-editor"
import { FormEditorHeader } from "@/components/editor/form-editor-header"

interface FormEditorProps {
  formId: string
}

export function FormEditor({ formId }: FormEditorProps) {
  const [activeSection, setActiveSection] = useState("item1")
  const [mobileView, setMobileView] = useState<"editor" | "chat">("editor")
  const [chatExpanded, setChatExpanded] = useState(false)
  const [editorExpanded, setEditorExpanded] = useState(false)
  const [selectedText, setSelectedText] = useState<{ text: string; position: { top: number; left: number } } | null>(
    null,
  )

  // Reference to track highlighted text in the document
  const documentRef = useRef<HTMLDivElement>(null)

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0 && documentRef.current) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const docRect = documentRef.current.getBoundingClientRect()

      setSelectedText({
        text: selection.toString(),
        position: {
          top: rect.top - docRect.top,
          left: rect.left - docRect.left,
        },
      })
    } else {
      setSelectedText(null)
    }
  }

  const toggleChatExpanded = () => {
    setChatExpanded(!chatExpanded)
    if (editorExpanded) setEditorExpanded(false)
  }

  const toggleEditorExpanded = () => {
    setEditorExpanded(!editorExpanded)
    if (chatExpanded) setChatExpanded(false)
  }

  return (
    <div className="flex h-full flex-col">
      <FormEditorHeader formId={formId} />

      {/* Mobile View Tabs */}
      <div className="md:hidden border-b">
        <Tabs value={mobileView} onValueChange={(v) => setMobileView(v as "editor" | "chat")}>
          <TabsList className="w-full">
            <TabsTrigger value="editor" className="flex-1">
              Document
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex-1">
              AI Assistant
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Interface - Hidden on mobile when editor is active */}
        <div
          className={`${
            mobileView === "chat" ? "flex" : "hidden"
          } md:flex flex-col h-full transition-all duration-300 ${
            chatExpanded ? "md:w-full" : editorExpanded ? "md:w-0" : "md:w-1/3 lg:w-2/5"
          } ${chatExpanded ? "" : "border-r"}`}
        >
          <div className="flex items-center justify-between bg-navy-50 px-3 py-2 border-b">
            <h3 className="text-sm font-medium">AI Assistant</h3>
            <Button variant="ghost" size="icon" onClick={toggleChatExpanded} className="h-7 w-7">
              {chatExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          <ChatInterface
            activeSection={activeSection}
            selectedText={selectedText?.text}
            onClearSelectedText={() => setSelectedText(null)}
          />
        </div>

        {/* Connector between panels - Only visible on desktop when both panels are visible */}
        {!chatExpanded && !editorExpanded && (
          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="bg-navy-100 rounded-full p-1 shadow-sm">
              <ChevronRight className="h-4 w-4 text-navy-500" />
            </div>
            <div className="h-16 w-0.5 bg-navy-100 my-2"></div>
            <div className="bg-navy-100 rounded-full p-1 shadow-sm">
              <ChevronLeft className="h-4 w-4 text-navy-500" />
            </div>
          </div>
        )}

        {/* Document Editor - Hidden on mobile when chat is active */}
        <div
          ref={documentRef}
          className={`${
            mobileView === "editor" ? "flex" : "hidden"
          } md:flex flex-col h-full transition-all duration-300 ${
            editorExpanded ? "md:w-full" : chatExpanded ? "md:w-0" : "md:w-2/3 lg:w-3/5"
          }`}
          onMouseUp={handleTextSelection}
        >
          <div className="flex items-center justify-between bg-navy-50 px-3 py-2 border-b">
            <h3 className="text-sm font-medium">Document Editor</h3>
            <Button variant="ghost" size="icon" onClick={toggleEditorExpanded} className="h-7 w-7">
              {editorExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
          <DocumentEditor activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>
      </div>
    </div>
  )
}
