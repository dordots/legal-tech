"use client"

import type React from "react"

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">SRFCB AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </a>
              <a href="/documents" className="text-gray-700 hover:text-gray-900">
                Documents
              </a>
              <a href="/companies" className="text-gray-700 hover:text-gray-900">
                Companies
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
