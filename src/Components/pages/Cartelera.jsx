import React, { useEffect, useState } from 'react';
import Layout from './Layout'; // Importa el componente Layout
import '../../index.css';

const Cartelera = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [cargando, setCargando] = useState(true);

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
                        >
                            {pelicula.movieName} {/* Muestra el nombre de la película */}
                        </div>
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Cartelera;
