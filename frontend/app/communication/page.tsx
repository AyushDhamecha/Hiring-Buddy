"use client";

import { Input } from "@/components/ui/input";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send } from "lucide-react";

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
  analysis?: any;
  notes?: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
}

// Use the exact same candidates data from candidates page
const initialCandidates: Candidate[] = [
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

const messageTemplates: MessageTemplate[] = [
  {
    id: "interview-invitation",
    name: "Interview Invitation",
    subject: "Interview Invitation - {{position}} at {{company}}",
    content:
      "Dear Candidate, We're impressed with your application for applied postion and would like to invite you for an interview. Please let us know your availability for the coming week. Best regards, Hiring Team",
  },
  {
    id: "application-received",
    name: "Application Received",
    subject: "Application Received - {{position}}",
    content:
      "Dear Candidate, Thank you for your interest in position at Hiring Buddy. We have received your application and will review it shortly. We'll be in touch within the next few days. Best regards, Hiring Team",
  },
  {
    id: "follow-up",
    name: "Follow-up",
    subject: "Following up on your application",
    content:
      "Dear Candidate, I wanted to follow up on your application for your applied role. We are currently reviewing applications and will have an update for you soon. Thank you for your patience. Best regards, Hiring Team",
  },
];

const jobPositions = [
  "All Positions",
  "Frontend Developer",
  "Data Scientist",
  "UX Designer",
  "Backend Engineer",
  "Full Stack Developer",
  "Machine Learning",
  "Product Manager",
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

export default function ConversationsPage() {
  const [candidates] = useState<Candidate[]>(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [newMessage, setNewMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [activeTab, setActiveTab] = useState("conversations");

  // Bulk messaging state
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [bulkMessageType, setBulkMessageType] = useState("");
  const [bulkSubject, setBulkSubject] = useState("");
  const [bulkMessage, setBulkMessage] = useState("");

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setSelectedTemplate("");
    setNewMessage("");
  };

  const handleApplyTemplate = () => {
    if (!selectedTemplate || !selectedCandidate) return;

    const template = messageTemplates.find((t) => t.id === selectedTemplate);
    if (template) {
      const content = template.content
        .replace(/\{\{candidate_name\}\}/g, selectedCandidate.name)
        .replace(/\{\{position\}\}/g, selectedCandidate.position)
        .replace(/\{\{company\}\}/g, "AI Hiring");
      setNewMessage(content);
    }
  };

  const sendMessage = () => {
    if (!selectedCandidate || !newMessage.trim()) return;

    // Here you would implement the actual email sending logic
    alert(`Message sent to ${selectedCandidate.name}!`);

    // Reset form
    setNewMessage("");
    setSelectedTemplate("");
  };

  const handlePositionToggle = (position: string) => {
    if (position === "All Positions") {
      if (selectedPositions.includes("All Positions")) {
        setSelectedPositions([]);
      } else {
        setSelectedPositions(jobPositions);
      }
    } else {
      setSelectedPositions((prev) => {
        const newSelection = prev.includes(position)
          ? prev.filter((p) => p !== position && p !== "All Positions")
          : [...prev.filter((p) => p !== "All Positions"), position];
        return newSelection;
      });
    }
  };

  const handleBulkTemplateSelect = (templateId: string) => {
    setBulkMessageType(templateId);
    const template = messageTemplates.find((t) => t.id === templateId);
    if (template) {
      const selectedPosition = selectedPositions[0] || "";
      const positionText =
        selectedPosition === "All Positions"
          ? "your role"
          : `the ${selectedPosition} role`;

      const subject = template.subject
        .replace(
          /\{\{position\}\}/g,
          selectedPosition === "All Positions" ? "" : selectedPosition
        )
        .replace(/\{\{company\}\}/g, "Hiring Buddy");

      const content = template.content
        .replace(/\{\{position_text\}\}/g, positionText)
        .replace(/\{\{company\}\}/g, "Hiring Buddy");

      setBulkSubject(subject);
      setBulkMessage(content);
    }
  };

  const sendBulkMessages = () => {
    if (!bulkMessage.trim() || selectedPositions.length === 0) return;

    const selectedPosition = selectedPositions[0];
    const targetCandidates = candidates.filter(
      (candidate) =>
        selectedPosition === "All Positions" ||
        candidate.position.includes(selectedPosition)
    );

    // Here you would implement the actual bulk email sending logic
    alert(`Bulk messages sent to ${targetCandidates.length} candidates!`);

    // Reset form
    setSelectedPositions([]);
    setBulkMessageType("");
    setBulkSubject("");
    setBulkMessage("");
  };

  const getSelectedCandidatesCount = () => {
    const selectedPosition = selectedPositions[0] || "";
    if (selectedPosition === "All Positions") {
      return candidates.length;
    }
    return candidates.filter((candidate) =>
      candidate.position.includes(selectedPosition)
    ).length;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Communication Center</h1>
          <p className="text-muted-foreground">
            Manage candidate communications with AI-powered templates
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="bulk-messages">Bulk Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidates List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Conversations</span>
                  <Badge variant="secondary">{candidates.length}</Badge>
                </CardTitle>
                <CardDescription>
                  Active candidate conversations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-4 ${
                        selectedCandidate?.id === candidate.id
                          ? "border-l-primary bg-muted/50"
                          : "border-l-transparent"
                      }`}
                      onClick={() => handleCandidateSelect(candidate)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
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
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">
                              {candidate.name}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {candidate.position}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-white text-xs ${getStatusColor(
                                candidate.status
                              )}`}
                            >
                              {candidate.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Message Composition */}
            <Card className="lg:col-span-2">
              {selectedCandidate ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={selectedCandidate.avatar || "/placeholder.svg"}
                          alt={selectedCandidate.name}
                        />
                        <AvatarFallback>
                          {selectedCandidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{selectedCandidate.name}</span>
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          {selectedCandidate.position}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {/* Template Selection */}
                    <div className="flex space-x-2">
                      <Select
                        value={selectedTemplate}
                        onValueChange={setSelectedTemplate}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Use template" />
                        </SelectTrigger>
                        <SelectContent>
                          {messageTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        onClick={handleApplyTemplate}
                        disabled={!selectedTemplate}
                      >
                        Apply
                      </Button>
                    </div>

                    {/* Message Input */}
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1"
                        rows={6}
                      />
                      <Button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Select a candidate to start messaging
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>
                AI-powered templates for common recruitment communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {messageTemplates.map((template) => (
                  <Card key={template.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {template.subject}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {template.content.substring(0, 100)}...
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">Use Template</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk-messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Messaging</CardTitle>
              <CardDescription>
                Send messages to multiple candidates at once
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-3">Select Recipients</h3>
                  <Card className="p-4">
                    <div className="space-y-2">
                      <Select
                        value={selectedPositions[0] || ""}
                        onValueChange={(value) => setSelectedPositions([value])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose candidate group" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobPositions.map((position) => (
                            <SelectItem key={position} value={position}>
                              {position}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Message Type</h3>
                  <Select
                    value={bulkMessageType}
                    onValueChange={handleBulkTemplateSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      {messageTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Subject Line</h3>
                <Input
                  placeholder="Enter email subject..."
                  value={bulkSubject}
                  onChange={(e) => setBulkSubject(e.target.value)}
                />
              </div>

              <div>
                <h3 className="font-medium mb-3">Message Content</h3>
                <Textarea
                  placeholder="Compose your message..."
                  value={bulkMessage}
                  onChange={(e) => setBulkMessage(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  This message will be sent to {getSelectedCandidatesCount()}{" "}
                  candidates
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline">Preview</Button>
                  <Button
                    onClick={sendBulkMessages}
                    disabled={
                      !bulkMessage.trim() || selectedPositions.length === 0
                    }
                  >
                    Send Messages
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}