"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Lock, Clock, Blocks, Users } from "lucide-react"

const features = [
  {
    title: "Locked In",
    description: "Committed to excellence with no escape from quality standards",
    icon: Lock,
  },
  {
    title: "Hard Time",
    description: "Putting in the hours to deliver exceptional results",
    icon: Clock,
  },
  {
    title: "Cell Block",
    description: "Building modular, scalable solutions brick by brick",
    icon: Blocks,
  },
  {
    title: "Yard Time",
    description: "Collaborative environment where ideas run free",
    icon: Users,
  },
]

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,0,0,0.1),transparent)]" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_25px,currentColor_25px,currentColor_50px)]" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-muted-foreground to-transparent opacity-30" />
      <div className="absolute top-0 left-0 right-0 flex justify-around">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-2 h-2 bg-muted-foreground/40 rotate-45 -translate-y-1" />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 border-2 border-primary bg-primary/20 backdrop-blur-sm">
            <p className="font-mono text-xs tracking-widest text-primary font-bold">FACILITY OVERVIEW • CLASSIFIED</p>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-balance drop-shadow-lg">
            Doing <span className="text-primary">Time</span> Right
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            We're not your average team. We're a collective of creative minds serving life sentences in innovation.
            Behind these digital bars, we craft experiences that break free from the ordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className={`p-8 border-4 border-border bg-card hover:border-primary transition-all duration-500 group relative overflow-hidden shadow-xl ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary/50" />

                <div className="relative z-10">
                  <div className="w-16 h-16 mb-4 bg-primary/10 border-2 border-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight font-mono">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>

                  <div className="mt-6 h-2 w-0 bg-primary group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 relative h-16 overflow-hidden border-y-4 border-border">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#000_0,#000_30px,#ffeb3b_30px,#ffeb3b_60px)] opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm">
            <p className="font-mono text-sm font-bold tracking-widest">
              ⚠ CAUTION • EXCELLENCE IN PROGRESS • CAUTION ⚠
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-muted-foreground to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 flex justify-around">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-2 h-2 bg-muted-foreground/40 rotate-45 translate-y-1" />
        ))}
      </div>
    </section>
  )
}
