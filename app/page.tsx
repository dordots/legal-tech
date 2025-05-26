"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AuthenticatedLayout } from "@/components/authenticated-layout"
import { StatCard } from "@/components/dashboard/stat-card"
import { DocumentTypeDistribution } from "@/components/dashboard/document-type-distribution"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { QuickStartTemplates } from "@/components/dashboard/quick-start-templates"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { FileText, Users, Building, TrendingUp } from "lucide-react"

export default function HomePage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <AuthenticatedLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Documents" value="2,350" description="+20.1% from last month" icon={FileText} />
          <StatCard title="Active Users" value="145" description="+180.1% from last month" icon={Users} />
          <StatCard title="Companies" value="89" description="+19% from last month" icon={Building} />
          <StatCard title="Completion Rate" value="94.2%" description="+2.1% from last month" icon={TrendingUp} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <DocumentTypeDistribution />
          </div>
          <div className="col-span-3">
            <RecentDocuments />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <QuickStartTemplates />
          </div>
          <div className="col-span-3">
            <RecentActivity />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
