import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { candidateName, position, messageType, context } = await request.json()

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are a professional HR communication assistant. Generate personalized, professional messages for candidate communication. Keep messages concise, friendly, and appropriate for the hiring context.`,
      prompt: `Generate a ${messageType} message for candidate ${candidateName} applying for ${position}. Context: ${context}`,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Message generation error:", error)
    return NextResponse.json({ error: "Failed to generate message" }, { status: 500 })
  }
}
