"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Check, ChevronsUpDown, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const documentTypes = [
  {
    id: "10-k",
    name: "10-K Annual Report",
    description: "Annual report required by the SEC for public companies",
    category: "SEC Filings",
    icon: FileText,
    featured: true,
  },
  {
    id: "10-q",
    name: "10-Q Quarterly Report",
    description: "Quarterly report required by the SEC for public companies",
    category: "SEC Filings",
    icon: FileText,
  },
  {
    id: "8-k",
    name: "8-K Current Report",
    description: "Report of unscheduled material events or corporate changes",
    category: "SEC Filings",
    icon: FileText,
  },
]

const companies = [
  {
    value: "acme",
    label: "Acme Corporation",
  },
  {
    value: "globex",
    label: "Globex Industries",
  },
  {
    value: "initech",
    label: "Initech Technologies",
  },
  {
    value: "umbrella",
    label: "Umbrella Corp",
  },
  {
    value: "stark",
    label: "Stark Industries",
  },
]

interface DocumentCreationWizardProps {
  children: React.ReactNode
}

export function DocumentCreationWizard({ children }: DocumentCreationWizardProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState("featured")
  const [formData, setFormData] = useState({
    documentType: "10-k",
    company: "",
    fiscalYear: new Date().getFullYear().toString(),
    template: "standard",
  })

  const [openCompanySelect, setOpenCompanySelect] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // In a real app, this would create the document and redirect
      setOpen(false)
      setStep(1)
      router.push("/documents/10-k/1")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleCompanySelect = (value: string) => {
    setFormData({ ...formData, company: value })
    setOpenCompanySelect(false)
  }

  const handleDocumentTypeSelect = (docType: string) => {
    setFormData({ ...formData, documentType: docType })
  }

  const selectedDocType = documentTypes.find((doc) => doc.id === formData.documentType)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <DialogDescription>
            {step === 1 && "Select the type of document you want to create."}
            {step === 2 && "Select a company and provide basic information."}
            {step === 3 && "Choose a template for your document."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? "bg-navy-900 text-white" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <div className={`h-1 w-10 ${step > 1 ? "bg-navy-900" : "bg-muted"}`}></div>
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? "bg-navy-900 text-white" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <div className={`h-1 w-10 ${step > 2 ? "bg-navy-900" : "bg-muted"}`}></div>
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? "bg-navy-900 text-white" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="grid gap-4 py-4">
            <Tabs defaultValue="featured" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="sec">SEC Filings</TabsTrigger>
              </TabsList>

              <TabsContent value="featured" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentTypes
                    .filter((doc) => doc.featured)
                    .map((docType) => (
                      <Card
                        key={docType.id}
                        className={cn(
                          "cursor-pointer transition-all hover:border-navy-500",
                          formData.documentType === docType.id
                            ? "border-2 border-navy-500 shadow-sm"
                            : "border border-border",
                        )}
                        onClick={() => handleDocumentTypeSelect(docType.id)}
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-navy-100 p-1.5">
                              <docType.icon className="h-4 w-4 text-navy-800" />
                            </div>
                            <CardTitle className="text-sm font-medium">{docType.name}</CardTitle>
                          </div>
                          {docType.featured && <Star className="h-4 w-4 text-amber-500" />}
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{docType.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    Recommended document types based on your usage. View all document types in the categories above.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="sec" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentTypes
                    .filter((doc) => doc.category === "SEC Filings")
                    .map((docType) => (
                      <Card
                        key={docType.id}
                        className={cn(
                          "cursor-pointer transition-all hover:border-navy-500",
                          formData.documentType === docType.id
                            ? "border-2 border-navy-500 shadow-sm"
                            : "border border-border",
                        )}
                        onClick={() => handleDocumentTypeSelect(docType.id)}
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div className="flex items-center space-x-2">
                            <div className="rounded-full bg-navy-100 p-1.5">
                              <docType.icon className="h-4 w-4 text-navy-800" />
                            </div>
                            <CardTitle className="text-sm font-medium">{docType.name}</CardTitle>
                          </div>
                          {docType.featured && <Star className="h-4 w-4 text-amber-500" />}
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">{docType.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

            </Tabs>

            {selectedDocType && (
              <div className="mt-4 p-4 bg-navy-50 rounded-md">
                <div className="flex items-center gap-2">
                  <selectedDocType.icon className="h-5 w-5 text-navy-800" />
                  <h3 className="font-medium">{selectedDocType.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{selectedDocType.description}</p>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Popover open={openCompanySelect} onOpenChange={setOpenCompanySelect}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCompanySelect}
                    className="justify-between"
                  >
                    {formData.company
                      ? companies.find((company) => company.value === formData.company)?.label
                      : "Select company..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search company..." />
                    <CommandList>
                      <CommandEmpty>No company found.</CommandEmpty>
                      <CommandGroup>
                        {companies.map((company) => (
                          <CommandItem key={company.value} value={company.value} onSelect={handleCompanySelect}>
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.company === company.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {company.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {formData.documentType === "10-k" && (
              <div className="grid gap-2">
                <Label htmlFor="fiscalYear">Fiscal Year</Label>
                <Input
                  id="fiscalYear"
                  value={formData.fiscalYear}
                  onChange={(e) => setFormData({ ...formData, fiscalYear: e.target.value })}
                />
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Template</Label>
              <RadioGroup
                defaultValue={formData.template}
                onValueChange={(value) => setFormData({ ...formData, template: value })}
              >
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1 cursor-pointer">
                    <div className="font-medium">Standard Template</div>
                    <div className="text-sm text-muted-foreground">
                      Basic template with all required sections for {selectedDocType?.name}
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="detailed" id="detailed" />
                  <Label htmlFor="detailed" className="flex-1 cursor-pointer">
                    <div className="font-medium">Detailed Template</div>
                    <div className="text-sm text-muted-foreground">Comprehensive template with additional guidance</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="previous" id="previous" />
                  <Label htmlFor="previous" className="flex-1 cursor-pointer">
                    <div className="font-medium">Based on Previous Document</div>
                    <div className="text-sm text-muted-foreground">Use your previous document as a template</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label>Initial Information</Label>
              <div className="text-sm text-muted-foreground mb-2">
                The AI assistant will help you gather additional information during the document creation process.
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={(step === 1 && !formData.documentType) || (step === 2 && !formData.company)}
            className="bg-navy-900 hover:bg-navy-800"
          >
            {step < 3 ? "Next" : "Create Document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
