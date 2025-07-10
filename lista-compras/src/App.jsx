import ListaCompras from './ListaCompras'
import './App.css'

function App() {

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-white p-6 rounded-md w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-black mt-4 mb-4 ">Lista de Compras</h1>
        <ListaCompras />      
    </div>
  )
}

export default App
