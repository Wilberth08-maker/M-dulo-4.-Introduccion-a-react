import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');

  // Cálculo de tiempo total optimizado con useMemo
  const tiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el tiempo total
  useEffect(() => {
    document.title = `Total: ${tiempoTotal} minutos`;
  }, [tiempoTotal]);  // Se ejecuta cada vez que las tareas cambian


  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion)
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-200 p-6 rounded-md w-full h-screen">
      <h1 className="text-2xl font-bold">Contador de Tareas</h1>
      <div className="flex flex-col gap-2 w-full justify-center items-center bg-gray-100 p-4 rounded-md">
        <input 
          className="flex border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 h-12 w-full"
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          placeholder="Nombre de la tarea" 
        />
        <input 
          className="flex border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 h-12 w-full"
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          placeholder="Duración en minutos" 
        />
        <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <h2>Tareas</h2>
      <ul className="flex flex-col gap-2 w-full space-y-2">
        {tareas.map((tarea, index) => (
          <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md w-full">
            <li key={index} className="flex items-center justify-between gap-4 w-full bg-white p-4 rounded-md">
              {tarea.nombre}: {tarea.duracion} minutos
              <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200" onClick={() => eliminarTarea(index)}>Eliminar</button>            
            </li>
          </div>
        ))}
      </ul>

      <h3 className="text-2xl font-bold">Total de tiempo: {tiempoTotal} minutos</h3>
    </div>
  );
}

export default App;