import React, { useState } from "react";
import "./LoginSignup.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alerta from "../../elements/Alerta";

import user_icon from "../../Assets/person.png"
import email_icon from "../../Assets/email.png"
import password_icon from '../../Assets/password.png'
import eye_icon_open from "../../Assets/eyeopen.png"; 
import eye_icon_closed from "../../Assets/eyeclosed.png"; 

const LoginSignup = () => {

    const[action,setAction] = useState("Log In");
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const navigate = useNavigate();
    
    const handleUsuarioChange = (e) => {
        setUsuario(e.target.value);
    };
    
    const handleContraseñaChange = (e) => {
        setContraseña(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Iniciando sesion con: ", email, contraseña);
    
        if (email === "" || contraseña === "") {
          setAlertMessage("Faltan completar los campos");
          setAlertType("Atencion");
          return;
        }
    
        try {
          const response = await axios.post(
            "http://localhost:8080/api/login",
            {
              email,
              contraseña
            }
          );
          console.log("Iniciando sesion con: ", { email, contraseña });
          console.log("Respuesta del servidor: ", response);
          if (response.status === 200) {
            
            const user = response.data;
            
            const role = user.role;

            localStorage.setItem("user", JSON.stringify(user));
    
            //redireccionamos a la pagina correspondiente segun el tipo de usuario
            if (role === "CLIENT") {
              navigate("/main");
            } else if (role === "ADMIN") {
              navigate("/admin");
            }
          } else {
            console.error("Error en el inicio de sesion: ", response.data);
            setAlertMessage("Usuario o contraseña incorrectos");
            setAlertType("Autenticacion fallida");
            setContraseña("");
          }
        } catch (error) {
          console.error("Error de red: ", error);
          setAlertMessage("Usuario o contraseña incorrectos, por favor intenta nuevamente");
          setAlertType("Autenticacion fallida");
          setContraseña("");
        }
      };

    return (
        <div className="login-signup-container">
            <div className="submit-container">
                    <div className={action === "Log In" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Log In") }}>Log In</div>
            </div>

            <div className ='container'>
                
                <div className="logo">WTFun</div>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                {action==="Log In"?<div></div>: <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Usuario" value={usuario} onChange={handleUsuarioChange}/>
                </div>}
                

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                            type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado
                            placeholder="Contraseña"
                            value={contraseña}
                            onChange={handleContraseñaChange}
                        />
                        <img
                            src={showPassword ? eye_icon_open : eye_icon_closed} // Muestra el icono según el estado
                            alt="toggle visibility"
                            onClick={() => setShowPassword(!showPassword)} // Alterna la visibilidad de la contraseña
                            className="eye-icon"
                            style={{ cursor: 'pointer', marginLeft: '8px' }} // Agrega estilo para que se vea bien
                        />
                </div>
                </div>
                {alertMessage && <Alerta message={alertMessage} type={alertType} />}
                {action==="Sign Up"?<div></div>:<div className="forgot-password"><span>Olvide mi contrasena </span></div>}
                <div className="enter-container">
                    {action==="Log In"?<div className="enter" onClick={handleLogin}>Ingresa</div>: <div></div>}
                    {action==="Sign Up"?<div className="enter">Crear</div>: <div></div>}    
                        
                </div>
            </div>
        </div>
        
    );
};

export default LoginSignup