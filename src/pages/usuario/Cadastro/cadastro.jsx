import React from "react";
import logo from "../../../assets/logoHorizontal.png"
import "./cadastro.css";

export const Cadastro = () => { 
return (
    <div className="cadastro-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Cadastre-se</h2>
    </div>
    );
}