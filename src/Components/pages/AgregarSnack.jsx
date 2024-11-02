import React, { useState, useEffect} from 'react';
import SidebarAdmin from './SidebarAdmin';
import '../../index.css';
import Alerta from '../elements/Alerta';

const AgregarSnack = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [nombreProducto, setNombreProducto] = useState('');
    const [precio, setPrecio] = useState('');
    const [snacks, setSnacks] = useState([]);
    const [cargandoSnacks, setCargandoSnacks] = useState(true); // Estado para controlar la carga
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');


    const handleAgregarClick = () => {
        setShowPopup(true);
    };

    const handleCerrarPopup = () => {
        setShowPopup(false);
        setNombreProducto('');
        setPrecio('');
        setAlertMessage('');
        setAlertType('');
    };

    const handleGuardarSnack = async () => {
        // Verifica si alguno de los valores es null o vacío
        if (!nombreProducto || !precio ) {
            setAlertMessage('Por favor, completa todos los campos antes de guardar el snack.');
            setAlertType('Atencion');
            return; // Detiene la ejecución si hay campos vacíos
        }
        const nuevoSnack = {
            description: nombreProducto,
            price: precio,
        };
    
        try {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const response = await fetch(`http://localhost:8080/api/snack/agregarSnack/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoSnack),
            });
    
            if (response.ok) {
                setAlertMessage('Snack agregado correctamente');
                setAlertType('Completado');
                setCargandoSnacks(true);
                const snacksActualizadas = await fetch('http://localhost:8080/api/snack/listarSnacks');
                setSnacks(await snacksActualizadas.json());
            } else {
                console.error('Error al agregar la snack');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        } finally {
            handleCerrarPopup();
            setCargandoSnacks(false); // Finaliza el cargador tras obtener o fallar
           
        } 
    };
    
        useEffect(() => {
            const obtenerSnacks = async () => {
                setCargandoSnacks(true); 

                try {
                    const response = await fetch('http://localhost:8080/api/snack/listarSnacks');
                    const snacksCargadas = await response.json();
                    setSnacks(snacksCargadas);
                } catch (error) {
                    console.error('Error al obtener los snacks:', error);
                } finally {
                    setCargandoSnacks(false); // Termina el cargador
                }
            };
            obtenerSnacks();
        }, []);

    const handleEliminarSnack = async (idSnack) => {
        if (!idSnack) {
            console.error("ID de snack no proporcionado.");
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/api/snack/eliminar/${idSnack}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Snack eliminado correctamente');
                setCargandoSnacks(true);

                // Actualizar la lista de películas
                //setPeliculas(peliculas.filter((pelicula) => pelicula.id !== idPelicula));
                const snacksActualizadas = await fetch('http://localhost:8080/api/snack/listarSnacks');
                setSnacks(await snacksActualizadas.json());
            } else {
                console.error('Error al eliminar la snack');
            }
        } catch (error) {
            console.error('Error en la solicitud de eliminación:', error);
        } finally {
            setCargandoSnacks(false); // Termina el cargador
        }
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

                {/* Mostrar la lista de películas */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Lista de Snacks:</h3>
                    {cargandoSnacks ? (
                        <div className="flex justify-center items-center" style={{ height: "100px" }}>
                            <div className="loader" /> {/* Círculo de carga */}
                        </div>
                    ) : snacks.length > 0 ? (
                    <ul>
                        {snacks.map((snack) => (
                                <li key={snack.snackId} className="mb-6 border-b pb-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="mb-1">
                                                <strong>Nombre: </strong>{snack.description}
                                               
                                            </div>
                                            <div className="mb-1">
                                                <strong>Precio: </strong>${snack.price}
                                                
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEliminarSnack(snack.snackId)}
                                            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        ) : (
                            <p>No hay Snacks disponibles</p>
                        )}
                    
                
                        
                    </div>

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
                            {alertMessage && <Alerta message={alertMessage} type={alertType} />}
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
