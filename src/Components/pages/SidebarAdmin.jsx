import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css'; // Importa Boxicons

const SidebarAdmin = ({ children }) => {
    // const [profileOpen, setProfileOpen] = useState(false);
    const [asideOpen, setAsideOpen] = useState(true);

    // const toggleProfile = () => setProfileOpen(!profileOpen);
    const toggleAside = () => setAsideOpen(!asideOpen);

    return (
        <main className="min-h-screen w-full bg-gray-100 text-gray-700">
            {/* Barra superior */}
            <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <button type="button" className="text-3xl" onClick={toggleAside}>
                        <i className="bx bx-menu"></i>
                    </button>
                    <div className="text-lg font-semibold">WTFun</div>
                </div>

                {/* Nombre de usuario */}
                <div className="relative flex items-center space-x-2">
                    <button className="flex items-center">
                        <span className="font-medium ml-2">Admin Name</span>
                    </button>
                    
                </div>
            </header>

            <div className="flex">
                {/* Barra lateral */}
                {asideOpen && (
                    <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style={{ height: "90.5vh" }}>
                        <a href="/agregaradmin" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-home"></i></span>
                            <span>Agregar Admin</span>
                        </a>
                        <a href="/agregarpelicula" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-cart"></i></span>
                            <span>Agregar Pelicula</span>
                        </a>
                        <a href="/agregarfuncion" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-shopping-bag"></i></span>
                            <span>Agregar Funcion</span>
                        </a>
                        <a href="/agregarsnack" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-heart"></i></span>
                            <span>Agregar Snack</span>
                        </a> 
                        <a href="/" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-log-out"></i></span>
                            <span>Log out</span>
                        </a>
                    </aside>
                )}

                {/* Contenido principal */}
                <div className="w-full p-4 overflow-y-auto" style={{ maxHeight: "100vh" }}>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default SidebarAdmin;
