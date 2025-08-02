import { useState, useRef, useEffect } from 'react'
import { X, Minus, Square, Maximize2 } from 'lucide-react'

interface WindowProps {
  title: string
  children: React.ReactNode
  defaultPosition?: { x: number; y: number }
  defaultSize?: { width: number; height: number }
  isActive?: boolean
  zIndex?: number
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  onActivate?: () => void
}

export default function Window({ 
  title, 
  children, 
  defaultPosition = { x: 50, y: 50 },
  defaultSize = { width: 800, height: 600 },
  isActive = true,
  zIndex = 1000,
  onClose,
  onMinimize,
  onMaximize,
  onActivate
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition)
  const [size, setSize] = useState(defaultSize)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string>('')
  const [hoverDirection, setHoverDirection] = useState<string>('')
  const [isMaximized, setIsMaximized] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
     const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, startX: 0, startY: 0 })
  const [previousSize, setPreviousSize] = useState(defaultSize)
  const [previousPosition, setPreviousPosition] = useState(defaultPosition)

  // Global mouse event handlers for dragging/resizing
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isResizing && !isMaximized) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y
        
        let newWidth = resizeStart.width
        let newHeight = resizeStart.height
        let newX = position.x
        let newY = position.y
        
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(200, resizeStart.width + deltaX)
        }
                 if (resizeDirection.includes('w')) {
           const widthChange = Math.min(deltaX, resizeStart.width - 200)
           newWidth = resizeStart.width - widthChange
           newX = resizeStart.startX + widthChange
         }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(200, resizeStart.height + deltaY)
        }
                 if (resizeDirection.includes('n')) {
           const heightChange = Math.min(deltaY, resizeStart.height - 200)
           newHeight = resizeStart.height - heightChange
           newY = resizeStart.startY + heightChange
         }
        
                 // Keep window within viewport bounds, but allow resizing to work smoothly
         if (resizeDirection.includes('w')) {
           // For left edge resizing, don't constrain anything - let it work naturally
           // newX = newX (no constraints)
         } else if (resizeDirection.includes('e')) {
           // For right edge resizing, only constrain the right edge (don't let it go off-screen)
           newX = Math.min(newX, window.innerWidth - newWidth)
         } else if (resizeDirection.includes('nw') || resizeDirection.includes('sw')) {
           // For corner resizing that includes left edge, don't constrain left edge
           // newX = newX (no constraints)
         } else if (resizeDirection.includes('ne') || resizeDirection.includes('se')) {
           // For corner resizing that includes right edge, only constrain right edge
           newX = Math.min(newX, window.innerWidth - newWidth)
         } else {
           // For other cases, constrain both edges
           newX = Math.max(0, Math.min(newX, window.innerWidth - newWidth))
         }
         
         if (resizeDirection.includes('n')) {
           // For top edge resizing, don't constrain anything - let it work naturally
           // newY = newY (no constraints)
         } else if (resizeDirection.includes('s')) {
           // For bottom edge resizing, only constrain the bottom edge (don't let it go off-screen)
           newY = Math.min(newY, window.innerHeight - newHeight)
         } else if (resizeDirection.includes('nw') || resizeDirection.includes('ne')) {
           // For corner resizing that includes top edge, don't constrain top edge
           // newY = newY (no constraints)
         } else if (resizeDirection.includes('sw') || resizeDirection.includes('se')) {
           // For corner resizing that includes bottom edge, only constrain bottom edge
           newY = Math.min(newY, window.innerHeight - newHeight)
         } else {
           // For other cases, constrain both edges
           newY = Math.max(0, Math.min(newY, window.innerHeight - newHeight))
         }
        
        setSize({ width: newWidth, height: newHeight })
        setPosition({ x: newX, y: newY })
      } else if (isDragging && !isMaximized) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y
        
        // Keep window within viewport bounds
        const maxX = window.innerWidth - size.width
        const maxY = window.innerHeight - size.height
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        })
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeDirection('')
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, isResizing, isMaximized, resizeStart, resizeDirection, position, size, dragOffset])
  
  const windowRef = useRef<HTMLDivElement>(null)

  const getResizeDirection = (e: React.MouseEvent) => {
    if (!windowRef.current) return ''
    
    const rect = windowRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
         const threshold = 8
    
    let direction = ''
    
    if (x <= threshold) direction += 'w'
    if (x >= rect.width - threshold) direction += 'e'
    if (y <= threshold) direction += 'n'
    if (y >= rect.height - threshold) direction += 's'
    
    return direction
  }



  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    
    const direction = getResizeDirection(e)
    
         if (direction && e.target === e.currentTarget) {
       // Resizing
       setIsResizing(true)
       setResizeDirection(direction)
       setResizeStart({
         x: e.clientX,
         y: e.clientY,
         width: size.width,
         height: size.height,
         startX: position.x,
         startY: position.y
       })
     } else if (e.target === e.currentTarget) {
      // Dragging
      setIsDragging(true)
      const rect = windowRef.current?.getBoundingClientRect()
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
  }

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    
    // Always allow dragging from title bar
    setIsDragging(true)
    const rect = windowRef.current?.getBoundingClientRect()
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    // Handle hover cursor changes
    if (!isDragging && !isResizing && !isMaximized) {
      const direction = getResizeDirection(e)
      setHoverDirection(direction)
    }
  }

  const handleMouseUp = () => {
    // Global handlers will take care of stopping drag/resize
  }

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      setSize(previousSize)
      setPosition(previousPosition)
      setIsMaximized(false)
    } else {
      // Maximize - cover whole desktop except for taskbar
      setPreviousSize(size)
      setPreviousPosition(position)
      setSize({ width: window.innerWidth - 48, height: window.innerHeight })
      setPosition({ x: 48, y: 0 })
      setIsMaximized(true)
    }
    onMaximize?.()
  }

  const handleMinimize = () => {
    onMinimize?.()
  }

  const handleClose = () => {
    onClose?.()
  }

     return (
     <div className="absolute" style={{ left: position.x, top: position.y }}>
       {/* Invisible Resize Handles */}
       {!isMaximized && (
         <>
                       {/* Top edge */}
            <div 
              className="absolute w-full h-2 cursor-ns-resize"
              style={{ top: '-8px', left: 0, width: size.width }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('n')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
                       {/* Bottom edge */}
            <div 
              className="absolute w-full h-2 cursor-ns-resize"
              style={{ top: size.height, left: 0, width: size.width }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('s')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
                       {/* Left edge */}
            <div 
              className="absolute h-full w-2 cursor-ew-resize"
              style={{ left: '-8px', top: 0, height: size.height }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('w')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
                       {/* Right edge */}
            <div 
              className="absolute h-full w-2 cursor-ew-resize"
              style={{ left: size.width, top: 0, height: size.height }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('e')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
                       {/* Top-left corner */}
            <div 
              className="absolute w-2 h-2 cursor-nw-resize"
              style={{ top: '-8px', left: '-8px' }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('nw')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
                       {/* Top-right corner */}
            <div 
              className="absolute w-2 h-2 cursor-ne-resize"
              style={{ top: '-8px', left: size.width }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('ne')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
                       {/* Bottom-left corner */}
            <div 
              className="absolute w-2 h-2 cursor-sw-resize"
              style={{ top: size.height, left: '-8px' }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('sw')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
                       {/* Bottom-right corner */}
            <div 
              className="absolute w-2 h-2 cursor-se-resize"
              style={{ top: size.height, left: size.width }}
                           onMouseDown={(e) => {
                e.stopPropagation()
                setIsResizing(true)
                setResizeDirection('se')
                setResizeStart({
                  x: e.clientX,
                  y: e.clientY,
                  width: size.width,
                  height: size.height,
                  startX: position.x,
                  startY: position.y
                })
              }}
           />
         </>
       )}

       {/* Main Window */}
                       <div
          ref={windowRef}
          className={`absolute shadow-2xl overflow-hidden ${
            isDragging || isResizing ? 'cursor-grabbing' :
            hoverDirection.includes('n') && hoverDirection.includes('e') ? 'cursor-ne-resize' :
            hoverDirection.includes('n') && hoverDirection.includes('w') ? 'cursor-nw-resize' :
            hoverDirection.includes('s') && hoverDirection.includes('e') ? 'cursor-se-resize' :
            hoverDirection.includes('s') && hoverDirection.includes('w') ? 'cursor-sw-resize' :
            hoverDirection.includes('n') || hoverDirection.includes('s') ? 'cursor-ns-resize' :
            hoverDirection.includes('e') || hoverDirection.includes('w') ? 'cursor-ew-resize' :
            'cursor-default'
          } ${isMaximized ? '' : 'rounded-lg'}`}
                    style={{
            left: 0,
            top: 0,
            width: size.width,
            height: size.height,
            zIndex: zIndex,
                        transition: isDragging || isResizing ? 'none' : 'all 0.2s ease',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            cursor: isDragging || isResizing ? 'grabbing' :
              hoverDirection.includes('n') && hoverDirection.includes('e') ? 'ne-resize' :
              hoverDirection.includes('n') && hoverDirection.includes('w') ? 'nw-resize' :
              hoverDirection.includes('s') && hoverDirection.includes('e') ? 'se-resize' :
              hoverDirection.includes('s') && hoverDirection.includes('w') ? 'sw-resize' :
              hoverDirection.includes('n') || hoverDirection.includes('s') ? 'ns-resize' :
              hoverDirection.includes('e') || hoverDirection.includes('w') ? 'ew-resize' :
              'default'
          }}
                   onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            setHoverDirection('')
          }}
          onClick={() => {
            if (!isActive && onActivate) {
              onActivate()
            }
          }}
       >
         {/* Title Bar */}
         <div 
           className={`h-10 flex items-center justify-between px-3 border-b border-white/10`}
           style={{
             background: 'rgba(255, 255, 255, 0.08)',
             backdropFilter: 'blur(20px) saturate(150%)',
             WebkitBackdropFilter: 'blur(20px) saturate(150%)'
           }}
           onMouseDown={handleTitleBarMouseDown}
         >
           <div className="flex items-center gap-1.5">
             <button
               onClick={handleClose}
               className="w-6 h-6 rounded-md hover:bg-white/10 text-white transition-all duration-200 flex items-center justify-center"
               title="Close"
             >
               <X size={12} />
             </button>
             <button
               onClick={handleMinimize}
               className="w-6 h-6 rounded-md hover:bg-white/10 text-white transition-all duration-200 flex items-center justify-center"
               title="Minimize"
             >
               <Minus size={12} />
             </button>
             <button
               onClick={handleMaximize}
               className="w-6 h-6 rounded-md hover:bg-white/10 text-white transition-all duration-200 flex items-center justify-center"
               title={isMaximized ? "Restore" : "Maximize"}
             >
              {isMaximized ? (
                <Square size={10} />
              ) : (
                <Maximize2 size={10} />
              )}
            </button>
          </div>
          
           <div className="flex-1 text-center select-none">
             <h3 className={`text-sm font-medium truncate text-white`}>
               {title}
             </h3>
           </div>
          
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>

         {/* Window Content */}
         <div className="h-full overflow-hidden">
           {children}
         </div>
       </div>
     </div>
   )
} 