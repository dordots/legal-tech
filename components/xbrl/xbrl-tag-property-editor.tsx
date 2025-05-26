"use client"

import { useState } from "react"
import { CalendarIcon, Info, Check, X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export function XBRLTagPropertyEditor() {
  const [selectedTag, setSelectedTag] = useState({
    name: "us-gaap:Revenue",
    label: "Revenue",
    value: "$1,245,000,000",
    unit: "USD",
    period: "FY2023",
    startDate: new Date(2023, 0, 1),
    endDate: new Date(2023, 11, 31),
    decimals: "-6",
    context: "FY2023",
    validation: "warning",
    validationMessage: "Calculation inconsistency detected",
    required: true,
  })

  const [startDate, setStartDate] = useState<Date | undefined>(selectedTag.startDate)
  const [endDate, setEndDate] = useState<Date | undefined>(selectedTag.endDate)

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="border-b p-2 bg-navy-50 flex items-center justify-between">
        <h3 className="text-sm font-medium">Tag Properties</h3>
        <div className="flex items-center gap-1">
          {selectedTag.validation === "warning" && (
            <Badge className="bg-amber-100 text-amber-800 gap-1">
              <AlertTriangle className="h-3 w-3" />
              Warning
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-navy-100 text-navy-800 hover:bg-navy-100">{selectedTag.name}</Badge>
            {selectedTag.required && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Required
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button variant="destructive" size="sm" className="h-7 gap-1">
              <X className="h-3 w-3" />
              Remove
            </Button>
            <Button variant="default" size="sm" className="h-7 gap-1">
              <Check className="h-3 w-3" />
              Apply
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="value">Fact Value</Label>
            <Input
              id="value"
              value={selectedTag.value}
              onChange={(e) => setSelectedTag({ ...selectedTag, value: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="unit">Unit</Label>
              <Select defaultValue={selectedTag.unit}>
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                  <SelectItem value="shares">Shares</SelectItem>
                  <SelectItem value="ratio">Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="decimals">Decimals</Label>
              <Select defaultValue={selectedTag.decimals}>
                <SelectTrigger id="decimals">
                  <SelectValue placeholder="Select precision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-3">Thousands (-3)</SelectItem>
                  <SelectItem value="-6">Millions (-6)</SelectItem>
                  <SelectItem value="-9">Billions (-9)</SelectItem>
                  <SelectItem value="0">Ones (0)</SelectItem>
                  <SelectItem value="2">Cents (2)</SelectItem>
                  <SelectItem value="INF">Exact (INF)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Period Type</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Instant: A point in time (e.g., balance sheet accounts)
                      <br />
                      Duration: A period of time (e.g., income statement accounts)
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <RadioGroup defaultValue="duration" className="flex">
              <div className="flex items-center space-x-2 bg-white border rounded-l-md px-3 py-1.5 cursor-pointer">
                <RadioGroupItem value="duration" id="duration" />
                <Label htmlFor="duration" className="cursor-pointer">
                  Duration
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-white border border-l-0 rounded-r-md px-3 py-1.5 cursor-pointer">
                <RadioGroupItem value="instant" id="instant" />
                <Label htmlFor="instant" className="cursor-pointer">
                  Instant
                </Label>
              </div>
            </RadioGroup>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="grid gap-1.5 flex-1">
                <Label htmlFor="startDate">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="startDate"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-1.5 flex-1">
                <Label htmlFor="endDate">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="endDate"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid gap-1.5">
            <Label htmlFor="context">Context ID</Label>
            <Input
              id="context"
              value={selectedTag.context}
              onChange={(e) => setSelectedTag({ ...selectedTag, context: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Unique identifier for this fact's context. Typically includes period and entity information.
            </p>
          </div>

          {selectedTag.validation === "warning" && (
            <div className="bg-amber-50 border-l-2 border-amber-500 p-3 text-sm text-amber-800 flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Warning:</p>
                <p>{selectedTag.validationMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
