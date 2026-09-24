import {
  Droplets,
  Eye,
  Gauge,
  MapPin,
  Sunrise,
  Sunset,
  Wind,
} from 'lucide-react'
import type { WeatherData } from '../../api/weatherApi'
import type { ReactNode } from 'react'

interface WeatherCardProps {
  weather: WeatherData
}

function formatTime(timestamp: number, timezone: number) {
  const localTime = new Date((timestamp + timezone) * 1000)

  return localTime.toLocaleTimeString('en-IN', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />

              <h2 className="text-xl font-semibold">
                {weather.city}, {weather.country}
              </h2>
            </div>

            <p className="mt-2 text-sm capitalize text-blue-50">
              {weather.description}
            </p>

            <div className="mt-5 flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="h-24 w-24"
              />

              <div>
                <p className="text-5xl font-bold">
                  {Math.round(weather.temperature)}°C
                </p>

                <p className="mt-1 text-sm text-blue-50">
                  Feels like {Math.round(weather.feelsLike)}°C
                </p>
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-sm text-blue-50">
              Condition
            </p>

            <p className="mt-1 text-2xl font-bold">
              {weather.condition}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-3">
        <WeatherInfo
          icon={<Droplets size={20} />}
          label="Humidity"
          value={`${weather.humidity}%`}
        />

        <WeatherInfo
          icon={<Wind size={20} />}
          label="Wind"
          value={`${(weather.windSpeed * 3.6).toFixed(1)} km/h`}
        />

        <WeatherInfo
          icon={<Gauge size={20} />}
          label="Pressure"
          value={`${weather.pressure} hPa`}
        />

        <WeatherInfo
          icon={<Eye size={20} />}
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
        />

        <WeatherInfo
          icon={<Sunrise size={20} />}
          label="Sunrise"
          value={formatTime(weather.sunrise, weather.timezone)}
        />

        <WeatherInfo
          icon={<Sunset size={20} />}
          label="Sunset"
          value={formatTime(weather.sunset, weather.timezone)}
        />
      </div>
    </div>
  )
}

interface WeatherInfoProps {
  icon: ReactNode
  label: string
  value: string
}

function WeatherInfo({ icon, label, value }: WeatherInfoProps) {
  return (
    <div className="bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 text-lg font-bold text-slate-800">
        {value}
      </p>
    </div>
  )
}

export default WeatherCard  


