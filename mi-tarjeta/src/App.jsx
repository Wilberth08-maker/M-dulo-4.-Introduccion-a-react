import './index.css'
import Tarjeta from './Tarjeta'

function App() {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-green-300 to-yellow-300 p-4'>
      <h1 className="text-5xl font-extrabold text-black mb-8 text-shadow-lg animate-pulse justify-center align-middle align-items-center">Mi tarjeta de presentación</h1>
      {/* Renderizamos la tarjeta */}
      <Tarjeta />
    </div>
  ) 
}

export default App
