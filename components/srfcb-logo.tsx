import { FileText } from "lucide-react"

interface SRFCBLogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "full" | "icon"
}

export function SRFCBLogo({ size = "md", variant = "full" }: SRFCBLogoProps) {
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`flex ${iconSizes[size]} items-center justify-center rounded-md bg-navy-900 text-white`}>
        <FileText className={size === "sm" ? "h-3 w-3" : size === "lg" ? "h-6 w-6" : "h-4 w-4"} />
      </div>
      {variant === "full" && (
        <div className="flex flex-col">
          <span className={`font-bold text-navy-900 ${textSizes[size]}`}>SRFCB AI</span>
          <span className={`text-muted-foreground ${size === "sm" ? "text-xs" : "text-xs"}`}>
            Legal Document Automation
          </span>
        </div>
      )}
    </div>
  )
}
