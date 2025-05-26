"use client"

import { useState } from "react"
import { CheckCircle2, AlertTriangle, XCircle, Info, PlusCircle, ArrowRight, Calculator, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

interface XBRLValidationPanelProps {
  documentId: string
}

export function XBRLValidationPanel({ documentId }: XBRLValidationPanelProps) {
  const [validationTab, setValidationTab] = useState("issues")
  const [runningValidation, setRunningValidation] = useState(false)

  const handleRunValidation = () => {
    setRunningValidation(true)
    setTimeout(() => {
      setRunningValidation(false)
    }, 2000)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Validation Results</h3>
          <Badge variant="outline" className="text-xs">
            Last run: 10 minutes ago
          </Badge>
        </div>
        <Button
          variant="default"
          size="sm"
          className="gap-1"
          onClick={handleRunValidation}
          disabled={runningValidation}
        >
          {runningValidation ? (
            <>
              <RefreshCw className="h-3 w-3 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-3 w-3" />
              Run Validation
            </>
          )}
        </Button>
      </div>

      {runningValidation && (
        <div className="mb-4 space-y-2">
          <Progress value={65} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">Validating document... 65%</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="border rounded-md p-2 bg-green-50 flex flex-col items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600 mb-1" />
          <div className="text-lg font-bold">42</div>
          <div className="text-xs text-green-700">Valid</div>
        </div>
        <div className="border rounded-md p-2 bg-amber-50 flex flex-col items-center justify-center">
          <AlertTriangle className="h-6 w-6 text-amber-600 mb-1" />
          <div className="text-lg font-bold">7</div>
          <div className="text-xs text-amber-700">Warnings</div>
        </div>
        <div className="border rounded-md p-2 bg-red-50 flex flex-col items-center justify-center">
          <XCircle className="h-6 w-6 text-red-600 mb-1" />
          <div className="text-lg font-bold">3</div>
          <div className="text-xs text-red-700">Errors</div>
        </div>
        <div className="border rounded-md p-2 bg-blue-50 flex flex-col items-center justify-center">
          <Info className="h-6 w-6 text-blue-600 mb-1" />
          <div className="text-lg font-bold">12</div>
          <div className="text-xs text-blue-700">Required</div>
        </div>
      </div>

      <Tabs
        defaultValue="issues"
        value={validationTab}
        onValueChange={setValidationTab as (value: string) => void}
        className="flex-1 flex flex-col"
      >
        <TabsList className="w-full">
          <TabsTrigger value="issues" className="flex-1">
            Issues
          </TabsTrigger>
          <TabsTrigger value="calculations" className="flex-1">
            Calculations
          </TabsTrigger>
          <TabsTrigger value="missing" className="flex-1">
            Missing Tags
          </TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="flex-1 overflow-hidden mt-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="errors" className="border border-red-200 bg-red-50 rounded-md overflow-hidden">
                  <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-red-100">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Errors (3)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 p-2">
                      {validationErrors.map((error, index) => (
                        <div key={index} className="bg-white border border-red-200 rounded-md p-2">
                          <div className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            <div>
                              <div className="font-medium">{error.message}</div>
                              <div className="text-xs text-muted-foreground mt-1">{error.location}</div>
                              <div className="flex items-center mt-2 gap-2">
                                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                                  <ArrowRight className="h-3 w-3" />
                                  Go to Issue
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                                  Fix Automatically
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="warnings"
                  className="border border-amber-200 bg-amber-50 rounded-md overflow-hidden mt-2"
                >
                  <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-amber-100">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span className="font-medium">Warnings (7)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 p-2">
                      {validationWarnings.slice(0, 3).map((warning, index) => (
                        <div key={index} className="bg-white border border-amber-200 rounded-md p-2">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                            <div>
                              <div className="font-medium">{warning.message}</div>
                              <div className="text-xs text-muted-foreground mt-1">{warning.location}</div>
                              <div className="flex items-center mt-2 gap-2">
                                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                                  <ArrowRight className="h-3 w-3" />
                                  Go to Issue
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                                  Ignore Warning
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="calculations" className="flex-1 overflow-hidden mt-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-3">
              <div className="bg-white border rounded-md">
                <div className="p-3 border-b bg-navy-50 flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-navy-700" />
                  <span className="font-medium">Income Statement Calculations</span>
                </div>
                <div className="p-3">
                  <div className="space-y-2">
                    {calculationItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2">
                          {item.valid ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          )}
                          <span>{item.formula}</span>
                        </div>
                        <div>
                          {item.valid ? (
                            <Badge className="bg-green-100 text-green-800">Valid</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800">Invalid</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="missing" className="flex-1 overflow-hidden mt-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-2 space-y-2">
              <div className="bg-white border rounded-md">
                <div className="p-3 border-b bg-navy-50 flex items-center justify-between">
                  <span className="font-medium">Required Tags</span>
                  <Badge className="bg-blue-100 text-blue-800">12 Missing</Badge>
                </div>
                <div className="p-3">
                  <div className="space-y-2">
                    {missingTags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-600" />
                          <span>{tag.name}</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-7">
                          <PlusCircle className="h-3 w-3 mr-1" />
                          Add Tag
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sample data for validation panel
const validationErrors = [
  {
    message: "Calculation inconsistency: Operating Income",
    location: "Income Statement, Row 5",
  },
  {
    message: "Invalid date format in context",
    location: "Context ID: FY2023",
  },
  {
    message: "Missing required unit for monetary item",
    location: "Tag: us-gaap:NetIncomeLoss",
  },
]

const validationWarnings = [
  {
    message: "Calculation difference (less than 1%): Gross Profit",
    location: "Income Statement, Row 3",
  },
  {
    message: "Uncommon unit used: Ratio",
    location: "Tag: us-gaap:GrossMargin",
  },
  {
    message: "Extension taxonomy element used where standard element exists",
    location: "Tag: acme:CustomMetric1",
  },
  {
    message: "Rounding inconsistency in values",
    location: "Income Statement, multiple rows",
  },
]

const calculationItems = [
  {
    formula: "Revenue - Cost of Revenue = Gross Profit",
    valid: true,
  },
  {
    formula: "Gross Profit - Operating Expenses = Operating Income",
    valid: false,
  },
  {
    formula: "Operating Income - Interest Expense = Income Before Tax",
    valid: true,
  },
  {
    formula: "Income Before Tax - Income Tax Expense = Net Income",
    valid: true,
  },
]

const missingTags = [
  { name: "us-gaap:EarningsPerShareBasic" },
  { name: "us-gaap:EarningsPerShareDiluted" },
  { name: "us-gaap:WeightedAverageNumberOfSharesOutstandingBasic" },
  { name: "us-gaap:WeightedAverageNumberOfSharesOutstandingDiluted" },
  { name: "us-gaap:OperatingIncomeLoss" },
]
