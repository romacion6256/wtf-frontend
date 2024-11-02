import React, { useState, useEffect  } from 'react';
import Layout from './Layout';
import '../../index.css';
import 'boxicons/css/boxicons.min.css'; // Importa Boxicons
import  Alerta  from '../elements/Alerta';

const MisReservas = () => {
    // Ejemplo de reservas solo para visualización
    const [reservas, setReservas] = useState([]);
    const [snacksPopupVisible, setSnacksPopupVisible] = useState(false);
    const [snacksDetalle, setSnacksDetalle] = useState([]); // Estado para los detalles de los snacks


    const [cargandoReservas, setCargandoReservas] = useState(true); // Estado para controlar la carga
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    
    // Obtener reservas
    useEffect(() => {
        const obtenerReservas = async () => {
            setCargandoReservas(true);
            try {
                const userId = JSON.parse(localStorage.getItem("user")).id;
                const response = await fetch(`http://localhost:8080/api/reservation/misReservas/${userId}`);
                const reservasCargadas = await response.json();
                setReservas(reservasCargadas);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
            } finally {
                setCargandoReservas(false); // Termina el cargador
            }
        };
        obtenerReservas();
    }, []);

    const handleCancelarReserva = async (idReservation) => {
        if (!idReservation) {
            console.error("ID de reserva no proporcionado.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/reservation/cancelarReserva/${idReservation}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                setCargandoReservas(true);
                setAlertMessage("Reserva cancelada exitosamente.");
                setAlertType("success");

                const userId = JSON.parse(localStorage.getItem("user")).id;
                const reservasActualizadas = await fetch(`http://localhost:8080/api/reservation/misReservas/${userId}`);
                setReservas(await reservasActualizadas.json());
                // Actualizar la lista de reservas sin la cancelada
                //setReservas(prevReservas => prevReservas.filter(reserva => reserva.idReservation !== idReservation));
            } else {
                const errorMessage = await response.text();
                setAlertMessage(errorMessage || "Error al cancelar la reserva.");
                setAlertType("error");
            }
        } catch (error) {
            console.error('Error al cancelar la reserva:', error);
            setAlertMessage("Error de conexión al cancelar la reserva.");
            setAlertType("error");
        } finally {
            setCargandoReservas(false); // Termina el cargador
        }
    };

    const handleVerSnacks = (snacks) => {
        setSnacksDetalle(snacks);
        setSnacksPopupVisible(true);
    };

    // Cierra el popup
    const handleClosePopup = () => {
        setSnacksPopupVisible(false);
    };

    return (
        <Layout>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Mis Reservas</h2>
                {cargandoReservas ? (
                    <div className="flex justify-center items-center" style={{ height: "100px" }}>
                    <div className="loader" /> {/* Círculo de carga */}
                </div>
                ) : reservas.length > 0 ? (
                    <ul className="space-y-4">
                        {reservas.map((reserva) => (
                            <li key={reserva.idReservation} className="flex justify-between items-center border-b pb-2 mb-2">
                                <div className="flex flex-col">
                                    <span className="font-medium">{reserva.function.movie.movieName}</span>
                                    <span className="text-gray-600">Sucursal: {reserva.function.room.branch.branchName}</span>
                                    <span className="text-gray-600">Fecha: {reserva.function.date}</span>
                                    <span className="text-gray-600">Hora: {reserva.function.time}</span>
                                    <span className="text-gray-600">Formato: {reserva.function.format}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleVerSnacks(reserva.snacks)}
                                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                                        Ver Snacks
                                    </button>
                                    <button
                                        onClick={() => handleCancelarReserva(reserva.idReservation)}
                                        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p>No hay Reservas disponibles</p>
                    )}
            </div>
            {/* Popup para mostrar los detalles de los snacks */}
            {snacksPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Snacks Comprados</h3>
                        <ul className="space-y-2">
                            {snacksDetalle.length > 0 ? (
                                snacksDetalle.map((snack, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{snack.description}</span>
                                        <span>${snack.price.toFixed(2)}</span>
                                    </li>
                                ))
                            ) : (
                                <p>No hay snacks disponibles</p>
                            )}
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
        </Layout>
    );
};

export default MisReservas;
