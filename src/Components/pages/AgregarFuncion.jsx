import React, { useState, useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin';

const sucursales = ['Punta Carretas', 'Ciudad Vieja', 'Pocitos', 'Carrasco', 'Tres Cruces', 'Centro', 'Malvin', 'Buceo'];
const fechas = ['2024-10-10', '2024-10-12', '2024-10-15'];

const AgregarFuncion = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState('');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [horaFormato, setHoraFormato] = useState('');

    useEffect(() => {
        // Simulación de llamada a la base de datos para obtener las películas creadas
        const obtenerPeliculas = async () => {
            // Aquí deberías hacer la llamada real a tu base de datos
            const peliculasCreadas = ['Minions', 'Smile', 'Joker']; // Ejemplo de datos
            setPeliculas(peliculasCreadas);
        };
        obtenerPeliculas();
    }, []);

    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setPeliculaSeleccionada('');
        setSucursalSeleccionada('');
        setFechaSeleccionada('');
        setHoraFormato('');
    };

    const handleGuardarFuncion = () => {
        // Lógica para guardar la función en la base de datos
        console.log('Función guardada:', { peliculaSeleccionada, sucursalSeleccionada, fechaSeleccionada, horaFormato });
        handleCerrarPopup();
    };

    return (
        <SidebarAdmin>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Funciones</h2>
                <button
                    onClick={handleAgregarClick}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Agregar
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Nueva Función</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <select
                                    value={peliculaSeleccionada}
                                    onChange={(e) => setPeliculaSeleccionada(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="" disabled>Selecciona una película</option>
                                    {peliculas.length > 0 ? (
                                        peliculas.map((pelicula, index) => (
                                            <option key={index} value={pelicula}>{pelicula}</option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No hay películas disponibles</option>
                                    )}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Sucursal</label>
                                <select
                                    value={sucursalSeleccionada}
                                    onChange={(e) => setSucursalSeleccionada(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="" disabled>Selecciona una sucursal</option>
                                    {sucursales.map((sucursal, index) => (
                                        <option key={index} value={sucursal}>{sucursal}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Fecha</label>
                                <select
                                    value={fechaSeleccionada}
                                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="" disabled>Selecciona una fecha</option>
                                    {fechas.map((fecha, index) => (
                                        <option key={index} value={fecha}>{fecha}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Hora/Formato</label>
                                <input
                                    type="text"
                                    value={horaFormato}
                                    onChange={(e) => setHoraFormato(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Ejemplo: 18:30 hs - 2D Esp"
                                />
                            </div>
                            <button
                                onClick={handleGuardarFuncion}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 mr-2"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={handleCerrarPopup}
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </SidebarAdmin>
    );
};

export default AgregarFuncion;
