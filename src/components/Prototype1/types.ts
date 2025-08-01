export interface Rectangle {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

export interface TextElement {
  id: string
  x: number
  y: number
  text: string
  fontSize: number
  color: string
  fontFamily: string
  isEditing: boolean
}

export interface Point {
  x: number
  y: number
}

export interface DrawingRect {
  x: number
  y: number
  width: number
  height: number
}

export interface PanState {
  x: number
  y: number
}

export type Tool = 'select' | 'rectangle' | 'text'

export interface CanvasState {
  rectangles: Rectangle[]
  textElements: TextElement[]
  isDrawing: boolean
  drawingRect: DrawingRect | null
  startPoint: Point | null
  activeTool: Tool
  zoom: number
  pan: PanState
  isPanning: boolean
  lastPanPoint: Point | null
} 