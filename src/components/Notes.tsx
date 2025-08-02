import React, { useState } from 'react'

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to Notes',
      content: 'This is your personal note-taking space. Click the + button to create a new note, or start typing in the editor below to begin writing.',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  
  const [selectedNote, setSelectedNote] = useState<string>('1')
  const [isEditing, setIsEditing] = useState(false)

  const selectedNoteData = notes.find(note => note.id === selectedNote)

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setNotes(prev => [newNote, ...prev])
    setSelectedNote(newNote.id)
    setIsEditing(true)
  }

  const handleUpdateNote = (field: 'title' | 'content', value: string) => {
    if (!selectedNoteData) return
    
    setNotes(prev => prev.map(note => 
      note.id === selectedNote 
        ? { ...note, [field]: value, updatedAt: new Date() }
        : note
    ))
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId))
    if (selectedNote === noteId && notes.length > 1) {
      const remainingNotes = notes.filter(note => note.id !== noteId)
      setSelectedNote(remainingNotes[0].id)
    }
  }

  return (
    <div className="h-full bg-stone-950/80 backdrop-blur-xl flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-lg">Notes</h2>
          <button
            onClick={handleCreateNote}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        
        <div className="space-y-2">
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedNote === note.id 
                  ? 'bg-white/20 text-white' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{note.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {note.updatedAt.toLocaleDateString()}
                  </p>
                </div>
                {notes.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteNote(note.id)
                    }}
                    className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"></polyline>
                      <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {selectedNoteData ? (
          <div className="h-full flex flex-col">
            <div className="mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={selectedNoteData.title}
                  onChange={(e) => handleUpdateNote('title', e.target.value)}
                  className="w-full bg-transparent text-white text-2xl font-semibold border-none outline-none placeholder-gray-400"
                  placeholder="Note title..."
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <h1 
                  className="text-white text-2xl font-semibold cursor-pointer hover:bg-white/10 p-2 -m-2 rounded transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  {selectedNoteData.title}
                </h1>
              )}
              <p className="text-gray-400 text-sm mt-1">
                Last updated: {selectedNoteData.updatedAt.toLocaleString()}
              </p>
            </div>
            
            <div className="flex-1">
              <textarea
                value={selectedNoteData.content}
                onChange={(e) => handleUpdateNote('content', e.target.value)}
                className="w-full h-full bg-transparent text-gray-300 text-base leading-relaxed border-none outline-none resize-none placeholder-gray-500"
                placeholder="Start writing your note here..."
              />
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
              <h3 className="text-white font-medium mb-2">No note selected</h3>
              <p className="text-gray-400 text-sm">Create a new note or select one from the sidebar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 