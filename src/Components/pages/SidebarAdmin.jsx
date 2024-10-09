import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';

const SidebarAdmin = ({ children }) => {
    const [asideOpen, setAsideOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleAside = () => setAsideOpen(!asideOpen);
    const toggleProfile = () => setProfileOpen(!profileOpen);

    return (
        <main className="min-h-screen w-full bg-gray-100 text-gray-700">
            <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
                <div className="flex items-center space-x-2">
                    <button type="button" className="text-3xl" onClick={toggleAside}>
                        <i className="bx bx-menu"></i>
                    </button>
                    <div className="text-lg font-semibold">WTFun</div>
                </div>

                <div className="relative flex items-center space-x-2">
                    <button className="flex items-center" onClick={toggleProfile}>
                        <span className="font-medium ml-2">Admin Name</span>
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
                {asideOpen && (
                    <aside className="flex w-72 flex-col space-y-2 border-r-2 border-gray-200 bg-white p-2" style={{ height: "100vh" }}>
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

                <div className="w-full p-4 overflow-y-auto" style={{ maxHeight: "100vh" }}>
                    {children}
                </div>
            </div>
        </main>
    );
};

export default SidebarAdmin;
