"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

const industries = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "manufacturing", label: "Manufacturing" },
]

interface AddCompanyDialogProps {
  children: React.ReactNode
}

export function AddCompanyDialog({ children }: AddCompanyDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [openIndustry, setOpenIndustry] = useState(false)
  const [form, setForm] = useState({
    name: "",
    ticker: "",
    industry: "",
    description: "",
    contact: "",
    email: "",
  })

  const next = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // in real app submit
      setOpen(false)
      setStep(1)
      setForm({ name: "", ticker: "", industry: "", description: "", contact: "", email: "" })
    }
  }

  const back = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Company</DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter basic company information."}
            {step === 2 && "Add industry and description."}
            {step === 3 && "Provide contact details."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? "bg-navy-900 text-white" : "bg-muted text-muted-foreground"}`}>1</div>
            <div className={`h-1 w-10 ${step > 1 ? "bg-navy-900" : "bg-muted"}`}></div>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? "bg-navy-900 text-white" : "bg-muted text-muted-foreground"}`}>2</div>
            <div className={`h-1 w-10 ${step > 2 ? "bg-navy-900" : "bg-muted"}`}></div>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? "bg-navy-900 text-white" : "bg-muted text-muted-foreground"}`}>3</div>
          </div>
        </div>
        {step === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ticker">Ticker Symbol</Label>
              <Input
                id="ticker"
                value={form.ticker}
                onChange={(e) => setForm({ ...form, ticker: e.target.value })}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Industry/Sector</Label>
              <Popover open={openIndustry} onOpenChange={setOpenIndustry}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={openIndustry} className="justify-between">
                    {form.industry ? industries.find((i) => i.value === form.industry)?.label : "Select industry..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search industry..." />
                    <CommandList>
                      <CommandEmpty>No industry found.</CommandEmpty>
                      <CommandGroup>
                        {industries.map((ind) => (
                          <CommandItem key={ind.value} value={ind.value} onSelect={(v) => { setForm({ ...form, industry: v }); setOpenIndustry(false) }}>
                            <Check className={cn("mr-2 h-4 w-4", form.industry === ind.value ? "opacity-100" : "opacity-0")}/>
                            {ind.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="contact">Primary Contact</Label>
              <Input id="contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
        )}
        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={back}>Back</Button>
          )}
          <Button
            onClick={next}
            disabled={step === 1 && !form.name}
            className="bg-navy-900 hover:bg-navy-800"
          >
            {step < 3 ? "Next" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
