// src/api/index.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://192.168.0.89:5001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Token'] = token
    config.headers['Authorization'] = `Bearer ${token}` // Add both for compatibility
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token)
    }
    return response.data
  },
  (error) => {
    // Handle errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject({
      code: error.response?.status || 500,
      message: error.response?.data?.message || '网络错误',
      errors: error.response?.data?.errors,
    })
  },
)

export default api
