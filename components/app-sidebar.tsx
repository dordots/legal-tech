"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  Building2,
  FileText,
  Settings,
  ChevronDown,
  User2,
  FileCheck,
  FileSpreadsheet,
  FileSignature,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DocumentTypeSelector } from "@/components/document-type-selector"
import { SRFCBLogo } from "@/components/srfcb-logo"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export function AppSidebar() {
  const pathname = usePathname()
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    secFilings: true,
    contracts: false,
    compliance: false,
    legal: false,
    corporate: false,
  })

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-navy-700/20">
        <div className="flex items-center gap-2 px-2 py-4">
          <SRFCBLogo />
        </div>
        <DocumentTypeSelector />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Dashboard">
                  <Link href="/">
                    <BarChart3 />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/companies"} tooltip="Companies">
                  <Link href="/companies">
                    <Building2 />
                    <span>Companies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Document Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* SEC Filings */}
              <SidebarMenuItem>
                <Collapsible open={openCategories.secFilings} onOpenChange={() => toggleCategory("secFilings")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="SEC Filings">
                      <FileText />
                      <span>SEC Filings</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${openCategories.secFilings ? "rotate-180" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 space-y-1 pt-1">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/10-k"}
                      className="h-8"
                      tooltip="10-K Annual Reports"
                    >
                      <Link href="/documents/10-k">
                        <span className="text-sm">10-K Annual Reports</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/10-q"}
                      className="h-8"
                      tooltip="10-Q Quarterly Reports"
                    >
                      <Link href="/documents/10-q">
                        <span className="text-sm">10-Q Quarterly Reports</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/8-k"}
                      className="h-8"
                      tooltip="8-K Current Reports"
                    >
                      <Link href="/documents/8-k">
                        <span className="text-sm">8-K Current Reports</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Contracts */}
              <SidebarMenuItem>
                <Collapsible open={openCategories.contracts} onOpenChange={() => toggleCategory("contracts")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Contracts">
                      <FileSignature />
                      <span>Contracts</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${openCategories.contracts ? "rotate-180" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 space-y-1 pt-1">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/contracts/nda"}
                      className="h-8"
                      tooltip="NDAs"
                    >
                      <Link href="/documents/contracts/nda">
                        <span className="text-sm">NDAs</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/contracts/employment"}
                      className="h-8"
                      tooltip="Employment"
                    >
                      <Link href="/documents/contracts/employment">
                        <span className="text-sm">Employment</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Compliance Documents */}
              <SidebarMenuItem>
                <Collapsible open={openCategories.compliance} onOpenChange={() => toggleCategory("compliance")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Compliance">
                      <FileCheck />
                      <span>Compliance</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${openCategories.compliance ? "rotate-180" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 space-y-1 pt-1">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/compliance/policies"}
                      className="h-8"
                      tooltip="Policies"
                    >
                      <Link href="/documents/compliance/policies">
                        <span className="text-sm">Policies</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/compliance/procedures"}
                      className="h-8"
                      tooltip="Procedures"
                    >
                      <Link href="/documents/compliance/procedures">
                        <span className="text-sm">Procedures</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Legal Memoranda */}
              <SidebarMenuItem>
                <Collapsible open={openCategories.legal} onOpenChange={() => toggleCategory("legal")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Legal Memoranda">
                      <FileSpreadsheet />
                      <span>Legal Memoranda</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${openCategories.legal ? "rotate-180" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 space-y-1 pt-1">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/legal/internal"}
                      className="h-8"
                      tooltip="Internal Memos"
                    >
                      <Link href="/documents/legal/internal">
                        <span className="text-sm">Internal Memos</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/legal/client"}
                      className="h-8"
                      tooltip="Client Memos"
                    >
                      <Link href="/documents/legal/client">
                        <span className="text-sm">Client Memos</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>

              {/* Corporate Governance */}
              <SidebarMenuItem>
                <Collapsible open={openCategories.corporate} onOpenChange={() => toggleCategory("corporate")}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Corporate Governance">
                      <Users />
                      <span>Corporate Governance</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform ${openCategories.corporate ? "rotate-180" : ""}`}
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-8 space-y-1 pt-1">
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/corporate/bylaws"}
                      className="h-8"
                      tooltip="Bylaws"
                    >
                      <Link href="/documents/corporate/bylaws">
                        <span className="text-sm">Bylaws</span>
                      </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === "/documents/corporate/minutes"}
                      className="h-8"
                      tooltip="Board Minutes"
                    >
                      <Link href="/documents/corporate/minutes">
                        <span className="text-sm">Board Minutes</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip="Settings">
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-navy-700/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <User2 className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarTrigger className="absolute right-4 top-4 md:hidden" />
    </Sidebar>
  )
}
