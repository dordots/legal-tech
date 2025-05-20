import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface Company {
  id: string
  name: string
  ticker: string
  industry: string
  marketCap: string
  filings: number
  status: "up-to-date" | "in-progress" | "overdue" | "inactive"
  lastUpdated: string
  logo?: string
}

interface CompanyCardProps {
  company: Company
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-base">
          <span>{company.name}</span>
          <Badge
            className={
              company.status === "up-to-date"
                ? "bg-green-500"
                : company.status === "in-progress"
                  ? "bg-yellow-500"
                  : company.status === "overdue"
                    ? "bg-red-500"
                    : "bg-gray-400"
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm text-muted-foreground">{company.industry}</div>
        <div className="text-sm">Market Cap: {company.marketCap}</div>
        <div className="text-sm">Active Filings: {company.filings}</div>
        <div className="text-sm text-muted-foreground">
          Updated {new Date(company.lastUpdated).toLocaleDateString()}
        </div>
        <Button variant="outline" size="sm" className="w-full">
          New Filing
        </Button>
      </CardContent>
    </Card>
  )
}
