import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';

const AgregarPelicula = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [director, setDirector] = useState('');
    const [duracion, setDuracion] = useState('');
    const [año, setAño] = useState('');


    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setTitulo('');
        setDirector('');
    };

    const handleGuardarPelicula = () => {
        // Aquí puedes manejar la lógica para guardar la película
        console.log('Pelicula guardada:', { titulo, director,duracion,año });
        handleCerrarPopup();
    };


    return (
        <SidebarAdmin>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Películas</h2>
                <button
                    onClick={handleAgregarClick}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Agregar
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Nueva Película</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <input
                                    type="text"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Título de la película"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Director</label>
                                <input
                                    type="text"
                                    value={director}
                                    onChange={(e) => setDirector(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Director de la película"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Año</label>
                                <input
                                    type="text"
                                    value={año}
                                    onChange={(e) => setAño(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Año de lanzamiento"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Duración</label>
                                <input
                                    type="text"
                                    value={duracion}
                                    onChange={(e) => setDuracion(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Duración de la película"
                                />
                            </div>
                            <button
                                onClick={handleGuardarPelicula}
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

export default AgregarPelicula;
