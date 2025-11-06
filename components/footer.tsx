"use client"

import { useState, useEffect } from "react"
import { Lock, Shield, AlertTriangle } from "lucide-react"

export function Footer() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <footer className="bg-card border-t-4 border-border py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="absolute top-0 left-0 right-0 flex justify-around">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-1 h-1 bg-muted-foreground/30 rotate-45 -translate-y-1" />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary border-4 border-background flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                PAD <span className="text-primary">PARTY</span>
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed font-medium">
              Maximum security team delivering minimum compromises.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-primary/10 px-3 py-2 border-l-4 border-primary">
              <Shield className="w-4 h-4 text-primary" />
              <p className="font-mono text-xs tracking-widest text-primary font-bold">FACILITY PP-2025</p>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-sm tracking-widest mb-4 text-primary font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-muted-foreground group-hover:bg-primary transition-colors" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-muted-foreground group-hover:bg-primary transition-colors" />
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-muted-foreground group-hover:bg-primary transition-colors" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm tracking-widest mb-4 text-primary font-bold">CONTACT</h4>
            <div className="space-y-3 bg-muted/30 p-4 border-l-4 border-primary">
              <p className="text-muted-foreground leading-relaxed font-medium">
                <span className="font-mono text-xs tracking-widest block mb-1 text-foreground">EMAIL</span>
                info@padparty.com
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">
                <span className="font-mono text-xs tracking-widest block mb-1 text-foreground">PHONE</span>
                (555) 123-4567
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-sm text-muted-foreground font-bold tracking-wide">
              © 2025 PAD PARTY. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-3 bg-card border-2 border-border px-4 py-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
              <p className="font-mono text-xs text-foreground tracking-wider font-bold">SYSTEM OPERATIONAL • SECURE</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center px-4">
          <div className="flex gap-[2px]">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-muted-foreground"
                style={{
                  height: isClient ? `${Math.random() * 15 + 10}px` : "12px",
                  opacity: isClient ? Math.random() * 0.4 + 0.3 : 0.5,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
