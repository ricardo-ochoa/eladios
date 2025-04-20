"use client"

import { useState, useEffect } from "react"
import { SkipBackIcon as Backspace } from "lucide-react"
import Player from "./Player"
import ListaDePalabrasEncontradas from "./ListaDePalabrasEncontradas"
import 'animate.css';
import FloatingPlayer from "./FlotingPlayer"


const PALABRAS_VALIDAS = [
  "ELADIOS", "DIOS", "LA", "DI", "DIO",
  "LADOS", "ADIOS", "ADS", "EL", "LADO",
  "ELDOS", "ELDIOS", "LIOS", "LAOS", "ELDOS", "IOS", "LADIO",
  "ELADIO"
]

const CANCIONES = {
  ELADIOS: {
    src: "/beats/beat2.mp3",
    title: "El Adiós / Ela Dios",
    artist: "Eladio Carrión",
    coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  ELADIO: {
    src: "/beats/beat2.mp3",
    title: "El Adiós / Ela Dios",
    artist: "Eladio",
    coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  DIOS: {
    src: "/beats/beat2.mp3",
    title: "DIOS",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LA: {
    src: "/beats/beat2.mp3",
    title: "L.A.",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  DI: {
    src: "/beats/beat2.mp3",
    title: "DI",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  DIO: {
    src: "/beats/beat2.mp3",
    title: "Dió",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LADOS: {
    src: "/beats/beat2.mp3",
    title: "LADO(S)",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LADO: {
    src: "/beats/beat2.mp3",
    title: "LADO(S)",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  ADIOS: {
    src: "/beats/beat2.mp3",
    title: "ADIOS",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  ADS: {
    src: "/beats/beat2.mp3",
    title: "Ads",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  EL: {
    src: "/beats/beat2.mp3",
    title: "EL",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  ELDOS: {
    src: "/beats/beat2.mp3",
    title: "EL DOS",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  ELDIOS: {
    src: "/beats/beat2.mp3",
    title: "EL DIOS",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LIOS: {
    src: "/beats/beat2.mp3",
    title: "Líos",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LAOS: {
    src: "/beats/beat2.mp3",
    title: "Laos",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  IOS: {
    src: "/beats/beat2.mp3",
    title: "iOS",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LADIO: {
    src: "/beats/beat2.mp3",
    title: "La dió",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  }
}


export default function Game() {
  const TARGET_WORD = "ELADIOS"

  const [inputLetters, setInputLetters] = useState([])
  const [palabrasEncontradas, setPalabrasEncontradas] = useState([])
  const [palabraReciente, setPalabraReciente] = useState(null)
  const [palabrasAntes, setPalabrasAntes] = useState([])
  const [cancionActiva, setCancionActiva] = useState(null)
  const [teclaAnimada, setTeclaAnimada] = useState(null)
  const [animacionError, setAnimacionError] = useState(false)


  const handleKeyPress = (key) => {
    if (key === "DELETE") {
      setInputLetters((prev) => prev.slice(0, -1))
    } else if (key === "ENTER") {
      const palabra = inputLetters.join("")
      const yaExiste = palabrasEncontradas.includes(palabra)
    
      setPalabraReciente(palabra)
      setPalabrasAntes(palabrasEncontradas)
    
      if (PALABRAS_VALIDAS.includes(palabra) && !yaExiste) {
        setPalabrasEncontradas((prev) => [...prev, palabra])
        setAnimacionError(false)
      } else if (!PALABRAS_VALIDAS.includes(palabra)) {
        setAnimacionError(true)
        setTimeout(() => setAnimacionError(false), 500)
      }
    
      setInputLetters([])
    }
     else if (key.length === 1 && /^[A-Z]$/.test(key)) {
      setTeclaAnimada(key)
      setInputLetters((prev) =>
        prev.length < TARGET_WORD.length ? [...prev, key] : prev
      )
    }
  }

  useEffect(() => {
    if (teclaAnimada) {
      const timeout = setTimeout(() => setTeclaAnimada(null), 400)
      return () => clearTimeout(timeout)
    }
  }, [teclaAnimada])

  const isLetterGuessed = (letter, index) => {
    return inputLetters[index] === letter
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        handleKeyPress("DELETE")
      } else if (e.key === "Enter") {
        handleKeyPress("ENTER")
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase())
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [inputLetters, palabrasEncontradas])

  return (
    <div className="h-dvh w-full flex justify-center items-center flex-col py-10 overflow-hidden">

    {cancionActiva && (
      <div className="animate__animated animate__fadeInDown max-w-md w-full">
<FloatingPlayer
  cancionActiva={cancionActiva}
  onClose={() => setCancionActiva(null)}
/>


      </div>
    )}


      <div className="flex-1 flex flex-col items-center justify-center">
      <div className={`flex gap-2 mb-4 ${animacionError ? 'animate__animated animate__headShake' : ''}`}>
        {TARGET_WORD.split("").map((letra, index) => {
          const guessed = inputLetters.includes(letra)
          const bgColor = guessed ? "bg-green-600" : "bg-gray-800"
          const textColor = guessed ? "text-white" : "text-gray-400"
          const animateClass = guessed ? "animate__animated animate__pulse" : ""

          return (
            <div
              key={index}
              className={`w-12 h-12 border border-gray-600 flex items-center justify-center text-2xl font-bold ${bgColor} ${textColor} ${animateClass}`}
            >
              {letra}
            </div>
          )
        })}
      </div>



        {palabrasEncontradas.length > 0 && (
          <div className="mt-2 text-white text-center">
            <h3 className="text-lg font-semibold">Canciones:</h3>
            <ListaDePalabrasEncontradas
              palabras={palabrasEncontradas}
              palabraReciente={palabraReciente}
              palabrasAntes={palabrasAntes}
              activa={Object.keys(CANCIONES).find(k => CANCIONES[k] === cancionActiva)} // nombre de palabra activa
              onPlay={(palabra) => {
                if (cancionActiva && CANCIONES[palabra] === cancionActiva) {
                  setCancionActiva(null) // Toggle: cerrar si ya está abierta
                } else if (CANCIONES[palabra]) {
                  setCancionActiva(CANCIONES[palabra])
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-center gap-1">
          <button
            onClick={() => handleKeyPress("ENTER")}
            className="px-2 py-4 bg-gray-700 rounded text-white font-bold w-20"
          >
            ENTER
          </button>

          {TARGET_WORD.split("").map((key, index) => {
            const isAnimating = teclaAnimada === key
            const animationClass = isAnimating ? "animate__animated animate__bounceIn" : ""

            return (
              <button
                key={index}
                onClick={() => handleKeyPress(key)}
                className={`w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xl font-bold ${animationClass} cursor-pointer hover:bg-gray-800`}
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
