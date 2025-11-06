"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic,
  Radio,
  Music2,
  Disc3,
  Lock,
  Shield,
} from "lucide-react"

// Define the track interface
interface Track {
  id: number
  title: string
  artist: string
  duration: string
  cellBlock: string
  audioUrl: string
}

const initialTracks: Track[] = [
  {
    id: 1,
    title: "Lockdown Protocol",
    artist: "Pad Party",
    duration: "3:45",
    cellBlock: "A-101",
    audioUrl: "https://dl.mokhtalefmusic.com/music/1403/09/21/Amir%20Tataloo%20-%20Navazesh%202.mp3",
  },
  {
    id: 2,
    title: "Maximum Security",
    artist: "Pad Party",
    duration: "4:12",
    cellBlock: "B-205",
    audioUrl: "https://dl.mokhtalefmusic.com/music/1403/09/21/Amir%20Tataloo%20-%20Navazesh%202.mp3",
  },
  {
    id: 3,
    title: "Breakout Beats",
    artist: "Pad Party",
    duration: "3:28",
    cellBlock: "C-312",
    audioUrl: "https://dl.mokhtalefmusic.com/music/1403/09/21/Amir%20Tataloo%20-%20Navazesh%202.mp3",
  },
  {
    id: 4,
    title: "Facility Frequencies",
    artist: "Pad Party",
    duration: "5:01",
    cellBlock: "D-418",
    audioUrl: "https://dl.mokhtalefmusic.com/music/1403/09/21/Amir%20Tataloo%20-%20Navazesh%202.mp3",
  },
  {
    id: 5,
    title: "Surveillance Sound",
    artist: "Pad Party",
    duration: "3:55",
    cellBlock: "E-523",
    audioUrl: "https://dl.mokhtalefmusic.com/music/1403/09/21/Amir%20Tataloo%20-%20Navazesh%202.mp3",
  },
]

