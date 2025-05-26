import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Building, Scale, Users } from "lucide-react"

export function QuickStartTemplates() {
  const templates = [
    {
      title: "10-K Annual Report",
      description: "Create a new 10-K filing",
      icon: FileText,
    },
    {
      title: "Corporate Contract",
      description: "Draft a business contract",
      icon: Building,
    },
    {
      title: "Legal Brief",
      description: "Create a legal brief template",
      icon: Scale,
    },
    {
      title: "Partnership Agreement",
      description: "Draft partnership documents",
      icon: Users,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>Create new documents from templates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {templates.map((template, index) => (
            <Button key={index} variant="ghost" className="justify-start h-auto p-3">
              <template.icon className="mr-2 h-4 w-4" />
              <div className="text-left">
                <div className="font-medium">{template.title}</div>
                <div className="text-sm text-muted-foreground">{template.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
