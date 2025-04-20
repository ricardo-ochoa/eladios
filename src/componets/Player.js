"use client"

import 'animate.css';
import { useState, useRef, useEffect } from "react"
import { Pause, Play } from "lucide-react"

export default function Player({ src, title, artist, coverImage, autoPlay = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showGradient, setShowGradient] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showFullProgress, setShowFullProgress] = useState(false)
  const audioRef = useRef(null)

  // Autoplay y cleanup
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {})
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setIsPlaying(false)
        setShowGradient(false)
      }
    }
  }, [src, autoPlay])

  // Delay para activar el gradient-shadow
  useEffect(() => {
    let timeout
    if (isPlaying) {
      timeout = setTimeout(() => setShowGradient(true), 100)
    } else {
      setShowGradient(false)
    }
    return () => clearTimeout(timeout)
  }, [isPlaying])

  const togglePlayPause = (e) => {
    e.stopPropagation()
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleClickPlayer = () => {
    setShowFullProgress(!showFullProgress)
  }

  return (
    <div className={`gradient-shadow ${showGradient ? "active-shadow" : ""} transition-all`}>
      <div
        onClick={handleClickPlayer}
        className="flex flex-col items-center bg-gray-950 text-white p-4 rounded-md w-full max-w-md cursor-pointer"
      >
        {/* Barra inferior delgada */}
        {!showFullProgress && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 rounded-b overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            ></div>
          </div>
        )}

        <div className="flex items-center w-full z-10">
          <div className="h-15 w-15 relative mr-3">
            <img
              src={coverImage || "/placeholder.svg"}
              alt={`${title} cover`}
              className="object-cover rounded-sm w-14 h-14"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{title}</div>
            <div className="text-xs text-gray-400 truncate">{artist}</div>
          </div>

          <div className="flex items-center gap-3 ml-2">
            <button
              onClick={togglePlayPause}
              className="p-1 hover:bg-gray-800 rounded-full z-20"
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>

        {/* Barra completa solo si showFullProgress */}
        {showFullProgress && (
          <div className="w-full mt-3 z-10">
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
    </div>
  )
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}
