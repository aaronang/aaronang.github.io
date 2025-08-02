import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { Square, MousePointer2, Type, Frame as FrameIcon } from 'lucide-react'

interface Rectangle {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
  frameId?: string
  isSelected?: boolean
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
  isSelected?: boolean
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

// Unified selection state
interface SelectionState {
  selectedRectangles: string[]
  selectedTextElements: string[]
  selectedFrames: string[]
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
  
  // New unified selection state
  const [selection, setSelection] = useState<SelectionState>({
    selectedRectangles: [],
    selectedTextElements: [],
    selectedFrames: []
  })
  

  
  const canvasRef = useRef<HTMLDivElement>(null)
  const editingTextRef = useRef<HTMLInputElement>(null)

  const colors = useMemo(() => ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'], [])

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

  // Helper function to clear all selections
  const clearSelection = useCallback(() => {
    setSelection({
      selectedRectangles: [],
      selectedTextElements: [],
      selectedFrames: []
    })
    
    // Clear individual object selection states
    setRectangles(prev => prev.map(rect => ({ ...rect, isSelected: false })))
    setTextElements(prev => prev.map(text => ({ ...text, isSelected: false })))
    setFrames(prev => prev.map(frame => ({ ...frame, isSelected: false })))
    setSelectedFrameId(null)
  }, [])

  // Helper function to select an object
  const selectObject = useCallback((type: 'rectangle' | 'text' | 'frame', id: string, clearOthers: boolean = true) => {
    if (clearOthers) {
      clearSelection()
    }
    
    setSelection(prev => ({
      selectedRectangles: type === 'rectangle' ? [...prev.selectedRectangles, id] : prev.selectedRectangles,
      selectedTextElements: type === 'text' ? [...prev.selectedTextElements, id] : prev.selectedTextElements,
      selectedFrames: type === 'frame' ? [...prev.selectedFrames, id] : prev.selectedFrames
    }))
    
    // Update individual object selection states
    if (type === 'rectangle') {
      setRectangles(prev => prev.map(rect => 
        rect.id === id ? { ...rect, isSelected: true } : rect
      ))
    } else if (type === 'text') {
      setTextElements(prev => prev.map(text => 
        text.id === id ? { ...text, isSelected: true } : text
      ))
    } else if (type === 'frame') {
      setFrames(prev => prev.map(frame => 
        frame.id === id ? { ...frame, isSelected: true } : frame
      ))
      setSelectedFrameId(id)
    }
  }, [clearSelection])

  // Helper function to check if a point is inside a rectangle
  const isPointInRectangle = useCallback((point: { x: number; y: number }, rect: { x: number; y: number; width: number; height: number }) => {
    return point.x >= rect.x && point.x <= rect.x + rect.width &&
           point.y >= rect.y && point.y <= rect.y + rect.height
  }, [])

  // Helper function to check if a point is near a text element (approximate bounding box)
  const isPointNearText = useCallback((point: { x: number; y: number }, text: TextElement) => {
    // Create an approximate bounding box for text
    const textWidth = text.text.length * text.fontSize * 0.6 // Rough estimate
    const textHeight = text.fontSize * 1.2 // Rough estimate
    
    return point.x >= text.x && point.x <= text.x + textWidth &&
           point.y >= text.y - textHeight && point.y <= text.y + textHeight
  }, [])

  // Helper function to get elements within a frame
  const getElementsInFrame = useCallback((frameId: string) => {
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
  }, [frames, rectangles, textElements])

  // Helper function to get elements not in any frame
  const getElementsNotInFrame = useCallback(() => {
    const allFrameElements = frames.flatMap(frame => {
      const elements = getElementsInFrame(frame.id)
      return [...elements.rectangles.map(r => r.id), ...elements.textElements.map(t => t.id)]
    })

    const freeRectangles = rectangles.filter(rect => !allFrameElements.includes(rect.id))
    const freeTextElements = textElements.filter(text => !allFrameElements.includes(text.id))

    return { rectangles: freeRectangles, textElements: freeTextElements }
  }, [frames, getElementsInFrame, rectangles, textElements])

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
          const handleSize = 16 / zoom // Handle size in canvas coordinates
          const handles = getResizeHandles(frame, handleSize)
          
          const clickedHandle = Object.entries(handles).find(([, handle]) => 
            x >= handle.x && x <= handle.x + handleSize &&
            y >= handle.y && y <= handle.y + handleSize
          )
          
          if (clickedHandle) {
            setIsResizingFrame(true)
            setResizeHandle(clickedHandle[0])
            setResizeStart({ 
              x: frame.x + frame.width, 
              y: frame.y + frame.height, 
              width: frame.width, 
              height: frame.height 
            })
            return
          }
        }
      }
      
