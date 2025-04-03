import { create } from "zustand"
import axios from "axios"

const API_BASE_URL = "http://localhost:5000/api"

export const useBenefitsStore = create((set, get) => ({
  benefits: [],
  selectedBenefit: null,
  loading: false,
  error: null,
  searchTerm: "",
  searchStatus: "all",
  currentPage: 1,
  itemsPerPage: 2,

  fetchBenefits: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get(`${API_BASE_URL}/beneficios`)
      if (response.data && !response.data.error) {
        set({ benefits: response.data.body || [] })
      } else {
        set({ error: "Error al cargar los beneficios: " + (response.data?.message || "Respuesta inválida") })
      }
    } catch (error) {
      console.error("Error fetching benefits:", error)
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          set({ error: "No se pudo conectar al servidor. Verifica que el backend esté en ejecución." })
        } else if (error.response) {
          set({ error: `Error ${error.response.status}: ${error.response.data?.message || error.message}` })
        } else {
          set({ error: `Error de red: ${error.message}` })
        }
      } else {
        set({ error: "Error desconocido al conectar con el servidor" })
      }
    } finally {
      set({ loading: false })
    }
  },

  fetchBenefitById: async (id) => {
    set({ loading: true, error: null, selectedBenefit: null })
    try {
      const response = await axios.get(`${API_BASE_URL}/beneficios/${id}`)
      if (response.data && !response.data.error) {
        set({ selectedBenefit: response.data.body })
      } else {
        set({ error: "Beneficio no encontrado: " + (response.data?.message || "Respuesta inválida") })
      }
    } catch (error) {
      console.error("Error fetching benefit details:", error)
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_NETWORK") {
          set({ error: "No se pudo conectar al servidor. Verifica que el backend esté en ejecución." })
        } else if (error.response) {
          set({ error: `Error ${error.response.status}: ${error.response.data?.message || error.message}` })
        } else {
          set({ error: `Error de red: ${error.message}` })
        }
      } else {
        set({ error: "Error desconocido al conectar con el servidor" })
      }
    } finally {
      set({ loading: false })
    }
  },

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchStatus: (status) => set({ searchStatus: status }),
  setCurrentPage: (page) => set({ currentPage: page }),
}))

