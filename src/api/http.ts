import axios from 'axios'
import { clearToken, clearUser } from '../utils/auth'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('azc_token')
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
      clearUser()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default http

