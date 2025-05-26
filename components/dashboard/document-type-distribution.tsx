import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DocumentTypeDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Distribution</CardTitle>
        <CardDescription>Documents by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">10-K Forms</span>
            <span className="text-sm text-muted-foreground">45%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Contracts</span>
            <span className="text-sm text-muted-foreground">30%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Legal Briefs</span>
            <span className="text-sm text-muted-foreground">15%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Other</span>
            <span className="text-sm text-muted-foreground">10%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
