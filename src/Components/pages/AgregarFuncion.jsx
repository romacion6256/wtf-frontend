import React, { useState, useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin';
import '../../index.css';


const AgregarFuncion = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState('');
    const [sucursales, setSucursal] = useState([]);
    //const sucursales = ['Punta Carretas', 'Ciudad Vieja', 'Pocitos','Carrasco','Tres Cruces','Centro','Malvin','Buceo'];
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [salas, setSala] = useState([]);
    const [salaSeleccionada, setSalaSeleccionada] = useState('');
    const [cargandoFunciones, setCargandoFunciones] = useState(true); // Estado para controlar la carga

    const [Fecha, setFecha] = useState('');
    const [Hora, setHora] = useState('');
    const [Formato, setFormato] = useState('');
    const [Subtitulada, setSubtitulada] = useState('');
    const [funciones, setFunciones] = useState([]);

    const sub = ['Si', 'No'];

    // Obtener funciones
    useEffect(() => {
        const obtenerFunciones = async () => {
            setCargandoFunciones(true); 
            try {
                const response = await fetch('http://localhost:8080/api/function/obtenerTodas');
                const funcionesCargadas = await response.json();
                setFunciones(funcionesCargadas);
            } catch (error) {
                console.error('Error al obtener las funciones:', error);
            } finally {
                setCargandoFunciones(false); // Termina el cargador
            }
        };
        obtenerFunciones();
    }, []);

    // Obtener películas
    useEffect(() => {
        const obtenerPeliculas = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/movie/obtenerTodas');
                const peliculasCargadas = await response.json();
                setPeliculas(peliculasCargadas);
            } catch (error) {
                console.error('Error al obtener las películas:', error);
            }
        };
        obtenerPeliculas();
    }, []);

    useEffect(() => {

        if (peliculaSeleccionada) {
        // Simulación de llamada a la base de datos para obtener las películas creadas
            const obtenerSucursales = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/branch/obtenerTodas`);
                    const sucursalesCargadas = await response.json();
                    setSucursal(sucursalesCargadas);
                } catch (error) {
                    console.error('Error al obtener las sucursales:', error);
                    setSucursal([]);
                }
            };
            obtenerSucursales();
        }
    }, [peliculaSeleccionada]);


    useEffect(() => {
        if (peliculaSeleccionada && sucursalSeleccionada) {
            console.log("Sucursal seleccionada:", sucursalSeleccionada);
            const obtenerSalasDisponibles = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/salas/obtenerSalas/${sucursalSeleccionada}`);
                    const salasCargadas = await response.json();
                    setSala(Array.isArray(salasCargadas) ? salasCargadas : []);
                } catch (error) {
                    console.error('Error al obtener las salas disponibles:', error);
                    setSala([]);
                }
            };
            obtenerSalasDisponibles();
        }
    }, [peliculaSeleccionada, sucursalSeleccionada]);

    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setPeliculaSeleccionada('');
        setSucursalSeleccionada('');
        setSalaSeleccionada('')
        setFecha('');
        setHora('');
        setFormato('');
        setSubtitulada('');
    };

    const handleGuardarFuncion = async () => {
        // Verifica si alguno de los valores es null o vacío
        if (!peliculaSeleccionada || !Formato || !salaSeleccionada || !sucursalSeleccionada || !Fecha || !Hora || !Subtitulada) {
            alert('Por favor, completa todos los campos antes de guardar la función.');
            return; // Detiene la ejecución si hay campos vacíos
        }
        const nuevaFuncion = {
            movie: peliculaSeleccionada,
            format: Formato,
            sala: salaSeleccionada,
            sucursal: sucursalSeleccionada,
            date: Fecha,
            time: Hora,
            subtitled: Subtitulada === "Si",

        };
    
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const response = await fetch(`http://localhost:8080/api/function/agregarFuncion/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaFuncion),
            });
    
            if (response.ok) {
                alert('Funcion agregada correctamente');
                setCargandoFunciones(true);
                const funcionesActualizadas = await fetch('http://localhost:8080/api/function/obtenerTodas');
                setFunciones(await funcionesActualizadas.json());
            } else {
                console.error('Error al agregar la Funcion');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            handleCerrarPopup();
            setCargandoFunciones(false); // Finaliza el cargador tras obtener o fallar
           
        } 
        
    };
    const handleEliminarFuncion = async (idFunction) => {
        if (!idFunction) {
            console.error("ID de película no proporcionado.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/function/eliminar/${idFunction}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Funcion eliminada correctamente');
                setCargandoFunciones(true);
                // Actualizar la lista de películas
                //setPeliculas(peliculas.filter((pelicula) => pelicula.id !== idPelicula));
                const funcionesActualizadas = await fetch('http://localhost:8080/api/function/obtenerTodas');
                setFunciones(await funcionesActualizadas.json());
            } else {
                console.error('Error al eliminar la funcion');
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
        } finally {
            setCargandoFunciones(false); // Termina el cargador
        }
    };

    return (
        <SidebarAdmin>
            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Funciones</h2>
                <button
                    onClick={handleAgregarClick}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Agregar
                </button>

                {/* Mostrar la lista de funciones */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Lista de Funciones</h3>
                    {cargandoFunciones ? (
                        <div className="flex justify-center items-center" style={{ height: "100px" }}>
                            <div className="loader" /> {/* Círculo de carga */}
                        </div>
                    ) : funciones.length > 0 ? (
                        <ul>
                            {funciones.map((funcion) => (
                                <li key={funcion.idFunction} className="mb-6 border-b pb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="mb-1">
                                                <strong>Título: </strong>{funcion.movie.movieName}
                                            </div>
                                            <div className="mb-1">
                                                <strong>Sucursal: </strong>{funcion.room.branch.branchName}
                                            </div>
                                            <div className="mb-1">
                                                <strong>Sala: </strong>{funcion.room.number}
                                            </div>
                                            <div className="mb-1">
                                                <strong>Fecha: </strong>{funcion.date}
                                            </div>
                                            <div className="mb-1">
                                                <strong>Hora: </strong>{funcion.time}
                                            </div>
                                            <div className="mb-1">
                                                <strong>Formato: </strong>{funcion.format}
                                            </div>
                                            <div className="mb-1">
                                                <strong>Subtitulada: </strong>{funcion.subtitled ? 'Sí' : 'No'}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEliminarFuncion(funcion.idFunction)}
                                            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay funciones disponibles</p>
                    )}
                
            
                    
                </div>


                {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Nueva Función</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <select
                                    value={peliculaSeleccionada}
                                    onChange={(e) => setPeliculaSeleccionada(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="" disabled>Selecciona una película</option>
                                    {peliculas.length > 0 ? (
                                        peliculas.map((pelicula) => (
                                            <option key={pelicula.idMovie} value={pelicula.movieName}>{pelicula.movieName}</option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No hay películas disponibles</option>
                                    )}
                                </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Sucursal</label>
                    <select
                        value={sucursalSeleccionada}
                        onChange={(e) => setSucursalSeleccionada(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="" disabled>Selecciona una sucursal</option>
                        {sucursales.map((sucursal) => (
                            <option key={sucursal.idBranch} value={sucursal.branchName}>{sucursal.branchName}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Sala</label>
                    <select
                        value={salaSeleccionada}
                        onChange={(e) => setSalaSeleccionada(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="" disabled>Selecciona una sala</option>
                        {salas.map((sala, index) => (
                            <option key={index} value={sala}>{sala}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Fecha</label>
                    <input
                        type="date"
                        value={Fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        min={new Date().toISOString().split('T')[0]} // Calcula la fecha actual en formato YYYY-MM-DD
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Hora</label>
                    <input
                        type="time"
                        value={Hora}
                        onChange={(e) => setHora(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Formato</label>
                    <input
                        type="text"
                        value={Formato}
                        onChange={(e) => setFormato(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Ejemplo: 2D"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Subtitulada</label>
                    <select
                        value={Subtitulada}
                        onChange={(e) => setSubtitulada(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="" disabled>Subtitulada</option>
                        {sub.map((subtitle, index) => (
                            <option key={index} value={subtitle}>{subtitle}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                onClick={handleGuardarFuncion}
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

export default AgregarFuncion;
