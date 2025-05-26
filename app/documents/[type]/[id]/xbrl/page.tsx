import { XBRLTaggingInterface } from "@/components/xbrl/xbrl-tagging-interface"

interface XBRLTaggingPageProps {
  params: {
    type: string
    id: string
  }
}

export default function XBRLTaggingPage({ params }: XBRLTaggingPageProps) {
  return (
    <div className="p-4 md:p-8 h-screen">
      <XBRLTaggingInterface documentId={params.id} sectionId="income-statement" />
    </div>
  )
}
