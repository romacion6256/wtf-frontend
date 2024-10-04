import React from 'react';
import Layout from './Layout'; // Asegúrate de que la ruta sea correcta
import 'boxicons/css/boxicons.min.css'; // Importa Boxicons

const MisReservas = () => {
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
        {
            titulo: 'Guardians of the Galaxy Vol. 3',
            sucursal: 'Cinepolis Plaza',
            fecha: '2024-10-15',
            hora: '18:00',
            formato: '2D Sub'
        },
        {
            titulo: 'Dune',
            sucursal: 'Cinemex Reforma',
            fecha: '2024-10-18',
            hora: '20:00',
            formato: 'IMAX'
        },
        {
            titulo: 'Black Panther: Wakanda Forever',
            sucursal: 'Cinepolis Interlomas',
            fecha: '2024-10-20',
            hora: '17:30',
            formato: '3D Dub'
        },
        {
            titulo: 'The Batman',
            sucursal: 'Cinemex Perisur',
            fecha: '2024-10-22',
            hora: '21:00',
            formato: '2D Sub'
        },
        {
            titulo: 'Fast X',
            sucursal: 'Cinepolis Plaza',
            fecha: '2024-10-25',
            hora: '19:15',
            formato: '4D'
        },
        {
            titulo: 'The Flash',
            sucursal: 'Cinemex Reforma',
            fecha: '2024-10-27',
            hora: '22:00',
            formato: '3D Esp'
        },
        {
            titulo: 'John Wick: Chapter 4',
            sucursal: 'Cinepolis Galerías',
            fecha: '2024-10-30',
            hora: '20:30',
            formato: '2D Sub'
        },
        {
            titulo: 'Mission: Impossible - Dead Reckoning',
            sucursal: 'Cinemex Santa Fe',
            fecha: '2024-11-02',
            hora: '18:45',
            formato: 'IMAX'
        },
        {
            titulo: 'Oppenheimer',
            sucursal: 'Cinepolis Altaria',
            fecha: '2024-11-05',
            hora: '19:30',
            formato: '2D Sub'
        }
        
        
    ];

    return (
        <Layout>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Mis Reservas</h2>
                {reservas.length === 0 ? (
                    <p>No tienes reservas en este momento.</p>
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
                                    <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                        Ver Snacks
                                    </button>
                                    <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
                                        Cancelar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
};

export default MisReservas;
