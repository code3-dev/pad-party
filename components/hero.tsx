"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Lock, AlertTriangle } from "lucide-react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_50%),linear-gradient(180deg,rgba(0,0,0,0.1)_0%,transparent_20%,transparent_80%,rgba(0,0,0,0.1)_100%)]" />

      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-4 bg-gradient-to-r from-foreground/80 via-foreground to-foreground/80 shadow-[2px_0_8px_rgba(0,0,0,0.5)]"
            style={{
              left: `${i * 4}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent blur-sm"
          style={{
            animation: "scan-line 4s ease-in-out infinite",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block mb-6 px-8 py-3 border-4 border-primary bg-card/80 backdrop-blur-md shadow-2xl relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive animate-pulse rounded-full" />
            <div className="flex items-center gap-4">
              <Lock className="w-5 h-5 text-primary" />
              <p className="font-mono text-sm tracking-widest text-foreground font-bold">FACILITY ID: PP-2025-MAX</p>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter text-balance relative">
            <span className="inline-block relative drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              PAD
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-destructive animate-pulse border-2 border-background" />
            </span>
            <br />
            <span className="text-primary drop-shadow-[0_0_30px_rgba(var(--primary),0.5)]">PARTY</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            Maximum security team locked in on excellence. Breaking barriers, not rules.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("team")}
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-mono tracking-wider group relative overflow-hidden border-2 border-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]"
            >
              <Lock className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">ENTER FACILITY</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("music")}
              className="text-lg px-10 py-7 border-4 border-primary font-mono tracking-wider hover:bg-primary hover:text-primary-foreground bg-transparent shadow-lg"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              VIEW RECORDS
            </Button>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-3 bg-card/50 backdrop-blur-sm px-6 py-3 border-2 border-destructive/50">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
              <p className="font-mono text-sm text-foreground tracking-wider font-bold">
                SYSTEM ACTIVE • SURVEILLANCE ON
              </p>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-muted-foreground/30 rotate-45" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.1)_2px,transparent_2px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
    </section>
  )
}
