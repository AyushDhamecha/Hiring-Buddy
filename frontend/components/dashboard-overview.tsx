import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Calendar, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Active Candidates",
    value: "12",
    change: "+4%",
    icon: Users,
    description: "from last month",
  },
  {
    title: "Open Positions",
    value: "5",
    change: "+2%",
    icon: FileText,
    description: "new this week",
  },
  {
    title: "Interviews Scheduled",
    value: "6",
    change: "+1.5%",
    icon: Calendar,
    description: "this week",
  },
  {
    title: "Hire Rate",
    value: "8%",
    change: "+2%",
    icon: TrendingUp,
    description: "improvement",
  },
]

export function DashboardOverview() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
