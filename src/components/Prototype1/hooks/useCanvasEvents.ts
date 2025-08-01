import { useCallback, useRef } from 'react'
import type { Point } from '../types'
import { ZOOM_FACTORS, ZOOM_LIMITS } from '../constants'

interface CanvasEventHandlers {
  onMouseDown: (e: React.MouseEvent) => void
  onMouseMove: (e: React.MouseEvent) => void
  onMouseUp: () => void
  onWheel: (e: React.WheelEvent) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  canvasRef: React.RefObject<HTMLDivElement | null>
}

interface UseCanvasEventsProps {
  activeTool: string
  pan: { x: number; y: number }
  zoom: number
  isDrawing: boolean
  isPanning: boolean
  onStartDrawing: (point: Point) => void
  onUpdateDrawing: (point: Point) => void
  onFinishDrawing: () => void
  onStartPanning: (point: Point) => void
  onUpdatePanning: (point: Point) => void
  onStopPanning: () => void
  onSetZoom: (zoom: number) => void
  onSetPan: (pan: { x: number; y: number }) => void
  onSetActiveTool: (tool: string) => void
}

export function useCanvasEvents({
  activeTool,
  pan,
  zoom,
  isDrawing,
  isPanning,
  onStartDrawing,
  onUpdateDrawing,
  onFinishDrawing,
  onStartPanning,
  onUpdatePanning,
  onStopPanning,
  onSetZoom,
  onSetPan,
  onSetActiveTool
}: UseCanvasEventsProps): CanvasEventHandlers {
  const canvasRef = useRef<HTMLDivElement>(null)

  const getCanvasPoint = useCallback((e: React.MouseEvent): Point => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left - pan.x) / zoom,
      y: (e.clientY - rect.top - pan.y) / zoom
    }
  }, [pan, zoom])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const point = getCanvasPoint(e)
    
    if (activeTool === 'rectangle') {
      onStartDrawing(point)
    } else if (activeTool === 'select' && e.button === 1) { // Middle mouse button
      onStartPanning({ x: e.clientX, y: e.clientY })
    }
  }, [activeTool, getCanvasPoint, onStartDrawing, onStartPanning])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDrawing) {
      const point = getCanvasPoint(e)
      onUpdateDrawing(point)
    } else if (isPanning) {
      onUpdatePanning({ x: e.clientX, y: e.clientY })
    }
  }, [isDrawing, isPanning, getCanvasPoint, onUpdateDrawing, onUpdatePanning])

  const handleMouseUp = useCallback(() => {
    if (isDrawing) {
      onFinishDrawing()
    }
    
    if (isPanning) {
      onStopPanning()
    }
  }, [isDrawing, isPanning, onFinishDrawing, onStopPanning])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    
    // Check if Command (Mac) or Ctrl (Windows) is held down
    if (e.metaKey || e.ctrlKey) {
      // Zoom when modifier key is held
      const delta = e.deltaY > 0 ? ZOOM_FACTORS.OUT : ZOOM_FACTORS.IN
      const newZoom = Math.max(ZOOM_LIMITS.MIN, Math.min(ZOOM_LIMITS.MAX, zoom * delta))
      onSetZoom(newZoom)
    } else {
      // Pan by default (like trackpad scrolling)
      onSetPan({
        x: pan.x - e.deltaX,
        y: pan.y - e.deltaY
      })
    }
  }, [zoom, pan, onSetZoom, onSetPan])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case 'r':
        onSetActiveTool('rectangle')
        break
      case 'v':
        onSetActiveTool('select')
        break
      case 'escape':
        onSetActiveTool('select')
        break
    }
  }, [onSetActiveTool])

  return {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onWheel: handleWheel,
    onKeyDown: handleKeyDown,
    canvasRef
  }
} 