import { useState } from 'react'
import Prototype1 from './components/Prototype1'
import Dock from './components/Dock'
import Window from './components/Window'

interface WindowState {
  id: string
  isOpen: boolean
  isMinimized: boolean
  isActive: boolean
}

function App() {
  const [activePage, setActivePage] = useState('prototype1')
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    prototype1: { id: 'prototype1', isOpen: true, isMinimized: false, isActive: true },
    home: { id: 'home', isOpen: false, isMinimized: false, isActive: false },
    design: { id: 'design', isOpen: false, isMinimized: false, isActive: false },
    settings: { id: 'settings', isOpen: false, isMinimized: false, isActive: false }
  })

  const handleDockItemClick = (itemId: string) => {
    setActivePage(itemId)
    
    // Open window if not already open
    if (!windows[itemId]?.isOpen) {
      setWindows(prev => ({
        ...prev,
        [itemId]: { id: itemId, isOpen: true, isMinimized: false, isActive: true }
      }))
    } else {
      // Activate window if already open
      setWindows(prev => ({
        ...prev,
        [itemId]: { ...prev[itemId], isActive: true, isMinimized: false }
      }))
    }
    
    // Deactivate other windows
    setWindows(prev => {
      const updated = { ...prev }
      Object.keys(updated).forEach(key => {
        if (key !== itemId) {
          updated[key] = { ...updated[key], isActive: false }
        }
      })
      return updated
    })
  }

  const handleWindowClose = (windowId: string) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isOpen: false, isActive: false }
    }))
    
    // If this was the active page and we're closing it, clear the active page
    if (activePage === windowId) {
      setActivePage('')
    }
  }

  const handleWindowMinimize = (windowId: string) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: true, isActive: false }
    }))
  }

  const handleWindowMaximize = (windowId: string) => {
    // Window maximize logic is handled within the Window component
  }

  const renderWindow = (windowId: string) => {
    const windowState = windows[windowId]
    if (!windowState?.isOpen || windowState.isMinimized) return null

    switch (windowId) {
      case 'prototype1':
        return (
          <Window
            key={windowId}
            title="Canvas Prototype"
            isActive={windowState.isActive}
            onClose={() => handleWindowClose(windowId)}
            onMinimize={() => handleWindowMinimize(windowId)}
            onMaximize={() => handleWindowMaximize(windowId)}
            defaultPosition={{ x: 100, y: 100 }}
            defaultSize={{ width: 1000, height: 700 }}
          >
            <Prototype1 />
          </Window>
        )
      case 'home':
        return (
          <Window
            key={windowId}
            title="Welcome"
            isActive={windowState.isActive}
            onClose={() => handleWindowClose(windowId)}
            onMinimize={() => handleWindowMinimize(windowId)}
            onMaximize={() => handleWindowMaximize(windowId)}
            defaultPosition={{ x: 200, y: 150 }}
            defaultSize={{ width: 600, height: 400 }}
          >
            <div className="flex items-center justify-center h-full bg-stone-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-stone-800 mb-4">Welcome</h1>
                <p className="text-stone-600 text-lg">Select an application from the taskbar below</p>
              </div>
            </div>
          </Window>
        )
      case 'design':
        return (
          <Window
            key={windowId}
            title="Design System"
            isActive={windowState.isActive}
            onClose={() => handleWindowClose(windowId)}
            onMinimize={() => handleWindowMinimize(windowId)}
            onMaximize={() => handleWindowMaximize(windowId)}
            defaultPosition={{ x: 300, y: 200 }}
            defaultSize={{ width: 800, height: 600 }}
          >
            <div className="flex items-center justify-center h-full bg-stone-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-stone-800 mb-4">Design System</h1>
                <p className="text-stone-600 text-lg">Coming soon...</p>
              </div>
            </div>
          </Window>
        )
      case 'settings':
        return (
          <Window
            key={windowId}
            title="Settings"
            isActive={windowState.isActive}
            onClose={() => handleWindowClose(windowId)}
            onMinimize={() => handleWindowMinimize(windowId)}
            onMaximize={() => handleWindowMaximize(windowId)}
            defaultPosition={{ x: 400, y: 250 }}
            defaultSize={{ width: 700, height: 500 }}
          >
            <div className="flex items-center justify-center h-full bg-stone-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-stone-800 mb-4">Settings</h1>
                <p className="text-stone-600 text-lg">Coming soon...</p>
              </div>
            </div>
          </Window>
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Desktop Area with Wallpaper */}
      <div 
        className="flex-1 relative overflow-hidden"
        style={{
          background: `url('/gilles-lambert-mSK5nNsAsLY-unsplash.jpg') center center / cover no-repeat`
        }}
      >
        {/* Subtle overlay for better window visibility */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Render all open windows */}
        {Object.keys(windows).map(windowId => renderWindow(windowId))}
      </div>
      
      {/* Windows-style Taskbar */}
      <Dock activeItem={activePage} onItemClick={handleDockItemClick} windows={windows} />
    </div>
  )
}

export default App
