"use client"

import { useState } from "react"
import { FileText, Search, FolderTree, ChevronRight, ChevronDown, Plus, ExternalLink, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function XBRLTaxonomyBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [taxonomyVersion, setTaxonomyVersion] = useState("2023")
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["statements"])

  const toggleNode = (nodeId: string) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter((id) => id !== nodeId))
    } else {
      setExpandedNodes([...expandedNodes, nodeId])
    }
  }

  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId === selectedElement ? null : elementId)
  }

  const renderTaxonomyItem = (item: any, level = 0) => {
    const isExpanded = expandedNodes.includes(item.id)
    const hasChildren = item.children && item.children.length > 0
    const isSelected = selectedElement === item.id

    return (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer",
            isSelected && "bg-navy-100 hover:bg-navy-100",
          )}
          onClick={() => handleElementSelect(item.id)}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
          {hasChildren ? (
            <div
              className="mr-1 text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation()
                toggleNode(item.id)
              }}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
          ) : (
            <Tag className="h-4 w-4 mr-1 text-navy-600" />
          )}
          <span className="text-sm truncate">{item.name}</span>
        </div>

        {hasChildren && isExpanded && (
          <div>{item.children.map((child: any) => renderTaxonomyItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  const renderTaxonomyTree = () => {
    return <div className="space-y-1">{taxonomyData.map((item) => renderTaxonomyItem(item))}</div>
  }

  const renderElementDetails = () => {
    if (!selectedElement) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
          <FileText className="h-12 w-12 mb-4 opacity-20" />
          <p>Select a taxonomy element to view its details</p>
        </div>
      )
    }

    // Find the selected element in the taxonomy
    const findElement = (items: any[]): any => {
      for (const item of items) {
        if (item.id === selectedElement) return item
        if (item.children) {
          const found = findElement(item.children)
          if (found) return found
        }
      }
      return null
    }

    const element = findElement(taxonomyData) || elementDetailsData

    return (
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{element.name}</h3>
            <p className="text-sm text-muted-foreground">{element.label}</p>
          </div>
          <Badge className="bg-navy-100 text-navy-800">{element.namespace}</Badge>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Definition</h4>
            <p className="text-sm text-muted-foreground">{element.definition}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Type</h4>
              <Badge variant="outline">{element.type}</Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-1">Period Type</h4>
              <Badge variant="outline">{element.periodType}</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Documentation</h4>
            <div className="text-sm text-muted-foreground border rounded-md p-3 bg-muted/50">
              {element.documentation}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-1">Standard Label</h4>
            <p className="text-sm">{element.standardLabel}</p>
          </div>

          {element.relationships && (
            <div>
              <h4 className="text-sm font-medium mb-2">Calculation Relationships</h4>
              <div className="border rounded-md overflow-hidden">
                <div className="bg-muted p-2 text-xs font-medium">Calculation Weights</div>
                <div className="p-3 space-y-2">
                  {element.relationships.map((rel: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-navy-600" />
                        <span>{rel.concept}</span>
                      </div>
                      <Badge>{rel.weight}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Added in taxonomy version:</span>
              <Badge variant="outline">{element.addedIn}</Badge>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <ExternalLink className="h-3 w-3" />
              FASB Docs
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FolderTree className="h-5 w-5 text-navy-600" />
          <h3 className="font-medium">Taxonomy Browser</h3>
        </div>
        <div className="flex items-center gap-2">
          <Select value={taxonomyVersion} onValueChange={setTaxonomyVersion}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Select version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">US GAAP 2023</SelectItem>
              <SelectItem value="2022">US GAAP 2022</SelectItem>
              <SelectItem value="2021">US GAAP 2021</SelectItem>
              <SelectItem value="custom">Custom Extension</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1 h-8">
            <Plus className="h-3 w-3" />
            New Element
          </Button>
        </div>
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search taxonomy..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 border rounded-md overflow-hidden">
        <Tabs defaultValue="browse">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="search">Search Results</TabsTrigger>
            <TabsTrigger value="extensions">Extensions</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-2 h-[calc(100%-41px)]">
            <div className="border-r">
              <TabsContent value="browse" className="m-0 h-full">
                <ScrollArea className="h-full p-2">{renderTaxonomyTree()}</ScrollArea>
              </TabsContent>

              <TabsContent value="search" className="m-0 h-full">
                <ScrollArea className="h-full p-2">
                  <div className="py-3 px-4 text-center text-sm text-muted-foreground">
                    {searchQuery ? `3 results for "${searchQuery}"` : "Enter a search term to find taxonomy elements"}
                  </div>
                  {searchQuery && (
                    <div className="space-y-1">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "flex items-center py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer",
                            selectedElement === item.id && "bg-navy-100 hover:bg-navy-100",
                          )}
                          onClick={() => handleElementSelect(item.id)}
                        >
                          <Tag className="h-4 w-4 mr-1 text-navy-600" />
                          <div>
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="extensions" className="m-0 h-full">
                <ScrollArea className="h-full p-2">
                  <div className="space-y-1">
                    {extensionElements.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer",
                          selectedElement === item.id && "bg-navy-100 hover:bg-navy-100",
                        )}
                        onClick={() => handleElementSelect(item.id)}
                      >
                        <Tag className="h-4 w-4 mr-1 text-navy-600" />
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>

            <div>
              <ScrollArea className="h-full">{renderElementDetails()}</ScrollArea>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

// Sample data for taxonomy browser
const taxonomyData = [
  {
    id: "statements",
    name: "Financial Statements",
    children: [
      {
        id: "income",
        name: "Statement of Income",
        children: [
          {
            id: "revenue",
            name: "us-gaap:Revenue",
            label: "Revenue",
            definition:
              "Amount of revenue recognized from goods sold, services rendered, insurance premiums, or other activities that constitute an earning process.",
            type: "monetaryItemType",
            periodType: "duration",
            documentation:
              "Amount of revenue recognized from goods sold, services rendered, insurance premiums, or other activities that constitute an earning process. Includes, but is not limited to, investment and interest income before deduction of interest expense when recognized as a component of revenue...",
            standardLabel: "Revenue",
            namespace: "us-gaap",
            addedIn: "2008",
          },
          { id: "costOfRevenue", name: "us-gaap:CostOfRevenue" },
          { id: "grossProfit", name: "us-gaap:GrossProfit" },
          { id: "operatingExpenses", name: "us-gaap:OperatingExpenses" },
          { id: "operatingIncome", name: "us-gaap:OperatingIncome" },
        ],
      },
      {
        id: "balance",
        name: "Balance Sheet",
        children: [
          { id: "assets", name: "us-gaap:Assets" },
          { id: "liabilities", name: "us-gaap:Liabilities" },
          { id: "equity", name: "us-gaap:StockholdersEquity" },
        ],
      },
      {
        id: "cashFlow",
        name: "Cash Flow Statement",
        children: [
          { id: "cashOps", name: "us-gaap:CashFlowsFromOperations" },
          { id: "cashInvest", name: "us-gaap:CashFlowsFromInvesting" },
          { id: "cashFinance", name: "us-gaap:CashFlowsFromFinancing" },
        ],
      },
    ],
  },
  {
    id: "disclosures",
    name: "Notes & Disclosures",
    children: [
      { id: "policies", name: "Accounting Policies" },
      { id: "segments", name: "Business Segments" },
      { id: "taxes", name: "Income Taxes" },
    ],
  },
]

const elementDetailsData = {
  id: "revenue",
  name: "us-gaap:Revenue",
  label: "Revenue",
  definition:
    "Amount of revenue recognized from goods sold, services rendered, insurance premiums, or other activities that constitute an earning process.",
  type: "monetaryItemType",
  periodType: "duration",
  documentation:
    "Amount of revenue recognized from goods sold, services rendered, insurance premiums, or other activities that constitute an earning process. Includes, but is not limited to, investment and interest income before deduction of interest expense when recognized as a component of revenue, and sales and trading gain (loss).",
  standardLabel: "Revenue",
  namespace: "us-gaap",
  addedIn: "2008",
  relationships: [
    { concept: "us-gaap:SalesRevenueNet", weight: "1.0" },
    { concept: "us-gaap:ServiceRevenue", weight: "1.0" },
    { concept: "us-gaap:InterestIncomeOperating", weight: "1.0" },
  ],
}

const searchResults = [
  {
    id: "revenue1",
    name: "us-gaap:Revenue",
    label: "Revenue",
  },
  {
    id: "revenue2",
    name: "us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax",
    label: "Revenue From Contract With Customer Excluding Assessed Tax",
  },
  {
    id: "revenue3",
    name: "us-gaap:RevenueRemainingPerformanceObligation",
    label: "Revenue Remaining Performance Obligation",
  },
]

const extensionElements = [
  {
    id: "ext1",
    name: "acme:CustomRevenue",
    label: "Custom Revenue Metric",
  },
  {
    id: "ext2",
    name: "acme:CustomProductSales",
    label: "Custom Product Sales",
  },
  {
    id: "ext3",
    name: "acme:CustomOperatingMetric",
    label: "Custom Operating Metric",
  },
]
