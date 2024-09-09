import './style.css'

import { Box } from '@mui/material';

import { BsPencilSquare } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

export const VagaDetail = ({ vaga, closeModal }) => {
    return (
      <div>
        <div className='cardDetail'>
            <div className='topo'>
                <IoClose className='closeButton' onClick={closeModal}/>
            </div>

            <h1>{vaga.titulo}</h1>
            <p>{vaga.empresa}</p>
            <div className='statusDiv'>
                <p>{`${vaga.dataInicio} - ${vaga.dataFim}`}</p>
                <p className={`status ${vaga.status}`}>{vaga.status}</p>
            </div>
            <p>{vaga.local}</p>
            <h3>Sobre a vaga</h3>
            <p>{vaga.descricao}</p>

            <div className="modal-footer">
                <button>
                <BsPencilSquare /> Inscrever-se
                </button>
            </div>
        </div>
      </div>
    );
  };
  