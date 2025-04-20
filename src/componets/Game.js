"use client"

import { useState, useEffect } from "react"
import { SkipBackIcon as Backspace } from "lucide-react"
import Player from "./Player"
import ListaDePalabrasEncontradas from "./ListaDePalabrasEncontradas"
import 'animate.css';


const PALABRAS_VALIDAS = [
  "ELADIOS", "DIOS", "LA", "DI", "DIO",
  "LADOS", "ADIOS", "ADS", "EL",
  "ELDOS", "ELDIOS", "LIOS", "LAOS", "ELDOS"
]

const CANCIONES = {
  ELADIOS: {
    src: "/beats/beat2.mp3",
    title: "El Adiós",
    artist: "Eladio Carrión",
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
    title: "LA",
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
    title: "DIO",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LADOS: {
    src: "/beats/beat2.mp3",
    title: "LADOS",
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
    title: "ADS",
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
    title: "LIOS",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  },
  LAOS: {
    src: "/beats/beat2.mp3",
    title: "LAOS",
    artist: "Eladio Carrión",
     coverImage: "https://res.cloudinary.com/dnxxkvpiz/image/upload/v1644786085/yfn42c0ireosigvga9ag.gif"
  }
}


export default function Game() {
  const TARGET_WORD = "ELADIOS"

  const [inputLetters, setInputLetters] = useState([]) // orden real
  const [palabrasEncontradas, setPalabrasEncontradas] = useState([])
  const [palabraReciente, setPalabraReciente] = useState(null)
  const [palabrasAntes, setPalabrasAntes] = useState([])
  const [cancionActiva, setCancionActiva] = useState(null)


  const handleKeyPress = (key) => {
    if (key === "DELETE") {
      setInputLetters((prev) => prev.slice(0, -1))
    } else if (key === "ENTER") {
      const palabra = inputLetters.join("")
      const yaExiste = palabrasEncontradas.includes(palabra)
    
      setPalabraReciente(palabra) // siempre la última tecleada
      setPalabrasAntes(palabrasEncontradas) // guarda el listado actual
    
      if (
        PALABRAS_VALIDAS.includes(palabra) &&
        !yaExiste
      ) {
        setPalabrasEncontradas((prev) => [...prev, palabra])
      }
    
      setInputLetters([])
    } else if (key.length === 1 && /^[A-Z]$/.test(key)) {
      setInputLetters((prev) =>
        prev.length < TARGET_WORD.length ? [...prev, key] : prev
      )
    }
  }

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
      <div className="animate__animated animate__fadeInDown max-w-md w-full mb-4">
<Player
  src={cancionActiva.src}
  title={cancionActiva.title}
  artist={cancionActiva.artist}
  coverImage={cancionActiva.coverImage}
  autoPlay={true}
/>

      </div>
    )}

      <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-4">
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

          {TARGET_WORD.split("").map((key, index) => (
            <button
              key={index}
              onClick={() => handleKeyPress(key)}
              className={`w-12 h-12 bg-gray-700 rounded flex items-center justify-center text-xl font-bold`}
            >
              {key}
            </button>
          ))}

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
