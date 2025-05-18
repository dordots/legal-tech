import type { Metadata } from "next"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FormsList } from "@/components/forms/forms-list"
import { FormCreationWizard } from "@/components/forms/form-creation-wizard"

export const metadata: Metadata = {
  title: "Forms | 10-K AI Filing System",
  description: "Manage your 10-K filings",
}

export default function FormsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forms</h1>
          <p className="text-muted-foreground">Manage your SEC 10-K filings</p>
        </div>
        <FormCreationWizard>
          <Button className="bg-navy-900 hover:bg-navy-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Filing
          </Button>
        </FormCreationWizard>
      </div>

      <FormsList />
    </div>
  )
}
