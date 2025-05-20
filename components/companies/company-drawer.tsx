"use client"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Company } from "./company-card"

interface CompanyDrawerProps {
  company: Company
  children: React.ReactNode
}

export function CompanyDrawer({ company, children }: CompanyDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-6 space-y-4">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold">{company.name}</DrawerTitle>
          <DrawerDescription>{company.industry}</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Ticker:</span> {company.ticker}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Market Cap:</span> {company.marketCap}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Active Filings:</span> {company.filings}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Status:</span>
            <Badge
              className={
                company.status === "up-to-date"
                  ? "bg-green-500"
                  : company.status === "in-progress"
                    ? "bg-yellow-500"
                    : company.status === "overdue"
                      ? "bg-red-500"
                      : "bg-gray-400"
              }
            />
          </div>
        </div>
        <Button size="sm" className="bg-navy-900 hover:bg-navy-800 w-full">Initiate Filing</Button>
      </DrawerContent>
    </Drawer>
  )
}
