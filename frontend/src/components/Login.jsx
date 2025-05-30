import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Zap, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { authAPI } from '../services/api'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login } = useAuth()
  const { toggleTheme, isDark } = useTheme()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    console.log('🔐 Starting login process...')
    
    try {
      const formDataEncoded = new URLSearchParams()
      formDataEncoded.append('username', formData.username)
      formDataEncoded.append('password', formData.password)

      console.log('📡 Sending login request to backend...')
      const response = await authAPI.login(formDataEncoded)
      
      console.log('✅ Login successful, received token')
      login(response.data.access_token)
      
      console.log('🚀 Navigating to dashboard...')
      navigate('/dashboard')
    } catch (error) {
      console.error('❌ Login error:', error)
      setError(error.response?.data?.detail || 'Login failed')
    } finally {
      setIsLoading(false)
      console.log('🏁 Login process completed')
    }
  }

  return (
    <div className="auth-container">
      <button 
        onClick={toggleTheme} 
        className="theme-toggle"
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10
        }}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Zap size={32} color="var(--accent-color)" />
          </div>
          <h1 className="auth-title">Welcome to Flash</h1>
          <p className="auth-subtitle">Lightning-fast AI notes that spark brilliance</p>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>Signing In...</>
            ) : (
              <>
                <LogIn size={16} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/signup">Create one</Link>
        </div>
      </div>
    </div>
  )
}

export default Login 