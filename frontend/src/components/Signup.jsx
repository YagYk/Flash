import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Zap, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { authAPI } from '../services/api'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
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

    console.log('📝 Starting signup process...')

    if (formData.password !== formData.confirmPassword) {
      console.log('❌ Password mismatch')
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      console.log('📡 Sending registration request...')
      await authAPI.register({
        username: formData.username,
        password: formData.password
      })

      console.log('✅ Registration successful, auto-logging in...')
      // Auto-login after successful registration
      const formDataEncoded = new URLSearchParams()
      formDataEncoded.append('username', formData.username)
      formDataEncoded.append('password', formData.password)

      console.log('📡 Sending auto-login request...')
      const response = await authAPI.login(formDataEncoded)
      
      console.log('✅ Auto-login successful')
      login(response.data.access_token)
      
      console.log('🚀 Navigating to dashboard...')
      navigate('/dashboard')
    } catch (error) {
      console.error('❌ Signup error:', error)
      setError(error.response?.data?.detail || 'Registration failed')
    } finally {
      setIsLoading(false)
      console.log('🏁 Signup process completed')
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
          <h1 className="auth-title">Join Flash</h1>
          <p className="auth-subtitle">Start capturing lightning-fast insights with AI</p>
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
              placeholder="Choose a username"
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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>Creating Account...</>
            ) : (
              <>
                <UserPlus size={16} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup 