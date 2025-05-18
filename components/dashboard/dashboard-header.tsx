import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Manage your SEC 10-K filings and track progress</p>
      </div>
      <Button className="bg-navy-900 hover:bg-navy-800">
        <PlusCircle className="mr-2 h-4 w-4" />
        New Filing
      </Button>
    </div>
  )
}
