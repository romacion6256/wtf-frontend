import React, { useState, useEffect, useCallback } from 'react';
import Layout from './Layout';
import '../../index.css';
import Alerta from '../elements/Alerta';
import { useNavigate } from 'react-router-dom';

const precioAsiento = 100;


const ReservaAsientos = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState('');
    const [sucursales, setSucursales] = useState([]);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [salas, setSala] = useState([]);
    const [salaSeleccionada, setSalaSeleccionada] = useState('');
    const [fechas, setFechas] = useState([]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [horaSeleccionada , setHoraSeleccionada] = useState('');
    const [formatoSeleccionado, setFormatoSeleccionado] = useState('');
    const [formatos, setFormatos] = useState([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [subtitulada, setSubtitulada] = useState([]);
    const [subtituladaSeleccionada, setSubtituladaSeleccionada] = useState('');
    const [snacks, setSnacks] = useState([]);
    const [cargandoSnacks, setCargandoSnacks] = useState(true); 
    const [cargandoAsientos, setCargandoAsientos] = useState(false);

    //const [titulo, setTitulo] = useState('');
    //const [sucursal, setSucursal] = useState('');
    //const [fecha, setFecha] = useState('');
    //const [hora, setHora] = useState('');

    const [asientosReservados, setAsientosReservados] = useState([]);
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
    const [mostrarPopupSnacks, setMostrarPopupSnacks] = useState(false);
    const [mostrarConfirmacionCompra, setMostrarConfirmacionCompra] = useState(false);
    const [mostrarResumenPago, setMostrarResumenPago] = useState(false);
    const [cantidadSnacks, setCantidadSnacks] = useState({});

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    
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

    const puedeSeleccionarAsientos = peliculaSeleccionada && sucursalSeleccionada && fechaSeleccionada && horaSeleccionada && formatoSeleccionado && subtituladaSeleccionada;
    const totalAsientosSeleccionados = asientosSeleccionados.length;
    const totalPrecio = totalAsientosSeleccionados * precioAsiento;
    const totalPrecioSnacks = snacks.reduce((acc, snack) => {
        return acc + (cantidadSnacks[snack.snackId] || 0) * snack.price;
    }, 0);

    const fechaInicio = new Date('2024-11-01T00:00:00');
    const fechaFin = new Date('2025-06-01T00:00:00'); // Fecha de finalización después de 6 meses
    const fechaActual = new Date();
    const descuento = (fechaActual >= fechaInicio && fechaActual < fechaFin) ? totalAsientosSeleccionados * precioAsiento : 0;
    const totalConDescuento = totalPrecio + totalPrecioSnacks - descuento;
    const mostrarPopup = sucursalSeleccionada && fechaSeleccionada && horaSeleccionada && formatoSeleccionado && subtituladaSeleccionada && asientosSeleccionados.length > 0;

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



    const reservarAsientos = () => {
        // Mostrar el popup para agregar snacks
        setMostrarPopupSnacks(true);
    };

    // const confirmarCompra = () => {
    //     setMostrarPopupSnacks(false);
    //     setMostrarConfirmacionCompra(true);
    // };
    // const finalizarCompra = () => {
    //     setMostrarResumenPago(false);
    //     setMostrarConfirmacionCompra(true);
    // };
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

    useEffect(() => {
        if (peliculaSeleccionada && sucursalSeleccionada && salaSeleccionada) {
            console.log("Sala seleccionada:", salaSeleccionada);
            const obtenerFechasDisponibles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/function/obtenerFechasDisponibles/${peliculaSeleccionada}/${sucursalSeleccionada}/${salaSeleccionada}`);
                    const fechasCargadas = await response.json();
                    setFechas(Array.isArray(fechasCargadas) ? fechasCargadas : []);
                } catch (error) {
                    console.error('Error al obtener las fechas disponibles:', error);
                    setFechas([]);
                }
            };
            obtenerFechasDisponibles();
        }
    }, [peliculaSeleccionada, sucursalSeleccionada, salaSeleccionada]);

    // OBTENER HORARIOS
    useEffect(() => {
        if (peliculaSeleccionada && sucursalSeleccionada && salaSeleccionada && fechaSeleccionada) {
            console.log("Fecha seleccionada:", fechaSeleccionada);
            const obtenerHorariosDisponibles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/function/obtenerHorasDisponibles/${peliculaSeleccionada}/${sucursalSeleccionada}/${salaSeleccionada}/${fechaSeleccionada}`);
                    const horariosCargadas = await response.json();
                    setHorarios(Array.isArray(horariosCargadas) ? horariosCargadas : []);
                } catch (error) {
                    console.error('Error al obtener los horarios disponibles:', error);
                    setHorarios([]);
                }
            };
            obtenerHorariosDisponibles();
        }
    }, [peliculaSeleccionada, sucursalSeleccionada, salaSeleccionada,fechaSeleccionada ]);

        // OBTENER FORMATOS
        useEffect(() => {
            if (peliculaSeleccionada && sucursalSeleccionada && salaSeleccionada && fechaSeleccionada && horaSeleccionada) {
                console.log("Hora seleccionada:", horaSeleccionada);
                const obtenerFormatosDisponibles = async () => {
                    try {
                        const response = await fetch(`http://localhost:8080/api/function/obtenerFormatosDisponibles/${peliculaSeleccionada}/${sucursalSeleccionada}/${salaSeleccionada}/${fechaSeleccionada}/${horaSeleccionada}`);
                        const formatosCargadas = await response.json();
                        setFormatos(Array.isArray(formatosCargadas) ? formatosCargadas : []);
                    } catch (error) {
                        console.error('Error al obtener los formatos disponibles:', error);
                        setFormatos([]);
                    }
                };
                obtenerFormatosDisponibles();
            }
        }, [peliculaSeleccionada, sucursalSeleccionada, salaSeleccionada, fechaSeleccionada, horaSeleccionada ]);

        // OBTENER SUBTITULADA
        useEffect(() => {
            if (peliculaSeleccionada && sucursalSeleccionada && salaSeleccionada && fechaSeleccionada && horaSeleccionada && formatoSeleccionado) {
                console.log("Formato seleccionado:", formatoSeleccionado);
                const obtenerSubtitulosDisponibles = async () => {
                    try {
                        const response = await fetch(`http://localhost:8080/api/function/obtenerSubtitulosDisponibles/${peliculaSeleccionada}/${sucursalSeleccionada}/${salaSeleccionada}/${fechaSeleccionada}/${horaSeleccionada}/${formatoSeleccionado}`);
                        const subsCargadas = await response.json();
                        setSubtitulada(Array.isArray(subsCargadas) ? subsCargadas : []);
                        console.log(subtitulada)
                    } catch (error) {
                        console.error('Error al obtener los subtitulos disponibles:', error);
                        setSubtitulada([]);
                    }
                };
                obtenerSubtitulosDisponibles();
            }
        }, [peliculaSeleccionada, sucursalSeleccionada, salaSeleccionada, fechaSeleccionada, horaSeleccionada, formatoSeleccionado ]);

        const obtenerAsientosReservados = useCallback(async () => {
            setCargandoAsientos(true); 
            console.log(subtituladaSeleccionada);
            try {
                const subtitledValue = subtituladaSeleccionada === 'Si';
                console.log('subtitledValue:', subtitledValue); 
                const params = new URLSearchParams({
                    movieName: peliculaSeleccionada,
                    branchName: sucursalSeleccionada,
                    roomNumber: salaSeleccionada,
                    date: fechaSeleccionada,
                    time: horaSeleccionada,
                    format: formatoSeleccionado,
                    subtitled: subtitledValue,
                }).toString();
    
                const response = await fetch(`http://localhost:8080/api/reservation/asientosReservados?${params}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                const data = await response.json();
                setAsientosReservados(data);
            } catch (error) {
                console.error('Error al obtener los asientos reservados:', error);
            } finally {
                setCargandoAsientos(false); 
            }
        }, [peliculaSeleccionada, sucursalSeleccionada, salaSeleccionada, fechaSeleccionada, horaSeleccionada, formatoSeleccionado, subtituladaSeleccionada]);
    
        useEffect(() => {
            if (peliculaSeleccionada && sucursalSeleccionada && salaSeleccionada && fechaSeleccionada && horaSeleccionada && formatoSeleccionado && subtituladaSeleccionada) {
                obtenerAsientosReservados();
            }
        }, [peliculaSeleccionada, sucursalSeleccionada, salaSeleccionada, fechaSeleccionada, horaSeleccionada, formatoSeleccionado, subtituladaSeleccionada,obtenerAsientosReservados]);
    
        const marcarAsientosReservados = useCallback((asientosReservados) => {
            asientosReservados.forEach(asiento => {
                const { row, column } = asiento;
                asientos[row][column] = true; // Mark seat as reserved
            });
        }, [asientos]);
    
        useEffect(() => {
            if (asientosReservados.length > 0) {
                marcarAsientosReservados(asientosReservados);
            }
        }, [asientosReservados, marcarAsientosReservados]);


        useEffect(() => {
            const obtenerSnacks = async () => {
                setCargandoSnacks(true); 

                try {
                    const response = await fetch('http://localhost:8080/api/snack/listarSnacks');
                    const snacksCargadas = await response.json();
                    setSnacks(snacksCargadas);
                } catch (error) {
                    console.error('Error al obtener los snacks:', error);
                } finally {
                    setCargandoSnacks(false); // Termina el cargador
                }
            };
            obtenerSnacks();
        }, []);

        const confirmarPago = async () => {
            setLoading(true);
            console.log("Inicio de confirmarPago");
            const cardData = JSON.parse(localStorage.getItem("user")).card;
            
            console.log("Tarjeta", cardData);

            if (!cardData) {
                // Si no hay tarjeta, mostrar alerta
                console.log("No hay tarjeta");
                setAlertMessage('Debes ingresar un método de pago.');
                setAlertType('Atencion');
                setLoading(false);
                setTimeout(() => {
                    navigate('/metodopago');
                    setAlertMessage("");
                    setAlertType("");
                  }, 3000);
                return;
            }

            //verificar tarjeta expirada 
            const today = new Date();
            const currentMonth = today.getMonth() + 1; 
            const currentYear = today.getFullYear();
            if (
                parseInt(cardData.expiration_year) < currentYear ||
                (parseInt(cardData.expiration_year) === currentYear && parseInt(cardData.expiration_month) < currentMonth)
            ) {
                setAlertMessage("La tarjeta ha expirado");
                setAlertType("error");
                return; // No envía la solicitud si la tarjeta está expirada
            }
            const clientId = JSON.parse(localStorage.getItem("user")).id;
            console.log("Client Id", clientId);

            
            const selectedSeats = asientosSeleccionados.map(seat => {
                const [row, column] = seat.split('-').map(Number);
                return { rowSeat: row + 1, columnSeat: column + 1 }; // Ajustamos para que sea 1-based
            });
            console.log("Asientos seleccionados:", selectedSeats);

            const snacksIds = Object.keys(cantidadSnacks)
            .filter(snackId => cantidadSnacks[snackId] > 0)
            .join(","); // Filtrar snacks seleccionados

            console.log("Snacks seleccionados:", snacksIds);
            const subtitledValue = subtituladaSeleccionada === 'Si';

            
            const functionParams = new URLSearchParams({
                movieName: peliculaSeleccionada, 
                branchName: sucursalSeleccionada, 
                roomNumber: salaSeleccionada, 
                date: fechaSeleccionada, 
                time: horaSeleccionada, 
                format: formatoSeleccionado, 
                subtitled: subtitledValue, 
            });

            let functionId;
            try {
                const response = await fetch(`http://localhost:8080/api/function/obtenerIdFuncion?${functionParams.toString()}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                });

                console.log("Respuesta de obtenerIdFuncion:", response);

                if (response.ok) {
                    const result = await response.json();
                    functionId = result; // Guardamos el ID de la función
                    console.log("ID de función obtenido:", functionId);
                } else {
                    const errorMessage = await response.text();
                    setAlertMessage(`Error al obtener ID de la función: ${errorMessage}`);
                    setAlertType('Error');
                    return;
                }
            } catch (error) {
                console.error('Error al obtener ID de la función:', error);
                setAlertMessage('Error al obtener ID de la función. Inténtalo de nuevo.');
                setAlertType('Error');
                return;
            }

            const reservationData = {
                paymentMethod: JSON.parse(localStorage.getItem("user")).card.cardNumber.toString(), 
                seats: selectedSeats,
                // rowSeat: parseInt(selectedSeats.split('-')[0]) + 1, // Ejemplo para obtener la fila del primer asiento
                // columnSeat: parseInt(selectedSeats.split('-')[1]) + 1, // Ejemplo para obtener la columna del primer asiento
                idFunction: functionId, // <-- hay que OBTENERLO
                idClient: clientId,
                snackIds: snacksIds 
            };
            
            console.log("Datos de reserva a enviar:", reservationData); 

            try {
                const response = await fetch(`http://localhost:8080/api/reservation/crearReserva/${clientId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reservationData),
                });
        
                if (response.ok) {
                    const result = await response.json();
                    setAlertMessage(result); 
                    setAlertType('Completado');
                    setMostrarResumenPago(false);
                    setMostrarConfirmacionCompra(true);
                } else {
                    const errorMessage = await response.text();
                    setAlertMessage(`Error: ${errorMessage}`);
                    setAlertType('Error');
                }
            } catch (error) {
                console.error('Error en la creación de reserva:', error);
                setAlertMessage('Error al crear la reserva. Inténtalo de nuevo.');
                setAlertType('Error');
            } finally {
                setLoading(false); // Stop loading after completion
            }
        };

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
                                    setFechaSeleccionada(''); 
                                    setHoraSeleccionada('');
                                    setFormatoSeleccionado(''); 
                                    setSubtituladaSeleccionada('');
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
                                    setFechaSeleccionada(''); 
                                    setHoraSeleccionada('');
                                    setFormatoSeleccionado(''); 
                                    setSubtituladaSeleccionada('');
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
                                    setFechaSeleccionada(''); 
                                    setHoraSeleccionada('');
                                    setFormatoSeleccionado(''); 
                                    setSubtituladaSeleccionada('');
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
                        </div>
                        {/* Campo de Fecha */}
                        <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <label className="block mb-1">Fecha:</label>
                            <select 
                                onChange={(e) => { 
                                    setFechaSeleccionada(e.target.value); 
                                    setHoraSeleccionada('');
                                    setFormatoSeleccionado(''); 
                                    setSubtituladaSeleccionada('');
                                    setAsientosSeleccionados([]);  
                                }} 
                                value={fechaSeleccionada} 
                                disabled={!salaSeleccionada}
                                className="w-full p-2 border rounded"
                            >
                                <option value="" disabled>Seleccionar Fecha</option>
                                {fechas
                                    .filter(fec => new Date(fec) >= new Date()) // Filtrar fechas que no han pasado
                                    .map((fec, index) => (
                                        <option key={index} value={fec}>{fec}</option>
                                    ))
                                }
                            </select>
                        </div>

                        {/* Campo de Hora */}
                        <div className="flex-1">
                            <label className="block mb-1">Hora:</label>
                            <select 
                                onChange={(e) => { 
                                    setHoraSeleccionada(e.target.value); 
                                    setFormatoSeleccionado(''); 
                                    setSubtituladaSeleccionada('');
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={horaSeleccionada} 
                                disabled={!fechaSeleccionada}
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
                                    setFormatoSeleccionado(e.target.value); 
                                    setSubtituladaSeleccionada('');
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={formatoSeleccionado} 
                                disabled={!horaSeleccionada}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar Formato</option>
                                {formatos.map((format, index) => (
                                    <option key={index} value={format}>{format}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1/3">
                            <label className="block mb-1">Subtitulada:</label>
                            <select 
                                onChange={(e) => { 
                                    setSubtituladaSeleccionada(e.target.value); 
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={subtituladaSeleccionada} 
                                disabled={!formatoSeleccionado}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar Opcion</option>
                                {subtitulada.map((subt, index) => (
                                    <option key={index} value={subt}>{subt}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
            {/* Contenedor para la matriz de asientos */}
            <div className="flex flex-col items-center">
                {cargandoAsientos ? ( // Mostrar loader si está cargando
                    <div className="flex justify-center items-center" style={{ height: "200px" }}>
                        <div className="loader" /> {/* Círculo de carga */}
                    </div>
                ) : (
                    puedeSeleccionarAsientos && ( // Solo renderiza la matriz si puede seleccionar asientos
                        <div className="grid grid-cols-1 gap-1">
                            <div className="flex justify-center mb-2">
                                <span className="text-center font-bold">Pantalla</span>
                            </div>
                            {asientos.map((fila, rowIndex) => (
                                <div key={rowIndex} className="flex items-center justify-center space-x-1">
                                    <span className="w-10 text-center">{rowIndex + 1}</span>
                                    {fila.map((asiento, colIndex) => {
                                        const asientoId = `${rowIndex}-${colIndex}`;
                                        const isReservado = asientosReservados.some(reservado => reservado.row === rowIndex + 1 && reservado.column === colIndex + 1);
                                        const isSeleccionado = asientosSeleccionados.includes(asientoId);
                                        return (
                                            <div
                                                key={colIndex}
                                                onClick={() => !isReservado && toggleAsiento(rowIndex, colIndex)} // Solo se puede seleccionar si no está reservado
                                                className={`w-6 h-6 rounded-full cursor-pointer ${isReservado ? 'bg-red-500' : isSeleccionado ? 'bg-blue-500' : 'bg-green-500'}`}
                                                style={{ border: isSeleccionado ? '2px solid blue' : '2px solid transparent' }}
                                            >
                                                {isSeleccionado && <span className="text-white text-xs"></span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
            {/* Leyenda de colores */}
            <div className="mt-4 flex justify-center">
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
                        {cargandoSnacks ? (
                            <div className="flex justify-center items-center" style={{ height: "100px" }}>
                                <div className="loader" /> {/* Círculo de carga */}
                            </div>
                        ) : snacks.length > 0 ? (
                            <ul>
                                {snacks.map((snack) => (
                                    <div key={snack.snackId} className="flex items-center justify-between mb-2">
                                        {/* <img src={snack.imagen} alt={snack.nombre} className="w-10 h-10 mr-2" /> */}
                                        <span>{snack.description} - ${snack.price}</span>
                                        <div className="flex items-center">
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => disminuirCantidad(snack.snackId)}
                                            >-</button>
                                            <span className="mx-2">{cantidadSnacks[snack.snackId] || 0}</span>
                                            <button
                                                className="px-2 py-1 bg-gray-200 rounded"
                                                onClick={() => aumentarCantidad(snack.snackId)}
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay Snacks disponibles</p>
                        )}
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
                                    <li key={index}>
                                        {asiento} - $ {precioAsiento}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-bold">Snacks Seleccionados:</h3>
                            <ul>
                                {snacks
                                    .filter(snack => cantidadSnacks[snack.snackId] > 0)
                                    .map(snack => (
                                        <li key={snack.snackId}>
                                            {snack.description} x {cantidadSnacks[snack.snackId]} - ${snack.price * cantidadSnacks[snack.snackId]}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <p className="font-bold">Descuentos: {descuento > 0 ? ` -$${descuento}` : 'N/A'}</p>
                        <p className="font-bold">Total: ${totalConDescuento}</p>
                        {alertMessage && <Alerta message={alertMessage} type={alertType} />}
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2"
                                onClick={() => setMostrarResumenPago(false)}
                            >
                                Cancelar
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={confirmarPago}>
                                Confirmar Pago
                            </button>
                            {loading && (
                                <div className="flex justify-center items-center mt-4">
                                    <div className="loader" /> {/* CSS class for loading circle */}
                                </div>
                            )}
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
                            <p>Total: ${totalConDescuento}</p>
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
