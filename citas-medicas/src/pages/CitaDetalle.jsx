import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; 

function CitaDetalle() {
    const { id } = useParams();

    const citasDeEjemplo = [
        { id: 1, paciente: "Juan Pérez", fecha: "15 de Diciembre, 2024", hora: "10:30 AM", motivo: "Consulta de rutina y revisión de resultados." },
        { id: 2, paciente: "Ana García", fecha: "15 de Diciembre, 2024", hora: "11:00 AM", motivo: "Chequeo anual y análisis de sangre." },
        { id: 3, paciente: "Luis Rodríguez", fecha: "16 de Diciembre, 2024", hora: "09:00 AM", motivo: "Revisión post-operatoria." },
    ];

    const cita = citasDeEjemplo.find(c => c.id === parseInt(id));

    if (!cita) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
                <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Cita no encontrada</h2>
                    <p className="text-gray-600">La cita con ID {id} no existe.</p>
                    <Link to="/citas" className="mt-6 inline-block text-blue-500 hover:underline">Volver a la lista de citas</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
            <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 max-w-lg w-full">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-3xl font-extrabold text-blue-600">Detalles de la Cita</h2>
                        <p className="text-sm font-semibold text-gray-500 mt-1">{cita.fecha} - {cita.hora}</p>
                    </div>
                    <Link to="/citas" className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>

                <div className="space-y-4 text-gray-700">
                    <div className="border-b border-gray-200 pb-2">
                        <p className="text-sm font-medium text-gray-500">Paciente</p>
                        <p className="text-lg font-semibold mt-1">{cita.paciente}</p>
                    </div>
                    <div className="border-b border-gray-200 pb-2">
                        <p className="text-sm font-medium text-gray-500">ID de la Cita</p>
                        <p className="text-lg font-semibold mt-1">{cita.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Motivo de la Cita</p>
                        <p className="text-lg mt-1">{cita.motivo}</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition-colors duration-300">
                        Cancelar Cita
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CitaDetalle;