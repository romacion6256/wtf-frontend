import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';

const AgregarPelicula = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setTitulo('');
        setImagen(null);
    };

    const handleGuardarPelicula = () => {
        // Aquí puedes manejar la lógica para guardar la película
        console.log('Pelicula guardada:', { titulo, imagen });
        handleCerrarPopup();
    };

    const handleImagenChange = (e) => {
        setImagen(URL.createObjectURL(e.target.files[0]));
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
                                <label className="block text-sm font-medium mb-1">Imagen</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImagenChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {imagen && <img src={imagen} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
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
