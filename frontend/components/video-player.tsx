"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Download, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface VideoPlayerProps {
  videoUrl: string
  videoName: string
  candidateId: number
  videoFilename: string
  onAnalyze: (filename: string) => void
  isAnalyzing: boolean
  hasAnalysis: boolean
}

export function VideoPlayer({
  videoUrl,
  videoName,
  candidateId,
  videoFilename,
  onAnalyze,
  isAnalyzing,
  hasAnalysis,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = videoUrl
    link.download = videoFilename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{videoName}</CardTitle>
          <div className="flex items-center space-x-2">
            {hasAnalysis && (
              <Badge variant="outline" className="text-xs text-green-600">
                <Brain className="h-3 w-3 mr-1" />
                Analyzed
              </Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {videoFilename}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-64 object-contain"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={(e) => {
              console.log("Video loading error:", e)
              // Handle video loading error gracefully
            }}
            preload="metadata"
          />

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={togglePlay}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleMute}
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button
              size="sm"
              onClick={() => onAnalyze(videoFilename)}
              disabled={isAnalyzing}
              className={hasAnalysis ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isAnalyzing ? (
                <>
                  <Brain className="h-4 w-4 mr-1 animate-spin" />
                  Analyzing...
                </>
              ) : hasAnalysis ? (
                <>
                  <Brain className="h-4 w-4 mr-1" />
                  Re-analyze
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-1" />
                  Analyze Video
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