      // Get free elements (not in frames)
      const freeElements = getElementsNotInFrame()
      
      // Check if clicking on a rectangle
      const clickedRectangle = freeElements.rectangles.find(rect => 
        isPointInRectangle({ x, y }, rect)
      )
      
      // Check if clicking on a text element
      const clickedText = freeElements.textElements.find(text => 
        isPointNearText({ x, y }, text)
      )
      
      // Check if clicking on a frame
      const clickedFrame = frames.find(frame => 
        isPointInRectangle({ x, y }, frame)
      )
      
      // Check if clicking on elements inside frames
      let clickedFrameElement: { type: 'rectangle' | 'text'; element: Rectangle | TextElement; frameId: string } | null = null
      
      if (!clickedRectangle && !clickedText && !clickedFrame) {
        // Check elements inside frames
        for (const frame of frames) {
          const frameElements = getElementsInFrame(frame.id)
          
          // Check rectangles inside this frame
          const frameRectangle = frameElements.rectangles.find(rect => 
            isPointInRectangle({ x, y }, rect)
          )
          if (frameRectangle) {
            clickedFrameElement = { type: 'rectangle', element: frameRectangle, frameId: frame.id }
            break
          }
          
          // Check text elements inside this frame
          const frameText = frameElements.textElements.find(text => 
            isPointNearText({ x, y }, text)
          )
          if (frameText) {
            clickedFrameElement = { type: 'text', element: frameText, frameId: frame.id }
            break
          }
        }
      }
      
      if (clickedRectangle) {
        // Select the rectangle
        selectObject('rectangle', clickedRectangle.id)
      } else if (clickedText) {
        // Select the text element
        selectObject('text', clickedText.id)
      } else if (clickedFrameElement) {
        // Select the element inside the frame
        selectObject(clickedFrameElement.type, clickedFrameElement.element.id)
      } else if (clickedFrame) {
        // Select the frame and start moving
        selectObject('frame', clickedFrame.id)
        setIsMovingFrame(true)
        setFrameMoveStart({ x, y })
        
        // Update frame to show it's being moved
        setFrames(prev => prev.map(frame => 
          frame.id === clickedFrame.id 
            ? { ...frame, isMoving: true }
            : frame
        ))
      } else {
        // Deselect all objects if clicking on empty space
        clearSelection()
      }
      
