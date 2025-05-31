import axios from 'axios'

// API Base URL - Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: API_BASE_URL,
})

let currentToken = null
let tokenSetter = null

export const setAuthToken = (token) => {
  currentToken = token
}

export const setTokenSetter = (setter) => {
  tokenSetter = setter
}

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      currentToken = null
      if (tokenSetter) {
        tokenSetter(null)
      }
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  register: (userData) => api.post('/register', userData),
  login: (formData) => api.post('/token', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export const notesAPI = {
  create: (noteData) => api.post('/notes', noteData),
  getAll: () => api.get('/notes'),
  getById: (id) => api.get(`/notes/${id}`),
  delete: (id) => api.delete(`/notes/${id}`)
}

export default api 