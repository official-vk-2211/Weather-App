import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import WeatherCard from '../components/weather/WeatherCard'
import { useSearchHistoryStore } from '../store/searchHistoryStore'
import { useWeatherStore } from '../store/weatherStore'

function WeatherDetails() {
  const navigate = useNavigate()
  const { city } = useParams<{ city: string }>()

  const weather = useWeatherStore((state) => state.weather)
  const isLoading = useWeatherStore((state) => state.isLoading)
  const error = useWeatherStore((state) => state.error)
  const fetchWeather = useWeatherStore((state) => state.fetchWeather)

  const addToHistory = useSearchHistoryStore(
    (state) => state.addToHistory,
  )

  const decodedCity = city ? decodeURIComponent(city) : ''

  useEffect(() => {
    if (!decodedCity) {
      return
    }

    const currentWeather = useWeatherStore.getState().weather

    const isSameCity =
      currentWeather?.city.toLowerCase() === decodedCity.toLowerCase()

    if (isSameCity) {
      addToHistory(currentWeather.city)
      return
    }

    fetchWeather(decodedCity).then(() => {
      const latestWeather = useWeatherStore.getState().weather
      const latestError = useWeatherStore.getState().error

      if (latestWeather && !latestError) {
        addToHistory(latestWeather.city)
      }
    })
  }, [decodedCity, fetchWeather, addToHistory])

  const isCurrentCity =
    weather?.city.toLowerCase() === decodedCity.toLowerCase()

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Weather Details
          </h2>

          <p className="mt-2 text-slate-500">
            Current weather information for {decodedCity}.
          </p>
        </div>

        {isLoading && !isCurrentCity && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="font-semibold text-slate-700">
              Loading weather...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Fetching weather information for {decodedCity}.
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {weather && isCurrentCity && !isLoading && (
          <WeatherCard weather={weather} />
        )}
      </main>
    </div>
  )
}

export default WeatherDetails