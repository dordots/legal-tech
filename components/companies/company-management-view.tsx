"use client"
import { useState } from "react"
import { PlusCircle, Table as TableIcon, LayoutGrid } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CompanyTable } from "./company-table"
import { CompanyCard, Company } from "./company-card"
import { AddCompanyDialog } from "./add-company-dialog"

const initialCompanies: Company[] = [
  {
    id: "1",
    name: "Acme Corporation",
    ticker: "ACME",
    industry: "Technology",
    marketCap: "$5B",
    filings: 5,
    status: "up-to-date",
    lastUpdated: "2024-06-01",
  },
  {
    id: "2",
    name: "Globex Industries",
    ticker: "GLBX",
    industry: "Manufacturing",
    marketCap: "$1.2B",
    filings: 3,
    status: "in-progress",
    lastUpdated: "2024-05-28",
  },
  {
    id: "3",
    name: "Initech Technologies",
    ticker: "INIT",
    industry: "Technology",
    marketCap: "$750M",
    filings: 2,
    status: "overdue",
    lastUpdated: "2024-05-15",
  },
  {
    id: "4",
    name: "Umbrella Corp",
    ticker: "UMBR",
    industry: "Healthcare",
    marketCap: "$2B",
    filings: 4,
    status: "up-to-date",
    lastUpdated: "2024-05-30",
  },
  {
    id: "5",
    name: "Stark Industries",
    ticker: "STRK",
    industry: "Defense",
    marketCap: "$8B",
    filings: 1,
    status: "inactive",
    lastUpdated: "2024-04-10",
  },
]

export function CompanyManagementView() {
  const [view, setView] = useState<"table" | "card">("table")
  const [rowSelection, setRowSelection] = useState({} as Record<string, boolean>)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={view} onValueChange={(v) => v && setView(v as "table" | "card") }>
            <ToggleGroupItem value="table" aria-label="Table view">
              <TableIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="card" aria-label="Card view">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          {Object.keys(rowSelection).length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">Batch Actions</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Initiate Filing</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
                <DropdownMenuItem>Assign to Team</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <AddCompanyDialog>
          <Button className="bg-navy-900 hover:bg-navy-800">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </AddCompanyDialog>
      </div>
      {view === "table" ? (
        <CompanyTable data={initialCompanies} rowSelection={rowSelection} onRowSelectionChange={setRowSelection} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialCompanies.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      )}
    </div>
  )
}
