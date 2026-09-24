import type { LoginCredentials, RegisterData } from '../types/auth'

export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email.trim()) {
    return 'Email is required'
  }

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }

  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Password is required'
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }

  return null
}

export function validateLoginForm(
  data: LoginCredentials,
): Record<string, string> {
  const errors: Record<string, string> = {}

  const emailError = validateEmail(data.email)
  const passwordError = validatePassword(data.password)

  if (emailError) {
    errors.email = emailError
  }

  if (passwordError) {
    errors.password = passwordError
  }

  return errors
}

export function validateRegisterForm(
  data: RegisterData,
): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }

  const emailError = validateEmail(data.email)

  if (emailError) {
    errors.email = emailError
  }

  const passwordError = validatePassword(data.password)

  if (passwordError) {
    errors.password = passwordError
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
} 


