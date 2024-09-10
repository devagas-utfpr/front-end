import React, { useState } from "react";
import "./cadastro_vaga.css";

export const CadastrarVaga = () => {
    
  return (
    <div className="vaga-container">
    <div className="vaga-titulo">Cadastre uma vaga</div>
    <form>
      <div className="form-vaga-group">
        <input
          type="text"
          className="vaga-input"
          placeholder="Título"
        />
      </div>
      <div className="form-vaga-group">
        <input
          type="text"
          className="vaga-input"
          placeholder="Empresa"
        />
      </div>
        <div className="form-vaga-group">
          <input
            type="text"
            className="vaga-input"
            placeholder="Cargo"
          />
        </div>
    </form>
  </div>
  );
};