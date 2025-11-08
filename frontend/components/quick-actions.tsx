"use client"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Plus, Calendar, MessageSquare, BarChart3, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

const actions = [
  {
    title: "Review Resumes",
    description: "Analyze existing candidate resumes with AI",
    icon: FileText,
    href: "/candidates",
    color: "bg-blue-500",
  },
  {
    title: "Create Job Post",
    description: "Post new position with AI-generated requirements",
    icon: Plus,
    href: "/jobs/create",
    color: "bg-green-500",
  },
  // {
  //   title: "Schedule Interview",
  //   description: "Book interviews with automated coordination",
  //   icon: Calendar,
  //   href: "/interviews/schedule",
  //   color: "bg-purple-500",
  // },
  {
    title: "Send Messages",
    description: "Communicate with candidates using AI templates",
    icon: MessageSquare,
    href: "/communication",
    color: "bg-orange-500",
  },
  {
    title: "View Analytics",
    description: "Get insights on hiring performance",
    icon: BarChart3,
    href: "/analytics",
    color: "bg-pink-500",
  },
  // {
  //   title: "Settings",
  //   description: "Configure AI models and preferences",
  //   icon: Settings,
  //   href: "/settings",
  //   color: "bg-gray-500",
  // },
]
export function QuickActions() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
      {actions.map((action) => (
        <Card
          key={action.title}
          className="cursor-pointer hover:shadow-md transition-shadow h-48"
          onClick={() => router.push(action.href)}
        >
          <CardContent className="p-6 h-full flex flex-col justify-center items-center text-center space-y-4">
            <div className={`p-4 rounded-full ${action.color} text-white`}>
              <action.icon className="h-7 w-7" />
            </div>
            <h3 className="font-semibold text-base">{action.title}</h3>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
