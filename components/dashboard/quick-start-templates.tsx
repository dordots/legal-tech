"use client"

import { FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentCreationWizard } from "@/components/document-creation-wizard"

const templates = [
  {
    id: "10-k",
    title: "10-K Annual Report",
    description: "Create a new 10-K annual report for SEC filing",
    icon: FileText,
    color: "bg-navy-100 text-navy-800",
    featured: true,
  },
  {
    id: "10-q",
    title: "10-Q Quarterly Report",
    description: "Create a new 10-Q quarterly report for SEC filing",
    icon: FileText,
    color: "bg-blue-100 text-blue-800",
  },
]

export function QuickStartTemplates() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {templates.map((template) => (
        <Card key={template.id} className={template.featured ? "border-navy-200 bg-navy-50" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className={`rounded-full p-1.5 ${template.color}`}>
                <template.icon className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm">{template.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>{template.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <DocumentCreationWizard>
              <Button variant="ghost" size="sm" className="gap-1">
                Create <ArrowRight className="h-4 w-4" />
              </Button>
            </DocumentCreationWizard>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
