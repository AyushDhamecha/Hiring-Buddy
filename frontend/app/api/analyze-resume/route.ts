import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const resumeFile = formData.get("resume") as File;
    const position = formData.get("position") as string;

    if (!resumeFile) {
      return NextResponse.json(
        { error: "No resume file provided" },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString("base64");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze this resume PDF for the position: ${position}

    Please extract and provide the following information in JSON format:
    {
      "score": number (0-100 overall match score for the position),
      "skills": array of strings (key technical skills found),
      "experience": string (years of experience summary),
      "education": string (highest education and institution),
      "strengths": array of strings (3-4 key strengths),
      "concerns": array of strings (2-3 areas of concern or gaps),
      "matchedPositions": array of objects with "title" and "match" percentage for related positions
    }

    Focus on technical skills, relevant experience, and how well the candidate matches the ${position} role.
    Be specific and professional in your analysis.
    `;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: resumeFile.type,
          data: base64Data,
        },
      },
      prompt,
    ]);

    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from AI response");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
