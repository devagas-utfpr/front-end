import Modal from "react-modal";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { VagaDetail } from "../vagaDetail/VagaDetail";
import { useState } from "react";
import { EditarVaga } from "../vaga/EditarVaga";
import { VagaServices } from "../../infrastructure";

export const Card = ({ cardInfo, isEmpresa, usuario }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedVaga, setSelectedVaga] = useState(null);

    const openModalView = (vaga) => {
        setSelectedVaga(vaga);
        setModalIsOpen(true);
    };

    const closeModalView = () => {
        setModalIsOpen(false);
        setSelectedVaga(null);
    };

    const openModalEdit = (vaga) => {
        setSelectedVaga(vaga);
        setModalIsOpen(true);
    };

    const handleRemover = async (event) => {
        event.preventDefault();

        const confirmRemoval = window.confirm(
            "Você tem certeza que deseja remover esta vaga?"
        );
        if (!confirmRemoval) {
            return;
        }

        await VagaServices.remove(cardInfo.uuid);
        console.log("Vaga removida com sucesso");
        closeModalView();
        window.location.reload(); // Atualiza a tela após a remoção
    };

    console.log(new Date() < new Date(cardInfo.dataInicio));

    return (
        <div className="bg-white rounded overflow-hidden">
            <div className="p-6">
                {cardInfo.status ? (
                    <div className="w-2/5 flex items-center text-green-700 text-sm bg-green-50 px-3 py-1.5 tracking-wide rounded-full">
                        <p className="text-mobile"> Aberta</p>
                        <div className="w-2 h-2 rounded-full bg-green-700 animate-pulse ml-2"></div>
                    </div>
                ) : (
                    <div className="w-2/5 flex items-center text-red-700 text-sm bg-red-50 px-3 py-1.5 tracking-wide rounded-full">
                        <p className="text-mobile">Fechada</p>
                        <div className="w-2 h-2 rounded-full bg-red-700 ml-2"></div>
                    </div>
                )}
                <h4 className="text-lg font-bold text-default mt-4">
                    {cardInfo.titulo.length > 25
                        ? `${cardInfo.titulo.substring(0, 25)}...`
                        : cardInfo.titulo}
                </h4>
                <span className="bg-lite px-2 py-1 text-mobile text-white rounded">
                    {cardInfo.modalidade}
                </span>
                <h4 className="text-sm font-bold text-default mt-4">
                    {cardInfo.empresa.nome}
                </h4>
                <h4 className="text-sm text-gray-500 mb-3">
                    {cardInfo.empresa.cidade}
                </h4>
                <p className="text-default text-sm font-semibold mt-4">
                    {cardInfo.dataInicio} à {cardInfo.dataFim}
                </p>
                {isEmpresa ? (
                    <div className="flex space-x-4 mt-4">
                        <a
                            onClick={() => openModalEdit(cardInfo)}
                            className="inline-block px-4 py-2 rounded tracking-wider bg-blue-500 hover:bg-default-hover text-white text-sm cursor-pointer"
                        >
                            <MdEdit className="inline-block" />
                        </a>
                        <a
                            onClick={handleRemover}
                            className="inline-block px-4 py-2 rounded tracking-wider bg-red-500 hover:bg-default-hover text-white text-sm cursor-pointer"
                        >
                            <IoMdTrash className="inline-block" />
                        </a>
                    </div>
                ) : (
                    <a
                        onClick={() => openModalView(cardInfo)}
                        className="mt-4 inline-block px-4 py-2 rounded tracking-wider bg-lite hover:bg-default-hover text-white text-[13px] cursor-pointer"
                    >
                        Saiba mais <span>&rarr;</span>
                    </a>
                )}
            </div>
            <div>
                {isEmpresa ? (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModalView}
                        contentLabel="Detalhes da Vaga"
                        className="modal"
                        overlayClassName="modalBackground"
                    >
                        {selectedVaga && (
                            <EditarVaga
                                vaga={selectedVaga}
                                closeModal={closeModalView}
                                isEmpresa={isEmpresa}
                            />
                        )}
                    </Modal>
                ) : (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModalView}
                        contentLabel="Detalhes da Vaga"
                        className="modal"
                        overlayClassName="modalBackground"
                    >
                        {selectedVaga && (
                            <VagaDetail
                                vaga={selectedVaga}
                                closeModal={closeModalView}
                                usuario={usuario}
                            />
                        )}
                    </Modal>
                )}
            </div>
        </div>
    );
};
