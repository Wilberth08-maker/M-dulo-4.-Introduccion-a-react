// Importamos los componentes de React Router necesarios:
// - Routes: contenedor de todas las rutas
// - Route: define una ruta individual
// - Navigate: redirige a otra ruta si se cumple una condición
import { Routes, Route, Navigate } from 'react-router-dom';
// Importamos las "páginas" (componentes de rutas)


const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/cita/:id" element={<CitaDetalle />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);


export default AppRoutes;