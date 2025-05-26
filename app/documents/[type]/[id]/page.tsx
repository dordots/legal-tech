"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AuthenticatedLayout } from "@/components/authenticated-layout"
import { AdvancedEditor } from "@/components/editor/advanced-editor"

interface DocumentPageProps {
  params: {
    type: string
    id: string
  }
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <AuthenticatedLayout>
      <AdvancedEditor documentType={params.type} documentId={params.id} />
    </AuthenticatedLayout>
  )
}
