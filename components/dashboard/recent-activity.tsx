import { Activity, FileText, MessageSquare, User, FileSignature, FileCheck, FileSpreadsheet, Users } from "lucide-react"

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="rounded-full bg-muted p-2">
            {activity.type === "edit" && <FileText className="h-4 w-4" />}
            {activity.type === "comment" && <MessageSquare className="h-4 w-4" />}
            {activity.type === "ai" && <Activity className="h-4 w-4" />}
            {activity.type === "user" && <User className="h-4 w-4" />}
            {activity.type === "contract" && <FileSignature className="h-4 w-4" />}
            {activity.type === "compliance" && <FileCheck className="h-4 w-4" />}
            {activity.type === "memo" && <FileSpreadsheet className="h-4 w-4" />}
            {activity.type === "corporate" && <Users className="h-4 w-4" />}
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const activities = [
  {
    type: "edit",
    title: "10-K Form Updated",
    description: "Acme Corporation 10-K Item 1A updated",
    time: "10 minutes ago",
  },
  {
    type: "ai",
    title: "AI Generated Content",
    description: "AI completed draft of Risk Factors section",
    time: "1 hour ago",
  },
  {
    type: "contract",
    title: "NDA Created",
    description: "New NDA created for Umbrella Corp",
    time: "2 hours ago",
  },
  {
    type: "comment",
    title: "New Comment",
    description: "Sarah left a comment on Item 7",
    time: "3 hours ago",
  },
  {
    type: "corporate",
    title: "Bylaws Updated",
    description: "Wayne Enterprises corporate bylaws updated",
    time: "4 hours ago",
  },
  {
    type: "user",
    title: "User Action",
    description: "John approved Item 1 Business section",
    time: "Yesterday at 4:30 PM",
  },
]
