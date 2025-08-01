import { useState, useRef, useCallback, useEffect } from 'react'
import { Square, MousePointer, Type } from 'lucide-react'

interface Rectangle {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

interface TextElement {
  id: string
  x: number
  y: number
  text: string
  fontSize: number
  color: string
  fontFamily: string
  isEditing: boolean
}

export default function Prototype1() {
  const [rectangles, setRectangles] = useState<Rectangle[]>([])
  const [textElements, setTextElements] = useState<TextElement[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingRect, setDrawingRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)
  const [activeTool, setActiveTool] = useState<'select' | 'rectangle' | 'text'>('select')
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [lastPanPoint, setLastPanPoint] = useState<{ x: number; y: number } | null>(null)
  const [editingTextId, setEditingTextId] = useState<string | null>(null)
  const [newlyCreatedTextId, setNewlyCreatedTextId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const editingTextRef = useRef<HTMLInputElement>(null)

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

  // Focus the input when editingTextId changes
  useEffect(() => {
    console.log('useEffect triggered, editingTextId:', editingTextId)
    if (editingTextId && editingTextRef.current) {
      console.log('Focusing text input:', editingTextId)
      setTimeout(() => {
        if (editingTextRef.current) {
          editingTextRef.current.focus()
          console.log('Focus applied to input')
        } else {
          console.log('Input ref is null')
        }
      }, 10)
    } else {
      console.log('Cannot focus: editingTextId =', editingTextId, 'ref =', editingTextRef.current)
    }
  }, [editingTextId])

  // Debug text elements changes
  useEffect(() => {
    console.log('Text elements changed:', textElements)
  }, [textElements])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - pan.x) / zoom
    const y = (e.clientY - rect.top - pan.y) / zoom
    
    console.log('Mouse down - clientX:', e.clientX, 'clientY:', e.clientY)
    console.log('Canvas rect:', rect)
    console.log('Pan:', pan, 'Zoom:', zoom)
    console.log('Calculated position:', x, y)
    
    if (activeTool === 'rectangle') {
      setIsDrawing(true)
      setStartPoint({ x, y })
      setDrawingRect({ x, y, width: 0, height: 0 })
    } else if (activeTool === 'text') {
      console.log('Creating new text element at:', x, y)
      // Create a new text element with empty text and start editing immediately
      const newTextElement: TextElement = {
        id: Date.now().toString(),
        x,
        y,
        text: '',
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Inter Variable, Inter, sans-serif',
        isEditing: true
      }
      console.log('New text element:', newTextElement)
      setTextElements(prev => {
        const newElements = [...prev, newTextElement]
        console.log('Updated text elements:', newElements)
        return newElements
      })
      setEditingTextId(newTextElement.id)
      setNewlyCreatedTextId(newTextElement.id)
      setActiveTool('select') // Switch back to select mode after creating text
      
      // Clear the newly created flag after a delay
      setTimeout(() => {
        setNewlyCreatedTextId(null)
      }, 100)
    } else if (activeTool === 'select' && e.button === 1) { // Middle mouse button
      setIsPanning(true)
      setLastPanPoint({ x: e.clientX, y: e.clientY })
    }
  }, [activeTool, pan, zoom])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return
    
    if (isDrawing && startPoint) {
      const rect = canvasRef.current.getBoundingClientRect()
      const currentX = (e.clientX - rect.left - pan.x) / zoom
      const currentY = (e.clientY - rect.top - pan.y) / zoom
      
      setDrawingRect({
        x: Math.min(startPoint.x, currentX),
        y: Math.min(startPoint.y, currentY),
        width: Math.abs(currentX - startPoint.x),
        height: Math.abs(currentY - startPoint.y)
      })
    } else if (isPanning && lastPanPoint) {
      const deltaX = e.clientX - lastPanPoint.x
      const deltaY = e.clientY - lastPanPoint.y
      
      setPan(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
      setLastPanPoint({ x: e.clientX, y: e.clientY })
    }
  }, [isDrawing, startPoint, isPanning, lastPanPoint, pan, zoom])

  const handleMouseUp = useCallback(() => {
    if (isDrawing && drawingRect) {
      if (drawingRect.width > 5 && drawingRect.height > 5) {
        const newRectangle: Rectangle = {
          id: Date.now().toString(),
          x: drawingRect.x,
          y: drawingRect.y,
          width: drawingRect.width,
          height: drawingRect.height,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        
        setRectangles(prev => [...prev, newRectangle])
      }
      
      setIsDrawing(false)
      setDrawingRect(null)
      setStartPoint(null)
      setActiveTool('select') // Switch back to select mode after drawing
    }
    
    if (isPanning) {
      setIsPanning(false)
      setLastPanPoint(null)
    }
  }, [isDrawing, drawingRect, isPanning, colors])

  const toggleRectangleTool = () => {
    setActiveTool(activeTool === 'rectangle' ? 'select' : 'rectangle')
  }

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    
    // Check if Command (Mac) or Ctrl (Windows) is held down
    if (e.metaKey || e.ctrlKey) {
      // Zoom when modifier key is held
      const delta = e.deltaY > 0 ? 0.95 : 1.05
      const newZoom = Math.max(0.1, Math.min(5, zoom * delta))
      setZoom(newZoom)
    } else {
      // Pan by default (like trackpad scrolling)
      setPan(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }))
    }
  }, [zoom])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Don't handle keyboard shortcuts if the target is an input element
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return
    }
    
    switch (e.key.toLowerCase()) {
      case 'r':
        setActiveTool('rectangle')
        break
      case 't':
        setActiveTool('text')
        break
      case 'v':
        setActiveTool('select')
        break
      case 'escape':
        setActiveTool('select')
        break
    }
  }, [])

  const handleTextDoubleClick = useCallback((textId: string) => {
    setTextElements(prev => 
      prev.map(text => 
        text.id === textId 
          ? { ...text, isEditing: true }
          : text
      )
    )
    setEditingTextId(textId)
  }, [])

  const handleTextChange = useCallback((textId: string, newText: string) => {
    setTextElements(prev => 
      prev.map(text => 
        text.id === textId 
          ? { ...text, text: newText }
          : text
      )
    )
  }, [])

  const handleTextBlur = useCallback((textId: string) => {
    console.log('Text blur triggered for:', textId, 'newlyCreatedTextId:', newlyCreatedTextId)
    
    // Don't remove newly created text elements immediately
    if (textId === newlyCreatedTextId) {
      console.log('Ignoring blur for newly created text element')
      return
    }
    
    setTextElements(prev => {
      const textElement = prev.find(text => text.id === textId)
      console.log('Text element found:', textElement)
      if (textElement && textElement.text.trim() === '') {
        // Remove empty text elements
        console.log('Removing empty text element')
        return prev.filter(text => text.id !== textId)
      } else {
        // Keep non-empty text elements and stop editing
        console.log('Keeping text element and stopping edit')
        return prev.map(text => 
          text.id === textId 
            ? { ...text, isEditing: false }
            : text
        )
      }
    })
    setEditingTextId(null)
  }, [newlyCreatedTextId])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-300 h-[500px] overflow-hidden">
      {/* Canvas with Overlay Toolbar */}
      <div className="relative h-full">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className={`w-full h-full bg-white relative overflow-hidden ${
            activeTool === 'rectangle' ? 'cursor-crosshair' : 
            activeTool === 'text' ? 'cursor-text' : 'cursor-default'
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Canvas Content with Transform */}
          <div
            className="w-full h-full relative"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {/* Drawing rectangle preview */}
            {drawingRect && (
              <div
                className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-30"
                style={{
                  left: drawingRect.x,
                  top: drawingRect.y,
                  width: drawingRect.width,
                  height: drawingRect.height
                }}
              />
            )}
            
            {/* Existing rectangles */}
            {rectangles.map(rect => (
              <div
                key={rect.id}
                className="absolute"
                style={{
                  left: rect.x,
                  top: rect.y,
                  width: rect.width,
                  height: rect.height,
                  backgroundColor: rect.color
                }}
              />
            ))}

            {/* Text elements */}
            {textElements.map(textElement => (
              <div
                key={textElement.id}
                className="absolute select-none"
                style={{
                  left: textElement.x,
                  top: textElement.y,
                  fontFamily: textElement.fontFamily,
                  fontSize: textElement.fontSize,
                  color: textElement.color,
                  cursor: 'pointer'
                }}
                onDoubleClick={() => handleTextDoubleClick(textElement.id)}
              >
                {textElement.isEditing ? (
                  <input
                    ref={editingTextId === textElement.id ? editingTextRef : null}
                    type="text"
                    value={textElement.text}
                    onChange={(e) => handleTextChange(textElement.id, e.target.value)}
                    onBlur={() => handleTextBlur(textElement.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Escape') {
                        handleTextBlur(textElement.id)
                      }
                    }}
                    style={{
                      fontFamily: textElement.fontFamily,
                      fontSize: textElement.fontSize,
                      color: textElement.color,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      minWidth: '1px',
                      caretColor: textElement.color,
                      width: 'auto'
                    }}
                    autoFocus={editingTextId === textElement.id}
                  />
                ) : (
                  textElement.text
                )}
              </div>
            ))}
          </div>

          {/* Overlay Toolbar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-2">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-2 rounded-md transition-colors ${
                activeTool === 'select' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title="Select Tool (V)"
            >
              <MousePointer size={20} />
            </button>
            <button
              onClick={toggleRectangleTool}
              className={`p-2 rounded-md transition-colors ${
                activeTool === 'rectangle' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title="Rectangle Tool (R)"
            >
              <Square size={20} />
            </button>
            <button
              onClick={() => setActiveTool('text')}
              className={`p-2 rounded-md transition-colors ${
                activeTool === 'text' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title="Text Tool (T)"
            >
              <Type size={20} />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(0.1, zoom * 0.9))}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Zoom Out"
            >
              <span className="text-lg font-bold">−</span>
            </button>
            <span className="px-2 text-sm text-gray-600 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(5, zoom * 1.1))}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Zoom In"
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 