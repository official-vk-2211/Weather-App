const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export interface WeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  condition: string
  description: string
  icon: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  sunrise: number
  sunset: number
  timezone: number
}

export async function getWeatherByCity(
  city: string,
): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('Weather API key is missing')
  }

  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found')
    }

    if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.')
    }

    throw new Error('Unable to fetch weather data')
  }

  const data = await response.json()

  return {
    city: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    condition: data.weather[0].main,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    visibility: data.visibility,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    timezone: data.timezone,
  }
}