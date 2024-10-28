import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css'; 

const Layout = ({ children }) => {
    
    const [asideOpen, setAsideOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleAside = () => setAsideOpen(!asideOpen);
    const toggleProfile = () => setProfileOpen(!profileOpen);

    return (
        <main className="min-h-screen w-full bg-gray-100 text-gray-700">
            {/* Barra superior */}
            <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <button type="button" className="text-3xl" onClick={toggleAside}>
                        <i className="bx bx-menu"></i>
                    </button>
                    <div className="text-lg font-semibold"><a href="main">WTFun</a></div>
                </div>

                {/* Nombre de usuario */}
                <div className="relative flex items-center space-x-2">
                    <button className="flex items-center" onClick={toggleProfile}>
                        <span className="font-medium ml-2">User Name</span>
                    </button>
                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                            <a
                                href="/misdatos"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Mis Datos
                            </a>
                        </div>
                    )}
                </div>
            </header>

            <div className="flex">
                {/* Barra lateral */}
                {asideOpen && (
                    <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style={{ height: "100vh" }}>
                        <a href="cartelera" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-home"></i></span>
                            <span>Cartelera</span>
                        </a>
                        <a href="misreservas" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-cart"></i></span>
                            <span>Mis Reservas</span>
                        </a>
                        <a href="reservaasientos" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-shopping-bag"></i></span>
                            <span>Comprar Entradas</span>
                        </a>
                        <a href="calificar" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-star"></i></span>
                            <span>Calificar</span>
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

export default Layout;
