
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-5 font-sans text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-200">
            <h1 className="text-6xl md:text-8xl font-extrabold text-black-500 mb-2 dark:text-blue-500">404</h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-5 dark:text-white">¡Parece que te has desviado del camino!</h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl dark:text-gray-300">
                La página que buscas no está disponible o nunca existió.
            </p>
            <button
                onClick={() => window.location.href = '/'}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md dark:bg-blue-700 dark:hover:bg-blue-800 dark:shadow-lg"
            >
                Volver a la página principal
            </button>
        </div>
    );
};

export default NotFound;