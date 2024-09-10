import React, { useState } from "react";
import "./cadastro_empresa.css";

export const CadastrarEmpresa = () => {
    const [cnpj, setCnpj] = useState("");

    const handleCnpjChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/g, "$1.$2");
        }
        if (value.length > 5) {
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/g, "$1.$2.$3");
        }
        if (value.length > 8) {
            value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/g, "$1.$2.$3/$4");
        }
        if (value.length > 12) {
            value = value.replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/g, "$1.$2.$3/$4-$5");
        }

        setCnpj(value.slice(0, 18));
    };

    return (
        <div className="empresa-container">
            <h2>Cadastre sua Empresa</h2>
            <form>
                <div className="form-empresa-group">
                    <input type="text" placeholder="Nome" />
                </div>
                <div className="form-empresa-group">
                    <input type="email" placeholder="Email" />
                </div>
                <div className="form-empresa-group">
                    <input
                        type="text"
                        placeholder="CNPJ"
                        value={cnpj}
                        onChange={handleCnpjChange}
                    />
                </div>
                <div className="form-row">
                    <div className="form-empresa-group">
                        <input type="password" placeholder="Senha" />
                    </div>
                    <div className="form-empresa-group">
                        <input type="password" placeholder="Confirmação de senha" />
                    </div>
                </div>
                <button type="submit">Cadastrar</button>
                <p className="login-text">
                    Já possui uma conta? <a href="/login">Clique aqui!</a>
                </p>
            </form>
        </div>
    );
};