import Link from "next/link"
import { ArrowLeft, Download, FileText, History, Save, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FormEditorHeaderProps {
  formId: string
}

export function FormEditorHeader({ formId }: FormEditorHeaderProps) {
  return (
    <div className="border-b bg-white p-2 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/forms">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to forms</span>
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-navy-900" />
            <div>
              <h1 className="text-lg font-semibold">Acme Corporation</h1>
              <p className="text-xs text-muted-foreground">FY 2023 10-K Filing</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Separator orientation="vertical" className="h-8" />
          <Button size="sm" className="bg-navy-900 hover:bg-navy-800">
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
