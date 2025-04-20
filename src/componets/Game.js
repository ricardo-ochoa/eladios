"use client"

import { useState, useEffect } from "react"
import { SkipBackIcon as Backspace } from "lucide-react"
import Player from "./Player"

export default function Game() {
  const TARGET_WORD = "ELADIOS"
  const WORD_LENGTH = TARGET_WORD.length

  const [guessedLetters, setGuessedLetters] = useState(new Set())

  const handleKeyPress = (key) => {
    if (key === "DELETE") {
      const newGuessedLetters = new Set(guessedLetters)
      const lastLetter = Array.from(newGuessedLetters).pop()
      if (lastLetter) {
        newGuessedLetters.delete(lastLetter)
        setGuessedLetters(newGuessedLetters)
      }
    } else if (key.length === 1 && /^[A-Z]$/.test(key)) {
      const newGuessedLetters = new Set(guessedLetters)
      newGuessedLetters.add(key)
      setGuessedLetters(newGuessedLetters)
    }
  }

  const isLetterGuessed = (letter) => {
    return guessedLetters.has(letter)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        handleKeyPress("DELETE")
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase())
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [guessedLetters])

  return (
    <div className="h-dvh w-full flex justify-center items-center flex-col py-10 overflow-hidden">

      <Player 
      src="/beats/beat2.mp3"
        title="EL ADIOS"
        artist="Mora y Orny de Oro"
        coverImage="https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif" />

      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-2">
          {TARGET_WORD.split("").map((letter, index) => {
            const isGuessed = isLetterGuessed(letter)
            const bgColor = isGuessed ? "bg-green-600" : "bg-gray-800"
            const textColor = isGuessed ? "text-white" : "text-gray-400"

            return (
              <div
                key={index}
                className={`w-12 h-12 border border-gray-600 flex items-center justify-center text-2xl font-bold ${bgColor} ${textColor}`}
              >
                {letter}
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-center gap-1">
          <button onClick={() => {}} className="px-2 py-4 bg-gray-700 rounded text-white font-bold w-20">
            ENTER
          </button>
          {TARGET_WORD.split("").map((key) => {
            const isGuessed = isLetterGuessed(key)
            const bgColor = isGuessed ? "bg-green-600" : "bg-gray-700"

            return (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`w-12 h-12 ${bgColor} rounded flex items-center justify-center text-xl font-bold`}
              >
                {key}
              </button>
            )
          })}
          <button
            onClick={() => handleKeyPress("DELETE")}
            className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center"
          >
            <Backspace className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
