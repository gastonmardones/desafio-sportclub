"use client"

import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {useBenefitsStore} from "../store/benefitsStore"
import {useFavoritesStore} from "../store/favoritesStore"
import SearchBox from "./SearchBox"
import Pagination from "./Pagination"
import LoadingSpinner from "./LoadingSpinner"
import {formatDate} from "../utils/formatters"
import {Heart} from "lucide-react"

const BenefitsList = () => {
    const {
        benefits,
        loading,
        error,
        fetchBenefits,
        searchTerm,
        searchStatus,
        currentPage,
        setCurrentPage,
        itemsPerPage,
    } = useBenefitsStore()

    const {favorites, toggleFavorite} = useFavoritesStore()
    const [filteredBenefits, setFilteredBenefits] = useState(benefits)

    useEffect(() => {
        fetchBenefits()
    }, [fetchBenefits])

    useEffect(() => {
        if (benefits.length > 0) {
            let filtered = [...benefits]

            // Filter by search term
            if (searchTerm) {
                filtered = filtered.filter(
                    (benefit) =>
                        benefit.comercio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        benefit.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
                )
            }

            // Filter by status (active/inactive)
            if (searchStatus !== "all") {
                const today = new Date()
                filtered = filtered.filter((benefit) => {
                    const vencimiento = new Date(benefit.vencimiento)
                    const isActive = vencimiento >= today
                    return searchStatus === "active" ? isActive : !isActive
                })
            }

            setFilteredBenefits(filtered)
            setCurrentPage(1) // Reset to first page when filters change
        }
    }, [benefits, searchTerm, searchStatus, setCurrentPage])

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredBenefits.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(filteredBenefits.length / itemsPerPage)

    if (loading) return <LoadingSpinner/>

    if (error)
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-red-600 mb-4">Error de conexión</h2>
                <p className="text-red-500 mb-4">{error}</p>
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                    <h3 className="font-semibold mb-2">Posibles soluciones:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Verifica que el servidor backend esté en ejecución</li>
                        <li>Comprueba que la URL del API sea correcta en el archivo benefitsStore.js</li>
                        <li>Asegúrate que el backend tenga CORS habilitado</li>
                    </ul>
                </div>
                <button
                    onClick={() => fetchBenefits()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Reintentar
                </button>
            </div>
        )

    const handleFavoriteClick = (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(id)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
                <SearchBox/>
            </div>

            <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Beneficios Disponibles</h1>
                </div>

                {currentItems.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-500">No se encontraron beneficios con los filtros seleccionados.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map((benefit) => {
                                const isActive = new Date(benefit.vencimiento) >= new Date()
                                const isFavorite = favorites.includes(benefit.id)

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
                                                    <div
                                                        className="w-full h-full flex items-center justify-center text-gray-400">Sin
                                                        imagen</div>
                                                )}

                                                <div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                <button
                                                    onClick={(e) => handleFavoriteClick(e, benefit.id)}
                                                    className={`absolute top-3 right-3 p-2 rounded-full ${
                                                        isFavorite
                                                            ? "bg-red-500 text-white"
                                                            : "bg-white/80 text-gray-600 opacity-0 group-hover:opacity-100"
                                                    } transition-all duration-300 hover:scale-110`}
                                                    aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                                                >
                                                    <Heart className={isFavorite ? "fill-white" : ""} size={18}/>
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
                                                    <span
                                                        className="text-blue-600 font-bold">{benefit.descuento}% OFF</span>
                                                    <span
                                                        className="text-xs text-gray-500">Vence: {formatDate(benefit.vencimiento)}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
                    </>
                )}
            </div>
        </div>
    )
}

export default BenefitsList

