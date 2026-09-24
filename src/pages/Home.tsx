import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import SearchBar from '../components/weather/SearchBar'
import WeatherCard from '../components/weather/WeatherCard'
import { useSearchHistoryStore } from '../store/searchHistoryStore'
import { useAuthStore } from '../store/authStore'
import { useWeatherStore } from '../store/weatherStore'

const DEFAULT_CITY = 'Kochi'

function Home() {
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.user)

  const weather = useWeatherStore((state) => state.weather)
  const isLoading = useWeatherStore((state) => state.isLoading)
  const error = useWeatherStore((state) => state.error)
  const fetchWeather = useWeatherStore((state) => state.fetchWeather)

  const history = useSearchHistoryStore((state) => state.history)
  const loadHistory = useSearchHistoryStore((state) => state.loadHistory)
  const addToHistory = useSearchHistoryStore((state) => state.addToHistory)
  const removeFromHistory = useSearchHistoryStore(
    (state) => state.removeFromHistory,
  )
  const clearHistory = useSearchHistoryStore(
    (state) => state.clearHistory,
  )

  useEffect(() => {
    if (!user) {
      return
    }

    loadHistory(user.id)
    fetchWeather(DEFAULT_CITY)
  }, [user, loadHistory, fetchWeather])

  const handleSearch = async (city: string) => {
    await fetchWeather(city)

    const currentWeather = useWeatherStore.getState().weather
    const currentError = useWeatherStore.getState().error

    if (currentWeather && !currentError) {
      addToHistory(currentWeather.city)
      navigate(`/weather/${encodeURIComponent(currentWeather.city)}`)
    }
  }

  const handleHistoryClick = async (city: string) => {
    await fetchWeather(city)

    const currentWeather = useWeatherStore.getState().weather
    const currentError = useWeatherStore.getState().error

    if (currentWeather && !currentError) {
      navigate(`/weather/${encodeURIComponent(currentWeather.city)}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Good to see you, {user?.name} 👋
          </h2>

          <p className="mt-2 text-slate-500">
            Search any city to check the latest weather.
          </p>
        </div>

        <div className="mb-6">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading && !weather && (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
            <p className="font-medium text-slate-700">
              Loading weather...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please wait a moment.
            </p>
          </div>
        )}

        {weather && !isLoading && (
          <WeatherCard weather={weather} />
        )}

        <section className="mt-8 rounded-3xl bg-white p-5 shadow-lg sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Search History
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Your recently searched cities
              </p>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={clearHistory}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="rounded-2xl bg-slate-50 p-5 text-center text-sm text-slate-500">
              No search history yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {history.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-2 py-2"
                >
                  <button
                    type="button"
                    onClick={() => handleHistoryClick(city)}
                    className="text-sm font-medium text-slate-700 hover:text-blue-600"
                  >
                    {city}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFromHistory(city)}
                    className="rounded-lg px-2 py-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${city} from search history`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Home  


