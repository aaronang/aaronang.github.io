import { Square, MousePointer } from 'lucide-react'
import type { Tool } from '../types'

interface ToolbarProps {
  activeTool: Tool
  onToolChange: (tool: Tool) => void
}

export function Toolbar({ activeTool, onToolChange }: ToolbarProps) {
  const toggleRectangleTool = () => {
    onToolChange(activeTool === 'rectangle' ? 'select' : 'rectangle')
  }

  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center gap-2">
      <button
        onClick={() => onToolChange('select')}
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
    </div>
  )
} 