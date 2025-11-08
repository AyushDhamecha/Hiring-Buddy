import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()
    console.log("[frontend] POST /api/applications - Raw data:", applicationData)

    if (!applicationData.jobId) {
      console.error("[frontend] POST /api/applications - Missing jobId")
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    const payload = {
      name: applicationData.name,
      number: applicationData.number,
      email: applicationData.email,
      address: applicationData.address,
      dob: applicationData.dob,
      skills: applicationData.skills,
      resumePDF: applicationData.resumePDF,
      videoMP4: applicationData.videoMP4 || null,
      jobId: applicationData.jobId,
      appliedTo: applicationData.appliedTo,
      appliedDate: applicationData.appliedDate,
    }

    console.log("[frontend] POST /api/applications - Sending payload:", payload)

    const response = await fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("[frontend] POST /api/applications - Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[frontend] POST /api/applications - Error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const newApplication = await response.json()
    console.log("[frontend] POST /api/applications - Application created:", newApplication)
    return NextResponse.json(newApplication, { status: 201 })
  } catch (error) {
    console.log("[frontend] POST /applications - Error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
