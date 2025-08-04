import React, { useState } from 'react'
import { ArrowUp } from 'lucide-react'

interface Message {
  id: number
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
}

const Motion: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user' as const,
        content: inputValue,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
      setInputValue('')
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai' as const,
          content: 'I understand you want to create motion. Let me help you with that animation behavior.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

     return (
     <div className="flex h-full bg-stone-50 text-sm overflow-hidden">
      {/* Left Side - Previewer */}
      <div className="flex-1 border-r border-stone-200 bg-white">
        {/* Preview Canvas */}
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 p-8">
          <div className="w-64 h-64 bg-white rounded-lg shadow-lg border border-stone-200 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 animate-pulse"></div>
              <p className="text-stone-600 text-sm">Preview Area</p>
              <p className="text-stone-400 text-xs mt-1">Your animation will appear here</p>
            </div>
          </div>
        </div>
      </div>

                    {/* Right Side - Chat */}
       <div className="w-96 flex flex-col bg-white h-full">
         {/* Messages */}
         <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.type === 'ai'
                    ? 'bg-stone-100 text-stone-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
        
                                   {/* Input Area */}
         <div className="p-3 flex-shrink-0 h-auto">
           <div className="relative">
             <textarea
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyPress={handleKeyPress}
               placeholder="Describe your animation (e.g., 'Make the button bounce when clicked')"
               className="w-full px-3 py-2 pr-12 border border-stone-300 rounded-md resize-none focus:outline-none min-h-[80px] max-h-[200px] bg-stone-50"
               style={{ height: 'auto' }}
               onInput={(e) => {
                 const target = e.target as HTMLTextAreaElement
                 target.style.height = 'auto'
                 target.style.height = Math.min(target.scrollHeight, 200) + 'px'
               }}
             />
             <button
               onClick={handleSendMessage}
               disabled={!inputValue.trim()}
               className="absolute bottom-2 right-2 p-1.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               <ArrowUp size={14} />
             </button>
           </div>
           <p className="text-xs text-stone-500 mt-2">
             Press Enter to send, Shift+Enter for new line
           </p>
         </div>
      </div>
    </div>
  )
}

export default Motion 