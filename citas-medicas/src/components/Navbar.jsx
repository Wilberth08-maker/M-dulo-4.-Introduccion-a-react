
const Navbar = () => {
    return (
        <nav className="bg-gray shadow-sm p-4 flex items-center justify-between border-b border-gray-100 relative z-10 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
            {/* Logo de Airbnb a la izquierda */}
            <div className="flex items-center">
                <Link to="https://www.airbnb.mx/" className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors duration-300">
                    {/* SVG de Airbnb  */}
                    {/* IMAGEN DEL LOGO DE AIRBNB DESDE LA URL */}
                    <img
                        src="https://www.svgrepo.com/show/475697/airbnb-color.svg" // 
                        alt="Airbnb Logo" // <-- Texto alternativo para accesibilidad
                        className="w-8 h-8 md:w-10 md:h-10" // <-- Clases de tamaño y estilo
                    />
                    <span className="text-xl md:text-2xl font-bold text-red-500">airbnb</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
