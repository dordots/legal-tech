"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tag, AlertTriangle, Eye, CheckCircle2, Info, Code } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

interface XBRLFinancialContentViewProps {
  documentId: string
  sectionId: string
}

export function XBRLFinancialContentView({ documentId, sectionId }: XBRLFinancialContentViewProps) {
  const [viewMode, setViewMode] = useState("normal")
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null)

  const handleTagClick = (tagId: string) => {
    setSelectedTagId(tagId === selectedTagId ? null : tagId)
  }

  const renderTaggedValue = (value: any) => {
    const isValid = value.validation === "valid"
    const isWarning = value.validation === "warning"
    const isError = value.validation === "error"
    const isRequired = value.required

    return (
      <TooltipProvider key={value.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn("relative cursor-pointer px-0.5 py-0.5 rounded-sm inline-flex items-center", {
                "bg-green-50 border-l-2 border-green-500": isValid && !isRequired,
                "bg-blue-50 border-l-2 border-blue-500": isValid && isRequired,
                "bg-amber-50 border-l-2 border-amber-500": isWarning,
                "bg-red-50 border-l-2 border-red-500": isError,
                "ring-2 ring-navy-500": selectedTagId === value.id,
              })}
              onClick={() => handleTagClick(value.id)}
            >
              {value.value}
              <Badge
                variant="outline"
                className={cn("ml-1 py-0 px-1 h-4 text-[10px] font-normal border-0", {
                  "bg-green-100 text-green-800": isValid && !isRequired,
                  "bg-blue-100 text-blue-800": isValid && isRequired,
                  "bg-amber-100 text-amber-800": isWarning,
                  "bg-red-100 text-red-800": isError,
                })}
              >
                {value.tagName}
              </Badge>
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-md p-0 overflow-hidden">
            <div className="p-3">
              <div className="flex items-center gap-2 mb-1">
                <Tag className="h-4 w-4 text-navy-700" />
                <span className="font-medium">{value.tagName}</span>
                {isRequired && <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Required</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{value.definition}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Context:</span>{" "}
                  <span className="font-mono">{value.context}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Period:</span> <span>{value.period}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Unit:</span> <span>{value.unit}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Decimal:</span> <span>{value.decimals}</span>
                </div>
              </div>
              {!isValid && (
                <div className="mt-2 flex items-start gap-2 text-xs">
                  {isWarning ? (
                    <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <span className={isWarning ? "text-amber-700" : "text-red-700"}>{value.validationMessage}</span>
                </div>
              )}
            </div>
            <div className="px-3 py-2 border-t bg-muted text-xs flex justify-between">
              <span>AI Confidence: {value.confidence}%</span>
              <span className="font-medium hover:text-navy-700 cursor-pointer">Edit Tag</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const renderUntaggedValue = (value: any) => {
    return (
      <TooltipProvider key={value.id}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className="cursor-pointer px-0.5 py-0.5 border border-dashed border-gray-300 rounded-sm hover:bg-gray-50"
              onClick={() => handleTagClick(value.id)}
            >
              {value.value}
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="text-xs">
              <p className="font-medium mb-1 flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Untagged Value
              </p>
              {value.suggestions && value.suggestions.length > 0 ? (
                <div>
                  <p className="text-muted-foreground mb-1">Suggested tags:</p>
                  <ul className="space-y-1">
                    {value.suggestions.map((suggestion: any, i: number) => (
                      <li key={i} className="flex items-center gap-1">
                        <span className="font-medium">{suggestion.tagName}</span>
                        <span className="text-muted-foreground">({suggestion.confidence}%)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground">No suggested tags available</p>
              )}
              <p className="mt-2 font-medium text-navy-700 cursor-pointer">Add Tag</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const renderFinancialTable = () => {
    return (
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-navy-50">
              <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-left">Income Statement</th>
              <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-right">2023</th>
              <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-right">2022</th>
              <th className="border border-gray-200 px-4 py-2 text-sm font-semibold text-right">2021</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 px-4 py-2 text-sm font-medium">Revenue</td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "revenue-2023",
                  value: "$1,245,000,000",
                  tagName: "us-gaap:Revenue",
                  validation: "valid",
                  required: true,
                  definition:
                    "Amount of revenue recognized from goods sold, services rendered, insurance premiums, or other activities that constitute an earning process.",
                  context: "FY2023",
                  period: "2023-01-01 to 2023-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 98,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "revenue-2022",
                  value: "$1,080,000,000",
                  tagName: "us-gaap:Revenue",
                  validation: "valid",
                  required: true,
                  definition:
                    "Amount of revenue recognized from goods sold, services rendered, insurance premiums, or other activities that constitute an earning process.",
                  context: "FY2022",
                  period: "2022-01-01 to 2022-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 98,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "revenue-2021",
                  value: "$925,000,000",
                  tagName: "us-gaap:Revenue",
                  validation: "valid",
                  required: true,
                  definition:
                    "Amount of revenue recognized from goods sold, services rendered, insurance premiums, or other activities that constitute an earning process.",
                  context: "FY2021",
                  period: "2021-01-01 to 2021-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 97,
                })}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 text-sm font-medium">Cost of Revenue</td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "cost-revenue-2023",
                  value: "$498,000,000",
                  tagName: "us-gaap:CostOfRevenue",
                  validation: "valid",
                  required: true,
                  definition:
                    "The aggregate cost of goods produced and sold and services rendered during the reporting period.",
                  context: "FY2023",
                  period: "2023-01-01 to 2023-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 95,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "cost-revenue-2022",
                  value: "$432,000,000",
                  tagName: "us-gaap:CostOfRevenue",
                  validation: "valid",
                  required: true,
                  definition:
                    "The aggregate cost of goods produced and sold and services rendered during the reporting period.",
                  context: "FY2022",
                  period: "2022-01-01 to 2022-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 95,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "cost-revenue-2021",
                  value: "$370,000,000",
                  tagName: "us-gaap:CostOfRevenue",
                  validation: "valid",
                  required: true,
                  definition:
                    "The aggregate cost of goods produced and sold and services rendered during the reporting period.",
                  context: "FY2021",
                  period: "2021-01-01 to 2021-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 94,
                })}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 text-sm font-medium">Gross Profit</td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "gross-profit-2023",
                  value: "$747,000,000",
                  tagName: "us-gaap:GrossProfit",
                  validation: "warning",
                  required: true,
                  validationMessage: "Calculation inconsistency: Revenue - Cost of Revenue = $747,000,000",
                  definition:
                    "Aggregate revenue less cost of revenue directly attributable to the revenue generation activity.",
                  context: "FY2023",
                  period: "2023-01-01 to 2023-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 92,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "gross-profit-2022",
                  value: "$648,000,000",
                  tagName: "us-gaap:GrossProfit",
                  validation: "valid",
                  required: true,
                  definition:
                    "Aggregate revenue less cost of revenue directly attributable to the revenue generation activity.",
                  context: "FY2022",
                  period: "2022-01-01 to 2022-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 92,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "gross-profit-2021",
                  value: "$555,000,000",
                  tagName: "us-gaap:GrossProfit",
                  validation: "valid",
                  required: true,
                  definition:
                    "Aggregate revenue less cost of revenue directly attributable to the revenue generation activity.",
                  context: "FY2021",
                  period: "2021-01-01 to 2021-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 91,
                })}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 text-sm font-medium">Operating Expenses</td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "op-expenses-2023",
                  value: "$420,000,000",
                  tagName: "us-gaap:OperatingExpenses",
                  validation: "valid",
                  required: true,
                  definition: "The sum of all operating expenses, including research and development expense.",
                  context: "FY2023",
                  period: "2023-01-01 to 2023-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 95,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "op-expenses-2022",
                  value: "$375,000,000",
                  tagName: "us-gaap:OperatingExpenses",
                  validation: "valid",
                  required: true,
                  definition: "The sum of all operating expenses, including research and development expense.",
                  context: "FY2022",
                  period: "2022-01-01 to 2022-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 95,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderUntaggedValue({
                  id: "op-expenses-2021",
                  value: "$320,000,000",
                  suggestions: [
                    { tagName: "us-gaap:OperatingExpenses", confidence: 95 },
                    { tagName: "us-gaap:OperatingCostsAndExpenses", confidence: 78 },
                  ],
                })}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-4 py-2 text-sm font-medium">Operating Income</td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "op-income-2023",
                  value: "$327,000,000",
                  tagName: "us-gaap:OperatingIncome",
                  validation: "error",
                  required: true,
                  validationMessage: "Calculation inconsistency: Expected $327,000,000 but found $327,000,000",
                  definition: "The net result for the period of deducting operating expenses from operating revenues.",
                  context: "FY2023",
                  period: "2023-01-01 to 2023-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 90,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderTaggedValue({
                  id: "op-income-2022",
                  value: "$273,000,000",
                  tagName: "us-gaap:OperatingIncome",
                  validation: "valid",
                  required: true,
                  definition: "The net result for the period of deducting operating expenses from operating revenues.",
                  context: "FY2022",
                  period: "2022-01-01 to 2022-12-31",
                  unit: "USD",
                  decimals: "-6",
                  confidence: 90,
                })}
              </td>
              <td className="border border-gray-200 px-4 py-2 text-sm text-right">
                {renderUntaggedValue({
                  id: "op-income-2021",
                  value: "$235,000,000",
                  suggestions: [
                    { tagName: "us-gaap:OperatingIncome", confidence: 90 },
                    { tagName: "us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxes", confidence: 60 },
                  ],
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  const renderFinancialNotes = () => {
    return (
      <div className="prose prose-sm max-w-none mt-6">
        <h3 className="text-lg font-semibold mb-2">Notes to Financial Statements</h3>
        <p className="mb-4">
          For the fiscal years ended December 31, 2023, 2022, and 2021, the Company reported
          {renderTaggedValue({
            id: "revenue-note-2023",
            value: " Revenue of $1,245,000,000, $1,080,000,000, and $925,000,000 ",
            tagName: "us-gaap:RevenueTextBlock",
            validation: "valid",
            required: false,
            definition: "Textual information for Revenue disclosure.",
            context: "FY2023",
            period: "2023-01-01 to 2023-12-31",
            unit: "USD",
            decimals: "-6",
            confidence: 88,
          })}
          respectively, representing a year-over-year growth of 15.3% and 16.8%.
        </p>
        <p className="mb-4">
          {renderTaggedValue({
            id: "gross-margin-note",
            value: "Gross margin was 60.0%, 60.0%, and 60.0% ",
            tagName: "us-gaap:GrossMarginTextBlock",
            validation: "valid",
            required: false,
            definition: "Textual information for Gross Margin disclosure.",
            context: "FY2023",
            period: "2023-01-01 to 2023-12-31",
            unit: "Ratio",
            decimals: "3",
            confidence: 85,
          })}
          for the fiscal years ended December 31, 2023, 2022, and 2021, respectively. The consistency in gross margin
          reflects the Company's ability to maintain pricing power while managing supply chain costs effectively.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full border-r">
      <div className="flex items-center justify-between border-b p-2">
        <h3 className="text-sm font-medium">Financial Statement Content</h3>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)} size="sm">
          <ToggleGroupItem value="normal" aria-label="Normal View">
            <Eye className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="ixbrl" aria-label="Inline XBRL View">
            <Code className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-3 text-xs text-blue-800 flex items-start">
          <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Financial Statement Tagging Required</p>
            <p>
              This section contains financial data that must be tagged according to SEC requirements. Use the tagging
              controls to ensure all financial facts are properly tagged with XBRL.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2">Item 8: Financial Statements and Supplementary Data</h2>
        <p className="text-sm text-muted-foreground mb-4">
          The following consolidated financial statements of Acme Corporation and its subsidiaries, together with the
          report of our independent registered public accounting firm, appear below.
        </p>

        <h3 className="text-lg font-semibold mb-3">Consolidated Income Statement</h3>

        {renderFinancialTable()}

        {renderFinancialNotes()}

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Legend:</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Valid Tag</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span>Warning</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Error</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border border-dashed border-gray-400 rounded-full"></div>
              <span>Untagged</span>
            </div>
          </div>
          <Badge className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {viewMode === "normal" ? "Normal View" : "iXBRL View"}
          </Badge>
        </div>
      </ScrollArea>
    </div>
  )
}
