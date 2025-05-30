import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { notesAPI } from '../services/api'
import { 
  LogOut, Plus, FileText, Trash2, Eye, Sparkles, Zap, Sun, Moon, 
  BookOpen, Search, Filter, Grid, List, TrendingUp, Clock, Star
} from 'lucide-react'
import NoteModal from './NoteModal'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme, isDark } = useTheme()
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const [selectedNote, setSelectedNote] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: ''
  })

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    setIsLoading(true)
    try {
      const response = await notesAPI.getAll()
      setNotes(response.data)
    } catch (error) {
      setError('Failed to fetch notes')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFormChange = (e) => {
    setNoteForm({
      ...noteForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateNote = async (e) => {
    e.preventDefault()
    if (!noteForm.title.trim() || !noteForm.content.trim()) {
      setError('Title and content are required')
      return
    }

    setIsCreating(true)
    setError('')

    try {
      const response = await notesAPI.create(noteForm)
      setNotes([response.data, ...notes])
      setNoteForm({ title: '', content: '' })
      setShowCreateForm(false)
    } catch (error) {
      setError('Failed to create note')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this flash?')) {
      return
    }

    try {
      await notesAPI.delete(noteId)
      setNotes(notes.filter(note => note.id !== noteId))
    } catch (error) {
      setError('Failed to delete note')
    }
  }

  const handleViewNote = (note) => {
    setSelectedNote(note)
    setShowModal(true)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-brand">
          <Zap size={24} />
          <span>Flash</span>
        </div>
        <div className="navbar-user">
          <span className="user-info">Welcome, {user?.username}</span>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={logout} className="btn-icon">
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Lightning-fast AI insights
              <Sparkles className="hero-icon" />
            </h1>
            <p className="hero-subtitle">
              Capture ideas at the speed of thought. Let AI transform your notes into brilliant insights.
            </p>
            <button 
              className="hero-cta"
              onClick={() => setShowCreateForm(true)}
            >
              <Plus size={20} />
              Create New Flash
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <TrendingUp className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{notes.length}</div>
                <div className="stat-label">Total Flashes</div>
              </div>
            </div>
            <div className="stat-card">
              <Clock className="stat-icon" />
              <div className="stat-content">
                <div className="stat-number">{notes.filter(n => n.summary).length}</div>
                <div className="stat-label">AI Summaries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="controls-section">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search your flashes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="view-controls">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {/* Notes Section */}
        <div className="notes-section">
          <div className="section-header">
            <h2 className="section-title">
              <BookOpen size={20} />
              Your Flashes
              {filteredNotes.length > 0 && <span className="count">({filteredNotes.length})</span>}
            </h2>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <Zap size={32} className="loading-icon" />
              <p>Loading your flashes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-illustration">
                <Zap size={64} />
              </div>
              <h3>No flashes yet</h3>
              <p>Create your first flash and watch AI work its magic!</p>
              <button 
                className="empty-cta"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus size={16} />
                Create Your First Flash
              </button>
            </div>
          ) : (
            <div className={`notes-grid ${viewMode}`}>
              {filteredNotes.map((note) => (
                <div key={note.id} className="note-card modern">
                  <div className="note-header">
                    <div className="note-info">
                      <h3 className="note-title">{note.title}</h3>
                      <p className="note-date">
                        <Clock size={12} />
                        {formatDate(note.created_at)}
                      </p>
                    </div>
                    <div className="note-actions">
                      <button
                        onClick={() => handleViewNote(note)}
                        className="btn-icon view"
                        title="View full flash"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="btn-icon delete"
                        title="Delete flash"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {note.summary && (
                    <div className="note-summary modern">
                      <div className="summary-header">
                        <Sparkles size={14} />
                        <span>AI Insight</span>
                      </div>
                      <p className="summary-text">{note.summary}</p>
                    </div>
                  )}

                  <div className="note-content modern">
                    {note.content}
                  </div>

                  <div className="note-footer">
                    <span className="note-type">Flash Note</span>
                    {note.summary && <span className="ai-badge">AI Enhanced</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Note Modal */}
      {showCreateForm && (
        <div className="modal-overlay" onClick={() => setShowCreateForm(false)}>
          <div className="create-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Flash</h2>
              <button 
                onClick={() => setShowCreateForm(false)} 
                className="btn-icon close"
              >
                <Plus size={20} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>
            
            <form onSubmit={handleCreateNote} className="create-form">
              <div className="form-group">
                <label className="form-label">Flash Title</label>
                <input
                  type="text"
                  name="title"
                  value={noteForm.title}
                  onChange={handleFormChange}
                  placeholder="What's on your mind?"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Content</label>
                <textarea
                  name="content"
                  value={noteForm.content}
                  onChange={handleFormChange}
                  placeholder="Capture your thoughts... AI will create insights instantly ⚡"
                  className="form-textarea"
                  rows="8"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Sparkles size={16} />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      Flash It!
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Note View Modal */}
      {showModal && selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => {
            setShowModal(false)
            setSelectedNote(null)
          }}
        />
      )}
    </div>
  )
}

export default Dashboard 