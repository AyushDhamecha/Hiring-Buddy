"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MoreHorizontal,
  Eye,
  FileText,
  Brain,
  Download,
  Trash2,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Toaster } from "sonner";

interface CandidateAnalysis {
  score: number;
  skills: string[];
  experience: string;
  education: string;
  strengths: string[];
  concerns: string[];
  matchedPositions: Array<{
    title: string;
    match: number;
  }>;
}

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  score: number;
  status: string;
  skills: string[];
  experience: string;
  appliedDate: string;
  avatar: string;
  resumeUrl: string;
  resume: string;
  hasResume: boolean;
  resumeAnalyzed: boolean;
  analysis?: CandidateAnalysis;
  notes?: string;
}

let initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Sarah Johnsina",
    email: "sarah.johnson@email.com",
    position: "Senior Frontend Developer",
    score: 0,
    status: "Interview Scheduled",
    skills: ["React", "TypeScript", "Next.js"],
    experience: "5+ years",
    appliedDate: "2024-01-15",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    position: "Data Scientist",
    score: 0,
    status: "Under Review",
    skills: ["Python", "ML", "TensorFlow"],
    experience: "4+ years",
    appliedDate: "2024-01-14",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.png?height=800&width=600",
    resume: "/Resume2.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    position: "UX Designer",
    score: 0,
    status: "Phone Screen",
    skills: ["Figma", "Design Systems", "Research"],
    experience: "3+ years",
    appliedDate: "2024-01-13",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Resume3.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    position: "Backend Engineer",
    score: 0,
    status: "New",
    skills: ["Node.js", "PostgreSQL", "AWS"],
    experience: "6+ years",
    appliedDate: "2024-01-12",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/resume4.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@email.com",
    position: "Product Manager",
    score: 0,
    status: "Final Interview",
    skills: ["Strategy", "Analytics", "Agile"],
    experience: "7+ years",
    appliedDate: "2024-01-11",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/resume5.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 6,
    name: "Rahul Mehta",
    email: "rahul.mehta@email.com",
    position: "Full Stack Developer",
    score: 0,
    status: "New",
    skills: ["Node.js", "React", "MongoDB", "Express"],
    experience: "3+ years",
    appliedDate: "2024-01-20",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Rahul_Mehta_Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 7,
    name: "Anjali Verma",
    email: "anjali.verma@email.com",
    position: "Frontend Developer",
    score: 0,
    status: "Interview Scheduled",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    experience: "2 years",
    appliedDate: "2024-01-22",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Anjali_Verma_Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 8,
    name: "Karan Singh",
    email: "karan.singh@email.com",
    position: "Backend Developer",
    score: 0,
    status: "New",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
    experience: "4+ years",
    appliedDate: "2024-01-25",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Karan_Singh_Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 9,
    name: "Sneha Iyer",
    email: "sneha.iyer@email.com",
    position: "Data Analyst",
    score: 0,
    status: "Under Review",
    skills: ["Python", "SQL", "Tableau", "Pandas"],
    experience: "2.5 years",
    appliedDate: "2024-01-28",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Sneha_Iyer_Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 10,
    name: "Mohit Sharma",
    email: "mohit.sharma@email.com",
    position: "DevOps Engineer",
    score: 0,
    status: "New",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    experience: "5 years",
    appliedDate: "2024-02-01",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Mohit_Sharma_Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 11,
    name: "Pooja Deshmukh",
    email: "pooja.deshmukh@email.com",
    position: "UI/UX Designer",
    score: 0,
    status: "Interview Scheduled",
    skills: ["Figma", "Adobe XD", "Sketch", "Design Systems"],
    experience: "3 years",
    appliedDate: "2024-02-04",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Pooja_Deshmukh_Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
  {
    id: 12,
    name: "Vikram Bansal",
    email: "vikram.bansal@email.com",
    position: "Machine Learning Engineer",
    score: 0,
    status: "Under Review",
    skills: ["Python", "TensorFlow", "Scikit-learn", "NLP"],
    experience: "3.5 years",
    appliedDate: "2024-02-07",
    avatar: "/placeholder.png?height=40&width=40",
    resumeUrl: "/placeholder.svg?height=800&width=600",
    resume: "/Vikram_Bansal_Resume.pdf",
    hasResume: true,
    resumeAnalyzed: false,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-500";
    case "Under Review":
      return "bg-yellow-500";
    case "Phone Screen":
      return "bg-purple-500";
    case "Interview Scheduled":
      return "bg-orange-500";
    case "Final Interview":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90)
    return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400";
  if (score >= 80)
    return "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400";
  if (score >= 70)
    return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400";
  if (score > 0)
    return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
  return "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400";
};

