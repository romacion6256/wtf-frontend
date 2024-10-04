import React, { useState } from 'react';
import Layout from './Layout';

// Datos de ejemplo para títulos
const titulos = ['Película 1', 'Película 2', 'Película 3'];
const sucursales = ['Punta Carretas', 'Ciudad Vieja', 'Pocitos','Carrasco','Tres Cruces','Centro','Malvin','Buceo'];const fechas = ['2024-10-10', '2024-10-12', '2024-10-15'];
const horarios = ['19:00 - 2D Sub', '21:30 - 3D Esp', '18:00 - 4D'];

const ReservaAsientos = () => {
    const [titulo, setTitulo] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

    const totalFilas = 15;
    const totalColumnas = 10;

    const asientos = Array.from({ length: totalFilas }, () => Array(totalColumnas).fill(false));

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

    const puedeSeleccionarAsientos = titulo && sucursal && fecha && hora;
    const mostrarPopup = sucursal && fecha && hora && asientosSeleccionados.length > 0;

    return (
        <Layout>
            <div className="flex h-full">
                {/* Mitad izquierda: imagen de la película */}
                <div className="w-1/2 flex items-center justify-center bg-gray-200 relative">
                    <img src="https://plchldr.co/i/600x800" alt="Película" className="object-cover h-full" />
                    {mostrarPopup && (
                        <div className="absolute bg-white p-2 border border-gray-300 shadow-md w-48">
                            <h3 className="font-bold text-sm">Asientos Seleccionados:</h3>
                            <ul className="text-xs">
                                {asientosSeleccionados.map((asiento) => (
                                    <li key={asiento} className="flex justify-between">
                                        <span>{asiento}</span>
                                        <button
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => toggleAsiento(...asiento.split('-').map(Number))}
                                        >
                                            X
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-blue-500 text-white py-1 px-2 mt-2 text-xs">Reservar</button>
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

                        {/* Campo de Hora/Formato */}
                        <div className="flex-1">
                            <label className="block mb-1">Hora y Formato:</label>
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
                                        <span className="w-10 text-center">{rowIndex}</span>
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
            </div>
        </Layout>
    );
};

export default ReservaAsientos;
