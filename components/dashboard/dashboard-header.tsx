import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your legal document automation workspace</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>
    </div>
  )
}
