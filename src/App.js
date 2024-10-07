import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import LoginSignup from './Components/pages/LoginSignup/LoginSignup';
import MainCine from './Components/pages/MainCine';
import Cartelera from './Components/pages/Cartelera';
import MisReservas from './Components/pages/MisReservas'
import ReservaAsientos from './Components/pages/ReservaAsientos';
import SidebarAdmin from './Components/pages/SidebarAdmin';
// import AgregarAdmin from './Components/pages/AgregarAdmin';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/main" element={<MainCine />} />
          <Route path="/cartelera" element={<Cartelera/>} />
          <Route path="/misreservas" element={<MisReservas/>} />
          <Route path="/reservaasientos" element={<ReservaAsientos/>} />
          <Route path="/admin" element={<SidebarAdmin />} />
          {/* <Route path="/agregaradmin" element={<AgregarAdmin />} /> */}
        </Routes>
      </Router>
  );
};

export default App;
