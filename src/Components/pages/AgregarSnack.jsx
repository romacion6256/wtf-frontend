import React, { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';

const AgregarSnack = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [nombreProducto, setNombreProducto] = useState('');
    const [precio, setPrecio] = useState('');

    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setNombreProducto('');
        setPrecio('');
    };

    const handleGuardarSnack = () => {
        // Lógica para guardar el snack en la base de datos
        console.log('Snack guardado:', { nombreProducto, precio });
        handleCerrarPopup();
    };

    return (
        <SidebarAdmin>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Snacks</h2>
                <button
                    onClick={handleAgregarClick}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Agregar
                </button>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Nuevo Snack</h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Nombre del Producto</label>
                                <input
                                    type="text"
                                    value={nombreProducto}
                                    onChange={(e) => setNombreProducto(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Ingrese el nombre del producto"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Precio (Pesos Uruguayos)</label>
                                <input
                                    type="number"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    placeholder="Ingrese el precio en pesos uruguayos"
                                />
                            </div>
                            <button
                                onClick={handleGuardarSnack}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 mr-2"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={handleCerrarPopup}
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </SidebarAdmin>
    );
};

export default AgregarSnack;
