import { useEffect, useRef } from "react"
import Player from "./Player"

export default function FloatingPlayer({ cancionActiva, onClose }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      onClose?.() // Llama a la función para cerrar
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [onClose])

  if (!cancionActiva) return null

  return (
<div
  ref={containerRef}
  className="fixed left-1/2 transform -translate-x-1/2 animate__animated animate__fadeInDown w-[90%] max-w-md z-50"
>
      <Player
        src={cancionActiva.src}
        title={cancionActiva.title}
        artist={cancionActiva.artist}
        coverImage={cancionActiva.coverImage}
        autoPlay={true}
      />
    </div>
  )
}