export function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [tracks, setTracks] = useState<Track[]>(initialTracks)
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (audio.duration) {
        setCurrentTime(audio.currentTime)
        setProgress((audio.currentTime / audio.duration) * 100)
      }
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setAudioError(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }

    const handleError = () => {
      setAudioError(true)
      setIsPlaying(false)
      console.log("[Pad] Audio failed to load:", track.audioUrl)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("error", handleError)

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateProgress)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("error", handleError)
    }
  }, [isPlaying, currentTrack])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio || audioError) return

    if (isPlaying) {
      audio.pause()
    } else {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("[Pad] Play failed:", error)
          setAudioError(true)
        })
      }
    }
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    const audio = audioRef.current
    if (isShuffle) {
      setCurrentTrack(Math.floor(Math.random() * tracks.length))
    } else {
      setCurrentTrack((prev) => (prev + 1) % tracks.length)
    }
    setProgress(0)
    setCurrentTime(0)
    setAudioError(false)
    if (audio) {
      audio.currentTime = 0
      if (isPlaying) {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("[Pad] Play failed:", error)
            setAudioError(true)
          })
        }
      }
    }
  }

  const handlePrevious = () => {
    const audio = audioRef.current
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setProgress(0)
    setCurrentTime(0)
    setAudioError(false)
    if (audio) {
      audio.currentTime = 0
      if (isPlaying) {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("[Pad] Play failed:", error)
            setAudioError(true)
          })
        }
      }
    }
  }

  const handleTrackSelect = (index: number) => {
    const audio = audioRef.current
    setCurrentTrack(index)
    setProgress(0)
    setCurrentTime(0)
    setShowPlaylist(false)
    setAudioError(false)
    if (audio) {
      audio.currentTime = 0
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log("[Pad] Play failed:", error)
            setAudioError(true)
          })
      }
    }
  }

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio || !audio.duration || audioError) return

    const newTime = (value[0] / 100) * audio.duration
    audio.currentTime = newTime
    setProgress(value[0])
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    setVolume(value[0])
    audio.volume = value[0] / 100
    setIsMuted(false)
  }

  const handleMuteToggle = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume / 100
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  // Function to format time from seconds to MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Function to fetch duration from audio file
  const fetchTrackDuration = async (track: Track): Promise<string> => {
    return new Promise((resolve) => {
      const audio = new Audio(track.audioUrl)
      
      const handleLoadedMetadata = () => {
        const duration = audio.duration || 0
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.remove()
        resolve(formatTime(duration))
      }
      
      const handleError = () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('error', handleError)
        audio.remove()
        resolve(track.duration) // fallback to initial duration
      }
      
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('error', handleError)
      audio.load()
    })
  }

  // Fetch all track durations on component mount
  useEffect(() => {
    const fetchAllDurations = async () => {
      const updatedTracks = await Promise.all(
        initialTracks.map(async (track) => {
          const duration = await fetchTrackDuration(track)
          return { ...track, duration }
        })
      )
      setTracks(updatedTracks)
    }
    
    if (isClient) {
      fetchAllDurations()
    }
  }, [isClient])

  const track = tracks[currentTrack]

  return (
    <section id="music" className="relative py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary),0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--primary),0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.05)_2px,transparent_2px)] bg-[size:40px_40px]" />

      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-1 bg-primary animate-pulse"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <audio key={currentTrack} ref={audioRef} src={track.audioUrl} preload="metadata" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-card/90 backdrop-blur-sm px-8 py-4 border-4 border-primary mb-6 shadow-[0_0_30px_rgba(var(--primary),0.3)]">
            <Radio className="w-6 h-6 text-primary animate-pulse" />
            <span className="font-mono text-base tracking-widest text-primary font-bold">
              AUDIO SURVEILLANCE SYSTEM
            </span>
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
            FACILITY <span className="text-primary drop-shadow-[0_0_20px_rgba(var(--primary),0.5)]">RECORDS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
            CLASSIFIED AUDIO FILES FROM THE PAD PARTY ARCHIVES
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border-4 border-primary p-10 shadow-[0_0_50px_rgba(var(--primary),0.3)] transition-all duration-300 hover:shadow-[0_0_80px_rgba(var(--primary),0.4)]">
            {audioError && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-destructive/95 text-destructive-foreground px-6 py-3 border-2 border-destructive-foreground shadow-lg z-20 animate-in fade-in-0 slide-in-from-top-4 duration-500">
                <span className="font-mono text-sm font-bold">
                  ⚠ AUDIO FILE NOT FOUND - ADD FILES TO /public/audio/
                </span>
              </div>
            )}

            <div className="absolute top-6 right-6 flex items-center gap-3 bg-destructive/95 px-4 py-2 border-2 border-destructive-foreground shadow-lg">
              <div className="w-3 h-3 bg-destructive-foreground rounded-full animate-pulse" />
              <span className="font-mono text-sm text-destructive-foreground font-bold tracking-wider">LIVE REC</span>
            </div>

            <div className="absolute top-6 left-6 flex items-center gap-2 bg-primary/20 backdrop-blur-sm px-4 py-2 border-2 border-primary">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-primary font-bold">AUTHORIZED</span>
            </div>

            <div className="mb-10 text-center pt-8">
              <div className="inline-flex items-center justify-center w-40 h-40 mb-8 bg-gradient-to-br from-primary/30 to-primary/10 border-4 border-primary relative shadow-[0_0_40px_rgba(var(--primary),0.4)] transition-all duration-300 hover:scale-105">
                <Disc3
                  className={`w-20 h-20 text-primary transition-all duration-300 ${isPlaying ? "animate-spin" : ""}`}
                  style={{ animationDuration: "3s" }}
                />
                <div className="absolute -top-3 -right-3 bg-card border-3 border-primary px-3 py-2 shadow-lg">
                  <span className="font-mono text-sm font-bold">{track.cellBlock}</span>
                </div>
                {isPlaying && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 border-2 border-primary-foreground">
                    <span className="font-mono text-xs text-primary-foreground font-bold">PLAYING</span>
                  </div>
                )}
              </div>
              <h3 className="text-4xl font-bold mb-3 tracking-tight">{track.title}</h3>
              <p className="text-muted-foreground font-mono text-base tracking-widest mb-4">
                ARTIST: {track.artist.toUpperCase()}
              </p>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 border border-primary">
                <span className="font-mono text-xs text-primary">
                  TRACK {String(currentTrack + 1).padStart(2, "0")} / {String(tracks.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="mb-8 px-4">
              <div className="relative">
                <Slider
                  value={[progress]}
                  onValueChange={handleProgressChange}
                  max={100}
                  step={0.1}
                  className="cursor-pointer"
                />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-primary/30 blur-md -translate-y-1/2 pointer-events-none transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 font-mono text-sm text-muted-foreground">
                <span className="bg-card/50 px-2 py-1 border border-primary/30">{formatTime(currentTime)}</span>
                <span className="bg-card/50 px-2 py-1 border border-primary/30">{formatTime(duration || 0)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 mb-8">
              <Button
                size="icon"
                variant="outline"
                onClick={handlePrevious}
                className="w-14 h-14 border-3 border-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]"
              >
                <SkipBack className="w-6 h-6" />
              </Button>

              <Button
                size="icon"
                onClick={handlePlayPause}
                disabled={audioError}
                className="w-20 h-20 bg-primary hover:bg-primary/90 text-primary-foreground border-4 border-primary shadow-[0_0_30px_rgba(var(--primary),0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(var(--primary),0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={handleNext}
                className="w-14 h-14 border-3 border-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]"
              >
                <SkipForward className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t-2 border-primary/30">
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`transition-all duration-300 hover:scale-110 ${
                    isShuffle ? "text-primary bg-primary/20 border-2 border-primary" : "hover:bg-primary/10"
                  }`}
                >
                  <Shuffle className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`transition-all duration-300 hover:scale-110 ${
                    isRepeat ? "text-primary bg-primary/20 border-2 border-primary" : "hover:bg-primary/10"
                  }`}
                >
                  <Repeat className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleMuteToggle}
                  className="shrink-0 hover:scale-110 transition-all duration-300"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  className="flex-1"
                />
                <span className="font-mono text-xs text-muted-foreground w-10 text-right min-w-[40px]">{isMuted ? 0 : volume}%</span>
              </div>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`transition-all duration-300 hover:scale-110 ${
                  showPlaylist ? "text-primary bg-primary/20 border-2 border-primary" : "hover:bg-primary/10"
                }`}
              >
                <ListMusic className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-8 flex items-end justify-center gap-1 h-20 bg-card/50 border-2 border-primary/30 p-4">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-primary to-primary/50 transition-all duration-100 ${
                    isPlaying ? "animate-pulse" : "opacity-20"
                  }`}
                  style={{
                    height: isClient && isPlaying ? `${20 + Math.random() * 80}%` : "20%",
                    animationDelay: `${i * 0.03}s`,
                    animationDuration: isClient ? `${0.3 + Math.random() * 0.5}s` : "0.5s",
                  }}
                />
              ))}
            </div>
          </div>

          {showPlaylist && (
            <div className="mt-8 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border-4 border-primary p-8 shadow-[0_0_50px_rgba(var(--primary),0.3)] animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-primary/30">
                <Music2 className="w-6 h-6 text-primary" />
                <h3 className="font-mono text-xl font-bold tracking-wider">TRACK LISTING</h3>
                <div className="ml-auto bg-primary/20 px-3 py-1 border border-primary">
                  <span className="font-mono text-xs text-primary">{tracks.length} TRACKS</span>
                </div>
              </div>
              <div className="space-y-3">
                {tracks.map((t, index) => (
                  <button
                    key={t.id}
                    onClick={() => handleTrackSelect(index)}
                    className={`w-full text-left p-5 border-2 transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:scale-[1.02] hover:shadow-lg ${
                      currentTrack === index
                        ? "border-primary bg-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                        : "border-muted"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-5">
                        <span
                          className={`font-mono text-base w-10 ${
                            currentTrack === index ? "text-primary font-bold" : "text-muted-foreground"
                          }`}
                        >
                          #{String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-bold text-lg mb-1">{t.title}</p>
                          <p className="text-sm text-muted-foreground font-mono tracking-wide">{t.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 sm:ml-auto">
                        <span
                          className={`font-mono text-xs px-3 py-2 border-2 ${
                            currentTrack === index
                              ? "bg-primary/30 border-primary text-primary font-bold"
                              : "bg-primary/10 border-primary/50"
                          }`}
                        >
                          {t.cellBlock}
                        </span>
                        <span className="font-mono text-base text-muted-foreground min-w-[60px] text-right">
                          {t.duration}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
