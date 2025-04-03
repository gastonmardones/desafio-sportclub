"use client"

import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useBenefitsStore } from "../store/benefitsStore"
import { useFavoritesStore } from "../store/favoritesStore"
import LoadingSpinner from "./LoadingSpinner"
import { formatDate } from "../utils/formatters"
import { Heart, ArrowLeft, Calendar, Tag, MapPin, Info, CreditCard, DollarSign } from "lucide-react"

const BenefitDetail = () => {
  const { id } = useParams()
  const { selectedBenefit, loading, error, fetchBenefitById } = useBenefitsStore()
  const { favorites, toggleFavorite } = useFavoritesStore()

  useEffect(() => {
    if (id) {
      fetchBenefitById(Number.parseInt(id))
    }
  }, [id, fetchBenefitById])

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

  if (!selectedBenefit)
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>No se encontró el beneficio solicitado.</p>
        <Link to="/beneficios" className="text-blue-600 hover:underline mt-4 inline-block">
          Volver a la lista
        </Link>
      </div>
    )

  const isActive = new Date(selectedBenefit.vencimiento) >= new Date()
  const isFavorite = favorites.includes(selectedBenefit.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/beneficios" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} />
          <span>Volver</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100">
          {selectedBenefit.imagenes && selectedBenefit.imagenes.length > 0 ? (
            <img
              src={selectedBenefit.imagenes[0].url || "/placeholder.svg"}
              alt={selectedBenefit.comercio}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
          )}

          <div className="absolute top-4 right-4">
            <button
              onClick={() => toggleFavorite(selectedBenefit.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              } transition-colors shadow-sm`}
              aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <Heart className={isFavorite ? "fill-white" : ""} size={20} />
              {isFavorite ? "Favorito" : "Agregar a favoritos"}
            </button>
          </div>

          <div className="absolute top-4 left-4">
            <div
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                isActive ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {isActive ? "Activo" : "Inactivo"}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedBenefit.comercio}</h1>
            <p className="text-gray-600">{selectedBenefit.descripcion}</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Tag className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Descuento</p>
                <p className="font-bold text-blue-600">{selectedBenefit.descuento}% OFF</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <Calendar className="text-gray-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Vencimiento</p>
                <p className="font-medium">{formatDate(selectedBenefit.vencimiento)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
              <MapPin className="text-gray-600" size={20} />
              <div>
                <p className="text-sm text-gray-500">Categoría</p>
                <p className="font-medium capitalize">{selectedBenefit.categoria_general}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info size={20} />
                Detalles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Medios de pago aceptados</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBenefit.efectivo && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        <DollarSign size={16} />
                        Efectivo
                      </div>
                    )}
                    {selectedBenefit.tarjeta && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                        <CreditCard size={16} />
                        Tarjeta
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Subcategoría</h3>
                  <p className="capitalize">{selectedBenefit.categoria_simple.replace(/-/g, " ")}</p>
                </div>
              </div>
            </div>

            {selectedBenefit.aclaratoria && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Aclaraciones</h3>
                <div className="p-4 bg-yellow-50 rounded-lg text-gray-700">{selectedBenefit.aclaratoria}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BenefitDetail

