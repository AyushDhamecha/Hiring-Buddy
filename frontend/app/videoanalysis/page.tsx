"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  MessageSquare,
  Calendar,
  Eye,
  FileText,
  Brain,
  Download,
  Video,
  Folder,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoPlayer } from "@/components/video-player"
import { VideoAnalysis } from "@/components/video-analysis"

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    position: "Senior Frontend Developer",
    score: 92,
    status: "Interview Scheduled",
    skills: ["React", "TypeScript", "Next.js"],
    experience: "5+ years",
    appliedDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    hasResume: true,
    resumeAnalyzed: true,
    analysis: {
      score: 92,
      skills: ["React", "TypeScript", "Next.js", "Node.js", "AWS"],
      experience: "5+ years",
      education: "Computer Science, BS - Stanford University",
      strengths: [
        "Strong technical background in modern web technologies",
        "Proven leadership experience with 3+ years managing teams",
        "Excellent problem-solving skills demonstrated in previous roles",
        "Strong communication skills and stakeholder management",
      ],
      concerns: ["Limited experience with machine learning", "No mobile development background"],
      matchedPositions: [
        { title: "Senior Frontend Developer", match: 92 },
        { title: "Full Stack Engineer", match: 85 },
        { title: "Technical Lead", match: 78 },
      ],
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    position: "Data Scientist",
    score: 88,
    status: "Under Review",
    skills: ["Python", "ML", "TensorFlow"],
    experience: "4+ years",
    appliedDate: "2024-01-14",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    hasResume: true,
    resumeAnalyzed: true,
    analysis: {
      score: 88,
      skills: ["Python", "Machine Learning", "TensorFlow", "PyTorch", "SQL"],
      experience: "4+ years",
      education: "Data Science, MS - MIT",
      strengths: [
        "Strong mathematical and statistical background",
        "Experience with large-scale data processing",
        "Published research in machine learning conferences",
      ],
      concerns: ["Limited experience with cloud platforms", "No experience with real-time systems"],
      matchedPositions: [
        { title: "Data Scientist", match: 88 },
        { title: "ML Engineer", match: 82 },
        { title: "Research Scientist", match: 75 },
      ],
    },
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    position: "UX Designer",
    score: 85,
    status: "Phone Screen",
    skills: ["Figma", "Design Systems", "Research"],
    experience: "3+ years",
    appliedDate: "2024-01-13",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    position: "Backend Engineer",
    score: 79,
    status: "New",
    skills: ["Node.js", "PostgreSQL", "AWS"],
    experience: "6+ years",
    appliedDate: "2024-01-12",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    position: "Product Manager",
    score: 91,
    status: "Final Interview",
    skills: ["Strategy", "Analytics", "Agile"],
    experience: "7+ years",
    appliedDate: "2024-01-11",
    avatar: "/placeholder.svg?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    hasResume: true,
    resumeAnalyzed: true,
    analysis: {
      score: 91,
      skills: ["Product Strategy", "Data Analytics", "Agile", "Stakeholder Management", "A/B Testing"],
      experience: "7+ years",
      education: "MBA - Harvard Business School",
      strengths: [
        "Proven track record of successful product launches",
        "Strong analytical and data-driven decision making",
        "Excellent stakeholder management and communication skills",
      ],
      concerns: ["Limited technical background", "No experience with B2B products"],
      matchedPositions: [
        { title: "Product Manager", match: 91 },
        { title: "Senior Product Manager", match: 87 },
        { title: "Product Lead", match: 83 },
      ],
    },
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-500"
    case "Under Review":
      return "bg-yellow-500"
    case "Phone Screen":
      return "bg-purple-500"
    case "Interview Scheduled":
      return "bg-orange-500"
    case "Final Interview":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400"
  if (score >= 80) return "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400"
  if (score >= 70) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400"
  return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400"
}

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [analyzing, setAnalyzing] = useState<number | null>(null)
  const [analyzingVideo, setAnalyzingVideo] = useState<string | null>(null)
  const [candidateVideos, setCandidateVideos] = useState<any[]>([])
  const [videoAnalyses, setVideoAnalyses] = useState<{ [key: string]: any }>({})

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
    const matchesPosition = positionFilter === "all" || candidate.position === positionFilter

    return matchesSearch && matchesStatus && matchesPosition
  })

  const loadCandidateVideos = async (candidateId: number) => {
    try {
      const response = await fetch(`/api/get-candidate-videos?candidateId=${candidateId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch videos")
      }
      const data = await response.json()
      setCandidateVideos(data.videos || [])
    } catch (error) {
      console.error("Failed to load videos:", error)
      setCandidateVideos([])
    }
  }

  const analyzeResume = async (candidateId: number) => {
    setAnalyzing(candidateId)

    // Simulate AI analysis
    setTimeout(() => {
      const candidateIndex = candidates.findIndex((c) => c.id === candidateId)
      if (candidateIndex !== -1) {
        candidates[candidateIndex].resumeAnalyzed = true
        candidates[candidateIndex].analysis = {
          score: Math.floor(Math.random() * 20) + 75,
          skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
          experience: "4+ years",
          education: "Computer Science, BS",
          strengths: [
            "Strong technical background in modern technologies",
            "Proven problem-solving skills",
            "Excellent communication abilities",
          ],
          concerns: ["Limited experience with specific domain", "No leadership experience"],
          matchedPositions: [
            { title: "Software Engineer", match: 88 },
            { title: "Full Stack Developer", match: 82 },
            { title: "Frontend Developer", match: 79 },
          ],
        }
      }
      setAnalyzing(null)
    }, 3000)
  }

  const analyzeVideo = async (candidateId: number, videoFilename: string) => {
    const analysisKey = `${candidateId}-${videoFilename}`
    setAnalyzingVideo(analysisKey)

    try {
      const response = await fetch("/api/analyze-video/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidateId, videoFilename }),
      })

      const analysis = await response.json()
      setVideoAnalyses((prev) => ({
        ...prev,
        [analysisKey]: analysis,
      }))
    } catch (error) {
      console.error("Video analysis failed:", error)
    } finally {
      setAnalyzingVideo(null)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Introduction Videos</h1>
          <p className="text-muted-foreground">Streamline candidate video reviews with intelligent AI assistance</p>
        </div>
        
      </div>
<Card>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                <SelectItem value="Interview Scheduled">Interview Scheduled</SelectItem>
                <SelectItem value="Final Interview">Final Interview</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Senior Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                <SelectItem value="UX Designer">UX Designer</SelectItem>
                <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={candidate.avatar || "/placeholder.svg"} alt={candidate.name} />
                  <AvatarFallback>
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{candidate.name}</h3>
                    
                    
                    <Badge variant="outline" className="text-xs">
                      <Video className="h-3 w-3 mr-1" />
                      Videos Available
                    </Badge>
                    {candidate.resumeAnalyzed && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        <Brain className="h-3 w-3 mr-1" />
                        Resume Analyzed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{candidate.email}</p>
                  <p className="text-sm font-medium">{candidate.position}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`text-white ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {candidate.experience} • Applied {candidate.appliedDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCandidate(candidate)
                          loadCandidateVideos(candidate.id)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <span>{candidate.name}</span>
                          <Badge className={`${getScoreColor(candidate.score)} border-0`}>{candidate.score}%</Badge>
                        </DialogTitle>
                        <DialogDescription>
                          {candidate.position} • {candidate.email}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="videos" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="videos">Videos</TabsTrigger>
                         
                          <TabsTrigger value="video-analysis">Video Analysis</TabsTrigger>
                        </TabsList>

                        <TabsContent value="videos" className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Video Introductions</h3>
                            <Badge variant="outline">
                              {candidateVideos.length} video{candidateVideos.length !== 1 ? "s" : ""} found
                            </Badge>
                          </div>

                          {candidateVideos.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2">
                              {candidateVideos.map((video) => {
                                const analysisKey = `${candidate.id}-${video.filename}`
                                return (
                                  <VideoPlayer
                                    key={video.filename}
                                    videoUrl={video.url}
                                    videoName={video.name}
                                    candidateId={candidate.id}
                                    videoFilename={video.filename}
                                    onAnalyze={(filename) => analyzeVideo(candidate.id, filename)}
                                    isAnalyzing={analyzingVideo === analysisKey}
                                    hasAnalysis={!!videoAnalyses[analysisKey]}
                                  />
                                )
                              })}
                            </div>
                          ) : (
                            <div className="border-2 border-dashed rounded-lg p-8 text-center">
                              <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                              <p className="text-lg font-medium mb-2">No videos found</p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Place video files in:{" "}
                                <code className="bg-muted px-2 py-1 rounded">
                                  /public/videos/candidate-{candidate.id}/
                                </code>
                              </p>
                              <Button variant="outline" onClick={() => loadCandidateVideos(candidate.id)}>
                                Refresh Videos
                              </Button>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="resume" className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Resume Document</h3>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download PDF
                            </Button>
                          </div>
                          <div className="border rounded-lg p-4 bg-muted/20">
                            <img
                              src={candidate.resumeUrl || "/placeholder.svg?height=800&width=600"}
                              alt="Resume"
                              className="w-full h-auto max-h-96 object-contain rounded"
                            />
                          </div>
                        </TabsContent>

                     

                        <TabsContent value="video-analysis" className="space-y-4">
                          {Object.keys(videoAnalyses).filter((key) => key.startsWith(`${candidate.id}-`)).length > 0 ? (
                            <div className="space-y-6">
                              {Object.entries(videoAnalyses)
                                .filter(([key]) => key.startsWith(`${candidate.id}-`))
                                .map(([key, analysis]) => {
                                  const filename = key.split("-").slice(1).join("-")
                                  return (
                                    <div key={key}>
                                      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                                        <Video className="h-5 w-5" />
                                        <span>Analysis: {filename}</span>
                                      </h3>
                                      <VideoAnalysis analysis={analysis} />
                                    </div>
                                  )
                                })}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                              <p className="text-muted-foreground">No video analyses available</p>
                              <p className="text-sm text-muted-foreground mt-2">
                                Analyze videos from the Videos tab to see results here
                              </p>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  

                 
                  
                 
                </div>
              </div>
            ))}
          </div>

          {(analyzing || analyzingVideo) && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Brain className="h-8 w-8 animate-spin text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">
                      {analyzing ? "Analyzing resume with AI..." : "Analyzing video with AI..."}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {analyzing
                        ? "Extracting skills, experience, and matching with job requirements"
                        : "Transcribing audio, analyzing tone, confidence, and communication skills using Gemini AI"}
                    </p>
                    <Progress value={33} className="w-full mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {filteredCandidates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No candidates found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
