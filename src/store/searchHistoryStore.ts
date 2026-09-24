import { create } from 'zustand'
import {
  getStorageItem,
  setStorageItem,
} from '../utils/storage'

interface SearchHistoryState {
  history: string[]
  currentUserId: string | null

  loadHistory: (userId: string) => void
  addToHistory: (city: string) => void
  removeFromHistory: (city: string) => void
  clearHistory: () => void
}

const getHistoryKey = (userId: string) =>
  `weather_app_search_history_${userId}`

const MAX_HISTORY_ITEMS = 10

export const useSearchHistoryStore = create<SearchHistoryState>(
  (set, get) => ({
    history: [],
    currentUserId: null,

    loadHistory: (userId) => {
      const key = getHistoryKey(userId)
      const savedHistory = getStorageItem<string[]>(key) ?? []

      set({
        history: savedHistory,
        currentUserId: userId,
      })
    },

    addToHistory: (city) => {
      const { currentUserId, history } = get()

      if (!currentUserId) {
        return
      }

      const trimmedCity = city.trim()

      if (!trimmedCity) {
        return
      }

      const updatedHistory = [
        trimmedCity,
        ...history.filter(
          (item) => item.toLowerCase() !== trimmedCity.toLowerCase(),
        ),
      ].slice(0, MAX_HISTORY_ITEMS)

      setStorageItem(
        getHistoryKey(currentUserId),
        updatedHistory,
      )

      set({
        history: updatedHistory,
      })
    },

    removeFromHistory: (city) => {
      const { currentUserId, history } = get()

      if (!currentUserId) {
        return
      }

      const updatedHistory = history.filter(
        (item) => item.toLowerCase() !== city.toLowerCase(),
      )

      setStorageItem(
        getHistoryKey(currentUserId),
        updatedHistory,
      )

      set({
        history: updatedHistory,
      })
    },

    clearHistory: () => {
      const { currentUserId } = get()

      if (!currentUserId) {
        return
      }

      setStorageItem(
        getHistoryKey(currentUserId),
        [],
      )

      set({
        history: [],
      })
    },
  }),
)

