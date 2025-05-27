import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentCreationWizard } from "@/components/document-creation-wizard"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your legal documents and track progress</p>
      </div>
      <DocumentCreationWizard>
        <Button className="bg-navy-900 hover:bg-navy-800">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </DocumentCreationWizard>
    </div>
  )
}