export default function CandidatesPage() {
  // const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)

  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("candidates");
        if (stored) {
          const storedCandidates = JSON.parse(stored);
          const merged = [
            ...storedCandidates,
            ...initialCandidates.filter(
              (newC) =>
                !storedCandidates.some((oldC: Candidate) => oldC.id === newC.id)
            ),
          ];
          localStorage.setItem("candidates", JSON.stringify(merged));
          setCandidates(merged);
        } else {
          localStorage.setItem("candidates", JSON.stringify(initialCandidates));
          setCandidates(initialCandidates);
        }
      }
    } catch (error) {
      console.error("Error loading candidates:", error);
    } finally {
      setIsLoading(false);
    }
  }, [initialCandidates]);

  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      localStorage.setItem("candidates", JSON.stringify(candidates));
    }
  }, [candidates, isLoading]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [analyzing, setAnalyzing] = useState<number | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  const filteredCandidates =
    candidates?.filter((candidate) => {
      if (
        !candidate ||
        !candidate.name ||
        !candidate.email ||
        !candidate.position
      ) {
        return false;
      }

      const matchesSearch =
        candidate.name
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() || "") ||
        candidate.email
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() || "") ||
        candidate.position
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() || "");

      const matchesStatus =
        statusFilter === "all" || candidate.status === statusFilter;
      const matchesPosition =
        positionFilter === "all" || candidate.position === positionFilter;

      return matchesSearch && matchesStatus && matchesPosition;
    }) || [];

  const analyzeResume = async (candidateId: number) => {
    setAnalyzing(candidateId);
    setAnalysisProgress(0);

    try {
      const candidate = candidates.find((c) => c.id === candidateId);
      if (!candidate) {
        console.error("Candidate not found");
        setAnalyzing(null);
        return;
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      // Fetch the resume PDF from public folder
      const resumeResponse = await fetch(candidate.resume);
      if (!resumeResponse.ok) {
        throw new Error("Failed to fetch resume");
      }

      const resumeBlob = await resumeResponse.blob();
      const resumeFile = new File([resumeBlob], "resume.pdf", {
        type: "application/pdf",
      });

      // Create FormData for the API request
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("position", candidate.position);

      // Call the analysis API
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const analysis: CandidateAnalysis = await response.json();

      // Update the candidate with analysis results
      setCandidates((prevCandidates) =>
        prevCandidates.map((c) =>
          c.id === candidateId
            ? {
                ...c,
                resumeAnalyzed: true,
                analysis,
                score: analysis.score,
                skills: analysis.skills.slice(0, 3), // Update main skills display
              }
            : c
        )
      );

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      setTimeout(() => {
        setAnalyzing(null);
        setAnalysisProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setAnalyzing(null);
      setAnalysisProgress(0);

      // Show error to user (you might want to add a toast notification here)
      alert(
        `Failed to analyze resume: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  const updateCandidate = (updatedCandidate: Candidate) => {
    const updatedCandidates = candidates.map((c) =>
      c.id === updatedCandidate.id ? { ...c, ...updatedCandidate } : c
    );
    setCandidates(updatedCandidates);
    if (typeof window !== "undefined") {
      localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
    }
  };

  const deleteCandidate = (candidateId: number) => {
    setCandidates((prevCandidates) =>
      prevCandidates.filter((c) => c.id !== candidateId)
    );
  };

  const getPdfPreview = (resumePath: string) => {
    // In a real implementation, you would convert PDF to image
    // For now, we'll use a PDF icon placeholder
    return `/placeholder.svg?height=800&width=600&text=PDF+Preview`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Candidates</h1>
          <p className="text-muted-foreground">
            Manage and review all candidate applications with AI-powered
            analysis
          </p>
        </div>
        {/* <Button>Add Candidate</Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Pipeline</CardTitle>
          <CardDescription>
            Filter and search through your candidate database
          </CardDescription>
        </CardHeader>
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
                <SelectItem value="Interview Scheduled">
                  Interview Scheduled
                </SelectItem>
                <SelectItem value="Final Interview">Final Interview</SelectItem>
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                <SelectItem value="Senior Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                <SelectItem value="UX Designer">UX Designer</SelectItem>
                <SelectItem value="Backend Engineer">
                  Backend Engineer
                </SelectItem>
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
                  <AvatarImage
                    src={candidate.avatar || "/placeholder.svg"}
                    alt={candidate.name}
                  />
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
                    {candidate.score > 0 && (
                      <Badge
                        className={`${getScoreColor(candidate.score)} border-0`}
                      >
                        {candidate.score}%
                      </Badge>
                    )}
                    {candidate.hasResume && (
                      <Badge variant="outline" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        Resume
                      </Badge>
                    )}
                    {candidate.resumeAnalyzed && (
                      <Badge
                        variant="outline"
                        className="text-xs text-green-600"
                      >
                        <Brain className="h-3 w-3 mr-1" />
                        Analyzed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {candidate.email}
                  </p>
                  <p className="text-sm font-medium">{candidate.position}</p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={`text-white ${getStatusColor(
                        candidate.status
                      )}`}
                    >
                      {candidate.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {candidate.experience} • Applied {candidate.appliedDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {candidate.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
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
                        onClick={() => setSelectedCandidate(candidate)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <span>{candidate.name}</span>
                          {candidate.score > 0 && (
                            <Badge
                              className={`${getScoreColor(
                                candidate.score
                              )} border-0`}
                            >
                              {candidate.score}%
                            </Badge>
                          )}
                        </DialogTitle>
                        <DialogDescription>
                          {candidate.position} • {candidate.email}
                        </DialogDescription>
                      </DialogHeader>

                      <Tabs defaultValue="resume" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="resume">Resume</TabsTrigger>
                          <TabsTrigger value="analysis">
                            AI Analysis
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="resume" className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                              Resume Document
                            </h3>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download PDF
                            </Button>
                          </div>
                          <div className="border rounded-lg p-4 bg-muted/20">
                            <div className="w-full h-96 bg-gray-100 rounded flex items-center justify-center">
                              <div className="text-center">
                                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600">PDF Preview</p>
                                <p className="text-sm text-gray-500">
                                  {candidate.resume.split("/").pop()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="analysis" className="space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                              Status Update
                            </h3>
                            <Select
                              value={candidate.status}
                              onValueChange={(newStatus) => {
                                const updatedCandidate = {
                                  ...candidate,
                                  status: newStatus,
                                };
                                updateCandidate(updatedCandidate);
                              }}
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue placeholder="Update status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="Under Review">
                                  Under Review
                                </SelectItem>
                                <SelectItem value="Phone Screen">
                                  Phone Screen
                                </SelectItem>
                                <SelectItem value="Interview Scheduled">
                                  Interview Scheduled
                                </SelectItem>
                                <SelectItem value="Final Interview">
                                  Final Interview
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">
                              Notes
                            </h3>
                            <textarea
                              className="w-full p-2 border rounded-md"
                              rows={4}
                              value={candidate.notes || ""}
                              onChange={(e) => {
                                const updatedCandidate = {
                                  ...candidate,
                                  notes: e.target.value,
                                };
                                updateCandidate(updatedCandidate);
                              }}
                              placeholder="Add notes about the candidate..."
                            />
                          </div>
                          {candidate.resumeAnalyzed && candidate.analysis ? (
                            <div className="space-y-6">
                              <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-2xl font-bold mb-2">
                                  {candidate.analysis.score}
                                </div>
                                <p className="font-medium">
                                  Overall Match Score
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Based on skills, experience, and requirements
                                </p>
                              </div>

                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <h4 className="font-medium mb-2">
                                    Key Skills
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {candidate.analysis.skills.map(
                                      (skill: string) => (
                                        <Badge key={skill} variant="secondary">
                                          {skill}
                                        </Badge>
                                      )
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">
                                    Experience & Education
                                  </h4>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    <strong>Experience:</strong>{" "}
                                    {candidate.analysis.experience}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    <strong>Education:</strong>{" "}
                                    {candidate.analysis.education}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Strengths</h4>
                                <ul className="space-y-1">
                                  {candidate.analysis.strengths.map(
                                    (strength: string, index: number) => (
                                      <li
                                        key={index}
                                        className="flex items-start space-x-2 text-sm"
                                      >
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>{strength}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  Areas of Concern
                                </h4>
                                <ul className="space-y-1">
                                  {candidate.analysis.concerns.map(
                                    (concern: string, index: number) => (
                                      <li
                                        key={index}
                                        className="flex items-start space-x-2 text-sm"
                                      >
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                                        <span>{concern}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">
                                  Position Matches
                                </h4>
                                <div className="space-y-2">
                                  {candidate.analysis.matchedPositions.map(
                                    (position: any, index: number) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between p-2 bg-muted rounded"
                                      >
                                        <span className="text-sm font-medium">
                                          {position.title}
                                        </span>
                                        <Badge
                                          variant={
                                            position.match >= 90
                                              ? "default"
                                              : position.match >= 80
                                              ? "secondary"
                                              : "outline"
                                          }
                                        >
                                          {position.match}% match
                                        </Badge>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <Brain className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                              <p className="text-muted-foreground mb-4">
                                Resume not yet analyzed
                              </p>
                              <Button
                                onClick={() => analyzeResume(candidate.id)}
                                disabled={analyzing === candidate.id}
                              >
                                {analyzing === candidate.id ? (
                                  <>
                                    <Brain className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing...
                                  </>
                                ) : (
                                  <>
                                    <Brain className="mr-2 h-4 w-4" />
                                    Analyze Resume
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>

                  {!candidate.resumeAnalyzed && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => analyzeResume(candidate.id)}
                      disabled={analyzing === candidate.id}
                    >
                      {analyzing === candidate.id ? (
                        <>
                          <Brain className="h-4 w-4 mr-1 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-1" />
                          Analyze
                        </>
                      )}
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteCandidate(candidate.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>

                  <Link href={`/send-invite/${candidate.id}`} passHref>
                    <Button
                      variant="outline"
                      size="sm"
                      title={`Send Invite to ${candidate.name}`}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Send Invite
                    </Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Move to Next Stage</DropdownMenuItem>
                      <DropdownMenuItem>Send Rejection</DropdownMenuItem>
                      <DropdownMenuItem>Add Note</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>

          {analyzing && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Brain className="h-8 w-8 animate-spin text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">Analyzing resume with AI...</p>
                    <p className="text-sm text-muted-foreground">
                      Extracting skills, experience, and matching with job
                      requirements
                    </p>
                    <Progress
                      value={analysisProgress}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {filteredCandidates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No candidates found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
