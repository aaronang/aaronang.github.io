import { useState } from 'react'

interface WebViewProps {
  url: string
  title?: string
}

export default function WebView({ url, title = "Web View" }: WebViewProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="h-full w-full flex flex-col bg-white">
      {/* Header with URL display */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="flex-1 ml-4">
          <div className="text-sm text-gray-600 truncate">{url}</div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading {title}...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-2">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load page</h3>
            <p className="text-gray-600 mb-4">Unable to load {url}</p>
            <button 
              onClick={() => {
                setHasError(false)
                setIsLoading(true)
                // Force iframe reload by changing the key
                const iframe = document.querySelector('iframe') as HTMLIFrameElement
                if (iframe) {
                  iframe.src = iframe.src
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Iframe */}
      {!hasError && (
        <iframe
          src={url}
          className="flex-1 w-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          title={title}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          loading="lazy"
        />
      )}
    </div>
  )
} 