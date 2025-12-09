const TOKEN_KEY = 'azc_token'
const USER_KEY = 'azc_user'

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export interface StoredUser {
  id?: string | number
  username?: string
  displayName?: string
  role?: string
}

export function setUser(user: StoredUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getUser(): StoredUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredUser
  } catch (error) {
    console.warn('Failed to parse user from storage', error)
    return null
  }
}

export function clearUser() {
  localStorage.removeItem(USER_KEY)
}

