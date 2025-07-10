import React from 'react'
import { useState } from 'react';

function FilterPanel() {
    // Estado para el filtro de tarea recientes
    const [filtroRecientes, setFiltroRecientes] = useState(false);

    // Estado para el filtro de tarea por duración
    const [filtroDuracion, setFiltroDuracion] = useState('all');

    return (
        <div className="flex flex-col gap-2 w-full justify-center items-center bg-gray-100 p-4 rounded-md">
            <div className="flex flex-col gap-2 w-full justify-center items-center bg-gray-100 p-4 rounded-md">
                <label htmlFor="filtroRecientes">Filtrar por recientes</label>
                <input type="checkbox" id="filtroRecientes" placeholder="Filtrar por recientes" checked={filtroRecientes} onChange={() => setFiltroRecientes(!filtroRecientes)} />
                <label htmlFor="filtroDuracion">Filtrar por duración</label>
                <select id="filtroDuracion" value={filtroDuracion} onChange={(e) => setFiltroDuracion(e.target.value)}>
                    <option value="all">Todas</option>
                    <option value="1">1 minuto</option>
                </select>
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={() => setFiltroRecientes(!filtroRecientes)}>Filtrar</button>
                <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200" onClick={() => setFiltroDuracion('all')}>Limpiar filtros</button>

            </div>
        </div>
    )
}

export default FilterPanel