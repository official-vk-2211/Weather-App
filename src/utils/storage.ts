export function getStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(key)

  if (!item) {
    return null
  }

  try {
    return JSON.parse(item) as T
  } catch {
    return null
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key)
} 

