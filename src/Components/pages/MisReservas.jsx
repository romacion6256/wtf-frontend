import React from 'react';
import Layout from './Layout';
import 'boxicons/css/boxicons.min.css'; // Importa Boxicons

const MisReservas = () => {
    // Ejemplo de reservas solo para visualización
    const [reservas, setReservas] = useState([]);
    
    // Obtener reservas
    useEffect(() => {
        const obtenerReservas = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("user")).id;
                const response = await fetch(`http://localhost:8080/api/reservation/misReservas/${userId}`);
                const reservasCargadas = await response.json();
                setReservas(reservasCargadas);
            } catch (error) {
                console.error('Error al obtener las reservas:', error);
            }
        };
        obtenerReservas();
    }, []);

    return (
        <Layout>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Mis Reservas</h2>
                {reservas.length === 0 ? (
                    <p>No tienes reservas en este momento.</p>
                ) : (
                    <ul className="space-y-4">
                        {reservas.map((reserva) => (
                            <li key={reserva.idReservation} className="flex justify-between items-center border-b pb-2 mb-2">
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
