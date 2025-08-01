import { useState, useRef, useCallback, useEffect } from 'react'
import { Square, MousePointer, Type, Frame as FrameIcon } from 'lucide-react'

interface Rectangle {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
  frameId?: string
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
  frameId?: string
}

interface Frame {
  id: string
  x: number
  y: number
  width: number
  height: number
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  opacity?: number
  isSelected?: boolean
  isResizing?: boolean
  isMoving?: boolean
}

export default function Prototype1() {
  const [rectangles, setRectangles] = useState<Rectangle[]>([])
  const [textElements, setTextElements] = useState<TextElement[]>([])
  const [frames, setFrames] = useState<Frame[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingRect, setDrawingRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)
  const [activeTool, setActiveTool] = useState<'select' | 'rectangle' | 'text' | 'frame'>('select')
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [lastPanPoint, setLastPanPoint] = useState<{ x: number; y: number } | null>(null)
  const [editingTextId, setEditingTextId] = useState<string | null>(null)
  const [newlyCreatedTextId, setNewlyCreatedTextId] = useState<string | null>(null)
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null)
  const [isMovingFrame, setIsMovingFrame] = useState(false)
  const [frameMoveStart, setFrameMoveStart] = useState<{ x: number; y: number } | null>(null)
  const [isResizingFrame, setIsResizingFrame] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string | null>(null)
  const [resizeStart, setResizeStart] = useState<{ x: number; y: number; width: number; height: number } | null>(null)
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
    } else if (activeTool === 'frame') {
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
    } else if (activeTool === 'select') {
      // Check if clicking on a resize handle first
      if (selectedFrameId) {
        const frame = frames.find(f => f.id === selectedFrameId)
        if (frame) {
          const handleSize = 8 / zoom // Handle size in canvas coordinates
          const handles = getResizeHandles(frame, handleSize)
          
          const clickedHandle = Object.entries(handles).find(([_key, handle]) => 
            x >= handle.x && x <= handle.x + handleSize &&
            y >= handle.y && y <= handle.y + handleSize
          )
          
          if (clickedHandle) {
            setIsResizingFrame(true)
            setResizeHandle(clickedHandle[0])
            setResizeStart({ x, y, width: frame.width, height: frame.height })
            return
          }
        }
      }
      
      // Check if clicking on a frame
      const clickedFrame = frames.find(frame => 
        x >= frame.x && x <= frame.x + frame.width &&
        y >= frame.y && y <= frame.y + frame.height
      )
      
      if (clickedFrame) {
        // Select the frame and start moving
        setSelectedFrameId(clickedFrame.id)
        setIsMovingFrame(true)
        setFrameMoveStart({ x, y })
        
        // Update frame to show it's being moved
        setFrames(prev => prev.map(frame => 
          frame.id === clickedFrame.id 
            ? { ...frame, isMoving: true }
            : { ...frame, isSelected: false }
        ))
      } else {
        // Deselect all frames if clicking on empty space
        setSelectedFrameId(null)
        setFrames(prev => prev.map(frame => ({ ...frame, isSelected: false })))
      }
      
      if (e.button === 1) { // Middle mouse button
        setIsPanning(true)
        setLastPanPoint({ x: e.clientX, y: e.clientY })
      }
    }
  }, [activeTool, pan, zoom, frames, selectedFrameId])

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
    } else if (isResizingFrame && resizeStart && resizeHandle && selectedFrameId) {
      const rect = canvasRef.current.getBoundingClientRect()
      const currentX = (e.clientX - rect.left - pan.x) / zoom
      const currentY = (e.clientY - rect.top - pan.y) / zoom
      
      const deltaX = currentX - resizeStart.x
      const deltaY = currentY - resizeStart.y
      
      const frame = frames.find(f => f.id === selectedFrameId)
      if (frame) {
        let newX = frame.x
        let newY = frame.y
        let newWidth = frame.width
        let newHeight = frame.height
        
        // Calculate new dimensions based on which handle is being dragged
        switch (resizeHandle) {
          case 'nw':
            newX = frame.x + deltaX
            newY = frame.y + deltaY
            newWidth = frame.width - deltaX
            newHeight = frame.height - deltaY
            break
          case 'n':
            newY = frame.y + deltaY
            newHeight = frame.height - deltaY
            break
          case 'ne':
            newY = frame.y + deltaY
            newWidth = frame.width + deltaX
            newHeight = frame.height - deltaY
            break
          case 'w':
            newX = frame.x + deltaX
            newWidth = frame.width - deltaX
            break
          case 'e':
            newWidth = frame.width + deltaX
            break
          case 'sw':
            newX = frame.x + deltaX
            newWidth = frame.width - deltaX
            newHeight = frame.height + deltaY
            break
          case 's':
            newHeight = frame.height + deltaY
            break
          case 'se':
            newWidth = frame.width + deltaX
            newHeight = frame.height + deltaY
            break
        }
        
        // Ensure minimum size
        const minSize = 20
        if (newWidth >= minSize && newHeight >= minSize) {
          setFrames(prev => prev.map(f => 
            f.id === selectedFrameId 
              ? { ...f, x: newX, y: newY, width: newWidth, height: newHeight }
              : f
          ))
        }
      }
    } else if (isMovingFrame && frameMoveStart && selectedFrameId) {
      const rect = canvasRef.current.getBoundingClientRect()
      const currentX = (e.clientX - rect.left - pan.x) / zoom
      const currentY = (e.clientY - rect.top - pan.y) / zoom
      
      const deltaX = currentX - frameMoveStart.x
      const deltaY = currentY - frameMoveStart.y
      
      // Move the frame and all its contained elements
      setFrames(prev => prev.map(frame => 
        frame.id === selectedFrameId 
          ? { ...frame, x: frame.x + deltaX, y: frame.y + deltaY }
          : frame
      ))
      
      // Move all elements that are inside the frame
      const frame = frames.find(f => f.id === selectedFrameId)
      if (frame) {
        const frameElements = getElementsInFrame(selectedFrameId)
        
        // Move rectangles inside the frame
        setRectangles(prev => prev.map(rect => {
          if (frameElements.rectangles.find(r => r.id === rect.id)) {
            return { ...rect, x: rect.x + deltaX, y: rect.y + deltaY }
          }
          return rect
        }))
        
        // Move text elements inside the frame
        setTextElements(prev => prev.map(text => {
          if (frameElements.textElements.find(t => t.id === text.id)) {
            return { ...text, x: text.x + deltaX, y: text.y + deltaY }
          }
          return text
        }))
      }
      
      // Update the move start point
      setFrameMoveStart({ x: currentX, y: currentY })
    } else if (isPanning && lastPanPoint) {
      const deltaX = e.clientX - lastPanPoint.x
      const deltaY = e.clientY - lastPanPoint.y
      
      setPan(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }))
      setLastPanPoint({ x: e.clientX, y: e.clientY })
    }
  }, [isDrawing, startPoint, isResizingFrame, resizeStart, resizeHandle, selectedFrameId, isMovingFrame, frameMoveStart, isPanning, lastPanPoint, pan, zoom, frames])

  const handleMouseUp = useCallback(() => {
    if (isDrawing && drawingRect) {
      if (drawingRect.width > 5 && drawingRect.height > 5) {
        if (activeTool === 'rectangle') {
          const newRectangle: Rectangle = {
            id: Date.now().toString(),
            x: drawingRect.x,
            y: drawingRect.y,
            width: drawingRect.width,
            height: drawingRect.height,
            color: colors[Math.floor(Math.random() * colors.length)]
          }
          
          setRectangles(prev => [...prev, newRectangle])
        } else if (activeTool === 'frame') {
          const newFrame: Frame = {
            id: Date.now().toString(),
            x: drawingRect.x,
            y: drawingRect.y,
            width: drawingRect.width,
            height: drawingRect.height,
            backgroundColor: '#f8fafc',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            borderRadius: 8,
            opacity: 1,
            isSelected: false
          }
          
          setFrames(prev => [...prev, newFrame])
        }
      }
      
      setIsDrawing(false)
      setDrawingRect(null)
      setStartPoint(null)
      setActiveTool('select') // Switch back to select mode after drawing
    }
    
    if (isResizingFrame) {
      setIsResizingFrame(false)
      setResizeHandle(null)
      setResizeStart(null)
    }
    
    if (isMovingFrame) {
      setIsMovingFrame(false)
      setFrameMoveStart(null)
      
      // Update frame to show it's no longer being moved
      if (selectedFrameId) {
        setFrames(prev => prev.map(frame => 
          frame.id === selectedFrameId 
            ? { ...frame, isMoving: false }
            : frame
        ))
      }
    }
    
    if (isPanning) {
      setIsPanning(false)
      setLastPanPoint(null)
    }
  }, [isDrawing, drawingRect, isResizingFrame, isMovingFrame, isPanning, colors, activeTool, selectedFrameId])



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

  // Delete selected frame
  const deleteSelectedFrame = useCallback(() => {
    if (selectedFrameId) {
      setFrames(prev => prev.filter(frame => frame.id !== selectedFrameId))
      setSelectedFrameId(null)
    }
  }, [selectedFrameId])

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
      case 'f':
        setActiveTool('frame')
        break
      case 'v':
        setActiveTool('select')
        break
      case 'escape':
        setActiveTool('select')
        break
      case 'delete':
      case 'backspace':
        deleteSelectedFrame()
        break
    }
  }, [deleteSelectedFrame])

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

  // Helper function to get elements within a frame
  const getElementsInFrame = (frameId: string) => {
    const frame = frames.find(f => f.id === frameId)
    if (!frame) return { rectangles: [], textElements: [] }

    const frameRectangles = rectangles.filter(rect => {
      const rectCenterX = rect.x + rect.width / 2
      const rectCenterY = rect.y + rect.height / 2
      return rectCenterX >= frame.x && rectCenterX <= frame.x + frame.width &&
             rectCenterY >= frame.y && rectCenterY <= frame.y + frame.height
    })

    const frameTextElements = textElements.filter(text => {
      return text.x >= frame.x && text.x <= frame.x + frame.width &&
             text.y >= frame.y && text.y <= frame.y + frame.height
    })

    return { rectangles: frameRectangles, textElements: frameTextElements }
  }

  // Helper function to get elements not in any frame
  const getElementsNotInFrame = () => {
    const allFrameElements = frames.flatMap(frame => {
      const elements = getElementsInFrame(frame.id)
      return [...elements.rectangles.map(r => r.id), ...elements.textElements.map(t => t.id)]
    })

    const freeRectangles = rectangles.filter(rect => !allFrameElements.includes(rect.id))
    const freeTextElements = textElements.filter(text => !allFrameElements.includes(text.id))

    return { rectangles: freeRectangles, textElements: freeTextElements }
  }

  // Helper function to get resize handle positions
  const getResizeHandles = (frame: Frame, handleSize: number) => {
    return {
      nw: { x: frame.x - handleSize/2, y: frame.y - handleSize/2 },
      n: { x: frame.x + frame.width/2 - handleSize/2, y: frame.y - handleSize/2 },
      ne: { x: frame.x + frame.width - handleSize/2, y: frame.y - handleSize/2 },
      w: { x: frame.x - handleSize/2, y: frame.y + frame.height/2 - handleSize/2 },
      e: { x: frame.x + frame.width - handleSize/2, y: frame.y + frame.height/2 - handleSize/2 },
      sw: { x: frame.x - handleSize/2, y: frame.y + frame.height - handleSize/2 },
      s: { x: frame.x + frame.width/2 - handleSize/2, y: frame.y + frame.height - handleSize/2 },
      se: { x: frame.x + frame.width - handleSize/2, y: frame.y + frame.height - handleSize/2 }
    }
  }

  // Helper function to get cursor for resize handles
  const getResizeCursor = (handle: string) => {
    switch (handle) {
      case 'nw':
      case 'se':
        return 'nw-resize'
      case 'ne':
      case 'sw':
        return 'ne-resize'
      case 'n':
      case 's':
        return 'ns-resize'
      case 'w':
      case 'e':
        return 'ew-resize'
      default:
        return 'default'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-300 h-[500px] overflow-hidden">
      {/* Canvas with Overlay Toolbar */}
      <div className="relative h-full">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className={`w-full h-full bg-white relative overflow-hidden ${
            activeTool === 'rectangle' ? 'cursor-crosshair' : 
            activeTool === 'text' ? 'cursor-text' :
            activeTool === 'frame' ? 'cursor-crosshair' : 
            isMovingFrame ? 'cursor-grabbing' : 'cursor-default'
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
            {/* Drawing rectangle/frame preview */}
            {drawingRect && (
              <div
                className={`absolute border-2 ${
                  activeTool === 'frame' 
                    ? 'border-purple-500 bg-purple-100 bg-opacity-30' 
                    : 'border-blue-500 bg-blue-100 bg-opacity-30'
                }`}
                style={{
                  left: drawingRect.x,
                  top: drawingRect.y,
                  width: drawingRect.width,
                  height: drawingRect.height
                }}
              />
            )}
            
            {/* Render frames with their contained elements */}
            {frames.map(frame => {
              const frameElements = getElementsInFrame(frame.id)
              return (
                <div key={frame.id}>
                  <div
                    className={`absolute ${frame.isSelected ? 'cursor-grab' : 'cursor-pointer'} ${
                      frame.isMoving ? 'cursor-grabbing' : ''
                    }`}
                    style={{
                      left: frame.x,
                      top: frame.y,
                      width: frame.width,
                      height: frame.height,
                      backgroundColor: frame.backgroundColor,
                      border: `${frame.borderWidth || 1}px solid ${frame.borderColor || '#e2e8f0'}`,
                      borderRadius: `${frame.borderRadius || 0}px`,
                      opacity: frame.opacity || 1,
                      transition: frame.isMoving ? 'none' : 'all 0.2s ease'
                    }}
                  >
                    {/* Render rectangles within this frame */}
                    {frameElements.rectangles.map(rect => (
                      <div
                        key={rect.id}
                        className="absolute pointer-events-none"
                        style={{
                          left: rect.x - frame.x,
                          top: rect.y - frame.y,
                          width: rect.width,
                          height: rect.height,
                          backgroundColor: rect.color
                        }}
                      />
                    ))}

                    {/* Render text elements within this frame */}
                    {frameElements.textElements.map(textElement => (
                      <div
                        key={textElement.id}
                        className="absolute select-none pointer-events-none"
                        style={{
                          left: textElement.x - frame.x,
                          top: textElement.y - frame.y,
                          fontFamily: textElement.fontFamily,
                          fontSize: textElement.fontSize,
                          color: textElement.color
                        }}
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

                  {/* Selection outline and resize handles for selected frame */}
                  {frame.isSelected && (
                    <>
                      {/* Selection outline */}
                      <div
                        className="absolute border-2 border-blue-500 pointer-events-none"
                        style={{
                          left: frame.x - 2,
                          top: frame.y - 2,
                          width: frame.width + 4,
                          height: frame.height + 4,
                          borderRadius: `${(frame.borderRadius || 0) + 2}px`,
                          zIndex: 5
                        }}
                      />
                      {/* Resize handles */}
                      {Object.entries(getResizeHandles(frame, 8 / zoom)).map(([handle, pos]) => (
                        <div
                          key={handle}
                          className="absolute bg-white border border-blue-500 rounded-sm"
                          style={{
                            left: pos.x,
                            top: pos.y,
                            width: 8 / zoom,
                            height: 8 / zoom,
                            cursor: getResizeCursor(handle),
                            zIndex: 10
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              )
            })}

            {/* Render elements not in any frame */}
            {(() => {
              const freeElements = getElementsNotInFrame()
              return (
                <>
                  {/* Free rectangles */}
                  {freeElements.rectangles.map(rect => (
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

                  {/* Free text elements */}
                  {freeElements.textElements.map(textElement => (
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
                </>
              )
            })()}
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
              onClick={() => setActiveTool(activeTool === 'rectangle' ? 'select' : 'rectangle')}
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
            <button
              onClick={() => setActiveTool(activeTool === 'frame' ? 'select' : 'frame')}
              className={`p-2 rounded-md transition-colors ${
                activeTool === 'frame' 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
              title="Frame Tool (F)"
            >
              <FrameIcon size={20} />
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