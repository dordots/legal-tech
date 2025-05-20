import type { Metadata } from "next"
import { CompanyManagementView } from "@/components/companies/company-management-view"

export const metadata: Metadata = {
  title: "Companies | 10-K AI Filing System",
  description: "Manage your companies for 10-K filings",
}

export default function CompaniesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <p className="text-muted-foreground">Manage your companies and their filing information</p>
      </div>
      <CompanyManagementView />
    </div>
  )
}
