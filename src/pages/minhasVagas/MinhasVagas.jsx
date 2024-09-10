import "./style.css"

import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export const MinhasVagas = () => {

  return (
    <div className="minhas-vagas-container">
        <h1>Minhas vagas</h1>
        <div className="vagas-lista">

            {vagas.map(vaga => (

            <div className="card-vaga">
                <div className="status-data">
                    <p  className={`status ${vaga.status}`}>{vaga.status}</p>
                    <p>{vaga.dataInicio} - {vaga.dataFinal}</p>
                </div>

                <div className="titulo">
                    <p>{vaga.titulo}</p>
                </div>

                <div className="nome-empresa">
                    <p>{vaga.empresa}</p>
                </div>

                <div className="local">
                    <p>{vaga.local}</p>
                </div>

                <div className="botao">
                    <button className="botao-visualizar">Visualizar <LiaLongArrowAltRightSolid /></button>
                </div>
            </div>

            ))}

        </div>
    </div>
  );
};
