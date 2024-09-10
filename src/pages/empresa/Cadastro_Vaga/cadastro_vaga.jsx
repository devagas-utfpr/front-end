import React, { useState } from "react";
import "./cadastro_vaga.css";


export const CadastrarVaga = () => {
    const [status, setStatus] = useState("");
    const [modalidade, setModalidade] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dateInicio, setDateInicio] = useState("");
    const [dateFim, setDateFim] = useState("");


    const handleDateChange = (e, setDate) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/g, "$1/$2");
        value = value.replace(/(\d{2})(\d)/g, "$1/$2");  
        setDate(value.slice(0, 8));
    };


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
                <div className="form-vaga-group">
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
                </div>
                <div className="form-row">
                    <div className="form-vaga-group">
                        <input
                            type="text"
                            className="data-field"
                            placeholder="Data de Início"
                            value={dateInicio}
                            onChange={(e) => handleDateChange(e, setDateInicio)}
                        />
                    </div>
                    <div className="form-vaga-group">
                        <input
                            type="text"
                            className="data-field"
                            placeholder="Data de Fim"
                            value={dateFim}
                            onChange={(e) => handleDateChange(e, setDateFim)}
                        />
                    </div>
                </div>
                <div className="form-vaga-group">
                    <textarea
                        className="vaga-desc"
                        placeholder="Descrição da vaga"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="form-row">
                    <div className="vaga-button-cadastrar">
                        Cadastrar
                    </div>
                    <div className="vaga-button-cancelar">
                    Cancelar
                    </div>
                </div>
            </form>
        </div>
    );
};
