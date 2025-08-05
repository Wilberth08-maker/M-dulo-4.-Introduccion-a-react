import { Link } from 'react-router-dom'; 

const citasDeEjemplo = [
    { id: 1, paciente: "Juan Pérez", fecha: "15 de Diciembre, 2024", hora: "10:30 AM" },
    { id: 2, paciente: "Ana García", fecha: "15 de Diciembre, 2024", hora: "11:00 AM" },
    { id: 3, paciente: "Luis Rodríguez", fecha: "16 de Diciembre, 2024", hora: "09:00 AM" },
];

const Citas = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Título y botón para nueva cita */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Tus Citas Médicas</h1>
                    <Link
                        to="/citas/nueva"
                        className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                    >
                        + Nueva Cita
                    </Link>
                </div>

                {/* Lista de citas */}
                <div className="space-y-6">
                    {citasDeEjemplo.length > 0 ? (
                        citasDeEjemplo.map(cita => (
                            <Link
                                to={`/cita/${cita.id}`}
                                key={cita.id}
                                className="block p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500">{cita.fecha} - {cita.hora}</p>
                                        <h2 className="text-xl font-bold text-gray-800 mt-1">{cita.paciente}</h2>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-100">
                            <p className="text-lg text-gray-600">No tienes citas programadas.</p>
                            <p className="text-sm text-gray-400 mt-2">Haz clic en "Nueva Cita" para empezar.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Citas
