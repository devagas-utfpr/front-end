import { BsPencilSquare } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import './style.css'

export const VagaDetail = ({ vaga, closeModal }) => {
    return (
      <div>
        <div className='cardDetail'>
            <div className='topo'>
                <IoClose className='closeButton' onClick={closeModal}/>
            </div>

            <h1>{vaga.titulo}</h1>
            <p>{vaga.empresa.nome}</p>
            <div className='statusDiv'>
              <p>
                {new Date(vaga.dataInicio).toLocaleDateString()} -{" "}
                {new Date(vaga.dataFim).toLocaleDateString()}
              </p>
                <p className={`status ${vaga.status ? "Aberta" : "Fechada"}`}>
                  {vaga.status ? "Aberta" : "Fechada"}
                </p>
            </div>
            <p>{vaga.local}</p>
            <h3>Sobre a vaga</h3>
            <p>{vaga.descricao}</p>

            <div className="modal-footer">
                <button className="flex items-center justify-between w-10 px-4 py-2 rounded tracking-wider bg-lite hover:bg-default-hover text-white text-[13px] cursor-pointer">
                <BsPencilSquare /> Inscrever-se
                </button>
            </div>
        </div>
      </div>
    );
  };
  