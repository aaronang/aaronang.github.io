import { useState } from 'react'

// Custom Feather Icon Component
const FeatherIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>feather</title>
    <g fill="none">
      <path d="M13.9141 6.04669C14.3966 5.89291 14.9272 6.12614 15.1338 6.6004C15.3541 7.10678 15.1216 7.69643 14.6152 7.91681L14.2285 8.08966C10.2586 9.9015 7.27634 12.5886 5.90039 15.4354C5.80424 15.6341 5.65002 15.7855 5.46875 15.8817L5.46387 15.8943C4.46467 18.3639 4.0895 20.4327 4.00391 21.1424L3.98633 21.244C3.87508 21.7384 3.40461 22.0784 2.89062 22.0164C2.34262 21.9501 1.95153 21.4513 2.01758 20.9031L2.07715 20.4871C2.25741 19.3536 2.74854 17.129 3.83496 14.6043L3.88086 14.5125C3.9884 14.3194 4.15277 14.1726 4.34375 14.0867C6.11614 10.7969 9.5613 7.93457 13.8174 6.08282L13.9141 6.04669Z" fill="currentColor" data-glass="origin"></path>
      <path d="M21.996 2.97831C21.9443 2.38904 21.4169 1.95015 20.8353 2.00456C10.3866 2.9187 5.66294 10.0172 3.57739 15.2239C3.38207 15.7115 3.61863 16.2586 4.09897 16.4711L5.18087 16.9499C6.32808 17.459 7.45527 17.6848 7.52185 17.6962C8.74173 17.919 9.86938 18.031 10.9036 18.031C13.0562 18.031 14.8029 17.5472 16.1171 16.5872C16.6465 16.2 17.5038 15.4252 18.1023 14.1039C14.0582 14.8651 13.0046 11.9807 13.0046 11.9807C16.1248 12.7703 19.6729 13.0131 20.6233 9.36491C20.8218 8.49059 20.9483 7.64435 21.0697 6.82729L21.0738 6.79966C21.2651 5.52313 21.4453 4.32071 21.8551 3.6047C21.961 3.42108 22.0159 3.20542 21.996 2.97831Z" fill="currentColor" opacity="0.6" data-glass="blur"></path>
    </g>
  </svg>
)

// Custom Layers Icon Component
const LayersIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M9.12015 8.16C10.1529 7.38542 10.6693 6.99813 11.2364 6.84884C11.737 6.71706 12.2632 6.71705 12.7638 6.84883C13.331 6.99812 13.8474 7.38541 14.8801 8.15999L20.5868 12.44C21.7448 13.3085 22.3238 13.7427 22.5308 14.275C22.7122 14.7413 22.7122 15.2586 22.5308 15.7249C22.3238 16.2573 21.7448 16.6915 20.5868 17.56L14.8801 21.84C13.8474 22.6146 13.331 23.0019 12.7638 23.1512C12.2632 23.2829 11.737 23.2829 11.2364 23.1512C10.6693 23.0019 10.1529 22.6146 9.12014 21.84L3.41349 17.56C2.25552 16.6915 1.67654 16.2573 1.4695 15.7249C1.28816 15.2586 1.28816 14.7413 1.46951 14.275C1.67655 13.7427 2.25553 13.3085 3.41349 12.44L9.12015 8.16Z" 
      fill="currentColor"
    />
    <path 
      d="M9.12015 2.15999C10.1529 1.38542 10.6693 0.998128 11.2364 0.848835C11.737 0.717055 12.2632 0.717055 12.7638 0.848834C13.331 0.998124 13.8474 1.38541 14.8801 2.15999L20.5868 6.43998C21.7448 7.30845 22.3238 7.74269 22.5308 8.27503C22.7122 8.74132 22.7122 9.25864 22.5308 9.72492C22.3238 10.2573 21.7448 10.6915 20.5868 11.56L14.8801 15.84C13.8474 16.6146 13.331 17.0019 12.7638 17.1512C12.2632 17.2829 11.737 17.2829 11.2364 17.1512C10.6693 17.0019 10.1529 16.6146 9.12014 15.84L3.41349 11.56C2.25552 10.6915 1.67654 10.2573 1.4695 9.72492C1.28816 9.25864 1.28816 8.74132 1.46951 8.27504C1.67655 7.74269 2.25553 7.30846 3.41349 6.43998L9.12015 2.15999Z" 
      fill="currentColor" 
      opacity="0.6"
    />
  </svg>
)

