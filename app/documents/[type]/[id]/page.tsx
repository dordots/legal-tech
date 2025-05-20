import { AdvancedEditor } from "@/components/editor/advanced-editor"

interface DocumentEditorPageProps {
  params: {
    type: string
    id: string
  }
}

export default function DocumentEditorPage({ params }: DocumentEditorPageProps) {
  return (
    <div className="h-screen">
      <AdvancedEditor documentId={params.id} documentType={params.type} />
    </div>
  )
}
