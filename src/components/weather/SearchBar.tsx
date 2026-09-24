import { useState } from 'react'
import type { FormEvent } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (city: string) => void
  isLoading: boolean
}

function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [city, setCity] = useState('')
  const [error, setError] = useState('') 

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!city.trim()) {
        setError('Please enter a city name')
        return
    }

    setError('')
    onSearch(city.trim())
    setCity('')
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
            type="text"
            value={city}
            onChange={(event) => {
            setCity(event.target.value)
            setError('')
            }}
            placeholder="Search city..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {error && (
            <p className="mt-1 text-sm text-red-600">
            {error}
            </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Search size={18} />

        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar  


