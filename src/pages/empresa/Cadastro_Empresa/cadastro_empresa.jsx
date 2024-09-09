import React, { useState } from "react";
import logo from "../../../assets/logoHorizontal.png";
import "./cadastro_empresa.css";

export const CadastrarEmpresa = () => { 
  return (
    <div className="empresa-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Cadastre sua Empresa</h2>
      <form>
      <div className="form-group">
          <input type="text" placeholder="Nome" />
        </div>
        <div className="form-group">
            <input type="email" placeholder="Email" />
          </div>
        <div className="form-row">
          <div className="form-group">
            <input type="password" placeholder="Senha" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirmação de senha" />
          </div>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};