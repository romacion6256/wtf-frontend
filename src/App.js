import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LoginSignup from './Components/pages/LoginSignup/LoginSignup';
import MainCine from './Components/pages/MainCine';
import Cartelera from './Components/pages/Cartelera';
import MisReservas from './Components/pages/MisReservas'
import ReservaAsientos from './Components/pages/ReservaAsientos';
import SidebarAdmin from './Components/pages/SidebarAdmin';
import AgregarPelicula from "./Components/pages/AgregarPelicula";
import AgregarFuncion from "./Components/pages/AgregarFuncion";
import AgregarSnack from "./Components/pages/AgregarSnack";
import MisDatos from "./Components/pages/MisDatos";
import AgregarAdmin from './Components/pages/AgregarAdmin';
import CalificarPelicula from './Components/pages/CalificarPelicula';
import { UserProvider } from './Components/UserContext'; 
import AuthenticatedRoute from './Components/AuthenticatedRoute';


const App = () => {
  return (
    <UserProvider>
      <Router>
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
            
            <Route path="/" element={<Cartelera />} />
            
            
            
            {/* Protected routes for CLIENT and ADMIN */}
            <Route 
              path="/misdatos" 
              element={<AuthenticatedRoute element={<MisDatos />} roles={['CLIENT', 'ADMIN']} />} 
            />
            <Route 
              path="/main" 
              element={<AuthenticatedRoute element={<MainCine />} roles={['CLIENT']} />}
            />
            <Route 
            path="/misreservas" 
            element={<AuthenticatedRoute element={<MisReservas />} roles={['CLIENT']} />}
            />
            <Route 
            path="/reservaasientos" 
            element={<AuthenticatedRoute element={<ReservaAsientos />}  roles={['CLIENT']} />}
            />
            <Route 
            path="/misreservas" 
            element={<AuthenticatedRoute element={<MisReservas />} roles={['CLIENT']} />}
            />
            <Route 
              path="/admin" 
              element={<AuthenticatedRoute element={<SidebarAdmin />} roles={['ADMIN']} />} 
            />
            <Route 
              path="/agregaradmin" 
              element={<AuthenticatedRoute element={<AgregarAdmin />} roles={['ADMIN']} />} 
            />
            <Route 
              path="/agregarpelicula" 
              element={<AuthenticatedRoute element={<AgregarPelicula />} roles={['ADMIN']} />} 
            />
            <Route 
              path="/agregarfuncion" 
              element={<AuthenticatedRoute element={<AgregarFuncion />} roles={['ADMIN']} />} 
            />
            <Route 
              path="/agregarsnack" 
              element={<AuthenticatedRoute element={<AgregarSnack />} roles={['ADMIN']} />} 
            />
            <Route 
              path="/calificar" 
              element={<AuthenticatedRoute element={<CalificarPelicula />} roles={['CLIENT']} />} 
            />
          </Routes>
        </Router>
      </UserProvider>
      // <Router>
      //   <Routes>
      //     <Route path="/login" element={<LoginSignup />} />
      //     <Route path="/main" element={<MainCine />} />
      //     <Route path="/" element={<Cartelera/>} />
      //     <Route path="/misreservas" element={<MisReservas/>} />
      //     <Route path="/reservaasientos" element={<ReservaAsientos/>} />
      //     <Route path="/admin" element={<SidebarAdmin />} />
      //     <Route path="/agregaradmin" element={<AgregarAdmin />} />
      //     <Route path="/agregarpelicula" element={<AgregarPelicula />} />
      //     <Route path="/agregarfuncion" element={<AgregarFuncion />} />
      //     <Route path="/agregarsnack" element={<AgregarSnack />} />
      //     <Route path="/misdatos" element={<MisDatos />} />
      //     <Route path="/calificar" element={<CalificarPelicula />} />


      //   </Routes>
      // </Router>
  );
};

export default App;
