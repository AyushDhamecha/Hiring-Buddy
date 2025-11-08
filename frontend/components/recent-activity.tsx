import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    type: "resume_uploaded",
    candidate: "Sarah Johnson",
    position: "Senior Frontend Developer",
    time: "2 hours ago",
    score: 92,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    type: "interview_scheduled",
    candidate: "Michael Chen",
    position: "Data Scientist",
    time: "4 hours ago",
    score: 88,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    type: "message_sent",
    candidate: "Emily Rodriguez",
    position: "UX Designer",
    time: "6 hours ago",
    score: 85,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    type: "candidate_scored",
    candidate: "David Kim",
    position: "Backend Engineer",
    time: "1 day ago",
    score: 79,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "resume_uploaded":
      return "📄"
    case "interview_scheduled":
      return "📅"
    case "message_sent":
      return "💬"
    case "candidate_scored":
      return "⭐"
    default:
      return "📋"
  }
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-green-500"
  if (score >= 80) return "bg-blue-500"
  if (score >= 70) return "bg-yellow-500"
  return "bg-red-500"
}

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.candidate} />
            <AvatarFallback>
              {activity.candidate
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center space-x-2">
              {/* <span className="text-lg">{getActivityIcon(activity.type)}</span> */}
              <p className="text-sm font-medium leading-none">{activity.candidate}</p>
              {/* <Badge className={`text-white text-xs ${getScoreColor(activity.score)}`}>{activity.score}%</Badge> */}
            </div>
            <p className="text-sm text-muted-foreground">
              {activity.position} • {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
