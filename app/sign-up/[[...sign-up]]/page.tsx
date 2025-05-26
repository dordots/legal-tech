import { SignUp } from "@clerk/nextjs"
import { SrfcbLogo } from "@/components/srfcb-logo"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <SrfcbLogo className="h-12 w-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join SRFCB AI</h2>
          <p className="text-gray-600">Start automating your legal documents today</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <SignUp
            redirectUrl="/"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                formButtonPrimary: "bg-[#1e3a8a] hover:bg-[#1e40af] text-white",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
                formFieldInput: "border-gray-300 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]",
                footerActionLink: "text-[#1e3a8a] hover:text-[#1e40af]",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
