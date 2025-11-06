"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Camera, Fingerprint, Shield, AlertCircle, Play, Pause } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  sentence: string
  image: string
}

const teamMembers: TeamMember[] = [
  {
    id: "001",
    name: "Alex Morgan",
    role: "Lead Developer",
    sentence: "10 Years of Code",
    image: "/professional-developer-portrait.png",
  },
  {
    id: "002",
    name: "Jordan Lee",
    role: "Design Director",
    sentence: "8 Years of Pixels",
    image: "/creative-designer-portrait.png",
  },
  {
    id: "003",
    name: "Sam Rivera",
    role: "Product Manager",
    sentence: "12 Years of Strategy",
    image: "/business-professional-portrait.png",
  },
  {
    id: "004",
    name: "Casey Chen",
    role: "Tech Lead",
    sentence: "15 Years of Innovation",
    image: "/tech-leader-portrait.png",
  },
  {
    id: "005",
    name: "Taylor Brooks",
    role: "UX Specialist",
    sentence: "7 Years of Experience",
    image: "/ux-designer-portrait.png",
  },
]

export function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying])

  const currentMember = teamMembers[currentIndex]

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.05),transparent),linear-gradient(180deg,rgba(0,0,0,0.1),transparent_50%,rgba(0,0,0,0.1))]" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,currentColor_3px,currentColor_4px)]" />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,transparent,transparent_3px,currentColor_3px,currentColor_4px)]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-16 bg-[repeating-linear-gradient(45deg,#000_0,#000_30px,#ffeb3b_30px,#ffeb3b_60px)] opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 border-2 border-primary bg-primary/20 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-primary" />
            <p className="font-mono text-xs tracking-widest text-primary font-bold">INMATE REGISTRY • CLASSIFIED</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-balance drop-shadow-lg">
            The <span className="text-primary">Lineup</span>
          </h2>
          <p className="text-muted-foreground mt-4 font-mono text-sm tracking-wide">MAXIMUM SECURITY PERSONNEL</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Top Navigation Controls */}
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={isAnimating}
              className="h-12 w-12 border-4 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={togglePlay}
                className="h-12 w-12 border-4 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={isAnimating}
              className="h-12 w-12 border-4 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <Card className="bg-card border-4 border-border overflow-hidden shadow-2xl relative">
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-destructive px-3 py-1 border-2 border-background">
                <Camera className="w-3 h-3 animate-pulse text-destructive-foreground" />
                <span className="font-mono text-xs tracking-widest text-destructive-foreground font-bold">LIVE</span>
              </div>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square bg-muted border-r-4 border-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/50" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent)]" />

                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-primary/20 border-r-4 border-primary/50 backdrop-blur-sm">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 border-t-2 border-primary/40"
                        style={{ top: `${(i + 1) * 10}%` }}
                      >
                        <span className="absolute right-2 -translate-y-1/2 text-[10px] font-mono text-primary font-bold">
                          {8 - i}ft
                        </span>
                      </div>
                    ))}
                    <div className="absolute top-1/2 left-0 right-0 border-t-4 border-destructive" />
                  </div>

                  {/* Photo */}
                  <img
                    src={currentMember.image || "/placeholder.svg"}
                    alt={currentMember.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground p-6 border-t-4 border-background">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-xs tracking-widest opacity-80 mb-1">PRISONER ID</p>
                        <p className="font-mono text-3xl font-bold tracking-wider">#{currentMember.id}</p>
                      </div>
                      <Fingerprint className="w-12 h-12 opacity-50" />
                    </div>
                  </div>

                  <div
                    className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-destructive to-transparent opacity-70 blur-sm"
                    style={{
                      animation: "scan-line 3s ease-in-out infinite",
                    }}
                  />

                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-destructive/30" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-destructive/30" />
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-between bg-card relative">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                  <div className="relative z-10">
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4 bg-destructive/10 px-3 py-2 border-l-4 border-destructive">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <p className="font-mono text-xs tracking-widest text-destructive font-bold">
                          CLASSIFIED PERSONNEL
                        </p>
                      </div>

                      <h3 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight drop-shadow-sm">
                        {currentMember.name}
                      </h3>

                      <p className="text-xl text-primary font-mono tracking-wide font-bold">{currentMember.role}</p>
                    </div>

                    <div className="space-y-6 border-l-4 border-primary pl-6 bg-muted/30 py-4 pr-4">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">SENTENCE</p>
                        <p className="text-lg font-bold text-foreground">{currentMember.sentence}</p>
                      </div>

                      <div className="border-t-2 border-border pt-4">
                        <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">STATUS</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                          <p className="text-lg font-bold text-destructive">ACTIVELY SERVING</p>
                        </div>
                      </div>

                      <div className="border-t-2 border-border pt-4">
                        <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">FACILITY</p>
                        <p className="text-lg font-bold text-foreground">PAD PARTY HQ • BLOCK A</p>
                      </div>

                      <div className="border-t-2 border-border pt-4">
                        <p className="font-mono text-xs text-muted-foreground mb-2 tracking-widest">CLEARANCE</p>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" />
                          <p className="text-lg font-bold text-primary">LEVEL 5 • MAXIMUM</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation Controls - Keep for larger screens */}
                  <div className="flex items-center justify-between mt-8 pt-8 border-t-2 border-border relative z-10">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevSlide}
                      disabled={isAnimating}
                      className="h-14 w-14 border-4 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary hidden md:flex"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>

                    <div className="flex gap-3">
                      {teamMembers.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (!isAnimating) {
                              setIsAnimating(true)
                              setCurrentIndex(index)
                              setTimeout(() => setIsAnimating(false), 500)
                            }
                          }}
                          className={`h-3 transition-all duration-300 border-2 ${
                            index === currentIndex
                              ? "w-12 bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                              : "w-3 bg-transparent border-border hover:border-primary"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      disabled={isAnimating}
                      className="h-14 w-14 border-4 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary hidden md:flex"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-6 flex justify-center px-4">
              <div className="bg-card border-2 border-border px-4 py-3 w-full max-w-md">
                <div className="flex gap-[2px] mb-2 justify-center">
                  {Array.from({ length: 50 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-foreground"
                      style={{
                        height: isClient ? `${Math.random() * 25 + 15}px` : "20px",
                        opacity: isClient ? Math.random() * 0.6 + 0.4 : 0.7,
                      }}
                    />
                  ))}
                </div>
                <p className="font-mono text-xs text-center text-muted-foreground tracking-widest">
                  PRISONER-{currentMember.id}-2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-[repeating-linear-gradient(-45deg,#000_0,#000_30px,#ffeb3b_30px,#ffeb3b_60px)] opacity-20" />
    </section>
  )
}
