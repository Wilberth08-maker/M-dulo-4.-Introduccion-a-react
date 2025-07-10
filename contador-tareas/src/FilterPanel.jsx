import React from 'react'

function FilterPanel({filtroDuracion, setFiltroDuracion }) {

    return (
        <div className="flex gap-2 w-full justify-center items-center bg-gray-100 p-4 rounded-md">
            <div className="flex gap-2 w-full justify-center items-center bg-gray-100 p-4 rounded-md">
                <label htmlFor="filtroDuracion">Filtrar por duración</label>
                <select id="filtroDuracion" value={filtroDuracion} onChange={(e) => setFiltroDuracion(e.target.value)}>
                    <option value="all">Todas</option>
                    <option value="5">5 minutos</option>
                    <option value="10">10 minutos</option>
                    <option value="15">15 minutos</option>
                    <option value="20">20 minutos</option>
                    <option value="25">25 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="35">35 minutos</option>
                </select>
                <button 
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200" 
                onClick={() => {
                    setFiltroDuracion('all')
                }}
                >Limpiar filtros</button>

            </div>
        </div>
    )
}

export default FilterPanel