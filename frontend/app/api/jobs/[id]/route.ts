import { type NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobData = await request.json()

    const response = await fetch(`${API_URL}/jobs/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const updatedJob = await response.json()
    return NextResponse.json(updatedJob)
  } catch (error) {
    console.log("[v0] PUT /jobs/[id] - Error:", error)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`${API_URL}/jobs/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("[v0] DELETE /jobs/[id] - Error:", error)
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
