import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export async function GET() {
  try {
    console.log("[frontend] GET /api/jobs - Fetching from:", API_URL)
    const response = await fetch(`${API_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.log("[frontend] GET /jobs - Fetch failed with status:", response.status)
      return NextResponse.json([])
    }

    const jobs = await response.json()
    console.log("[frontend] GET /jobs - Successfully fetched jobs:", jobs.length)
    return NextResponse.json(jobs)
  } catch (error) {
    console.log("[frontend] GET /jobs - Error:", error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()
    console.log("[frontend] POST /api/jobs - Sending data:", jobData)

    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })

    console.log("[frontend] POST /api/jobs - Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log("[frontend] POST /api/jobs - Error response:", errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const newJob = await response.json()
    console.log("[frontend] POST /api/jobs - Job created:", newJob)
    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    console.log("[frontend] POST /jobs - Error:", error)
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
