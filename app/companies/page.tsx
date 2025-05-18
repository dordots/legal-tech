import type { Metadata } from "next"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CompanyList } from "@/components/companies/company-list"

export const metadata: Metadata = {
  title: "Companies | 10-K AI Filing System",
  description: "Manage your companies for 10-K filings",
}

export default function CompaniesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage your companies and their filing information</p>
        </div>
        <Button className="bg-navy-900 hover:bg-navy-800">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      <CompanyList />
    </div>
  )
}
