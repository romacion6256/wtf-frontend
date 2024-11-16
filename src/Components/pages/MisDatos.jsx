import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SidebarAdmin from './SidebarAdmin';
import Layout from './Layout';
import axios from "axios";
import Alerta from "../elements/Alerta";

const MisDatos = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [role, setRole] = useState(null); // Definir role y setRole
    const [email, setEmail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [celular, setCelular] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const fetchUserData = async (id) => {
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
            const userData = response.data;

            setNombreUsuario(userData.userName || '');
            setEmail(userData.email || '');
            setFechaNacimiento(userData.birthDate || '');
            setNombre(userData.name || '');
            setApellido(userData.surname || '');
            setCedula(userData.document?.toString() || '');
            setCelular(userData.phoneNumber?.toString() || '');
            setDireccion(userData.adress || '');
            setContrasenia(userData.password || '');

        } catch (error) {
            console.error("Error al cargar los datos del usuario:", error);
        }
    };

    const handleGuardar = async () => {
        
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(contrasenia)) {
            setAlertMessage(
              "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
            );
            setAlertType("Atencion");
            return;
        }

        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const cambios = {
                userName: nombreUsuario,
                password: contrasenia,
                name: nombre,
                surname: apellido,
                email: email,
                phoneNumber: celular,
                adress: direccion,
                document: cedula,
                birthDate:fechaNacimiento,
                
            };
            await axios.put(`http://localhost:8080/api/users/${userId}`, cambios);
            setAlertMessage('Datos actualizados con éxito');
            setAlertType('Completado');
            console.log("Datos actualizados con éxito");
        } catch (error) {
            setAlertMessage('Error algunos datos inconsistentes');
            setAlertType('Error');
            console.error("Error al actualizar los datos:", error.response?.data || error.message);
        }
    };
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setRole(user.role);
            setNombreUsuario(user.userName);
            console.log(user.id);
            fetchUserData(user.id);
        } else {
            navigate("/"); // Redirige a cartelera si no hay un usuario
        }
    }, [navigate]);

    const SidebarComponent = role === "ADMIN" ? SidebarAdmin : Layout;


    return (
        <SidebarComponent>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Mis Datos</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Apellido</label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Cedula</label>
                    <input type="email" value={cedula} onChange={(e) => setCedula(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nombre de Usuario</label>
                    <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Contraseña</label>
                    <input type="email" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
                    <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Celular</label>
                    <input type="email" value={celular} onChange={(e) => setCelular(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Direccion</label>
                    <input type="email" value={direccion} onChange={(e) => setDireccion(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                {alertMessage && <Alerta message={alertMessage} type={alertType} />}
                {/* Otros campos: nombre, apellido, cédula, celular, dirección, contraseña */}
                <button onClick={handleGuardar} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Guardar</button>
            </div>
        </SidebarComponent>
    );
};

export default MisDatos;
