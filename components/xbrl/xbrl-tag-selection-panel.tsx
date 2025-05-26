"use client"

import { useState } from "react"
import { Search, Star, Plus, Tag, RefreshCw, RotateCcw, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function XBRLTagSelectionPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string[]>(["statements"])

  const renderTagItem = (tag: any) => {
    return (
      <div
        key={tag.id}
        className={cn(
          "flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer",
          tag.required && "border-l-2 border-blue-500",
        )}
      >
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-navy-600" />
          <div>
            <div className="text-sm font-medium">{tag.name}</div>
            <div className="text-xs text-muted-foreground">{tag.label}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {tag.required && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs border-0">
              Required
            </Badge>
          )}
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="border-b p-2 bg-navy-50 flex items-center justify-between">
        <h3 className="text-sm font-medium">Tag Selection</h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tags..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="browse">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="browse" className="flex-1">
            Browse
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex-1">
            Recent
          </TabsTrigger>
          <TabsTrigger value="suggested" className="flex-1">
            Suggested
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="mt-0 p-0">
          <Accordion type="multiple" value={activeCategory} onValueChange={setActiveCategory} className="border-b">
            <AccordionItem value="statements" className="border-0">
              <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline hover:bg-gray-50">
                Statement of Income
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="space-y-1 p-1">{financialStatementTags.slice(0, 6).map(renderTagItem)}</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="balance" className="border-0">
              <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline hover:bg-gray-50">
                Balance Sheet
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="space-y-1 p-1">{balanceSheetTags.slice(0, 3).map(renderTagItem)}</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cashflow" className="border-0">
              <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline hover:bg-gray-50">
                Cash Flow
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="space-y-1 p-1">{cashFlowTags.slice(0, 3).map(renderTagItem)}</div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="company" className="border-0">
              <AccordionTrigger className="px-3 py-2 text-sm hover:no-underline hover:bg-gray-50">
                Company Specific
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="space-y-1 p-1">{companySpecificTags.slice(0, 3).map(renderTagItem)}</div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="p-2 text-xs text-center text-muted-foreground">
            Displaying standard elements from US GAAP Taxonomy 2023
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0 p-0">
          <div className="p-2 space-y-1">{recentTags.map(renderTagItem)}</div>

          <div className="p-2 border-t flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Recently used tags</span>
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              <RotateCcw className="h-3 w-3" />
              Clear
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="suggested" className="mt-0 p-0">
          <div className="p-2 space-y-1">{suggestedTags.map(renderTagItem)}</div>

          <div className="p-2 border-t flex items-center justify-center">
            <Badge variant="outline" className="gap-1">
              <Star className="h-3 w-3 text-amber-500" />
              AI-recommended tags
            </Badge>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data
const financialStatementTags = [
  { id: "1", name: "us-gaap:Revenue", label: "Revenue", required: true },
  { id: "2", name: "us-gaap:CostOfRevenue", label: "Cost of Revenue", required: true },
  { id: "3", name: "us-gaap:GrossProfit", label: "Gross Profit", required: true },
  { id: "4", name: "us-gaap:OperatingExpenses", label: "Operating Expenses", required: true },
  { id: "5", name: "us-gaap:OperatingIncome", label: "Operating Income", required: true },
  { id: "6", name: "us-gaap:IncomeTaxExpense", label: "Income Tax Expense", required: true },
]

const balanceSheetTags = [
  { id: "7", name: "us-gaap:Assets", label: "Assets", required: true },
  { id: "8", name: "us-gaap:Liabilities", label: "Liabilities", required: true },
  { id: "9", name: "us-gaap:StockholdersEquity", label: "Stockholders Equity", required: true },
]

const cashFlowTags = [
  { id: "10", name: "us-gaap:CashFlowsFromOperations", label: "Cash Flows From Operations", required: true },
  { id: "11", name: "us-gaap:CashFlowsFromInvesting", label: "Cash Flows From Investing", required: true },
  { id: "12", name: "us-gaap:CashFlowsFromFinancing", label: "Cash Flows From Financing", required: true },
]

const companySpecificTags = [
  { id: "13", name: "acme:CustomMetric1", label: "Custom Metric 1", required: false },
  { id: "14", name: "acme:CustomMetric2", label: "Custom Metric 2", required: false },
  { id: "15", name: "acme:CustomMetric3", label: "Custom Metric 3", required: false },
]

const recentTags = [
  { id: "16", name: "us-gaap:Revenue", label: "Revenue", required: true },
  { id: "17", name: "us-gaap:GrossProfit", label: "Gross Profit", required: true },
  { id: "18", name: "us-gaap:OperatingIncome", label: "Operating Income", required: true },
  { id: "19", name: "us-gaap:NetIncome", label: "Net Income", required: true },
]

const suggestedTags = [
  { id: "20", name: "us-gaap:OperatingExpenses", label: "Operating Expenses", required: true },
  { id: "21", name: "us-gaap:GrossMargin", label: "Gross Margin", required: false },
  { id: "22", name: "us-gaap:EarningsPerShare", label: "Earnings Per Share", required: true },
  { id: "23", name: "us-gaap:WeightedAverageShares", label: "Weighted Average Shares", required: true },
]
