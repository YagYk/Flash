import React from 'react'
import { X, Zap, FileText } from 'lucide-react'

const NoteModal = ({ note, onClose }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{note.title}</h2>
          <button onClick={onClose} className="btn-icon">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '14px' }}>
            <FileText size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Created on {formatDate(note.created_at)}
          </div>

          {note.summary && (
            <div className="note-summary" style={{ marginBottom: '24px' }}>
              <div className="note-summary-label">
                <Zap size={14} style={{ marginRight: '6px' }} />
                AI Flash Summary
              </div>
              <div className="note-summary-text">{note.summary}</div>
            </div>
          )}

          <div>
            <h3 style={{ 
              marginBottom: '12px', 
              fontSize: '16px', 
              fontWeight: '600',
              color: 'var(--text-primary)' 
            }}>
              Full Flash
            </h3>
            <div className="modal-content">
              {note.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteModal 