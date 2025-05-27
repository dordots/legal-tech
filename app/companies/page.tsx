import { AuthWrapper } from "@/components/auth-wrapper"
import { CompanyList } from "@/components/companies/company-list"

export default function CompaniesPage() {
  return (
    <AuthWrapper>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
        </div>
        <CompanyList />
      </div>
    </AuthWrapper>
  )
}
