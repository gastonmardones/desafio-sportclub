"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useBenefitsStore } from "../store/benefitsStore"
import { useFavoritesStore } from "../store/favoritesStore"
import { formatDate } from "../utils/formatters"
import { Heart, ArrowLeft } from "lucide-react"
import LoadingSpinner from "./LoadingSpinner"

const FavoritesList = () => {
  const { benefits, loading, error, fetchBenefits } = useBenefitsStore()
  const { favorites, toggleFavorite } = useFavoritesStore()

  useEffect(() => {
    if (benefits.length === 0) {
      fetchBenefits()
    }
  }, [benefits.length, fetchBenefits])

  if (loading) return <LoadingSpinner />

  if (error)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
        <Link to="/beneficios" className="text-blue-600 hover:underline mt-4 inline-block">
          Volver a la lista
        </Link>
      </div>
    )

  const favoriteBenefits = benefits.filter((benefit) => favorites.includes(benefit.id))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/beneficios" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
          <span>Volver</span>
        </Link>
        <h1 className="text-2xl font-bold">Mis Beneficios Favoritos</h1>
      </div>

      {favoriteBenefits.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Heart className="mx-auto mb-4 text-gray-300" size={48} />
          <h2 className="text-xl font-semibold mb-2">No tienes favoritos</h2>
          <p className="text-gray-500 mb-6">Agrega beneficios a tus favoritos para verlos aquí</p>
          <Link to="/beneficios" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block">
            Explorar Beneficios
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteBenefits.map((benefit) => {
            const isActive = new Date(benefit.vencimiento) >= new Date()

            return (
              <div
                key={benefit.id}
                className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <Link
                  to={`/beneficios/${benefit.id}`}
                  className="block"
                  aria-label={`Ver detalles de ${benefit.comercio}`}
                >
                  <div className="relative h-48 bg-gray-100">
                    {benefit.imagenes && benefit.imagenes.length > 0 ? (
                      <img
                        src={benefit.imagenes[0].url || "/placeholder.svg"}
                        alt={benefit.comercio}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(benefit.id)
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-500 text-white transition-all duration-300 hover:scale-110"
                      aria-label="Quitar de favoritos"
                    >
                      <Heart className="fill-white" size={18} />
                    </button>

                    <div
                      className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md ${
                        isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {isActive ? "Activo" : "Inactivo"}
                    </div>
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-bold text-gray-800 mb-1">{benefit.comercio}</h2>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{benefit.descripcion}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">{benefit.descuento}% OFF</span>
                      <span className="text-xs text-gray-500">Vence: {formatDate(benefit.vencimiento)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FavoritesList

