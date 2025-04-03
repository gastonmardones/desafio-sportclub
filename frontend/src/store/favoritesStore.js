import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (id) => {
        const { favorites } = get()
        const isFavorite = favorites.includes(id)

        if (isFavorite) {
          set({ favorites: favorites.filter((favId) => favId !== id) })
        } else {
          set({ favorites: [...favorites, id] })
        }
      },

      isFavorite: (id) => {
        return get().favorites.includes(id)
      },
    }),
    {
      name: "sportclub-favorites",
      // You can use IndexedDB instead of localStorage
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          return JSON.parse(str)
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
    },
  ),
)