      if (e.button === 1) { // Middle mouse button
        setIsPanning(true)
        setLastPanPoint({ x: e.clientX, y: e.clientY })
      }
    }
  }, [activeTool, pan, zoom, frames, selectedFrameId, isPointInRectangle, isPointNearText, selectObject, clearSelection, getElementsInFrame, getElementsNotInFrame])

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
      
      const frame = frames.find(f => f.id === selectedFrameId)
      if (frame) {
        // Use the original frame position and dimensions as reference
        const originalX = resizeStart.x - resizeStart.width
        const originalY = resizeStart.y - resizeStart.height
        const originalWidth = resizeStart.width
        const originalHeight = resizeStart.height
        
        let newX = originalX
        let newY = originalY
        let newWidth = originalWidth
        let newHeight = originalHeight
        
        // Calculate new dimensions based on which handle is being dragged
        switch (resizeHandle) {
          case 'nw':
            newX = currentX
            newY = currentY
            newWidth = originalX + originalWidth - currentX
            newHeight = originalY + originalHeight - currentY
            break
          case 'n':
            newY = currentY
            newHeight = originalY + originalHeight - currentY
            break
          case 'ne':
            newY = currentY
            newWidth = currentX - originalX
            newHeight = originalY + originalHeight - currentY
            break
          case 'w':
            newX = currentX
            newWidth = originalX + originalWidth - currentX
            break
          case 'e':
            newWidth = currentX - originalX
            break
          case 'sw':
            newX = currentX
            newWidth = originalX + originalWidth - currentX
            newHeight = currentY - originalY
            break
          case 's':
            newHeight = currentY - originalY
            break
          case 'se':
            newWidth = currentX - originalX
            newHeight = currentY - originalY
            break
        }
        
        // Ensure minimum size
        const minSize = 20
        if (newWidth >= minSize && newHeight >= minSize) {
          // Update the frame state directly (like drawing does)
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
  }, [isDrawing, startPoint, isResizingFrame, resizeStart, resizeHandle, selectedFrameId, isMovingFrame, frameMoveStart, isPanning, lastPanPoint, pan, zoom, frames, getElementsInFrame])

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
      const delta = e.deltaY > 0 ? 0.98 : 1.02
      const newZoom = Math.max(0.1, Math.min(5, zoom * delta))
      
      // Get the mouse position relative to the canvas
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        // Calculate the zoom center point in canvas coordinates
        const zoomCenterX = (mouseX - pan.x) / zoom
        const zoomCenterY = (mouseY - pan.y) / zoom
        
        // Calculate new pan to keep the zoom center point under the cursor
        const newPanX = mouseX - zoomCenterX * newZoom
        const newPanY = mouseY - zoomCenterY * newZoom
        
        setZoom(newZoom)
        setPan({ x: newPanX, y: newPanY })
      } else {
        setZoom(newZoom)
      }
    } else {
      // Pan by default (like trackpad scrolling)
      setPan(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }))
    }
  }, [zoom, pan])

  // Delete selected objects
  const deleteSelectedObjects = useCallback(() => {
    // Delete selected rectangles
    if (selection.selectedRectangles.length > 0) {
      setRectangles(prev => prev.filter(rect => !selection.selectedRectangles.includes(rect.id)))
    }
    
    // Delete selected text elements
    if (selection.selectedTextElements.length > 0) {
      setTextElements(prev => prev.filter(text => !selection.selectedTextElements.includes(text.id)))
    }
    
    // Delete selected frames
    if (selection.selectedFrames.length > 0) {
      setFrames(prev => prev.filter(frame => !selection.selectedFrames.includes(frame.id)))
      setSelectedFrameId(null)
    }
    
    // Clear selection after deletion
    clearSelection()
  }, [selection, clearSelection])

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
        deleteSelectedObjects()
        break
    }
  }, [deleteSelectedObjects])

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
    <div className="bg-stone-200 h-full overflow-hidden">
      {/* Canvas with Overlay Toolbar */}
      <div className="relative h-full">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className={`w-full h-full bg-stone-200 relative overflow-hidden ${
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
                      border: frame.borderWidth && frame.borderColor ? `${frame.borderWidth}px solid ${frame.borderColor}` : 'none',
                      borderRadius: frame.borderRadius ? `${frame.borderRadius}px` : '0px',
                      opacity: frame.opacity || 1,
                      transition: frame.isMoving || isResizingFrame ? 'none' : 'all 0.2s ease'
                    }}
                  >
                    {/* Render rectangles within this frame */}
                    {frameElements.rectangles.map(rect => (
                      <div key={rect.id} className="relative">
                        <div
                          className="absolute pointer-events-none"
                          style={{
                            left: rect.x - frame.x,
                            top: rect.y - frame.y,
                            width: rect.width,
                            height: rect.height,
                            backgroundColor: rect.color
                          }}
                        />
                        {/* Selection border for rectangles inside frames */}
                        {rect.isSelected && (
                          <div
                            className="absolute border-2 border-blue-500 pointer-events-none"
                            style={{
                              left: rect.x - frame.x - 2,
                              top: rect.y - frame.y - 2,
                              width: rect.width + 4,
                              height: rect.height + 4,
                              zIndex: 5
                            }}
                          />
                        )}
                      </div>
                    ))}

                    {/* Render text elements within this frame */}
                    {frameElements.textElements.map(textElement => (
                      <div key={textElement.id} className="relative">
                        <div
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
                        {/* Selection border for text elements inside frames */}
                        {textElement.isSelected && (
                          <div
                            className="absolute border-2 border-blue-500 pointer-events-none rounded-sm"
                            style={{
                              left: textElement.x - frame.x - 4,
                              top: textElement.y - frame.y - textElement.fontSize * 0.2 - 4,
                              width: Math.max(textElement.text.length * textElement.fontSize * 0.6, 20) + 8,
                              height: textElement.fontSize * 1.4 + 8,
                              zIndex: 5
                            }}
                          />
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
                          borderRadius: frame.borderRadius ? `${frame.borderRadius + 2}px` : '2px',
                          zIndex: 5
                        }}
                      />
                      {/* Resize handles */}
                      {Object.entries(getResizeHandles(frame, 16 / zoom)).map(([handle, pos]) => (
                        <div
                          key={handle}
                          className="absolute bg-white border border-blue-500 rounded-sm"
                          style={{
                            left: pos.x,
                            top: pos.y,
                            width: 16 / zoom,
                            height: 16 / zoom,
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
                    <div key={rect.id} className="relative">
                      <div
                        className="absolute"
                        style={{
                          left: rect.x,
                          top: rect.y,
                          width: rect.width,
                          height: rect.height,
                          backgroundColor: rect.color
                        }}
                      />
                      {/* Selection border for rectangles */}
                      {rect.isSelected && (
                        <div
                          className="absolute border-2 border-blue-500 pointer-events-none"
                          style={{
                            left: rect.x - 2,
                            top: rect.y - 2,
                            width: rect.width + 4,
                            height: rect.height + 4,
                            zIndex: 5
                          }}
                        />
                      )}
                    </div>
                  ))}

                  {/* Free text elements */}
                  {freeElements.textElements.map(textElement => (
                    <div key={textElement.id} className="relative">
                      <div
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
                      {/* Selection border for text elements */}
                      {textElement.isSelected && (
                        <div
                          className="absolute border-2 border-blue-500 pointer-events-none rounded-sm"
                          style={{
                            left: textElement.x - 4,
                            top: textElement.y - textElement.fontSize * 0.2 - 4,
                            width: Math.max(textElement.text.length * textElement.fontSize * 0.6, 20) + 8,
                            height: textElement.fontSize * 1.4 + 8,
                            zIndex: 5
                          }}
                        />
                      )}
                    </div>
                  ))}
                </>
              )
            })()}
          </div>

          {/* Overlay Toolbar */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-stone-50 rounded-lg shadow-lg border border-stone-300 p-2 flex items-center gap-2 z-50">
                         <button
               onClick={() => setActiveTool('select')}
               className={`p-2 rounded-md transition-colors ${
                 activeTool === 'select' 
                   ? 'text-white bg-blue-500' 
                   : 'text-gray-600 hover:bg-stone-200'
               }`}
               title="Select Tool (V)"
             >
                             <MousePointer2 size={20} strokeWidth={1.5} />
            </button>
                         <button
               onClick={() => setActiveTool(activeTool === 'rectangle' ? 'select' : 'rectangle')}
               className={`p-2 rounded-md transition-colors ${
                 activeTool === 'rectangle' 
                   ? 'text-white bg-blue-500' 
                   : 'text-gray-600 hover:bg-stone-200'
               }`}
               title="Rectangle Tool (R)"
             >
                             <Square size={20} strokeWidth={1.5} />
            </button>
                         <button
               onClick={() => setActiveTool('text')}
               className={`p-2 rounded-md transition-colors ${
                 activeTool === 'text' 
                   ? 'text-white bg-blue-500' 
                   : 'text-gray-600 hover:bg-stone-200'
               }`}
               title="Text Tool (T)"
             >
                             <Type size={20} strokeWidth={1.5} />
            </button>
                         <button
               onClick={() => setActiveTool(activeTool === 'frame' ? 'select' : 'frame')}
               className={`p-2 rounded-md transition-colors ${
                 activeTool === 'frame' 
                   ? 'text-white bg-blue-500' 
                   : 'text-gray-600 hover:bg-stone-200'
               }`}
               title="Frame Tool (F)"
             >
                             <FrameIcon size={20} strokeWidth={1.5} />
            </button>

          </div>


        </div>
      </div>
    </div>
  )
} 