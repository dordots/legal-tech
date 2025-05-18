import type { Metadata } from "next"
import { AlertCircle, CheckCircle2, FileText, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatCard } from "@/components/dashboard/stat-card"

export const metadata: Metadata = {
  title: "Dashboard | 10-K AI Filing System",
  description: "Dashboard for 10-K AI Filing System",
}

export default function DashboardPage() {
  return (
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
              title="Total Forms"
              value="12"
              description="Active filings in progress"
              icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            />
            <StatCard
              title="Completed"
              value="5"
              description="Ready for submission"
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
            />
            <StatCard
              title="In Progress"
              value="4"
              description="Being actively edited"
              icon={<RefreshCw className="h-4 w-4 text-blue-500" />}
            />
            <StatCard
              title="Needs Attention"
              value="3"
              description="Requires review"
              icon={<AlertCircle className="h-4 w-4 text-amber-500" />}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Forms</CardTitle>
                <CardDescription>Your most recently edited 10-K filings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentForms.map((form) => (
                    <div key={form.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "rounded-full w-2 h-2",
                            form.status === "completed" && "bg-green-500",
                            form.status === "in-progress" && "bg-blue-500",
                            form.status === "needs-attention" && "bg-amber-500",
                          )}
                        />
                        <div>
                          <p className="text-sm font-medium">{form.company}</p>
                          <p className="text-xs text-muted-foreground">FY {form.year} 10-K</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">{form.progress}% complete</div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/forms/${form.id}`}>Edit</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/forms">View All Forms</a>
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
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics for your filings</CardDescription>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const recentForms = [
  {
    id: "1",
    company: "Acme Corporation",
    year: "2023",
    progress: 85,
    status: "in-progress",
  },
  {
    id: "2",
    company: "Globex Industries",
    year: "2023",
    progress: 100,
    status: "completed",
  },
  {
    id: "3",
    company: "Initech Technologies",
    year: "2023",
    progress: 42,
    status: "needs-attention",
  },
  {
    id: "4",
    company: "Umbrella Corp",
    year: "2023",
    progress: 67,
    status: "in-progress",
  },
]
