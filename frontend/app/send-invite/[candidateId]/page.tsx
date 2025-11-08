"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import {
  Send,
  ArrowLeft,
  User,
  Briefcase,
  Mail as MailIcon,
  CalendarDays,
  Clock,
  MapPin,
  StickyNote,
  Building,
} from "lucide-react";
import Link from "next/link";

const candidatesListFromStaticFile = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "ayushdhamecha02@gmail.com",
    position: "Senior Frontend Developer",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "akashy8170@gmail.com",
    position: "Data Scientist",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "ayushdhamecha02@gmail.com",
    position: "UX Designer",
  },
  {
    id: 4,
    name: "David Kim",
    email: "ayushdhamecha02@gmail.com",
    position: "Backend Engineer",
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    position: "Product Manager",
  },
];

interface CandidateData {
  id: number;
  name: string;
  email: string;
  position: string;
}

const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getInitialDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getFormattedDate(tomorrow);
};

export default function SendInvitePage() {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.candidateId
    ? parseInt(params.candidateId as string, 10)
    : null;

  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [isLoadingCandidate, setIsLoadingCandidate] = useState(true);

  const [interviewDate, setInterviewDate] = useState<string>(getInitialDate);
  const [interviewTime, setInterviewTime] = useState<string>("10:00");
  const [interviewLocation, setInterviewLocation] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("My Awesome Company");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (candidateId) {
      const foundCandidate = candidatesListFromStaticFile.find(
        (c) => c.id === candidateId
      );
      if (foundCandidate) {
        setCandidate(foundCandidate);
      } else {
        toast.error("Candidate not found.");
      }
      setIsLoadingCandidate(false);
    } else {
      setIsLoadingCandidate(false);
      toast.error("Invalid candidate ID.");
    }
  }, [candidateId]);

  const handleSendInvite = async () => {
    if (!candidate) {
      toast.error("Candidate data not loaded.");
      return;
    }
    if (
      !interviewDate ||
      !interviewTime ||
      !interviewLocation.trim() ||
      !companyName.trim()
    ) {
      toast.error("Please fill in Company Name, Date, Time, and Location.");
      return;
    }

    setIsSending(true);
    const toastId = toast.loading(`Sending invite to ${candidate.name}...`);

    try {
      const response = await fetch("/api/send-single-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName: candidate.name,
          candidateEmail: candidate.email,
          candidatePosition: candidate.position,
          interviewDate,
          interviewTime,
          interviewLocation,
          additionalNotes,
          companyName,
        }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || `API Error: ${response.status}`);
      toast.success(result.message || `Invite sent to ${candidate.name}.`, {
        id: toastId,
      });
      // router.push('/candidates'); // Optional: redirect after sending
    } catch (error: any) {
      toast.error(error.message || "Failed to send invite.", { id: toastId });
    } finally {
      setIsSending(false);
    }
  };

  if (isLoadingCandidate) {
    return (
      <div className="container mx-auto p-8 text-center">
        Loading candidate details...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-xl text-red-500">Candidate not found.</p>
        <Link href="/candidates" passHref className="mt-4 inline-block">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Candidates
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-2xl">
        <div className="mb-6">
          <Link
            href="/candidates"
            className="text-sm text-primary hover:underline flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Candidates List
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Send Interview Invitation
            </CardTitle>
            <CardDescription>
              Inviting <strong>{candidate.name}</strong> for{" "}
              <strong>{candidate.position}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Candidate
              </h3>
              <p className="text-sm">
                <strong className="text-muted-foreground w-20 inline-block">
                  Name:
                </strong>{" "}
                {candidate.name}
              </p>
              <p className="text-sm">
                <strong className="text-muted-foreground w-20 inline-block">
                  Email:
                </strong>{" "}
                {candidate.email}
              </p>
              <p className="text-sm">
                <strong className="text-muted-foreground w-20 inline-block">
                  Position:
                </strong>{" "}
                {candidate.position}
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name" className="flex items-center">
                  <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                  Company Name *
                </Label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1"
                  placeholder="Your Company Inc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interview-date" className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    Date *
                  </Label>
                  <Input
                    id="interview-date"
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="interview-time" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    Time *
                  </Label>
                  <Input
                    id="interview-time"
                    type="time"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="interview-location"
                  className="flex items-center"
                >
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  Location / Mode *
                </Label>
                <Input
                  id="interview-location"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  placeholder="e.g., Video Call (Google Meet)"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="additional-notes" className="flex items-center">
                  <StickyNote className="mr-2 h-4 w-4 text-muted-foreground" />
                  Additional Notes
                </Label>
                <Textarea
                  id="additional-notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g., The interview will last approx. 45 mins."
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
            <Button
              onClick={handleSendInvite}
              disabled={isSending}
              className="w-full text-lg py-3 mt-6"
            >
              <Send className="mr-2 h-5 w-5" />
              {isSending
                ? "Sending Invite..."
                : `Send Invite to ${candidate.name}`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
