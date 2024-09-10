import React, { useState } from "react";
import "./cadastro_vaga.css";

export const CadastrarVaga = () => {
    const [status, setStatus] = useState("");
    const [modalidade, setModalidade] = useState("");
    
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
        <div className="form-row">
        <div className="select-container">
                  <select
                      className="vaga-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                  >
                      <option value="" disabled hidden>Status</option>
                      <option value="aberta">Aberta</option>
                      <option value="fechada">Fechada</option>
                  </select>
              </div>
              <div className="select-container">
                  <select
                      className="vaga-select"
                      value={modalidade}
                      onChange={(e) => setModalidade(e.target.value)}
                  >
                      <option value="" disabled hidden>Modalidade</option>
                      <option value="presencial">Presencial</option>
                      <option value="remota">Remota</option>
                      <option value="hibrida">Híbrida</option>
                  </select>
              </div>
        </div>
    </form>
  </div>
  );
};