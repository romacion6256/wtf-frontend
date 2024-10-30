import React, { useState , useEffect } from 'react';
import 'boxicons/css/boxicons.min.css'; 
import { useUser } from '../../Components/UserContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Layout = ({ children }) => {

    const { user , setUser,loading } = useUser();
    const navigate = useNavigate();
  
    const handleLoginRedirect = () => {
      navigate("/login");
    };
    
    const [asideOpen, setAsideOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);

    const toggleAside = () => setAsideOpen(!asideOpen);
    const toggleProfile = () => setProfileOpen(!profileOpen);

    useEffect(() => {
        // Optional: Any actions when user changes (like logging to console)
        console.log("User updated:", user);
    }, [user]); // Re-run this effect whenever 'user' changes


     // Logout function
     const handleLogout = async () => {
        try {
            
            await axios.post("http://localhost:8080/api/logout");
            
            
            localStorage.removeItem("user");
            setUser(null);
            navigate("/login");
            console.log("User logged out"); // Debug
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };


    return (
        <main className="min-h-screen w-full bg-gray-100 text-gray-700">
            {/* Barra superior */}
            <header className="flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <button type="button" className="text-3xl" onClick={toggleAside}>
                        <i className="bx bx-menu"></i>
                    </button>
                    <div className="text-lg font-semibold"><a href="/">WTFun</a></div>
                </div>

                {/* Nombre de usuario */}
                <div className="relative flex items-center space-x-2">
                {!loading && (
                    <button className="flex items-center" onClick={toggleProfile}>
                            {user ? (
                        <span>Hola, {user.userName}</span>
                        ) : (
                        <button onClick={handleLoginRedirect}>Log In</button>
                        )}
                    </button>
                )}
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
                        <a href="/" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-movie"></i></span>
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
                        <a href="metodopago" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-money"></i></span>
                            <span>Método de Pago</span>
                        </a>
                        <a href="calificar" className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-star"></i></span>
                            <span>Calificar</span>
                        </a> 
                        <button onClick={handleLogout} className="flex items-center space-x-1 rounded-md px-2 py-3 hover:bg-gray-100 hover:text-blue-600">
                            <span className="text-2xl"><i className="bx bx-log-out"></i></span>
                            <span>Log Out</span>
                        </button>
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
