import { useState } from 'react'
import { MousePointer2, Home, Settings, Palette } from 'lucide-react'

interface DockItem {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>
  href?: string
  isActive?: boolean
  isOpen?: boolean
}

interface WindowState {
  id: string
  isOpen: boolean
  isMinimized: boolean
  isActive: boolean
}

interface DockProps {
  activeItem?: string
  onItemClick?: (itemId: string) => void
  windows?: Record<string, WindowState>
}

export default function Dock({ activeItem, onItemClick, windows }: DockProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const dockItems: DockItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      isActive: activeItem === 'home' && windows?.['home']?.isOpen,
      isOpen: windows?.['home']?.isOpen || false
    },
    {
      id: 'prototype1',
      label: 'Canvas Prototype',
      icon: MousePointer2,
      isActive: activeItem === 'prototype1' && windows?.['prototype1']?.isOpen,
      isOpen: windows?.['prototype1']?.isOpen || false
    },
    {
      id: 'design',
      label: 'Design System',
      icon: Palette,
      isActive: activeItem === 'design' && windows?.['design']?.isOpen,
      isOpen: windows?.['design']?.isOpen || false
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      isActive: activeItem === 'settings' && windows?.['settings']?.isOpen,
      isOpen: windows?.['settings']?.isOpen || false
    }
  ]

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId)
  }

  const handleItemHover = (itemId: string | null) => {
    setHoveredItem(itemId)
  }

      return (
    <div className="fixed left-0 top-0 bottom-0 z-50">
      {/* Left-side Dock */}
             <div 
         className="h-full border-r border-white/10 shadow-2xl bg-stone-800/40 backdrop-blur-[40px]"
       >
        <div className="flex flex-col items-center gap-1 px-2 py-4 h-full">
          {dockItems.map((item) => {
            const Icon = item.icon
            const isHovered = hoveredItem === item.id
            const isActive = item.isActive
            const isOpen = item.isOpen
            
            return (
              <div
                key={item.id}
                className="relative group"
                onMouseEnter={() => handleItemHover(item.id)}
                onMouseLeave={() => handleItemHover(null)}
                onClick={() => handleItemClick(item.id)}
              >
                                                 <div
                  className={`relative p-2 rounded cursor-pointer transition-all duration-200`}
                  style={{
                    background: isActive || isHovered
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'transparent',
                    backdropFilter: isActive || isHovered
                      ? 'blur(20px) saturate(150%)'
                      : 'none',
                    WebkitBackdropFilter: isActive || isHovered
                      ? 'blur(20px) saturate(150%)'
                      : 'none'
                  }}
                >
                  {/* Icon */}
                  <div className="relative z-10 text-white">
                    <Icon 
                      size={20} 
                      strokeWidth={1.5}
                    />
                  </div>
                  
                                     {/* Active Indicator - Left Edge */}
                   {isActive && (
                     <div 
                       className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-4 rounded-full"
                       style={{
                         background: 'linear-gradient(180deg, #60a5fa, #3b82f6)',
                         boxShadow: '0 0 4px rgba(59, 130, 246, 0.6)'
                       }}
                     />
                   )}
                   
                   {/* Opened Indicator - Left Edge */}
                   {isOpen && !isActive && (
                     <div 
                       className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-2 rounded-full"
                       style={{
                         background: 'rgba(255, 255, 255, 0.4)',
                         boxShadow: '0 0 2px rgba(255, 255, 255, 0.2)'
                       }}
                     />
                   )}
                </div>
                
                {/* Tooltip */}
                {isHovered && (
                  <div 
                    className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 text-sm rounded-lg whitespace-nowrap opacity-0 animate-in fade-in duration-200"
                    style={{
                      background: 'rgba(0, 0, 0, 0.9)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      color: 'white',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    {item.label}
                    <div className="absolute top-1/2 right-full transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent" style={{ borderRightColor: 'rgba(0, 0, 0, 0.9)' }}></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 