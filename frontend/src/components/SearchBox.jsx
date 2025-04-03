"use client"

import { useState } from "react"
import { useBenefitsStore } from "../store/benefitsStore"
import { Search } from "lucide-react"

const SearchBox = () => {
  const { searchTerm, setSearchTerm, searchStatus, setSearchStatus } = useBenefitsStore()
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(localSearchTerm)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-20">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Buscar Beneficios</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del beneficio
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder="Buscar por nombre..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              aria-label="Buscar beneficios"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            id="status"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            aria-label="Filtrar por estado"
          >
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label="Buscar"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}

export default SearchBox

