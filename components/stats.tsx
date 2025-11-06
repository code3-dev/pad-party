"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Code, Users, Clock } from "lucide-react"

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed", icon: TrendingUp },
  { value: 50, suffix: "K+", label: "Lines of Code", icon: Code },
  { value: 99, suffix: "%", label: "Client Satisfaction", icon: Users },
  { value: 24, suffix: "/7", label: "Support Available", icon: Clock },
]

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [isClient, setIsClient] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    stats.forEach((stat, index) => {
      let currentStep = 0
      const increment = stat.value / steps

      const timer = setInterval(() => {
        currentStep++
        setCounts((prev) => {
          const newCounts = [...prev]
          newCounts[index] = Math.min(Math.round(increment * currentStep), stat.value)
          return newCounts
        })

        if (currentStep >= steps) {
          clearInterval(timer)
        }
      }, interval)
    })
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.1)_2px,transparent_2px)] bg-[size:40px_40px]" />

      <div className="absolute inset-0 opacity-15">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-3 bg-primary-foreground shadow-[2px_0_10px_rgba(0,0,0,0.3)]"
            style={{
              left: `${i * 5}%`,
              animation: `bars-slide ${3 + i * 0.2}s linear infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute top-8 left-8 flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 border-2 border-primary-foreground/50">
        <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
        <p className="font-mono text-xs tracking-widest font-bold">LIVE STATISTICS</p>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 border-2 border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm">
            <p className="font-mono text-xs tracking-widest font-bold">BY THE NUMBERS • VERIFIED DATA</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-balance drop-shadow-lg">Our Record</h2>
          <p className="text-primary-foreground/80 mt-4 font-mono text-sm tracking-wide">
            MAXIMUM SECURITY PERFORMANCE METRICS
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`text-center transition-all duration-1000 bg-primary-foreground/10 backdrop-blur-sm p-6 border-4 border-primary-foreground/30 hover:border-primary-foreground/60 hover:bg-primary-foreground/20 group relative ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-primary-foreground" />
                <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-primary-foreground" />
                <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-primary-foreground" />
                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-primary-foreground" />

                <div className="flex justify-center mb-3">
                  <Icon className="w-8 h-8 opacity-70 group-hover:scale-110 transition-transform" />
                </div>

                <div className="mb-4">
                  <span className="text-5xl md:text-7xl font-bold font-mono tracking-tighter drop-shadow-lg">
                    {counts[index]}
                  </span>
                  <span className="text-3xl md:text-5xl font-bold">{stat.suffix}</span>
                </div>
                <p className="text-sm md:text-base font-mono tracking-wide opacity-90 font-bold">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 px-4">
          <div className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 px-4 py-4 w-full max-w-md">
            <div className="flex gap-[2px] mb-2 justify-center">
              {Array.from({ length: 70 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary-foreground"
                  style={{
                    height: isClient ? `${Math.random() * 35 + 25}px` : "30px",
                    opacity: isClient ? Math.random() * 0.6 + 0.4 : 0.7,
                  }}
                />
              ))}
            </div>
            <p className="font-mono text-xs text-center tracking-widest opacity-80">FACILITY-PP-2025-STATS-VERIFIED</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none" />
    </section>
  )
}
