import React, { useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';

import MisReservas from './MisReservas';

// Datos de ejemplo para títulos
const titulos = ['Película 1', 'Película 2', 'Película 3'];
const sucursales = ['Punta Carretas', 'Ciudad Vieja', 'Pocitos','Carrasco','Tres Cruces','Centro','Malvin','Buceo'];
const fechas = ['2024-10-10', '2024-10-12', '2024-10-15'];
const horarios = ['19:00', '21:30', '18:00'];
const formatos = ['2D Sub', '3D Esp']
const precioAsiento = 100;
const snacks = [
    { id: 1, nombre: 'Popcorn', precio: 50, imagen: 'https://plchldr.co/i/100x100' },
    { id: 2, nombre: 'Soda', precio: 30, imagen: 'https://plchldr.co/i/100x100' },
    { id: 3, nombre: 'Candy', precio: 40, imagen: 'https://plchldr.co/i/100x100' },
    { id: 4, nombre: 'Nachos', precio: 60, imagen: 'https://plchldr.co/i/100x100' },
];


const ReservaAsientos = () => {
    const [titulo, setTitulo] = useState('');
    const [sucursal, setSucursal] = useState('');
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


    const cerrarConfirmacion = () => {
        setMostrarConfirmacionCompra(false);
        setMostrarPopupSnacks(false);
        setMostrarResumenPago(false);
        setAsientosSeleccionados([]);
        setCantidadSnacks({});
        // Restaura otros estados si es necesario
        setTitulo('');
        setSucursal('');
        setFecha('');
        setHora('');
        setFormato('');
    };
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

    const puedeSeleccionarAsientos = titulo && sucursal && fecha && hora && formato;
    const totalAsientosSeleccionados = asientosSeleccionados.length;
    const totalPrecio = totalAsientosSeleccionados * precioAsiento;

    const mostrarPopup = sucursal && fecha && hora && formato && asientosSeleccionados.length > 0;

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

    const confirmarCompra = () => {
        setMostrarPopupSnacks(false);
        setMostrarConfirmacionCompra(true);
    };
    const finalizarCompra = () => {
        setMostrarResumenPago(false);
        setMostrarConfirmacionCompra(true);
    };
    const abrirResumenPago = () => {
        setMostrarPopupSnacks(false);
        setMostrarResumenPago(true);
    };



    return (
        <Layout>
            <div className="flex h-full">
                {/* Mitad izquierda: imagen de la película */}
                <div className="w-1/2 flex items-center justify-center bg-gray-200 relative">
                    <img src="https://plchldr.co/i/600x800" alt="Película" className="object-cover h-full" />
                    {mostrarPopup && totalAsientosSeleccionados > 0 &&(
                        <div className="absolute bg-white p-2 border border-gray-300 shadow-md w-48">
                            <h3 className="font-bold text-sm">Asientos Seleccionados:</h3>
                            <ul className="text-xs">
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
        <button className="bg-blue-500 text-white py-1 px-2 mt-2 text-xs"
            onClick={reservarAsientos}
        >
            Reservar (${totalPrecio})
        </button>
    </div>
)}
                </div>

                {/* Mitad derecha: formularios y matriz de asientos */}
                <div className="w-1/2 p-4 overflow-y-auto" style={{ maxHeight: "80vh" }}>
                    {/* Fila de selección */}
                    <div className="flex space-x-4 mb-4">
                        {/* Campo de Título */}
                        <div className="flex-1">
                            <label className="block mb-1">Título:</label>
                            <select
                                onChange={(e) => { 
                                    setTitulo(e.target.value); 
                                    setSucursal(''); 
                                    setFecha(''); 
                                    setHora('');
                                    setFormato(''); 
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={titulo}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar Título</option>
                                {titulos.map((tit, index) => (
                                    <option key={index} value={tit}>{tit}</option>
                                ))}
                            </select>
                        </div>

                        {/* Campo de Sucursal */}
                        <div className="flex-1">
                            <label className="block mb-1">Sucursal:</label>
                            <select 
                                onChange={(e) => { 
                                    setSucursal(e.target.value); 
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={sucursal} 
                                disabled={!titulo}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar Sucursal</option>
                                {sucursales.map((suc, index) => (
                                    <option key={index} value={suc}>{suc}</option>
                                ))}
                            </select>
                        </div>

                        {/* Campo de Fecha */}
                        <div className="flex-1">
                            <label className="block mb-1">Fecha:</label>
                            <select 
                                onChange={(e) => { 
                                    setFecha(e.target.value); 
                                    setAsientosSeleccionados([]); 
                                }} 
                                value={fecha} 
                                disabled={!sucursal}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Seleccionar Fecha</option>
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
                                                    className={`w-10 h-10 rounded-full cursor-pointer ${isSeleccionado ? 'bg-blue-500' : 'bg-green-500'}`}
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
                                    <div className="w-4 h-4 bg-green-500"></div>
                                    <span className="ml-1">Disponible</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-red-500"></div>
                                    <span className="ml-1">Reservado</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-4 bg-blue-500"></div>
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
                                    <img src={snack.imagen} alt={snack.nombre} className="w-10 h-10 mr-2" />
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
