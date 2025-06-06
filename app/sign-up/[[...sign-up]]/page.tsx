import { SignUp } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SrfcbLogo } from "@/components/srfcb-logo"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <SrfcbLogo className="h-12 w-auto" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Get Started</h1>
            <p className="text-slate-600">Create your SRFCB AI account</p>
          </div>
        </div>

        {/* Sign Up Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Join the future of legal document automation</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex justify-center">
              <SignUp
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-slate-900 hover:bg-slate-800 text-sm normal-case",
                    card: "shadow-none border-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 text-slate-700",
                    formFieldInput: "border-slate-200 focus:border-slate-400 focus:ring-slate-400",
                    footerActionLink: "text-slate-600 hover:text-slate-900",
                  },
                }}
                redirectUrl="/"
                signInUrl="/sign-in"
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500">
          <p>
            Already have an account?{" "}
            <a href="/sign-in" className="text-slate-900 hover:underline font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
