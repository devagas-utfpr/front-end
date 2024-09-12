import { BsPencilSquare } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import "./style.css";
import { UsuarioVagaServices } from "../../infrastructure/services/UsuarioVagaService";
import { useState } from "react";

export const VagaDetail = ({ vaga, closeModal, usuario }) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await UsuarioVagaServices.create({
                uuidVaga: vaga.uuid,
                uuidUsuario: usuario,
                status: true,
                dataEntrada: new Date(),
            });
            if (response instanceof Error) {
                setError("Erro ao cadastrar inscrição");
            } else {
                console.log("Inscrição realizada com sucesso");
                closeModal(); // Close the modal on successful submission
                windows.location.reload(); // Reload the page to show the new subscription
            }
        } catch (error) {
            setError("Erro ao cadastrar inscrição");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="cardDetail">
                <div className="topo">
                    <IoClose className="closeButton" onClick={closeModal} />
                </div>

                <h1>{vaga.titulo}</h1>
                <p>{vaga.empresa.nome}</p>
                <div className="statusDiv">
                    <p>
                        {new Date(vaga.dataInicio).toLocaleDateString()} -{" "}
                        {new Date(vaga.dataFim).toLocaleDateString()}
                    </p>
                    <p
                        className={`status ${
                            vaga.status ? "Aberta" : "Fechada"
                        }`}
                    >
                        {vaga.status ? "Aberta" : "Fechada"}
                    </p>
                </div>
                <p>{vaga.local}</p>
                <h3>Sobre a vaga</h3>
                <p>{vaga.descricao}</p>

                <div className="modal-footer">
                    <button
                        onClick={handleSubmit}
                        className="flex items-center justify-between w-10 px-4 py-2 rounded tracking-wider bg-lite hover:bg-default-hover text-white text-[13px] cursor-pointer"
                    >
                        <BsPencilSquare /> Inscrever-se
                    </button>
                </div>
            </div>
        </div>
    );
};
