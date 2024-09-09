import React, { useState } from "react";
import logo from "../../../assets/logoHorizontal.png";
import "./cadastro_empresa.css";

export const CadastrarEmpresa = () => { 
  return (
    <div className="empresa-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Cadastre sua Empresa</h2>
      <form>
      </form>
    </div>
  );
};