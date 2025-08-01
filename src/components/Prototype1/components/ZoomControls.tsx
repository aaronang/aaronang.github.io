interface ZoomControlsProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut }: ZoomControlsProps) {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-2">
      <button
        onClick={onZoomOut}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        title="Zoom Out"
      >
        <span className="text-lg font-bold">−</span>
      </button>
      <span className="px-2 text-sm text-gray-600 min-w-[3rem] text-center">
        {Math.round(zoom * 100)}%
      </span>
      <button
        onClick={onZoomIn}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
        title="Zoom In"
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
  )
} 