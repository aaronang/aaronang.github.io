

export default function About() {
  return (
    <div className="h-full bg-stone-950/80 backdrop-blur-xl p-6">
      <div className="space-y-4">
        <div>
          <p className="text-gray-100 text-sm leading-relaxed">
            This playground was created by me with{' '}
            <a 
              href="https://cursor.sh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline transition-colors"
            >
              Cursor
            </a>
            .
          </p>
        </div>
        
        <div>
          <p className="text-gray-100 text-sm leading-relaxed">
            Icons used in this application are from{' '}
            <a 
              href="https://nucleoapp.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline transition-colors"
            >
              Nucleo
            </a>
             {' '}and{' '}
             <a 
              href="https://lucide.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline transition-colors"
            >
              Lucide
            </a>
            .
          </p>
        </div>
        
        <div>
          <p className="text-gray-100 text-sm leading-relaxed">
            Wallpaper is from{' '}
            <a 
              href="https://unsplash.com/@gilleslambert?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline transition-colors"
            >
              Gilles Lambert
            </a>{' '}
            on{' '}
            <a 
              href="https://unsplash.com/photos/green-leaf-plants-mSK5nNsAsLY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline transition-colors"
            >
              Unsplash.
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 