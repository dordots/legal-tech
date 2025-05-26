import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { QuickStartTemplates } from "@/components/dashboard/quick-start-templates"
import { DocumentTypeDistribution } from "@/components/dashboard/document-type-distribution"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { FileText, Users, Building2, TrendingUp } from "lucide-react"

export default async function HomePage() {
  const { userId } = await auth()

  // If user is not authenticated, redirect to sign-in
  if (!userId) {
    redirect("/sign-in")
  }

  // If authenticated, show the dashboard
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DashboardHeader />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Documents" value="2,847" description="+12% from last month" icon={FileText} trend="up" />
        <StatCard title="Active Users" value="156" description="+8% from last month" icon={Users} trend="up" />
        <StatCard title="Companies" value="89" description="+3 new this month" icon={Building2} trend="up" />
        <StatCard
          title="Completion Rate"
          value="94.2%"
          description="+2.1% from last month"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RecentDocuments />
        </div>
        <div className="col-span-3">
          <QuickStartTemplates />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <DocumentTypeDistribution />
        </div>
        <div className="col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
