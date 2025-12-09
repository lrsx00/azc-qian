import http from './http'

export interface UserInfo {
  id: string | number
  username: string
  displayName: string
  role: string
}

export interface LoginResponse {
  access_token: string
  user: UserInfo
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  return http.post<LoginResponse>('/auth/login', { username, password }, {
    headers: { 'Content-Type': 'application/json' },
  })
}

