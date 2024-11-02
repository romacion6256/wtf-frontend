import React, { useState, useEffect } from 'react';
import Layout from './Layout';
//import { Link } from 'react-router-dom';

//import MisReservas from './MisReservas';

// Datos de ejemplo para títulos
//const titulos = ['Película 1', 'Película 2', 'Película 3'];

//const sucursales = ['Punta Carretas', 'Ciudad Vieja', 'Pocitos','Carrasco','Tres Cruces','Centro','Malvin','Buceo'];
const fechas = ['2024-10-10', '2024-10-12', '2024-10-15'];
const horarios = ['19:00', '21:30', '18:00'];
const formatos = ['2D Sub', '3D Esp']
const precioAsiento = 100;
const snacks = [
    { id: 1, nombre: 'Popcorn', precio: 50},
    { id: 2, nombre: 'Soda', precio: 30 },
    { id: 3, nombre: 'Candy', precio: 40},
    { id: 4, nombre: 'Nachos', precio: 60},
];


const ReservaAsientos = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState('');
    const [sucursales, setSucursales] = useState([]);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [salas, setSala] = useState([]);
    const [salaSeleccionada, setSalaSeleccionada] = useState('');
  
    //const [titulo, setTitulo] = useState('');
    //const [sucursal, setSucursal] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [formato, setFormato] = useState('');
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
    const [mostrarPopupSnacks, setMostrarPopupSnacks] = useState(false);
    const [mostrarConfirmacionCompra, setMostrarConfirmacionCompra] = useState(false);
    const [mostrarResumenPago, setMostrarResumenPago] = useState(false);
    const [cantidadSnacks, setCantidadSnacks] = useState({});
    
    const totalFilas = 15;
    const totalColumnas = 10;

    const asientos = Array.from({ length: totalFilas }, () => Array(totalColumnas).fill(false));


    // const cerrarConfirmacion = () => {
    //     setMostrarConfirmacionCompra(false);
    //     setMostrarPopupSnacks(false);
    //     setMostrarResumenPago(false);
    //     setAsientosSeleccionados([]);
    //     setCantidadSnacks({});
    //     // Restaura otros estados si es necesario
    //     setTitulo('');
    //     setSucursal('');
    //     setFecha('');
    //     setHora('');
    //     setFormato('');
    // };
    // Función para formatear los asientos seleccionados
    const formatearAsientosSeleccionados = () => {
        return asientosSeleccionados.map(asiento => {
            const [fila, columna] = asiento.split('-').map(Number);
            return `Fila ${fila + 1}, Asiento ${columna + 1}`; // Se suman 1 para mostrarlo de manera más amigable
        });
    };

    const toggleAsiento = (fila, columna) => {
        const nuevoEstado = [...asientosSeleccionados];
        const asientoId = `${fila}-${columna}`;
        if (nuevoEstado.includes(asientoId)) {
            nuevoEstado.splice(nuevoEstado.indexOf(asientoId), 1);
        } else {
            nuevoEstado.push(asientoId);
        }
        setAsientosSeleccionados(nuevoEstado);
    };

    const puedeSeleccionarAsientos = peliculaSeleccionada && sucursalSeleccionada && fecha && hora && formato;
    const totalAsientosSeleccionados = asientosSeleccionados.length;
    const totalPrecio = totalAsientosSeleccionados * precioAsiento;

    const mostrarPopup = sucursalSeleccionada && fecha && hora && formato && asientosSeleccionados.length > 0;

    const aumentarCantidad = (id) => {
        setCantidadSnacks((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };
    const disminuirCantidad = (id) => {
        setCantidadSnacks((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0)
        }));
    };

    const totalPrecioSnacks = snacks.reduce((acc, snack) => {
        return acc + (cantidadSnacks[snack.id] || 0) * snack.precio;
    }, 0);

    const reservarAsientos = () => {
        // Mostrar el popup para agregar snacks
        setMostrarPopupSnacks(true);
    };

    // const confirmarCompra = () => {
    //     setMostrarPopupSnacks(false);
    //     setMostrarConfirmacionCompra(true);
    // };
    const finalizarCompra = () => {
        setMostrarResumenPago(false);
        setMostrarConfirmacionCompra(true);
    };
    const abrirResumenPago = () => {
        setMostrarPopupSnacks(false);
        setMostrarResumenPago(true);
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

    useEffect(() => {

        if (peliculaSeleccionada) {
        // Simulación de llamada a la base de datos para obtener las películas creadas
        const obtenerSucursales = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/branch/obtenerSucursales/${peliculaSeleccionada}`);
                const sucursalesCargadas = await response.json();
                console.log("Sucursales recibidas:", sucursalesCargadas); // Verifica que sea una lista de sucursales
                // Asegurarse de que `sucursalesCargadas` sea un array
                setSucursales(Array.isArray(sucursalesCargadas) ? sucursalesCargadas : []);
            } catch (error) {
                console.error('Error al obtener las sucursales:', error);
                setSucursales([]); // Establece `sucursales` como un array vacío en caso de error
            }
        };
        obtenerSucursales();
        }
    }, [peliculaSeleccionada]);

    useEffect(() => {
        if (peliculaSeleccionada && sucursalSeleccionada) {
            console.log("Sucursal seleccionada:", sucursalSeleccionada);
            const obtenerSalasDisponibles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/salas/obtenerSalasDisponibles/${peliculaSeleccionada}/${sucursalSeleccionada}`);
                    const salasCargadas = await response.json();
                    setSala(Array.isArray(salasCargadas) ? salasCargadas : []);
                } catch (error) {
                    console.error('Error al obtener las salas disponibles:', error);
                    setSala([]);
                }
            };
            obtenerSalasDisponibles();
        }
    }, [peliculaSeleccionada, sucursalSeleccionada]);

    return (
        <Layout>
            <div className="flex h-full">
            
                {/* Mitad izquierda: imagen de la película */}
                <div className="w-1/3 flex items-center justify-center bg-gray-200 relative">
                <img src={require('../Assets/asientos.jpeg')} alt="Película" className="object-cover h-full" />

                    {/* Título de la pantalla */}
                    <h1 className="absolute top-4 left-4 text-2xl font-bold text-white">Comprar Entradas</h1>
                    {mostrarPopup && totalAsientosSeleccionados > 0 && (
                    <div className="absolute bg-white p-4 border border-gray-300 shadow-md w-64">
                        <h3 className="font-bold text-md">Asientos Seleccionados:</h3>
                        <ul className="text-sm">
                            {formatearAsientosSeleccionados().map((asiento, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{asiento}</span>
                                    <button
                                        className="text-red-500 cursor-pointer"
                                        onClick={() => toggleAsiento(...asientosSeleccionados[index].split('-').map(Number))}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button className="bg-blue-500 text-white py-2 px-4 mt-2 text-sm" onClick={reservarAsientos}>
                            Reservar (${totalPrecio})
                        </button>
                    </div>
)}
                </div>

                {/* Mitad derecha: formularios y matriz de asientos */}
                <div className="w-2/3 p-4 overflow-y-auto" style={{ maxHeight: "80vh" }}>
                    {/* Fila de selección */}
                    <div className="flex space-x-4 mb-4">
                        {/* Campo de Título */}
                        <div className="flex-1">
                            <label className="block mb-1">Título:</label>
                            <select
                                onChange={(e) => { 
                                    setPeliculaSeleccionada(e.target.value);
                                    setSucursalSeleccionada('');
                                    setSalaSeleccionada(''); 
                                    setFecha(''); 
                                    setHora('');
                                    setFormato(''); 
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={peliculaSeleccionada}
                                className="w-full p-2 border rounded"
                            >
                                <option value="" disabled>Selecciona una película</option>
                                {peliculas.length > 0 ? (
                                    peliculas.map((pelicula) => (
                                        <option key={pelicula.idMovie} value={pelicula.movieName}>{pelicula.movieName}</option>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No hay películas disponibles</p>
                                )}
                            </select>
                        </div>

                        {/* Campo de Sucursal */}
                        <div className="flex-1">
                            <label className="block mb-1">Sucursal:</label>
                            <select
                                onChange={(e) => {
                                    setSucursalSeleccionada(e.target.value)
                                    setSalaSeleccionada(''); 
                                    setFecha(''); 
                                    setHora('');
                                    setFormato(''); 
                                    setAsientosSeleccionados([]); 
                                }}
                                value={sucursalSeleccionada}
                                disabled={!peliculaSeleccionada}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="" disabled>Selecciona una sucursal</option>
                                {Array.isArray(sucursales) && sucursales.length > 0 ? (
                                    sucursales.map((sucursal,index) => (
                                        <option key={index} value={sucursal}>{sucursal}</option>
                                    ))
                                ) : peliculaSeleccionada ?(
                                    <p className="text-gray-500">No hay sucursales disponibles</p>
                                ) : null}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1">Sala:</label>
                            <select 
                                onChange={(e) => { 
                                    setSalaSeleccionada(e.target.value);
                                    setFecha(''); 
                                    setHora('');
                                    setFormato(''); 
                                    setAsientosSeleccionados([]);  
                                }} 
                                value={salaSeleccionada} 
                                disabled={!sucursalSeleccionada}
                                className="w-full p-2 border rounded"
                            >
                                <option value=""disabled>Seleccionar Sala</option>
                                {salas.map((sala, index) => (
                                    <option key={index} value={sala}>{sala}</option>
                                ))}
                            </select>
                            
                        </div>
                        {/* Campo de Fecha */}
                        <div className="flex-1">
                            <label className="block mb-1">Fecha:</label>
                            <select 
                                onChange={(e) => { 
                                    setFecha(e.target.value); 
                                    setHora('');
                                    setFormato(''); 
                                    setAsientosSeleccionados([]);  
                                }} 
                                value={fecha} 
                                disabled={!salaSeleccionada}
                                className="w-full p-2 border rounded"
                            >
                                <option value=""disabled>Seleccionar Fecha</option>
                                {fechas.map((fec, index) => (
                                    <option key={index} value={fec}>{fec}</option>
                                ))}
                            </select>
                        </div>

                        {/* Campo de Hora */}
                        <div className="flex-1">
                            <label className="block mb-1">Hora:</label>
                            <select 
                                onChange={(e) => { 
                                    setHora(e.target.value); 
                                    setFormato(''); 
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={hora} 
                                disabled={!fecha}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar Hora</option>
                                {horarios.map((hor, index) => (
                                    <option key={index} value={hor}>{hor}</option>
                                ))}
                            </select>
                        </div>
                        {/* Campo de Formato */}
                        <div className="flex-1">
                            <label className="block mb-1">Formato:</label>
                            <select 
                                onChange={(e) => { 
                                    setFormato(e.target.value); 
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={formato} 
                                disabled={!hora}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar Formato</option>
                                {formatos.map((format, index) => (
                                    <option key={index} value={format}>{format}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Contenedor para la matriz de asientos */}
                    <div className="flex flex-col items-center">
                        {puedeSeleccionarAsientos && (
                            <div className="grid grid-cols-1 gap-1">
                                <div className="flex justify-center mb-2">
                                    <span className="text-center font-bold">Pantalla</span>
                                </div>
                                {asientos.map((fila, rowIndex) => (
                                    <div key={rowIndex} className="flex items-center justify-center space-x-1">
                                        <span className="w-10 text-center">{rowIndex+1}</span>
                                        {fila.map((asiento, colIndex) => {
                                            const asientoId = `${rowIndex}-${colIndex}`;
                                            const isSeleccionado = asientosSeleccionados.includes(asientoId);
                                            return (
                                                <div
                                                    key={colIndex}
                                                    onClick={() => toggleAsiento(rowIndex, colIndex)}
                                                    className={`w-6 h-6 rounded-full cursor-pointer ${isSeleccionado ? 'bg-blue-500' : 'bg-green-500'}`}
                                                    style={{ border: isSeleccionado ? '2px solid blue' : '2px solid transparent' }}
                                                >
                                                    {isSeleccionado && <span className="text-white text-xs"></span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Leyenda de colores */}
                        <div className="mt-4">
                            <div className="flex space-x-2">
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-green-500 rounded-3xl"></div>
                                    <span className="ml-1">Disponible</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-red-500 rounded-3xl"></div>
                                    <span className="ml-1">Reservado</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-blue-500 rounded-3xl"></div>
                                    <span className="ml-1">Seleccionado</span>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>
            {/* Pop-up para agregar snacks */}
            {mostrarPopupSnacks && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md w-96">
                            <h2 className="text-lg font-bold mb-4">Selecciona tus Snacks</h2>
                            {snacks.map((snack) => (
                                <div key={snack.id} className="flex items-center justify-between mb-2">
                                    {/* <img src={snack.imagen} alt={snack.nombre} className="w-10 h-10 mr-2" /> */}
                                    <span>{snack.nombre} - ${snack.precio}</span>
                                    <div className="flex items-center">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => disminuirCantidad(snack.id)}
                                        >-</button>
                                        <span className="mx-2">{cantidadSnacks[snack.id] || 0}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() => aumentarCantidad(snack.id)}
                                        >+</button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={abrirResumenPago}>
                                    Confirmar Snacks (${totalPrecioSnacks})
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pop-up de resumen de pago */}
            {mostrarResumenPago && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-lg font-bold mb-4">Resumen de Pago</h2>
                        <div className="mb-4">
                            <h3 className="font-bold">Asientos Seleccionados:</h3>
                            <ul>
                                {formatearAsientosSeleccionados().map((asiento, index) => (
                                    <li key={index}>{asiento}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold">Snacks Seleccionados:</h3>
                            <ul>
                                {snacks
                                    .filter(snack => cantidadSnacks[snack.id] > 0)
                                    .map(snack => (
                                        <li key={snack.id}>
                                            {snack.nombre} x {cantidadSnacks[snack.id]} - ${snack.precio * cantidadSnacks[snack.id]}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <p className="font-bold">Total: ${totalPrecio + totalPrecioSnacks}</p>
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2"
                                onClick={() => setMostrarResumenPago(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2"
                                onClick={finalizarCompra}
                            >
                                Confirmar Pago
                            </button>
                        </div>
                    </div>
                </div>
            )}


                {/* Pop-up de confirmación de compra
                {mostrarConfirmacionCompra && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md w-96">
                            <h2 className="text-lg font-bold mb-4">Compra Confirmada</h2>
                            <p>¡Tu compra ha sido realizada exitosamente!</p>
                            <Link to="/misreservas" className="block mt-4 text-blue-500 underline">
                                Ver Mis Reservas
                            </Link>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                                onClick={cerrarConfirmacion}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )} */}

                {/* Confirmación de compra*/}
                {mostrarConfirmacionCompra && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded shadow-md w-64 text-center">
                            <h2 className="text-lg font-bold text-green-500">Compra Confirmada</h2>
                            <p>Asiento(s): {asientosSeleccionados.map(asiento => {
                                const [fila, columna] = asiento.split('-');
                                return `Fila ${parseInt(fila) + 1}, Asiento ${parseInt(columna) + 1}`;
                            }).join(', ')}</p>
                            <p>Total: ${totalPrecio + totalPrecioSnacks}</p>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 mt-4"
                                onClick={() => window.location.href = '/misreservas'}
                            >
                                Ver Mis Reservas
                            </button>
                        </div>
                    </div>
                )} 
            </div>
        </Layout>
    );
};

export default ReservaAsientos;
