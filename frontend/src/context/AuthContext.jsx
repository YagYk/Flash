import React, { createContext, useContext, useState, useEffect } from 'react'
import { setAuthToken, setTokenSetter } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    localStorage.removeItem('token')
    setTokenSetter(setToken)
  }, [])

  useEffect(() => {
    if (token) {
      setAuthToken(token)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser({ username: payload.sub })
      } catch (error) {
        console.error('Error decoding token:', error)
        logout()
      }
    } else {
      setAuthToken(null)
      setUser(null)
    }
  }, [token])

  const login = (newToken) => {
    setToken(newToken)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 