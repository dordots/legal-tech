"use client"

import { useState } from "react"
import { FileText, FileSignature, FileCheck, FileSpreadsheet, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const documentTypes = {
  "10-k": { name: "10-K Report", icon: FileText, color: "bg-navy-500" },
  "10-q": { name: "10-Q Report", icon: FileText, color: "bg-blue-500" },
  "8-k": { name: "8-K Report", icon: FileText, color: "bg-sky-500" },
  nda: { name: "NDA", icon: FileSignature, color: "bg-emerald-500" },
  policy: { name: "Policy", icon: FileCheck, color: "bg-amber-500" },
  memo: { name: "Legal Memo", icon: FileSpreadsheet, color: "bg-purple-500" },
  bylaws: { name: "Corporate Bylaws", icon: Users, color: "bg-rose-500" },
}

const recentDocuments = [
  {
    id: "1",
    company: "Acme Corporation",
    title: "FY 2023 10-K Annual Report",
    type: "10-k",
    progress: 85,
    status: "in-progress",
    updated: "2023-12-15",
  },
  {
    id: "2",
    company: "Globex Industries",
    title: "FY 2023 10-K Annual Report",
    type: "10-k",
    progress: 100,
    status: "completed",
    updated: "2023-12-20",
  },
  {
    id: "3",
    company: "Initech Technologies",
    title: "Q3 2023 10-Q Quarterly Report",
    type: "10-q",
    progress: 42,
    status: "draft",
    updated: "2023-12-10",
  },
  {
    id: "4",
    company: "Umbrella Corp",
    title: "Non-Disclosure Agreement",
    type: "nda",
    progress: 67,
    status: "in-progress",
    updated: "2023-12-18",
  },
  {
    id: "5",
    company: "Wayne Enterprises",
    title: "Corporate Bylaws",
    type: "bylaws",
    progress: 95,
    status: "review",
    updated: "2023-12-12",
  },
]

export function RecentDocuments() {
  const [filter, setFilter] = useState<string>("all")

  const filteredDocuments = filter === "all" ? recentDocuments : recentDocuments.filter((doc) => doc.type === filter)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Documents</SelectItem>
            <SelectItem value="10-k">10-K Reports</SelectItem>
            <SelectItem value="10-q">10-Q Reports</SelectItem>
            <SelectItem value="8-k">8-K Reports</SelectItem>
            <SelectItem value="nda">NDAs</SelectItem>
            <SelectItem value="bylaws">Corporate Bylaws</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filteredDocuments.map((doc) => {
          const DocIcon = documentTypes[doc.type as keyof typeof documentTypes]?.icon || FileText
          const docColor = documentTypes[doc.type as keyof typeof documentTypes]?.color || "bg-gray-500"

          return (
            <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-4">
                <div className={`rounded-full w-8 h-8 ${docColor} flex items-center justify-center`}>
                  <DocIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">{doc.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    doc.status === "completed"
                      ? "default"
                      : doc.status === "draft"
                        ? "outline"
                        : doc.status === "review"
                          ? "secondary"
                          : "outline"
                  }
                  className={doc.status === "in-progress" ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : ""}
                >
                  {doc.status
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {new Date(doc.updated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/documents/${doc.type}/${doc.id}`}>Edit</a>
                </Button>
              </div>
            </div>
          )
        })}

        {filteredDocuments.length === 0 && (
          <div className="flex items-center justify-center h-32 border rounded-md">
            <p className="text-muted-foreground">No documents found</p>
          </div>
        )}
      </div>
    </div>
  )
}
