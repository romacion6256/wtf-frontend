import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SidebarAdmin from './SidebarAdmin';
import Layout from './Layout';
import axios from "axios";

const MisDatos = () => {
    const [nombreUsuario, setNombreUsuario] = useState('Admin/User Name');
    const [role, setRole] = useState(null); // Definir role y setRole

    const [email, setEmail] = useState('mail@example.com');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');
    const [celular, setCelular] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    const handleGuardar = () => {
        console.log('Datos guardados:', {
            nombreUsuario, email, fechaNacimiento, nombre, apellido, cedula, celular, direccion, contrasenia,
        });
    };
    const navigate = useNavigate();
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setRole(user.role);
        } else {
            navigate("/"); // Redirige al login si no hay un usuario
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
                {/* Otros campos: nombre, apellido, cédula, celular, dirección, contraseña */}
                <button onClick={handleGuardar} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Guardar</button>
            </div>
        </SidebarComponent>
    );
};

export default MisDatos;
