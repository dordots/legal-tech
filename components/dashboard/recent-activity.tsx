import { Activity, FileText, MessageSquare, User } from "lucide-react"

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
    title: "Form Updated",
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
    type: "comment",
    title: "New Comment",
    description: "Sarah left a comment on Item 7",
    time: "2 hours ago",
  },
  {
    type: "user",
    title: "User Action",
    description: "John approved Item 1 Business section",
    time: "3 hours ago",
  },
  {
    type: "edit",
    title: "Form Created",
    description: "New 10-K filing created for Globex Industries",
    time: "Yesterday at 4:30 PM",
  },
]
