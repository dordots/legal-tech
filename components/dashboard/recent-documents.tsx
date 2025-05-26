import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentDocuments() {
  const documents = [
    {
      id: 1,
      title: "Apple Inc. 10-K Filing 2024",
      type: "10-K",
      status: "In Progress",
      lastModified: "2 hours ago",
    },
    {
      id: 2,
      title: "Microsoft Corp. Annual Report",
      type: "10-K",
      status: "Completed",
      lastModified: "1 day ago",
    },
    {
      id: 3,
      title: "Tesla Inc. Quarterly Filing",
      type: "10-Q",
      status: "Review",
      lastModified: "3 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
        <CardDescription>Your most recently edited documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{doc.title}</p>
                <p className="text-sm text-muted-foreground">{doc.lastModified}</p>
              </div>
              <Badge variant="outline">{doc.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
