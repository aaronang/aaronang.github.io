import { useState, useCallback } from 'react'
import type { CanvasState, Rectangle, Point, PanState, Tool } from '../types'
import { COLORS, ZOOM_LIMITS, ZOOM_FACTORS, MIN_RECTANGLE_SIZE } from '../constants'

export function useCanvasState() {
  const [state, setState] = useState<CanvasState>({
    rectangles: [],
    textElements: [],
    frames: [],
    isDrawing: false,
    drawingRect: null,
    startPoint: null,
    activeTool: 'select',
    zoom: 1,
    pan: { x: 0, y: 0 },
    isPanning: false,
    lastPanPoint: null
  })

  const setActiveTool = useCallback((tool: Tool) => {
    setState(prev => ({ ...prev, activeTool: tool }))
  }, [])

  const startDrawing = useCallback((point: Point) => {
    setState(prev => ({
      ...prev,
      isDrawing: true,
      startPoint: point,
      drawingRect: { x: point.x, y: point.y, width: 0, height: 0 }
    }))
  }, [])

  const updateDrawing = useCallback((currentPoint: Point) => {
    setState(prev => {
      if (!prev.startPoint) return prev
      
      return {
        ...prev,
        drawingRect: {
          x: Math.min(prev.startPoint.x, currentPoint.x),
          y: Math.min(prev.startPoint.y, currentPoint.y),
          width: Math.abs(currentPoint.x - prev.startPoint.x),
          height: Math.abs(currentPoint.y - prev.startPoint.y)
        }
      }
    })
  }, [])

  const finishDrawing = useCallback(() => {
    setState(prev => {
      if (!prev.drawingRect) return prev
      
      if (prev.drawingRect.width > MIN_RECTANGLE_SIZE && prev.drawingRect.height > MIN_RECTANGLE_SIZE) {
        const newRectangle: Rectangle = {
          id: Date.now().toString(),
          x: prev.drawingRect.x,
          y: prev.drawingRect.y,
          width: prev.drawingRect.width,
          height: prev.drawingRect.height,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        }
        
        return {
          ...prev,
          rectangles: [...prev.rectangles, newRectangle],
          isDrawing: false,
          drawingRect: null,
          startPoint: null,
          activeTool: 'select' // Switch back to select mode after drawing
        }
      }
      
      return {
        ...prev,
        isDrawing: false,
        drawingRect: null,
        startPoint: null
      }
    })
  }, [])

  const startPanning = useCallback((point: Point) => {
    setState(prev => ({
      ...prev,
      isPanning: true,
      lastPanPoint: point
    }))
  }, [])

  const updatePanning = useCallback((currentPoint: Point) => {
    setState(prev => {
      if (!prev.lastPanPoint) return prev
      
      const deltaX = currentPoint.x - prev.lastPanPoint.x
      const deltaY = currentPoint.y - prev.lastPanPoint.y
      
      return {
        ...prev,
        pan: {
          x: prev.pan.x + deltaX,
          y: prev.pan.y + deltaY
        },
        lastPanPoint: currentPoint
      }
    })
  }, [])

  const stopPanning = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPanning: false,
      lastPanPoint: null
    }))
  }, [])

  const setZoom = useCallback((newZoom: number) => {
    const clampedZoom = Math.max(ZOOM_LIMITS.MIN, Math.min(ZOOM_LIMITS.MAX, newZoom))
    setState(prev => ({ ...prev, zoom: clampedZoom }))
  }, [])

  const zoomIn = useCallback(() => {
    setState(prev => ({
      ...prev,
      zoom: Math.min(ZOOM_LIMITS.MAX, prev.zoom * ZOOM_FACTORS.IN)
    }))
  }, [])

  const zoomOut = useCallback(() => {
    setState(prev => ({
      ...prev,
      zoom: Math.max(ZOOM_LIMITS.MIN, prev.zoom * ZOOM_FACTORS.OUT)
    }))
  }, [])

  const setPan = useCallback((newPan: PanState) => {
    setState(prev => ({ ...prev, pan: newPan }))
  }, [])

  return {
    state,
    setActiveTool,
    startDrawing,
    updateDrawing,
    finishDrawing,
    startPanning,
    updatePanning,
    stopPanning,
    setZoom,
    zoomIn,
    zoomOut,
    setPan
  }
} 