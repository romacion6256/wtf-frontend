import React, { useState } from 'react';
import Layout from './Layout';
import Rating from 'react-rating-stars-component';
import axios from 'axios';

const CalificarPelicula = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    //const [rating, setRating] = useState(0); ----> descomentarlo para usar axios

    // Ejemplo de reservas solo para visualización
    const reservas = [
        {
            titulo: 'Avatar: The Way of Water',
            sucursal: 'Cinepolis Plaza',
            fecha: '2024-10-10',
            hora: '19:00',
            formato: '2D Sub'
        },
        {
            titulo: 'Spider-Man: No Way Home',
            sucursal: 'Cinemex Reforma',
            fecha: '2024-10-12',
            hora: '21:30',
            formato: '3D Esp'
        },
        
    ];

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsOpen(true);
        //setRating(0); descomentar para conectar con axios
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedMovie(null);
    };

    // descomentar para conectar con axios <------

    // const handleRating = (value) => {
    //     setRating(value);
    //     submitRating(value);
    // };

    // axios post------------------

    // const submitRating = async (value) => {
    //     try {
    //         const response = await axios.post('/api/calificar', {
    //             movieId: selectedMovie.id,
    //             rating: value,
    //         });

    //         if (response.status === 200) {
    //             console.log(`La película "${selectedMovie.titulo}" fue calificada con ${value} estrellas.`);
    //             closeModal();
    //         } else {
    //             console.error('Error al guardar la calificación');
    //         }
    //     } catch (error) {
    //         console.error('Error al conectar con el servidor:', error);
    //     }
    // };

    return (
        <Layout>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Calificar Función</h2>
                {reservas.length === 0 ? (
                    <p>No tienes funciones vistas en este momento.</p>
                ) : (
                    <ul className="space-y-4">
                        {reservas.map((reserva, index) => (
                            <li key={index} className="flex justify-between items-center border-b pb-2 mb-2">
                                <div className="flex flex-col">
                                    <span className="font-medium">{reserva.titulo}</span>
                                    <span className="text-gray-600">Sucursal: {reserva.sucursal}</span>
                                    <span className="text-gray-600">Fecha: {reserva.fecha}</span>
                                    <span className="text-gray-600">Hora: {reserva.hora}</span>
                                    <span className="text-gray-600">Formato: {reserva.formato}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => openModal(reserva)}
                                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                    >
                                        Calificar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                            <h3 className="text-lg font-semibold mb-4">Calificar {selectedMovie?.titulo}</h3>
                            <Rating
                                count={5}
                                //onChange={handleRating}  axios <-----------
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
