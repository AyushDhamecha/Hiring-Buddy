"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, MessageCircle, TrendingUp, Volume2, Eye, CheckCircle, AlertCircle } from "lucide-react"

interface VideoAnalysisProps {
  analysis: {
    transcript: string
    tone: string
    confidence: string
    clarity: string
    keywords: string[]
    insights: string[]
    scores: {
      enthusiasm: number
      confidence: number
      clarity: number
      professionalism: number
    }
    communicationStrengths?: string[]
    areasForImprovement?: string[]
    overallAssessment?: string
  }
}

const getToneColor = (tone: string) => {
  switch (tone.toLowerCase()) {
    case "enthusiastic":
      return "bg-green-500"
    case "friendly":
      return "bg-blue-500"
    case "professional":
      return "bg-purple-500"
    case "nervous":
      return "bg-yellow-500"
    case "casual":
      return "bg-orange-500"
    case "formal":
      return "bg-gray-500"
    case "robotic":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getConfidenceColor = (confidence: string) => {
  switch (confidence.toLowerCase()) {
    case "high":
      return "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400"
    case "moderate":
      return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400"
    case "low":
      return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400"
    default:
      return "text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400"
  }
}

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-green-600"
  if (score >= 70) return "text-blue-600"
  if (score >= 55) return "text-yellow-600"
  return "text-red-600"
}

const getScoreLabel = (score: number) => {
  if (score >= 90) return "Outstanding"
  if (score >= 80) return "Very Good"
  if (score >= 70) return "Good"
  if (score >= 60) return "Fair"
  return "Needs Improvement"
}

export function VideoAnalysis({ analysis }: VideoAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      {analysis.overallAssessment && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <span>Overall Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{analysis.overallAssessment}</p>
          </CardContent>
        </Card>
      )}

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tone</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className={`text-white ${getToneColor(analysis.tone)}`}>{analysis.tone}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confidence</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge className={`${getConfidenceColor(analysis.confidence)} border-0`}>{analysis.confidence}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clarity</CardTitle>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{analysis.clarity}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Scores */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Communication Analysis Scores</span>
          </CardTitle>
          <CardDescription>AI-powered assessment of communication skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(analysis.scores).map(([metric, score]) => (
            <div key={metric} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">{metric}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}%</span>
                  <Badge variant="outline" className="text-xs">
                    {getScoreLabel(score)}
                  </Badge>
                </div>
              </div>
              <Progress value={score} className="w-full" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Strengths and Improvements */}
      <div className="grid gap-4 md:grid-cols-2">
        {analysis.communicationStrengths && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Communication Strengths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.communicationStrengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {analysis.areasForImprovement && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span>Areas for Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Transcript */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Video Transcript</span>
          </CardTitle>
          <CardDescription>AI-generated transcript of the video introduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/20 rounded-lg">
            <p className="text-sm leading-relaxed">{analysis.transcript}</p>
          </div>
        </CardContent>
      </Card>

      {/* Keywords */}
      <Card>
        <CardHeader>
          <CardTitle>Key Phrases & Keywords</CardTitle>
          <CardDescription>Important terms and phrases identified in the video</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Insights</span>
          </CardTitle>
          <CardDescription>Detailed analysis and observations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.insights.map((insight, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
