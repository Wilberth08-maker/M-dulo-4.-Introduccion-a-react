import React from 'react'

import { Link } from 'react-router-dom'; 

const imageURL = 'https://pec.cnt.br/wp-content/uploads/2023/05/recepcao-clinica-com-sala-de-espera-no-saguao-das-instalacoes-balcao-de-registro-utilizado-para-pacientes-com-consultas-medicas-balcao-de-recepcao-vazio-no-centro-de-saude-para-visitas-de-check-up.jpg';

const Home = () => { 
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Contenido de texto y botones */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 text-center">
                <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 text-center">   
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fadeInUp">
                            Clínica médica
                        </h1>
                        <p className="mb-8 text-lg md:text-xl text-gray-600 animate-fadeInUp delay-200">
                            Tu salud es nuestra prioridad. Agenda tu cita y empieza a cuidar de ti.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-sm animate-fadeInUp delay-400">
                            <Link
                                to="/citas"
                                className="w-full sm:w-auto px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Citas
                            </Link>
                        </div>
                    </div> 
            </div>

            {/* Imagen lateral */}
            <div className="flex-1 hidden md:flex items-center justify-center p-4 bg-gray-100">
                <div className="relative w-full h-full max-h-[80vh] md:max-h-full overflow-hidden rounded-lg shadow-xl">
                    <img
                        src={imageURL}
                        alt="Clínica médica"
                        className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                    />
                    {/* Opcional: Overlay sutil para la imagen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-10"></div>
                </div>
            </div>
        </div>
    );
};

export default Home
