import { Hero } from "@/components/hero"
import { TeamSlider } from "@/components/team-slider"
import { About } from "@/components/about"
import { MusicPlayer } from "@/components/music-player"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <div id="team">
        <TeamSlider />
      </div>
      <About />
      <MusicPlayer />
      <Stats />
      <Footer />
    </main>
  )
}
