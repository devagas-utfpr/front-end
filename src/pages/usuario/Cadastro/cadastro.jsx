import React, { useState } from "react";
import "./cadastro.css";

export const Cadastro = () => { 
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [cpf, setCpf] = useState("");

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 3) {
      value = value.replace(/^(\d{3})(\d)/g, "$1.$2");
    }
    if (value.length > 6) {
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/g, "$1.$2.$3");
    }
    if (value.length > 9) {
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/g, "$1.$2.$3-$4");
    }

    setCpf(value.slice(0, 14)); 
  };

  const handleDateOfBirthChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    value = value.replace(/^(\d{2})(\d)/g, "$1/$2"); 
    value = value.replace(/(\d{2})(\d)/g, "$1/$2");  
    setDateOfBirth(value.slice(0, 8));
  };

  return (
    <div className="cadastro-container">
      {/* <img src={logo} alt="Logo" className="logo" /> */}
      <h2>Cadastre-se</h2>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Nome" />
        </div>
        <div className="form-group">
            <input type="email" placeholder="Email" />
          </div>
        <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            id="date-of-birth"
            placeholder="Data de Nascimento"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </div>
        <div className="form-group">
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={handleCpfChange}
            />
          </div>
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
      <p className="login-text">
        Já possui uma conta? <a href="/login">Clique aqui!</a>
      </p>
    </div>
  );
};