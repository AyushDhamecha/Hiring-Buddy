"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Eye,
  Edit,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Plus,
  Building2,
  Trash2,
  FileText,
  Video,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Job {
  _id?: string
  id?: number
  title: string
  department: string
  location: string
  salaryRange: string
  openings: number
  status: string
  postedDate: string
  applicants: number
  skills: string[]
  description: string
  responsibilities: string[]
  requirements: string[]
}

const initialJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    salaryRange: "₹8L–₹15L per annum",
    openings: 2,
    status: "Active",
    postedDate: "2024-01-10",
    applicants: 24,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    description:
      "We're looking for a Senior Frontend Developer to join our engineering team and help build the next generation of our platform.",
    responsibilities: [
      "Lead frontend development initiatives and mentor junior developers",
      "Collaborate with design and backend teams to implement user interfaces",
      "Optimize application performance and ensure cross-browser compatibility",
      "Participate in code reviews and maintain high code quality standards",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of React and TypeScript",
      "Experience with modern build tools and CI/CD pipelines",
      "Strong problem-solving and communication skills",
    ],
  },
  {
    id: 2,
    title: "Data Scientist",
    department: "Engineering",
    location: "Hybrid",
    salaryRange: "₹10L–₹18L per annum",
    openings: 1,
    status: "Active",
    postedDate: "2024-01-08",
    applicants: 18,
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    description: "Join our data science team to build ML models and derive insights from large datasets.",
    responsibilities: [
      "Develop and deploy machine learning models",
      "Analyze large datasets to identify trends and patterns",
      "Collaborate with product teams to implement data-driven features",
      "Present findings to stakeholders and leadership",
    ],
    requirements: [
      "4+ years of experience in data science or ML",
      "Strong programming skills in Python and SQL",
      "Experience with ML frameworks like TensorFlow or PyTorch",
      "PhD or Master's degree in relevant field preferred",
    ],
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "On-site",
    salaryRange: "₹6L–₹12L per annum",
    openings: 1,
    status: "Active",
    postedDate: "2024-01-05",
    applicants: 31,
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    description: "We're seeking a talented UX Designer to create intuitive and engaging user experiences.",
    responsibilities: [
      "Design user interfaces and experiences for web and mobile",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and design specifications",
      "Collaborate with developers to ensure design implementation",
    ],
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma and design systems",
      "Strong portfolio demonstrating design process",
      "Experience with user research methodologies",
    ],
  },
  {
    id: 4,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    salaryRange: "₹7L–₹14L per annum",
    openings: 3,
    status: "Active",
    postedDate: "2024-01-03",
    applicants: 42,
    skills: ["Node.js", "PostgreSQL", "AWS", "Docker"],
    description: "Looking for a Backend Engineer to build scalable server-side applications and APIs.",
    responsibilities: [
      "Design and implement RESTful APIs and microservices",
      "Optimize database queries and ensure data integrity",
      "Deploy and maintain applications on cloud infrastructure",
      "Collaborate with frontend teams on API integration",
    ],
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Node.js and databases",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Understanding of system design and architecture",
    ],
  },
  {
    id: 5,
    title: "Product Manager",
    department: "Product",
    location: "Hybrid",
    salaryRange: "₹12L–₹20L per annum",
    openings: 1,
    status: "Draft",
    postedDate: "2024-01-01",
    applicants: 15,
    skills: ["Strategy", "Analytics", "Agile", "Roadmapping"],
    description: "Seeking an experienced Product Manager to drive product strategy and execution.",
    responsibilities: [
      "Define product vision and strategy",
      "Manage product roadmap and prioritize features",
      "Collaborate with engineering and design teams",
      "Analyze user feedback and market trends",
    ],
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and strategic thinking skills",
      "Experience with agile development methodologies",
      "Excellent communication and leadership abilities",
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-500"
    case "Draft":
      return "bg-yellow-500"
    case "Paused":
      return "bg-orange-500"
    case "Closed":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getLocationIcon = (location: string) => {
  switch (location) {
    case "Remote":
      return "🌐"
    case "On-site":
      return "🏢"
    case "Hybrid":
      return "🔄"
    default:
      return "📍"
  }
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    salaryRange: "",
    openings: "",
    description: "",
    responsibilities: "",
    skills: "",
  })
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [applyingToJob, setApplyingToJob] = useState<Job | null>(null)
  const [applicationData, setApplicationData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
    dob: "",
    skills: "",
    resumePDF: null as File | null,
    videoMP4: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("http://localhost:5000/api/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          console.error("[backend] Failed to fetch jobs:", response.statusText)
          setJobs([])
          return
        }

        const fetchedJobs = await response.json()
        console.log("[backend] Jobs loaded:", fetchedJobs)
        setJobs(Array.isArray(fetchedJobs) ? fetchedJobs : [])
      } catch (error) {
        console.error("[backend] Error loading jobs:", error)
        setJobs([])
      } finally {
        setIsLoading(false)
      }
    }

    loadJobs()
  }, [])


  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDepartment = departmentFilter === "all" || job.department === departmentFilter
    const matchesLocation = locationFilter === "all" || job.location === locationFilter
    const matchesStatus = statusFilter === "all" || job.status === statusFilter

    return matchesSearch && matchesDepartment && matchesLocation && matchesStatus
  })

  const handleCreateJob = async () => {
    try {
      setIsLoading(true)
      const skillsArray = newJob.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
      const responsibilitiesArray = newJob.responsibilities
        .split("\n")
        .map((resp) => resp.trim())
        .filter(Boolean)

      const jobToCreate: Job = {
        title: newJob.title,
        department: newJob.department,
        location: newJob.location,
        salaryRange: newJob.salaryRange,
        openings: Number.parseInt(newJob.openings) || 1,
        status: "Active",
        postedDate: new Date().toISOString().split("T")[0],
        applicants: 0,
        skills: skillsArray,
        description: newJob.description,
        responsibilities: responsibilitiesArray,
        requirements: [],
      }

      console.log("[frontend] ========== CREATE JOB ==========")
      console.log("[frontend] Creating job with data:")
      console.log(jobToCreate)
      console.log("[frontend] Sending to backend: http://localhost:5000/api/jobs")

      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobToCreate),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create job")
      }

      const createdJob = await response.json()
      console.log("[frontend] ✓ Job created successfully from backend:")
      console.log(createdJob)
      console.log("[frontend] Job ID:", createdJob._id)
      console.log("[frontend] ===================================")

      setJobs([createdJob, ...jobs])
      setIsCreateDialogOpen(false)
      setNewJob({
        title: "",
        department: "",
        location: "",
        salaryRange: "",
        openings: "",
        description: "",
        responsibilities: "",
        skills: "",
      })
      alert("Job created successfully and saved to MongoDB!")
    } catch (error) {
      console.error("[frontend] Error creating job:", error)
      if (error instanceof Error) {
        alert(`Failed to create job: ${error.message || "Please ensure backend is running on http://localhost:5000"}`);
      } else {
        alert("Failed to create job: An unknown error occurred. Please ensure backend is running on http://localhost:5000");
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditJob = async () => {
    if (!editingJob) return

    try {
      setIsLoading(true)
      const skillsArray = newJob.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
      const responsibilitiesArray = newJob.responsibilities
        .split("\n")
        .map((resp) => resp.trim())
        .filter(Boolean)

      const updatedJob: Job = {
        title: newJob.title,
        department: newJob.department,
        location: newJob.location,
        salaryRange: newJob.salaryRange,
        openings: Number.parseInt(newJob.openings) || 1,
        skills: skillsArray,
        description: newJob.description,
        responsibilities: responsibilitiesArray,
        status: "",
        postedDate: "",
        applicants: 0,
        requirements: []
      }

      const jobId = editingJob._id || editingJob.id
      console.log("[v0] Updating job:", jobId, updatedJob)

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      })

      if (!response.ok) {
        throw new Error("Failed to update job")
      }

      const result = await response.json()
      console.log("[v0] Job updated successfully:", result)

      setJobs(
        jobs.map((job) => (job._id === editingJob._id || job.id === editingJob.id ? { ...job, ...updatedJob } : job)),
      )
      setIsEditDialogOpen(false)
      setEditingJob(null)
      setNewJob({
        title: "",
        department: "",
        location: "",
        salaryRange: "",
        openings: "",
        description: "",
        responsibilities: "",
        skills: "",
      })
      alert("Job updated successfully!")
    } catch (error) {
      console.error("[v0] Error updating job:", error)
      alert("Failed to update job. Please ensure the backend is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteJob = async (job: Job) => {
    try {
      setIsLoading(true)
      const jobId = job._id || job.id
      console.log("[v0] Deleting job:", jobId)

      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete job")
      }

      console.log("[v0] Job deleted successfully")
      setJobs(jobs.filter((j) => j._id !== job._id && j.id !== job.id))
      alert("Job deleted successfully!")
    } catch (error) {
      console.error("[v0] Error deleting job:", error)
      alert("Failed to delete job. Please ensure the backend is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleJobApplication = async () => {
    try {
      setIsLoading(true)
      const skillsArray = applicationData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)

      const applicationPayload = {
        name: applicationData.name,
        number: applicationData.number,
        email: applicationData.email,
        address: applicationData.address,
        dob: applicationData.dob,
        skills: skillsArray,
        resumePDF: applicationData.resumePDF?.name || "",
        videoMP4: applicationData.videoMP4?.name || "",
        jobId: applyingToJob?._id || applyingToJob?.id,
        appliedTo: applyingToJob?.title || "",
        appliedDate: new Date().toISOString().split("T")[0],
      }

      console.log("[frontend] ========== SUBMIT APPLICATION ==========")
      console.log("[frontend] Application data:")
      console.log(applicationPayload)
      console.log("[frontend] Sending to backend: http://localhost:5000/api/applications")

      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationPayload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      const result = await response.json()
      console.log("[frontend] ✓ Application submitted successfully:")
      console.log(result)
      console.log("[frontend] Application ID:", result._id)
      console.log("[frontend] =======================================")

      if (applyingToJob) {
        const updatedJobs = jobs.map((job) =>
          job._id === applyingToJob._id || job.id === applyingToJob.id
            ? { ...job, applicants: job.applicants + 1 }
            : job,
        )
        setJobs(updatedJobs)
      }

      setIsApplyDialogOpen(false)
      setApplyingToJob(null)
      setApplicationData({
        name: "",
        number: "",
        email: "",
        address: "",
        dob: "",
        skills: "",
        resumePDF: null,
        videoMP4: null,
      })

      alert("Application submitted successfully and saved to MongoDB!")
    } catch (error) {
      console.error("[frontend] Error submitting application:", error)
      alert("Failed to submit application. Please ensure the backend is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const openEditDialog = (job: Job) => {
    setEditingJob(job)
    setNewJob({
      title: job.title,
      department: job.department,
      location: job.location,
      salaryRange: job.salaryRange,
      openings: job.openings.toString(),
      description: job.description,
      responsibilities: job.responsibilities.join("\n"),
      skills: job.skills.join(", "),
    })
    setIsEditDialogOpen(true)
  }

  const openApplyDialog = (job: Job) => {
    setApplyingToJob(job)
    setApplicationData({
      name: "",
      number: "",
      email: "",
      address: "",
      dob: "",
      skills: "",
      resumePDF: null,
      videoMP4: null,
    })
    setIsApplyDialogOpen(true)
  }

  const resetForm = () => {
    setNewJob({
      title: "",
      department: "",
      location: "",
      salaryRange: "",
      openings: "",
      description: "",
      responsibilities: "",
      skills: "",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Jobs</h1>
            <p className="text-gray-400">Manage job postings and track applications</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-gray-200" onClick={resetForm} disabled={isLoading}>
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Job</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Fill in the details to create a new job posting
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Job Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Software Engineer"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-white">
                      Department
                    </Label>
                    <Select
                      value={newJob.department}
                      onValueChange={(value) => setNewJob({ ...newJob, department: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Select
                      value={newJob.location}
                      onValueChange={(value) => setNewJob({ ...newJob, location: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="On-site">On-site</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="openings" className="text-white">
                      Number of Openings
                    </Label>
                    <Input
                      id="openings"
                      type="number"
                      placeholder="e.g., 2"
                      value={newJob.openings}
                      onChange={(e) => setNewJob({ ...newJob, openings: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary" className="text-white">
                    Salary Range
                  </Label>
                  <Input
                    id="salary"
                    placeholder="e.g., ₹5L–₹12L per annum"
                    value={newJob.salaryRange}
                    onChange={(e) => setNewJob({ ...newJob, salaryRange: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">
                    Job Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role and what the candidate will be doing..."
                    rows={3}
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities" className="text-white">
                    Key Responsibilities
                  </Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="List the main responsibilities (one per line)..."
                    rows={4}
                    value={newJob.responsibilities}
                    onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-white">
                    Required Skills
                  </Label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, Python, SQL, React, Node.js (comma separated)"
                    value={newJob.skills}
                    onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateJob}
                    className="bg-white text-black hover:bg-gray-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Job"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Job</DialogTitle>
              <DialogDescription className="text-gray-400">Update the job posting details</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title" className="text-white">
                    Job Title
                  </Label>
                  <Input
                    id="edit-title"
                    placeholder="e.g., Software Engineer"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department" className="text-white">
                    Department
                  </Label>
                  <Select
                    value={newJob.department}
                    onValueChange={(value) => setNewJob({ ...newJob, department: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location" className="text-white">
                    Location
                  </Label>
                  <Select value={newJob.location} onValueChange={(value) => setNewJob({ ...newJob, location: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-openings" className="text-white">
                    Number of Openings
                  </Label>
                  <Input
                    id="edit-openings"
                    type="number"
                    placeholder="e.g., 2"
                    value={newJob.openings}
                    onChange={(e) => setNewJob({ ...newJob, openings: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-salary" className="text-white">
                  Salary Range
                </Label>
                <Input
                  id="edit-salary"
                  placeholder="e.g., ₹5L–₹12L per annum"
                  value={newJob.salaryRange}
                  onChange={(e) => setNewJob({ ...newJob, salaryRange: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description" className="text-white">
                  Job Description
                </Label>
                <Textarea
                  id="edit-description"
                  placeholder="Describe the role and what the candidate will be doing..."
                  rows={3}
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-responsibilities" className="text-white">
                  Key Responsibilities
                </Label>
                <Textarea
                  id="edit-responsibilities"
                  placeholder="List the main responsibilities (one per line)..."
                  rows={4}
                  value={newJob.responsibilities}
                  onChange={(e) => setNewJob({ ...newJob, responsibilities: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-skills" className="text-white">
                  Required Skills
                </Label>
                <Input
                  id="edit-skills"
                  placeholder="e.g., JavaScript, Python, SQL, React, Node.js (comma separated)"
                  value={newJob.skills}
                  onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditJob} className="bg-white text-black hover:bg-gray-200" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Job"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Apply for {applyingToJob?.title}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Fill in your details to apply for this position
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apply-name" className="text-white">
                    Full Name *
                  </Label>
                  <Input
                    id="apply-name"
                    placeholder="e.g., Ayush Dhanecha"
                    value={applicationData.name}
                    onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apply-number" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="apply-number"
                    placeholder="e.g., +91-9876543210"
                    value={applicationData.number}
                    onChange={(e) => setApplicationData({ ...applicationData, number: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apply-email" className="text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="apply-email"
                    type="email"
                    placeholder="e.g., ayush@example.com"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apply-dob" className="text-white">
                    Date of Birth *
                  </Label>
                  <Input
                    id="apply-dob"
                    type="date"
                    value={applicationData.dob}
                    onChange={(e) => setApplicationData({ ...applicationData, dob: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apply-address" className="text-white">
                  Address *
                </Label>
                <Input
                  id="apply-address"
                  placeholder="e.g., Ahmedabad, India"
                  value={applicationData.address}
                  onChange={(e) => setApplicationData({ ...applicationData, address: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apply-skills" className="text-white">
                  Skills *
                </Label>
                <Input
                  id="apply-skills"
                  placeholder="e.g., React, Node.js, AWS (comma separated)"
                  value={applicationData.skills}
                  onChange={(e) => setApplicationData({ ...applicationData, skills: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apply-resume" className="text-white">
                    Resume (PDF) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="apply-resume"
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        setApplicationData({ ...applicationData, resumePDF: e.target.files?.[0] || null })
                      }
                      className="bg-gray-800 border-gray-600 text-white file:bg-gray-700 file:text-white file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded"
                    />
                    <FileText className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  {applicationData.resumePDF && (
                    <p className="text-xs text-green-400">✓ {applicationData.resumePDF.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apply-video" className="text-white">
                    Introduction Video (MP4)
                  </Label>
                  <div className="relative">
                    <Input
                      id="apply-video"
                      type="file"
                      accept=".mp4,.mov,.avi"
                      onChange={(e) =>
                        setApplicationData({ ...applicationData, videoMP4: e.target.files?.[0] || null })
                      }
                      className="bg-gray-800 border-gray-600 text-white file:bg-gray-700 file:text-white file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded"
                    />
                    <Video className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  {applicationData.videoMP4 && (
                    <p className="text-xs text-green-400">✓ {applicationData.videoMP4.name}</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-2">Applying for:</h4>
                <p className="text-sm text-gray-300">{applyingToJob?.title}</p>
                <p className="text-xs text-gray-400">
                  {applyingToJob?.department} • {applyingToJob?.location}
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsApplyDialogOpen(false)}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleJobApplication}
                  className="bg-green-600 text-white hover:bg-green-700"
                  disabled={
                    !applicationData.name ||
                    !applicationData.email ||
                    !applicationData.number ||
                    !applicationData.address ||
                    !applicationData.dob ||
                    !applicationData.skills ||
                    !applicationData.resumePDF ||
                    isLoading
                  }
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Job Listings</CardTitle>
            <CardDescription className="text-gray-400">Manage and track all your job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job._id || job.id}
                  className="flex items-center space-x-4 p-4 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg">
                    <Building2 className="h-6 w-6 text-gray-300" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white">{job.title}</h3>
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {job.department}
                      </Badge>
                      <Badge variant="outline" className={`text-white ${getStatusColor(job.status)}`}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {getLocationIcon(job.location)} {job.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3" />
                        <span>{job.salaryRange}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>
                          {job.openings} opening{job.openings !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Posted {job.postedDate}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {job.applicants} applicants
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedJob(job)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          disabled={isLoading}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle className="flex items-center space-x-2 text-white">
                            <span>{job.title}</span>
                            <Badge variant="outline" className={`text-white ${getStatusColor(job.status)}`}>
                              {job.status}
                            </Badge>
                          </DialogTitle>
                          <DialogDescription className="text-gray-400">
                            {job.department} • {job.location} • {job.salaryRange}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h4 className="font-medium mb-2 text-white">Job Description</h4>
                              <p className="text-sm text-gray-400">{job.description}</p>
                            </div>
                            <Button
                              onClick={() => openApplyDialog(job)}
                              className="bg-green-600 text-white hover:bg-green-700 ml-4"
                              disabled={isLoading}
                            >
                              <User className="h-4 w-4 mr-2" />
                              Apply Now
                            </Button>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 text-white">Key Responsibilities</h4>
                            <ul className="space-y-1">
                              {job.responsibilities.map((responsibility, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-400">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 text-white">Requirements</h4>
                            <ul className="space-y-1">
                              {job.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-start space-x-2 text-sm">
                                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-400">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 text-white">Required Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {job.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                            <div>
                              <p className="text-sm font-medium text-white">Department</p>
                              <p className="text-sm text-gray-400">{job.department}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">Location</p>
                              <p className="text-sm text-gray-400">{job.location}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">Salary Range</p>
                              <p className="text-sm text-gray-400">{job.salaryRange}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">Openings</p>
                              <p className="text-sm text-gray-400">{job.openings}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(job)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      disabled={isLoading}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 hover:bg-red-900/20 bg-transparent"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-900 border-gray-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            This action cannot be undone. This will permanently delete the job posting "{job.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteJob(job)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">No jobs found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
