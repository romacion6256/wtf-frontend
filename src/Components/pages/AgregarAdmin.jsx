import React, { useState, useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin';
import axios from "axios";
import Alerta from "../elements/Alerta";


const AgregarAdmin = () => {
    
  const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
   
    const handleRegister = async (e) => {
        e.preventDefault();
    
        //que la contrasena tenga 8 caracteres, 1 mayuscula, 1 minuscula y 1 numero
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(contraseña)) {
          setAlertMessage(
            "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número"
          );
          setAlertType("Atencion");
          return;
        }
    
        //chequear que ningun campo sea vacio
        if (usuario === "" || email === "" || contraseña === "") {
          setAlertMessage("Por favor, complete todos los campos");
          setAlertType("Atencion");
          return;
        }
      
        //chequear que el email tenga un formato valido
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
          setAlertMessage("Informacion de contacto invalida");
          setAlertType("Atencion");
          return;
        }
    
        try {
          const response = await axios.post("http://localhost:8080/api/registerAdmin", {
            usuario,
            email,
            contraseña
          });
    
          if (response.status === 200) {
            console.log("Se ha registrado el usuario", usuario)
            console.log("Usuario registrado exitosamente: ", response.data);
            setAlertMessage('Administrador creado exitosamente');
            setAlertType("Completado");
            setTimeout(() => {
              setAlertMessage("");
              setAlertType("");
              setContraseña("");
              setEmail("");
              setUsuario("");
            }, 3000);

          } else {
            setAlertMessage(response.data);
            setAlertType("Error");
          }
        } catch (error) {
          console.error("Error de red: ", error);
          setAlertMessage("Error al registrar el usuario. Por favor, intente nuevamente.");
          setAlertType("Error");
        }
      };

    return (
        <SidebarAdmin>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Agregar Administrador</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Nombre de Usuario</label>
                    <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Contrasena</label>
                    <input type="email" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="w-full px-3 py-2 border rounded" />
                </div>
                {alertMessage && <Alerta message={alertMessage} type={alertType} />}
                <button onClick={handleRegister} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Guardar</button>
            </div>
        </SidebarAdmin>
    );
};

export default AgregarAdmin;