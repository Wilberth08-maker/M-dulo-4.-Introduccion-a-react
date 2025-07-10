import React, { useState, useEffect, useMemo } from 'react';
import FilterPanel from './FilterPanel';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroDuracion, setFiltroDuracion] = useState('all');

  // Efecto secundario: Cargar tareas desde localStorage
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      const tareasParseadas = JSON.parse(tareasGuardadas).map(tarea => ({
        ...tarea,
        duracion: parseInt(tarea.duracion)
      }));
      setTareas(tareasParseadas);
    }
  }, []);

  // Cálculo de tiempo total optimizado con useMemo
  const tiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // Efecto secundario: Actualizar el título del documento cada vez que cambia el tiempo total
  useEffect(() => {
    document.title = `Total: ${tiempoTotal} minutos`;
    // Actualizar localStorage
    localStorage.setItem('tiempoTotal', tiempoTotal);
  }, [tiempoTotal]);  // Se ejecuta cada vez que las tareas cambian


  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        fechaCreacion: new Date().toISOString()
      };
      localStorage.setItem('tareas', JSON.stringify([...tareas, nuevaTareaObj]));
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
    // Actualizar localStorage
    localStorage.setItem('tareas', JSON.stringify(nuevasTareas));
  };

  // Función para filtrar las tareas según el filtro seleccionado
  const tareasFiltradas = tareas.filter((tarea) => {
    const cumpleDuracion = filtroDuracion === 'all' || tarea.duracion >= parseInt(filtroDuracion);
    return cumpleDuracion;

  });

  return (
    <div className="flex flex-col items-center gap-6 bg-gray-200 p-6 rounded-md w-full h-screen">
      <h1 className="text-2xl font-bold">Contador de Tareas</h1>
      <FilterPanel 
          filtroDuracion={filtroDuracion}
          setFiltroDuracion={setFiltroDuracion}
      />
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

      <h2 className="text-2xl font-bold">Tareas</h2>
      {tareasFiltradas.length === 0 && <p>No hay tareas que coincidan con los filtros</p>}  
      <ul className="flex flex-col gap-2 w-full space-y-2">
        {tareasFiltradas.map((tarea, index) => (
          <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md w-full">
            <li key={index} className="flex items-center justify-between gap-4 w-full bg-white p-4 rounded-md">
              {tarea.nombre}: {tarea.duracion} minutos
              <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200" onClick={() => eliminarTarea(index)}>Eliminar</button>            
            </li>
          </div>
        ))}
      </ul>

      <h3 className="text-2xl font-bold p-6 mb-6">Total de tiempo: {tiempoTotal} minutos</h3>
    </div>
  );
}

export default App;