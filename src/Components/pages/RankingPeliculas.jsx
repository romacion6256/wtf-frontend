import React, { useState, useEffect  } from 'react';
import SidebarAdmin from './SidebarAdmin';
import '../../index.css';
import  Alerta  from '../elements/Alerta';



const RankingPeliculas = () => {

    const [peliculas, setPeliculas] = useState([]);
    const [cargandoPeliculas, setCargandoPeliculas] = useState(true); // Estado para controlar la carga
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");


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



    return (
        <SidebarAdmin>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Lista de Películas</h2>
                {cargandoPeliculas ? (
                    <div className="flex justify-center items-center" style={{ height: "100px" }}>
                        <div className="loader" /> {/* Círculo de carga */}
                    </div>
                ) : peliculas.length > 0 ? (
                    <ul>
                        {peliculas.sort((a, b) => b.puntuacion - a.puntuacion).map((pelicula) => ( // Ordena las películas por puntuación
                            <li key={pelicula.idMovie} className="mb-6 border-b pb-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="mb-1">
                                            <strong>Título: </strong>{pelicula.movieName}
                                        </div>
                                        <div className="mb-1">
                                            <strong>Calificación: </strong>{pelicula.puntuacion}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay películas disponibles</p>
                )}
            </div>
            
        </SidebarAdmin>
    );
};

export default RankingPeliculas;