// Custom Hearts Icon Component for Attributions
const HeartIcon = ({ size = 24 }: { size?: number; strokeWidth?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>hearts</title>
    <g fill="none">
      <path d="M8.5 4.78424C10.1546 2.73592 13.2346 2.29547 15.4235 4.28452C16.103 4.90199 16.6026 5.7319 16.8331 6.64078C17.2856 8.42808 16.7907 10.1964 15.6778 11.4101C13.8614 13.3908 11.9975 15.3287 10.1458 17.2763C9.23715 18.2318 7.76317 18.2332 6.85345 17.2763C5.00203 15.329 3.13545 13.3874 1.32219 11.4101C0.209283 10.1964 -0.285625 8.42808 0.166894 6.64078C0.397347 5.73191 0.89699 4.90199 1.5765 4.28452C3.76536 2.29547 6.84541 2.73597 8.5 4.78424Z" fill="url(#hearts_gradient_0)" data-glass="origin" mask="url(#hearts_mask)"></path>
      <path d="M8.5 4.78424C10.1546 2.73592 13.2346 2.29547 15.4235 4.28452C16.103 4.90199 16.6026 5.7319 16.8331 6.64078C17.2856 8.42808 16.7907 10.1964 15.6778 11.4101C13.8614 13.3908 11.9975 15.3287 10.1458 17.2763C9.23715 18.2318 7.76317 18.2332 6.85345 17.2763C5.00203 15.329 3.13545 13.3874 1.32219 11.4101C0.209283 10.1964 -0.285625 8.42808 0.166894 6.64078C0.397347 5.73191 0.89699 4.90199 1.5765 4.28452C3.76536 2.29547 6.84541 2.73597 8.5 4.78424Z" fill="url(#hearts_gradient_0)" data-glass="clone" filter="url(#hearts_filter)" clipPath="url(#hearts_clipPath)"></path>
      <path d="M15.5 8.78424C17.1546 6.73592 20.2346 6.29547 22.4235 8.28452C23.103 8.90199 23.6026 9.7319 23.8331 10.6408C24.2856 12.4281 23.7907 14.1964 22.6778 15.4101C20.8614 17.3908 18.9869 19.3407 17.1352 21.2883C16.2266 22.2438 14.7632 22.2332 13.8535 21.2763C12.002 19.329 10.1355 17.3874 8.32219 15.4101C7.20928 14.1964 6.71438 12.4281 7.16689 10.6408C7.39735 9.73191 7.89699 8.90199 8.5765 8.28452C10.7654 6.29547 13.8454 6.73597 15.5 8.78424Z" fill="url(#hearts_gradient_1)" data-glass="blur"></path>
      <path d="M15.5002 8.7844C17.1547 6.7361 20.2351 6.29534 22.4239 8.28439C23.1034 8.90182 23.6026 9.73204 23.8331 10.6408C24.2856 12.4282 23.7907 14.1967 22.6778 15.4104L21.3058 16.8909C19.9256 18.3661 18.5236 19.8277 17.1349 21.2883C16.283 22.184 14.9441 22.2308 14.0305 21.4446L13.8537 21.2766C12.4651 19.8161 11.0683 18.3585 9.69162 16.887L8.3225 15.4104C7.27917 14.2726 6.77864 12.6472 7.09301 10.9758L7.16723 10.6408C7.3977 9.73205 7.89694 8.90182 8.5764 8.28439C10.7652 6.29535 13.8456 6.73615 15.5002 8.7844ZM21.9191 8.84006C20.0674 7.15746 17.4822 7.52406 16.0832 9.25608C15.9408 9.43209 15.7266 9.5344 15.5002 9.5344C15.2738 9.5344 15.0596 9.4321 14.9172 9.25608C13.5181 7.52409 10.9329 7.15748 9.08128 8.84006C8.51149 9.35785 8.08828 10.0584 7.89379 10.8254C7.50353 12.3674 7.93306 13.8761 8.87523 14.9036C10.6825 16.8744 12.5423 18.8085 14.3976 20.76C15.0165 21.4105 15.9838 21.4113 16.592 20.7717L19.3751 17.8459C20.3002 16.8696 21.2199 15.8907 22.1251 14.9036C23.0673 13.8761 23.4968 12.3674 23.1065 10.8254C22.912 10.0584 22.4889 9.35783 21.9191 8.84006Z" fill="url(#hearts_gradient_2)"></path>
      <defs>
        <linearGradient id="hearts_gradient_0" x1="8.5" y1="3" x2="8.5" y2="17.993" gradientUnits="userSpaceOnUse">
          <stop stopColor="#575757"></stop>
          <stop offset="1" stopColor="#151515"></stop>
        </linearGradient>
        <linearGradient id="hearts_gradient_1" x1="15.5" y1="7" x2="15.5" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E3E5" stopOpacity=".6"></stop>
          <stop offset="1" stopColor="#BBBBC0" stopOpacity=".6"></stop>
        </linearGradient>
        <linearGradient id="hearts_gradient_2" x1="15.5" y1="7" x2="15.5" y2="15.686" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
        <filter id="hearts_filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur>
        </filter>
        <clipPath id="hearts_clipPath">
          <path d="M15.5 8.78424C17.1546 6.73592 20.2346 6.29547 22.4235 8.28452C23.103 8.90199 23.6026 9.7319 23.8331 10.6408C24.2856 12.4281 23.7907 14.1964 22.6778 15.4101C20.8614 17.3908 18.9869 19.3407 17.1352 21.2883C16.2266 22.2438 14.7632 22.2332 13.8535 21.2763C12.002 19.329 10.1355 17.3874 8.32219 15.4101C7.20928 14.1964 6.71438 12.4281 7.16689 10.6408C7.39735 9.73191 7.89699 8.90199 8.5765 8.28452C10.7654 6.29547 13.8454 6.73597 15.5 8.78424Z" fill="url(#hearts_gradient_1)"></path>
        </clipPath>
        <mask id="hearts_mask">
          <rect width="100%" height="100%" fill="#FFF"></rect>
          <path d="M15.5 8.78424C17.1546 6.73592 20.2346 6.29547 22.4235 8.28452C23.103 8.90199 23.6026 9.7319 23.8331 10.6408C24.2856 12.4281 23.7907 14.1964 22.6778 15.4101C20.8614 17.3908 18.9869 19.3407 17.1352 21.2883C16.2266 22.2438 14.7632 22.2332 13.8535 21.2763C12.002 19.329 10.1355 17.3874 8.32219 15.4101C7.20928 14.1964 6.71438 12.4281 7.16689 10.6408C7.39735 9.73191 7.89699 8.90199 8.5765 8.28452C10.7654 6.29547 13.8454 6.73597 15.5 8.78424Z" fill="#000"></path>
        </mask>
      </defs>
    </g>
  </svg>
)

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
      label: 'Notes',
      icon: FeatherIcon,
      isActive: activeItem === 'home' && windows?.['home']?.isOpen,
      isOpen: windows?.['home']?.isOpen || false
    },
         {
       id: 'prototype1',
       label: 'Draw',
       icon: LayersIcon,
      isActive: activeItem === 'prototype1' && windows?.['prototype1']?.isOpen,
      isOpen: windows?.['prototype1']?.isOpen || false
    },
    {
      id: 'about',
      label: 'About',
      icon: HeartIcon,
      isActive: activeItem === 'about' && windows?.['about']?.isOpen,
      isOpen: windows?.['about']?.isOpen || false
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
        <div className="flex flex-col items-center justify-start gap-1 px-2 py-4 h-full">
          {/* All Dock Items (including heart) */}
          <div className="flex flex-col items-center gap-1">
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
    </div>
  )
} 