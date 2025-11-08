"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, Tooltip, Bar, BarChart } from "recharts"
import { TrendingUp, Users, Clock, Target, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
  requirements: string[]
  postedDate: string
  status: string
}

interface Candidate {
  score: number
  id: string
  name: string
  email: string
  phone: string
  jobId: string
  status: string
  appliedDate: string
  source?: string
  resumeUrl?: string
  notes?: string
  position?: string // Added the 'position' property
}

export default function AnalyticsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [hiringFunnelData, setHiringFunnelData] = useState<any[]>([])
  const [timeToHireData, setTimeToHireData] = useState<any[]>([])
  const [sourceData, setSourceData] = useState<any[]>([])
  const [positionData, setPositionData] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any[]>([])

  // Function to load data from localStorage
  // NEW STATE
  const [lineChartData, setLineChartData] = useState<any[]>([])

  const loadDataFromStorage = () => {
    try {
      const storedJobs = localStorage.getItem("jobs")
      const storedCandidates = localStorage.getItem("candidates")

      const jobsData = storedJobs ? JSON.parse(storedJobs) : []
      const candidatesData = storedCandidates ? JSON.parse(storedCandidates) : []

      setJobs(jobsData)
      setCandidates(candidatesData)

      processLineChartData(candidatesData)
      processQualifiedCandidatesByRole(candidatesData)
      processApplicationsPerJob(candidatesData)
      processPositionData(jobsData, candidatesData)
      processMetrics(candidatesData)
    } catch (error) {
      console.error("Error loading data from localStorage:", error)
    }
  }

  const processLineChartData = (candidatesData: Candidate[]) => {
    const stages = [
      "Applications",
      "Phone Interview",
      "Technical Interview",
      "Final Interview",
      "Offers",
      "Hired",
    ]

    const roles = ["Frontend", "Backend", "Design", "Data Science", "Product Manager"]

    const mapToKnownRole = (position: string): string => {
      const pos = position.toLowerCase()
      if (pos.includes("frontend")) return "Frontend"
      if (pos.includes("backend")) return "Backend"
      if (pos.includes("design")) return "Design"
      if (pos.includes("data")) return "Data Science"
      if (pos.includes("product manager")) return "Product Manager"
      return "Other"
    }

    const stageCounts: Record<string, Record<string, number>> = {}

    for (const stage of stages) {
      stageCounts[stage] = {}
      for (const role of roles) {
        stageCounts[stage][role] = 0
      }
    }

    for (const candidate of candidatesData) {
      const stage = getStageFromStatus(candidate.status)
      const role = mapToKnownRole(candidate.position || "")
      if (roles.includes(role) && stages.includes(stage)) {
        stageCounts[stage][role] += 1
      }
    }

    const structuredData = stages.map((stage) => {
      const entry: any = { stage }
      for (const role of roles) {
        entry[role] = stageCounts[stage][role]
      }
      return entry
    })

    setLineChartData(structuredData)
  }

  const getStageFromStatus = (status: string): string => {
    const normalized = status.toLowerCase()
    if (normalized.includes("hired")) return "Hired"
    if (normalized.includes("offer")) return "Offers"
    if (normalized.includes("final")) return "Final Interview"
    if (normalized.includes("technical")) return "Technical Interview"
    if (normalized.includes("phone")) return "Phone Interview"
    return "Applications"
  }

  // Process time to hire data

  const processQualifiedCandidatesByRole = (candidatesData: Candidate[]) => {
    const sampleCandidates: Candidate[] = [
      {
        name: "Alice", position: "Frontend Developer", score: 85,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
      {
        name: "Bob", position: "Backend Developer", score: 72,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
      {
        name: "Charlie", position: "Frontend Developer", score: 58,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
      {
        name: "Diana", position: "Data Scientist", score: 91,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
      {
        name: "Evan", position: "Backend Developer", score: 64,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
      {
        name: "Fiona", position: "Frontend Developer", score: 76,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
      {
        name: "George", position: "Data Scientist", score: 45,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
      {
        name: "Hannah", position: "Product Manager", score: 67,
        id: "",
        email: "",
        phone: "",
        jobId: "",
        status: "",
        appliedDate: ""
      },
    ]

    const roleData: { [role: string]: number } = {}

    sampleCandidates.forEach((candidate) => {
      if (candidate.score > 60 && candidate.position) {
        const role = candidate.position
        roleData[role] = (roleData[role] || 0) + 1
      }
    })

    const barData = Object.entries(roleData).map(([role, count]) => ({
      role,
      count,
    }))

    setTimeToHireData(barData) // reuse the same state name
  }



  // Process applicationperjob  data
  const processApplicationsPerJob = (candidatesData: Candidate[]) => {
    const validJobRoles = [
      "Frontend Developer",
      "Backend Engineer",
      "UX Designer",
      "Data Scientist",
      "Product Manager",
    ]

    const jobCounts: { [position: string]: number } = {}

    candidatesData.forEach((candidate) => {
      const position = candidate.position || "Unknown"
      if (validJobRoles.includes(position)) {
        jobCounts[position] = (jobCounts[position] || 0) + 1
      }
    })

    const totalJobs = validJobRoles.length

    const sourceData = validJobRoles.map((role, index) => ({
      name: role,
      value: totalJobs > 0 ? Math.round((jobCounts[role] || 0) / totalJobs * 100) : 0,
      color: ["#0077B5", "#2557A7", "#10B981", "#F59E0B", "#6B7280"][index],
    }))

    setSourceData(sourceData)
  }

  const COLORS = [
    "#8884d8", // purple
    "#82ca9d", // green
    "#ffc658", // yellow
    "#ff7f50", // coral
    "#8dd1e1", // light blue
    "#a4de6c", // lime
    "#d0ed57", // light yellow
    "#f66d9b", // pink
  ]
  

  // Process position performance data
  const processPositionData = (jobsData: Job[], candidatesData: Candidate[]) => {
    const positionStats: { [key: string]: { applications: number; hired: number } } = {}

    jobsData.forEach((job) => {
      const jobCandidates = candidatesData.filter((c) => c.jobId === job.id)
      const hiredCount = jobCandidates.filter((c) => c.status === "hired").length

      positionStats[job.title] = {
        applications: jobCandidates.length,
        hired: hiredCount,
      }
    })

    const positionChartData = Object.entries(positionStats)
      .filter(([_, stats]) => stats.applications > 0)
      .map(([position, stats]) => ({
        position,
        applications: stats.applications,
        hired: stats.hired,
      }))
      .sort((a, b) => b.applications - a.applications)
      .slice(0, 5) // Top 5 positions

    // Add default data if no positions
    if (positionChartData.length === 0) {
      setPositionData([
        { position: "Frontend Dev", applications: 45, hired: 2 },
        { position: "Backend Dev", applications: 38, hired: 2 },
        { position: "Data Scientist", applications: 32, hired: 0 },
        { position: "Designer", applications: 28, hired: 1 },
        { position: "Product Manager", applications: 22, hired: 1 },
      ])
    } else {
      setPositionData(positionChartData)
    }
  }

  // Process metrics data
  const processMetrics = (candidatesData: Candidate[]) => {
    const totalApplications = candidatesData.length
    const hiredCount = candidatesData.filter((c) => c.status === "hired").length
    const interviewCount = candidatesData.filter((c) =>
      ["phone_interview", "technical_interview", "final_interview"].includes(c.status),
    ).length

    const avgTimeToHire = 26 // Simplified calculation
    const successRate = totalApplications > 0 ? Math.round((hiredCount / totalApplications) * 100) : 0

    setMetrics([
      {
        title: "Total Applications",
        value: totalApplications.toString(),
        change: "+18%",
        icon: Users,
        description: "This month",
      },
      {
        title: "Average Time to Hire",
        value: `${avgTimeToHire} days`,
        change: "-4 days",
        icon: Clock,
        description: "vs last month",
      },
      {
        title: "Interview Success Rate",
        value: `${successRate}%`,
        change: "+12%",
        icon: Target,
        description: "Offer acceptance",
      },
      {
        title: "Active Interviews",
        value: interviewCount.toString(),
        change: "+5",
        icon: Calendar,
        description: "This week",
      },
    ])
  }

  // Load data on component mount and set up real-time updates
  useEffect(() => {
    loadDataFromStorage()

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "jobs" || e.key === "candidates") {
        loadDataFromStorage()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadDataFromStorage, 5000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hiring Analytics</h1>
          <p className="text-muted-foreground">Real-time insights into your recruitment performance</p>
        </div>
      </div>



      <div className="grid gap-6 md:grid-cols-2">
        {/* Hiring Funnel - Now as Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel Progress</CardTitle>
            <CardDescription>Candidate progression through hiring stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Candidates",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Frontend" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="Backend" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="Design" stroke="#f59e0b" strokeWidth={2} />
                  <Line type="monotone" dataKey="Data Science" stroke="#6366f1" strokeWidth={2} />
                  <Line type="monotone" dataKey="Product Manager" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>

            </ChartContainer>
          </CardContent>
        </Card>

        {/* Time to Hire Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Qualified Candidates by AI</CardTitle>
            <CardDescription>Candidates qualified on basis of AI Resume Analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Qualified Candidates",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-80"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeToHireData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="role" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" barSize={40} radius={[4, 4, 0, 0]}>
                    {timeToHireData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>

              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>


        {/* Application Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Majority Jobs</CardTitle>
            <CardDescription>Where candidates are more interested</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ChartContainer
                config={{
                  value: {
                    label: "Applications",
                  },
                }}
                className="h-64 w-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="mt-4 space-y-2">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Position Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Position Performance</CardTitle>
            <CardDescription>Applications vs successful hires by position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positionData.map((position) => (
                <div key={position.position} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{position.position}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{position.hired} hired</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${position.applications > 0 ? (position.hired / position.applications) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {position.applications > 0 ? ((position.hired / position.applications) * 100).toFixed(1) : 0}%
                    success rate
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>AI-Powered Insights</span>
          </CardTitle>
          <CardDescription>Automated analysis and recommendations based on your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">Data-Driven Insight</h4>
              <p className="text-sm text-muted-foreground">
                {candidates.length > 0
                  ? `You have ${candidates.length} total applications. Your hiring funnel shows ${hiringFunnelData.find((d) => d.stage === "Hired")?.count || 0} successful hires.`
                  : "Start adding candidates to see personalized insights about your hiring performance."}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">Source Performance</h4>
              <p className="text-sm text-muted-foreground">
                {sourceData.length > 0
                  ? `${sourceData[0]?.name || "Top source"} is your leading application source with ${sourceData[0]?.value || 0}% of applications.`
                  : "Add candidate sources to track which channels bring the best talent."}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-orange-600 mb-2">Position Insights</h4>
              <p className="text-sm text-muted-foreground">
                {jobs.length > 0
                  ? `You have ${jobs.length} active job positions. ${positionData.length > 0 ? `${positionData[0]?.position} has the most applications.` : "Start receiving applications to see position performance."}`
                  : "Create job postings to start tracking position-specific metrics."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
