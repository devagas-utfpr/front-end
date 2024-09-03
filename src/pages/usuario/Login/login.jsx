import React from "react";
import logo from "../../../assets/logoHorizontal.png"
import "./login.css";

export const Login = () => {
  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <input type="email" placeholder="Email" />
        </div>

        <div className="form-group">
          <input type="password" placeholder="Senha" />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p className="login-text">
        Ainda não possui conta? <a href="/cadastro">Clique aqui!</a>
      </p>
    </div>
  );
}