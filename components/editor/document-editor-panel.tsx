"use client"

interface DocumentEditorPanelProps {
  activeSection: string
  onSectionChange: (section: string) => void
  documentType: string
}

export function DocumentEditorPanel({ activeSection, onSectionChange, documentType }: DocumentEditorPanelProps) {
  const sections = [
    { id: "details", label: "Details" },
    { id: "content", label: "Content" },
    { id: "settings", label: "Settings" },
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">Document Editor</h2>
        <div className="space-x-2">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`px-4 py-2 rounded-md ${
                activeSection === section.id ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => onSectionChange(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {activeSection === "details" && <div>Details Section Content</div>}
        {activeSection === "content" && <div>Content Section Content</div>}
        {activeSection === "settings" && <div>Settings Section Content</div>}
      </div>
    </div>
  )
}
