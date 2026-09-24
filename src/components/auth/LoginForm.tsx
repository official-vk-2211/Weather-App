import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import {
  validateEmail,
  validatePassword,
} from '../../utils/validation'

function LoginForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  // const [isLoading, setIsLoading] = useState(false)

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setServerError('')

    const newErrors: Record<string, string> = {}

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError) {
      newErrors.email = emailError
    }

    if (passwordError) {
      newErrors.password = passwordError
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    // try {
    //   const result = await login({
    //     email,
    //     password,
    //   })

    //   if (!result.success) {
    //     setServerError(result.message)
    //     return
    //   }

    //   navigate('/')
    // } catch {
    //   setServerError('Something went wrong. Please try again.')
    // } finally {
    //   setIsLoading(false)
    // }

    const result = login({
      email,
      password,
    })

    if (!result.success) {
      setServerError(result.message)
      return
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <LogIn size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your Weather App account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {serverError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            // disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm 

// we commented some line that will be use if we call real backend/API login   


