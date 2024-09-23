import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";


const App = () => {
  return (
      <Router>
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
  );
};

export default App;
