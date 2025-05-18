"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"

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

interface FormCreationWizardProps {
  children: React.ReactNode
}

export function FormCreationWizard({ children }: FormCreationWizardProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    company: "",
    fiscalYear: new Date().getFullYear().toString(),
    template: "standard",
  })

  const [openCompanySelect, setOpenCompanySelect] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // In a real app, this would create the form and redirect
      setOpen(false)
      setStep(1)
      router.push("/forms/1")
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New 10-K Filing</DialogTitle>
          <DialogDescription>
            {step === 1 && "Select a company for this filing."}
            {step === 2 && "Choose a template for your filing."}
            {step === 3 && "Provide initial information for your filing."}
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
          </div>
        )}

        {step === 2 && (
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
                    <div className="text-sm text-muted-foreground">Basic 10-K template with all required sections</div>
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
                    <div className="font-medium">Based on Previous Filing</div>
                    <div className="text-sm text-muted-foreground">Use your previous year's filing as a template</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fiscalYear">Fiscal Year</Label>
              <Input
                id="fiscalYear"
                value={formData.fiscalYear}
                onChange={(e) => setFormData({ ...formData, fiscalYear: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Initial Information</Label>
              <div className="text-sm text-muted-foreground mb-2">
                The AI assistant will help you gather additional information during the filing process.
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
            disabled={step === 1 && !formData.company}
            className="bg-navy-900 hover:bg-navy-800"
          >
            {step < 3 ? "Next" : "Create Filing"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
