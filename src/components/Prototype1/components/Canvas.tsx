import { Rectangle, DrawingRect, Tool } from '../types'

interface CanvasProps {
  rectangles: Rectangle[]
  drawingRect: DrawingRect | null
  activeTool: Tool
  pan: { x: number; y: number }
  zoom: number
  onMouseDown: (e: React.MouseEvent) => void
  onMouseMove: (e: React.MouseEvent) => void
  onMouseUp: () => void
  onWheel: (e: React.WheelEvent) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  canvasRef: React.RefObject<HTMLDivElement>
}

export function Canvas({
  rectangles,
  drawingRect,
  activeTool,
  pan,
  zoom,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onWheel,
  onKeyDown,
  canvasRef
}: CanvasProps) {
  return (
    <div
      ref={canvasRef}
      className={`w-full h-full bg-gray-100 relative overflow-hidden ${
        activeTool === 'rectangle' ? 'cursor-crosshair' : 'cursor-default'
      }`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
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
      </div>
    </div>
  )
} 