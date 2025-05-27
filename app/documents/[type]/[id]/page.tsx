import { AuthWrapper } from "@/components/auth-wrapper"
import { AdvancedEditor } from "@/components/editor/advanced-editor"

interface DocumentPageProps {
  params: Promise<{
    type: string
    id: string
  }>
}

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { type, id } = await params

  return (
    <AuthWrapper>
      <AdvancedEditor documentType={type} documentId={id} />
    </AuthWrapper>
  )
}
