import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AuthenticatedLayout } from "@/components/authenticated-layout"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatCard } from "@/components/dashboard/stat-card"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { QuickStartTemplates } from "@/components/dashboard/quick-start-templates"
import { DocumentTypeDistribution } from "@/components/dashboard/document-type-distribution"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, FileText, RefreshCw } from "lucide-react"

export default async function HomePage() {
  const { userId } = await auth()

  // If user is not authenticated, redirect to sign-in
  if (!userId) {
    redirect("/sign-in")
  }

  // If authenticated, show the dashboard with sidebar
  return (
    <AuthenticatedLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardHeader />
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Documents"
                value="24"
                description="Across all document types"
                icon={<FileText className="h-4 w-4 text-muted-foreground" />}
              />
              <StatCard
                title="Completed"
                value="12"
                description="Ready for submission or use"
                icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
              />
              <StatCard
                title="In Progress"
                value="8"
                description="Being actively edited"
                icon={<RefreshCw className="h-4 w-4 text-blue-500" />}
              />
              <StatCard
                title="Needs Attention"
                value="4"
                description="Requires review"
                icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Your most recently edited documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentDocuments />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/documents">View All Documents</a>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Document Distribution</CardTitle>
                  <CardDescription>Documents by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentTypeDistribution />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>Create new documents from templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickStartTemplates />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View detailed analytics for your documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Analytics dashboard coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Reports dashboard coming soon</p>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  )
}
