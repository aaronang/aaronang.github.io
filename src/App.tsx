import Prototype1 from './components/Prototype1'

function App() {
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="container mx-auto">
        {/* Bento Grid */}
        <div className="space-y-6">
          {/* First Row */}
          <div className="w-full">
            {/* Prototype 1 - Canvas */}
            <div className="w-full">
              <Prototype1 />
            </div>
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default App
