// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import fs from "fs";
// import path from "path";
// import util from "util";
// import fetch from "node-fetch";
// import FormData from "form-data";

// export async function POST(request: NextRequest) {
//   try {
//     const { candidateId, videoFilename } = await request.json();

//     if (!candidateId || !videoFilename) {
//       return NextResponse.json(
//         { error: "Candidate ID and video filename required" },
//         { status: 400 }
//       );
//     }

//     if (!process.env.GOOGLE_API_KEY) {
//       return NextResponse.json(
//         { error: "Google API key not configured" },
//         { status: 500 }
//       );
//     }

//     const videoPath = path.join(process.cwd(), "public", "videos", videoFilename);
//     const audioPath = videoPath.replace(path.extname(videoFilename), ".flac");

//     // Convert video to audio
//     await extractAudio(videoPath, audioPath);

//     // Transcribe using your Python Whisper server
//     const transcript = await transcribeWithWhisper(audioPath);

//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `You are an expert HR assistant that analyzes video introductions from job candidates. Analyze the following video transcript and provide a comprehensive assessment.

// Video Transcript: "${transcript}"

// Please analyze the candidate's communication and provide a detailed JSON response with the following structure:
// {
//   "transcript": "${transcript}",
//   "tone": "one of: Enthusiastic, Friendly, Nervous, Professional, Casual, Formal, Robotic",
//   "confidence": "one of: High, Moderate, Low", 
//   "clarity": "one of: Excellent, Good, Fair, Poor",
//   "keywords": ["array of 5-8 important keywords and phrases from the speech"],
//   "insights": ["array of 4-6 detailed observations about communication style, strengths, and areas for improvement"],
//   "scores": {
//     "enthusiasm": number (0-100),
//     "confidence": number (0-100),
//     "clarity": number (0-100), 
//     "professionalism": number (0-100)
//   },
//   "communicationStrengths": ["array of 3-4 specific communication strengths"],
//   "areasForImprovement": ["array of 2-3 areas where communication could be enhanced"],
//   "overallAssessment": "2-3 sentence summary of the candidate's communication effectiveness"
//   you can check some parameters by tracking if the candidate is using filler words like "um", "uh", "like", "you know" or if they are using technical vocabulary related to the job position."uh ,um " can show fluency issues, while technical vocabulary can show expertise and confidence in the subject matter.
// }`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     let analysis;
//     try {
//       const jsonMatch = text.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         analysis = JSON.parse(jsonMatch[0]);
//       } else {
//         throw new Error("No JSON found in response");
//       }
//     } catch (parseError) {
//       console.error("Failed to parse AI response:", parseError);
//       analysis = {
//         transcript,
//         tone: "Professional",
//         confidence: "Moderate",
//         clarity: "Good",
//         keywords: ["experience", "passionate", "team", "solutions", "skills"],
//         insights: [
//           "Demonstrates relevant professional experience",
//           "Shows enthusiasm for the role and company",
//           "Communicates clearly and professionally",
//           "Uses appropriate technical vocabulary",
//         ],
//         scores: {
//           enthusiasm: 75,
//           confidence: 70,
//           clarity: 80,
//           professionalism: 85,
//         },
//         communicationStrengths: [
//           "Clear articulation and professional delivery",
//           "Appropriate use of technical terminology",
//           "Confident self-presentation",
//         ],
//         areasForImprovement: [
//           "Could reduce use of filler words",
//           "More specific examples would strengthen the presentation",
//         ],
//         overallAssessment:
//           "The candidate demonstrates strong communication skills with professional delivery and clear articulation. Shows good confidence and enthusiasm for the role.",
//       };
//     }

//     return NextResponse.json(analysis);
//   } catch (error) {
//     console.error("Video analysis error:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to analyze video",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

// // Extract audio using ffmpeg
// async function extractAudio(videoPath: string, audioPath: string): Promise<void> {
//   const exec = util.promisify(require("child_process").exec);
//   const command = `ffmpeg -y -i "${videoPath}" -vn -acodec flac "${audioPath}"`;
//   await exec(command);
// }

// Transcribe using Python Whisper server
// async function transcribeWithWhisper(audioFilePath: string): Promise<string> {
//   const fileStream = fs.createReadStream(audioFilePath);
//   const form = new FormData();
//   form.append("file", fileStream, path.basename(audioFilePath));

//   const response = await fetch("http://localhost:5001/transcribe", {
//     method: "POST",
//     body: form as any,
//   });

//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(`Whisper server error: ${errorText}`);
//   }

//   const data = await response.json();
//   return data.transcript || "Transcript could not be extracted.";
// }




// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     const { candidateId, videoFilename } = await request.json();

//     if (!candidateId || !videoFilename) {
//       return NextResponse.json({ error: "Missing data" }, { status: 400 });
//     }
    
//     const response = await fetch("http://127.0.0.1:5001/analyze-video", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ candidateId, videoFilename }),
//     });
  
//     if (!response.ok) {
//       console.log("Response not ok:", response.status, response.statusText);
//       const errText = await response.text();
//       return NextResponse.json({ error: "Python API failed", details: errText }, { status: 500 });
//     }
//     console.log("res2")
//     const analysis = await response.json();
//     console.log(analysis);
//     return NextResponse.json(analysis);
//   } catch (err) {
//     console.error("Route TS error:", err);
//     return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
//   }
// }




// app/api/analyze/route.ts

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function buildPrompt(transcript: string): string {
  return `
You are an expert HR assistant that analyzes video introductions from job candidates. Analyze the following video transcript and provide a comprehensive assessment.

Video Transcript: "${transcript}"

Please analyze the candidate's communication and provide a detailed JSON response with the following structure:
{
  "transcript": "${transcript}",
  "tone": "one of: Enthusiastic, Friendly, Nervous, Professional, Casual, Formal, Robotic",
  "confidence": "one of: High, Moderate, Low", 
  "clarity": "one of: Excellent, Good, Fair, Poor",
  "keywords": ["array of 5-8 important keywords and phrases from the speech"],
  "insights": ["array of 4-6 detailed observations about communication style, strengths, and areas for improvement"],
  "scores": {
    "enthusiasm": number (0-100),
    "confidence": number (0-100),
    "clarity": number (0-100), 
    "professionalism": number (0-100)
  },
  "communicationStrengths": ["array of 3-4 specific communication strengths"],
  "areasForImprovement": ["array of 2-3 areas where communication could be enhanced"],
  "overallAssessment": "2-3 sentence summary of the candidate's communication effectiveness"
}`;
}

function extractJSON(text: string): any {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON block found in response.");
  return JSON.parse(match[0]);
}

export async function POST(request: NextRequest) {
  try {
    const { candidateId, videoFilename } = await request.json();
    if (!candidateId || !videoFilename) {
      return NextResponse.json({ error: "Missing candidateId or videoFilename" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/get-candidate-videos?candidateId=${candidateId}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch candidate videos" }, { status: 500 });
    }

    const data = await res.json();
    const videos = data.videos || [];
    const video = videos.find((v: any) => v.filename === videoFilename);

    if (!video || !video.transcript) {
      return NextResponse.json({ error: "Transcript not found for this video" }, { status: 404 });
    }

    const prompt = buildPrompt(video.transcript);

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonResponse = extractJSON(text);

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Analyze error:", error);
    return NextResponse.json({ error: "Failed to analyze video", detail: error.message }, { status: 500 });
  }
}
