import { useState, useEffect, useMemo, useRef } from 'react'
import Planeta from "./Planeta"
import Bitacora from "./Bitacora"

function App() {

  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(100)
  const [estadoNave, setEstadoNave] = useState("En orbita")
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [combustibleAgotado, setCombustibleAgotado] = useState(false);
  const intervaloRef = useRef(null);


  // Función que inicia el intervalo
  const iniciarIntervalo = () => {
    if (intervaloRef.current) return 
    intervaloRef.current = setInterval(() => {
      setDistancia(prev => prev + 10)
      setCombustible(prev => {
        if (prev <= 5) { // cuando va a llegar a 0 o menos
          setCombustibleAgotado(true)
          clearInterval(intervaloRef.current)
          intervaloRef.current = null
          return 0
        }
        return prev - 5
      })
    }, 1000)
  }

  useEffect(() => {
    console.log("¡El panel está listo!"); // Montaje

    iniciarIntervalo();

    return () => {
      clearInterval(intervaloRef.current); // Desmontaje
      intervaloRef.current = null;
      console.log("El panel se ha apagado."); // Desmontaje
    };
  }, []);

  // Rellenar combustible
  useEffect(() => {
    if (combustibleAgotado) {

      const timeout = setTimeout(() => {
        setCombustible(100);
        setCombustibleAgotado(false);
        iniciarIntervalo();

      }, 3000);
  
      return () => clearTimeout(timeout);
    }
  }, [combustibleAgotado]);

  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  const aterrizar = () => {

    setEstadoNave("Aterrizando");

    if(intervaloRef.current){
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }

    const nuevoPlaneta = `Planeta ${planetasVisitados.length + 1}`;
    setPlanetasVisitados([...planetasVisitados, nuevoPlaneta]);

    setTimeout (() => {
      setEstadoNave("Aterrizaje exitoso");
    }, 4000)

  };

  const despegar = () => {

    if (intervaloRef.current) return;

    setEstadoNave("Despegando");

    setTimeout (() => {
      setEstadoNave("En orbita");
      iniciarIntervalo();
    }, 3000)    
  };

  


  return (
    
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8 font-mono">
      <div className="flex gap-8">
      {/* Bitácora en la izquierda */}
      <div className="w-1/2 border border-gray-700 bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6 overflow-y-auto max-h-[90vh]">
        <Bitacora />
      </div>
      {/* Panel de control a la derecha */}
      <div className="relative w-1/2 border border-gray-700 bg-gray-800 rounded-2xl shadow-2xl p-6 space-y-6 overflow-y-auto max-h-[90vh]">
        {combustibleAgotado && (
          <div className="absolute inset-0 max-w-xl mx-auto border border-gray-700 bg-red-800 rounded-2xl shadow-2xl p-6 space-y-6 bg-opacity-80 flex items-center justify-center rounded-2xl z-50">
            <p className="text-white-400 text-xl font-bold text-center animate-pulse">
              ⚠️ El combustible se agotó.<br />Recargando automáticamente...
            </p>
          </div>
        )}  
        <h1 className="text-3xl font-bold text-cyan-400 text-center">🚀 Panel de Control</h1>

        <div className="space-y-2 text-lg">
          <p>
            <span className="text-cyan-300">Distancia recorrida:</span> {distancia} km
          </p>
          <p>
            <span className="text-yellow-300">Combustible restante:</span> {combustible}%
          </p>
          <p>
            <span className="text-green-400">{mensajeEstado}</span>
          </p>
        </div>

        <div className="flex justify-center flex-col gap-6">
        <button
            onClick={despegar}
            className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-lg"
          >
            Despegar
          </button>
          <button
            onClick={aterrizar}
            className="bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-lg"
          >
            Aterrizar
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-pink-400">🪐 Planetas Visitados</h2>
          <ul className="list-inside text-white mt-2 space-y-1">
            {planetasVisitados.map((planeta, index) => (
              <li key={index}>
                <Planeta nombre={planeta} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
