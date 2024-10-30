import React, { useState } from 'react';
//import axios from "axios";
import Layout from './Layout';




const MetodoPago = () => {

    const [card_number, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiration_month, setExpirationMonth] = useState('');
    const [expiration_year, setExpirationYear] = useState('');

    const handleGuardar = () => {
        console.log('Datos guardados:', {
            card_number, cvv, expiration_month, expiration_year
        });
    };
    
    return (
        <Layout>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Número de Tarjeta</label>
                    <input type="text" value={card_number} onChange={(e) => setCardNumber(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Cvv</label>
                    <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Mes de Vencimiento</label>
                    <input type="email" value={expiration_month} onChange={(e) => setExpirationMonth(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Año de Vencimiento</label>
                    <input type="text" value={expiration_year} onChange={(e) => setExpirationYear(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                
                <button onClick={handleGuardar} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Guardar</button>
            </div>
        </Layout>
    );



};

export default MetodoPago;