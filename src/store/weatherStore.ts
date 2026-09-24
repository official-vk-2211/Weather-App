import { create } from 'zustand'
import {
  getWeatherByCity,
  type WeatherData,
} from '../api/weatherApi'

interface WeatherState {
  weather: WeatherData | null
  isLoading: boolean
  error: string | null
  lastFetchedCity: string | null
  lastFetchedAt: number | null

  fetchWeather: (city: string) => Promise<void>
  clearWeatherError: () => void
}

const CACHE_DURATION = 5 * 60 * 1000

export const useWeatherStore = create<WeatherState>((set, get) => ({
  weather: null,
  isLoading: false,
  error: null,
  lastFetchedCity: null,
  lastFetchedAt: null,

  fetchWeather: async (city) => {
    const trimmedCity = city.trim()

    if (!trimmedCity) {
      set({
        error: 'Please enter a city name',
        isLoading: false,
      })
      return
    }

    const { lastFetchedCity, lastFetchedAt } = get()

    const isSameCity =
      lastFetchedCity?.toLowerCase() === trimmedCity.toLowerCase()

    const isCacheValid =
      lastFetchedAt !== null &&
      Date.now() - lastFetchedAt < CACHE_DURATION

    if (isSameCity && isCacheValid) {
      return
    }

    set({
      isLoading: true,
      error: null,
    })

    try {
      const weatherData = await getWeatherByCity(trimmedCity)

      set({
        weather: weatherData,
        isLoading: false,
        error: null,
        lastFetchedCity: trimmedCity,
        lastFetchedAt: Date.now(),
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong while fetching weather'

      set({
        weather: null,
        isLoading: false,
        error: message,
      })
    }
  },

  clearWeatherError: () => {
    set({
      error: null,
    })
  },
}))