import React, { useState, useEffect, useRef } from 'react';

function Bitacora() {
    const [planetas, setPlanetas] = useState(
        JSON.parse(localStorage.getItem('planetas')) || []
    );
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const inputImagenRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('planetas', JSON.stringify(planetas));
    }, [planetas]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nuevoPlaneta = {
            nombre,
            descripcion,
            imagen: imagen ? URL.createObjectURL(imagen) : null,
        };

        setPlanetas([...planetas, nuevoPlaneta]);
        setNombre('');
        setDescripcion('');
        setImagen(null);

        if (inputImagenRef.current) {
            inputImagenRef.current.value = ''; // Limpiar el input de imagen
        }
    };

    const handleDelete = (index) => {
        const confirmar = window.confirm("¿Estás seguro de eliminar este planeta?");
        if (!confirmar) return;
        
        const nuevosPlanetas = [...planetas];
        nuevosPlanetas.splice(index, 1);
        setPlanetas(nuevosPlanetas);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-cyan-400 text-center mb-4">Bitácora de Exploración</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nombre del planeta"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
                />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                    className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
                />
                <input
                    type="file"
                    onChange={(e) => setImagen(e.target.files[0])}
                    ref={inputImagenRef}
                    className="w-full text-sm text-gray-300"
                />
                <button type="submit" className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow">
                    Guardar
                </button>
            </form>

            <h2 className="text-xl font-semibold text-pink-400 mt-6">🌍 Planetas Registrados</h2>
            <ul className="space-y-4 mt-2">
                {planetas.map((planeta, index) => (
                    <li key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-900">
                        <h3 className="text-lg font-bold text-yellow-300">{planeta.nombre}</h3>
                        <p>{planeta.descripcion}</p>
                        {planeta.imagen && (
                            <img src={planeta.imagen} alt={planeta.nombre} className="mt-2 rounded-md max-h-40 object-cover" />
                        )}
                        <button
                            onClick={() => handleDelete(index)}
                            className="mt-2 bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Bitacora;