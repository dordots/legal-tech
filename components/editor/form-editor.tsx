"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatInterface } from "@/components/editor/chat-interface"
import { DocumentEditor } from "@/components/editor/document-editor"
import { FormEditorHeader } from "@/components/editor/form-editor-header"

interface FormEditorProps {
  formId: string
}

export function FormEditor({ formId }: FormEditorProps) {
  const [activeSection, setActiveSection] = useState("item1")
  const [mobileView, setMobileView] = useState<"editor" | "chat">("editor")

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
          className={`${mobileView === "chat" ? "flex" : "hidden"} md:flex md:w-1/3 lg:w-2/5 border-r flex-col h-full`}
        >
          <ChatInterface activeSection={activeSection} />
        </div>

        {/* Document Editor - Hidden on mobile when chat is active */}
        <div className={`${mobileView === "editor" ? "flex" : "hidden"} md:flex md:w-2/3 lg:w-3/5 flex-col h-full`}>
          <DocumentEditor activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>
      </div>
    </div>
  )
}
