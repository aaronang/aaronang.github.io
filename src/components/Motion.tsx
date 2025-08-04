import React, { useState } from 'react'
import { ArrowUp, RotateCcw } from 'lucide-react'

interface Message {
  id: number
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
}

interface Toast {
  id: number;
  visible: boolean;
}

const Motion: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [toasts, setToasts] = useState<Toast[]>([])


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
           content: 'I understand you want to create motion. Let me help you with that animation behavior.\n\nThis is a second paragraph to test how the chat handles multiple paragraphs in the responses.\n\nCreating dynamic and engaging motion is a fantastic way to bring your project to life. By leveraging the right animation behaviors, you can control everything from an object\'s position and rotation to its scale and opacity. This level of control allows for precise, fluid movements that can guide a user\'s attention, provide feedback, and create a more intuitive and visually appealing experience. Whether you\'re aiming for a subtle transition or a dramatic effect, mastering these behaviors is key to achieving your desired aesthetic.',
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
           <div className="flex h-full bg-stone-50 text-sm overflow-hidden font-['Geist']">
      {/* Left Side - Previewer */}
             <div className="flex-1 border-r border-stone-200 bg-white relative">
         {/* Preview Canvas */}
                  <div className="h-full flex items-center justify-center bg-white p-8">
           <button
             onClick={() => {
               const newToast = { id: Date.now(), visible: true }
               setToasts([...toasts, newToast])
               setTimeout(() => {
                 setToasts(prev => prev.filter(t => t.id !== newToast.id))
               }, 5000)
             }}
                          className="px-4 py-2 bg-stone-900 text-white rounded-md text-sm"
           >
             Show Toast
           </button>
         </div>
         
                   {/* Toast Container */}
          <div className="absolute bottom-8 right-8 flex flex-col items-end space-y-2">
           {toasts.map(toast => (
             <div
               key={toast.id}
               className="bg-white border border-stone-300 text-stone-800 px-4 py-3 rounded-xl text-sm shadow-lg max-w-xs"
             >
               <div className="font-medium text-stone-900 mb-0.5">Changes saved</div>
               <div className="text-stone-600">Your preferences have been updated successfully.</div>
             </div>
           ))}
         </div>
       </div>

                                         {/* Right Side - Chat */}
        <div className="w-96 flex flex-col bg-stone-50 h-full">
         {/* Messages */}
                   <div className="flex-1 overflow-y-auto p-3 space-y-4">
                                           {messages.map((message) => (
              <div
                key={message.id}
                className="flex justify-start"
              >
                               {message.type === 'user' ? (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <div className="w-full px-2.5 py-2 rounded-lg bg-stone-100 border border-stone-300 shadow-xs">
                    <p className="text-sm text-stone-800">{message.content}</p>
                  </div>
                               ) : (
                  <p className="text-sm text-stone-800 max-w-xs pl-2.5 whitespace-pre-wrap">{message.content}</p>
                )}
             </div>
           ))}
        </div>
        
                                   {/* Input Area */}
         <div className="p-3 pt-0 flex-shrink-0 h-auto">
                       <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Animate the toast notification to appear when the button is clicked."
                className="w-full px-2.5 py-2 pb-10 border border-stone-300 rounded-md resize-none focus:outline-none min-h-[80px] max-h-[200px] bg-white shadow-xs placeholder:text-stone-400"
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px'
                }}
              />

              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                <button
                  className="p-1.5 text-stone-600 rounded-md hover:bg-stone-100 transition-colors"
                >
                  <RotateCcw size={14} />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-1.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUp size={14} />
                </button>
              </div>
            </div>
           
         </div>
      </div>
    </div>
  )
}

export default Motion 