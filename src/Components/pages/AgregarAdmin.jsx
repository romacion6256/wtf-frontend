import React, { useState, useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin';

const AgregarAdmin = () => {
    const [nombreUsuario, setNombreUsuario] = useState('Admin/User Name');
    const [email, setEmail] = useState('mail@example.com');
    const [contrasenia, setContrasenia] = useState('');
    const handleGuardar = () => {
        console.log('Datos guardados:', {
            nombreUsuario, email, contrasenia,
        });
    };

    return (
        <SidebarAdmin>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Agregar Administrador</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nombre de Usuario</label>
                    <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Contrasena</label>
                    <input type="email" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <button onClick={handleGuardar} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Guardar</button>
            </div>
        </SidebarAdmin>
    );
};

export default AgregarAdmin;