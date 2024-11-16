import React, { useState, useEffect } from 'react';
import axios from "axios";
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import Alerta from '../elements/Alerta';


const MetodoPago = () => {

    const [card_number, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiration_month, setExpirationMonth] = useState('');
    const [expiration_year, setExpirationYear] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    


    const fetchUserData = async (id) => {
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
            const userData = response.data;

            setCardNumber(userData.card.cardNumber || '');
            setCvv(userData.card.cvv || '');
            setExpirationMonth(userData.card.expirationMonth || '');
            setExpirationYear(userData.card.expirationYear || '');
        } catch (error) {
            console.error("Error al cargar los datos del usuario:", error);
        }
    };

    const handleGuardar = async () => {
        try {
            // Obtén el mes y el año actuales
            const today = new Date();
            const currentMonth = today.getMonth() + 1; // Los meses van de 0 a 11
            const currentYear = today.getFullYear();

            // Verifica si la tarjeta ha expirado
            if (
                parseInt(expiration_year) < currentYear ||
                (parseInt(expiration_year) === currentYear && parseInt(expiration_month) < currentMonth)
            ) {
                setAlertMessage("La tarjeta ha expirado");
                setAlertType("error");
                return; // No envía la solicitud si la tarjeta está expirada
            }
        
            if (card_number==null || cvv==null || expiration_month==null || expiration_year==null){
                setAlertMessage("Todos los campos son obligatorios");
                setAlertType("error");
                return;
            }

            if (card_number.length !== 16){
                setAlertMessage("El número de tarjeta debe tener 16 dígitos");
                setAlertType("error");
                return;
            }
            
            const userId = JSON.parse(localStorage.getItem("user")).id;
    
            const cardData = {
                cardNumber: card_number,
                expirationMonth: expiration_month,
                expirationYear: expiration_year,
                cvv: cvv
            };
    
            await axios.put(`http://localhost:8080/api/users/${userId}/assign-card`, cardData);
    
            
            setAlertMessage("Tarjeta asignada con éxito");
            setAlertType("Completado");
            console.log("Tarjeta asignada con éxito");
        } catch (error) {
            setAlertMessage("Error al asignar la tarjeta");
            setAlertType("error");
            console.error("Error al asignar la tarjeta:", error.response?.data || error.message);
        }
    };
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            fetchUserData();
        } else {
            navigate("/"); // Redirige a cartelera si no hay un usuario
        }
    }, [navigate]);
    
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
                    <input type="text" value={expiration_month} onChange={(e) => setExpirationMonth(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Año de Vencimiento</label>
                    <input type="text" value={expiration_year} onChange={(e) => setExpirationYear(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                {alertMessage && <Alerta message={alertMessage} type={alertType} />}
                <button onClick={handleGuardar} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Guardar</button>
            </div>
        </Layout>
    );



};

export default MetodoPago;