import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { Camper, Filters } from '@/types'

export const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
})

interface CampersStore {
  campers: Camper[]
  page: number
  limit: number
  filters: Partial<Filters>

  favorites: string[]

  loadCampers: () => Promise<void>
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  applyFilters: () => Promise<void>
  resetFilters: () => void

  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

export const useCampersStore = create<CampersStore>()(
  persist(
    (set, get) => ({
      campers: [],
      page: 1,
      limit: 4,
      filters: {},

      favorites: [],

      setFilter: (key, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
        })),

      resetFilters: () =>
        set({
          filters: {},
          campers: [],
          page: 1,
        }),

      loadCampers: async () => {
        const { page, limit, campers, filters } = get()

        const response = await api.get('/campers', {
          params: {
            page,
            limit,
            ...filters,
          },
        })

        set({
          campers: [...campers, ...response.data.items],
          page: page + 1,
        })
      },

      applyFilters: async () => {
        set({ campers: [], page: 1 })
        await get().loadCampers()
      },

      // FAVORITES
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),

      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'campers-favorites',
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
)
