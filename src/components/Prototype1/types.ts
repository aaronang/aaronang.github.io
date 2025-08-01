export interface Rectangle {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
  frameId?: string // Optional reference to parent frame
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
  frameId?: string // Optional reference to parent frame
}

export interface Frame {
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

export type Tool = 'select' | 'rectangle' | 'text' | 'frame'

export interface CanvasState {
  rectangles: Rectangle[]
  textElements: TextElement[]
  frames: Frame[]
  isDrawing: boolean
  drawingRect: DrawingRect | null
  startPoint: Point | null
  activeTool: Tool
  zoom: number
  pan: PanState
  isPanning: boolean
  lastPanPoint: Point | null
  selectedFrameId?: string
} 