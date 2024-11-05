import React, { useState , useEffect  } from 'react';
import Layout from './Layout';
import Rating from 'react-rating-stars-component';
import axios from 'axios';

const CalificarPelicula = () => {
    const [reservas, setReservas] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [cargandoReservas, setCargandoReservas] = useState(true);
    const [reservasPorFuncion, setReservasPorFuncion] = useState([]);
    const [rating, setRating] = useState(0); 
    const [popupVisible, setPopupVisible] = useState(false);

    

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsOpen(true);
        setRating(0); 
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedMovie(null);
    };


    const handleRating = (value) => {
        setRating(value);
        submitRating(value);
    };

    // Obtener reservas
    useEffect(() => {
        const obtenerReservas = async () => {
            setCargandoReservas(true);
            try {
                const userId = JSON.parse(localStorage.getItem("user")).id;
                const response = await fetch(`http://localhost:8080/api/reservation/misReservas/${userId}`);
                const reservasCargadas = await response.json();
                await fetch(`http://localhost:8080/api/reservation/actualizarReservas`, {
                    method: 'GET',
                });
                console.log(reservasCargadas)
                const reservasFinalizadas = reservasCargadas.filter(reservas => reservas.status === 'Finalizada');
                setReservas(reservasFinalizadas);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
            } finally {
                setCargandoReservas(false); // Termina el cargador
            }
        };
        obtenerReservas();
    }, []);

    const submitRating = async (value) => {
        try {
            const response = await axios.post(`/api/movie/calificar/${selectedMovie.idMovie}`, {
                puntuacion: value, // El nombre del campo en el payload debe coincidir con lo que se espera en el backend
            });

            if (response.status === 200) {
                console.log(`La película "${selectedMovie.movieName}" fue calificada con ${value} estrellas.`);
                closeModal();
            } else {
                console.error('Error al guardar la calificación');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };
    const handleClosePopup = () => {
        setPopupVisible(false);
        
    };
    const handleEditarReservas = (reservasGrupo) => {
        setReservasPorFuncion(reservasGrupo);
        setPopupVisible(true);
    };
    const agruparReservasPorFuncion = () => {
        const grupos = reservas.reduce((acc, reserva) => {
            const { idFunction } = reserva.function;
            if (!acc[idFunction]) {
                acc[idFunction] = [];
            }
            acc[idFunction].push(reserva);
            return acc;
        }, {});
        return Object.entries(grupos);
    };

    return (
        <Layout>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Calificar Función</h2>
                {cargandoReservas ? (
                    <div className="flex justify-center items-center" style={{ height: "100px" }}>
                        <div className="loader" />
                    </div>
                ) : reservas.length > 0 ? (
                    agruparReservasPorFuncion().map(([idFunction, reservasGrupo]) => (
                        <div key={idFunction} className="flex justify-between items-center border-b pb-2 mb-2">
                            <div className="flex flex-col">
                                <span className="font-medium">Película: {reservasGrupo[0].function.movie.movieName}</span>
                                <span className="font-gray-600">Sucursal: {reservasGrupo[0].function.room.branch.branchName}</span>
                                <span className="text-gray-600">Fecha: {reservasGrupo[0].function.date}</span>
                                <span className="text-gray-600">Hora: {reservasGrupo[0].function.time}</span>
                                <span className="text-gray-600">Formato: {reservasGrupo[0].function.format}</span>
                                <span className="text-gray-600">Subtitulada: {reservasGrupo[0].function.subtitled ? 'Sí' : 'No'}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditarReservas(reservasGrupo)}
                                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                >
                                    Calificar
                                </button>
                            </div>
                            </div>
                    ))
                ) : (
                    <p>No hay funciones disponibles</p>
                )}
            
            {popupVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-96 overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-4">Reservas para la función</h3>
                    <ul className="space-y-2">
                        {reservasPorFuncion.map((reserva) => (
                            <li key={reserva.idReservation} className="flex justify-between items-center">
                                <span>ID Reserva: {reserva.idReservation}</span>
                                <span>Asiento: Fila {reserva.rowSeat}, Columna {reserva.columnSeat}</span>
                                <button
                                    onClick={() => openModal(reserva)}
                                    className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                                >
                                    Calificar
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleClosePopup}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        )}

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h3 className="text-lg font-semibold mb-4">Calificar</h3>
                            <Rating
                                count={5}
                                onChange={handleRating}  
                                size={30}
                                activeColor="#ffd700"
                            />
                            <button
                                onClick={closeModal}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CalificarPelicula;
