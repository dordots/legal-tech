import type { Metadata } from "next"
import { FormEditor } from "@/components/editor/form-editor"

export const metadata: Metadata = {
  title: "Form Editor | 10-K AI Filing System",
  description: "Edit your 10-K filing with AI assistance",
}

export default function FormEditorPage({ params }: { params: { formId: string } }) {
  return (
    <div className="h-screen flex flex-col">
      <FormEditor formId={params.formId} />
    </div>
  )
}
