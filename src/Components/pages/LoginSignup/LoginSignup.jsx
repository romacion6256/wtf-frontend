import React, { useState } from "react";
import "./LoginSignup.css"

import user_icon from "../../Assets/person.png"
import email_icon from "../../Assets/email.png"
import password_icon from '../../Assets/password.png'
import eye_icon_open from "../../Assets/eyeopen.png"; 
import eye_icon_closed from "../../Assets/eyeclosed.png"; 

const LoginSignup = () => {

    const[action,setAction] = useState("Log In");
    const [showPassword, setShowPassword] = useState(false); 

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
                    <input type="text" placeholder="Usuario" />
                </div>}
                

                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>

                <div className="input">
                    <img src={password_icon} alt="" />
                    <input
                            type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado
                            placeholder="Contraseña"
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
                {action==="Sign Up"?<div></div>:<div className="forgot-password"><span>Olvide mi contrasena </span></div>}
                <div className="enter-container">
                    {action==="Log In"?<div className="enter">Ingresa</div>: <div></div>}
                    {action==="Sign Up"?<div className="enter">Crear</div>: <div></div>}    
                        
                </div>
            </div>
        </div>
        
    );
};

export default LoginSignup