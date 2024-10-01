// src/axiosConfig.js

import axios from 'axios';

// Crear una instancia de Axios
const instance = axios.create({
  baseURL: 'http://localhost:8080', // Define tu base URL para las peticiones
  headers: {
    'Content-Type': 'application/json', // Define el tipo de contenido
  },
});

// Agregar un interceptor para incluir el token en todas las peticiones
instance.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const storedToken = localStorage.getItem('token');
    let token;

    // Verificar si el token está en formato de JSON
    try {
      const parsedToken = JSON.parse(storedToken); // Intenta parsear el token como JSON
      token = parsedToken.value; // Extrae solo el valor del token
    } catch {
      token = storedToken; // Si no es JSON, usa el token tal cual
    }

    // Añadir el token al header de Authorization si existe
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token añadido a la solicitud:', config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    // Manejar errores de solicitud
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

export default instance;