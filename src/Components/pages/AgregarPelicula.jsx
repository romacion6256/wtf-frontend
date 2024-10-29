import React, { useState, useEffect  } from 'react';
import SidebarAdmin from './SidebarAdmin';



const AgregarPelicula = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [generos, setGeneros] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [director, setDirector] = useState('');
    const [duracion, setDuracion] = useState('');
    const [año, setAño] = useState('');
    const [generoSeleccionado, setGeneroSeleccionado] = useState('');


    useEffect(() => {
        // Simulación de llamada a la base de datos para obtener generos creados
        const obtenerGeneros = async () => {
            // Aquí deberías hacer la llamada real a tu base de datos
            const generosCreados = ['Genero 1', 'Genero 2']; // Ejemplo de datos
            setGeneros(generosCreados);
        };
        obtenerGeneros();
    }, []);

    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setTitulo('');
        setDirector('');
        setDuracion('');
        setAño('');
        setGeneroSeleccionado('');
    };

    const handleGuardarPelicula = () => {
        // Aquí puedes manejar la lógica para guardar la película
        console.log('Pelicula guardada:', { titulo, director,duracion,año,generoSeleccionado });
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
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Género</label>
                                <select
                                    value={generoSeleccionado}
                                    onChange={(e) => setGeneroSeleccionado(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="" disabled>Selecciona un genero</option>
                                    {generos.length > 0 ? (
                                        generos.map((genero, index) => (
                                            <option key={index} value={genero}>{genero}</option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No hay géneros disponibles</option>
                                    )}
                                    
                                </select>
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
