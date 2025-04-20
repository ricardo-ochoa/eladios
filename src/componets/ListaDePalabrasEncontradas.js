import PlayIcon from "./PlayIcon"
import XIcon from "./XIcon"

export default function ListaDePalabrasEncontradas({
  palabras,
  onPlay,
  palabraReciente,
  palabrasAntes,
  activa
}) {
  const bgColors = ["bg-zinc-700", "bg-zinc-600", "bg-neutral-500"]

  return (
    <div className="mt-4 w-full max-w-md text-white">
      <ul className="flex flex-wrap gap-3">
        {palabras.map((palabra, index) => {
          const esRepetida = palabra === palabraReciente && palabrasAntes.includes(palabra)
          const esNueva = palabra === palabraReciente && !palabrasAntes.includes(palabra)
          const estaActiva = activa === palabra

          let animacion = "animate__animated"
          if (esRepetida) animacion += " animate__bounce"
          else if (esNueva) animacion += " animate__fadeInDown"

          // Fondo base o verde si está activa
          const bgColor = estaActiva ? "bg-green-600" : bgColors[index % bgColors.length]

          return (
            <li
              key={`${palabra}-${index}`}
              onClick={() => onPlay?.(palabra)} // ✅ Toda la caja hace toggle
              className={`cursor-pointer ${animacion} ${bgColor} pl-4 pr-1 py-1 rounded-full text-md flex items-center justify-between`}
            >
              <span className="font-medium">{palabra}</span>

              {/* Ícono informativo (sin onClick) */}
              <div
                className="ml-4 bg-black bg-opacity-30 hover:bg-opacity-50 transition rounded-full p-1"
                title={estaActiva ? "Cerrar reproductor" : `Reproducir ${palabra}`}
              >
                {estaActiva ? <XIcon size={16} color="orange" /> : <PlayIcon size={16} color="orange" />}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
