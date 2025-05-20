"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const documentTypes = [
  {
    value: "10-k",
    label: "10-K Annual Report",
    category: "SEC Filings",
  },
  {
    value: "10-q",
    label: "10-Q Quarterly Report",
    category: "SEC Filings",
  },
  {
    value: "8-k",
    label: "8-K Current Report",
    category: "SEC Filings",
  },
  {
    value: "nda",
    label: "Non-Disclosure Agreement",
    category: "Contracts",
  },
  {
    value: "employment",
    label: "Employment Contract",
    category: "Contracts",
  },
  {
    value: "policy",
    label: "Company Policy",
    category: "Compliance",
  },
  {
    value: "memo",
    label: "Legal Memorandum",
    category: "Legal Memoranda",
  },
  {
    value: "bylaws",
    label: "Corporate Bylaws",
    category: "Corporate Governance",
  },
]

export function DocumentTypeSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("10-k")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? documentTypes.find((doc) => doc.value === value)?.label : "Select document type..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search document types..." />
          <CommandList>
            <CommandEmpty>No document type found.</CommandEmpty>
            <CommandGroup heading="SEC Filings">
              {documentTypes
                .filter((doc) => doc.category === "SEC Filings")
                .map((doc) => (
                  <CommandItem
                    key={doc.value}
                    value={doc.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === doc.value ? "opacity-100" : "opacity-0")} />
                    {doc.label}
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Contracts">
              {documentTypes
                .filter((doc) => doc.category === "Contracts")
                .map((doc) => (
                  <CommandItem
                    key={doc.value}
                    value={doc.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === doc.value ? "opacity-100" : "opacity-0")} />
                    {doc.label}
                  </CommandItem>
                ))}
            </CommandGroup>
            <CommandGroup heading="Other Document Types">
              {documentTypes
                .filter((doc) => !["SEC Filings", "Contracts"].includes(doc.category))
                .map((doc) => (
                  <CommandItem
                    key={doc.value}
                    value={doc.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === doc.value ? "opacity-100" : "opacity-0")} />
                    {doc.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
