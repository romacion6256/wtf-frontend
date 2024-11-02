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
    const [peliculas, setPeliculas] = useState([]);


    useEffect(() => {
        const obtenerGeneros = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/genre/todos');
                const generosCreados = await response.json();
                setGeneros(generosCreados);
            } catch (error) {
                console.error('Error al obtener los géneros:', error);
            }
        };
        obtenerGeneros();
    }, []);

    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    // Obtener películas
    useEffect(() => {
        const obtenerPeliculas = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/movie/obtenerTodas');
                const peliculasCargadas = await response.json();
                setPeliculas(peliculasCargadas);
            } catch (error) {
                console.error('Error al obtener las películas:', error);
            }
        };
        obtenerPeliculas();
    }, []);

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setTitulo('');
        setDirector('');
        setDuracion('');
        setAño('');
        setGeneroSeleccionado('');
    };

    const handleGuardarPelicula = async () => {
        
        if (!titulo || !año || !director || !duracion || !generoSeleccionado ) {
            alert('Por favor, completa todos los campos antes de guardar la pelicula.');
            return; // Detiene la ejecución si hay campos vacíos
        }
        const nuevaPelicula = {
            movieName: titulo,
            movieYear: año,
            nombreDirector: director,
            duracion: duracion,
            genero: generoSeleccionado
        };
    
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const response = await fetch(`http://localhost:8080/api/movie/agregarPelicula/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaPelicula),
            });
    
            if (response.ok) {
                alert('Película agregada correctamente');
                const peliculasActualizadas = await fetch('http://localhost:8080/api/movie/obtenerTodas');
                setPeliculas(await peliculasActualizadas.json());
            } else {
                console.error('Error al agregar la película');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    
        handleCerrarPopup();
    };

    const handleEliminarPelicula = async (idPelicula) => {
        if (!idPelicula) {
            console.error("ID de película no proporcionado.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/movie/eliminar/${idPelicula}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Película eliminada correctamente');
                // Actualizar la lista de películas
                //setPeliculas(peliculas.filter((pelicula) => pelicula.id !== idPelicula));
                const peliculasActualizadas = await fetch('http://localhost:8080/api/movie/obtenerTodas');
                setPeliculas(await peliculasActualizadas.json());
            } else {
                console.error('Error al eliminar la película');
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
        }
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

                {/* Mostrar la lista de películas */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Lista de Películas</h3>
                    <ul>
                        {peliculas.length > 0 ? (
                            peliculas.map((pelicula) => (
                                <li key={pelicula.idMovie} className="mb-6 border-b pb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="mb-1">
                                                <strong>Título: </strong>{pelicula.movieName}
                                               
                                            </div>
                                            <div className="mb-1">
                                                <strong>Año: </strong>{pelicula.year}
                                                
                                            </div>
                                            <div className="mb-1">
                                                <strong>Director: </strong>{pelicula.directorName}
                                                
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEliminarPelicula(pelicula.idMovie)}
                                            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No hay películas disponibles</p>
                        )}
                    </ul>
                </div>

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
                                        generos.map((genero) => (
                                            <option key={genero.idGenre} value={genero.name}>{genero.name}</option>
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
