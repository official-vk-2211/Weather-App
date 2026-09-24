import { create } from 'zustand'
import type {
  AuthSession,
  LoginCredentials,
  RegisterData,
  User,
} from '../types/auth'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '../utils/storage'

const USERS_KEY = 'weather_app_users'
const SESSION_KEY = 'weather_app_session'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean

  initializeAuth: () => void
  register: (data: RegisterData) => { success: boolean; message: string }
  login: (data: LoginCredentials) => { success: boolean; message: string }
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  initializeAuth: () => {
    const session = getStorageItem<AuthSession>(SESSION_KEY)

    if (!session) {
      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      })
      return
    }

    const users = getStorageItem<User[]>(USERS_KEY) ?? []
    const currentUser = users.find((user) => user.id === session.userId)

    if (!currentUser) {
      removeStorageItem(SESSION_KEY)

      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      })
      return
    }

    set({
      user: currentUser,
      isAuthenticated: true,
      isInitialized: true,
    })
  },

  register: (data) => {
    const users = getStorageItem<User[]>(USERS_KEY) ?? []

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === data.email.trim().toLowerCase(),
    )

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists',
      }
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    }

    setStorageItem(USERS_KEY, [...users, newUser])

    return {
      success: true,
      message: 'Registration successful',
    }
  },

  login: (data) => {
    const users = getStorageItem<User[]>(USERS_KEY) ?? []

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === data.email.trim().toLowerCase() &&
        item.password === data.password,
    )

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      }
    }

    const session: AuthSession = {
      userId: user.id,
    }

    setStorageItem(SESSION_KEY, session)

    set({
      user,
      isAuthenticated: true,
      isInitialized: true,
    })

    return {
      success: true,
      message: 'Login successful',
    }
  },

  logout: () => {
    removeStorageItem(SESSION_KEY)

    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    })
  },
}))

