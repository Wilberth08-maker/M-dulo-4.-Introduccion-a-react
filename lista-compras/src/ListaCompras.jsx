import { useState } from "react";

function ListaCompras() {
    // Definir el estado para la lista de compras
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState("");

    // Función para agregar un nuevo producto a la lista
    const agregarProducto = () => {
        if (nuevoProducto.trim() !== "") {
            setProductos([...productos, nuevoProducto]);
            setNuevoProducto("");
        }
    };

    // Función para eliminar un producto de la lista
    const eliminarProducto = (index) => {
        const nuevoProductos = productos.filter((_, i) => i !== index);
        setProductos(nuevoProductos);
    };

    return (
        <div className="flex flex-col items-center gap-6 bg-gray-200 p-6 rounded-md w-3/4">
            <div className="flex flex-col gap-2 w-full justify-center items-center bg-gray-100 p-4 rounded-md">
                <input
                    className="flex border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 h-12 w-full"
                    placeholder="Agregar producto"
                    type="text"
                    value={nuevoProducto}
                    onChange={(e) => setNuevoProducto(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200" onClick={agregarProducto}>Agregar</button>
            </div>
            <ul className="flex flex-col gap-2 w-full space-y-2">
                {productos.map((producto, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md w-full">
                        <li key={index} className="flex items-center justify-between gap-4 w-full bg-white p-4 rounded-md">
                            {producto}
                            <button className="bg-red-500 text-white p-2 rounded-md ml-4 hover:bg-red-600 transition duration-200" onClick={() => eliminarProducto(index)}>Eliminar</button>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default ListaCompras;