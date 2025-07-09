function Tarjeta() {
    // Definimos la información estática de la tarjeta
    const nombre = "Wilberth Martínez";
    const profesion = "Desarrollador Web";
    const mensaje = "¡Bienvenido a mi tarjeta de presentación!";

    // Retornamos el JSX que representa la tarjeta
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-80 text-center transform hover:rotate-0 transition-transform duration-300 ease-in-out border-4 border-yellow-300">
            <h2 className="text-4xl font-extrabold text-purple-700 mb-2 animate-bounce">{nombre}</h2>
            <h4 className="text-2xl font-bold text-pink-600 mb-3">{profesion}</h4>
            <p className="text-lg text-gray-700 font-medium italic">{mensaje}</p>
        </div>
    </div>
    );
}

export default Tarjeta;
