import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { VagaServices } from "../../shared/infrastructure/services/VagaService";
import { VagaDetail } from "../../shared/components/vagaDetail/VagaDetail"
import { Footer, Header } from "../../shared/components";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import "./style.css";

export const MinhasVagas = () => {
  const [vagas, setVagas] = useState([]);

  const getVagas = async () => {
    try {
      const response = await VagaServices.getAll();
      setVagas(response);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    }
  };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVaga, setSelectedVaga] = useState(null);

  function openModal(vaga){
    setSelectedVaga(vaga);
    setModalIsOpen(true);
};

function closeModal(){
    setModalIsOpen(false);
    setSelectedVaga(null);
};

  useEffect(() => {
    getVagas();
  }, []);

  return (
    <>
    <Header />
    <div className="minhas-vagas-container">
      <h1 className="font-bold text-2xl">Minhas vagas</h1>
      <div className="vagas-lista">
        {vagas.map((vaga) => (
          <div key={vaga.uuid} className="card-vaga">
            <div className="status-data">
              <p className={`status ${vaga.status ? "Aberta" : "Fechada"}`}>
                {vaga.status ? "Aberta" : "Fechada"}
              </p>
              <p>
                {new Date(vaga.dataInicio).toLocaleDateString()} -{" "}
                {new Date(vaga.dataFim).toLocaleDateString()}
              </p>
            </div>

            <div className="titulo">
              <p>{vaga.titulo}</p>
            </div>

            <div className="nome-empresa">
              <p>{vaga.empresa.nome}</p>
            </div>

            <div className="local">
              <p>{vaga.cargo.nome}</p>
            </div>

            <div className="botao">
              <button onClick={() => openModal(vaga)} className="flex items-center justify-between w-10 px-4 py-2 rounded tracking-wider bg-lite hover:bg-default-hover text-white text-[13px] cursor-pointer">
                <p>Visualizar</p>
                <LiaLongArrowAltRightSolid />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes da Vaga"
        className="modal"
        overlayClassName="modalBackground"
      >
        {selectedVaga && (
            <VagaDetail vaga={selectedVaga} closeModal={closeModal} />
        )}

    </Modal>
    </div>
    <Footer />
    </>
  );
};
