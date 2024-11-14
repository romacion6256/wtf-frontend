import React, { useEffect, useState } from 'react';
import Layout from './Layout'; // Importa el componente Layout
import '../../index.css';

const Cartelera = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [cargandoPeliculas, setCargandoPeliculas] = useState(true); // Estado para controlar la carga
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    // Obtener películas
    useEffect(() => {
        const obtenerPeliculas = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/movie/obtenerTodas');
                const peliculasCargadas = await response.json();
                setPeliculas(peliculasCargadas);
            } catch (error) {
                console.error('Error al obtener las películas:', error);
            } finally {
                setCargando(false); // Finaliza la carga
            }
        };
        obtenerPeliculas();
    }, []);

    // Obtener películas y actualizar puntuaciones
    useEffect(() => {
        const actualizarPuntuacionesYObtenerPeliculas = async () => {
            setCargandoPeliculas(true); 

            try {
                // Llama al endpoint para actualizar las puntuaciones
                await fetch('http://localhost:8080/api/movie/actualizarPuntuaciones', {
                    method: 'POST',
                });

                // Después de actualizar, obtén todas las películas
                const response = await fetch('http://localhost:8080/api/movie/obtenerTodas');
                const peliculasCargadas = await response.json();
                setPeliculas(peliculasCargadas);
            } catch (error) {
                console.error('Error al obtener las películas:', error);
                setAlertMessage("Hubo un error al cargar las películas");
                setAlertType("error");
            } finally {
                setCargandoPeliculas(false); // Termina el cargador
            }
        };
        actualizarPuntuacionesYObtenerPeliculas();
    }, []);

    const seleccionarPelicula = (pelicula) => {
        setPeliculaSeleccionada(pelicula);
        console.log("pelicula seleccionada",pelicula);
    };

    return (
        <Layout active="cartelera">
            <h2 className="text-2xl font-semibold mb-4">Cartelera</h2>
            
            {cargando ? (
                // Círculo de carga mientras se obtienen las películas
                <div className="flex justify-center items-center" style={{ height: "200px" }}>
                    <div className="loader" /> {/* Clase para el círculo de carga */}
                </div>
            ) : peliculas.length === 0 ? (
                // Mensaje si no hay películas disponibles
                <div className="text-center text-lg font-medium">
                    No hay películas disponibles.
                </div>
            ) : (
                // Cuadrícula de películas
                <div className="grid grid-cols-3 gap-4">
                    {peliculas.map((pelicula) => (
                        <div
                            key={pelicula.idMovie} // Usa un key único por cada película
                            className="bg-gray-200 p-4 rounded-lg flex items-center justify-center"
                            style={{ height: "200px" }}
                            onClick={() => seleccionarPelicula(pelicula)}
                        >
                            {pelicula.movieName} {/* Muestra el nombre de la película */}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de la película seleccionada */}
            {peliculaSeleccionada && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">
                            {peliculaSeleccionada.movieName}
                        </h3>
                        <p className="mb-4">Genero: {peliculaSeleccionada.genre.name}</p>
                        <p className="mb-4">Director: {peliculaSeleccionada.directorName}</p>
                        <p className="mb-4">Duración: {peliculaSeleccionada.duration}</p>
                        <p className="mb-4">Año de estreno: {peliculaSeleccionada.year}</p>
                        <p className="mb-4">Puntuación promedio: {peliculaSeleccionada.puntuacion}/5</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => setPeliculaSeleccionada(null)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Cartelera;
